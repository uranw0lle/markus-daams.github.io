---
layout: 
title: "Synology auf Abwegen"
date: 2025-07-16 08:42:47 +0200
category: 
author: 
tags: [selfhosting, text]
description: "Wer selbst hostet, kennt sicher auch Synology. Aber merkwürdige Entscheidungen häufen sich. Ein Mini-Rant."
image:
  path: /assets/img/post-header/header-synology.jpg
  alt: Synology
---


# Selbsthost-Hipster haben auf Synology geschworen

Mein erstes NAS, das weiß ich noch genau, war eine Festplatte von Western Digital mit NAS-Funktionalität. Noch bevor Cloud-Drives heißer Darmendprodukt waren, konnte ich auf diesem Wege Daten über mein lokales Netzwerk teilen und hatte meinen ersten Media-Server.

Dieses NAS hatte ich aber nicht so lange, denn mit den Möglichkeiten wuchsen die Ansprüche. Mein zweites NAS war eine Synology Diskstation  DS112j. Von der Hardware her sicher kein Überflieger, aber meine Möglichkeiten wurden mit einem Schlag vielfältiger. 

Synology bot nicht nur Hardware an, die Heimserver erschwinglich machten. Sie lieferten auch ein geeignetes Betriebssystem auf Basis von Linux mit. Enthalten waren Apps, die mein Leben komfortabler machten. Auf einmal hatte ich einen Musik-Server, auf dem ich meine Sammlung nicht nur zentral speichern und pflegen konnte. Ich war nun in der Lage, meine Musik auf vielen verschiedenen Endgeräten abzuspielen. Selbst DLNA wurde unterstützt, was durchaus mal cool war. 

So verhielt es sich mit allen möglichen Dateien. Filme, Dokumente, Backups. Ich konnte dank der Diskstation alles zentral speichern und hatte immer Zugriff, sogar über das Internet. Mein Abenteuer des selbst hostens begann und ich war begeistert.

## Noch mehr Möglichkeiten mit der Diskstation DS218+

Beim Upgrade habe ich ein kleines bisschen mehr Geld ausgegeben. Zum einen wollte ich mit einem RAID mein Setup mit ein wenig mehr Redundanz würzen. Ich benötigte aber auch ein kleines Plus an Rechenleistung, denn es war nun möglich, Docker auf einer Synology zu nutzen. Dazu kamen noch virtuelle Maschinen, die ich nach einem RAM Upgrade installieren konnte. 

Durch Docker war es mir möglich, Dienste zu hosten, die nicht von Synology bereitgestellt wurden. Mein erstes, selbst installiertes Paket war eine frühe Version von Pi-hole. Ich war stolz auf mich, als ich mich da durch gefrickelt hatte. Ich war angefixt und testete zahlreiche Pakete aus. Hier war mir klar, dass selbst hosten mein Ding war.

## Lass das mal die anderen machen

Mit der Zeit schlich sich bei mir aber auch ein Gedanke ein: „Da bemüht sich jemand nicht mehr.“

Denn Synology aktualisierte bestimmte Pakete mit der Zeit immer seltener. Das fiel mir besonders bei „DS Music“ auf. Mit dieser App habe ich lange und gerne genutzt, um meine Musik zu streamen. Ich konnte meine Sammlung zentral verwalten und auch Playlisten geräteübergreifend pflegen und nutzen. Als absoluter Musik-Junkie war das enorm hilfreich für mich. Das Problem war nur: Die App wurde vernachlässigt und viel mit der Zeit aus der Zeit. Das gilt auch für die Android-App, die, stand heute, hoffnungslos veraltet ist.

Auch „DS Photo“ wurde mit Zeit vernachlässigt und am Ende ganz aufgegeben, hat mit „Synology Photos“ aber wenigstens eine halbwegs moderne Nachfolge erhalten. „DS Video“ bzw. „Video Station“ wurde gleich ersatzlos gestrichen. Auch die App für Notizen ist zunehmend verkümmert.

Für all diese Apps gab es ja nun Docker. Die Community stellt mit Apps wie „Immich“, „Jellyfin“, „Navidrome“ und vielen weiteren Lösungen Apps bereit. Warum sich dann noch selbst anstrengen.

Natürlich hatte sich mit der Zeit auch die Mode geändert. Statt Musik und Filme zu kaufen, wurde vermehrt gestreamt. Der Aufwand, solche Apps zu pflegen, wurde also im Verhältnis zur Nutzerbasis nur größer. Aber es gab und gibt diese User noch. 

## Privatkunden, bitte weiter gehen
Wie ich bereits erwähnt hatte, machte es Synology Menschen wie mir möglich, selbst einen kleinen Server zu betreiben. Die Hardware, die Software und die Apps richteten sich vor allem an Privatpersonen. Und das war gut so, denn so holte man sich im aufkommenden Cloud-Hype die Datenautonomie wieder zurück. Mit „Synology Drive“ gab es einen echten Onedrive Konkurrenten, den ich gerne genutzt habe.

Allerdings wurden die Diskstations auch bei kleinen und mittleren Unternehmen immer beliebter. Während die großen Softwareunternehmen dieser Welt „on-premise“ Hardware zum digitalen Dinosaurier verklärten, schufen sich kleinere Unternehmen nur zu gerne etwas von Synology an, um zum Beispiel Dokumente und Daten verwalten zu können. Warum auch nicht, denn ein Vorteil der Diskstations war eben auch die sehr einfache Administration, welche auf Privatpersonen hin ausgelegt und optimiert wurde.

Aber auch im Hause Synology wuchsen die Ansprüche. Unternehmen lassen sich besser monetarisieren als Menschen, wie du und ich. Das Hardware-Portfolio wurde nach oben hin immer weiter ausgebaut, stagnierte im Low-End-Bereich jedoch zunehmend. Mit „C2“ bietet man den dazu passenden Cloud-Service an. Man wurde „the very thing you swore to destroy“. 

## Dann mache ich es gleich ganz selbst

Ich war dennoch kurz davor, mir eine neue Diskstation anzuschaffen. Aber eines Tages ist mir aufgefallen, wie viele Docker Container ich hostete und wie wenig Software von Synology ich noch nutzte. Meinen *Home Assistant* hatte ich bereits auf einen Raspberry ausgelagert. 

Etwas später habe ich mir einen gebrauchten Lenovo Thin Client angeschafft und Proxmox darauf installiert. Da ich sowieso schon ein trainierter Container Dompteur war, fiel mir die Umstellung auch nicht schwer. Dieser Wechsel hob mich in neue Sphären des self-hostings. Es gibt eine riesige Community, eine noch größere Auswahl an Software und ich war nicht mehr auf die Gnade eines Anbieters angewiesen. 

Meine Diskstation wurde zum Backup-Target degradiert. Es gibt von Synology keine native App mehr, die ich noch nutze. Nein, eigentlich hat Synology diese Degradierung vorgenommen, denn Privatpersonen spielen keine Rolle mehr bei der Planung der Unternehmensstrategie, 

## Nicht mit dieser Festplatte

Der Wunsch in mir blieb, trotz der Umstände ein Upgrade der Diskstation vorzunehmen und sei es nur für die Backups. Jedoch wurde dieser Wunsch nun endgültig verbannt, denn ich bin auf diesen Artikel gestoßen: [*“Synology sperrt NAS-Laufwerke: Was noch funktioniert und wie man es umgeht“* (Link zu Computerbase.de)](https://www.computerbase.de/artikel/storage/laufwerkssperre-synology-nas-umgehen.93009/)

Kurz zusammen gefasst: Synology erlaubt auf vielen der angebotenen Geräten nur noch die Nutzung von Festplatten, die auf der offiziellen Kompatibilitätsliste stehen. Selbiges gilt auch für SSDs. Aller anderen HDs lassen sich dann nicht mehr nutzen. Was viele Jahre lang absolut kein Problem war, ist nun auf einmal eines. 

Die Begründung liest sich wie folgt: „*Synology führt neue Kompatibilitätsrichtlinien für HDDs und SSDs ein, um sich an Industriestandards anzupassen und die Systemleistung, Zuverlässigkeit und Benutzererfahrung zu verbessern.*“ [Quelle: [https://kb.synology.com/de-de/DSM/tutorial/Drive_compatibility_policies](https://kb.synology.com/de-de/DSM/tutorial/Drive_compatibility_policies)]

Mit etwas Gutmütigkeit kann ich diese Begründung für Unternehmen noch akzeptieren, aber für Privatpersonen ergibt das keinen Sinn. Ich habe alle möglichen Festplatten in meiner Diskstation genutzt und niemals Probleme feststellen können. Auch habe ich in der Community niemals wahrnehmen können, dass es zu Problemen mit der Systemleistung oder „Benutzererfahrung“ gekommen ist. 

Aktuell lässt sich die Sperre noch mit der Modifizierung der Kompatibilitätsliste auf dem NAS umgehen. Das kann man aber einem normalen User nicht zumuten. Dieser erwartet, dass das Gerät einfach funktioniert. Und sollte diese Liste einmal verschlüsselt oder im BIOS abgelegt werden, ist auch dieser „Hack“ nicht mehr möglich. Ein Spiel mit dem Feuer.

## Selbst hosten? Es gibt Alternativen

Synology scheint sich auf eine neue Zielgruppe zu fokussieren. Das steht ihnen frei. Ich bin der Firma dankbar für das, was sie mir in der Vergangenheit ermöglicht haben. Aber unsere Wege haben sich getrennt. 

Wer selbst hosten will, kann natürlich auf Alternativen zurückgreifen. Firmen wie **Ugreen** stoßen ein wenig in die Lücke, die Synology hinterlässt. Auch der Raspberry Pi, oder ein selbst eingerichteter Server auf gebrauchten Thin Client sind gangbare Alternativen. Inzwischen ist das Internet voll von Anleitungen, toller Software und großartigen Apps. Es ist also nicht mehr nötig, sich auf einen einzigen Anbieter zu verlassen.

## Mein Fazit

Dieser Artikel soll nur ein Mini-Rant sein. Ich will keinesfalls über Synology herziehen, denn sie haben für mich in der Vergangenheit viel richtig gemacht und mir viel ermöglicht, auf dem ich aufbauen konnte. 

Bedauern tue ich die Entwicklung aber dennoch. Wenn es darum geht, Daten aus der Cloud zurückzuholen und die Menschen dazu zu ermächtigen, wieder selbst die Kontrolle über das digitale Leben zu erhalten, sind einfache Lösungen wichtig. Eine Diskstation ließ sich sogar mit geringen Computerkentnissen einrichten und nutzen. Wir brauchen nicht weniger, sondern mehr von einfachen Lösungen.

So, ich mache mir ein Tee. 

## Ressourcen

* [Synology: Neue Plus-Modelle nur noch mit zertifizierten Festplatten kompatibel (Cashys Blog)](https://stadt-bremerhaven.de/synology-neue-plus-modelle-nur-noch-mit-zertifizierten-festplatten-kompatibel/)

* [Was ist Proxmox? Eine Einführung für Einsteiger (wissen-digital.de)](https://www.wissen-digital.de/Was_ist_Proxmox%3F_Eine_Einf%C3%BChrung_f%C3%BCr_Einsteiger)
