---
layout: post
title: "OCI Images - Mehr Container Magie für Proxmox"
date: 2025-11-26 08:32:42 +0100
category: selfhosting
author: 
tags: [proxmox, selfhosting, linux]
description: "Mit der Version 9.1 lassen sich OCI Images mit Proxmox nutzem. Und so geht's."
image: 
    path: /assets/img/post-header/header-oci-images.jpg
    alt: OCI Images in Proxmox nutzen
---

# Einleitung

Das [Changelog](https://pve.proxmox.com/wiki/Roadmap#Proxmox_VE_9.1) von Proxmox hatte für viele eine kleine Überraschung parat. Mit der Version **9.1** kamen die üblichen Bugfixes und einige nette Features hinzu. Eine Neuerung sticht dabei, jedenfalls für mich, heraus: Proxmox unterstützt ab sofort die Containererstellung aus **OCI Images**. Meine Empfehlung ist, das ganze Changelog durchzugehen, denn es hat sich einiges getan. In diesem Artikel soll es aber um die OCI Images gehen, die das Potenzial haben, das Leben und Leiden der Selbsthoster dieser Welt etwas zu vereinfachen. 

## Offene Container sind doch was Feines

OCI steht für „Open Container Initiative“. Durch die Menschen hinter Docker initiiert, wurde es durch die „Linux Foundation“ weitergeführt. Ziel war und ist es, offene Standards für die Erstellung und den Betrieb von Containern zu entwickeln. Frei nach dem Motto: *Podman, Docker, Linux Container, nutze doch, was du willst.*

Bisher gibt es drei Spezifikationen:

* Laufzeitspezifikation (runtime-spec) 
* Abbildspezifikation (image-spec) 
* Verteilungsspezifikation (distribution-spec)

Tatsächlich steckt noch viel mehr da hinter, aber ich belasse es erst einmal bei diesen knackig kurzen Zeilen. OCI Images sollen die Handhabbarkeit von Containern vereinheitlichen und am Ende für alle einfacher machen. 

## Wie kommt da nun Proxmox ins Spiel? 

Bisher setzte Proxmox auf LXC – Linux Container. Diese funktionieren grundsätzlich wie Docker Container, unterscheiden sich aber bei der technischen Implementierung teils erheblich. 
Es gibt viele Wege, solche Container in Proxmox zu erstellen. Der bekannteste und sicher auch meist genutzte Weg ist das Herunterladen eines Container-Templates (Bsp. Debian 12), woraus sich anschließend munter beliebig viele Container erstellen lassen. 

Möchte ich mir zum Beispiel **Nginx** installieren, würde ich einen Container aus einem Template erstellen und mir anschließend **Nginx** installieren und konfigurieren. Geht ganz einfach, kostet nur etwas Zeit.

Ein weiterer Weg sind die „Turnkey“ Images. Dabei handelt es sich ebenfalls um Container Templates, die aber vorkonfiguriert sind. So kann ich das passende Template für **Nginx** auswählen, den Container erstellen und muss nichts manuell nachinstallieren. Nachteil hier kann sein, dass mehr Komponenten vorinstalliert sind, als benötigt werden. Zudem sind die Images häufig nicht auf dem neuesten Stand.

![Turnkey Templates in Proxmox](/assets/img/oci-proxmox/turnkey-images.jpg){: w="550"}
_Turnkey Templates bieten eine Auswahl beliebter Apps und Services (Screenshot: Markus Daams / 2025)_

Und dann sind da noch die [Proxmox Helper Scripts](https://markus-daams.com/posts/proxmox-helper-scripts-vorgestellt/). Das sind keine Templates an sich. Sie vereinfachen aber die Installation und Konfiguration beliebter Apps und Dienste. Grob vereinfacht führt man ein Konsolenbefehl aus, der ein Script herunterlädt, welches automatisiert den vorkonfigurierten Container erstellt. 

Viele Wege führen also zu Wunschanwendung. Braucht es da noch mehr? Warum nicht! Dank offener Standards ist es so möglich, einen Docker Container in einen LXC umzuwandeln. Man bekommt einfach mehr Möglichkeiten, für sich passende Immages zu suchen und zu installieren.

## OCI Images in Proxmox nutzten

Um OCI Images beziehen zu können, ist zunächst ein Upgrade von Proxmox auf die Version 9.1 notwendig. Dabei gilt natürlich – wie immer – Backups machen und ab die Post. Bei mir lief das Upgrade von der Version 9.0.x sauber durch. 

Danach begibt man sich auf dem Proxmox Host zum Ort, wo man seine Templates aufhebt und findet einen neuen Button „Vom OCI Register laden“. 

![Neuer Button in Proxmox](/assets/img/oci-proxmox/oci-images-button.jpg){: w="550"}
_Hinter diesem Button verstecken sich die neuen Möglichkeiten (Screenshot: Markus Daams / 2025)_

Und dann geht es auch schon los. Als Erstes suche ich mir die Referenz der App oder des Dienstes, den ich installieren möchte. Das geht zum Beispiel auf [GitHub](https://github.com/) oder im [Docker Hub](https://hub.docker.com/). Oder mach *Duckduckgot* es sich zusammen. Für mein Beispiel entscheide ich mich für ein Kanban Board von „Kanban“, also ``kanboard/kanboard:latest`` 

![OCI Image Referenzmaske](/assets/img/oci-proxmox/oci-refenz-maske.jpg){: w="550"}
_Die Image Referenz muss mir bekannt sein. Eine freie Suche gibt es (noch?) nicht (Screenshot: Markus Daams / 2025)_ 

Wenig später ist das Template heruntergeladen und ich kann mich daran machen, einen LXC zu erstellen. Hier bleibt fast alles, wie man es bereits kennt. Benennung, Ressourcen zuweisen und so weiter. Bei der Auswahl des Templates wählt man nun aber das soeben bezogene Template aus der Docker Registry. In der Ausgabe am Ende der Erstellung sieht man dann auch gleich die Zeile ``OCI Image detected``. 

![Template Auswahl bei der LXC Erstellung](/assets/img/oci-proxmox/lxc-template-auswahl.jpg){: w="550"}
_Ich wähle mein eben heruntergeladenes Kanban Template (Screenshot: Markus Daams / 2025)_

Nachdem ich den Container erstellt und gestartet habe, ist mein neues Kanban Board auch direkt einsatzbereit. 

![Hallo Kanban Board](/assets/img/oci-proxmox/kanban-board.jpg){: w="550"}
_Da ist auch schon das neue Kanban Board (Screenshot: Markus Daams / 2025)_

## Die Krux mit den Updates

Die Container, die ich bisher nutze, lassen sich recht simple aktualisieren. Idealerweise wurde der Dienst oder die App über den Paketmanager der genutzten Distribution installiert. Mit einem ``apt update && apt upgrade`` wird dann alles in einem Rutsch auf den neuesten Stand gebracht. Mit Containern, die aus OCI Images heraus erstellt wurden, ist das nicht so einfach möglich. Es handelt sich um Wegwerf-Container: Installieren, nutzen, löschen, neu installieren. Dabei gehen dann aber auch die eigenen Konfigurationen und Einstellungen flöten. 

Möchte ich einen solchen Container aktualisieren, muss ich das neueste Image ziehen, den alten Container löschen und diesen dann neu erstellen. 

Um aber meine Benutzerdaten, Konfigurationen usw. zu erhalten, ist ein weiterer Schritt nötig. Ich muss einen dauerhaften Speicher hinzufügen. Das geht zum Beispiel mit einer lokalen Freigabe oder einem „bind mount“. Ich füge dem Container einen Speicher hinzu. Die nötigen Umgebungsvariablen lassen sich ebenfalls für den Container setzen, sogar per Webinterface. Da kann ich dann Beispielsweise Pfade für ENV Files oder User Configs setzen.

![Umgebungsvaribalen setzen per Webgui](/assets/img/oci-proxmox/oci-lxc-umgebungsvariablen.jpg){: w="550"}
_Die Umgebungsvariablen lassen sich bequem per Webgui setzen (Screenshot: Markus Daams / 2025)_

Diese Schritte sind aber reichlich aufwendig für Ottonormal Selbsthoster.

## Automatisierung ist möglich

Alle diese Schritte lassen sich in Proxmox automatisieren, aber auch das ist nicht ganz so einfach. Ich will diesen Artikel nicht völlig ausufern lassen. Dennoch will ich einmal ein grobes Konzept entwickeln, wie man so etwas aufsetzen könnte. Wichtig ist, das man bereits einen persistenten Speicher für die Konfigurationen und User Daten nutzt.

1. Schritt: Den alten Container stoppen und löschen (``pct stop <CID> / pct destroy <CID> -force``)
2. Schritt: Neuestes Image ziehen und das alte auf Wunsch löschen. Mit ``pveam`` (Proxmox VE Appliance Manager) steht ein Tool zur Verfügung, mit dem sich das per Kommandozeile erledigen lässt.
3. Schritt: Den neue Container erstellen (``pct create``). Umgebungsvariablen lassen sich bei der Erstellung mit übergeben und die Bind Mounts gleich mit dran hängen.

Ob ein neues Image existiert, könnte man zum Beispiel mit Podman herausfinden. Das Ganze lässt man dann alle 7 Tage, oder wie oft gewünscht, als Cronjob laufen.

Es ist also möglich, wenn auch nicht ganz so einfach und elegant wie ``apt update && apt upgrade``. 


## Mein Fazit

Bei Proxmox handelt es sich zuallererst um eine Unternehmenslösung. Die Urheber aus Wien wollen schließlich etwas Geld verdienen und es sei ihnen gegönnt. Aber auch bei technikaffinen Privatpersonen hat sich Proxmox inzwischen eine feste Nische eingerichtet. Container machen es möglich, schnell und einfach neue Software zu installieren und zu nutzen. Ideal für alle, die selbst hosten.

Dementsprechend freue ich mich über die Möglichkeit, auch OCI Images für die LXC Erstellung zu nutzen. Ich probiere gerne mal neue Apps und Services aus, wie man in diesem Blog auch ab und zu lesen kann. Interessant wird es auch, wenn man sich seine eigene kleine Container Registry aufsetzt, in welcher ich meine persönlichen Apps hoste. Aber da gehen in meinem Kopf wohl wie die Pferde durch. Hinsichtlich der Updates wird es aber bessere Lösungen aus der Community geben, die alle nötigen Schritte noch weiter automatisieren, da bin ich mir jetzt schon sicher. 

Und zu guter Letzt sei noch einmal angemerkt, dass all das möglich ist, weil es offene Standards gibt. *Open Source rocks again.*

## Ressourcen

* [Die Pressemitteilung von Proxmox zur Version 9.1](https://www.proxmox.com/de/ueber-uns/details-unternehmen/pressemitteilungen/proxmox-virtual-environment-9-1)

* [Das Proxmox User Forum - Auch auf Deutsch!](https://forum.proxmox.com/)

* [Die offizielle Seite der Open Container Initiative](https://opencontainers.org/)
