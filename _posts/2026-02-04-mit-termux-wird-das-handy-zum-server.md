---
layout: post
title: "Mit Termux wird das Handy zum Server"
date: 2026-02-04 08:43:01 +0100
category: selfhosting
author: 
tags: [selfhosting, linux, android]
description: "Wir horten millionen alter Handys. Horten wir alle vielleicht millionen neuer Linux Server?"
image: 
    path: /assets/img/post-header/header-termux.jpg
    alt: Termux ist ein Linux auf Android.
---

# Alte Hardware, neues Leben?

Wenn ich alte Handys nicht verschenke, dann hebe ich sie gerne auf. Nur für den Fall, dass ich es doch irgendwann einmal benötige, was niemals der Fall ist. Also liegen sie herum und veralten langsam. Dabei ist die Hardware noch in Ordnung – muss das so sein? 

Smartphones sind ein Musterbeispiel an Umweltverschmutzung. Sie verbrauchen seltene Erden und weitere, ähnlich wertvolle Materialien, werden quer über den Planeten verschifft, um dann nach ein bis zwei Jahren Nutzung keine Aufgabe mehr zu erfüllen. Keine Sorge, das wird nicht „so ein Text“.

Vor allem steckt in den kleinen Geräten leistungsstarke Hardware. Mein altes Huawei P20Pro aus dem Jahr 2018 zum Beispiel hat eine Kirin CPU 4 x 2.4 GHz (Cortex-A73 Kerne), 4 x 1.8 GHz (Cortex-A53 Kerne), 6 GB RAM und 128 GB Speicher. Das liest sich auch 8 Jahre später wie ein relativ starker Mini-PC – finde ich.

Vorab sei schon einmal gesagt, dass dieser Artikel hier keine richtige Anleitung werden wird. Da es so viele verschiedenen Hersteller und Modelle unserer Titkok-Anzeige-Geräte gibt, kann ich das nicht wirklich leisten. Dieser Text ist eher ein Erfahrungsbericht, wie ich das geschafft habe umzusetzen, was ich mir in den Kopf gesetzt hatte. Vielleicht aber versprühe ich ein klein wenig Inspiration mit dem, was ich hier fabriziert habe. 

Los geht's.

## Studieren geht über probieren. Viel probieren.

Der erste Pferdefuß, auf den ich gestoßen bin, ist der verschlossene Bootloader meinen P20Pro. Huawei gibt diesen nicht frei, sodass es mir nicht möglich ist, ein Custom ROM, also ein eigenes Betriebssystem auf dem Gerät zu installieren. Es gebe schon Möglichkeiten, wie dem Downgrade der Firmware, dem Ausnutzen von Sicherheitslücken, um den Bootloader doch noch aus dem Weg zu räumen. Dafür fehlt mir aber die Motivation und ich habe dennoch etwas erreichen können.

## Termux?

Termux ist ein Android Terminal Emulator, der eine Linux-Umgebung bereitstellt. Da es sich bei Android ebenfalls um ein Linux-like handelt, läuft hier Linux auf Linux, aber das nur am Rande. Das Tolle an dem Projekt ist, dass es auch ohne Root-Rechte laufen kann und ich somit den Bootloader nicht anfassen muss. Das sorgt zwar für kleinere Komforteinbussen, auf die ich später noch zu sprechen komme, aber erst einmal wird es laufen.

## Voraussetzung

Mein P20Pro dient keinem Zweck mehr. Ich hatte es in die Werkseinstellungen versetzt und entsprechend nichts konfiguriert. Ich nutze weder den Google Play Service noch sonst irgendetwas. Das wäre auch eine Empfehlung von mir: Am besten macht man so etwas nur mit einem Gerät, dass man nicht vermissen wird, wenn man es doch einmal in die ewigen Jagdgründe gebastelt hat. Und von hier aus bin ich dann auch gestartet.

> Daher auch die Warnung: Ich habe Sicherheitsmechanismen außer Kraft gesetzt, damit alles funktioniert. So etwas tut man nur auf einem entbehrlichen Gerät, das keinerlei private Daten enthält!
{: .prompt-danger}

Als Erstes habe ich den Play Store unter **Einstellungen** → **Apps** deaktiviert. Der *Play Protect* Service grätscht mir sonst beim Sideloading dazwischen. Da ich den Google Account nicht angemeldet habe, ist der Play Store für mich nutzlos, da ohne Account nur die Aktualisierung von Apps funktioniert. Es ist logisch, dass ich das Gerät im Netzwerk isoliert habe. Das ist praktisch Windows XP ohne ein einziges Update.

## Installation

Als Nächstes habe ich [F-Droid](https://f-droid.org/) installiert. Ein open-source App-Store, den ich auch ohne Account nutzen kann.

Über **F-Droid** habe ich dann [Termux](https://f-droid.org/en/packages/com.termux/) installiert. Termux läuft als App und ich konnte sofort loslegen.

## Hier ist alles so klein!

Es öffnet sich ein einfaches Linux Terminal, das auf meine Eingaben wartet.

Da ich keine große Lust hatte, das Terminal über die kleine Onscreen-Tastatur zu bedienen, habe ich als erstes **sshd** installiert, also einen kleinen SSH Server, damit ich mich über meinen PC verbinden kann. Dieser wird mit dem Paket [*termux-services*](https://wiki.termux.com/wiki/Termux-services) ausgeliefert, welches ich aber erst einmal installieren muss. Also tippe ich:

``` shell
pkg update && pkg upgrade -y
pkg install termux-services
```

Danach aktiviere und starte ich den Dienst mit:

``` shell
sv-enable sshd
sshd
```

Bevor ich den Dienst starte, muss ich wissen, wer ich bin. 

``` shell
$whoami
u0_a394
```

Den Username brauche ich für die ssh-Verbindung. Die IP-Adresse hole ich mir einfach aus der WLAN-Übersicht der Huawei-UI, deren Namen ich vergessen habe. Bevor ich mich verbinde, setze ich aber noch fix ein Passwort mittels ``passwd``. Ich habe nun den ``sshd`` laufen, den Username und die IP-Adresse. Aus der Dokumentation für die *termux-services* weiß ich, dass der Standard-Port für die ssh-Verbindung von **22** auf **8022 geändert** wurde. 
 
![Termux. Ich habe den sshd gestartet](/assets/img/termux/termux-app-start.jpg){: width="250"}
_Ohne ssh mache ich hier gar nichts mehr. (Screenshot: Markus Daams / 2026)_

Auf meinem PC öffne ich die Konsole und tippe:

``` shell
ssh -p 8022 u0_aXXX@192.168.178.36
```

Ich akzeptiere den Fingerprint und freue mich, dass ich ab jetzt nicht mehr mit der Miniatur-Tastatur arbeiten muss.

![Ich habe die SSH-Verbindung hergestellt](/assets/img/termux/termux-ssh-verbindung.jpg){: width="450"}
_So tippt es sich gleich viel angenehmer (Screenshot: Markus Daams / 2026)_


## Screen aus, Daemon tot

Die ssh-Verbindung steht, aber die Session wird gekillt, sobald der Screen aus geht. Das ist eine weitere Sicherheitseinstellung, die ich deaktivieren muss. Als erstes muss ich Termux alles erlauben, was es will:

**Akku** → **App-Start** → Hier deaktiviere ich die automatische Optimierung, und erlaube, das Termux unbegrenzt laufen darf. Da ich den Handy-Server eh mit dem Strom verbunden lasse, brauche ich die Akku-Optimierung nicht.

**Einstellungen** → **Apps** →Hier hebe ich alle Beschränkungen auf. Termux soll dauerhaft im Hintergrund laufen dürfen.

Ich habe zudem noch das Paket ``termux-wake-lock`` installiert. Ich möchte verhindern, dass Termux in den Schlafmodus versetzt wird, wenn sich der Sperrbildschirm aktiviert. So bleibt nun die ssh-Session dauerhaft aktiv und auch andere Dienste werden nicht mehr gekillt, sobald der Bildschirm aus geht.

So weit, so gut.

## Was bei mir nicht geht

In einer idealen Welt schalte ich das Handy an, warte ein wenig und der Server läuft ganz ohne mein Zutun. Das allerdings klappt nicht bei mir. Ich kann zwar ``termux:boot`` installieren, zum Beispiel über den F-Droid Store, aber es wird nicht funktionieren. Das installiere Android verhindert den automatischen Start von Termux, bis ich mich angemeldet habe, da bis dahin auch das Filesystem gesperrt ist. Ohne Root Rechte bekomme ich das nicht deaktiviert. Daher muss ich nach dem Booten Termux und ``sshd`` einmalig selbst starten. Mein Startscript für den ``sshd`` wird dadurch ebenfalls ignoriert.

Das ist aber okay, denn ich kann beides starten und das Handy dann in die Schublade legen, denn die Dienste bleiben dauerhaft aktiv. Damit kann ich erst einmal leben.

## So. Und nun?

Ab hier kann ich nun vieles von dem installieren, was ich in einem Heimnetzwerk so installiere. Das will ich – nur so zum Spaß – einmal testen.

``` shell
pkg install python
```

Mit diesem Befehl installiere ich Python (Version 3). Hier wird ein kleiner Webserver mitgeliefert, den ich für diesen kleinen Test nutzen kann. Ich lege mir ein Verzeichnis an:

``` shell
mkdir -p ~/web
cd ~/web
```

Ich lege mir eine ``index.html``an:

``` shell
nano index.html
```

Die befülle ich mit etwas Content:

``` html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>P20Pro Server</title>
</head>
<body>
  <h1>Hallo vom Webserver</h1>
  <p>Dieser Server läuft auf einem Handy 😄</p>
</body>
</html>
```

Zuletzt starte ich den Server mit:

``` shell
python -m http.server 8080
```

Im Webbrowser auf dem PC steure ich die IP-Adresse meines Handys nebst Port an. Über ``http``, versteht sich.

![Der Webserver läuft und die Seite ist erreichbar](/assets/img/termux/termux-webserver.jpg){: width="650"}
_Der Webserver läuft und die Seite ist erreichbar (Screenshot: Markus Daams / 2026)_

## The sky is the limit

Also, es läuft und ich kann von hier aus weitermachen. Mir steht nicht nur ein kleiner Linux-Server zur Verfügung, auch Python kann ich nutzen. Mit ``pip`` könnte ich es noch weiter eskalieren lassen. Aber das lasse ich erst einmal.

Es bieten sich viele weitere Möglichkeiten, von denen ich hier einige einmal auflisten möchte:

* Es lassen sich ein Haufen Entwicklungsumgebungen installieren, von C/C++, über Rust, bis Swift und Tcl. Eine Auflistung findet sich [unter diesem Link](https://wiki.termux.com/wiki/Development_Environments)

* Auch ein X-Server kann installiert werden – wer sowas denn wirklich braucht. Dann lassen sich Fluxbox, XFCE und andere Window- und Desktop-Manager nutzen

* Für den Fall, dass ich eine klassische root-Umgebung brauche, kann ``proot`` nachinstalliert werden. Es bildet den klassischen Ordner-Baum nach. Die Files werden aber in den User-Files des Smartphones abgelegt

* Lust auf **IPython** oder **ZSH**? Es lassen sich weitere Shells installieren. [Unter diesem Link](https://wiki.termux.com/wiki/Shells) findet sich eine Auflistung

Trotz der Limitierungen ist also doch einiges möglich. Ich habe auf Reddit gesehen, dass sich einige User ein ``pi-hole`` installiert haben. Wie sinnvoll das ist, einen DNS-Dienst auf einem per WLAN verbundenen Gerät zu betreiben, will ich an dieser Stelle aber nicht bewerten. Prinzipiell kommen mir eher Dienste wie ein Musik-Server, ein File-Server oder ein Development-Server in den Sinn.

Jedenfalls freue ich mich, dass es geklappt hat.
 
## Mein kleines Fazit

Ich habe Termux erst ein paar Stunden probiert, bin aber bereits angetan. Mein altes P20Pro lag nur herum und hat Staub angesetzt. Als Ersatz-Handy ist es nicht mehr geeignet, da die Software darauf völlig veraltet ist. Das Gerät weggeben wollte ich aber auch nicht, denn die Hardware ist für viele Aufgaben noch ausreichend. Dass die Hersteller nicht gezwungen sind, die Bootloader freizugeben, ist sehr bedauerlich. Mit alternativen ROMs lassen sich alten Handys neues Leben einhauchen. Das freut nebenbei auch die Umwelt.

Wer sich ebenfalls dafür interessiert, sein Handy umzufunktionieren, sollte dies aber auf alle Fälle mit einem Gerät tun, das entbehrlich ist und auf dem keine persönlichen Daten mehr zu finden sind. Ich habe einige Dinge nur zum Laufen gebracht, weil ich fundamentale Sicherheitsfunktionen deaktiviert habe. Ich würde das Gerät also nicht als öffentlich erreichbaren Server konfigurieren, sondern nur in meinem internen Netzwerk nutzen.

Habe ich aber meine Bedenken erfolgreich zur Seite geschoben, wartet ein kleiner, leistungsstarker und stromsparender Server auf mich. 

Smartphones sind die neuen Mini-PCs!

## Ressourcen

* [Termux im F-Droid Store](https://f-droid.org/en/packages/com.termux/)

* [Termux Wiki (sehr informativ!)](https://wiki.termux.com/wiki/Main_Page)

* [Termux Community auf Reddit](https://www.reddit.com/r/termux/)

* [Eine Übersicht weiterer Communitys](https://wiki.termux.com/wiki/Community)

* [Termux auf GitHub](https://github.com/termux)