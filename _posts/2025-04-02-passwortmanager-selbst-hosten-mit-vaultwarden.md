---
layout: 
title: "Passwortmanager selbst hosten mit Vaultwarden"
date: 2025-04-02 06:45:04 +0200
category: selfhosting
author: 
tags: [selfhosting, runtipi]
description: "Wie man den Passwortmanager Vaultwarden selbst hosten kann, erkläre ich in diesem Artikel."
image:
  path: /assets/img/post-header/header-vaultwarden.jpg
  alt: Vaultwarden selbst hosten
---

# Der Weg zum selbst gehosteten Passwortmanager

Wie viele meiner Projekte, die ich selbst hosten möchte, begann auch dieses mit der guten alten menschlichen Gier. Ich habe bisher einen kostenpflichtigen Passwortmanager genutzt. Für diesen hatte ich einmalig einen Betrag bezahlt mit dem Versprechen, dass ich nun für immer die Premiumversion habe. Ein paar Jahre später hat sich der Anbieter aber dazu entschieden, auf eine monatliche Zahlungsweise umzustellen. Ich habe zwar meine bisherigen Features behalten, aber für die Super-Premium-Features wie zum Beispiel die Speicherung von Passkeys, sollte ich nun extra latzen.

Ich nutze Passkeys aber sehr gerne und nach [diesem Video von c't 3000 über Passkeys](https://www.youtube.com/watch?v=u7Ti-Jc-b3A) (Youtube, 14:52 min) habe ich mich aufgerafft, einen eigenen Passwortmanager zu hosten.

## Vaultwarden

Ich habe mich für **Vaultwarden** entschieden. Folgende Features bringt es mit:

* Vollständig open source
* Multi-User fähig
* Zwei-Faktor-Authentifizierung
* Vollständige Ende-zu-Ende Verschlüsselung
* Zusäztliche Sicherung durch z.B. YubiKey möglich
* Speicherung von Passkeys ist Geräte- und Betriebssystem übergreifend möglich
* Die **Bitwarden** Apps lassen sich auf allen Geräten nutzen, die ich nutze
* Und vieles mehr!

Die benötigte Verschlüsselung der Verbindung vom Client zum Server macht es aber ein klein wenig komplizierter, **Vaultwarden** selbst zu hosten. Auf diesen Punkt gehe ich daher in diesem Artikel auch genauer ein. 

## Vaultwarden, Bitwarden, hö?

Mit **Bitwarden** hat alles angefangen. Hier kann man sich registrieren und seine Passwörter zentral speichern. Hier gibt es auch einen kostenlosen Tarif. Premiumfunktionen kosten jedoch extra. Die Passwörter werden zudem bei **Bitwarden** gespeichert.

**Vaultwarden** ist ein inoffizieller Fork von **Bitwarden**. Die Passwörter werden dann auf dem eigenen Server gespeichert.

 Genau wie **Vaultwarden** ist die App von **Bitwarden** kostenlos uns steht für Windows, Linux, Mac, Android, iOS usw. zur Verfügung. Addons für alle bekannten Browser gibt es natürlich auch. 
 
 Zusammegfasst: Serverseitig nutzen wir **Vaultwarden**, Clientseitig **Bitwarden**. 

## Was wir werden machen müssen

Damit **Vaultwarden** im lokalen Netzwerk verwendet werden kann, müssen ein paar Dinge erledigt werden. Das sind:

* Eine Hosting-Umgebung muss her 
* **Vaultwarden** installieren
* SSL-Zertifikat bereit stellen und installieren
* DNS-Auflösung konfigurieren, für die lokale Domain

Diese Punkte nenne ich eimnmal vorweg, damit von Anfang an klar ist, was alles erledigt werden muss.

## Mit Runtipi geht es los

Um **Vaultwarden** selbst hosten zu können, benötigt man einen Server. Hierfür eigenen sich **Proxmox**, ein **Raspberry Pi**, **TrueNAS**, **Unraid**, alles, auf dem **Docker** läuft usw. usf. Ich habe mich dazu entschieden, **Vaultwarden** innerhalb meiner bereits existierenden **Runtipi** Instanz zu hosten, denn es nimmt mir viel Arbeit ab. In [diesem Artikel](https://markus-daams.com/posts/runtipi-selfhosting-einfach-gemacht/) erkläre ich, was **Runtipi** ist und wie man es installieren kann. 

## Ein digitales Vorhängeschloss - Das SSL-Zertifikat

Um **Vaultwarden** zu verwenden, benötigt man eine verschlüsselte Verbindung. Unverschlüsselte Anfragen an den Server werden zumindest in den neueren Versionen nicht mehr unterstützt. Das ist durchaus sinnvoll, denn es geht hier um eine Transportverschlüsselung von sehr wichtigen Daten zwischen Server und Client. Damit das funktioniert, brauchen wir:

- Eine Möglichkeit, Anfragen auf den Port 80 (unverschlüsselt) automatisch auf den Port 443 (verschlüsselt) weiterzuleiten
- Die verschlüsselte Verbindung wiederum benötigt ein Zertifikat, auch im Heimnetzwerk

= Kurz um, es wird ein Reverse Proxy benötigt, wie zum Beispiel **nginx**, welcher die Weiterleitung vornimmt und das Zertifikat vorhält.

Wer **Vaultwarden** also über **Docker** oder **Proxmox** installiert, muss zusätzlich einen [Reverse Proxy](https://de.wikipedia.org/wiki/Reverse_Proxy) installieren und konfigurieren, um es nutzen zu können. Und hier kommt **Runtipi** ins Spiel, denn es bringt all dies schon mit:

- Eine lokale (Sub)Domain (*vaultwarden.tipi.local*)
- Eine automatische Portweiterleitung
- Ein Zertifikat für die Endgeräte 

## Und so geht's

Innerhalb von **Runtipi** wechseln wir in den App Store und suchen nach **Vaultwarden**. Mit einem Klick auf *Install* können wir es installieren. Wichtig! Im Konfigurationsfenster muss ein Passwort für das Admin Panel von **Vaultwarden** hinterlegt werden. Außerdem wird hier auch der Schieberegler für die Verfügbarmachung im lokalen Netzwerk aktiviert.

![Vaultwarden in Runtipi - Konfigurationsfenster](/assets/img/vaultwarden/vaultwarden-konfigurationsfenster.jpg)
_Hier muss ein Adminpanel Passwort hinterlegt werden. Den Schieberegler für das lokale Netzwerk aktivieren wir ebenfalls._

Ist dies erledigt, wird **Vaultwarden** installiert und automatisch gestartet. Theoretisch kann es nun schon genutzt werden, aber wir brauchen ja noch das Zertifikat. 

## Das selbst erstellte SSL-Zertifikat

Im Menü geht es weiter zu *Einstellungen* (oben) -> *Einstellungen* (Reiter innerhalb des Menüs, welches sich öffnet). Ganz unten gibt es den Menüpunkt *Zertifikat herunterladen*. Diesen Button einmal anklicken und es wird eine Datei mit dem Namen **cert.pem** heruntergeladen. Dieses Zertifikat muss nun auf allen Geräten installiert werden, auf denen man **Bitwarden** verwenden möchte.

Hier ein paar Beispiele, wie das Zertifikat installiert werden kann.

### Zertifikat unter Linux installieren 

Um das Zertifikat unter Linux zu installieren, kopiert man dies einfach an den entsprechenden Ort und macht es im System bekannt.

Beispiel:

```bash
sudo cp cert.pem /usr/local/share/ca-certificates/
```

> Der Pfad kann je nach Distribution abweichen. Bei Fedora lautet dieser zum Beispiel '/etc/pki/ca-trust/source/anchors/ ' Ggf. einfach nach 'Meine Distro + ca certificat' duckduck-goen.
{: .prompt-info} 

Mit diesem Befehlt wird das Zertifikat dann im System bekannt gemacht:

```bash
sudo update-ca-certificates
```

### Zertifikat unter Windows installieren

* *Windows Taste* drücken, *certmgr.msc* tippen und *Enter*.
* Im neuen Fenster nun auf *Vertrauenswürdige Stammzertifizierungsstellen* klicken und im rechten Fenster auf *Zertifikate*
* Klicken auf *Aktion* -> *Alle Aufgaben* -> *Importieren* 
* Im neuen Fenster auf *Weiter* -> *Durchsuchen* -> Zertifikat auswählen und beenden

### Zertifikat unter Android installieren

* *Einstellungen* öffnen
* *Sicherheit und Datenschutz* -> *Weitere Sicherheitseinstellungen* -> *Vom Gerätespeicher installierten* -> *CA-Zertifikat installieren*
* Warnhinweis bezüglich der Benutzer-Zertifikate akzeptieren (*Trotzdem installieren*)
* Datei auswählen und fertig

Manchmal weichen die Pfade innerhalb von Android ab. In diesem Fall einfach die Suchfunktion der Einstellungen nutzen und nach *CA Zertifikat* suchen. So bin ich ebenfalls ans Ziel gekommen. 

> Ohne installiertes Zertifikat erkennt die App von Bitwarden zwar den Vaultmanager, verweigert aber den Aufbau der Verbindung. Das Zertifikat muss also zwingend installiert werden.
{: .prompt-warning}

### Andere Systeme

Ich habe keinen Mac und kein iOS. Meine Empfehlung ist, in der Suchmaschien der Wahl nach dem OS und "CA Zertifikat installieren" suchen. Die [Website von Runtipi](https://runtipi.io/docs/guides/local-certificate) hat hierzu ebenfalls ein paar Anleitungen parat. 

## So, und nun noch das DNS Gelöt

Um **Vaultwarden** aufzurufen, kann man nun die IP-Adresse von **Runtipi** + den zur Verfügung gestellten Port im Browser aufrufen. Oder wir verwenden die zur Verfügung gestellte Subdomain, die aber durch das DNS aufgelöst werden muss.

Viele Menschen, die bereits selbst hosten, nutzen sicherlich auch einen Werbe- und Tracking Blocker wie **Pihole** oder **Adguard**. Damit die lokale Namensauflösung klappt, müssen wir hier dann noch die neue Domain nachtragen:

Am Beispiel von **Pihole** sei dies einmal kurz erklärt:

Auf der Adminoberfläche klickt man hier auf *Settings* -> *Local DNS Records* und trägt hier die lokale Domain und die IP-Adresse nach.

![Pihole Konfigurationsfenster](/assets/img/vaultwarden/pihole-dns-records.jpg)
_Damit die Namensauflösung klappt, muss der DNS Server wissen, unter welche IP-Adresse er meinen neuen Vaultwarden findet_

Die IP-Adresse ist in diesem Fall die von **Runtipi**. Dieser kümmert sich auch um die automatische Weiterleitung auf den Port, unter dem die neue App, also **Vaultwarden**, läuft. Die Domain ist innerhalb von **Runtipi** unter *Meine Apps* -> *Vaultwarden* -> *Öffnen* zu finden. 
![Runtipi - Unter dem Menüpunkt öffnen findet sich die vergebene Subdomain](/assets/img/vaultwarden/runtipi-subdomain-herausfinden.jpg)
_Unter Menüpunkt 'Öffnen' findet man die vergebene Subdomain der App, in diesem Fall Vaultwarden_

## Kein Addblocker installiert? Namensauflösung ist so eine Sache

Damit die lokale Namensauflösung klappt, muss die Domain im Netzwerk bekannt sein. Vereinfacht gesagt: Irgendwas muss meinem Endgerät mitteilen, dass die lokale Domain *vaultwarden.tipi.local* auf die IP von **Runtipi** zeigt. Es kommt also darauf an, was für die Namensauflösung zuständig ist (Domains in IP-Adressen umwandeln). Bei mir kümmert sich **Pihole** darum. Nutzt man so etwas nicht, muss diese Weiterleitung zum Beispiel im Router oder dem Betriebssystem bekannt gemacht werden. 

Unter Linux (und ich glaube auch Mac) wäre das die Datei ```/etc/hosts```. Hier hinterlegt man dann einfach die Zeilte ```192.168.178.77 vaultwarden.tipi.local``` (Achung, nur ein Beispiel für die Syntax). Ab sofort weiß der Computer, was er mit der Domain *vaultwarden.tipi.local* anfangen soll. Dies gilt übrigens für alle Apps von **Runtipi**. Die IP bleibt dabei immer gleich, nur die Domain ändert sich von App zu App. 

Unter Windows findet sich diese Datei unter ```C:\Windows\System32\drivers\etc.```.

Besser ist es aber, so etwas im Router einzutragen, da man dann nicht jeden Client einzeln konfigurieren muss. Wie das aber für den eigenen Router geht, muss ggf. mit Duckduck Go herausgefunden werden. 

> Dank Runtipi ist auch Pi-hole oder Ad-Guard mit nur einem Klick installiert. Ein lokaler DNS-Server macht aus vielen Gründen Sinn. 
{: .prompt-tip}

## Alles erledigt, und nun?

**Vaultwarden** und Zertifikat auf dem Client sind installiert, nun kann es los gehen. Im Appstore des Vertrauens (egal ob Betriebssysten oder Browser) sucht man nun nach **Bitwarden** und installiert es. Das Vorgehen ist sowohl in den Apps, als auch in den Browser Addons immer gleich:

Im Anmeldefenster klickt man zu allererst unten auf den Pfeil bei dem Feld *Zugriff auf:*. 
In dem sich öffnenden Menü nun **selbst gehostet** auswählen.

![Bitwarden - Anmeldefenster. Hier auf selbst gehostet klicken](/assets/img/vaultwarden/vaultwarden-anmeldung.jpg).
_Hier auf den Pfeil klicken und 'selbst gehostet' auswählen_

In dem neuen Fenster gibt man bei *Server-URL* die eigene Domain ein. In meinem Fall lautet diese **https://vaultwarden.tipi.local**. Diese Änderung speichern und ab sofort kann man sich registrieren oder anmelden.

> Kommt beim Anmelden in der **Bitwarden App** trotz richtiger Login-Daten eine Fehlermeldung? Die App sucht auf dem System nach dem Zertifikat. Findet es keines, gibt es leider nur kryptische Fehlermeldungen.
{: .prompt-info}

Hat die Anmeldung geklappt, kann es los gehen.

Die Admin-Oberfläche findet sich dann unter der Domain und dem Zusatz ``/admin``. In meinem Fall also ``https://vaultwarden.tipi.local/admin``.

## Fazit

Zugegeben, die Installation von **Vaultwarden** ist nicht trivial, auch nicht zusammen mit **Runtipi**. Hat man sich aber einmal die Mühe gemacht, freut man sich dann doch, dass man alle seine Passwörter lokal und sicher gespeichert werden. Die mobile App lässt sich ebenfalls lokal synchroniseren, ich benötige also nicht zwingend eine externe Verbidung. Dies ist aber dennoch möglich, wobei ich mir hier mit meiner VPN-Verbindung weiterhelfe. 

Ich hoffe, diese Anleitung hilft ein wenig weiter. Vielen Dank für's Lesen :)

## Ressourcen

* [Die Website von Vaultwarden](https://www.vaultwarden.net/)

* [Die Website von Bitwarden](https://bitwarden.com/)

* [Das Github Repo von Vaultwarden](https://github.com/dani-garcia/vaultwarden)

* [Forum rund um Vaultwarden (Englisch)](https://vaultwarden.discourse.group/)

* [Vaultwarden auf Reddit](https://www.reddit.com/r/vaultwarden/)

* [Anleitungen, wie man eigene Zertifikate auf verschiedenen OS installiert (Runtipi - Hilfeseite, auf Englisch)](https://runtipi.io/docs/guides/local-certificate)