---
layout: post
title: "Container Images bauen mit Github Actions"
date: 2026-01-14 08:48:31 +0100
category: coding
author: 
tags: [selfhosting, docker, quicktipp, coding]
description: "Das eigene Projekt mit GitHub Actions bauen und per Docker Container verschiffen? So geht's."
image:
  path: /assets/img/post-header/header-containerbau-mit-github-actions.jpg
  alt: Container Images bauen Mit Github Actions
---

# Ich und Container

Ich glaube, dass ich in jedem zweiten Artikel irgendwo und möglichst elegant einfließen lasse, dass ich kein großer Fan von Docker bin. Gründe dafür gibt es viele, aber darum soll es heute nicht gehen. Mein [„Projekt“](https://markus-daams.com/posts/ich-habe-mal-vibe-coding-ausprobiert/) ist inzwischen so weit angewachsen, dass ich Container nutzen muss, wenn ich flexibel bleiben will. Das Projekt besteht aus einem Frontend (React Vite), einem Backend (Rust ... *grrrrrr*), sowie einem [„S3 Gateway“](https://markus-daams.com/posts/ein-s3-gateway-mit-versitygw/) als „Massenspeicher“ und einer „postgresql“ Datenbank. Zu viele Komponenten, wenn man sie einzeln installiert, konfiguriert und administriert. Hier spielen Container ihre Stärken aus, denn ich kann sie pullen, deployen und fertig ist der Lachs.

Die Images für diese Container müssen jedoch erst einmal erstellt und anschließend in eine Registry geschoben werden. In meinem Fall jeweils für Frontend und Backend. Das sind Schritte, die ich mir gerne abnehmen lassen möchte und daher kommen hier nun die **GitHub Actions** ins Spiel.

## Was sind GitHub Actions?

Das Wichtigste vorweg, der Spaß ist Stand heute (14.01.2026) immer noch kostenlos. Ideal für ambitionierte Geizhälse und Hardcore-Frugalisten wie mich.

**GitHub Actions** funktionierten nach dem Prinzip „Wenn das, dann das“. Ich lade meinen Code hoch und dann soll automatisiert irgendetwas passieren. Dieses „irgendetwas“ gebe ich in einer YAML Datei vor. Das ganze Konzept ist als *CI / CD* bekannt, also *Continuos Integration / Continuos Delivery* oder *Deployment*. Dabei sieht ein üblicher Ablauf in etwas so aus:

1. Ich definiere einen Trigger, der die Aktionen auslöst, zum Beispiel ``git push``. Auch cronjobs sind möglich und noch viele mehr
2. Ich kann nun einen Build-Prozess für meine App per Job starten. Der Build Prozess läuft dann in einer kleinen, virtuellen Maschine, die von GitHub bereitgestellt wird
3. Dank Steps und Actions kann ich die gebaute App in einen Container packen und in einer Container Registry hoch laden

Das alles passiert automatisch. Dank YAML lässt sich der Workflow einfach beschreiben und beliebig abändern. Dazu gibt es einen Marketplace mit zahlreichen, vordefinierten Workflows. Eine schöne Spielwiese für Programmierer und Leute wie mich, die denken, sie wüssten, was sie tun.

![GitHub Actions auf der Website von GitHub](/assets/img/github-actions/github-actions-menue.jpg){: width="600"}
_Vorgefertigte GitHub Actions auf dem Marketplace von GitHub (Screenshot: Markus Daams / 2025)_

## Wie verwendet man GitHub Actions?

Die **GitHub Actions** finden sich in jedem Repository unter dem Menüpunkt **Actions**, wer hätte es gedacht. Man kann seine neue Action entweder dort, oder lokal anlegen. Sie wird im Ordner unter ``.github/workflows`` erstellt. Der Dateiname ist egal, sollte natürlich ein wenig deklarativ sein und muss auf ``.yml`` oder ``.yaml``enden. Man kann den Workflow aber auch online anlegen. Dort gibt es dann auch gleich einen praktischen YAML-Editor

![GitHub Actions auf der Website von GitHub](/assets/img/github-actions/yaml-editor.jpg){: width="600"}
_Der YAML Editor auf der Website von GitHub (Screenshot: Markus Daams / 2025)_

Habe ich den Online-Editor genutzt, kann ich mir die neue Datei durch ``git pull`` auf den lokalen Rechner holen, wenn ich lieber mit dem eigenen Editor arbeiten möchte.

Ich möchte die **GitHub Actions** anhand eines einfachen Beispiels erklären, damit klarer wird, was genau passiert. Ich baue mir eine Test-Suite für eine beliebige Node.js App.

``` yaml
name: Unit Tests 
on: [push] 

jobs:
  test-suite:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4 
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm install
      - run: npm test
```
Von oben nach unten:

+ **name**: Ein frei vergebener Name für meinen Workflow
+ **on**: Ist das Trigger Event. Wird also bei jedem ``git push`` ausgeführt
+ **jobs**: Die Jobs, die nun ausgeführt werden sollen. Es können sogar mehrere Jobs parallel ausgeführt werden
+ **test-suite**: Das ist ein freier Bezeichner. Jeder Job muss einen eindeutigen Namen haben
+ **runs-on**: Hier wird nun die VM ausgewählt, auf der die Tests laufen sollen. Besser bekannt als **Runner**. Ich wähle das allmächtige Linux
+ **uses**: Das ist eine vorgefertigte Action, die wir ausführen wollen. Checkout bedeutet, der Code aus meinem Repo soll verwendet werden
+ **name**: Mein frei ausgewählter Name für den aktuellen Step
+ **uses**: Jetzt holen wir uns eine Action für *Node.js* mit an Bord
+ **with**: Eine Bedingung für den Step: Wir wollen die Version 20
+ **run**: Code ist da, Umgebung ist da, nun können per ``npm install`` die Abhängigkeiten meiner React App installiert werden, wie auf einer lokalen Maschine
+ **run**: Als Letztes führe ich ``npm test`` aus

Zusammengefasst passiert hier folgendes: Ich lege meine eigene Action an und definiere einen Trigger. Anschließend definiere ich einen Job, oder mehrere und weise jedem Job dann verschiedene Steps zu, bis alles abgearbeitet ist, was ich für mein Projekt benötige.

Das Tolle an den Actions ist, es gibt bereits unfassbar viele davon. Sehr häufig muss man das Rad nicht neu erfinden. Auf diesem Wege können wir nun **Docker** mit einbinden, denn irgendwer kam bereits auf diese Idee.

## Docker und GitHub Actions

Nehmen wir uns als Beispiel eine einfache React App. Ich möchte erreichen, dass meine App nach jedem ``git push`` auf dem **GitHub Runner** gebaut wird und das fertige Docker Image soll dann in meinem Docker Account landen. 

Wie kann man das erreichen?

Gehen wir das exemplarisch einmal durch. Als Erstes benötige ich ein Docker File. Das kann in etwas so aussehen:

``` dockerfile
# Meine Build-Umgebung
FROM node:20-alpine AS build
WORKDIR /app

# Nur Package-Dateien kopieren für besseres Caching
COPY package*.json ./
RUN npm install

# Quellcode kopieren und Build starten
COPY . .
RUN npm run build

# Für React benötigen wir noch einen Webserver, also zum Beispiel nginx.
FROM nginx:stable-alpine

# Die statischen Dateien (z.B. html) vom Build-Schritt oben in den Nginx-Ordner kopieren
COPY --from=build /app/dist /usr/share/nginx/html

# Port öffnen und nginx starten
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Es handelt sich um ein typisches Docker File. Dieses muss sich natürlich in dem Repository befinden, dessen Code wir nutzen wollen, denn die **GitHub Actions** sollen es ja ausführen.

Die **GitHub Actions** haben nun das Rezept, um das Container Image zu bauen. Ich will es natürlich noch in den Docker Hub hochladen, ebenfalls durch einen Step in meiner neuen Action.

Damit dies klappt, sind vorher zwei wichtige Schritte nötig. Wir müssen in unserem Docker Repo ein **Access Token** anlegen und dies dann in **GitHub** hinterlegen. Nur dann ist es möglich, das Image in meinen Account zu schieben.

### Schritt 1: Token generieren

Das Token lässt sich auf [app.docker.com](https://app.docker.com/) unter *Settings* → *Personal access token* anlegen. Auf dieser Seite einmal auf *Generate new token* klicken.

* **Access token description:** Frei gewählter Name, zum Beispiel *GitHub Zugriff*
* **Expiration date:** Kann auf ‚none‘ bleiben, aber ich würde es aus Sicherheitsgründen immer einmal wieder ablaufen lassen
* **Access permisson:** Hier muss *Read & Write* ausgewählt werden

Wir speichern uns für den nächsten Schritt zwei Dinge:

1. Unseren Docker User Name
2. Das von uns erstellte Access Token

### Schritt 2: Zugangsdaten auf GitHub hinterlegen

Weiter geht es auf [github.com](https://www.github.com).  Hier klicken wir im Repository unseres Projektes auf *Settings* → *Secrets and variables* → *Actions*. In diesem Fenster lassen sich nun Variablen anlegen, die in unserem **GitHub Actions** Workflow verwendet werden können.

Bedeutet, Klick auf **New repository secret**:

1. **Name:** Name der Variable, also zum Beispiel **DOCKERHUB_USERNAME**
2. **Secret:** Mein Docker Username, also zum Beispiel **my-username**, ohne Leerzeichen!

Nun legen wir noch ein zweites Secret an, mit dem **DOCKERHUB_TOKEN** . Sind beide Werte hinterlegt, lassen sich diese ab sofort in den **GitHub Actions** nutzen.

## Es werde Container!

Exemplarisch zeige ich hier wieder einen Workflow und beschreibe die Schritte, die für Docker relevant sind.

``` yaml
{% raw %}
name: Docker Hub Deploy

on:
  push:
    branches: [ "main" ]

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ${{ secrets.DOCKERHUB_USERNAME }}/my-react-app:latest
{% endraw %}
```

Die wichtigsten Punkte sind hier nun die drei **steps**.

* **Erster step:** Checkout unseres Codes in GitHub. Aus dem wollen wir ja das Image für den Container bauen
* **Zweiter step:** Login in den Docker Hub. Hier verwenden wir nun die Zugangsdaten, die wir zuvor generiert und angelegt haben. Das wird wieder mit **with** gemacht
* **Dritter step:** In diesem Step wird das Image erstellt. Hierfür wird das zuvor angelegte Docker File verwendet. Ist das Image fertig, wird es in das zuvor angelegte Repository auf dem Docker Hub hochgeladen

Zusammengefasst wird also mein Code genommen, in eine VM gepackt, das Container Image erstellt und in meinen Docker Hub hoch geladen. Alles ganz automatisch und immer dann, wenn ich neuen Code per ``git push`` hoch lade. Ist meine **GitHub Action** durchgelaufen, kann ich den Container auf meiner Maschine mit ``docker pull`` installieren und nutzen.

Wie cool ist das denn?

![GitHub Actions auf der Website von GitHub](/assets/img/github-actions/github-actions-steps-view.jpg){: width="600"}
_GitHub Actions Steps auf der Website von GitHub(Screenshot: Markus Daams / 2025)_

Auf GitHub selbst kann dann der Build Prozess nachverfolgt werden. 

Dort werden die **workflow runs** angezeigt und jeder Job und Step kann dort nachvollzogen werden. Natürlich können Workflows, Jobs und Steps fehlschlagen. In den **workflow runs** findet man dann die entsprechenden Fehlermeldungen.

## Mein Fazit

Ob es die Komplexität eines Projektes ist, oder unerklärliche Scheu vor Docker, es gibt viele Gründe, **GitHub Actions** zu nutzen. Die Einstiegshürde ist, je nach Vorwissen, steil, oder zumindest ein wenig herausfordernd. Hat man aber einmal das Konzept und die zugrundeliegenden Mechaniken verstanden, sind sie nicht nur sehr hilfreich, sondern machen regelrecht Spaß.

Das bauen, deployen und testen von Apps kann sehr zeitraubend sein. Wenn man einige Teile all dieser Schritte an **GitHub** auslagern kann, warum nicht? So ist es möglich, selbst komplexeste Apps auf einem Mini-PC oder zum Beispiel auf einem Steam Deck zu entwickeln. Die Rechenpower zum Bauen der App leihen wir uns dann von **GitHub**.

Wenn ich diesen Artikel gleich hochlade, verwandeln die **GitHub Actions** den mit Markdown erstellten Text durch Ruby-Magie automatisch in HTML-Code und speichern diesen auf meiner GitHub-Page. Man könnte sagen, es handelt sich um echte TEAM-Arbeit: **T**oll, **E**in **A**nderer **M**achts. 

Ich hoffe, ich konnte mit diesem Artikel ein wenig Neugier wecken. Viel Spaß mit den **GitHub Actions**.

## Ressourcen

* [GitHub Actions Dokumentation](https://docs.github.com/de/actions)

* [Tutorials zu den GitHub Actions](https://docs.github.com/de/actions/tutorials)
