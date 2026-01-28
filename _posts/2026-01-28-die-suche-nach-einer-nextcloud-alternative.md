---
layout: post
title: "Die Suche nach dem Mini-Nextcloud"
date: 2026-01-28 08:36:49 +0100
category: selfhosting
author: 
tags: [selfhosting, nextcloud, linux, proxmox]
description: "Es ist wie mit dem Bernsteinzimmer. Manche Suchen dauern halt länger."
image:
  path: /assets/img/post-header/header-auf-der-suche.jpg
  alt: Wer suchet der findet. Irgendwann.
---

# Die Reise bisher

Ich möchte auf keinen Fall falsche Erwartungen wecken. Ich liebe Nextcloud und halte es für eine großartige Groupware Lösung aus Europa. Wenn es um eine moderne UI, großen Funktionsumfang und Datenschutz geht, sitzt diese Software ganz vorne im Bus. Als meine große Migrationsbewegung weg aus der kommerziellen Cloud rein in das heimelige Nest des „Selbsthosterei“ ging, war Nextcloud das Erste, was ich installiert hatte. Dank den [Proxmox Helper Scripts](https://markus-daams.com/posts/proxmox-helper-scripts-vorgestellt/) waren Installation und Konfiguration zudem kein Problem.

Warum also Suche ich nach einer Alternative, wenn ich doch alles habe, was ich brauche? Die Antwort klingt sicherlich ein wenig paradox, aber ich habe mehr bekommen als ich brauche. Viel mehr. Nextcloud ist ein Ausstattungsmonster aller erster Kajüte. Ich habe nicht nur eine Cloud Anwendung bekommen, mit der ich OneDrive von Microsoft ersetzten konnte. Nextcloud lässt sich spielend einfach um Office, Chat, AI Assistenten, Musik Verwaltung, Foto Verwaltung und vielem mehr erweitern. Davon muss ich nichts nutzen, ein Glück. Aber eine so mächtige Lösung will dennoch richtig administriert werden. Das Backend von Nextcloud ist komplex und mächtig. Es braucht dementsprechend viel Liebe vom Admin.

Daher bin ich auf der Suche nach einer einfachen Lösung zum Speichern und Verteilen von Dateien über mehrere Geräte hinweg. Deswegen probiere ich immer einmal wieder etwas Neues aus. Und weil mir danach ist, berichte ich auch davon.

## Was genau will ich eigentlich?

Immerhin hatte es Nextcloud in meine [„Top 10 Apps zum selbst hosten“](https://markus-daams.com/posts/meine-self-hosting-hitlist/) geschafft. Daher ist es an der Zeit, einmal aufzulisten, was ich mir von einer Alternative erhoffe:

1. Dateien aller Art auf meinem Server speichern. Ich will ja nicht weg vom Cloud Gedanken, sondern nur Weg von Big Tech.

2. Files lasse sich im Browser ansehen und verwalten. Eine klassische Web-Ansicht.

3. Der Ordner mit den Files lässt sich in Dateibrowser wie Dolphin (KDE) oder Nautilus (Gnome) einbinden, sodass ich sie auf den verschiedenen Rechnern bearbeiten und verwalten kann.

4. Einfache Administration. Die Installation darf gerne komplex sein. Später möchte ich aber nur noch aktualisieren müssen, ohne Suchmaschinen-Orgien starten zu müssen, weil ich die Mutter aller kryptischen PHP Fehlermeldungen erhalten habe, die der Menschheit zuvor völlig bekannt war.

5. Nett wäre auch noch die Möglichkeit, die Dateien in Android einzubinden.

Das ist doch nicht zu viel verlangt. Oder? ... Oder? Na ja, Open Source sollte es auch sein. Jetzt ist aber Schluss mit dem Wunschkonzert. Mal schauen, was heute auf dem Menü steht.

## Filebrowser Quantum

Die gute Nachricht ist, dass es inzwischen reichlich Alternativen gibt, meine Ziele „irgendwie“ zu erreichen. Bei meinem Streifzug durch die Selfhosting-Communities im Internet bin ich auf den **FileBrowser Quantum** gestoßen.  Es handelt sich um einen Fork eines anderen Open Source Projektes mit Namen **Filebrowser**. Die Macher haben sich auf die Fahne geschrieben, ihren Fort mächtig aufzubohren. Für Details empfehle ich die [GitHub Page](https://github.com/kenrmayfield/filebrowserquantum) des Projekts, da sich hier auch eine große Vergleichstabelle finden lässt. Es ist kostenlos und steht unter der Apache License 2.0 Lizenz, was für meine Zwecke völlig reicht.

Die Hardware Anforderungen sind zudem moderat:

* 180 MB Docker Image (mit ffmpeg)
* 256 MB Ram (soll reichen)
* GPU wird aktuell nicht benötig
* CPU: Kartoffel wird wohl langen

Die Installation lässt sich unter Linux auf zwei Wegen erledigen. Man kann fertig kompilierte Binaries herunterladen und dann einen Systemd Service daraus basteln, oder man nimmt Docker.

Da ich das Projekt erst einmal nur testen möchte, entscheide ich mich für Docker (Compose). Dafür setze ich mir einen kleinen LXC mit einem CPU-Kern, 256 MB Ram und 20 GB Speicher auf. Ich installiere Docker und Docker Compose und auf geht die Reise.

Ich lege als Erstes ein Arbeitsverzeichnis an. Ich halte mich hier zudem möglichst eng an die [offizielle Anleitung](https://filebrowserquantum.com/en/docs/getting-started/docker/)

```shell
mkdir -p filebrowser/data
cd filebrowser
```
Das Config-File wird in ``data`` abgelegt.

``` shell
touch data/config.yaml
```

Dieses File bleibt für den Start übersichtlich:

``` yaml
server:
  sources:
    - path: /folder
      config:
defaultEnabled: true
``` 
{: file="data/config.yaml" }

Bevor ich das Compose File erstelle, will ich noch fix einen anderen Ordner anlegen, denn meine „Cloud“ Daten speichere ich außerhalb des Arbeitsverzeichnisses:
``` shell
mkdir  /home/my-files
```

Weiter geht es nun mit dem Docker Compose File. Hier weiche ich von der Anleitung ab, die aus mir unerfindlichen Gründen für ein Produktivstem die Beta-Version vorschlägt. No risk, no fun? Klar, es ist nur ein Test, aber doch lieber nah am Produktivsystem. Ich wechsle auf eine stabile Version. 

``` yaml
services:
  filebrowser:
    image: gtstef/filebrowser:1.1.1-stable 
    environment:
      FILEBROWSER_CONFIG: "data/config.yaml" # Überschreibt den Default Pfad ./config.yaml
      FILEBROWSER_ADMIN_PASSWORD: "Supergeheimes-Passwort" # oder halt .env, wie jeder mag
    volumes:
      - /home/my-files:/folder # Ich will meine Daten ja woanders speichern
      - ./data:/home/filebrowser/data
    ports:
      - 80:80
    restart: unless-stopped
```
{: file="docker-compose.yaml" }

Mehr ist es auch nicht und ich bin startbereit:

``` shell
docker-compose up -d
```

![Quantum FileBrowser Anmeldemaske](/assets/img/quantum-filebrowser/quantum-fb-anmeldung.jpg){: width="600"}
_Nach dem Start erscheint die Anmeldemaske (Screenshot: Markus Daams / 2026)_

Der Benutzername lautet **admin** und das Passwort wurde im Docker Compose File hinterlegt. 

## Das erste Look & Feel

Ich werde von einer modernen UI begrüßt. Auf der linken Seite finde ich die „Action Bar“ und die zentrale Ansicht ist ganz den Dateien vorbehalten. Diese Bar kann ausgeblendet werden, wenn man es so lieber mag. Ich kann zudem auch sofort loslegen und Dateien per „Drag & Drop“ in den Browser ziehen. Diese werden sofort hoch geladen, was mir ein informatives Pop-up bestätigt. 


![Quantum FileBrowser Startseite](/assets/img/quantum-filebrowser/quantum-fb-startseite.jpg){: width="600"}
_Die Startseite von Quantum FileBrowser (Screenshot: Markus Daams / 2026)_

Ordner können ebenfalls direkt angelegt werden. Es gibt ein Kontext-Menü für den Rechtsklick, ein wirklich nettes, kleines Feature. Das Administrationsmenü wirkt aufgeräumt und nicht überladen. Es gibt zahlreiche Möglichkeiten, das Verhalten der UI und die Freigabeoptionen anzupassen. Ich kann die Sprache auf Deutsch umstellen und auch das Design ein wenig anpassen.

![Quantum FileBrowser Administrationseinstellungen](/assets/img/quantum-filebrowser/quantum-fb-administrationseinstellungen.jpg){: width="600"}
_Die Administrationseinstellungen vom Quantum FileBrowser (Screenshot: Markus Daams / 2026)_

Von den Dateien werden Miniaturvorschauen erstellt. Bei einem „Mouse Over“ wird eine vergrößerte Ansicht dieser Vorschau gerendert. Zumindest bei PDF-Dateien hat dies bei mir aber ein paar Sekunden gedauert. Dieses Verhalten lässt sich zudem auch deaktivieren, wenn man so etwas nicht mag. Klicke ich doppelt auf ein Bild in meinem neu angelegten Bilderordner, kann ich per Pfeil-Tasten durch die Bilder navigieren. Ich bekomme für alle möglichen Dateien irgendetwas als Vorschau angezeigt, top! Video lassen sich abspielen, Textdateien lesen usw. Nur Office-Dokumente sehen furchtbar aus. Das ist aber verschmerzbar, denn ich arbeite hier mit der absoluten Basis-Konfiguration.

## Da geht mehr

In der offiziellen Dokumentation finde ich die Möglichkeit, die Medienintegration mit einer separaten ``ffmpeg`` Installation [aufzuboren](https://filebrowserquantum.com/en/docs/integrations/media/configuration/). Auch  die Einbindung einer Office-Lösung ist möglich. Hier wird aktuell „Onlyoffice“ unterstützt. Ich muss also einen Dokumenten-Server installieren und konfigurieren. Die Anleitung dazu findet sich [unter diesem Link](https://helpcenter.onlyoffice.com/de/docs/installation/docs-community-install-ubuntu.aspx). Hiermit steigen aber die Hardware-Anforderungen (min. 2 CPU Kerne, 2 GB Ram, 40 GB HDD und als Nachtisch noch 4 GB Swap ) und der Administrationsaufwand, denn Onlyoffice braucht zudem *Nginx*, *Postgres* und noch ein paar mehr Komponenten. So weit muss ich dann nicht gehen. Generell begrüße ich aber die Möglichkeit, Office anbinden zu können, falls ich es einmal brauche.

Weiterhin lassen sich weitere Quellen für Dateien hinzufügen. Aktuell habe ich ja nur ein lokales Verzeichnis gemountet. 

Prinzipiell könnte ich aber weitere Freigaben aus dem lokalen Netzwerk und sogar Cloud-Dienste wie OneDrive einbinden. Das habe ich tatsächlich auch versucht, aber Microsoft blockiert inzwischen alle möglichen Anmeldeversuche von Drittanbieter-Apps. Es war eine gute Entscheidung, von dort die Segel zu streichen.

Wie dem auch sei, ich kann den **Quantum FileBrowser** sukzessive erweitern, was ich sehr begrüße. Da ich mir aber auf die Fahne geschrieben habe, den Administrationsaufwand zu reduzieren, belasse ich es erst einmal wie es ist und teste den Betrieb für eine Weile.

Eine vollständige Konfiguration (``config.yaml``) findet sich übrigens [unter diesem Link](https://github.com/gtsteffaniak/filebrowser/blob/main/frontend/public/config.generated.yaml). Da kann man sich eine Übersicht verschaffen, was jetzt schon alles möglich ist.

## Da fehlt noch was

Die native Einbindung in meine Dateibrowser Dolphin und Nautilus scheint allerdings nicht möglich. Das ist erst einmal nicht schlimm, denn der Fokus des Projektes liegt klar auf eine angenehme Benutzererfahrung im Browser, was auch mehr als gelungen ist. Hierfür wäre zum Beispiel die Unterstützung eines Protokolls wie WebDAV notwendig. Ein kleiner Funfact für mich ist, dass Nextcloud dies nativ unterstützt, aber schnell weg mit der Spitzfindigkeit.

Wie kann ich dieses Problem lösen?

Da ich die Dateien unter ``/home/my-files`` speichere, ist es möglich, einen zweiten Dienst auf den Ordner zu legen, der es mir ermöglicht, die Dateien im Netzwerk zu teilen. Da hätten wir:

- Samba (Mag ich einfach nicht, aus vielen, teils irrationalen Gründen)
- NFS Share (Wenn man es mal konfiguriert hat… ein sehr großes WENN)
- Selbst einen WebDAV Server starten

Das probiere ich einmal.

``` shell
sudo apt install rclone
```

Danach starte ich das testweise:

``` shell
rclone serve webdav /home/my-files --addr 0.0.0.0:8080 --user admin --pass Geheimmmm
```
Im KDE Dolphin gebe ich in der Adresszeile das Protokoll und die IP des Containers ein, also ``webdav://192.168.178.64:8080``. Nach dem Login sehe ich die Dateien.

![Dateien in Dophin per Webdav](/assets/img/quantum-filebrowser/quantum-fb-webdav.jpg){: width="600"}

Prima, das klappt. Ich baue mir einen Systemd Dienst:

``` shell
sudo nano /etc/systemd/system/webdav-quantum.service
```

``` shell
[Unit]
Description=WebDAV Server für den Quantum FileBrowser
After=network.target

[Service]
Type=simple
User=LinuxUsername
ExecStart=/usr/bin/rclone serve webdav /home/my-files --addr 0.0.0.0:8080 --user admin --pass  Geheimmmm
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
```
{: file="/etc/systemd/system/webdav-quantum.service"}

Jetzt muss der Dienst registriert und gestartet werden:

``` shell
sudo systemctl daemon-reload
sudo systemctl enable webdav-quantum.service
sudo systemctl start webdav-quantum.service
```

Und am Ende noch ein Check:

``` shell
sudo systemctl status webdav-quantum.service
```

Die Ausgabe sollte in etwa so aussehen, ich kann dies hier leider nicht gut darstellen. 

``` terminal
* webdav-quantum.service - WebDAV Server for Quantum FileBrowser
     Loaded: loaded (/etc/systemd/system/webdav-quantum.service; enabled; preset: enabled)
     Active: active (running) since Wed 2026-01-28 13:04:30 CET; 9s ago
   Main PID: 69161 (rclone)
      Tasks: 7 (limit: 18962)
     Memory: 10.5M
        CPU: 59ms
     CGroup: /system.slice/webdav-quantum.service
             `-69161 /usr/bin/rclone serve webdav /home/my-files --addr 0.0.0.0:8080 --user admin --pass Geheimmmm
```

Wichtig ist, der Service ist **active** und **running**. Zudem startet der Dienst nach einem Neustart automatisch neu. Meine Linux Clients können die Freigabe beim Start automatisch mit einbinden. Da es auch WebDAV Clients für Android gibt, habe ich dieses Problem gleich mit abgefrühstückt. 

## Vorläufiges Fazit

Der **Quantum FileBrowser** konzentriert sich auf wesentliche Funktionen, was mir bei meiner Suche sehr zugegen kommt. Die Installation und Konfiguration ist in dem Sinne einfach, dass ich einmalig das „Docker Gelöt“ einrichten muss, es danach aber läuft. Direkt nach der Installation lief alles Wichtige so, wie ich das auch erwartet habe. Ich konnte sofort loslegen und Dank einer modernen UI lässt sich alles intuitiv bedienen.

Hinsichtlich der zweiten Anforderung, die Dateien in meine Dateibrowser Dolphin und Nautilus einzubinden, habe ich einen gangbaren Weg gefunden. WebDAV ist für mein lokales Netzwerk völlig ausreichend. Freigaben im Internet benötige ich nicht, da ich mir hier mit VPN-Verbindungen weiterhelfe. Damit entfällt weiterer Konfigurationsaufwand. Nice, ich gönnen mir ein paar Kekse und einen Tee.

Ich werde diese Lösung nun eine Zeit lang testen. Stoße ich auf keine größeren Schwierigkeiten, kann ich mir vorstellen, meine Nextcloud-VM zu ersetzen. Die Ergebnisse stelle ich dann in meinem kleinen Blog vor.

## Ressourcen

* [Die Website des FileBrowser Quantum](https://filebrowserquantum.com/en/)
* [Offizielles GitHub Projekt vom FileBrowser Quantum](https://github.com/kenrmayfield/filebrowserquantum#Apache-2.0-1-ov-file)    
* [Der Link zur Dokumentation des FileBrowser Quantum](https://filebrowserquantum.com/en/docs/)
* [Die vollständige Konfigurationsdatei für Neugierige](https://github.com/gtsteffaniak/filebrowser/blob/main/frontend/public/config.generated.yaml)

