---
layout: post 
title: "CI / CD on Pi - Teil 2"
date: 2026-10-07 07:20:51 +0200
category: [coding, selfhosting]
author: 
tags: [coding, selfhosting, raspberry-pi, linux]
description: "Eine CI / CD Pipeline in die 4 GB RAM des Raspberry Pi 4 quetschen? Hier ist Teil Zwei meines Erfahrungsberichts."
image:
  path: /assets/img/post-header/header-ci-cd-on-pi.jpg
  alt: CD / CI on a Raspberry Pi
---
# CI / CD auf dem Pi

Im [vorhergehenden Artikel](https://markus-daams.com/posts/cd-ci-on-pi/) habe ich beschrieben, wie ich die Voraussetzungen für mein zugegebenermaßen wildes Projekt geschaffen habe. Dazu habe ich auf einem Raspberry Pi 4 zunächst *Raspberry Pi 4 OS Lite* für einen Headless-Betrieb installiert. Anschließend kamen Docker (Compose), Arcane und Forgejo (nebst Forgejo DB und Forgejo Runner) dazu. Als Programmierumgebung habe ich mir VS Code Server installiert. 

Das Ziel ist eine vollständige CI / CD Pipeline, die autark auf dem Raspberry Pi läuft. Die dafür benötigten Software Komponenten laufen und nun geht es darum heraus zu finden, ob das Konstrukt so läuft, wie ich mir das zurecht gesponnen habe.

In diesem Artikel beschreibe ich, wie ich ein erstes Beispiel-Projekt anlege und als Docker Container bereitstelle. Ich arbeite hierbei ausschließlich per `ssh`im Terminal und in den Weboberflächen von Arcane und Forgejo. Ich bin sehr gespannt, ob der Raspberry das alles mitmacht.

## Das Beispiel Projekt anlegen

Um loszulegen, werde ich mich per `ssh` auf dem Raspberry anmelden und das erste Projekt anlegen. Mein Beispiel Projekt ist eine einfache HTML-Datei. Diese soll nach dem `git push` in einen Docker Container kopiert und dort von einem Nginx-Server ausgeliefert werden. 

Für dieses Projekt lege ich ein entsprechendes Verzeichnis an:

```shell
mkdir -p /home/pi-user/projekte/html-seite/build
```
In das `build` Verzeichnis lege ich alle Dateien, die Nginx später ausliefern soll. Hier also mindestens die HTML-Datei. 

```shell
touch /home/pi-user/projekte/html-seite/build/index.html
```
Die HTML-Datei befülle ich mit einer einfachen 'Hello World' Seite. 

Per `cd` wechsle ich in das neue Projektverzeichnis und initialisiere Git. Zuvor hinterlege ich jedoch meine Anmeldedaten für Forgejo.

```shell
git config --global user.name "fogejo-username" 
git config --global user.email "irgend-eine-email@beispiel.de"
```

Anschließend initialisiere ich das Verzeichnis und schicke den ersten Commit ab.

```bash
git init -b main
git add .
git commit -m "Der erste Commit"
```

Im Browser wechsle ich zu meiner Forgejo-Instanz und lege ein neues Projekt an, ohne das Repository zu initialisieren (Kästchen frei lassen), denn das habe ich eben gerade lokal gemacht. 

Forgejo zeigt mir danach an, wie ich das neue Repo lokal hinzufügen kann. Der Code sieht in etwa so aus:

```shell
# Remote-URL hinzufügen (Ersetze IP/Domain und User/Repo)
git remote add origin http://<RASPBERRY-PI-IP>:<PORT>/<DEIN_USERNAME>/<DEIN_REPO>.git

# Code pushen
git push -u origin main
```

Forgejo füllt die Platzhalter aus. 

Diese beiden Schritte führe ich im Projektordner aus. Ich werde daraufhin aufgefordert mich anzumelden. Das will ich mir in Zukunft ersparen. Wie bei GitHub auch kann ich ein Access-Token für eine Anwendung erstellen, in diesem Fall ist dies mein VS Code Server. 

Hierfür klicke ich in Forgejo auf mein **Profilbild** -> **Einstellungen**.

Wähle links **Anwendungen** (Applications).
    
Unter _Personal Access Tokens_ vergebe ich einen Namen (z. B. `vscode-server`) und wähle mindestens die Schreibrechte für `repository` aus. Da es lokal läuft, kann ich auch die anderen Optionen aktivieren, was für das VS Code Add-on für Forgejo interessant sein kann. Danach klicke ich auf **Token generieren**. Das Token wird nur hier einmal angezeigt, also muss ich es kopieren und zwischenspeichern. 

Zurück im Terminal gebe ich diese Zeile ein;

```shell
git config --global credential.helper store
```
Beim nächsten `git push` gebe ich wieder meinen Benutzernamen ein, aber dieses Mal als Passwort das **Access Token**. 

Damit wäre das Anmelde-Gelöt erledigt. Das ist praktisch für alle Projekte, die ich zukünftig anlegen werde. 

## Docker-, Compose- und Build-File

Das Projekt ist angelegt und das Repository verbunden. Jetzt geht es darum, den `Action` Workflow für Forgejo einzurichten. Das funktioniert genau wie bei GitHub. Ich lege im Projektordner einen Ordner nebst Unterordner und drei Files an. 

```shell
mkdir -p .forgejo/workflows  

touch /.forgejo/workflows/build.yaml
touch Dockerfile
touch compose.yaml
```

Mittels Dockerfile teile ich mit, dass der gesamte Inhalt aus dem Ordner `build` in das `html` Verzeichnis von Nginx kopiert werden soll. Außerdem wird Port 80 exposed, denn ich will die Seite später im Browser aufrufen können. Da ich nicht an der Nginx Config rumfuhrwerken möchte, nehme ich Port 80 und leite diesen später per Docker weiter. 

```yaml
FROM nginx:alpine
COPY build/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```
{: file="Dockerfile" }

Danach kommt das Compose File dran. Ich vergebe den Namen des Containers und leite hier Port 80 auf 5050 weiter, denn der ist noch frei.

```yaml
services:
  web:
    build: .
    container_name: testseite
    restart: unless-stopped
    ports:
      - "5050:80"
```
{: file="Compose.yaml" }

Und der Dritte im Bunde ist nun die `build.yaml`. Hier hinterlege ich, was alles passieren soll, wenn `git push` von Forgejo für das Projekt erkannt wurde. 

```yaml
name: Build and Deploy

on:
  push:
    branches:
      - main

jobs:
  build-image:
    runs-on: docker

    container:
      image: catthehacker/ubuntu:act-latest
      options: -v /var/run/docker.sock:/var/run/docker.sock

    steps:
      - name: Code auschecken
        uses: actions/checkout@v4

      - name: Docker Image bauen und deployen
        run: |
          docker compose up -d --build
```
{: file=".forgejo/workflows/build.yaml" }


Eine etwas ausführlichere Erklärung zu den Actions findet sich [im Artikel "Container bauen mit GitHub-Actions](https://markus-daams.com/posts/container-bauen-mit-github-actions/). Für jetzt ist die Zeile `options: -v /var/run/docker.sock:/var/run/docker.sock` interessant. Ich greife hier direkt auf den lokalen Docker-Socket zu. Das ist inhärent unsicher und nur für mein kleines lokales Projekt in Ordnung. Eine ausführliche Erläuterung findet sich auf Englisch unter [diesem Link](https://forgejo.org/docs/latest/admin/actions/docker-access/). In einer Produktivumgebung sollten die Container isoliert laufen. Ich arbeite hier aber auf einer Kartoffel im Heimnetz und muss der Bequemlichkeit halber ein wenig tricksen.

Mit diesem File werde ich nun testweise ein Docker Image bauen und als Container veröffentlichen lassen. 

Tipp: Für weitere Informationen für die Konfiguration der Actions finden sich unter [diesem Link](https://forgejo.org/docs/latest/admin/actions/configuration/). 

## Testlauf starten

Ich habe alle benötigten Dateien angelegt. Wenn ich nun ein `git push` auslöse, soll das Test-Projekt nach dem erfolgreichen Durchlauf automatisch online gehen.

![Die Actions in Aktion](/assets/img/ci-cd-on-pi-2/forgejo-runner.jpg)
_Die Actions arbeiten nun die Anweisungen in der build.yaml ab (Screenshot: Markus Daams / 2026)_

Die einzelnen Schritte und etwaige Fehler werden mir in der Weboberfläche von Forgejo angezeigt. Was ich noch nicht weiß, das `bookworm` Image wird nicht funktionieren, da es kein Docker hat. Nach einer Duckduckgo Session habe ich `image=catthehacker/ubuntu:act-latest` gefunden. Das hat dann funktioniert. Eine Übersicht dieser Action-Images findet sich [in diesem GitHub-Repo](https://github.com/ChristopherHX/runner-image-blobs).

Nachdem ich das richtige Image ausgewählt und ein paar Syntaxfehler berichtigt hatte, liefen die Actions durch. Das hat ungefähr 20 Minuten gedauert. Nachdem das Image einmal im System war, ging es ein ganz klein wenig schneller, so ca. 15 Minuten - volle Kartoffelpower!

![Der Run war erfolgreich](/assets/img/ci-cd-on-pi-2/action-erfolgreich.jpg)
_Die Action ist durchgelaufen. Der Docker Container läuft (Screenshot: Markus Daams / 2026)_

Da ich den Zugriff auf den lokalen Docker-Socket gewährt habe, wurde der Container automatisch registriert und die Seite ist unter der IP meines Raspberry Pis + Port 5050 erreichbar:

![Hallo Welt Seite wird im Browser angezeigt](/assets/img/ci-cd-on-pi-2/hallo-welt-screenshot.jpg)
_Hier kam Vibe Coding zum Einsatz. Der Hintergrund ist animiert :D (Screenshot: Markus Daams / 2026)_

Die Systemauslastung hielt sich überraschend in Grenzen. Hierzu sei aber bemerkt, dass es für den Runner nicht so wahnsinnig viel zu tun gab. Es musste kein Projekt gebaut werden, also Beispielsweise per `npm run build`, `cargo build` oder Ähnlichem. Die meiste Zeit wurde für Docker verbraten. Die CPU-Auslastung hatte immer einmal wieder kurze Peaks, blieb insgesamt aber im Rahmen.

![Systemauslastung in Arcane](/assets/img/ci-cd-on-pi-2/runner-aktiv.jpg)
_Die Systemauslastung in Arcane, während die Action durchläuft. (Screenshot: Markus Daams / 2026)_

## CI / CD Workflow funktioniert

Ich bin selbst überrascht, mit was für Ideen mein Hirn manchmal um die Ecke kommt. Einen vollständigen CI / CD Workflow auf einem Raspberry Pi 4 zu implementieren gehört in diese Kategorie. Aber es funktioniert bei diesem ersten Versuch genau so, wie ich es mir vorgestellt habe.

1. Mit Forgejo kann ich meine vielen kleinen Code-Projekte für mein lokales Netzwerk zentral verwalten. Diese habe ich bisher verteilt auf verschiedenen PCs und GitHub gespeichert. Einige Docker Images liegen im Docker Hub. Ich kann das alles nun nach Hause holen.

2. Mittels VS Code Server kann ich die Projekte direkt auf der Maschine bearbeiten, auf der ich die Projekte speichere. Natürlich kann ich die Repos auch auf andere Maschinen herunterladen und dort bearbeiten. Aber ich bin aktuell ein Fan vom "Alles im Browser und an einem Platz" - Workflow. 

3. Ich muss mich dank der Actions nicht mehr ums Deployment kümmern. Nachdem ich meine neuesten Änderungen ins Repo gepusht habe, passiert der Rest völlig automatisch. Auf diesem Wege kann ich alles, was das Projekt so braucht, automatisieren: Build-Artifacts sowie Docker Image(s) erstellen und dann registrieren. Ich brauche noch ein Unit-Test? Das wäre ebenfalls kein Problem. Die Actions sind sehr mächtig. Unter anderem bauen sie diese Website, nachdem ich das Markdown-File hoch geladen habe.

Der Raspberry Pi 4 steckt das alles erstaunlich gut weg. Der Arcane Container zieht noch die meisten Ressourcen. Sollte ich einmal doch an Grenzen stoßen, kann ich das Ganze natürlich auch auf meinem Proxmox-Server zum Laufen bekommen. Um das herauszufinden, werde ich als Nächstes testen, wie sich meine kleine 4GB RAM Kartoffel mit einem Rust-Projekt verträgt. Dazu gebe ich ihm auch noch ein React-Vite Projekt als Nachtisch. 

Als Fazit bleibt: CI / CD ist auf dem Raspberry Pi möglich. Aufgrund der Konfiguration ist das aber nur für Projekte sinnvoll, die ich lokal in meinem Netz laufen lasse. Bequemlichkeit gibt es häufig nur zum Preis der Sicherheit. 

## Ressourcen

* [VS Code Server - GitHub Repository](https://github.com/coder/code-server)

* [Arcane - offizielle Website](https://getarcane.app/)

* [Forgejo - offizielle Website](https://forgejo.org/)