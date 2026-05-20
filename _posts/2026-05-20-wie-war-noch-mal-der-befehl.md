---
layout: post
title: "Wie war noch mal der Befehl?"
date: 2026-05-20 07:24:02 +0200
categories: [linux, tipps] 
author: 
tags: [linux, terminal, tipps]
description: "Mit ein paar kleinen Tricks kann man sich das Leben im Terminal einfacher machen. Hier sind ein paar davon."
image:
  path: /assets/img/post-header/header-terminal-historie.jpg
  alt: Unleash the Terminal Power - oder so
---

# Das Terminal weiß, was du letzten Sommer getippt hast

Ich bin viel in der Kommandozeile unterwegs. Wer Linux, Proxmox, BSD, Unix oder Hardcore Windows 3.1 nutzt, kann das eventuell nachvollziehen. Viele Aufgaben lassen sich auf diesem Wege häufig schneller erledigen. Oder man weint der ‚guten alten Zeit‘ nach, die einem das Hirn vorspielt – jeder ist da anders. Da ich verschiedene Systeme für verschiedene Aufgaben nutze, komme ich schnell durch den Tüddel, wann ich wo welchen Befehl abgesetzt habe. Dann kann es passieren, dass ich das demütigende Ritual der Suche in einer Suchmaschine durchführen muss, um mich noch einmal daran zu erinnern, wie ich mit `rsync` irgendwas kopieren kann.

Das geht einfacher und bequemer, denn das Terminal vergisst nicht so schnell, was man so alles fabriziert hat. Um mich selbst daran zu erinnern, wie man in seiner eigenen Vergangenheit wühlen kann, ist mir die Idee zu diesem Artikel gekommen. 

Dazu noch ein Hinweis. Ich arbeite jeweils im Standard-Terminal von KDE, Gnome, Proxmox usw. Es gibt in der Unix- / Linux-Welt verschiedene Shells, die man sich installieren kann. Daher ist es möglich, dass die folgenden Kommandos in diesen nicht zur Verfügung stehen. 

Auf geht es.

## history

Ein Befehl, der für mich inzwischen zur heimlichen Nummer 1 der Bash-Archäologie geworden ist, lautet:

``` terminal
history
```
Dieser gibt eine Liste der vergangenen Befehle aus, die in dem entsprechenden Terminal abgesetzt wurden. Das Tolle ist, dass diese Liste durchnummeriert ist. Möchte ich einen Befehl aus dieser Liste erneut aufrufen, ohne ihn zu kopieren oder abzutippen, merke ich mir die Nummer und rufe diesen mit einem vorangestellten Ausrufezeichen auf. Beispiel:

``` terminal
!177
```
Das ruft den Befehl aus der Liste mit der Nummer 177 erneut auf.

> Der Befehl wird direkt ausgeführt, es gibt keine Sicherheitsabfrage.
{: .prompt-danger}

Ich arbeite fast nur mit den Nummern, aber wenn man sich noch an den letzten Befehl erinnert und mutig genug ist, den sofort neu auszuführen, kann dies mit dem folgenden Befehl machen:

``` terminal
!rsync
```
Damit wird der letzte Befehl aus der Historie ausgeführt, der mit `rsync` beginnt.

Die Liste kann aber sehr lang werden, wenn ich im Terminal viel unterwegs bin. Erinnere ich mich noch an einen Begriff aus dem Kommando, kann ich die ``history`` danach  durchsuchen. Beispiel:

``` terminal
history | grep docker
```
Mit dem `|` Pipe Symbol sende ich die Ausgabe an `grep` und suche in meinem Beispiel nach `docker`. Ich bekomme nun eine Liste nur mit Befehlen, die `docker` enthalten.

Die Liste lässt sich aber auch einfach kürzen. Mit dem folgenden Befehl lasse ich mir nur die letzten 20 Kommandos anzeigen:

``` terminal
history 20
```

### Yolo-Modus

Wer Lust auf Russisches Roulette hat:

``` terminal
!?docker?
```

Das führt den letzten Befehl aus, der irgendwo `docker` enthält. Deploye ich einen Container, lösche ich einen kompletten Stack? Niemand weiß es, aber man lebt nur einmal.

## STRG + R

Wer suchet, der findet. Neben `history` gibt es ein zweites Tool, das ich gerne nutze. Mit der Tastenkombination `STRG + R` kann ich eine Freitextsuche starten. Diese ist sehr mächtig, ich belasse es aber bei den einfachsten Methoden.

Im Terminal einfach die Tastenkombination `STRG + R` drücken, und es öffnet sich eine Freitextsuche:

``` terminal
(reverse-i-search)`': 
```
Nun kann man direkt lostippen, die Suchergebnisse erscheinen automatisch. Mit jedem weiteren Buchstaben wird die Suche weiter verfeinert. Tippe ich bei mir ``docker`` ein, erscheint etwa dies:

``` terminal
(reverse-i-search)`docker': docker start b8ea6813ed35
```
Das ist der letzte Befehl, den ich mit ``docker`` abgesetzt habe. Mit einem sanften Druck auf ``Enter`` kann ich diesen dann erneut ausführen.

Suche ich aber nach einem anderen Befehl, der `docker` enthält, drücke ich `STRG + R` erneut. Diese Suche erfolgt dann so lange rückwärts in der Historie, bis ich mein Kommando gefunden habe oder kein weiteres mehr zu finden ist.

## fc

Es gibt noch ein weiteres Kommando, das man sich in seinen geistigen Terminal-Werkzeugkasten packen sollte. Es hört auf den Namen `fc`. Dieser Befehl öffnet den letzten Befehl im Standardeditor (bei mir ist es zum Beispiel `nano`). Warum ist das praktisch? Wenn man ein längeres Kommando wie zum Beispiel `rsync -avh --info=progress2 --exclude='.Trash-*' /home/user/documents /hoppla-vertippt/backup-target/` bearbeiten muss, kann ich das entweder mit den Cursortasten machen, oder bequemer im Editor.

Mit dem folgenden Befehl kann ich mir die letzten 16 Befehle anzeigen lassen:

``` terminal
fc -l
```

Sollen es mehr als 16 Befehle sein, hänge ich die gewünschte Zahl einfach mit an:

``` terminal
fc -l -50
```
Ich bekomme eine Liste der letzten 50 Befehle.

Und genau so kann ich dann auch einen bestimmten Befehl direkt im Editor bearbeiten:

``` terminal
fc 995
```
Nach dem Speichern im Editor wird das Kommando dann ausgeführt. Echt praktisch.

``fc`` bietet noch viele weitere Möglichkeiten. Bei Interesse empfehle ich die ``man fc`` Page. 


## Ich brauche mehr Speed!!

Mein häufigster Fehler in der Konsole ist der, dass ich vergesse, ``sudo`` voranzustellen. Ich kann nun entweder mit der Cursortaste (hoch) den letzten Befehl noch einmal aufrufen und den Befehl bearbeiten. Oder ich nutze ``!!``. Beispiel:

``` terminal
sudo !!
```
Damit wird der letzte Befehl mit meinem vergessenen ``sudo`` ausgeführt, ganz ohne Cursortasten-Tango.

## Fazit

Mir haben die oben genannten Tipps das Leben im Terminal sehr vereinfacht. Ich muss mich nicht mehr zwingend an die genaue Syntax eines Kommandos erinnern und kann es trotzdem bequem wiederfinden und bearbeiten. Viele der Kommandos bieten noch viel mehr Möglichkeiten. Ich empfehle aber, erst einmal mit den Grundlagen zu beginnen, bis es sich ins Muskelgedächtnis eingebrannt hat. Denn wer zu viele Kommandos und Tricks lernt, vergisst viele wieder oder nutzt sie gleich gar nicht mehr, weil die Lust nach dem fünften übergebenen Parameter vergangen ist.

Meine übliche Warnung gebe ich aber auch hier wieder zum Besten: Terminal-Kommandos erst verstehen, dann ausführen. Die Angst, die viele vor der Kommando-Konsole haben, hat ja durchaus einen ernsten Hintergrund. Linux und andere Unixoide werden mich nicht aufhalten, wenn ich zur Laufzeit das gesamte System löschen möchte. Und wer noch nie aus Versehen ``rm -rf /whatever`` als ``root`` abgesendet hat, ohne den Pfad noch einmal peinlichst genau zu prüfen, der werfe den ersten Findling.
 
Wer tippt, denkt und Enter drückt, freut sich aber über Arbeitserleichterungen im Terminal.

## Ressourcen

* [Online man Pages](https://www.man7.org/linux/man-pages/)

* [Lustige Dinge für's Terminal (Englisch)](https://itsfoss.com/funny-linux-commands/)