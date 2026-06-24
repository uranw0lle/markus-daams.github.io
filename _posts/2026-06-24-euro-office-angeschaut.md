---
layout: post
title: "Euro-Office angeschaut"
date: 2026-06-24 07:16:34 +0200
category: [selfhosting, tools, tipps]
author: 
tags: [tipps, tools, linux, proxmox, cloud, europa]
description: "Euro-Office ist da und ich habe es mir angeschaut. Taugt es was und lohnt sich das selbst hosten?"
image:
    path: /assets/img/post-header/header-euro-office.jpg
    alt: Euro-Office versus MS Office - das wird spannend
---

Ich habe Microsoft Office immer gemocht. Meine erste Version, die ich mir aktiv angeschafft hatte, war MS Office 97 und seit dem habe ich eigentlich jedes neue Upgrade mitgemacht, selbst den Umzug in die Cloud. Ich habe immer einmal wieder Alternativen getestet, wie das früher populäre OpenOffice, bin aber immer wieder in den Armen Redmonds gelandet. Das hat sich erst geändert, nachdem ich vollständig auf Linux gewechselt bin. Zwar könnte ich noch das Cloudangebot von Microsoft nutzen, aber darauf verzichte ich. Ich nutze nun LibreOffice, welches am ehesten mit meinen vielen Dokumenten und Tabellen klarkommt.

Ich hatte mich aber sehr an den Komfort von MS Office gewöhnt. Ich konnte alle meine Dokumente von überall und auf praktisch jedem Gerät bearbeiten. Dazu kamen sehr gute mobile Apps. Es versteht sich von selbst, dass solch ein Angebot nicht nur die Unternehmen dieser Welt erobert hat, Firmen wie Google haben ebenfalls eigene Lösungen aus dem Boden gestampft.

Ein vergleichbares Angebot aus Europa hat bisher gefehlt. Es gibt Online Office Angebote wie [Collabora Online
](https://de.wikipedia.org/wiki/Collabora_Online), ein LibreOffice Derivat, aber keines konnte sich bisher durchsetzen.

Bis jetzt?

## Euro-Office, sie haben die Bühne

Politische Irrungen und Wirrungen haben dafür gesorgt, dass wir Europäer wieder mehr auf uns selbst gucken. Es hat sich eine ["Buy European"](https://markus-daams.com/posts/buy-european/) Mentalität entwickelt und immer mehr Menschen, aber auch Unternehmen und staatliche Institutionen, suchen bewusst Angebote aus und von unserem Lieblingskontinent. Gründe dafür gibt es viele und reichen von Datenschutzbedenken bis hin zur digitalen Souveränität. Kurz um, Angebote aus Europa sind gefragt.

Genau hier vermuten die Macher hinter Euro-Office eine Angebotslücke. Es fehlt eine Office-Suite, die zumindest einen Teil des Angebotes der großen Anbieter wie Microsoft und Google abdecken kann. Ende März 2026 wurde das Projekt vorgestellt und am 9. Juni 2026 erschien die erste Version.

Nanu, so schnell? Man hat eine kleine Abkürzung genommen. Das Team hinter Euro-Office hat das bereits existierende [OnlyOffice](https://de.wikipedia.org/wiki/OnlyOffice) geforkt - also kopiert - und an das eigene Projekt angepasst. Das ist völlig legitim und in der Welt von Open Source nicht ungewöhnlich. Freie Software lebt davon, dass sie ständig weiter entwickelt wird. Wer will, kann sogar Linux kopieren und sein eigenes Ding durchziehen, solange man sich an die Bedingungen der freien Lizenz hält.

Ein gewichtiger Kritikpunkt an dem neuen Projekt ist das Dateiformat. Es gibt zwei auf der Welt, die Relevanz besitzen: Das OOXML Format von Microsoft und das freie ODF. Euro-Office setzt derzeit noch auf das OOXML Format, welches nicht unbedingt dem „Europa!!!1“ Geist entspricht. Das Team hinter Euro-Office hat aber bereits verlautbaren lassen, dass die vollständige Unterstützung des freien ODF Dateiformats ganz oben auf der Feature Request Liste steht.
Und zu guter Letzt, hinter Euro-Office stehen eine Reihe namhafter Unternehmen, darunter Nextcloud, IONOS und Proton. Die Entwicklung scheint also gut abgesichert zu sein.

Auch wenn es noch eine frühe Version ist, habe ich die Veröffentlichung zum Anlass genommen, einen Blick darauf zu werfen. Euro-Office richtet sich zwar eher an kleine bis große Unternehmen und weniger an Privatanwender. Aber nutzen lässt es sich von allen, die Lust darauf haben.

## Docker, wenn es schnell gehen muss


Ich habe mich für die Installation via Docker entschieden, da ich das bereits laufen habe und in *Portainer* schnell einen neuen Stack anlegen kann. Diese sieht in etwa so aus:


``` yaml
version: '3.8'

services:
  euro-office:
    image: ghcr.io/euro-office/documentserver:latest
    container_name: euro-office-test
    restart: always
    ports:
      - "8100:80"
    environment:
      - EXAMPLE_ENABLED=true
      - JWT_SECRET=mein_super_geheimes_test_jwt_secret
    volumes:
      - euro_office_data:/var/www/euro-office/Data
      - euro_office_logs:/var/log/euro-office

volumes:
  euro_office_data:
  euro_office_logs:

```
Die wichtigste Einstellung hier ist ``EXAMPLE_ENABLED=true``. Was hat es damit auf sich?
Euro-Office ist als Integrationskomponente gedacht. Es soll sich mit zum Beispiel Nextcloud oder OwnCloud verbinden, welche bei einer produktiven Installation dann das Frontend stellen. Es gibt zudem auch die WebApps des Anbieters. Euro-Office agiert dann quasi als Backend. Mittels der Environment Variable wird eine Benutzeroberfläche zum Testen geladen. So muss ich für den Test keine Änderungen an meiner Nextcloud / OwnCloud Installation vornehmen.

## Erste Eindrücke

Nach dem ersten Start lande ich auf einer Seite mit Erklärungen und Hinweisen, die ich ignoriere, da das nur eine Testumgebung ist. Die bereit gestellte Weboberfläche erreiche ich über einen Link auf dieser Seite.

![Euro-Office - Übersichtsseite](/assets/img/euro-office/euro-office-overview.jpg){: w="600"}
_Die Übersichtsseite dient als Startpunkt (Screenshot: Markus Daams / 2026)_

Die Seite lädt schnell und ist sehr übersichtlich. Von hier aus kann ich die einzelnen Komponenten laden und auf Wunsch sogar mit Beispielinhalten. Ich habe mir **Presentation** (entspricht PowerPoint) mit diesen Beispielinhalten laden lassen. Diese stammen übrigens noch aus dem OnlyOffice Projekt.

![Euro-Office - Presentation](/assets/img/euro-office/euro-office-presentation.jpg){: w="600"}
_Presentation lädt die Beispielinhalte sehr zügig (Screenshot: Markus Daams / 2026)_

Der für mich wichtigste Punkt sind Excel-Tabellen. Ich habe über die Zeit sehr viele davon angesammelt und einige davon sind mit den wildesten Formatierungen und Formeln versehen. Bei vielen davon ist es mir bis heute nicht gelungen, diese sauber ins ODF Format zu konvertieren. Hier stecke ich also noch im OOXML Format fest. **Spreadsheet** macht hier einen sehr guten Job (auf den ersten Blick!). Ich habe verschiedene Excel-Tabellen geladen und sowohl die Formatierungen als auch die Formeln werden sauber ausgeführt. 

![Euro-Office - Spreadsheet](/assets/img/euro-office/euro-office-spreadsheet.jpg){: w="600"}
_Eine komplexe Tabelle, die ich im Internet gefunden habe, lädt ohne Probleme (Screenshot: Markus Daams / 2026)_

Dokumente werden ebenfalls unterstützt. Ich habe hier ein paar Word-Dokumente aus meinem Archiv getestet, die teils mir sehr alten MS Office Versionen erstellt wurden und habe keinerlei Probleme festgestellt. Wirklich komplexe Dokumente sind jedoch nicht darunter. Für meine Belange würde es völlig ausreichen. 

![Euro-Office - Spreadsheet](/assets/img/euro-office/euro-office-document.jpg){: w="600"}
_Dokumente funktionierten, wie ich es erwarte (Screenshot: Markus Daams / 2026)_

Bei diesem schnellen Test kam es zu keinen Überraschungen. Da schon *OnlyOffice* das OOXML Format gut unterstützte, tut es der Fork natürlich auch. 

## Betrachtung, Bewertung, Eindrücke

Ich finde die Idee einer Cloud-Office-Suite nach wie vor spannend. Anstatt auf jedem Computer eine Office-Suite zu installieren und zu konfigurieren, steht im Heimnetz ein Office bereit, auf das ich von allen Geräten aus zugreifen kann. Bei Euro-Office kommt noch dazu, dass es das OOXML Format unterstützt. Auch wenn ich selbst weg von den „Big Tech“ Lösungen möchte, bei Dokumenten und Tabellen ist das nicht so einfach, wie ich schon öfter feststellen musste. Mein Dokumentenarchiv besteht vornehmlich aus MS Office Dateien, die sich mehr schlecht als recht in ODF konvertieren lassen. Ich habe mich vor dieser Aufgabe auch stets gedrückt.

Dazu kommt die überraschend gute Performance von Euro-Office. Der Container, auf dem Portainer läuft, nutzt einen CPU-Kern und 512 MB RAM. Eigentlich ist das für einen Dokumentenserver viel (wirklich viel) zu wenig und dennoch rennt es. Eine meiner sehr großen Excel-Tabellen lädt so schnell, als würde ich sie lokal öffnen.

Sollte ich es produktiv nutzen?

Die Antwort ist: Es würde mir nicht weiter weh tun, denn mein Proxmox-Server hat noch Reserven. Allerdings handelt es sich eben auch nur um einen einfachen Dokument-Server. Wie oft benötige ich diesen und schwingt da nicht auch ein wenig Office-365 Nostalgie mit. Das sind Fragen, die ich mir selbst nun beantworten muss.

## Mein Fazit

Die Kontroversen rund um den Start von Euro-Office haben mich ehrlicherweise nicht interessiert. Ich kann die Kritik vom Team hinter LibreOffice jedoch nachvollziehen. Wenn hier eine echte Alternative geschaffen werden soll, muss die Unterstützung von ODF schnellstens nachgereicht werden. OOXML ist für eine echte digitale Souveränität keine Option, denn da hat ein sehr großer amerikanischer Konzern den Hut auf. Dazu kommt, dass wenn sich der Fokus von namhaften und finanzstarken Unternehmen auf ein neues Projekt verschiebt, andere Open-Source-Projekte darunter leiden, sowohl finanziell als auch was Code Commits angeht.

Ich mag Euro-Office, auch wenn ich erst einmal nur einen schnellen Eindruck gewinnen konnte. Alle meine von mir getesteten Dokumente wurden anstandslos geöffnet und ich bekam sogar Office 365 Vibes. Mit diesem Projekt scheint eine gute Alternative zu den Angeboten aus den USA zu entstehen.

Ob es sich für mich lohnen wird, ein Produktivsystem aufzusetzen, muss ich mit mir selbst ausmachen. LibreOffice ist für meine Anwendungsfälle nicht ideal, aber es tut, was es tun muss. Mobil setze ich auf die Apps von Collabora, die überraschend gut laufen.

Sollte ich mich entschieden haben, bastele ich auf jeden Fall einen Artikel daraus und präsentiere meine Ergebnisse in diesem Blog.

## Ressourcen

* [Euro-Office GitHub Repo](https://github.com/Euro-Office)

* [Ein Artikel auf heise.de mit Hintergründen](https://www.heise.de/news/Microsoft-Alternative-Nextcloud-und-Ionos-entwickeln-quelloffenes-Euro-Office-11227544.html)