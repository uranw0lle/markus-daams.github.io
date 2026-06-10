---
layout: post
title: "Caddy - Helfer im Heimnetz"
date: 2026-06-10 07:01:17 +0200
category: [selfhosting, tools]
author: 
tags: [linux, proxmox, selfhosting]
description: "Caddy macht das Heimnetzwerk komfortabler und sicherer. So richtet man es ein."
image:
    path: /assets/img/post-header/header-caddy.jpg
    alt: Caddy - Ein Reverse Proxy fürs Heimnetz
---

# Reverse Proxy in einfach

Mein erstes Gerät im Heimnetz war eine externe Festplatte mit NAS Funktion. Ich konnte diese Festplatte also im Netzwerk erreichen und das auch noch von mehreren Endgeräten aus. Ich verliebte mich ins Self Hosting. Die Festplatte hatte eine IP, die ich mir gut merken konnte. Es hatte mich auch nicht weiter gestört, dass die Verbindung im Browser als unsicher angezeigt wurde. Ich war ja schließlich zu Hause und habe mich nicht weiter darum gekümmert.

Spulen wir viele Jahre vor. Ich hoste nicht mehr nur ein NAS, sondern viele Geräte und Services, dazwischen tummelt sich ein [Proxmox Server](https://markus-daams.com/tags/proxmox/) mit lauter Containern und VMs, die jeweils ihre eigenen IP-Adressen haben. Erschwerend kommt hinzu, dass immer mehr Apps und Programme Wert auf eine verschlüsselte Verbindung legen, selbst im vom Internet getrennten lokalen Netz. Das ist sinnvoll, macht die Konfiguration der Dienste aber mitunter umständlicher.

Hier kommt ein Reverse Proxy ins Spiel. Grob gesagt weiß dieser Proxy, unter welcher IP ein Dienst bei mir erreichbar ist. Dazu hinterlege ich eine Domain meiner Wahl und schon muss ich mir nur noch diese merken. Also statt **192.168.178.99** brauche ich nur noch **homeassistant.lan**. Dank des vom Proxy bereit gestellten Zertifikats ist die Verbindung zudem verschlüsselt.

Das klingt richtig gut und ist es auch. Mit **Caddy** lässt sich so etwas relativ leicht einrichten. In diesem Artikel erkläre ich, wie man **Caddy** installiert. Zudem gehe ich auch darauf ein, wie man *Pi-hole* einbindet, was die Namensauflösung vereinfacht und auch das Zertifikat-Gelöt erkläre ich kurz.

Steigen wir gleich ein.

## Caddy Installation

In dieser Anleitung installiere ich **Caddy** in einem Proxmox-LXC. Man kann diese auf seine eigenen Bedürfnisse adaptieren. Es lässt sich also auch auf einem **Raspberry Pi** oder einem **NAS** installieren.

Für meine Installation habe ich mir einen schlanken LXC mit Debian erstellt:

* CPU: 1 Kern
* RAM  / SWAP: 512 MB
* 8 GB Speicher (kann auch weniger sein)
* Statische IP-Adresse (logisch, oder?)

Nachdem der Container erstellt wurde, geht es mit der eigentlichen Installation weiter.

System aktualisieren und Caddy installieren:

```bash
apt update && apt upgrade -y
apt install -y caddy
```
Wer Caddy bei sich nicht in den Repos findet, sollte einen Blick in die Anleitung auf der Website des Projektes werfen, die sich [unter diesem Link](https://caddyserver.com/docs/install) finden lässt. Hier findet man die entsprechenden Repos zum selbst einbinden. NAS Besitzer können zudem in die Paketverwaltung ihres Anbieters schauen. Viele bieten **Caddy** bereits selbst an.

Status prüfen:

```bash
systemctl status caddy
```

Das war es schon. **Caddy** läuft, tut aber aktuell noch rein gar nichts. Das ändern wir nun.

## Caddy: Minimale Konfiguration fürs Heimnetz

Ich möchte für mein Heimnetz nun zwei Dinge erreichen:

1. Ich möchte Domains für verschiedene IP-Adressen hinterlegen
2. Caddy kümmert sich um die Verschlüsselung

Dafür benötigen wir eine minimale Konfiguration. Dazu muss das entsprechende File von **Caddy** bearbeitet werden.


```bash
nano /etc/caddy/Caddyfile
```

Die minimale Konfiguration sieht dann wie folgt aus. Ich zeige hier Beispieleinträge. Diese muss man natürlich auf sein eigenes Heimnetz hin anpassen.

``` bash
paperless.lan {
        tls internal
        reverse_proxy 192.168.178.65:8000
}
jellyfin.lan {
        tls internal
        reverse_proxy 192.168.178.62:8096
}
homeassistant.lan {
        tls internal
        reverse_proxy 192.168.178.12:8123
}
termix.lan {
        tls internal
        reverse_proxy 192.168.178.67:9090
}
pihole.lan {
    tls internal
    redir * /admin{uri}
    reverse_proxy 192.168.178.66:8080
}
```

Jede von mir angelegte Domain wird mit geschweiften Klammern umfasst. Der Eintrag `tls internal` teilt Caddy mit, dass die Verschlüsselung über das selbst signierte Zertifikat erfolgt. Mittels `reverse_proxy` teile ich **Caddy** mit, auf welche IP-Adresse weiter geleitet werden soll, wenn die angegebene Domain angesteuert wird. Im Falle des *Pi-hole* habe ich noch eine Weiterleitung auf `/admin` hinzugefügt, da hier die Weboberfläche zu finden ist.

Die neue Konfiguration wird nun gespeichert. Anschließend führe ich nacheinander drei Kommandos aus:


``` shell
caddy fmt --overwrite /etc/caddy/Caddyfile
caddy validate --config /etc/caddy/Caddyfile
systemctl restart caddy
```

1. Ich lasse die Formatierung von **Caddy** einmal bereinigen
2. Mittels `validate` lasse ich **Caddy** überprüfen, ob ich eine gültige Konfiguration erstellt habe. Syntaxfehler lassen sich hier abfangen.
3. **Caddy** neustarten, um die neue Konfiguration zu übernehmen. (Es reicht bereits `reload`, aber bad habbits die hard bei mir).

Fertig. **Caddy** ist installiert, läuft, aber ich kann immer noch nichts damit anfangen.

## Problem Nummer 1: Die Namensauflösung

Das Thema der Namensauflösung im lokalen Netzwerk ist sehr komplex. Zu komplex, um es in diesem Artikel zu behandeln. Ich empfehle für einen Einstieg einen Artikel des [Elektronik Kompendiums](https://www.elektronik-kompendium.de/sites/net/0901081.htm). Wer ein Heimnetz betreibt, hat sich aber sicherlich bereits damit auseinandergesetzt.

Bei mir ist für die Namensauflösung vor allem ein *Pi-hole* zuständig. Damit meine von mir ausgedachte Adresse (z.B. `homeassistant.lan`)  sein Ziel auch findet, muss ich dem *Pi-hole* mitteilen, dass sich **Caddy** um diese Adresse kümmert. Dazu melden wir uns auf der Weboberfläche vom *Pi-hole* an und navigieren zu *Settings* → *Local DNS Records*. Dort findet sich eine Tabelle, in der die Domain und die IP von **Caddy** eingetragen wird. Das sollte dann in etwa so aussehen:


| Domain            | IP                 |
| ----------------- | -------------------- |
| paperless.lan | 192.168.178.70 |
| jellyfin.lan  | 192.168.178.70 |
| homeassistant.lan  | 192.168.178.70 |

... usw. 

Wann immer ich nun eine dieser Domains im Browser eines Clients aufrufe, reicht *Pi-hole* diese an **Caddy** weiter und dieser leitet mich dann zur IP und ggf. dem Port des gewünschten Services weiter. 

Das funktioniert aber immer noch nicht. Keine Sorge, wie haben es bald.

## Problem Nummer 2: Papiere bitte. Das Zertifikat

Um eine verschlüsselte Verbindung aufzubauen, verlangen Browser und Apps ein Zertifikat. Ganz furchtbar grob vereinfacht teilt dieses Zertifikat mit, dass die Verbindung vertrauenswürdig ist und die Verbindung daher zustande kommen darf. Dieses Thema ist ebenfalls zu komplex für diesen Artikel, ein Deepdive zudem auch nicht notwendig. Denn **Caddy** stellt dieses Zertifikat bereit.

In meinem Debian LXC finde ich es im Pfad:

```bash
/var/lib/caddy/.local/share/caddy/pki/authorities/local/root.crt
```

Wer es dort nicht findet, muss sich auf die Suche begeben:

```bash
find /var/lib/caddy -name "*.crt"
```

Wie kommt das Zertifikat nun auf den Client? Von `curl` bis `scp` ist alles erlaubt und funktioniert. Oder man bastelt sich einen miniminimalen Webserver. Python 3 bringt diesen praktischerweise mit und es ist in meinem LXC vorinstalliert.

``` shell
mkdir /tmp/caddy-cert
cp /var/lib/caddy/.local/share/caddy/pki/authorities/local/root.crt /tmp/caddy-cert/
cd /tmp/caddy-cert
python3 -m http.server 8000
```

1. Wir erstellen einen temporären Ordner
2. Das Zertifikat wird dort rein kopiert
3. Wir wechseln in den Ordner
4. Wir starten den Python Webserver. Dieser ist unter `IP-Adresse von Caddy:8000` erreichbar. Dort öffnet sich eine einfache HTML-Seite und das Zertifikat kann mit einem Klick herunter geladen werden. Der Server kann mit `STRG + C` beendet und der Ordner in `/tmp` gelöscht werden. 

Das Zertifikat muss nun auf allen Clients installiert werden, auf dem die lokalen Domains funktionieren sollen.

Leider ist auch das ein recht kompliziertes Thema. Ich empfehle die Suchmaschine der Wahl nebst dem Suchbegriff *"Betriebssystem + SSL-Zertifikat installieren"*. Ich empfehle es systemweit zu installieren, da so auch Apps (z.B. Home Assistant Clients, Jellyfin Clients) diese finden und nutzen können. Wer das Zertifikat nur im Browser (Bsp. Firefox unter *Einstellungen* → *Datenschutz & Sicherheit* → *Zertifikate*) installiert, kann es auch nur in diesem nutzen. 

### Beispiel: Windows (soweit ich mich erinnere)

- `root.crt` öffnen (Doppelklick)
    
- Zertifikat installieren
    
- Lokaler Computer
    
- Vertrauenswürdige Stammzertifizierungsstellen
    

###  Beispiel: Android

- Zertifikat auf das Gerät kopieren
    
- Einstellungen → Sicherheit → Zertifikat installieren

Es könnte ggf. gemeckert werden, dass es sich um ein selbst signiertes Zertifikat handelt. Das ist okay, denn wir haben **Caddy** installiert und vertrauen daher der Vergabestelle. Es handelt sich nicht um ein wildfremdes Zertifikat mit fragwürdiger Vergangenheit, strengem Geruch und einem Glücksspielproblem.

## War es das?

Das war es so weit.

1. Wir haben Caddy installiert
2. Wir haben eine minimale Konfiguration angelegt
3. Die Namensauflösung erfolgt in diesem Beispiel über *Pi-hole*
4. Wir haben das Zertifikat heruntergeladen und installiert

Wenn ich nun im Browser *https://homeassistant.lan* eingebe, fängt *Pi-hole* diese Adresse ab und löst sie zur IP-Adresse von **Caddy** auf. **Caddy** leitet mich dann auf die eigentliche IP-Adresse und ggf. Port des Dienstes / Containers / der VM weiter und bestätigt zudem, dass die Verbindung vertrauenswürdig ist. Das erkennt man zum Beispiel am Schloss-Symbol im Browser. Die übertragenen Daten haben also ab sofort eine Transportverschlüsselung.

Statt IP-Adressen kann man sich nun knackige Domains merken. Weitere lassen sich einfach und jederzeit hinzufügen. Cool, oder?
    
## Fazit

**Caddy** hat zwei Probleme bei mir gelöst. Erstens muss ich mir keine langen IP-Adressen mehr merken. Ich gehe zwar sehr strukturiert bei der Vergabe von IP-Adressen im Heimnetz vor. Aber bei vielen Diensten kommen noch Ports dazu und irgendwann verliert auch mein innerer Beamter den Überblick. Die Nutzung eigener und privater Domains lindert dieses Problem.
Zweitens verlangen immer mehr Dienste eine verschlüsselte Verbindung. Dabei ist es egal, ob der Dienst keinen Zugriff auf das Internet hat. Ich halte das für sinnvoll, auch wenn es mich ab und zu nervt. **Caddy** hat bei mir beide Probleme gelöst.

Mir ist aber auch klar, dass Themen wie die lokale Namensauflösung und die Installation selbst signierter Zertifikate keine Anfängerthemen sind. Wer mit dem Hosten eigener Dienste und Apps anfängt, muss sich früher oder später damit auseinandersetzen. Ich empfehle früher, denn wer einmal mit dem Hosten eigener Dienste anfängt, wird schnell süchtig.

Wer sich dies aber traut, findet mit **Caddy** einen praktischen Reverse Proxy. Dazu sei erwähnt, das **Caddy** noch wesentlich mächtiger ist, als es diese kleine Anleitung suggeriert. Ich empfehle als Ergänzung zu diesem Sujet unbedingt einen Blick in die offizielle Dokumentation (siehe unten). 

Happy Hosting!

## Ressourcen

* [Die offizielle Website von Caddy](https://caddyserver.com/)

* [Die Dokumentation von Caddy (Englisch)](https://caddyserver.com/docs/)

* [Das GitHub Repo von Caddy](https://github.com/caddyserver/caddy)

