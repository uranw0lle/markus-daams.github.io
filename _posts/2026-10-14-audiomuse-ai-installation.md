---
layout: post
title: "AudioMuse-AI - Installation"
date: 2026-10-14 07:06:39 +0200
category: [coding, selfhosting, musik]
author: 
tags: [coding, selfhosting, docker, linux, ai]
description: "Gamechanger oder Hype? AudioMuse ist ein echter Geheimtipp und so habe ich es installiert."
image:
  path: /assets/img/post-header/audiomuse-installation.jpg
  alt: AudioMuse-AI 
---

# Einleitung

In meinem Artikel [Linux, Dinge, Tipps, Tricks](https://markus-daams.com/posts/linux-dinge-tipps-tricks/) hatte ich **AudioMuse-AI** bereits kurz vorgestellt. Zwischenzeitlich ist ordentlich Wasser die Elbe heruntergeflossen und ich hatte Zeit, mich mit AudioMuse vertraut zu machen. Meine Begeisterung ist nach wie vor ungebrochen. Daher ist es an der Zeit, dem Thema nicht nur einen, sondern zwei Artikel zu widmen. 

In diesem ersten Artikel geht es um die Installation von AudioMuse. Hier gehe ich darauf ein, wie ich es installiert und eingerichtet habe. Die Vorgehensweise lässt sich recht einfach auf andere Konfigurationen ändern, denn das Prinzip ist immer gleich oder sehr ähnlich. Im zweiten Artikel will ich dann erklären, warum AudioMuse ein Gamechanger für mich und viele andere Audiophile ist, wenn es ums Musikhören geht.  

## Was ist AudioMuse-AI

AudioMuse-AI ist eine Open-Source-Anwendung, welche die eigene Musiksammlung mittels künstlicher Intelligenz analysiert und verwaltet. Klingt sehr trocken und nüchtern, hat es aber in sich. Denn auf Basis der gewonnenen Daten lassen sich passgenaue Playlists erstellen, die zu einer bestimmten Stimmung, einer bestimmten Aktivität oder sogar zu einer bestimmten Tageszeit passen. Auf diese Weise lassen sich zudem musikalische Schätze der eigenen Bibliothek wiederentdecken. 

AudioMuse-AI lässt sich vollständig lokal betreiben. Für die eigentliche Musikanalyse und die Erstellung von Playlists ist kein externer Cloud-Dienst erforderlich. Die Internetverbindung wird folglich nur für den Download der Anwendung benötigt.

Der eigentliche Clou ist aber, dass AudioMuse nicht einfach nur die Metadaten (sprich die Daten aus den MP3-Tags) ausliest. Stattdessen analysiert es den Text, das Tempo, den Beat und die Energie jeder einzelnen Musikdatei und nimmt anhand dessen eine Klassifizierung vor. Überspitzt gesagt, hört es sich jeden einzelnen Track an und bewertet diesen.

Damit lassen sich dann sehr genaue Playlists und Alben erstellen, die sich nach Stimmungen und Themen richten können. Solche Listen lassen sich per Prompt erstellen, wie zum Beispiel: *Eine traurige Playlist, die zu Regenwetter passt* oder *Energiegeladene Synth-Pop-Playlist für den Sport*. Songs lassen sich anhand ihres Beats gruppieren, es lassen sich ähnliche Lieder finden und sogar ein Songpfad anlegen, zum Beispiel 20 Lieder von traurig nach fröhlich. Dazu lassen sich vergessene Songs wiederentdecken und noch viel mehr. Die Möglichkeiten sind nahezu grenzenlos.

Kurzum: Mit AudioMuse-AI lässt sich die eigene Musiksammlung völlig neu hören und erleben.

## Voraussetzungen

Um AudioMuse-AI optimal nutzen zu können, braucht es:

1. Eine (idealerweise) große lokale Musiksammlung
2. Ein Server mit entsprechender Hardware
3. Einen konfigurierten Musik-Server

Das klingt erst einmal nicht weiter aufwendig. Dennoch führe ich die Punkte einmal etwas aus. 

Ich beginne mit dem dicksten Brocken, denn an diesem scheiden sich meiner Beobachtung nach die Geister in den Diskussionsforen dieser Welt:

* Man benötigt eine eigene und recht große Musikbibliothek, die sich zu analysieren und durchforsten lohnt. Eine ideale Größe lässt sich jedoch nicht festlegen. Meine eigene Sammlung ist derzeit 22.000 Lieder groß. Das allein ist noch kein Garant für eine zufriedenstellende Nutzung. Es braucht auch eine entsprechende Tiefe. Was meine ich damit? Wer fast nur fröhlichen Pop hört, wird keine guten Ergebnisse erzielen, wenn traurige Playlists benötigt werden. Die Sammlung sollte folglich ein breites Themenspektrum abdecken.

Dazu braucht es dann noch:

* Einen laufenden Musikserver. Hier funktionieren aktuell Navidrome, Jellyfin, LMS, Lyrion, Emby und Plex. AudioMuse bringt keine eigene Sound Engine mit. Der Server sollte also bereits eingerichtet sein und laufen. Am besten wird dieser auch schon einige Zeit genutzt, da die Hörgewohnheiten in die Analyse mit einfließen. Da ich Navidrome nutze, beschreibe ich die Installation auch anhand dessen. 

* Erfahrung bei der Nutzung von Docker oder anderen Containerverwaltungen. In dieser Anleitung erkläre ich das Vorgehen per Docker Compose. Docker sollte installiert sein und funktionieren. Es gibt auch die Möglichkeit der nativen Installation, direkt auf dem Host. Proxmox-User finden bei Interesse [ein Community-Script für einen vorkonfigurierten LXC](https://community-scripts.org/scripts/audiomuse-ai).

* Viel Zeit, wenn die Hardware nicht die Neueste ist.

Die reinen Hardware-Anforderungen sind übrigens recht zahm. Der Auszug von GitHub:

* CPU: 4-core Intel with AVX2 support (usually produced in 2015 or later) or ARM
* RAM: 8 GB RAM
* DISK: NVME SSD storage

Für alles gilt, je mehr, desto besser. Ich habe es auf einem Intel 4-Kerner (Intel i5-6500) mit 16 GB RAM laufen und es läuft gut. 

## Docker Compose

AudioMuse besteht aus drei Komponenten:

1. audiomuse-ai Kernanwendung
2. ai worker (macht AI-Dinge)
3. Datenbank 

Wer sich, wie ich, für die Installation per Container entscheidet, kann auf Wunsch weitere "worker" hinzufügen, um die Analyse zu beschleunigen. Bei nur einer Maschine lohnt sich das aber nicht. Wer das versuchen will, legt für die worker am Besten separate Container an. Diese müssen alle nur auf dieselbe Datenbank zugreifen. Wie so etwas aussehen kann, findet man unter [diesem Link auf GitHub](https://github.com/NeptuneHub/AudioMuse-AI/tree/main/deployment/test).

Ich halte es einfach und installiere die drei Komponenten. Mein Compose-File sieht so aus:

```yaml
services:

  postgres:
    image: postgres:15-alpine
    container_name: audiomuse-postgres
    environment:
      TZ: Europe/Berlin
      POSTGRES_USER: audiomuse
      #Das Passwort ist frei wählbar
      POSTGRES_PASSWORD: EIN-PASSWORT-FÜR-DIE-DATENBANK
      POSTGRES_DB: audiomusedb
    volumes:
      - audiomuse-postgres:/var/lib/postgresql/data
    restart: unless-stopped

  audiomuse-ai:
    image: ghcr.io/neptunehub/audiomuse-ai:latest
    container_name: audiomuse-ai
    environment:
      SERVICE_TYPE: flask
      TZ: Europe/Berlin

      POSTGRES_USER: audiomuse
      POSTGRES_PASSWORD: EIN-PASSWORT-FÜR-DIE-DATENBANK
      POSTGRES_DB: audiomusedb
      POSTGRES_HOST: postgres
      POSTGRES_PORT: "5432"

      TEMP_DIR: /app/temp_audio

    ports:
      - "8008:8000"

    volumes:
      # Die Musikbibliothek als 'read-only' eingebunden
      - /mnt/music:/music:ro

      # Temporäre Audio-Dateien
      - audiomuse-temp-flask:/app/temp_audio

      # AudioMuse-Plugin-Cache
      - audiomuse-plugins-flask:/app/plugin/installed

    depends_on:
      - postgres

    restart: unless-stopped

  audiomuse-worker:
    image: ghcr.io/neptunehub/audiomuse-ai:latest
    container_name: audiomuse-worker
    environment:
      SERVICE_TYPE: worker
      TZ: Europe/Berlin

      POSTGRES_USER: audiomuse
      POSTGRES_PASSWORD: EIN-PASSWORT-FÜR-DIE-DATENBANK
      POSTGRES_DB: audiomusedb
      POSTGRES_HOST: postgres
      POSTGRES_PORT: "5432"

      TEMP_DIR: /app/temp_audio

    volumes:
        #Pfad zur Musikbibliothek. Ich habe sie unter /mnt/music gemountet
      - /mnt/music:/music:ro
      - audiomuse-temp-worker:/app/temp_audio
      - audiomuse-plugins-worker:/app/plugin/installed

    depends_on:
      - postgres

    restart: unless-stopped

volumes:
  audiomuse-postgres:
  audiomuse-temp-flask:
  audiomuse-temp-worker:
  audiomuse-plugins-flask:
  audiomuse-plugins-worker:
```
{: file="Compose.yaml" }


Das ist es dann auch. Nachdem das Deployment der drei Container abgeschlossen ist, geht es auf der Weboberfläche von AudioMuse weiter.

## Musik Server verbinden

Ich benutze Navidrome als Server. Nach der Anmeldung / Registrierung kann ein Musik-Server hinzugefügt werden. In meinem Fall sieht das in etwa so aus:

![AudioMuse - Server hinzufügen](/assets/img/audiomuse/audiomuse-add-server.jpg)
_Der Server wird hier per Username und Passwort hinzugefügt (Screenshot: Markus Daams / 2026)_

Es können mehrere Server hinzugefügt werden. Doppelte Lieder werden bei der Analyse automatisch erkannt und dann jeweils nur eines davon in die Datenbank aufgenommen.

### Das Plugin

Ist das erledigt, kann man im Prinzip die erste Analyse starten. Ich habe zuvor aber noch fix das entsprechende AudioMuse-Plugin für die Kommunikation zwischen Navidrome und AudioMuse installiert. Mit diesem können Clients über Navidrome mit AudioMuse kommunizieren. Das erfolgt dann über die Subsonic API. Wähle ich in der Weboberfläche von Navidrome oder in meinem Client "Ähnliche Musik" aus, so wird dieser Request an AudioMuse weitergeleitet. Das Ergebnis ist dann eine personalisierte Playlist von AudioMuse und nicht vom jeweiligen Musik-Server.

Damit das alles klappt, passe ich mein bestehendes Compose-File von Navidrome an und ergänze diese Zeilen im Abschnitt *environment*. 

```yaml
    environment:
      ...
      - ND_PLUGINS_ENABLED=true
      - ND_PLUGINS_AUTORELOAD=true
      - ND_AGENTS=audiomuseai,lastfm,deezer
```

Die Dokumentation der Navidrome Konfigurationsptionen und wie man diese setzt findet sich [unter diesem Link](https://www.navidrome.org/docs/usage/configuration/options/). 

Danach installiere ich das Plugin. Der Download findet sich in [diesem Repository](https://github.com/NeptuneHub/AudioMuse-AI-NV-plugin/releases). Aktuell ist Version 10 aktuell und ggf. muss der Download Link angepasst werden.

```shell
wget https://github.com/NeptuneHub/AudioMuse-AI-NV-plugin/releases/download/v10/audiomuseai.ndp

mkdir -p ./data/plugins #falls es noch nicht existiert

cp audiomuseai.ndp ./data/plugins/
```
Danach muss Navidrome neu gestartet werden und danach geht es in der Weboberfläche weiter. Ein Klick links oben auf das Profil-Icon und dann auf **Plugins**. Dieses muss per Schieberegler aktiviert werden und dann kann es konfiguriert werden.

![AudioMuse-Plugin in Navidrome](/assets/img/audiomuse/navidrome-adiomuse-plugin.jpg)
_Das Plugin kann nun in der Weboberfläche konfiguriert werden (Screenshot: Markus Daams / 2026)_

Ich habe die Authentifizierung per API-Token aktiv. Das ist kein Muss und kann weggelassen werden, wenn eh alles lokal läuft. Der Vollständigkeit halber erkläre ich es aber dennoch. 

Im Terminal generiere ich mir einen passenden Token und kopiere diesen in die Zwischenablage.

```shell
openssl rand -hex 32
```

Dieses API-Token hinterlege ich einmal in der Plugin-Konfiguration in Navidrome und in AudioMuse unter **Administration** -> **Authentication** -> *API-Token*.

![API-Token in AudioMuse hinterlegen](/assets/img/audiomuse/audiomuse-authentication.jpg)
_API-Token in AudioMuse hinterlegen (Screenshot: Markus Daams / 2026)_

Ist das Token in AudioMuse und Navidrome hinterlegt, ist eine bidirektionale Kommunikation möglich:

* AudioMuse kann Playlists generieren und auf dem Navidrome Server ablegen
* Navidrome und Clients (die es unterstützen) können per API-Requests Playlists anfordern -> Darum kümmert sich das Plugin

Ist alles eingerichtet und läuft, geht es mit dem *Wait Game* weiter.

## Analyse

Wenn alles bereit ist, kann auf der Weboberfläche von AudioMuse unter dem Menüpunkt **Analysis and Clustering** die Analyse gestartet werden (einfach auf den Button klicken). 

Wie bereits erwähnt, kann diese erste Analyse dauern. Richtig lange dauern. Hierfür habe ich dem Container allen verfügbaren RAM zur Verfügung gestellt und alle Kerne freigeschaltet. Meine ca. 22.000 Songs haben eine knappe Woche gebraucht, um analysiert zu werden. AudioMuse schnappt sich jedes einzelne File und analysiert die Lyrics, den Beat, das Tempo usw. Dieser Vorgang braucht entsprechend viel Zeit. Wie lange die erste Analyse dauert, ist jedoch von der größer der Bibliothek und der Hardware abhängig. 

Jede weitere Analyse geht anschließend schneller vonstatten. Hierfür kann man einen Cronjob aktivieren. Dieser startet bei mir jeden Sonntag eine Suche nach neuen Liedern und analysiert diese. Da nur neue Lieder analysiert werden, geht das entsprechend fix.

Nachdem die erste Analyse durchgelaufen ist, klickt man noch einmal auf **Start Clustering**. Dies geht sehr viel schneller und hat bei mir eine knappe Stunde gedauert. Mittels Clustering werden die Songs nach Ähnlichkeit gruppiert. Anschließend kann man sich seine ersten personalisierten Playlists erstellen lassen. Diese werden direkt auf den Navidrome Server geschrieben und lassen sich dort abspielen.

Wer einen ersten Blick auf seinen Musikgeschmack werfen will, sollte im Menü einmal auf **Music Map** klicken. Hier werden die einzelnen Musikstücke in ihren Clustern angezeigt.

![AudioMuse Music Map](/assets/img/audiomuse/music-plot.jpg)
_Die Music Map visualisiert das Analyseergebnis. Jeder Punkt ist ein Track. (Screenshot: Markus Daams / 2026)_

## So viele Möglichkeiten

Im Menü gibt es nun eine reichliche Auswahl, sich Playlisten erstellen zu lassen. Ich versuche einmal diese kurz zusammenzufassen:

1. **Instant Playlist**
Hier beschreibt man eine Playlist, die man haben möchte, etwa *Eine traurige Playlist für den Herbst* oder *Eine energiegeladene Playlist für den Sport*.

2. **Playlist from Similar Song**
Man wählt einen Song und kann sich ähnliche Songs anzeigen lassen (und eine Playlist generieren). Es werden die Analyseergebnisse genutzt und nicht die Tags.

3. **Artist Similarity**
Welche Band klingt so ähnlich wie ... ? 

4. **Album Creation**
AudioMuse erstellt ein Album. Hier wird ausgehend von der Auswahl versucht, ein rundes Album zu erstellen. Also mit einem Opener, guten Tracks dazwischen und einem passenden Abschluss. Ganz so, wie man früher Alben noch gemacht hat.

5. **Song Path**
Man gibt einen Startsong und einen Zielsong vor. AudioMuse sucht dazwischen passende Titel, sodass eine musikalische Reise entsteht, bei der sich der Klang schrittweise vom ersten zum letzten Song entwickelt.

6. **Song Alchemy**
Hier kann man einen sehr granularen Klangmix zusammenstellen: Man fügt Songs, Künstler, Stimmungen oder Playlists hinzu und markiert sie wahlweise als erwünscht oder unerwünscht. AudioMuse sucht anschließend Titel, die möglichst gut zu dieser Kombination passen.

7. **Text Search (DCLAP)**
Du kennst den Songtitel nicht mehr, aber weißt, wie er klingt? Hier kann man eine Beschreibung einfügen und suchen. Als Beispiel kann ich hier nach: „schnellem Rock mit weiblichem Gesang und markanten Gitarren“ suchen – AudioMuse vergleicht die Beschreibung mit den analysierten Audioeigenschaften der Bibliothek.

8. **Lyrics Search**
Hier kann nach dem Text gesucht werden. Das erklärt sich hoffentlich von selbst :D

9. **Music Map**
Siehe oben.

10. **Sonic Fingerprint**
AudioMuse erstellt ein musikalisches Profil aus den meistgehörten beziehungsweise kürzlich gehörten Songs. Anhand dieses Profils schlägt es weitere Titel vor, die zum persönlichen Hörgeschmack passen. Damit lassen sich dann die alten Schätze heben, die sich in der eigenen Musikbibliothek verstecken.

11. **Hyperbolic Explorer**
AudioMuse stellt bei seiner Analyse eine Beziehung zwischen Songs in einem sogenannten hyperbolischen Ähnlichkeitsraum her. Mit dem Explorer kann man von einem Song musikalische Nachbarschaften und weiter entfernte Stilrichtungen entdecken – je nachdem, welchen Erkundungsmodus man verwendet.

## Clients

Wirklich interessant wird AudioMuse im Zusammenspiel mit Clients. Also Software, mit der ich Musik von meinem Navidrome Server abspiele. Bisher hat sich Navidrome um die Erstellung von "Instant Mixes" gekümmert. Habe ich auf **Sofort-Mix** geklickt, hat Navidrome diesen mit eigenen Algorithmen generiert. Da ich aber das Plugin installiert habe, wird diese Anfrage nun an AudioMuse weiter gereicht. AudioMuse nutzt seine eigene Analyse, um ähnliche Songs zu finden und liefert die entsprechende Playlist zurück. 

Damit das funktioniert, muss der Client einen entsprechenden Request an Navidrome senden. Der sehr beliebte Player **Symfonium** unterstützt dies bereits. Eine Diskussion zur Implementierung findet sich bei Interesse unter [diesem Link](https://support.symfonium.app/t/implement-navidrome-audiomuse-ai-plugin-to-symfonium/12238/34).

Noch besser ist es, wenn der Client die Anfragen ohne Umwege direkt an AudioMuse sendet. Hier gibt es noch nicht so viele Player, die das tun. Der Player [Wavio](https://github.com/Joel-Mercier/wavio) hat so eine Integration. Im Einstellungsmenü können die Zugangsdaten des AudioMuse Servers hinterlegt werden (API-Token von oben bereit halten) und danach kann der Client eigene Playlisten abfragen, ohne Navidrome dazwischen. 

![AudioMuse Requests in der Android App Wavio](/assets/img/audiomuse/audiomuse-in-Wavio.jpg){: w="300"}
_AudioMuse kann in Wavio direkt angesprochen werden (Screenshot: Markus Daams / 2026)_

Noch längst nicht alle Clients unterstützen AudioMuse. Dazu ist das Projekt noch zu neu und sicherlich ein wenig zu nischig. Dennoch lassen sich welche finden und dann geht der Hörspaß richtig los.

## Was für ein Aufwand, oder?

Eine große Musikbibliothek, halbwegs gute Hardware, drei Container und eine Woche Zeit. War es den Aufwand für mich wert?

Die Antwort ist ja, definitiv. Bei einer großen Musiksammlung verliert man schnell den Überblick und vergisst die vielen tollen Songs, die den Soundtrack des eigenen Lebens waren und wieder sein sollten. AudioMuse hebt diese Schätze für mich. Playlists werden hier nicht stumpf nach Genre generiert, sondern nach Art und Inhalt der Texte, der Beats und des Tempos. Es ist diese völlig andere Herangehensweise bei der Erstellung der Playlists, die den Unterschied für mich ausmachen. Wenn ich auf der Stimmung eines bestimmten Liedes hängen bleiben möchte, kann ich das ab sofort tun. AudioMuse sieht das ganze Lied und nicht nur die BPM oder die Wellenform. 

Die großen Anbieter wie Spotify, Deezer, Tidal und Co bekommen das für mich nicht hin. Warum das so ist, werde ich im nächsten Artikel beleuchten. 

## Ressourcen

* [AudioMuse AI - Deployment Strategy](https://github.com/NeptuneHub/AudioMuse-AI/blob/main/docs/DEPLOYMENT.md)

* [Navidrome Dokumentation zum Plugin](https://www.navidrome.org/docs/usage/integration/audiomuse/)
