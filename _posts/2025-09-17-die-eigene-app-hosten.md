---
layout: post
title: "Die eigene App hosten"
date: 2025-09-17 08:51:54 +0200
category: selfhosting
author: 
tags: [selfhosting, quicktipp, coding, proxmox]
description: "Mit Proxmox kann man ein App-Release simulieren. So habe ich das gemacht."
image:
  path: /assets/img/post-header/header-app-hosten.jpg
  alt: Die eigene App Hosten
---

# Die eigene App auf Proxmox hosten

Eines gleich einmal vorweg: Mein Vorgehen bei der folgenden Anleitung mutet unkonventionell an, ja geradezu leichtsinnig unprofessionell. Aber wer selbst hostet, muss auch mal bereit sein, an die Grenzen zu gehen. 

Was ist hier eigentlich mein Ziel? In meinen Artikeln über das „Vibe Coding“ habe ich beschrieben, wie ich mit einer Fingerübung angefangen habe, um eine einfache API in Rust zu schreiben. Um diese zu testen, hatte ich eine kleine App in React geschrieben. Später habe ich das dann mit meinem Interesse an Vibe Coding kombiniert und die kleine App ist zu einem Social Network eskaliert. Immerhin, die API funktioniert und ich habe Rust gegenüber eine makabere Hassliebe entwickelt, wie ich sie zuletzt bei JAVA spüren konnte. Aber das ist nicht das Thema. 

Thema ist, dass ich mir eine kleine Deployment-Umgebung schaffen wollte, um die App zu bauen und laufen zu lassen. Allerdings nur im lokalen Netzwerk, denn ich kann mein zusammen geschustertes Social Network nicht auf die Welt loslassen. 

Was genau wollte ich erreichen?

* Auf einem LXC-Container in Proxmox ein Bare Git Repo erstellen
* Den lokalen Code (Frontend: React, Backend: Rust) hochladen
* Ein Build-Script ausführen
* Die App hosten und im lokalen Netzwerk verfügbar machen

Mein Ziel war es, dass alles automatisiert abläuft. Ich lade den Code in den Container hoch und Scripte übernehmen den Rest. 

> Es sollte klar sein, aber dennoch: Erst denken, dann tippen. Ein falscher Befehl kann das System unbrauchbar machen. Die folgende Anleitung ist ziemlich wild. Sie funktioniert bei mir, aber ich kann keine Garantie übernehmen, dass sie es woanders auch tut. Küsschen.
{: .prompt-warning}

Die folgende Anleitung ist exemplarischer Natur. Die Befehle und Scripte sind speziell auf mein Projekt zugeschnitten. Ich hoffe aber dennoch, dass ich aufzeigen kann, wie man beim Hosten der eigenen App vorgehen kann. 

Legen wir los.

## Schritt 1: Container vorbereiten

Als Ausgangslage dient mir ein normaler LXC-Container, den ich aus einem Debian Template („Bookworm“) gebaut habe. Als Erstes müssen die Paketabhängigkeiten installiert werden. 

Daher aktualisieren wir zunächst das OS:

```shell
sudo apt update && sudo apt upgrade -y
```
Es folgen ein paar Standard-Tools. Vor allem **curl** wird gleich gebraucht.

```shell
sudo apt install -y git curl build-essential pkg-config libssl-dev
```
Um das Frontend im Container bauen zu können, wird Node.js benötigt. Ich benutze hier **NVM**, da man ggf. verschiedene Versionen von **Node.js** installieren kann, falls man das mal braucht. Das GitHub-Repo von NVM findet sich [unter diesem Link](https://github.com/nvm-sh/nvm).

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```

Nach der Installation entweder Terminal neu starten, oder `'source ~/.bashrc'` ausführen. Danach können wir **lvm** nutzen und **Node.js** installieren.

```shell
nvm install --lts
```
Als Nächstes benötigen wir noch die Domina aller Programmiersprachen, Rust, um das Backen kompilieren zu können. 

```shell
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | bash
```
Nach der Installation `source $HOME/.cargo/env` ausführen.

Im Folgenden muss ich noch zwei Pakete installieren, die spezifisch für mein Projekt sind. Da ich eine React-App hosten will, benötige ich einen Webserver. Meine Wahl fällt auf **Nginx**, da ich diesen bereits in anderen Projekten nutze und gut damit klarkomme. Natürlich können auch andere Webserver verwendet werden. Allerdings müssen dann ggf. die späteren Scripte angepasst werden.

Zudem installiere ich noch **ffmpeg**. Dies benötigt mein Backend, um Vorschaubilder (Thumbnails) für Videos zu generieren.

```shell
sudo apt install -y nginx ffmpeg
```

Zuletzt erstelle ich mir noch fix ein Arbeitsverzeichnis im ``/home`` Folder. ``mein-username`` muss durch den entsprechenden User ersetzt werden. 

```shell
mkdir /home/mein-username/MyCoolApp 

mkdir /home/mein-username/MyCoolApp/frontend

mkdir /home/mein-username/MyCoolApp/backend
```
## Schritt 2: Frontend Server konfigurieren

Wie bereits erwähnt, nutze ich **Nginx** als Webserver. Damit dieser auf eingehende Anfragen (gemeint ist der LXC Container) reagiert, muss ein Konfigurationsfile erstellt werden. 

Das File legen wir mit **nano** an.

```shell
nano /etc/nginx/sites-available/MyCoolApp
```
 **MyCoolApp** ist der Beispiel-Name für diese Anleitung. Hier kann also jeder Name genommen werden. Das angelegte File füllen wir mit den folgenden Daten:

```
server {
    listen 80;
    server_name 192.168.178.70; # Die IP des LXC-Containers

    root /var/www/html; # Hier kommen später die Frontend Dateien an
    index index.html;

    # Regel für die API: Alles unter /api/ wird an das Backend weitergeleitet
    location /api/ {
        proxy_pass http://127.0.0.1:5000; # Das Backend horcht später auf Port 5000
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    # Noch eine Regel für React-Router
    # Wenn eine Datei nicht gefunden wird, wird die index.html geladen
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```
{: file="/etc/nginx/sites-available/MyCoolApp" }

Zuletzt muss die Seite noch aktiviert werden. 

```shell
sudo ln -s /etc/nginx/sites-available/MyCoolApp /etc/nginx/sites-enabled/.
```

## Schritt 3: Backend Server konfigurieren

Da das Backend keine Website hat, benötigen wir auch keinen Webserver. Das Backend soll, einmal gestartet, auf die konfigurierten Routen lauschen und brav das tun, was in den Handler Dateien hinterlegt wurde. Das Backend läuft also quasi als Hintergrunddienst. Dafür legen wir einen neue Eintrag unter `/etc/systemd/system/mycoolapp-backend.service:` an.

```shell
sudo nano /etc/systemd/system/mycoolapp-backend.service
```

Diese Datei wird mit den folgenden Daten befüllt:

```
[Unit]
Description=MyCoolApp Backend Server
After=network.target

[Service]
User=mein-username # Der User, unter dem der Server laufen soll
Group=mein-username
WorkingDirectory=/home/mein-username/MyCoolApp/backend # Pfad an Username und Projekt anpassen
EnvironmentFile=/home/mein-username/MyCoolApp/backend/.env # Dies lädt die .env Datei. Wichtig!
ExecStart=/usr/local/bin/MyCoolApp-server # Pfad zum kopierten Binary
Restart=on-failure

[Install]
WantedBy=multi-user.target
Aktiviere und starte den Service: sudo systemctl enable mycoolapp-backend.service und sudo systemctl start yopatay-backend.service.
```
{: file="/etc/systemd/system/mycoolapp-backend.service" }

Das Backend benötigt die ``.env`` Datei, um mit der Datenbank und dem Blockspeicher kommunizieren zu können. 

Frontend und Backend verfügen nun über die benötigten Konfigurationsdateien. Damit wir dies auch nutzen können, muss der Code auf den Server, kompiliert und an die richtigen Stellen kopiert werden.

## Schritt 4: Git Repo einrichten

Für diesen Schritt sollte beachtet werden, dass ich den Code nicht auf **GitHub** hochlade, um ihn dann wieder auf den LXC-Container zu schaufeln. Ich richte mir Git stattdessen direkt auf dem Container ein. Wer es lieber andersherum mag, kann das natürlich tun. Meine Anleitung berücksichtig dies aber nicht.

Als Erstes richten wir ein leeres Git Repo ein und setzen die richtigen Berechtigungen. Anschließend wechseln wir in das neue Verzeichnis und initialisieren das Repo: 

```shell
sudo mkdir -p /var/repo

sudo chown mein-username:mein-username /var/repo

git init --bare mycoolapp.git
```
Jetzt erstellen wir ein „New Push Recieved“ Hook. Sobald neuer Code ins Repo gepusht wird, sollen die neuen Daten ins Arbeitsverzeichnis kopiert und der Build-Prozess gestartet werden. Das Build-Script bauen wir später.

```shell
nano /var/repo/mycoolapp.git/hooks/new-push-received
```
Das Shell-Script wird mit folgenden Daten befüllt. Wer will und kann, fügt hier noch mehr Error-Handling ein. 

```shell
#!/bin/bash

# Das Arbeits, in das der Code ausgecheckt wird
TARGET_DIR="/home/mein-username/MyCoolApp"

# Das Git-Verzeichnis (das Bare Repo)
GIT_DIR="/var/repo/mycoolapp.git"

# Der Branch, auf den wir reagieren wollen (main oder master)
BRANCH="main"

echo "===== Git Push erhalten. Starte Deployment... ====="

# Lese die Eingabe von Git, um zu sehen, welcher Branch gepusht wurde
while read oldrev newrev ref
do
    if [[ $ref = refs/heads/$BRANCH ]];
    then
        echo "Push auf Branch '$BRANCH' erkannt. Checke Code aus..."

        # Checke den neuesten Code in unser Arbeitsverzeichnis aus
        # -f erzwingt das Auschecken, auch wenn es lokale Änderungen gibt, sonst bricht es ab
        git --work-tree=${TARGET_DIR} --git-dir=${GIT_DIR} checkout -f ${BRANCH}

        echo "Code ausgecheckt. Starte Build-Skript..."

        # Wechsle in das Arbeitsverzeichnis und führe das Build-Skript aus 
        cd ${TARGET_DIR} && ./build.sh

        echo "===== Deployment abgeschlossen. ====="
    else
        echo "Push auf Branch '$ref' ignoriert. Nur '$BRANCH' löst ein Deployment aus."
    fi
done

exit 0

```
{: file="/var/repo/mycoolapp.git/hooks/new-push-receive" }

Nun muss das Script ausführbar gemacht werden, damit **Git** es starten kann.

```shell
chmod +x /var/repo/yopatay.git/hooks/new-push-received
```
Bis hierhin war schon alles recht wild, aber nun wird es noch wilder. Ein paar Befehle können nur als ``root`` ausgeführt werden. Da es mein Ziel war, alles zu automatisieren, muss dem System mitgeteilt werden, dass es ein paar Befehle gibt, die immer mit den Berechtigungen von ``root``ausgeführt werden müssen. So etwas sollte man immer mit Bedacht und großer Vorsicht machen.

Wir bearbeiten nun die **sudoers** Datei mit:

```shell
sudo visudo 
```

Es öffnet sich ein Editor und an das Ende der Datei wird der folgende Block eingefügt:

```
# Erlaubt dem User 'mein-username' spezifische Befehle für das MyCoolApp-Deployment
mein-username ALL=(ALL) NOPASSWD: /bin/rm -rf /var/www/html/*
mein-username ALL=(ALL) NOPASSWD: /bin/cp -r /home/mein-username/MyCoolApp/frontend/dist/* /var/www/html/
mein-username ALL=(ALL) NOPASSWD: /bin/cp /home/mein-username/mein-username/MyCoolApp/backend/target/release/backend /usr/local/bin/backend-server
mein-username ALL=(ALL) NOPASSWD: /bin/systemctl restart mycoolapp-backend.service
mein-username ALL=(ALL) NOPASSWD: /bin/systemctl restart nginx
```

Mit diesen Befehlen werden die neuen Dateien für das Frontend umkopiert, damit der Webserver diese erhält und das Backend, sowie der Webserver neu gestartet. Das alles soll passieren, wann immer ich neuen Code in das Git Repo gepusht habe. Damit all das ohne Passwortabfrage passieren kann, setze ich **NOPASSWD** für den user ``mein-username``.

Jetzt erstellen wir noch das Build-Script im Arbeitsverzeichnis ``/home/mein-username/MyCoolApp``

```shell
nano /home/mein-username/MyCoolApp/build.sh
```

```
#!/bin/bash
set -e # Bricht das Skript bei einem Fehler ab

echo ">>> Ziehe neueste Commits..."
git pull

echo ">>> Löte Backend zusammen..."
cd backend
cargo build --release # --release für optimierten Code (ist so'n Rust Ding)
cd ..

echo ">>> Schustere das Frontend zusammen..."
cd frontend
npm install
npm run build
cd ..

echo ">>> Starte Deployment..."
# Frontend-Build in das Verzeichnis von Nginx kopieren
sudo rm -rf /var/www/html/*
sudo cp -r yp-frontend/dist/* /var/www/html/

# Backend-Binary an einen bekannten Ort kopieren
sudo cp yp-backend/target/release/backend /usr/local/bin/mycoolapp-server

echo ">>> Starte Backend und Webserver neu..."
sudo systemctl restart mycoolapp-backend.service
sudo systemctl restart nginx

echo ">>> Build & Deploy erfolgreich!"
```
{: file="/home/mein-username/MyCoolApp/build.sh" }

Dank der Änderung in **visudo** können die **sudo** Befehle ohne Passwortabfrage ausgeführt werden.

## Schritt 5: Code pushen und Server machen lassen

Als letzten Schritt pushen wir den lokalen Code in das neue, leere Git Repo auf dem Server. Wichtig ist, dass der Container **SSH** zulässt.
```shell
git remote add lxc ssh://mein-username@192.168.178.70/var/repo/mycoolapp.git

git add .

git commit -m "Initial commit"

git push lxc main
```
Fertig. Sobald das Hook-Script feststellt, das im Repo neuer Code ist, checkt es diesen in unser Arbeitsverzeichnis aus und startet das Build-Script. Nachdem das Frontend fertig ist, werden die Files dem Webserver verfügbar gemacht. Das Backend-Binary wird ebenfalls kopiert und dann die entsprechenden Dienste neu gestartet. All das kann viel Zeit in Anspruch nehmen, da gerade der Kompiliervorgang eine Weile dauern kann. Am Ende ist meine App dann aber unter der von mir hinterlegten IP-Adresse erreichbar.

![Das Build Script bei der Arbeit]({{ site.baseurl }}/assets/img/eigene-app-selfhosting/build-script-braucht-zeit.jpg)
_Das Build Script bei der Arbeit (Screenshot: Markus Daams / 2025)_

## Mein Fazit

Ich habe mir eine kleine lokale Deployment-Umgebung auf meinem Proxmox-Server gebaut. Auf diese Weise kann ich ein echtes Deployment zumindest einmal durchspielen. Natürlich ist mir klar, dass das keine echte Produktivumgebung ist. Aber zum Testen reicht es alle mal. 

Ein großer Vorteil dieses Vorgehens ist, dass ich den gesamten LXC-Container sichern kann, womit ich ein zusätzliches Backup vom Code habe. Außerdem könnte ich den Container theoretisch in einem anderen Host einspielen und dort meine App weiter nutzen. Hierfür müssen dann ggf. die Umgebungsvariablen angepasst werden.

Kurz um: Ein wenig im Heimnetz herumbasteln macht Spaß. Mit ein wenig Mühe und Übung lernt man nebenher noch viel über Linux.

## Ressourcen

Wirklich gute Link Tipps habe ich dieses Mal nicht. Daher mache ich einfach etwas Eigenwerbung für meine Artikel:


* [Ich habe mal Vibe Coding ausprobiert](https://markus-daams.com/posts/ich-habe-mal-vibe-coding-ausprobiert/)

* [bad vibes beim Vibe Coding](https://markus-daams.com/posts/bad-vibes-beim-vibe-coding/)

* [Weiter geht es mit dem Vibe Coding](https://markus-daams.com/posts/weiter-geht-es-mit-dem-vibe-coding/)
