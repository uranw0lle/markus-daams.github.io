---
layout: post
title: "Mein Heimnetz - Ein kleines Lehrstück"
date: 2026-02-11 09:58:17 +0100
category: selfhosting
author: 
tags: [proxmox, selfhosting, linux, docker]
description: "Ich wollte schnell einmal Feishin testen und startete eine kleine Selfhost-Saga"
image:
  path: /assets/img/post-header/header-feishin.jpg
  alt: Mein Heimnetz - Ein kleines Lehrstück
---

# Wie alles begann

Diesem Blog kann entnommen werden, dass ich gerne vieles selbst hoste. Dazu gehört auch meine umfangreiche Musiksammlung, die ich über die letzten Jahrzehnte angehäuft habe. Speziell bei dieser Sammlung versuche ich seit einiger Zeit so nah an das Look & Feel von Spotify heranzukommen. Ich habe Spotify sehr lange und sehr gerne genutzt. Allerdings hat sich dieser Dienst in eine Richtung entwickelt, die ich nicht mehr mitgehen wollte. AI Slop, Podcasts, Hörbücher und einiges mehr sind Dinge, die ein Musik-oholiker nicht braucht und nicht will.

An dieser Stelle spule ich nun einmal schnell vor. Ich habe mir **Navidrome** installiert, um meine Musik lokal zu hosten. Die Entwicklung dieses Projekts hat zuletzt ordentlich Fahrt aufgenommen und daher nutze ich es wieder. Jellyfin hat in Sachen Musik noch einige Baustellen, aber das ist ein Thema für einen anderen Blogartikel.

Ich bin auf das Projekt [„Feishin“](https://github.com/jeffvli/feishin) gestoßen. Die Menschen hinter diesem Projekt versuchen vor allem eins: Eine moderne UI zu entwickeln, die stark von Spotify inspiriert ist. Man stelle sich Spotify vor, aber nur für Musik. Für mich war klar, dass muss ich unbedingt mal ausprobieren. Dank Docker geht das ja ganz fix …

## … oder nicht ganz so fix

Ich hoste Navidrome in einem eigenen LXC auf meinem Proxmox-Host. Installiert habe ich es hier über [„Runtipi“](https://markus-daams.com/posts/runtipi-selfhosting-einfach-gemacht/), einem Docker-Überbau. Das klappt auch prima und ich kann meine Musik hierüber lokal streamen. Mittels VPN klappt das sogar von unterwegs – nice!

**Feishin** kann sich mit dem Navidrome Server verbinden und agiert dann praktisch als grafische Oberfläche. Es dient bei mir also als alternative Web-GUI, nur eben mit den vollen „Spotify Vibes“. Die Musik würde weiterhin von Navidrome gestreamt werden.
Installieren lässt sich **Feishin** recht einfach. Ich habe mir in Portainer ein neues Stack angelegt und mich, wie immer beim schnellen Testen, nah an die Beispielkonfiguration gehalten:

``` yaml
services:
    feishin:
        container_name: feishin
        image: 'ghcr.io/jeffvli/feishin:latest'
        restart: unless-stopped
        environment:
            - SERVER_NAME=navidrome
            - SERVER_LOCK=true
            - SERVER_TYPE=navidrome
            - SERVER_URL= http://192.168.178.67:4533
            - LEGACY_AUTHENTICATION=false
            - ANALYTICS_DISABLED=true 
        ports:
            - 9180:9180
```
Wichtig für die Konfiguration ist, dass ich angebe, dass ich mich mit einer Navidrome Instanz verbinde und wo sich diese befindet. Das ist kein Hexenwerk, aber in den hintersten Ecken meines Hirns regte sich etwas, ein leiser Verdacht, den ich erst erst einmal ignorierte.

Mein Docker Host für „ich will das einmal schnell testen“ Container läuft unter einer anderen IP-Adresse. Das ist prinzipiell kein Problem, bis Firefox mich eines anderen belehrte.

## I crossed a line

**Feshin** war erreichbar und ich konnte auch Navidrome als Server hinterlegen. Die Weboberfläche hat meine Sammlung geladen und ich fühlte sie, die „Spotify Vibes“. Ich klickte ein Album an, um es abzuspielen und es passierte … nichts. Das, was sich beim Deployen des **Feishin** Containers noch in meinem Hirn regte, manifestierte sich nun in einen Verdacht, welcher von der Entwickler-Konsole des Browsers bestätigt wurde.

> Quellübergreifende (Cross-Origin) Anfrage blockiert: Die Gleiche-Quelle-Regel verbietet das Lesen der externen Ressource auf … usw. usf.

Ganz grob erklärt: Der Browser hat **Feishin** unter der IP-Adresse des Containers erreicht, auf dem ich es hoste. Nun soll es aber Inhalte – in diesem Fall Musik – von einer anderen IP (Navidrome) laden. Moderne Browser mögen so etwas nicht, denn dem User können so unerwünschte Inhalte untergeschoben werden. Die Inhalte sollen in diesem Fall aus derselben Quelle stammen, hier also dieselbe IP. Ich hatte aber keine Lust Docker auf dem Navidrome zu installieren, da meine intrinsische Faulheit wirklich sehr intrinsisch ist.

## Schnell mal einen Reverse Proxy einschieben

Mit einem Reverse Proxy kann ich dieses Problem umgehen. Der Proxy übernimmt die Antworten auf alle Anfragen in Richtung Navidrome und **Feishin**. Rufe ich auch **Feishin** über den Reverse Proxy auf, haben Anfrage („spiel meine Musik“) und Antwort („hier, deine Musik“) folglich dieselbe Quelle, den Proxy.

Da ich auf dem Proxmox Host **Nginx** nutze, lege ich ein entsprechendes File an:

``` JS

server {
    listen 80;
    server_name music.home; # Die lokale URL!

    # Navidrome
    location / {
        proxy_pass http://192.168.178.64:4533;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
    }

    # Feishin
    location /feishin/ {
        proxy_pass http://192.168.178.67:9180/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```
**Feishin** läuft hier nun als Unterpfad, unterhalb von Navidrome. Die „Cross Origin“ ist also eliminiert. Aber funktionieren tut es noch nicht.

## Ich wollte nur schnell was testen
 
Der Docker Container kann die Domain „music.home“ nicht auflösen. Aber auch das kann ich schnell fixen, in dem ich die ``/etc/hosts`` Datei um die IP-Adresse und die Domain ergänze. Dennoch wird es noch nicht funktionieren, denn ich muss auch dem Container die neue Adresse von Navidrome mitteilen. Ich ändere die folgende Zeile im Compose File von **Feishin**:

``` yaml
SERVER_URL= http://music.home
```

Ich rufe nun ``http://music.home/feishin`` auf, stelle die Verbindung her und: Es klappt und ich kann Musik abspielen. Aber Himmel, ist das ein Gefrickel! Mich stören folgende Dinge:

- Der Proxmox Host soll nicht direkt als Reverse Proxy agieren
- Irgendwo irgendwelche Hosts Dateien anzupassen ist nicht sehr transparent
- Die Domain funktioniert nur für den einen Client
- Fedora macht bei ``.home`` Domains Ärger

## Dann halt noch einen Reverse Proxy

Es ist sinnvoll, in einem Heimnetzwerk einen zentralen Reverse Proxy einzurichten. Dieser kann alle Domains vorhalten, die man sich für all seine Apps und Dienste ausgedacht hat und nebenher als Zertifikatsstelle agieren. 

Ich habe mich für **Caddy** entschieden, weil es sich schnell installieren und konfigurieren lässt. Ich erstelle einen neuen LXC:

- Debian Bookworm
- 1 CPU
- 512 MB Ram

Das reicht völlig aus. Weiter geht es:

``` shell
apt update && apt upgrade -y
apt install caddy
```

Nun muss ich Caddy konfigurieren. Da ich eine lokale Domain nutze, muss TLS lokal gehändelt werden. Das ``CORS`` Gerümpel muss ich ebenfalls aus dem Weg räumen. Ich wechsele die lokale Domain auf die Endung ``.lan``. Fedora macht hier weniger Probleme – jedenfalls bei mir? Ich weiß es nicht, das ist ein Problem für einen anderen Tag.

Mein File sieht so aus:

``` text
music.lan {
    tls internal
    # Der CORS Header, der erlaubt, dass Feishin auf das Navidrome Backend zugreifen darf
    header {
        Access-Control-Allow-Origin "https://feishin.lan"
        Access-Control-Allow-Methods "GET, POST, OPTIONS, PUT, PATCH, DELETE"
        Access-Control-Allow-Headers "*"
        Access-Control-Allow-Credentials "true"
        Access-Control-Expose-Headers "Content-Length, Content-Range, Accept-Ranges"
        defer
    }
    # Preflight-Requests: Der Browser fragt an, ob mit CORS alles klar geht
    @options {
        method OPTIONS
    }
    handle @options {
        # Bei OPTIONS müssen die Header auch mit, aber OHNE 'defer'
        header Access-Control-Allow-Origin "https://feishin.lan"
        header Access-Control-Allow-Methods "GET, POST, OPTIONS, PUT, PATCH, DELETE"
        header Access-Control-Allow-Headers "*"
        header Access-Control-Allow-Credentials "true"
        respond 204
    }
    handle {
        reverse_proxy 192.168.178.64:4533
    }
}
# Alle anderen Requests werden an Navidrome weitergeleitet, damit es ebenfalls direkt aufgerufen werden kann
feishin.lan {
    tls internal
    reverse_proxy 192.168.178.67:9180
}
```

Das Caddy File überprüfe ich einmal kurz, formatiere es sicherheitshalber und starte **Caddy** neu:

``` shell
caddy fmt --overwrite /etc/caddy/Caddyfile
caddy validate --config /etc/caddy/Caddyfile
systemctl restart caddy
```

Caddy ist einsatzbereit, aber der Browser kann nichts damit anfangen. 

## Fast da. Fast! 

Wer sein eigenes kleines Heimnetzwerk betreibt, hat sicherlich auch einen DNS-Werbeblocker am Laufen. In meinem Fall ist es **Pi-hole**, der als Netzwerk weiter Werbeblocker agiert. Dieser übernimmt bei mir folglich die Namensauflösung. Jeder DNS-Request, der auf meinen Router trifft, wird an **Pi-hole** weiter geleitet und aufgelöst. So bleiben die Werbeserver idealerweise ausgeschlossen und alles andere wird aufgelöst.

 Hier muss sich also die URL ``feishin.lan`` in die entsprechende IP-Adresse verwandeln. Unter ``Settings`` → ``Local DNS Settings`` trage ich die Domain ``music.lan`` und ``feishin.lan`` ein, welche beide auf meinen Reverse Proxy zeigen, also ``192.168.178.70``. Caddy wird die URL ``music.lan`` direkt auf Navidrome weiter leiten.

 Auch Navidrome muss seine neue URL kennen, damit es entsprechende Anfragen bedient. Auch hier muss ich das Compose File um eine Zeile ergänzen:

 ``` yaml
 ...
 - ND_BASEURL=https://music.lan
 ...

 ```

Ich nutze ``https``. Ohne ein Zertifikat wird diese Verbindung als Unsicher behandelt und die Musik nicht abgespielt. Das heißt, ich muss das Zertifikat von Caddy lokal installieren. Dafür hole ich mir das File direkt vom Caddy Server und installiere es lokal:

``` shell
cp root@192.168.178.70:/var/lib/caddy/.local/share/caddy/pki/authorities/local/root.crt ~/caddy-root.crt
sudo cp ~/caddy-root.crt /etc/pki/ca-trust/source/anchors/
sudo update-ca-trust
```

Sicherheitshalber installiere ich das Zertifikat in Firefox unter „Einstellungen“ → Zertifikate → „Zertifikate anzeigen“ → Klick auf „Importieren“. Dieser Schritt mag aber eventuell nicht nötig sein, da Firefox auf die lokalen Zertifikate zugreifen kann – glaube ich jedenfalls.

Ich muss dieses Zertifikat auf allen Clients installieren, auf denen ich **Feishin** nutzen möchte, da nur dann eine gesicherte und vertrauenswürdige Verbindung zu Navidrome hergestellt werden kann. Das Zertifikat funktioniert zukünftig dann aber für alle Domains, die ich in **Caddy** eingetragen habe. Nimm das, sehr intrinsische Faulheit!

**Feishin** kann nun die Verbindung zu Navidrome herstellen und die Musik abspielen. Zudem kann ich beide Domains verschlüsselt aufrufen. 

Der nicht mehr so kurze Test ist am Ende erfolgreich, immerhin.

## Es funktioniert. Aber ... ein Fazit.

Mein „kurzer Test“ wurde zur persönlichen Lehrstunde der Heimvernetzung. Ich hatte mich schon in der Vergangenheit mit CORS Problemen herumgeplagt, insbesondere bei selbst entwickelten Apps, die ich lokal gehostet habe. Ich habe mir dann häufig mit fragwürdigen Browser Add-ons weitergeholfen, oder selbst entwickelten Backends gleich mit auf den Weg gegeben, einfach alle CORS Anfrage zu ignorieren – meine zweiten und dritten Vornamen sind „Security Breach“. 

Durch meinen Test war ich nun gezwungen, eine etwas robustere Lösung aufzubauen. **Caddy** ist ein guter Anfang, denn ich kann ich lokale Domains hinterlegen und den Clients brauche ich nur noch das Zertifikat mit auf den Weg zu geben. Ich gebe aber zu, ich habe die Komplexität von Anfang an unterschätzt. Ich habe ein klein wenig aus den Augen verloren, dass mein kleines Netzwerk komplizierter geworden ist.

Ich schätze, ich muss mir mal ein UML-Diagramm erstellen. Da gibt es bestimmt etwas, das ich selbst hosten und schnell mal testen kann 😏

## Ressourcen

* [Feishin auf Github](https://github.com/jeffvli/feishin)

* [Die offizielle Website von Caddy](https://caddyserver.com/)

* ['Global Options' in der Dokumentation von Caddy](https://caddyserver.com/docs/caddyfile/options#admin)







