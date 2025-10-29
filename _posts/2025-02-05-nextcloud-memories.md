---
layout: post
title: "Nextcloud - Memories"
date: 2025-02-05 08:27:31 +0100
category: selfhosting
author: 
tags: [selfhosting, fotografie, nextcloud, runtipi]
description: "Mit Nextcloud lassen sich Fotos und Videos selbst hosten. In diesem Artikel möchte ich die Nextcloud Memories App kurz vorstellen."
image:
  path: /assets/img/post-header/header-memories.jpg
  alt: Nextcloud Memories - Fotos und Videos selbst hosten.
---

# Nextcloud Memories 

In der letzten Woche habe ich in [diesem Artikel](https://markus-daams.com/posts/immich-fotos-und-videos-selbst-hosten/) „Immich“ vorgestellt, welches ich aktuell nutze, um meine Fotos und Videos selbst zu hosten. 

Bei meiner Suche nach einer passenden Lösung bin ich zuvor jedoch auf eine Nextcloud-App gestoßen, mit welcher sich ähnliche Ergebnisse erzielen lassen.

Meine steile These ist, dass jeder, der sich mit dem Thema Self Hosting beschäftigt hat, früher oder später auf Nextcloud gestoßen ist. Es ist eine gute Alternative für alle, die sich von den großen Anbietern wie Microsoft (One Drive), Google (Google Drive) usw. lösen wollen. 

Praktisch an Nextcloud ist, dass es sich um viele weitere Apps ergänzen lässt. Eine dieser Apps möchte in diesem Artikel kurz vorstellen. 

> Kurz vorweg: Die App heißt oft auch 'Erinnerungen'. Ich verwende in diesem Artikel den gebräuchlicheren Namen Memories.
{: .prompt-info}

## Voraussetzungen und Installation

Damit sich **Memories** nutzen lässt, muss Nextcloud installiert und für die Fotos und Videos muss genügend Speicherplatz vorhanden sein. Ist all das gegeben, lässt sich Memories sehr einfach über die Weboberfläche von Nextcloud installieren. Hierzu im App Store nach **Memories** oder **Erinnerungen** suchen. 

Ist dies erledigt, ist Handarbeit angesagt. Die Macher der Apps empfehlen für die erste Konfiguration einige Schritte, die sich unter diesem Link finden lassen:

-> [Memories: Empfohlene Erstkonfiguration](https://memories.gallery/config/)

Einmal installiert und konfiguriert, kann es auch schon los gehen. Als erstes sollte man den Pfad angeben, unter dem die Fotos zu finden sind. Das macht man in den *Einstellungen* der App.

![Nextcloud Einstellungen](/assets/img/nextcloud-memories/memories-einstellungen.jpg)
_Es lassen sich mehrere Pfade hinzufügen._

Ich habe einen eigenen Ordner für meine Fotos und Videos angelegt. Dieser kann dann auch zum automatischen Hochladen (z.B. vom Smartphone) verwendet werden.

> **Tipp:** möchtest du einen bestimmten Unterordner von der Indizierung ausschließen, erstelle in diesem Ordner eine leere Datei mit dem Namen '.nomedia' (mit Punkt!). Nextcloud ignoriert dann alle Dateien in diesem Ordner.
{: .prompt-tip}


## Alles fertig. Und wie sieht Memories nun aus?

Das Design von **Memories** lehnt sich stark an das der Platzhirsche Microsoft und Google an. Das heißt, man hat als Startseite einen Foto-Stream mit Zeitleiste. So weit, so unspektakulär. 

![Memories: Übersicht](/assets/img/nextcloud-memories/memories-uebersicht.jpg)
_Ein Zeitstrahl, wie man ihn von anderen Diensten kennt._

Wurden die Vorschaubilder (Thumbnails) einmal generiert, lässt es sich bequem durch den Zeitstrahl scrollen. Das fühlt sich auch fluffig und schnell an. 

In der Detailansicht werden die Metadaten des Fotos angezeigt und auch der Ort auf einer eingebetteten Karte, wenn das Foto die entsprechenden Informationen mitliefert.

![Memories: Detailansicht eines Fotos](/assets/img/nextcloud-memories/memories-foto-details.jpg)
_In der Detailansicht finden sich die Metainformationen des Fotos und eine Karte._

## Was kann Memories noch?

Die Entwicklung von **Memories** ging sehr zügig von statten, denn mit der in Nextcloud integrierten Fotoverwaltung war kaum jemand zufrieden. Daher wurde **Memories** recht schnell um viele nützliche Funktionen erweitert. 

### Memories Rewind

Na klar, die Rewind Funktion darf nicht fehlen. Was war heute vor 6 Jahren so los? Der Rewind Banner zeigt mir die entsprechenden Fotos.

![Memories Rewind Funktion](/assets/img/nextcloud-memories/memories-rewind.jpg)
_Im Rewind finden sich Fotos vom aktuellen Kalendertag der vergangen Jahre._

### „An diesem Tag“

Was ich bei **Memories** wirklich gelungen finde ist, dass es den Rewind als dynamisch erstelltes Album in der Navigation gibt. So werden alle Fotos, die um einem bestimmten Kalendertag herum gemacht wurden, also zum Beispiel der 4. Februar, als Zeitstrahl dargestellt. Allerdings ist in dieser Ansicht nur etwas los, wenn man auch entsprechend viel fotografiert. Zum Schwelgen in der Vergangenheit ist dies echt toll.

![Memories: Rewind als Zeitstrahl ](/assets/img/nextcloud-memories/memories-an-diesem-tag.jpg)
_Eine meiner Lieblingsfunktionen: Der Rewind als dynamisch generierter Zeitstrahl._

### Die Karten Funktion

Natürlich darf auch eine dynamische Karte nicht fehlen. Diese setzt auf OpenStreetMap auf. Die Miniaturansichten werden, je nach Zoomstufe, gruppiert. Was ich toll gelöst und sogar besser umgesetzt als bei **Immich** finde: Der Zeitstrahl auf der rechten Seite wird dynamisch zur Zoom Stufe erstellt. 

![Memories: Gruppierte Fotos in der Kartenansicht](/assets/img/nextcloud-memories/memories-karte-gruppierte-fotos.jpg)
_In der rechten Spalte werden die sichtbaren Fotos der aktuellen Zoomstufe in einem dynamischen Zeitsrahl gruppiert._

### Fotos bearbeiten

Auch praktisch: Fotos lassen sich in der Editierfunktion direkt bearbeiten. Man kann die Größe der Fotos ändern, Filter hinzufügen, eine Feinabstimmung (z.B. Sättigung, HSL usw.) vornehmem und die Änderung dann als neues Foto speichern. 

![Memories: Fotos bearbeiten](/assets/img/nextcloud-memories/memories-fotos-bearbeiten.jpg)
_Hier lässt sich die Größe ändern, aber auch Filter hinzufügen oder die Feinabstimmung vornehmen._

### Und viel mehr

**Memories** bringt weitere nützliche Funktionen mit, die man wohl inzwischen wohl erwartet. Darunter wären:

* Eine Like-Funktion um Favoriten zu markieren
* Es können Alben angelegt werden
* Eine Ordern Übersicht. Praktisch, wenn man mehrere Ordner hinzufügt
* Fotos Teilen

### AI  / KI, gebe mir die Buzzwords!

**Memories** selbst bringt keine Gesichts- und Objekterkennung mit, wie es zum Beispiel **Immich** „ab Werk“ tut. Dennoch lassen sich diese Funktionen nachrüsten und dies sogar relativ einfach. Dazu sucht man im App Store von Nextcloud nach den Apps **recognize** und **facerecognize**. Man muss nicht zwingend beide Apps installieren. 

Nach der Installation beginnt dann auch das Training, das je nach Anzahl der Fotos viel, sehr viel Zeit in Anspruch nehmen kann.

> Das Training erfolgt lokal. Es werden zu keiner Zeit Daten ins Internet gesendet. Kostet dafür aber natürlich Rechenkraft.
{: .prompt-info}


Ist das Training fertig, lassen sich die Fotos nach erkannten Objekten und Gesichtern durchsuchen. 

## Und nun die „Abers ...„

Ich nutze weder **recognize** noch **facerecognize**. Die Objekterkennung lag zu oft daneben. Ob dies inzwischen besser geworden ist, vermag ich nicht zu sagen. Na klar, es ist ein lokales Training mit der bescheidenen Power meines Heimservers. Daher will ich das auch nicht als Meckern verstanden wissen.

**Memories** ist toll. Die Entwicklung wird mit Herzblut voran getrieben. Dennoch nutze ich primär **Immich**. Das liegt aber vielmehr an Nextcloud. 

Nextcloud ist mächtig, aber inzwischen etwas zu mächtig. Die Administration ist sehr aufwendig und teilweise weit weg von komfortabel. Das verdient wohl einen eigenen Artikel.

**Memories** funktioniert gut, wenn man sich bei der Konfiguration von Nextcloud Mühe gegeben hat. **Immmich** hat für mich einen höheren *Schwubdizitätsfaktor*, da es sich auch um eine dedizierte Lösung handelt. Und dies merke ich bei der täglichen Benutzung. **Immich** fühlt sich zusammen mit der Android App mehr 'aus einem Guss' an. Das liegt natürlich auch daran, dass die Entwickler kein Backend wie Nextcloud berücksichtigen müssen. **Memories** ist eben nur eine Erweiterung für Nextcloud. 

Was ich hier beschreibe, probiert man am besten einfach selbst aus. Sowohl Nextcloud als auch Immich lassen sich einfach mit [Runtipi](https://markus-daams.com/posts/runtipi-selfhosting-einfach-gemacht/) installieren und ausprobieren.

## Für wen lohnt sich Memories denn nun?

**Memories** lohnt sich für alle, die eine Nextcloud Instanz haben und diese um eine gut funktionierende Foto- und Video Anwendung zum selbst hosten erweitern wollen. Denn das macht **Memories** echt toll. Die Perfomance ist auch bei vielen Fotos und Videos gut, die Weboberfläche reagiert schnell. 

Man darf aber auch nicht davor zurück schrecken, Hand anzulegen (*‚Run php occ memories:index to generate metadata indices for existing photos.‘*). 

Läuft aber alles, dann läuft es. Für **iOS** und **Android** stehen Apps in den entsprechenden Stores bereit, die jedoch nur die Webansicht mobil gerecht rendern, aber immerhin.  

## Fazit

Ich nutze meine Nextcloud Instanz auch als Backup für meine Handy Fotos. Da hat es sich für mich angeboten, auch **Memories** zu installieren. Die Konfiguration hatte mich etwas Mühe gekostet (*weint leise in PHP Migration*), aber nun läuft es. Wer dies nicht scheut und keine separate Lösung wie zum Beispiel **Immich** wünscht, sollte **Memories** unbedingt einmal ausprobieren. 

Ich jedenfalls werde die Entwicklung der App weiterhin verfolgen. Ich bin sehr dankbar und froh darüber, dass die Communities dieser Welt so viel Mühe und Arbeit in die Entwicklung solcher Lösungen steckt. 

## Ressourcen

* [Die Übersichtsseite von Memories im Nextcloud Store](https://apps.nextcloud.com/apps/memories)

* [Eine Online Demo der App](https://demo.memories.gallery/apps/memories/)

* [Das Github Repo von Memories](https://github.com/pulsejet/memories)

* [Im Nextcloud Forum finden sich hilfreiche Tipps zu Memories. Natürlich kann man hier auch um Hilfe bitten](https://help.nextcloud.com/)