---
layout: post
title: "Wissen und Notizen verwalten mit Obsidian"
date: 2026-04-01 07:36:34 +0200
category: tools
author: 
tags: [selfhosting, linux, quicktip]
description: "Bei mir herrscht ein digitales Chaos der Notizen. Obsidian soll dieses Problem nun lösen."
image:
    path: /assets/img/post-header/header-obsidian.jpg
    alt: Obsidian - Der digitale Zettelkasten
---

# Obsidian - Das Genie beherrscht das Chaos

Bei mir herrscht Chaos, aber ich habe ganz und gar keine Kontrolle darüber, also werde ich mir mit dem „Genie sein“ wohl abschminken müssen. Aber Scherz bei Seite, ich habe ein Problem. Ich arbeite gerne mit Computern und wie man diesem Blog entnehmen kann, interessiere ich mich für alle Themen rund um das Hosten eigener Dienste, Apps und Services. Dazu kommt eine nicht zu bremsende Bastelfreudigkeit, wenn es um Linux geht. Da bleibt es nicht aus, dass ich ab und zu niederschreiben muss, was ich eigentlich gemacht habe. Hier mal eine Konfigurationsdatei geändert, dort mal ein Script geschrieben, man kennt es. Nutzt man verschiedene Computer, hostet man einen bunten Blumenstrauß an Containern, sammeln sich schnell viele verschiedene Notizen an. Ich muss mich schließlich noch in drei Jahren daran erinnern können, dass ich einst eine sehr wichtige Zeile in der Konfigurationsdatei von Nextcloud änderte. 

Dabei habe ich es bisher simpel gehalten. Ich schreibe wichtige Dinge in Textdateien und versuche sie halbwegs logisch abzulegen. Allerdings ist mir das nur in den seltensten Fällen gelungen, denn es fehlte an Konsistenz. So kam es dann, dass ich einen Ordner für Dokumente, einen für Textdateien, eine für Scripte anlegte, ohne mir jemals Gedanken über eine sinnvolle Struktur zu machen. Das war auch Absicht, denn ich hatte eine Zeitlang die Suchfunktion von Windows benutzt, die, man höre und staune nun, richtig gut war. Mit ihr konnte ich durch ein solch „gewachsenes System“ schauen wie mit Röntgenstrahlen. Dieser Zustand war für Microsoft wohl aber unhaltbar, die Suchfunktion ist nur noch ein Schatten ihrer selbst.

Ich nutze mittlerweile ausschließlich Linux. Die Suche ist nicht schlecht, aber auch nicht so gut, dass sie mit meinem „System“ klarkommt. Ich muss mich meinem inneren Dämon stellen und Struktur im Notiz-Chaos schaffen.

Ich habe mir **Obsidian** installiert und ich glaube, ich habe die Lösung meiner selbst geschaffenen Probleme gefunden. In diesem Artikel will ich es kurz vorstellen und meine bisherigen Erfahrungen kundtun.

Los geht’s. 

## Der Ansatz: Halte es einfach

Das Team hinter **Obsidian** bewirbt das Tool mit diesem Claim:

> Die kostenlose und flexible App für deine privaten Gedanken.

Klingt toll und ist es im Kern auch. Die zugrunde liegende Idee ist, dass ich alles, was mir wichtig ist, in einfachen Textdateien ablegen kann und zentral verwalte. Statt eines Ordnerchaos habe ich eine Vault, die allerdings ebenfalls nur ein Ordner ist.

Hierbei kommt **Obsidian** ohne eine Datenbank aus, speichert keine Dateien in proprietären Formaten und verzichtet auch sonst auf irgendeinen fiesen Vendorlock, der die Flucht verhindert, sollte die dunkle Macht doch einmal über den Community-Spirit siegen.

Man nutzt also eine einfache Oberfläche, um Textdateien zu verwalten. Das geht sich einfach an, kann aber auf Wunsch kompliziert werden. Vor allem aber ist es praktisch.

## Kostenlos, immer ein guter Anfang

**Obsidian** selbst ist kostenlos. Einfach installieren und direkt loslegen. Ich konnte es unter Fedora direkt über den App Store „Discover“ installieren. Es ist für praktisch jedes Betriebssystem verfügbar. Hier lohnt sich ein Blick auf die [Downloads Seite](https://obsidian.md/de/download). So gibt es ebenfalls eine App für mein Android Smartphone.

Laut den Lizenzbestimmungen lässt es sich „für immer“ kostenlos nutzen, auch in einem kommerziellen Umfeld oder im Bildungsbereich. Mehr zu den Bestimmungen findet sich [unter diesem Link (Englisch)](https://obsidian.md/de/license).

Allerdings gibt es auch ein kommerzielles Angebot, welches man nutzen kann, aber nicht muss. Der Vorteil dieses Angebotes ist, dass sich die eigene Wissenssammlung mit der vom Anbieter bereitgestellten Cloud-Infrastruktur synchronisieren lässt. Dieses Angebot ist für Intensivnutzer und Unternehmen sicherlich interessant. Bei Interesse finden sich die Preise auf [dieser Seite](https://obsidian.md/de/pricing). Das Projekt finanziert sich hierüber.

Wer, wie ich, seine eigene kleine Cloud hostet, kann sich das bei der geräteübergreifenden Synchronisation zunutze machen.

## Installation, Konfiguration, eine Sache von 2 Minuten

Wie bereits erwähnt, habe ich **Obsidian** über meinen App Store installiert. Nach dem ersten Start werde ich von einem Fenster begrüßt, das mir folgende Option anbieten:

1. Eine neue Vault erstellen
2. Eine existierende Vault öffnen
3. Anmelden *(zur Nutzung des kommerziellen Angebotes)*

Ich starte frisch durch, also lege ich eine neue Vault an. Hierbei handelt es sich um einen einfachen Ordner. In diesem Ordner werden zukünftig alle Dateien von **Obsidian** abgelegt. Ich kann diesen Ordner also frei einsehen, bearbeiten, kopieren, was auch immer. Es wird also nichts verschlüsselt oder in einer Datenbank abgelegt. Sehr transparent – das mag ich.

> Wer nun geräteübergreifend arbeiten möchte, erstellt die Vault (Ordner) auf seine Nextcloud Instanz, oder was auch immer man als Cloud nutzt. Dieser kann dann auf anderen Geräten geöffnet werden.
{: .prompt-tip}

Habe ich die Vault erstellt, sehe ich erst einmal nur die Willkommensseite. Diese brauche ich nicht und kann sie löschen. Oder man nutzt sie als Spielwiese, jeder, wie er mag. 

![Obsidian - allgemeine Ansicht](/assets/img/obsidian/obsidian-allgemeine-ansicht.jpg){: width="550"}
_Die allgemeine Ansicht von Obsidian (Screenshot: Markus Daams / 2026)_

## Text with benefits

Ich habe bisher nur von Textdateien geschrieben, das ist allerdings nicht die ganze Wahrheit. Für die Dateien wird in **Obsidian** auf *Markdown* zurückgegriffen. Bei Markdown handelt es sich um eine sogenannte Auszeichnungssprache. Vereinfacht gesagt, wird der Text um ein paar Symbole angereichert und erhält so eine Formatierung. Beispiel: Um eine große Überschrift zu erzeugen, setzt man ein „#“ davor. Möchte ich eine einen Text fett machen, setzte ich Sternchen (`**dieser Text wird in Markdown fett**`).

Die Dateien selbst werden statt mit der Endung .txt mit .md (für Markdown) angelegt. Sie lassen sich aber mit praktisch allen Texteditoren öffnen und lesen. Markdown ist einfach nur etwas Schmuck für den Text, der von den entsprechenden Tools als Formatierung interprätiert wird.

Um **Obsidian** zu nutzen, sind keinerlei Markdown Kenntnisse notwendig, denn die Formatierung lässt sich auch über die Oberfläche ändern. Und die Spartaner unter uns können natürlich auch gänzlich auf Formatierung verzichten. Damit beraubt man sich aber einer Möglichkeit, sein Wissen sexy für’s Auge zu machen.

Zudem lässt sich Markdown sehr einfach lernen. Ein einfaches Markdown Cheat Sheet findet sich [unter diesem Link](https://www.markdownguide.org/cheat-sheet/). Wer sich die ersten 10 Zeichen merken kann, wird sich über den Komfortgewinn beim Schreiben sehr freuen.
Darüber hinaus ist Markdown sehr weit verbreitet. Es kann in Tools wie Joplin, Evernote, Zendesk, Steam Client und Millionen weiteren Apps genutzt werden. Wer sich die wichtigsten Zeichen einmal draufgetan hat, wird es immer und immer wieder verwenden können. Daher ist auch meine Empfehlung, spätestens mit dem Einstieg in **Obsidian** etwas Markdown zu lernen. Es dauert nicht lange, ist nicht schwer, aber zahlt sich aus.

Der wichtigste Vorteil ist aber, dass ich nicht an **Obsidian** gebunden bin. Ich kann meinen digitalen Zettelkasten in ein anderes Tool umziehen, welches Markdown unterstützt. 

## Einfach ist besser

Einmal gestartet, sieht man links eine kleine Werkzeugleiste, daneben die Übersicht der Notizen, in der Mitte die Bearbeitungsansicht und rechts noch einmal eine Spalte mit weiteren Informationen wie Links und Tags.

Das Prinzip ist einfach. Ich lege einen Ordner an und darin Textdateien. Das kann ich in beliebiger Tiefe machen, also ist eine Unterordner- und eine Unterunterordner-Orgie möglich, aber nicht ratsam. Das richtige Management ist eine Wissenschaft für sich. Ich halte es erst einmal einfach. Für die verschiedenen Dateien meiner Clients (Computer, Steam Deck usw.) lege ich den Ordner *Clients* an und noch einen fürs *Heimnetz*. Ich werde versuchen, die Ebene flach zu halten.

Das ist auch schon die ganze Hexenkunst. Ich lege nun Datei für Datei an und hinterlege all die Hacks, Änderungen, Tricks usw. mit denen ich mein digitales Leben organisiere. Das alles wird zentral gespeichert und kann geräteübergreifend genutzt werden. 

Cool, aber da geht noch mehr!

## Wissen wird erst durch Vernetzung mächtig

**Obsidian** ist leicht zu lernen, kann aber sehr mächtig werden, wenn man es denn will. Durch die Nutzung von Markdown ist es nämlich möglich, Dateien miteinander zu verlinken. Ich habe mir zum Beispiel separate Dateien für meine LXC-Container in Proxmox angelegt, um hier wichtige Informationen wie die IP-Adresse, wichtige Änderungen usw. zu hinterlegen. Dazu habe ich mir eine *Proxmox* Datei angelegt. Diese Datei enthält eine Übersicht aller Container und virtuellen Maschinen, welche ich verlinken kann. Klicke ich einen Eintrag an, öffnet sich die entsprechende Datei. Auf diesem Wege sind natürlich auch Backlinks möglich. Stück für Stück kann ich so mein gesammeltes Wissen untereinander vernetzen. Dank der Link-Übersicht auf der rechten Seite sehe ich auch sofort alle in der Datei enthaltenen Links. So entsteht eine kleine Wikipedia.

Weiterhin können auch `#hashtags` genutzt werden. Damit bietet sich eine weitere Möglichkeit, Themen zu gruppieren und zu vernetzen. Proxmox, meine Linux Clients, mein Steam Deck u. w. lassen sich unter dem Hashtag #linux zusammen fassen. So muss ich dafür keinen Ordner anlegen, der am Ende unflexibel sein kann, wenn sich mal eine Datei nicht sinnvoll sortieren lässt.

Eine weitere Stärke von Obsidian ist die *Graph-Ansicht*. Hier bekommt man eine visuelle Aufbereitung der vernetzten Notiz Sammlung. Man sieht verschiedene Knoten, wobei jeder Knoten eine Datei ist. Wird eine Datei besonders oft verlinkt, wird der entsprechende Knoten größer. Da meine *Proxmox* Datei von all den LXC und VM Dateien verlinkt wird, ist er also entsprechend groß. Klicke ich einen Knoten an, öffnet sich auch sofort die Datei. Für meine Zwecke ist diese Funktion nicht unbedingt nötig. Ich kann mir aber vorstellen, dass sie für z.B. Sammlungen von Recherchen sehr hilfreich werden kann.

![Die Graph-Ansicht von Obsidian](/assets/img/obsidian/obsidian-graph-ansicht.jpg){: width="550"}
_Die Graph-Ansicht von Obsidian (Screenshot: Markus Daams / 2026)_

## Erweiterungen!

Ich halte mich aktuell noch ein einen Tipp, den ich in einem Tutorial für **Obsidian** bekommen habe. Am besten startet man erst einmal ohne Erweiterungen, bis man sich sicher im Umgang mit der Software fühlt. Das ist auch sinnvoll, denn wo Erweiterungen wirken, eskaliert es bei mir gerne einmal. Einige bauen sogar die gesamte UI um und fügen sehr tiefgreifende Funktionen hinzu. Ich habe einen Hang zum kaputt basteln von einwandfreie funktionierenden Dingen. Daher lasse ich hier erst einmal Vorsicht walten.

### Templater

Eine Erweiterung muss sein, denn ich arbeite immer gerne mit Templates. Das sind kleine Vorlagen, die ich nur noch ausfüllen muss. Wenn ich also wie im Falle der LXC von Proxmox immer wieder dieselbe Datei anlegen muss, kann ich mir eine entsprechende Vorlage basteln.

Die Erweiterungen finden sich im Menü *Optionen*. Diese verstecken sich links unten hinter einem Zahnrad Symbol. Es geht weiter im Menü unter *Externe Erweiterungen* → *Durchsuchen*. Hier suche ich nach **Templater** und installiere es.

Um es sinnvoll zu nutzen, lege ich mir einen Ordner *Vorlagen* an. In den Optionen finde ich im Menü den neuen Eintrag *Templater*, wo ich unter *template folder location* den neuen Ordner auswähle. Von hier werden dann alle Vorlagen geladen. Templater ist sehr mächtig, ich halte es einfach für den Anfang. Meine erste Vorlage soll in etwa so aussehen:

``` md

Erstellt: <% tp.date.now("DD.MM.YYYY")%>
Tags:
## Daten

**ID**:
**Name**:
**IP (Port)**:
**URL** (z.B. Caddy):
**Proxmox-Link**:
## Kurzbeschreibung

### Wichtige Hinweise / Notizen 

### Changelog

```

Die Zeile `<% tp.date.now("DD.MM.YYYY")%>` bewirkt, dass bei der Erstellung der Notiz das aktuelle Datum eingefügt wird. Möchte ich aus dieser Vorlage nun eine Datei erstellen, drücke ich die Tastenkombination **STRG + P**. Das öffnet die Kommandopalette von Obsidian, die ebenfalls sehr nützlich ist. Ich tippe **Templater** ein und es erscheint etwas wie **Templater: Create Name-der-Vorlage**. Wähle ich das aus, wird eine neue Notiz unter Verwendung der von mir erstellten Vorlage angelegt. Das ist super praktisch für sich immer wiederholende Tasks.

> Wie gesagt, Templater ist sehr mächtig. Man kann hier viele tolle Dinge programmieren. Daher sollte man Dateien aus dem Internet nicht blind ausführen. 
{: .prompt-warning}

## Tipps: Anhänge & Links

Ein weiterer Tipp von mir bezieht sich auf Anhänge, denn **Obsidian** unterstützt auch diese. Man kann nämlich alle Arten von Anhängen den eignen Dateien beifügen. Damit das aber nicht in einem Wildwuchs endet, empfehle ich, einen Ordner *Anhänge* anzulegen. Danach geht es noch einmal in die Optionen und klickt auf *Anhänge & Links*. Beim Menüpunkt *Standardordner für Anhänge* wählt man im Drop Down Menü *Eigenen Ordner unten festlegen* aus. Direkt darunter wählt man nun den eben angelegten Ordern aus. Danach finden sich alle Anhänge in genau diesem Ordner wieder, anstatt einfach im Hauptordner zu landen. 

![Obsidian Anhänge & Links](/assets/img/obsidian/obsidian-einstellungen-anhaenge.jpg){: width="550"}
_Anhänge am besten in einem separaten Ordner speichern (Screenshot: Markus Daams / 2026)_

Mein letzter Tipp bezieht sich auf die Links. Wie oben beschrieben, lassen sich die Dateien untereinander verlinken. Verschiebt man aber eine Datei mit Links in einen anderen Ordner, gehen die enthaltenen Links kaputt. Dem kann man in den Optionen aber entgegenwirken. Wieder unter *Anhänge & Links* die Option *Interne Links automatisch aktualisieren* aktivieren. Warum das nicht vorausgewählt ist, ist mir allerdings schleierhaft. 

## Mein vorläufiges Fazit

**Obsidian** gefällt mir auf Anhieb, denn es bring einige Dinge mit, die mir bei der Organisation meiner „Wissenschaos“ weiterhelfen:

- Es ist in der Grundkonfiguration sehr simpel
- Kein Vendorlock. Ich habe nur Ordner und Text-Dateien (na ja, Markdown, aber dennoch)
- Es ist kostenlos mit einer sehr engagierten Community drumherum
- Wenn ich will, kann es sehr mächtig werden. Oder sehr kaputt, wenn ich es übertreibe

Ich nutze Markdown ohnehin schon fast täglich. Selbst das kleine CMS, auf dem meine Website läuft, nutzt es. Wer einmal warm damit geworden ist, nutzt es immer wieder.

Da sowohl die Grundkonfiguration, also auch die Dateiverwaltung sehr minimalistisch ist, gestaltet sich der Einstieg sehr einfach. Ich habe innerhalb von drei Tagen meinen Proxmox-Hosts ordentlich dokumentieren können. Geht mal etwas kaputt, weiß ich nun, wo ich nachschauen kann. Denn – das kommt noch obendrauf – **Obsidian** bietet eine hervorragende Suchfunktion. Alles das verlangt von mir Disziplin, denn ab jetzt muss ich nur noch dieses Tool, oder ein Ähnliches nutzen. Alles, was sich so ansammelt, muss sich in diesem einen Ordner wieder finden lassen.

Ich werde mich in den kommenden Tagen mit den vielen Funktionen vertraut machen und meinen Fuß in das tiefe Becken der Erweiterungen tauchen. Stelle ich mich richtig an, habe ich endlich eine Lösung für mein Chaos der Notizen gefunden. Dazu wird es sicher noch ein Update in diesem Blog geben.

Ich wünsche erst einmal viel Spaß mit Obsidian :)

## Ressourcen

* [Obsidian Github Repo](https://github.com/obsidianmd)

* [Obsidian Website](https://obsidian.md/)

* [Markdown Cheat Sheet](https://www.markdownguide.org/cheat-sheet/)

