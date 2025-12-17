---
layout: post
title: "Meine Self Hosting Hitlist"
date: 2025-12-17 09:06:13 +0100
category: selfhosting
author: 
tags: [selfhosting, linux, proxmox]
description: "Ich habe eine Liste mit den Apps erstellt, die ich gerne selbst hoste. Möge das Ranking beginnen."
image:
    path: /assets/img/post-header/header-meine-selfhosting-hitlist.jpg
    alt: Meine Self Hosting Hitlist
---

# Selbst ist der Mensch

Gefühlt wird gerade alles ein klein wenig doofer. Die RAM Preise explodieren, die Kakao Preise explodieren, überall auf der Welt explodieren andere Dinge und überhaupt und so. Alles wird teuer, teurer bis extrem viel teurer. Daher hat die Community, welche die Dinge selbst in die Hand nimmt, auch sehr regen Zulauf. Wer selbst hostet, muss sich um eventuelle Preissteigerungen erst einmal nicht so viele Sorgen machen. Auch passiert es sehr selten, dass der genutzte Dienst plötzlich hinter einer Bezahlschranke verschwindet oder an einen Hedgefonds verscherbelt wird. Kurz um, es gibt gute Gründe, wieder mehr selbst zu machen. 

Ich hoste schon länger viele Dienste selbst, wie man an diesem kleinen Blog sicher auch ablesen kann. Da bietet es sich an, einmal über alle meine Lieblingsapps zu schreiben und warum ich mich für diese entschieden habe. Das mache ich in einer Hitliste mit einem Ranking, geboren aus einem Bauchgefühl. Die Liste ist auch nicht vollständig, nicht jede App schaffte es ins Ranking. Wer einmal mit dem Selbsthosten angefangen hat, findet sich schnell in der einer Spirale der Lust wieder, die aus immer neuen Deployments neuer und aufregender Anwendungen besteht.

Vielleicht inspiriert diese Liste ja den einen oder anderen, einfach mal selbst Hand anzulegen. Denn die nächste Preiserhöhung der Lieblingscorpo kommt so sicher wie die nächste Weltkrise.

Let’s go.

## 10. Paperless NGX

Die erste App in dieser Liste ist eine der Anwendungen, die man nach der Installation nicht weiter beachtet. Dabei leistet sie bei mir einen außergewöhnlich guten Dienst. Ich gehöre zu denen, die alle möglichen Dokumente gewissenhaft sortieren, abheften und anschließend vergessen. Benötige ich sie dann, muss ich in meinem Aktenordnerdschungel auf Safari gehen. Die Zeiten sind glücklicherweise vorbei. **Paperless NGX** ist ein open source Projekt, das das papierlose Büro in greifbare Nähe rücken lässt. Dokumente lassen sich scannen und in einer Datenbank ablegen. Dank Tags, Kategorien und weiteren Sortierhilfen lassen sich diese dann strukturiert einsortieren und genau so wiederfinden, denn eine leistungsstarke Suchfunktion wird ebenfalls mitgeliefert. Von Privatpersonen bis kleinen Unternehmen findet sich hier eine praktische Lösung für das Dokument-Management. Für Profis gibt es zudem auch eine gut dokumentierte API.

Per Smartphone App lassen sich die Dokumente übrigens fix scannen und hochladen. [Hier](https://demo.paperless-ngx.com/?__cf_chl_tk=Dcfrql2D.SKTkjNRrGDxBbTCDn9nWuoR3m8galI4dNM-1765975850-1.0.1.1-KaS_J.498AvfhNpas_UpSxFiM1.wdk.Hk9FHPAxEO88) geht es zu Demo.

![Paperless NGX](/assets/img/selfhosting-hitlist/paperless-ngx.jpg){: w="600"}
_Dokument Management mit Paperless NGX (Screenshot: Markus Daams / 2025)_

## 9. Heimdall

**Heimdall** ist nicht nur so nett und bewacht das Zuhause der nordischen Götter. Es dient auch als Namenspatron eines kleinen Projektes, welches ein Dashboard erstellt hat, um sein Heimnetzwerk zu überwachen. Ok, das ist sicher etwas zu hoch gegriffen. Aber es kann dabei helfen, die Übersicht zu behalten. Ich nutze **Heimdall** aktuell als Startseite, um von dort aus direkt wichtige Apps wie **Nexcloud**, **Home Assistant** oder **Jellyfin** zu starten. Wichtige Apps lassen sich zudem per API koppeln und so sehe ich auf den ersten Blick die Auslastung meines Proxmox Hosts – echt praktisch.
Daneben lassen sich aber auch Links auf Websites anlegen. Außerdem steht mir eine frei konfigurierbare Suchleiste zur Verfügung. 

![Heimdall](https://camo.githubusercontent.com/829c0a0f54a8ac032dbe07603127ad318c056fa7b46823eb9a72df5ffc74f796/68747470733a2f2f692e696d6775722e636f6d2f4d72433451704e2e676966){: w="600"}
_Heimdall als Animation, gehostet auf dem Github Projekt._


## 8. Pi-hole

Das Internet kann ein ganz toller Ort sein, ist es aber sehr oft halt nicht. Einmal abgesehen von fragwürdigen Inhalten, ist es vor allem eines: Von Werbung überschwemmt. Viele Menschen nehmen das nicht mehr hin und nutzen inzwischen einen Werbeblocker im Browser. Allerdings beschränkt sich die Werbeindustrie schon lange nicht mehr nur auf den Browser. Ob Smartphone, Smart-TV, Spielekonsole und eigentlich jedes Gerät, dass sich mit dem Internet verbinden kann, lässt sich auch als Tracking- und Werbeplattform nutzen.

In diesem Fall reicht der Ad-Blocker im Browser nicht mehr. Was her muss ist ein Blocker, der Netzwerk weit funktioniert. Und hier setzt das open source Projekt **Pi-hole** an. Einmal installiert, blockt es alle Domains, die sich versuchen, mit eben jenen Tracking- und Werbeservern zu verbinden. Die dafür nötigen Listen werden von einer großen Community gehegt und gepflegt. Nebenbei lassen sich allerhand Scam Seiten für Cryptowährungen, Spielecasinos und so weiter gleich ganz blocken. 

Der **Pi-hole** ist genügsam, läuft also auf jeder Kartoffel und ist mein klitzekleiner Schutzschild gegen eine außer Kontrolle geratenen Werbeindustrie. Er gehört ganz klar in mein Ranking.

![Pi-hole](/assets/img/selfhosting-hitlist/pi-hole.jpg){: w="600"}
_Das Dashboard vom Pi-Hole (Screenshot: Markus Daams / 2025)_

## 7. Proxmox

Ich habe beim Thema Hosting der eigenen Apps vieles hinter mir. Von der einfachen NAS-Festplatte von Western Digital, über Synology Diskstation bis Raspberry Pi’s habe ich vieles genutzt. Mit **Proxmox** habe ich meinen Heimathafen gefunden. Hierbei handelt es sich um eine Management-Lösung für Container und virtuelle Maschinen. Was auch immer ich hosten möchte, ich bekomme es auf **Proxmox** zum Laufen. Manchmal steckt viel Bastelei dahinter, aber es läuft irgendwann. [Die Artikel](https://markus-daams.com/tags/proxmox/) in meinem Blog sind ein Zeuge davon. Um dieses open source Projekt aus Österreich hat sich zudem eine sehr aktive Community herum entwickelt, die ständig größer wird. 

**Proxmox** ist meine Empfehlung für alle, die zumindest grundlegende Kenntnisse in der IT und vor Linux nicht so viel Angst haben. Die Lernkurve kann je nach Vorwissen sehr steil sein. Am Ende wartet aber eine sehr flexible und mächtige Lösung für das eigene IT-Ökosystem. Daher musste es natürlich auch in diese Liste.

![Proxmox](/assets/img/selfhosting-hitlist/proxmox.jpg){: w="600"}

## 6. Runtipi

Warum einfach nur Container hosten, wenn man in einem Container noch mehr Container hosten kann? Containerception! Ich präsentiere meine Nummer 7 – **Runtipi**. Ich mag das Hosten von Containern, aber oftmals nerven sie mich. Ganz vorne dabei ist *Docker*, das die ganze Welt als *super mega einfach* verkauft, am Ende dann doch aber einiges an Konfigurationsarbeit verlangt. Und genau hier kommt **Runtipi** ins Spiel, denn es nimmt mir sehr viel Gefummel in den Konfigurationsdateien ab. Apps lassen sich genauso leicht installieren, aktualisieren und nutzen, wie man es von anderen App Stores kennt. Anklicken, installieren, nutzen. 

Habe ich **Runtipi** anfangs genutzt, um Apps „mal kurz“ auszuprobieren, hat es sich bei mir zu einer Dauerlösung entwickelt. So nutze ich es, um zum Beispiel **Immich** oder **Heimdall** zu hosten. Habe ich einmal Lust, etwas Neues auszuprobieren, schaue ich mich im integrierten App Store um. So macht mir dann auch *Docker* wieder Spaß.

![Runtipi](/assets/img/selfhosting-hitlist/runtipi.jpg){: w="600"}
_Der Runtipi App Store ist eine echte Fundgrube an tollen Apps (Screenshot: Markus Daams / 2025)_

## 5. Vaultwarden

Die große Monetarisierungswelle hat vor nichts Halt gemacht, auch nicht vor den Passwortmanagern dieser Welt. Auch der Anbieter meines Managers hatte sich irgendwann dazu entschieden, dass meine recht üpige Einmalzahlung nicht mehr gereicht hat und kurzerhand ein Abo Modell eingeführt. Neue Features gab es ab dann nicht mehr für mich. Aber die open source Community wäre nicht, was sie ist, wenn sie nicht auch dafür eine Lösung entwickelt hätte. 

Eines dieser Projekte ist **Vaultwarden**. Es handelt sich hierbei um eine alternative Implementierung von **Bitwarden** und ist daher auch kompatibel mit den entsprechenden Apps. Geschrieben in Rust bringt es einen großen Performanceschub im Vergleich zum Vorbild mit. **Vaultwarden** dient bei mir als Speicher für meine Passwörter und inzwischen auch Passkeys. Ich kann es plattformübergreifend auf sämtlichen Geräten nutzen. Ein Überraschungsabo bleibt mir so ebenfalls erspart.

![Vaultwarden](/assets/img/selfhosting-hitlist/vaultwarden.jpg){: w="600"}
_Vaultwarden ist ein sehr mächtiger Passwortmanager zum selbst hosten (Screenshot: Markus Daams / 2025)_

## 4. Jellyfin

**Jellyfin** ist ein Medienserver. Klingt erst einmal unspektakulär, kann es aber in sich haben. Wer zum Beispiel **Kodi** oder **Plex** kennt, kennt auch das Prinzip dahinter. Mit solch einem Server lassen sich die eigenen Medien wie Filme, Musik, Serien, Hörbücher usw. im Netzwerk hosten. Dann können Geräte wie PCs, Fernseher, Smartphones und Co diese abspielen. 

Genau dies macht auch **Jellyfin**. Wieder ist es ein kostenloses open source Projekt mit einer sehr aktiven Community. Es lässt sich sehr frei anpassen und um viele Plug-Ins und Themse erweitern. Ob man sich seinen eigenen Netflix oder Spotify Klon bauen möchte, Hörbücher oder Home Videos hosten möchte, das alles ist damit möglich. Neue Updates kommen nahezu regelmäßig und die Entwicklung hat zuletzt ordentlich Fahrt aufgenommen. Wer selbst hostet, sollte es sich unbedingt einmal anschauen.
 
![Jellyfin](/assets/img/selfhosting-hitlist/jellyfin.jpg){: w="600"}
_Jellyfin ist eine mächtige Medienverwaltung zum selbst hosten (Screenshot: Markus Daams / 2025)_

## 3. Nextcloud

Wir kommen nun zu den Kandidaten auf den Treppchen. Bei **Nextcloud** war ich mir aber nicht sicher, ob der Platz verdient ist. Aber der Reihe nach. Wer selbst hostet, sucht sicher auch irgendwann einmal nach einer Cloud Lösung, um Dateien geräteübergreifend zu teilen und zu bearbeiten. Google, Microsoft und Co sind hier im Internet die absoluten Platzhirsche. Für den Heimgebrauch hat sich **Nextcloud** dazu gemausert – irgendwie – denn es ist eine sehr mächtige Lösung und richtet sich vornehmlich an kleine und mittlere Unternehmen. Und bestimmt auch sehr große. Für Privatanwender ist es, als würde man mit einem Artilleriesturm auf Spatzen schießen. Aber es funktioniert eben. Die Integration in verschiedene Betriebssysteme ist richtig gut gelungen. Vom Handling her gibt es für mich keinen Unterschied zu den kommerziellen Anbietern. Zudem lässt sich **Nextcloud** um wirklich viele Funktionen erweitern, bis hin zur vollständigen Groupware Lösung. 

Es ist sehr mächtig, aber auch schwierig zu administrieren. Das war auch der Punkt, der mich ins Treppchen-Grübeln brachte. Ich habe viel Zeit darauf verwenden müssen, **Nextcloud** fehlerfrei zum Laufen zu kriegen. Hier würde ich mir eine abgespeckte Version für ganz kleine Privatleute wünschen.

Dennoch ist es derzeit für mich nicht zu ersetzen. Mit  **Nextcloud** habe ich meine eigenen Cloud, ganz ohne Abokosten und AI Gelöt.

![Nextcloud](/assets/img/selfhosting-hitlist/nextcloud.jpg){: w="600"}
_Heute ist ein guter Tag, denn ich habe keine Fehler oder Warnungen :) (Screenshot: Markus Daams / 2025)_

## 2. Home Assistant

Kommen wir zum zweiten Platz, **Home Assistant**. Auf den Smarthome Zug bin ich aufgesprungen, als er gerade losfuhr. Ich habe begeistert mit *Philips Hue* angefangen. Plötzlich konnte ich meine Lampen im Haus alle fernsteuern und mein Wohnzimmer mit einem Sprachbefehl an *Alexa* in heimeliges Puffrot tauchen. Das wurde mir irgendwann zu teuer und so bin ich kurz auf Osram und dann schnell auf *Ikea Tradfri* umgestiegen. Diese Geräte nutze ich heute noch. Aber auch Ikea hat mich spüren lassen, dass ich mich in einem Vendorlock befinde und irgendwann war meine Bridge spontan veraltet. Ich wollte nur noch ein einziges Mal wechseln und entschied mich auch hier für die Lösung zum selbst hosten.

Der **Home Assistant** ist eine open source Lösung für die Hausautomation. Ich kann also nicht nur meine Lampen steuern, ich kann auch meinen Staubsauger herumkommandieren, Events mit dem Bewegungsmelder abfangen und eigentlich alles steuern, was auch nur einen Hauch smart ist. Eine große und aktive Community kümmert sich nicht nur um die Weiterentwicklung, sondern auch um viel, sehr viele Erweiterungen. **Home Assistant** kann mir inzwischen sogar sagen, wann der Bus bei mir fährt und spielt nebenher noch meine Musik ab. Zudem ist alles sehr frei anpassbar. Wer genügend Zeit und Muße mitbringt, kann Dashboards bauen, die irgendwann vielleicht als Kunstwerk gelten, wer weiß.

Eine so wichtige App verdient eine Medaille. 

![Home Assistant](/assets/img/selfhosting-hitlist/homeassistant.jpg){: w="600"}
_Alles unter Kontrolle im Smart Home. Yeah. (Screenshot: Markus Daams / 2025)_

## 1. Immich

Die Goldmedaille verdient bei mir **Immich**. Das mag etwas verwundern, da Cloud, Ad-Blocker und Heimautomation für viele sicher wichtiger sind, als eine Fotoanwendung. Ich bin aber so begeistert davon, dass es Gold geben muss. Und ich habe anfangs ja auch auf mein Bauchgefühl hingewiesen :)

Als ich mich dazu entschieden habe, möglichst alle kommerziellen Cloudservices aufzugeben, war der größte Elefant im Raum *Google Fotos*. Ich hatte dort Fotos aus über 10 Jahren intensiven Knipsens gelagert und mich sehr an die vielen tollen Funktionen gewöhnt. Ich ging nicht davon aus, dass ich etwas finden würde, dass dem auch nur im Ansatz gleich kam und man, lag ich daneben. Ich stieß bei meiner Recherche auf **Immich** und war sofort begeistert. 

Ich wünschte mir eine schicke Timeline, Alben, möglichst eine interaktive Karte mit den Photospots und noch einiges mehr. Meinen Werdegang beschreibe ich in [diesem Artikel](https://markus-daams.com/posts/immich-fotos-und-videos-selbst-hosten/). Ich bekam mit **Immich** all das und noch mehr. Inzwischen habe ich alle meine Fotos, ob von den vielen Smartphones in meinem Leben, oder von den großen Kameras, alle an einem Ort. Und egal wie viele Fotos es auch sind, die Anwendung ist responsiv und funktioniert plattformübergreifend schnell und zuverlässig.

**Immich** ist eine dieser Apps, die nur eine begeisterte open source Community hervorbringen kann. 

![Immich](/assets/img/immich/immich-fotostream.jpg){: w="600"}
_Sooo streamig, der Immich Foto Steam (Screenshot: Markus Daams / 2025)_

## Fazit

Es ist nun kein Geheimnis mehr, aber ich hoste gerne selbst. Es fühlt sich jeden Tag ein klein wenig besser an, nicht mehr auf die Gnade eines großen Konzerns angewiesen zu sein. Für eine Zeit lang hat es für mich sehr gut funktioniert, für Dienste und Apps Geld zu bezahlen. Ob Windows, Spotify, Netflix und so weiter, ich habe sie alle gerne genutzt und sie haben mein Leben echt bereichert. Aber irgendwie hat sich die gesamte Industrie in eine sehr merkwürdige Richtung entwickelt. Ich fühlte mich nicht mehr als Kunde, sondern nur noch als Daten- und Geldquelle. 

Meckern ist jedoch immer einfach. Daher habe ich mein IT-Wissen zusammen gefegt und mich an Lösungen gesetzt. Die habe ich gefunden. Und was für Lösungen das sind! Klar, all das kostet dennoch Geld, viel Zeit und noch mehr Mühe. Läuft dann aber alles, lehnt man sich zurück, freut sich, etwas gelernt zu haben und lächelt die nächste Preiserhöhung von Unternehmen X einfach weg.

Die Liste ist nicht vollständig und ich bin mir sicher, mit der Zeit wird sie sich auch ändern. Die open source Community ist so lebendig und aktiv wie lange nicht mehr. Ich bin gespannt, was da noch auf uns zu kommt.


## Ressourcen

* [Website von Paperless NGX](https://docs.paperless-ngx.com/)
* [Website von Heimdall Dashboard](https://heimdall.site/)
* [Website von Pi-hole](https://pi-hole.net/)
* [Website von Proxmox](https://proxmox.com/)
* [Website von Runtipi](https://runtipi.io/)
* [Github Seite von Vaultwarden](https://github.com/dani-garcia/vaultwarden)
* [Website von Jellyfin](https://jellyfin.org/)
* [Website von Nextcloud](https://nextcloud.com/)
* [Website von Home Assistant](https://home-assistant.io/)
* [Website von Immich](https://immich.app/)
