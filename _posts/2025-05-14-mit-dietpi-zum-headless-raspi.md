---
layout: post
title: "Mit Dietpi zum Headless Raspi"
date: 2025-05-14 07:36:41 +0200
category: selfhosting
author: 
tags: [selfhosting, raspberrypi]
description: "Mit DietPi lässt sich der RaspberryPi als 'Headless Server' betreiben. Wie das geht, erkläre ich in diesem Artikel."
image:
  path: /assets/img/post-header/header-dietpi.jpg
  alt: Headless Server mit DietPi
---

# DietPi - eine Diät für den RaspberryPi

Eines schönen Tages schenkte mir ein Arbeitskollege einen gebrauchten **Raspberry Pi Modell A**. Das war einer der ersten Raspberry Pies und die Hardware war zu schwach, um Spaß damit zu haben und zu stark, um ihn direkt zu entsorgen. Ich hatte versucht, das Gerät mit dem offiziellen [Raspberry PI OS](https://www.raspberrypi.com/software/) zu nutzen, aber es kam zu keiner Zeit Freude auf, also verschwand das Gerät in meiner "vielleicht irgendwann Mal" - Kiste. Ich nutzte für meine ersten Heimserver-Gehversuche eine Synology Diskstation (NAS), war also bereits ausgestattet.

Allerdings störte mich eines weiteren schönen Tages der Umstand, dass mein auf dem NAS installierter [Pi-hole](https://pi-hole.net/) immerzu die Festplatten aus dem Ruhezustand holte und daher grübelte ich über eine Lösung nach. Na klar, mir viel meine Kiste ein und ich holte den inzwischen uralten RasPi heraus. Ich begann mir zu überlegen, wie ich das kleine Ding in ein nützliches kleines Ding verwandeln konnte. Es war mir bereits klar, dass ich ein Betriebssystem brauchte, das wenig bis keine Ansprüche an die Hardware stellte. Da bliebt natürlich nur Linux. Aber auch hier musste ich die Ansprüche noch weiter runterdrehen. Eine grafische Oberfläche, wie KDE, Gnome, XFCE usw. vielen ebenfalls weg. Ich wollte den RaspPi "headless" betreiben, also ganz ohne Monitor, Tastatur oder andere Peripherie, nur mit einem Netzwerkkabel verbunden mit dem Router.

Dazu muss man sagen, dass sich praktisch alle Linux Distributionen so betreiben lassen, wenn diese denn entsprechend konfiguriert sind. Sie sind dies nur leider nicht. Auch nicht Raspberry PI OS. Ich müsste also erst einmal ein eigenes Image erstellen, ohne die ganzen Pakete für die grafische Oberfläche. Diese würde in jedem Fall geladen werden und Ressourcen verbrauchen, ob man sie nun nutzt, oder nicht. Da dachte ich mir erst einmal: *Och nöööö ....* Ich begann die Suche nach einer geeigneten Distribution und ich stieß auf **DietPi**.

## DietPi, das minimale OS

**DietPi** gefiel mir auf Anhieb, denn es war genau das, was ich bereits im Kopf hatte:

- Voll optimiertes Debian, um möglichst ressourcenschonend zu laufen
- Alle nötigen Treiber für den Raspberry Pi sind bereits vorinstalliert
- Keine grafische Oberfläche, dafür aber ein gut nutzbares Menü für das Terminal
- Ein Software-Store
- Backup-Funktion

Es werden, stand heute (14.05.2025) alle Raspberry Pies unterstützt. Es war also das perfekte Image für mein kühnes Vorhaben.

## Installation und Konfiguration

Die Installation ist einfach und läuft genau so ab, wie man es zum Beispiel vom offiziellen Raspberry PI OS kennt. Kurz zusammen gefasst:

1. Das passende Image [hier (dietpi.com / Download)](https://dietpi.com/#download) herunter laden
2. Mit einer Software wie zum Beispiel [balenaEtcher (etcher.balena.io)](https://etcher.balena.io/) / [Rufus (rufus.ie)](https://rufus.ie/en/) auf eine Micro SD Karte brennen
3. Die Karte in den RaspPi stecken und unter Strom setzen
4. Abwarten, denn der Boot-Prozess läuft automatisch ab

Eine etwas ausführlichere Anleitung findet sich [hier (dietpi.com / How to install)](https://dietpi.com/docs/install/).

Jetzt ist natürlich die Frage, wie man nun auf **DietPi** zugreifen kann, wenn gar kein Monitor angeschlossen ist. Wichtig ist, dass der RaspPi mit dem lokalen Netzwerk verbunden ist und eine IP-Adresse bekommen kann. Weiterhin muss diese IP-Adresse bekannt sein. Der Router verrät dies in der Regel, denn der Hostname lautet **DietPi**. Die Verbindung erfolgt dann per **SSH**, denn der SSH-Server [Dropbear (dietpi.com / Dropbear)](https://dietpi.com/docs/software/ssh/#dropbear) ist bereits installiert und vorkonfiguriert. 

Die offizielle Anleitung empfiehlt ein Programm wie zum Beispiel [PuTTY (chiark.greenend.org.uk)](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html) zu nutzen. Ich bleibe aber bei **SSH**, denn es ist bei den meisten modernen Betriebssystemen inzwischen vorinstalliert, oder lässt sich schnell und einfach nachinstallieren. Die erste Verbidung lässt sich dann wie folgt erstellen (exemplarisch): **ssh root@IP-Adresse**.

In meinem Fall sieht das dann so aus:

```shell
ssh root@192.168.178.62
```
Das initiale Passwort lautet **dietpi**. Das Passwort kann und sollte natürlich geändert werden. Nach dem Login werden automatisch Updates installiert. Hier muss man dann, je nach Hardware, etwas abwarten. Ist die Installation durchgelaufen, empfiehlt sich ein Reboot. In diesem Fall einfach ``reboot`` eintippen. Nicht wundern, die SSH-Session wird hierdurch getrennt, kann aber nach ein paar Minuten wieder aufgebaut werden. 

## DietPi läuft, und nun?

Nach der Anmeldung wird man von der "Startseite" erwartet. Hier sieht man nicht nur den Systemzustand, sondern auch nützliche Links und die wichtigsten Befehle.

![DietPi Welcome Screen](/assets/img/dietpi/dietpi-welcomescreen.jpg)
_Alles Wichtige auf einem Blick_

Wichtig zu wissen: Da es keine grafische Oberfläche gibt, wird ausschließlich mit der Tastatur gearbeitet. Um das aber so angenehm wie möglich zu gestalten, hat das Entwickler-Team von **DietPi** einige sehr nützliche Tools entwickelt. Eine Übersicht bekommt man, wenn man den folgenden Befehl eintippt:

```shell
dietpi-launcher
```

Es öffnet sich der Launcher. Von hier aus kann dann mit den *Cursor-Tasten* navigiert werden. Das Menü, also zum Beispiel *Select* oder *Exit* erreicht man mit der *Tabulator Taste*. 

![DietPi - Launcher](/assets/img/dietpi/dietpi-launcher.jpg)
_Alle wichtigen Tools auf einen Blick_

Mit *Enter* kommt man in die entsprechenden Untermenüs.

## Software, optimiert für DietPi

Da es sich bei **DietPi** um ein modifiziertes Debian handelt, kann Software per ``apt`` installiert werden. Der wesentlich elegantere Weg ist es aber, ``dietpi-software`` zu nutzen. Es handelt sich um einen kuratierten Softwarstore extra für **DietPi**, mit optimierten Paketen. Eine Übersicht aller Pakete, die zur Verfügung stehen, findet sich unter [diesem Link (dietpi.com / Software)](https://dietpi.com/docs/software/). Alle Pakte wurden sinnvoll vorkonfiguriert. Details zur Nutzung lassen sich ebenfalls auf der Seite finden. 

![DietPi - Softwarestore](/assets/img/dietpi/dietpi-softwarstore.jpg)
_Es kommen laufend neue Pakete dazu und sind wirklich gut vorkonfiguriert_

Im Softwarestore wählt man dann einfach das gewünschte Paket mit der *Leertaste* aus, bestätigt dies und die Installation beginnt. Paketabhängigkeiten werden automatisch aufgelöst und Dienste (wie zum Beispiel Pi-hole) automatisch gestartet. Einfacher geht es nicht.

> Die Pakete werden meiner Erfahrung nach sehr zeitnah aktualisiert und lassen sich dann über `dietpi-update` bequem aktualisieren.
{: .prompt-info}

## Wie ressourcenschonend ist denn DietPi nun?

Ich konnte mein Vorhaben prima umsetzen. Ich habe **DietPi** auf meinem alten **Raspberry Pi Modell A** installieren können. Ich habe anschließend **Pi-hole** installiert und konfiguriert. Die Systemauslastung war so niedrig, dass ich den Raspi per *USB auf MicroUSB* mit dem Strom aus dem USB-Port meiner **Fritzbox 7590** betreiben konnte! Ich brauchte also keine separate Stromversorgung mehr. In diesem Fall lautet die Antwort also: Sehr ressourcenschonend.

Allerdings macht **DietPi** mit stärkerer Hardware mehr Spaß, denn nur dann lassen sich Dienste wie **Nextcloud** oder **Jellyfin** sinnvoll nutzen. Auf meinem **Raspberry Pi 4** läuft es also geschmeidig, wie man es sich wünscht.

Da **DietPi** nur die benötigten Dienste lädt, die man für einen "headless" Betrieb benötigt, läuft der ohnehin schon recht sparsame Raspberry Pi noch mal einen Zacken sparsamer. Das muss man natürlich wollen und wird erkauft durch entwas weniger Komfort bei der Bedienung, wenn man eine interaktive Oberfläche mit Maussteuerung erwartet. 

## Mein Fazit

Mein damaliges Vorhaben konnte ich mit **DietPi** auf einem **Raspberry Pi Modell A** umsetzen. **Pi-hole** lief und ich konnte es vom NAS deinstallieren. 

**DietPi** ist ein spannendes Projekt. Raspberry Pies sind schon sehr sparsam und dies wird durch ein optimiertes OS noch einmal getoppt. Ich persönlich empfinde die Steuerung per Tastatur zudem als effizient und angenehm, da ich ohnehin oft in irgend einem Terminal unterwegs bin.

Ich nutze **DietPi** schon seit vielen Jahren und es wurde mit der Zeit immer besser. Wer also seinen Raspberry Pi in einen kleinen Heimserver verwandeln will, sollte es sich einmal genauer anschauen. Ich wünsche auf jenden Fall viel Spaß beim basteln.

## Ressourcen:

* [DietPi - Offizielle Seite](https://dietpi.com/)

* [DietPi - Download](https://dietpi.com/#download)

* [DietPi - Installation](https://dietpi.com/docs/install/)

* [DietPi - Softwareübersicht](https://dietpi.com/docs/software/)

* [DietPi - Github Repo](https://github.com/MichaIng/DietPi)

* [DietPi- Forum](https://dietpi.com/forum/)