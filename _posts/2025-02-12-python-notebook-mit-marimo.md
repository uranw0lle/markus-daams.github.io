---
layout: post
title: "Python Notebook mit Marimo"
date: 2025-02-12 08:30:58 +0100
category: coding
author: 
tags: [coding, python, marimo]
description: "Marimo ist ein Jupyter Notebook auf Meth!"
image:
  path: /assets/img/post-header/header-marimo.jpg
  alt: Python Notebook mit Marimo
---

# Was ist Marimo?

Zugegeben, mein Teaser für den Artikel ist reißerisch. Aber wer ohne Clickbait Sünde ist, werfe den ersten Findling.

Wer sich mit Python beschäftigt, kommt früher oder später mit [Jupyter Notebooks](https://jupyter.org/) in Berührung. Spätestens dann, wenn man sich mit Data Science beschäftigt, freut man sich über die praktischen Möglichkeiten, die solche Notebooks mit sich bringen. 

Wer sie aber nicht kennt, dem sei kurz und vereinfacht erklärt: Mit Jupyter Notebooks ist es möglich, Python in einem Webbrowser auszuführen. Man kann seinen Code also im Webbrowser einfügen und ausführen. Nutzt man einen der vielen Onlinedienste, ist es nicht mehr nötig, Python auf dem eigenen Computer zu installieren. Und es gibt [zahllose und kostenlose Dienste](https://jupyter.org/try) um dies auszuprobieren. So eigenen sie sich auch, um erste Erfahrungen mit Python zu sammeln. 

Bei **Marimo** handelt es sich ebenfalls um einen solchen Dienst, der aber weiter entwickelt wurde. Mit **Marimo** lassen sich also Jupyter Notebooks erstellen. Hinzukommen aber zahlreiche Komfortfunktionen und Erweiterungen.

Mir macht die Arbeit mit **Marimo** viel Spaß, was ich zum Anlass nehme, es in diesem Artikel einmal vorzustellen.

## Was sind die Vorzüge von Marimo?

Wie bereits erwähnt, erweitert **Marimo** Jupyter Notebooks, die ja schon selbst mit der Zeit immer mächtiger wurden. Für mich erwähnenswerte Features von **Marimo** sind:

* **Marimo** Notebooks lassen sich als ``.py`` Files speichern. Die Notebooks lassen sich also direkt mit Python ausführen. Außerdem ist damit die Versionierung per **Git** so einfach wie bei jedem anderen Coding Projekt. 

* **Marimo** Notebooks lassen sich einfach teilen. So ist es möglich, diese als [Wasm](https://www.ionos.de/digitalguide/websites/web-entwicklung/was-ist-webassembly/) Web App in jedem Browser auszuführen, ohne dass es einen Notebook Server benötigt. 

* **Marimo** führt voneinander abhängige Zellen automatisch aus. Es ist also nicht mehr nötig, diese nach einander auszuführen. Werden Zellen gelöscht, werden die dazugehörigen Variablen ebenfalls sofort aus dem Speicher gelöscht. 

* **Marimo** bringt viel Interaktivität mit. Es lassen sich mit wenig Code zum Beispiel Slider und Akkordion Elemente hinzufügen. Interaktive Data Frames lassen sich sortieren und durchsuchen und werden zudem grafisch aufbereitet. Hierfür ist noch nicht einmal Code notwendig, dies erfolgt automatisch.

* Eingebettetes SQL kann ebenfalls verwendet werden. Dieses läuft immer im Python Kontext, wie auch das Markdown, welches man ja schon aus dem Jupyter Notebooks kennt. Auf eben diesem Wege ist es möglich, das Notebook als reinen Python Code zu exportieren. 

* Die klassischen Jupyter Notebooks lassen sich ebenfalls importieren.

* Nahtlose Integration von AI Chats wie ChatGPT, Google Gemini u. w. 

Diese Liste ließe sich noch lange fortsetzen. Aber was sind Worte! Legen wir doch direkt mal los.


## Installation von Marimo
v
**Marimo** lässt sich natürlich lokal installieren. Hierzu ist aber zu beachten, dass Python installiert sein muss. Die Installation ist dann einfach:

```terminal
pip install marimo
```

Nach kurzer Zeit ist die Installation abgeschlossen und **Marimo** lässt sich starten. Dies geht mit dem folgenden Befehl:

```terminal
marimo edit
```

Es wird ein lokaler Server gestartet. Im Command Prompt wird die Adresse angezeigt, die dann im Browser aufgerufen werden muss. Uns begrüßt dann eine schlichte UI.

![Marimo Startseite](/assets/img/marimo/marimo_startseite.jpg)
_Über die Startseite lassen sich Notebooks erstellen und bearbeiten._

In dieser Ansicht verwalten wir nun alle unsere Notebooks. Als erstes lohnt ein Klick auf das *Tutorial* Menü rechts oben.

![Marimo Tutorial Menü](/assets/img/marimo/marimo-tutorials.jpg)
_Klein und unscheinbar, das Menü zu den Tutorials_

In diesem Menü findet man diverse Tutorials. Diese werden als lokale Notebooks mitgeliefert und ausgeführt. Hier kann man also zum Beispiel ``SQL`` direkt ausprobiern und sich die Syntax anschauen. 

## Das Notebook

Mit einem Klick auf **Create a new Notebook** kann man direkt und mit einem blanken Papier durchstarten. Die Ansicht von Marimo sollte einem von den Jupyter Notebooks bereits bekannt vorkommen.

![Marimo - Ansicht eines leeren Notebooks](/assets/img/marimo/marimo-startseite-leeres-notebook.jpg)
_Solch eine Ansicht kennt man bereits von den Jupyter Notebooks_

Wer also will, kann hier direkt loslegen. Python und Markdown lassen sich genau so verwenden, wie man es von Jupyter Notebooks kennt. 

Mein Tipp ist nun, als Erstes rechts oben auf das *Zahnradsymbol* und dann auf **User Settings** zu klicken.

![Marimo User Settings](/assets/img/marimo/marimo_user_settings.jpg)
_Die Usersettings lassen sich auch auf der Startseite aufrufen_

Hier lassen sich diverse Einstellungen vornehmen. Ja, den Dark Mode gibt es natürlich auch. Aber meine persönliche Empfehlung ist, das *AI Gelöt* zu konfigurieren. Manch einer kennt vielleicht schon [Codeium](https://codeium.com/) aus anderen Projekten. Hierbei handelt es sich um einen dynamischen Code Generator. Dieser erahnt, was man programmieren möchte und schlägt entsprechenden Code vor. Vereinfacht gesagt: AI powered code completion. Codeium hat auch ein recht gutes gratis Angebot. Aber auch der **Github Copilot** lässt sich integrieren, welcher, Stand heute (12.02.2025), nun ebenfalls eine limitierte Gratis-Funktionalität anbietet. 

Zudem lassen sich natürlich auch Platzhirsche wie **ChatGPT**, **Google Gemini**  und **Anthropic** jeweils mit API Key nutzen. Mit denen kann man dann direkt im Notebook chatten. Apropos Chat: Im Menüpunkt *Labs* lässt sich dieser dann auch für die Seitenleiste aktivieren.

Auf die vielen Funktionen werde ich in späteren Artikeln eingehen. Ich möchte aber dennoch schon einmal kurz ein paar Funktionen vorstellen, die mich direkt begeistert haben.

## Die Sonderausstattung hat es in sich

### Der Paketmanager

![Marimo Paktetmanager](/assets/img/marimo/marimo_paket_management.jpg)
_Der Paketmanager nimmt einem ein paar kleine, aber oft nervige Schritte ab._

Wenn man so vor sich hin notebooked, passiert es immer wieder, dass man bestimmte Python Pakte noch gar nicht installiert hat. **Marimo** erkennt dies und gibt einen entsprechenden Hinweis aus. Im integrierten Paketmanager lassen sich die fehlenden Pakete dann einfach nach installieren. Wer in einer [virtuellen Umgebung](https://learn.microsoft.com/de-de/visualstudio/python/managing-python-environments-in-visual-studio?view=vs-2022) arbeitet, kommt in den Genuss der automatischen Installation. Einfacher geht es dann nicht mehr.


### Der Chat

![Der AI Chat in Marimo](/assets/img/marimo/marimo_ai_chat.jpg)
_Der Chat ist interaktiv und hat Zugriff auf den Kontext des Notebooks_

Wurde in den *User Settings* ein AI Chat Anbieter konfiguriert, lässt sich dieser über das Seitenmenü direkt aufrufen. Chatten kann man dann mit dem entsprechenden Dienst, wie man es kennt. Interessant wird es aber dann, wenn man Hilfe beim Notebook braucht. So lassen sich Fragen zu Inhalten stellen. Man kann dem Chat per ''@'' Zeichen den Kontext übergeben. Also zum Beispiel: *Hey duuuu, kannst du mir erklären, was es sich mit ``@mein_data_frame`` auf sich hat?* 
Wie man im Screenshot erkennen kann, hat (in diesem Fall **Google Gemini**) erkannt, dass ich mit Daten des [Gaia Programmes der ESA](https://www.cosmos.esa.int/web/gaia/) hantiere und bietet mir entsprechende Erläuterungen an.

Generiert mir die genutzte AI dann auch noch Code, kann ich diesen mit einem Klick direkt ins Notebook übernehmen. Hier wird dann automatisch eine neue Zelle hinzugefügt. 

### Datasources

Jupyter Notebooks sind vor allem in der Data Science Community schwer angesagt. Hier arbeitet man dann mit den vielfältigsten Datenquellen. Ein wichtiger Arbeitsschritt bei der Erstellung eines Notebooks ist die Datenerkundung. Wie sehen die Daten aus, was für Daten wurden geliefert, welche Datentypen werden verwendet und noch viel mehr. 

**Marimo** nimmt mir hier ein paar Schritte ab und das ganz ohne Code.

![Marimo - Daten werden automatisch und visuell aufbereitet](/assets/img/marimo/marimo_datasource.jpg)
_Daten werden automatisch und visuell aufbereitet, ganz ohne Code_

Na klar, die Datenquelle muss einmalig importiert werden. **Marimo** erstellt dann aber automatisch eine praktische Übersicht. Im linken Menü sehe ich dann zusätzliche Details zur Datenquelle. So bekomme ich schnell einen Überblick, wie meine Datenquelle aufgebaut ist. 

### Snippets

"Da gab es doch einen Code für!" - Jeder Programmierer, immer. In den Snippets finden sich genau die Code Schnippsel wieder, an die man sich dunkel erinnert, aber man nicht mehr zusammen bekommt. Auch diese lassen sich per Klick dann einfach einfügen.

![Marimo Snippets](/assets/img/marimo/marimo_snippets.jpg)
_Die Snippets helfen beim Erinnern. Sehr sogar._

### Scratchpad

![Das Marimo Scratchpad](/assets/img/marimo/marimo_scratchpad.jpg)
_Notizen, Code Schnipsel und Ideen lassen sich im Scratchpad hinterlegen._

Das *Scratchpad* ist ein Kritzelbuch. Ich nutze es als Notizbuch, Ideensammelbecken und Coding Spielwiese. Code lässt sich dann genau so, wie man es aus dem Chat kennt, per Mausklick in das Notebook übernehmen.

## Und noch viel mehr

Mit diesem Artikel wollte ich **Marimo** und ein paar für mich besonders nützliche Features einmal vorstellen. In zukünftigen Artikeln werde ich auf einzelne Funktionen noch einmal genauer eingehen.

Mir macht die Arbeit mit **Marimo** viel Freude. Es macht Spaß, Daten zu erkunden und mit ihnen zu experimentieren. **Marimo** nimmt mir wichtige, aber eben oft nervige Schritte ab und reicht mir genau dort die wichtigen Tools, wo sie gebraucht werden. Die Handhabung großer Datenmengen wird einfacher. Dass sich die Notebooks dann noch in vielfältige Datenformate exporieren und sich mit Hilfe von Wasm im Browser ausführen lassen, ist die Kirsche auf einer sehr leckeren Python Torte.

**Marimo** wird aktiv weiter entwickelt und hat eine sehr motivierte Community um sich gescharrt. Ich bin gespannt, was da noch kommen wird.

## Ressourcen

* [Marimo - Projektseite](https://docs.marimo.io/)

* [Marimo - Der User Guide](https://docs.marimo.io/guides/)

* [Das Github Repo von Marimo](https://github.com/marimo-team/marimo)

* [Communities - Übersicht](https://docs.marimo.io/#community)