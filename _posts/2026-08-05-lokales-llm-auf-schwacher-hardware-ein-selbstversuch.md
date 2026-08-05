---
layout: post
title: "LLM auf schwacher Hardware - Ein Selbstversuch"
date: 2026-08-05 08:24:59 +0200
category: tools
author: 
tags: [tools, tipps, learning]
description: "Kann man LLM sinnvoll auf schwacher Hardware nutzen? Das will ich herausfinden und spinne mir ein neues Projekt."
image:
  path: /assets/img/post-header/header-lokales-llm.jpg
  alt: Kann man LLMs sinnvoll auf schwacher Hardware nutzen?
---

# LLMs, das heiße Verdauungsendprodukt

Aktuell schießen neue und verbesserte [LLM](https://de.wikipedia.org/wiki/Large_Language_Model) wie Pilze aus dem Boden. Ein für mich durchaus interessanter Trend ist, dass diese immer effizienter werden. Immer bessere LLM werden auf immer mehr Hardware lauffähig. Dennoch muss man weiterhin recht potente Hardware bereitstellen, wenn man diese vollumfänglich und einigermaßen komfortabel nutzen möchte.

Für einen altersschwachen Home Server also aktuell nicht sinnvoll nutzbar, oder vielleicht doch? Irgendwie?

Ich habe meinen [Proxmox](https://markus-daams.com/tags/proxmox/) Server inzwischen gut optimiert und Leistung wird nur noch abgerufen, wenn sie wirklich benötigt wird. Ansonsten ist er leise und spart Strom. Das bedeutet aber auch, dass der Server sehr oft einfach gar nichts tut, besonders in der Nacht.

Meine Frage ist, ob ich die Einschränkung der immer noch sehr fordernden LLM mit meinem nächtlich-faulen Server kombinieren kann.

Das schreit in mir nach einem neuen Bastelprojekt. 

## Ziele

Die besagten LLMs laufen auch auf schwacher Hardware. Nur machen diese dort nicht den geringsten Spaß. Wenn ich eine Frage stelle, kann es sehr lange dauern, bis eine Antwort generiert wird. Die für diese Antwort benötigten Tokens müssen auf zu alter Hardware mit zu wenig Rechenpower generiert werden. **Aber** sie werden generiert. Das Ergebnis steht einfach nur später zur Verfügung. Hier ist also Zeit eine Ressource, die ich bei meinem Projekt mit einberechnen muss.

Und in der Nacht, wenn ich faul und völlig unproduktiv herum schlafe und mein Server die digitalen Hände in die Tasche steckt, weil nichts zu tun ist, steht genau diese Zeit zur Verfügung.

**Die Idee:** Ein LXC mit einem LLM bekommt Nachts Aufträge zugeteilt, um diese abzuarbeiten. Da diese nicht zeitkritisch sind, kann die Abarbeitung entsprechend lange dauern.

Welche Projekte sind für solche Tasks geeignet? Da sind mir sofort drei Dinge eingefallen.

1. Ich würde gerne einen lokalen Dienst haben, der Nachts die neuesten und wichtigsten Nachrichten aus der Welt verarbeiten kann. Das LLM soll diese dann für mich gegebenenfalls übersetzen, zusammenfassen und einen strukturierten Report erstellen. Diese Nachrichtenübersicht soll für mich dann so neutral formuliert sein, wie möglich.

2. Dieses LLM bekommt eine Übersicht aller Medien (Filme, Musik, Bücher usw.), die ich bei mir gespeichert habe und erstellt damit eine Liste mit Empfehlungen. Für meine Musiksammlung kann das LLM zum Beispiel Tags erstellen, die zu den einzelnen Musik-Files passen, wie zum Beispiel für die Stimmung (traurig, fröhlich …). Auf Basis dieser Tags kann das LLM dann Playlists für mich erstellen. Noch verrückter: Das LLM erhält den Wetterbericht oder die Sportergebnisse meines Lieblingsclubs und erstellt hierfür eine Playlist für den nächsten Tag. 

3. Meine [Obsidian Notizsammlung](https://markus-daams.com/posts/wissen-und-notizen-verwalten-mit-obsidian/) hat stattliche Ausmaße angenommen. Das LLM könnte da einmal durchgehen und mir zum Beispiel Tags, Korrekturen und Verknüpfungen vorschlagen. Gerne darf es auch ergänzende Notizen erstellen. Ich habe viele Notizen für nützliche Befehle für das Linux Terminal. Vielleicht fällt dem LLM eine passende Notiz ein, die mir noch fehlt.

Im Großen und Ganzen geht es mir also vornehmlich um Wissensmanagement und Datenpflege. Und neue Playlisten für meine Musiksammlung. Habe ich das Projekt richtig gestaltet, wird es sich aber beliebig erweitern lassen. 

## Einschränkungen

Für mich steht von Anfang an fest, dass das LLM vollständig lokal laufen wird, keinen Zugriff auf das Internet erhalten wird und kein anderes Produktivsystem auch nur angucken darf. Ich bin durch [Amok löschende KI-Agenten](https://www.heise.de/news/KI-Agent-loescht-Daten-Katastrophe-fuer-PocketOS-11279416.html) doch ein wenig aufgeschreckt.

Das bedeutet für mein Vorhaben, das ich eine API und einen Daten-Provider dazwischen schalte. Das macht es erst einmal komplizierter, aber auch sicherer. Dazu kommt, dass ich sowohl LLM-LXC und API auswechseln kann, wenn ich das muss oder will.

Okay, daraus ergibt sich nun eine Struktur, die ich versuche umzusetzen und mit der ich mich wohlfühle. 

## Struktur

![LLM Projektstruktur](/assets/img/misc/llm-projekt.jpg)
_Ein hastig zusammen geschustertes UML Diagramm (Screenshot: Markus Daams / 2026)_

In meiner Idee senden Services, die für bestimmte Aufgaben ein LLM benötigen, ihre Daten an eine API, die auch als Service Provider agiert. Diese nimmt Anfragen oder Daten entgegen, bereitet diese auf und sendet diese mundgerecht an das LLM. Die entgegengenommenen Daten werden für den entsprechenden Dienst erneut aufbereitet und zurückgesendet. Alle Komponenten sollten idealerweise austauschbar sein. Mit dieser Vorgehensweise habe ich bei meinem [per Vibe Coding zusammen gezimmerten Social Network](https://markus-daams.com/posts/ich-habe-mal-vibe-coding-ausprobiert/) gute Erfahrungen gemacht. Sowohl Backend, als auch Frontend und Object Store können in diesem beliebig getauscht werden.

* Der LLM LXC: Dieser bekommt 4 CPU Kerne, 8 GB Speicher und 40 GB SSD Speicherplatz. Hierauf ist dann Platz genug für 3 – 4 kleinere LLM Modelle. Ich habe mich hier zunächst einmal für [Open Web UI](https://docs.openwebui.com/) entschieden. Allerdings nur für den schnellen Start. Sollte alles so klappen, wie ich mir das zurecht gesponnen habe, tausche ich das durch einen LLM Provider ohne UI aus, wie zum Beispiel [Ollama](https://github.com/ollama/ollama). 

* Ollama bringt eine eigene API mit, aber die bastele ich mir lieber selbst. Mein eigener Provider soll via [FastAPI](https://github.com/FastAPI/FastAPI) kommunizieren und die Daten für alle beteiligten Services aufbereiten. Beispiel: Ein Job auf dem Server sammelt zu einer bestimmten Zeit Daten zusammen, bereinigt diese und sendetet eine Aufgabe an den LLM LXC. Die Antwort wird entgegengenommen und dem Dienst zurückgegeben.

![Open Web UI Chat läuft bereits](/assets/img/misc/llm-projekt-chat.jpg)
_Ahahaha ... was? Nun muss ich gute Modelle und Prompts finden (Screenshot: Markus Daams / 2026)_

* Die Dienste können entweder eigene Anfragen an die API senden, oder stellen Daten bereit, welche dann vom Provider verarbeitet werden. Eigentlich sollte ich Provider und API auch noch einmal trennen. Das mache ich dann aber auf dem LXC, auf dem das laufen wird. Das Sammeln der Daten, die Konvertierung von zum Beispiel TXT zu JSON sowie die Formulierung der Prompts erfolgt hier. 

Soweit zur groben Struktur.

## So weit bin ich bisher gekommen

Der LXC (ai-core) läuft bereits. Zudem habe ich einen weiteren LXC mit Docker und [Dockge](https://github.com/louislam/dockge) aufgesetzt. Ein wenig UI mag ich halt doch.

Innerhalb von Dockge habe ich das Compose File für FastAPI angelegt. Für FastAPI habe ich zudem bereits die Ordnerstruktur erstellt, damit ich später verschiedene Routen und Handler verwalten kann, ohne dass es unübersichtlich wird. Zudem habe ich eine Test-Route eingerichtet. Ein Python File konvertiert meine Anfrage über das Terminal in einen Open Web UI konformen API Request und gibt mir die entsprechende Antwort zurück. API-Keys, URLs und anderes Gelöt verwalte ich in einer `.env` Datei. *Wiederverwendbarkeit to the limits!*

Ich habe ein lokales Git Repository angelegt. Bei meinen Basteleien fordere ich das Glück nicht zu sehr heraus – das gebrannte Kind scheut das Feuer. Das verbrannte Kind nutzt Git. 

## Was nun kommt

Da die grundlegende Infrastruktur steht und funktioniert, lege ich als Nächstes die nötigen Files für die von mir erdachten Dienste an. Ein Crawler soll nach Nachrichten suchen oder RSS Feeds abgrasen, die Überschriften sowie Texte extrahieren und ein Cronjob gesteuertes Python File soll – in der Nacht – unter Verwendung einer promt.md den Kram an das LLM senden. Das LLM fast alles zusammen und übersetzt bei Bedarf. Die Antwort wird wiederum aufbereitet und weiter versendet. Für Nachrichten kann ich mir zum Beispiel einen kleinen Webserver basteln, der dann jeden Tag ein neues und fertig formatiertes HTML File mit den neuesten Nachrichten ausliefert. Wenn das alles gut geht, habe ich jeden Morgen einen Report mit den neuesten und wichtigsten Nachrichten vorliegen.

Zudem werde ich loggen, wie viele Tokens verbraucht werden, welche Prompts gut funktionieren und welche nicht. Außerdem muss ich tracken, welche Modelle für welche Aufgaben am geeignetsten sind. Für Witze über Römer im Reich der Parther ist **gemma3:4b** zum Beispiel eher nicht geeignet.

Es ist also viel Probieren angesagt.

## Fazit und … warum?

Als mir die Idee für dieses Vorhaben in den Kopf kam, hat sich natürlich auch das kleine Teufelchen gemeldet: „Wozu das Ganze, es gibt vermutlich bessere Tools dafür“. Das ist bestimmt richtig, aber geht mir auch ein wenig um den sportlichen Ehrgeiz. Sehr oft stellt sich mir die Frage, ob ich das wohl hinbekomme und ob ich dabei auch etwas lernen kann. Durch dieses Projekt verwende ich zum Beispiel wieder sehr viel Python und kann mich auf diesem Wege auf den neuesten Stand bringen. Außerdem kann ich die (wenige) Rechenpower, die ich lokal zur Verfügung habe, effizienter nutzen. Ein LLM, das Nachts läuft, stört mich nicht weiter und kann sich Zeit nehmen.

Ich bekomme auf diesem Wege einen eigenen, kleinen, digitalen Assistenten mit gewissen Fähigkeiten.

Ich bin mit dem bisherigen Projektfortschritt zufrieden. Das liegt vor allem daran, dass ich bisher nur Container deployt und `mkdir` bzw. `touch` abgefeuert habe. Die großen Brocken kommen noch.
Darauf freue ich mich aber und dann gibt es auch einen Folgeartikel dazu.

Bis dahin :)

## Ressourcen

* [Open Web UI Github Repository](https://github.com/open-webui/open-webui)

* [Ollama Github Repository](https://github.com/ollama/ollama)

* [FastAPI GitHub Repository](https://github.com/FastAPI/FastAPI)

* [Dockge Github Repository](https://github.com/louislam/dockge)