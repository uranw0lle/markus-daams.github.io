---
layout: post
title: "Linux - Dinge, Tipps, Tricks"
date: 2026-09-09 07:10:39 +0200
category: tipps
author: 
tags: [linux, tipps]
description: "In der Welt von Linux tut sich viel. Daher gibt es hier nun meine Tipps, Tricks und andere Dinge."
image:
  path: /assets/img/post-header/header-linux-tipps.jpg
  alt: Rund um Linux gibt es immer wieder was neues zu entdecken
---

# Zeit für eine weitere Kategorie

Ich stoße immer wieder auf Tipps und Tricks für Linux, die ich praktisch und hilfreich finde, die aber den Weg in mein Langzeitgedächtnis nicht finden wollen. Da lohnt es sich doch, einfach darüber zu schreiben – in der Hoffnung, die Wegfindung zu erleichtern. Es gibt da draußen viele Content Creator, die solche Tipps und Tricks teilen. Dem schließe ich mich an und verbreite nun ebenfalls die Kunde von tollen Tools und Helferlein.

In diesem Artikel stelle ich die Tipps und Tricks vor, die ich selbst als nützlich empfunden habe und schon Teil meines Workflows geworden sind. Das Ökosystem rund um Linux entwickelt sich lebhaft weiter. Da den Überblick zu behalten ist nicht einfach. Aber den Versuch ist es wert.

Also, legen wir los.

## Terminal Tools

### micro 

Wer viel im Terminal unterwegs ist, kennt sicherlich `nano`. Es handelt sich dabei um einen Texteditor für die Kommandozeile. Dateien öffnen, bearbeiten, speichern und fertig. `nano` ist praktisch, weil es nicht viele Funktionen mitbringt und einfach zu bedienen ist. Die wichtigsten Shortcuts hat man sich schnell eingeprägt. Der Name `nano` bringt es auch auf den Punkt: Dieser Editor ist kein Feature Monster, tut jedoch genau das, was man gerade braucht.

Aber so ein kleines bisschen mehr wäre schon toll, oder? Etwas, das zwischen dem winzigen `nano` und dem Goliath `vim` existiert. Was soll ich sagen, das tut es! `micro` ist die moderne Version des praktischen Editors, aber mit einigen Annehmlichkeiten:

- Zeilennummern
- Syntax Highlighting
- Bekannte Tastenkürzel wie STRG + X / C / V / Z usw. 
- Multi Line Editing
- uvm.

`micro` hat bei mir `nano` überall dort verdrängt, wo ich es in den Repos gefunden habe.

![Terminal Tool micro](/assets/img/linux-tipps-1/micro.jpg)
_micro ist die fabulöse Schwester von nano (Screenshot: Markus Daams / 2026)_

### bat

In dieselbe Kerbe wie `micro` schlägt auch `bat`. Oftmals ist ein Editor zu viel des Guten, denn man möchte nur mal fix in eine bestimmte Datei luschern, ohne sie zu bearbeiten. Oder man will sich schnell eine Log-Datei anzeigen lassen. Für solch kleine Aufgaben nutzt man in der Regel `cat`. Es liest eine (oder auch mehrere Dateien) und schreibt sie in die Standardausgabe (Terminal). Allerdings macht `cat` –  ganz Unix like – nur genau das.
Auch hier wünscht das moderne Linux-Auge manchmal auch ein wenig *Eye Candy* und hier kommt `bat` ins Spiel. Es bietet:

- Zeilennummern (die sind sehr oft einfach nur enorm praktisch)
- Syntax Highlighting für viele Sprachen
- Den Fallback auf `cat`, wenn man die Ausgabe zum Beispiel per Pipe `|` oder in eine Datei umlenkt

Ich habe `bat` in den Repos von Fedora und Debian gefunden. Es hat bei mir `cat` inzwischen abgelöst.

> In Debian lässt es sich mit *apt install bat* installieren. Da **bat** aber bereits belegt war, wird es dort mit **batcat** aufgerufen.
{: .prompt-tip}

![Terminal Tool bat / batcat](/assets/img/linux-tipps-1/bat.jpg)
_bat bringt natürlich auch ein Manual mit. **Seht, da ist man bat!** (Screenshot: Markus Daams / 2026)_

### btop

Taskmanager sind total cool geworden. Gerade im Unix / Linux Umfeld gibt es unzählige davon. Da Linux auf praktisch allen wichtigen Servern dieser Welt läuft, ist so eine Entwicklung nur logisch. Die meisten kennen und nutzen `top`. Ruft man es auf, bekommt man die Liste der laufenden Prozesse angezeigt. `top` macht seinen Job gut, so soll es sein.

Aber auch hier wünscht man sich ab und zu ein wenig mehr … Flair? Ich kann es nicht anders ausdrücken. Jedenfalls ist `btop` in die Welt gekommen, um diese bunter zu machen.

`btop` ist ein grafischer Ressourcen-Monitor für das Terminal. Es bringt unter anderem mit:

- Disk, CPU, RAM und Netzwerk Monitoring
- Natürlich eine Prozessliste
- Maussteuerung! 
- und noch so viel mehr

`btop` ist eines dieser Tools, das man sich in einem separaten Terminal aufmacht, einfach, weil es so chillig und cool ist. Die Standardkonfiguration ist für meine Bedürfnisse gut gewählt und ich nutze es für verschiedene Maschinen. Auch `btop` habe ich in den Repos von Fedora und Debian gefunden.

![Terminal Tool btop](/assets/img/linux-tipps-1/btop.jpg)
_Eine Ausgabe im Terminal darf auch mal schick sein. **btop** ist bunt und praktisch (Screenshot: Markus Daams / 2026)_


### iftop

Der letzte Tipp richtet sich an all jene, die der eigenen Paranoia ab und zu ein Leckerli reichen wollen. `iftop` horcht den Netzwerkverkehr ab und erzeugt daraus eine praktische Liste. So sieht man auf einen Blick, welcher Prozess welche Verbindung aufbaut und wie viel Bandbreite dies verbraucht. `iftop` ist ein praktisches Analysetool um nachvollziehen zu können, was verschiedenen Prozesse in das lokale Netzwerk und das Internet versenden.

Es gibt für diese Aufgabe natürlich tausend andere Tools. `iftop` ist für den ersten schnellen Blick meiner Meinung nach besonders gut geeignet, denn auch hier finde ich die Standardkonfiguration gut gewählt. 

![Terminal Tool iftop](/assets/img/linux-tipps-1/iftop.jpg)
_Wer funkt mit wem? Auf Proxmox ist die Ausgabe hier schnell sehr voll (Screenshot: Markus Daams / 2026)_

## Dinge

### AudioMuse-AI

An dieser Stelle möchte ich ein Tool vorstellen, das eigentlich einen eigenen Artikel verdient. Ich habe es aber erst kürzlich entdeckt, bzw. die nötige Geduld aufgebracht, es zu installieren und nutzbar zu machen. Die Rede ist von **AudioMuse-AI**. Es beschreibt sich auf dem [GitHub Repo des Projektes](https://github.com/NeptuneHub/AudioMuse-AI) wie folgt:

> AudioMuse-AI uses sonic analysis to rediscover forgotten songs, uncover hidden connections in your music library, and generate intelligent playlists for Navidrome, Jellyfin, LMS, Lyrion, Emby and Plex: no metadata or external services required.

Das klingt immer noch sehr abstrakt, oder?

AudioMuse-AI analysiert die eigene Musiksammlung und stellt Verbindungen zwischen den Songs her. Es arbeitet hierbei völlig anders als die üblichen Empfehlungsalgorithmen, die nach dem Prinzip arbeiten: *User, die diesen Song mochten, haben sich auch den angehört*. AudioMuse liest nicht die Meta-Daten aus (sprich mp3-Tags), sondern macht eine Schallanalyse (Beats per Minute, Vocals, Tonalität usw.) und klassifiziert danach die einzelnen Tracks. Ist ein Lied traurig, ist es langsam, ist der Text motivierend usw. All das wird extrahiert, in einer Datenbank gespeichert und miteinander in Verbindung gesetzt. *AI und so ...*

Was kann man mit all diesen Informationen anfangen?

- Man kann sich Playlisten passend für bestimmte Anlässe erstellen und das per Freitext: *Eine Playlist fürs Joggen* oder *Eine traurige Playlist für einen regnerischen Tag*

- Unterstützt es der Player, kann man sich dynamische Playists erstellen lassen (*Mehr Songs wie diese* oder *Ähnliche Interpreten*)

- Die *Music Map* zeigt die Verknüpfung verschiedener Lieder und Genres an


Die Empfehlungen basieren nicht mehr auf den Erfahrungen anderer User, sondern auf die tonale und vokale Analyse der eigenen Sammlung und der eigenen Hörgewohnheiten. 

Übrigens, das alles läuft auf Wunsch vollständig lokal und ohne Verbindung ins Internet.

![AudioMuse-AI Instant Playlist](/assets/img/linux-tipps-1/audio-muse-ai.jpg)
_Die Playlists werden direkt an Navidrome gesendet (Screenshot: Markus Daams / 2026)_

Das Tool ist allerdings noch sehr nischig. Ich habe es per Docker installiert. Man benötigt aktuell mindestens einen Container für die Datenbank, den Service Worker und die Core Anwendung. Dazu muss man die Verbindung zur eigenen Musiksammlung herstellen. Bei mir habe ich AudioMuse per Plug-in mit Navidrome verbunden. Die mit dem Navidrome Server verbundenen Music Apps müssen dies ebenfalls unterstützen. Das Navidrome Plugin bietet über Subsonic hierfür API-Endpunkte an. [Mehr dazu im Hilfe-Artikel von Navidrome](https://www.navidrome.org/docs/usage/integration/audiomuse/).

Kurz um: Die Installation braucht Zeit und vor allem viel Geduld. Die erste vollständige Analyse meiner Sammlung hat **eine Woche** in Anspruch genommen. Das lag aber an schwacher Hardware und einer großen Bibliothek. Ist diese einmal abgeschlossen, gehen die Aktualisierungen viel schneller vonstatten.

![AudioMuse-AI Music Map](/assets/img/linux-tipps-1/audiomuse-music-map.jpg)
_Mein Musikgeschmack ist eine zerklüftete Inselkette (Screenshot: Markus Daams / 2026)_

Die große Frage für mich lautet aber: **War es die Mühe wert?**. Die Antwort darauf lautet: **Und wie!**. AudioMuse hat etwas geschafft, an dem Spotify, Deezer, Apple Music und Co gescheitert sind – Playlisten erstellt, bei denen ich die Hälfte der Songs nicht skippen muss. Zudem lassen sich auf diesem Wege musikalische Schätze heben, von denen man nichts mehr wusste. 

Ich bin aktuell noch dabei, mich in die einzelnen Funktionen einzuarbeiten. Daher stelle ich dieses Tool an diese Stelle nur kurz vor. Wer aber eine größere Musiksammlung sein eigen nennt und einen Server laufen hat, der beschäftigt werden kann, sollte AudioMuse eine Chance geben. 

### Audacity

Zu guter Letzt habe ich noch eine Neuigkeit, die vielleicht im unendlichen Nachrichtenstrom untergegangen ist. Für audiophile Linux User ist es aber interessant. **Audacity** ist in der Version 4 erschienen und es hat sich einiges getan. Darunter:

- Audacity rendert nun in QT-6, sieht also nicht mehr so altbacken aus. Ein nativer Dark Mode hat es ebenfalls an Bord geschafft.

- Werkzeuge lassen sich an- und abdocken

- Ein Haufen Performance Verbesserungen

Eine gute Zusammenfassung der Änderungen finden sich in [diesem Artikel auf heise.de](https://www.heise.de/news/Audacity-4-0-Die-Werkzeugmodi-sind-weg-11441052.html).
Da die Flatpaks und nativen Pakete von Fedora bisher nicht aktualisiert worden sind, kann man sich im Download Bereich von [audacityteam.org](https://www.audacityteam.org/download/) ein AppImage herunter laden.

Wichtig zu wissen: Das Format der Projektdateien hat sich geändert. Alte Dateien lassen sich öffnen und werden in das Neue konvertiert. 

![Audacity gibt es nun schick in QT6](/assets/img/linux-tipps-1/audacity.jpg)
_Schick, schick. Die neue Oberfläche in Audacity Version 4 (Screenshot: Markus Daams / 2026)_

## Nachtrag

So, das waren meine ersten Tipps, Tricks und Dinge. Ich habe mir durch den Artikel die kleinen Tools einprägen können und ich hoffe, ein paar sinnvolle News zum Besten gegeben zu haben. Es tut sich viel rund um Linux – dem KI Hype sei Dank. Dementsprechend fällt es schwer, den Überblick zu behalten.

Zu **AudioMuse-AI** folgt vermutlich bald ein eigener Artikel. „Vermutlich“ deswegen, weil ich noch eine Weile brauchen werde, bis ich alles verstanden und genutzt habe. Das Tool ist für mich durchaus ein Game Changer. Klar ist aber auch, dass es aktuell eher was für Nerds ist. Wer aber die nötige Hardware, Musiksammlung und Fingerfertigkeit mitbringt, sollte es ausprobieren, es lohnt sich.

Bis dahin, wünsche ich einen tollen bis spektakulären Tag :)



