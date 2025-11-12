---
layout: post
title: "Vibe Coding Abenteuer Teil 4"
date: 2025-11-12 08:35:57 +0100
category: coding
author: 
tags: [coding, learning, text]
description: "Ich habe mein Vibe Coding Projekt weiter geführt. Hier sind meine Erfahrungen."
image:
  path: /assets/img/post-header/header-vibe-coding4.jpg
  alt: Meine Erfahrung mit Vibe Coding
---

# Vibe Coding Abendteuer Teil 4

Mein letzter Artikel, in dem es um mein kleines Vibe Coding Abenteuer ging, ist vom 10. September. Es ist Zeit für ein Status Update, finde ich. In dem besagten Artikel ([„Weiter geht es mit dem Vibe Coding](https://markus-daams.com/posts/weiter-geht-es-mit-dem-vibe-coding/)) ging es vor allem um die Probleme, auf die ich gestoßen bin und wie ich diese umschifft habe. 

Die gute Nachricht ist, ich bin gut vorangekommen. Die schlechte Nachricht ist, die Probleme im Bezug auf die Arbeit mit Chatbots wurden nicht weniger und eines davon erwies sich als „unumschiffbar“. Das lag aber wohl eher an mir. 

Eine weitere gute Nachricht ist, dass mein kleines Social Network nun im lokalen Netzwerk läuft, also produktiv im engsten nur möglichen Sinne, aber immerhin. Wie ich das angestellt habe, darum soll es in diesem Artikel gehen.

## Der definierte Endzustand hat mich gerettet

In meinem letzten Artikel hatte ich erwähnt, dass ich meinem Projekt einen Endzustand verpasst habe. Das bedeutete, dass keine großen neuen Features mehr hinzukommen sollte. Diese Idee hatte mich davor bewahrt, in einer Feature- und Bug-Spirale zu landen, in der ich mich eigentlich schon befunden hatte. Ich habe nur noch Features hinzugefügt, die sich auf meinem „grassroots homegrown“ Kanban-Board befanden. Das waren zu diesem Zeitpunkt:

- Eingefügte Links umwandeln und Vorschau generieren 
- Youtube Video Links umwandeln und mit Mini-Player einbetten
- Kommentar-Funktion und Antwort-Funktion
- Neues Dashboard: Profilübersicht und Übersicht aller Posts eines Users
- Design anpassen (Theme Manager? Ich war mir noch nicht sicher)

![Deck auf Home Assistant](/assets/img/vibe-coding4/nextcloud-deck.jpg){: w="600"}
_Deck auf Home Assistant hilft mir, Features und Bugs zu tracken. (Screenshot: Markus Daams / 2025)_

Kling alles recht einfach und trivial? Ist es leider nicht, denn für alles musste ich im Frontend, im Backend und an der Datenbank herumlöten und das bereitete mir im gewachsenen Zustand meines Projektes Kopfschmerzen. Dennoch ließ ich die AI von der Kette. Ich habe hier zu 90% auf **Gemini** gesetzt. Wann immer aber Googles Schöpfung gegen die Wand lief, kam **ChatGPT** in Form des **Copilots** zum Einsatz. Auch auf **DeppSeek** habe ich hin und wieder zurückgegriffen.

## Das ist eine großartige Idee, du bist so klug!!

Eine Sache wurde mit der Zeit gefühlt schlimmer. Wann immer ich mein Ansinnen in den Prompt geschleudert habe, hat mir **Gemini** erst einmal in den blumigsten Worten geschildert, wie toll meine Idee doch sei. Eine Tabelle für Links anlegen? Wow, die beste Idee nach Erfindung des Kernspintomografen. Der eben erstellte Code funktioniert nicht? Dass mir das aufgefallen ist, stellt mich in eine Reihe mit Heisenberg und Planck. Haben die bei Google Angst, dass ich in eine emotionale Krise abrutsche, wenn ich nicht genügend Bestätigung bekomme? 

Positiv sei aber anzumerken, dass **Gemini** mit jedem Update ein klein wenig besser wurde. Der Code wurde zügiger erstellt, die Erklärungen wurden besser und ich bekam immer weniger Fehlermeldungen. Die Datenbank habe ich aber immer manuell geändert und auch die Migration Files (für die Änderung der SQL-Datenbank) habe ich sehr gewissenhaft selbst überprüft und gegebenenfalls verbessert. 

So konnte ich dann Feature für Feature abfrühstücken. Ich habe stets darauf geachtet, dass **Gemini** den Code für Frontend und Backend separat anpasst und nicht „alles auf einmal“, denn das ging zu häufig schief. Auch waren nach wie vor manuelle Eingriffe notwendig, denn ich habe immer wieder veralteten Code (zum Beispiel alte Axios Syntax) kredenzt bekommen. Solche Dinge habe ich dann schnell selbst ausgebessert. 

![Rust Code](/assets/img/vibe-coding4/rust-gemini.jpg){: w="600"}
_Gemini versteht sich auf Rust, häufig aber mit altem Code. (Screenshot: Markus Daams / 2025)_

Dass ich das Design auf ein globales Theme umgestellt hatte, habe ich **Claude** zu verdanken. Dieser hat mich die benötigten Dateien und eine perfekte Anleitung zu Implementierung generiert. Dazu gab es noch anschauliche Erklärungen.

Bei einigen Änderungen im Frontend habe ich immer einmal wieder auf **DeepSeek** zurückgegriffen. Ich hatte das Gefühl, dass es besser mit **Material UI** klarkommt. Während Googles AI immer einmal wieder mit „Hacks“ um die Ecke kam, habe ich hier stets globale Lösungen erhalten. Also statt *„wir passen das CSS einfach für diesen einen Container an“* bekam ich hier *„füge diesen Code in die Theme-Datei ein, dann funktioniert es für alle Components.“*

Diese Beobachtung ist aber rein subjektiv. Was mir an **DeepSeek** besonders gefällt, ist die sachliche Art der Kommunikation. Statt mich für jeden Prompt in den Himmel zu loben, geht es hier immer direkt zur Sache. Leider gibt es kein gutes Add-On für VS-Code. Ich würde es gerne einmal als Agent in Aktion erleben. Go, China!

## Ja, und dann kam Docker

Nachdem ich alle Features meines Boards implementiert hatte und die Bugs in Bug-Valhalla gelandet waren, war es an der Zeit, den Krempel zu deployen. Es ging mir aber nicht darum, dieses zusammen geschusterte Vibe Coding Elaborat in die freie Wildbahn zu entlassen. Vielmehr wollte ich es auf meinem Proxmox-Server hosten und darüber dann testen und für weitere Experimente nutzen. Dennoch musste ich es dafür in einen Produktiv-Status versetzen.

Im Kopf hatte ich grob skizziert, einen separaten LXC-Conainer zu erstellen, und darin alle benötigten Komponenten wie Object Store, Datenbank, Frontend und Backend als Docker Container laufen zu lassen. Diese Idee promptete ich **Gemini** und ließ mich natürlich erst einmal ausführlich für diesen Geniestreich loben. 

Wenn AIs Nobelpreise vergeben könnten, hätte ich bereits 14 davon, oder so.

Ich bekam eine recht gute Anleitung und dazu ein Docker Compose File, sowie die passenden Docker Files für das Frontend und Backend, denn die mussten erst einmal gebaut werden. Object Store und Datenbank können einfach „gepullt“ werden, denn **postgresql** und **MinIO** wurden praktischerweise bereits erfunden und als Container bereitgestellt. 

Als problematisch sollte sich ab hier herausstellen, dass ich nicht viel Ahnung von Docker hatte. Ich bin mehr so der „bare metal“ Typ. *(Warum lacht mein Proxmox Server gerade)* 

Docker hatte kein Problem mit dem Object Store und der Datenbank, warum auch. Das Frontend konnte nicht gebaut werden. Denn was ich und Google vergessen oder übersehen hatten: Das Frontend war noch gar nicht „production ready“. Dafür musste ich zwei Konfigurationsdateien abändern. Nach dem dritten Versuch lief es durch und mein Frontend lief.

Das Backend hingegen wollte nicht. Es kam Fehler um Fehler. Da mir hier die nötige Erfahrung fehlt, zog ich zunächst **Gemini**, dann **ChatGPT** und später alle erreichbaren AIs zurate. 

Irgendwann konnte der Container gebaut werden, lief jedoch nicht. Das darauf folgende Problem war, dass keine Fehler geworfen wurden. Obwohl ich praktisch jede Zuckung im Backend an *stdout* logge, waren sowohl die Docker Logs, als auch die Konsole leer. Das Backend wird gebaut und der Container erstellt, aber danach passierte nichts. Zur Gegenprobe habe ich das Backend manuell und in guter alter Handarbeit per ``cargo build --release`` gebaut und in einen selbst erstellten Container geschoben. Hier lief es. Mit dieser Lösung war ich aber nicht zufrieden, denn ich wollte das alles nur mit Docker machen, um den gesamten Build- und Deployment-Prozess schlank und schnell zu halten.

Keine der AIs konnte mir dabei helfen, herauszufinden, was die Ursache für diesen Fehler war. Das Backend wurde gebaut, konnte aber nicht gestartet werden. Mangels Logs war es mir nicht möglich, dem Fehler auf die Schliche zu kommen. Ich habe dafür auch einfach zu wenig Ahnung von Docker. 

Ich kann und will an dieser Stelle aber auch nicht ausschließen, das Rust einfach wieder nur gemein zu mir war.

## Na dann eben, „bare metal“ … im Container

An diesem Punkt war ich ein wenig frustriert. Da mir keine AI weiter helfen konnte, vertiefte ich mich in die [Dokumentation (auf docker.hub)](https://hub.docker.com/_/rust/) um einerseits viel zu lernen, aber um andererseits nicht weiter zu kommen. 

Ich beschloss, alles selbst zu machen. Um noch ein klein wenig zu „Vibe coden“, ließ ich mir von **Lumo** eine Anleitung erstellen, wie ich **MinIO** (der Object Store) installiere und Objekte aus der alten Testumgebung in den neuen Store umziehe. **Lumo** hat mir auch eine tolle Anleitung geschrieben, wie ich die Datenbank migrieren kann. Frontend und Backend habe ich manuell, also per ``npm run build`` und ``cargo build  -- release`` zur Welt gebracht. Nginx hat sich praktisch von selbst installiert und konfiguriert. Hier hat mir die AI also das Wälzen der Dokumentation abgenommen, das ist doch auch was.

![Die Anwendung läuft im lokalen Netzwerk](/assets/img/vibe-coding4/die-anwendung-laeuft.jpg){: w="600"}
_Die Anwendung läuft im lokalen Netzwerk. Bei Bedarf kann ich sie an eine Domain binden. (Screenshot: Markus Daams / 2025)_

Bei einer Sache hat mir **Gemini** jedoch besonders gut geholfen. Ich bat darum, mir eine geeignete Projektdokumentation zu erstellen. Ich bin da nicht sehr präzise geworden, da ich gerade dabei war, ein Schokobrötchen zu essen. Heraus kam aber eine gut lesbare und verständliche Readme in bestem Markdown. Erklärt wird, worum es bei dem Projekt geht, der Tech Stack wird aufgeschlüsselt und dazu gibt es noch eine Deployment-Anleitung. Dazu wurde mir noch eine ``.env`` Datei mit Beispieleinträgen erstellt. Echt nice!

![Von Gemini erstellte Projekt Dokumentation](/assets/img/vibe-coding4/backend-projekt-dokumentation.jpg){: w="600"}
_Die von Gemini erstellte Projekt Dokumentation. (Screenshot: Markus Daams / 2025)_

## Ein kleines, vorzeitiges, nicht endgültiges Fazit

Vibe Coding ist anstrengend. Das wäre mein erstes Fazit, dass ich aus dem Bauch heraus ziehen würde. Es hat mir sehr geholfen, neue Features in Stunden zu implementieren, für die ich früher sicher Tage oder Wochen gebraucht hätte. Wann immer ich aber auf Probleme gestoßen bin, haben wir, gemeint sich ich und die AIs, uns regelrecht festgebissen. Auf jede Fehlermeldung folgte dann ein Workaround, der nicht funktionierte. Befinden sich die Chatbots einmal in so einem „Fehler – Lösung klappt nicht – neuer Fehler“ Loop, kommen sie da nicht mehr heraus. Sie können anscheinend nicht außerhalb der dann entstandenen Box denken. 

Um an dieser Stelle der Ehrlichkeit den gebotenen Platz einzuräumen: Mein Projekt macht es den AIs dieser Welt auch nicht einfach. Rust ist eine relativ neue Sprache, die Dokumentation also im Vergleich zu anderen Sprachen noch spärlich und die Entwicklung des Ökosystems sehr agil. Komme ich dann um die Ecke um bitte darum „mal kurz“ eine neue Route nebst Handler zu implementieren, kollidiert das mit eben dieser Realität. 

Ein endgültiges Fazit werde ich jedoch in einem anderen Artikel ziehen. 

## Wie geht es weiter?

Mein kleines Projekt läuft und ich werde weiter damit experimentieren. Zwei Dinge habe ich mir dafür vorgenommen:

1. Ich werde den Build Prozess mit Scripten automatisieren. Anschließend arbeite ich, wann immer ich Lust habe, an dem Projekt weiter. Dann aber mit weniger bis gar keinem Vibe Coding mehr.

2. Ich werde mir Bots erstellen, die sich in meinem kleinen Social Network austoben können. Hier will ich einfach lernen, was möglich ist. Ob ich auf Vibe Coding setzen werde, weiß ich noch nicht. Python ist ganz doll lieber als Rust, das codet sich praktisch von selbst. 

Ob ich mich an die Docker Geschichte noch einmal ran traue, habe ich noch nicht entschieden – die Neugier treibt mich ein wenig in diese Richtung. Mol kieken.

Das Thema Vibe Coding wird mich nicht loslassen, so viel ist sicher. Ich bin nach wie vor fasziniert davon und sehe die vielen Möglichkeiten, die sich auftun. Die Zukunft ist ein Zug, auf dem man besser mitfährt, als ihm nachzustarren.

## Ressourcen

* [Vibe Coding Artikel auf Wikipedia](https://de.wikipedia.org/wiki/Vibe_Coding)

* [Was ist Vibe Coding? Definition, Tools, Vor- und Nachteile (Blog-Artikel auf datacamp.org)](https://www.datacamp.com/de/blog/vibe-coding)

* [Vibe Coding Memes auf programmerhumor.io](https://programmerhumor.io/memes/vibe-coding)
