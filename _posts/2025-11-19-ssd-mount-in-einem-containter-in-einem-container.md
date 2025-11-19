---
layout: post
title: "SSD Mount - in einem Containter, in einem Container"
date: 2025-11-19 09:20:07 +0100
category: selfhosting
author: 
tags: [selfhosting, proxmox, runtipi, immich, linux]
description: "Wie kriege ich eine SSD in Proxmox zu einem LXC mit Runtipi für Immich zum Laufen?"
image:
  path: /assets/img/post-header/header-ssd-runtipi.jpg
  alt: SSD Mount - in einem Containter, in einem Container
---

# Einleitung: Fotos und noch mehr Fotos


Als ich meine Handyfotos noch bei Google und Co gespeichert hatte, war die Welt in Ordnung, aber nicht perfekt. Ich habe seit 2011 fleißig mit den Mobiltelefonen in meinem Leben fotografiert und dementsprechend hat sie viel Material angestaut. Später kamen noch Spiegelreflexkameras dazu und ich habe die Fotografie als Hobby betrieben. So haben sich ebenfalls tausende Fotos angesammelt. Viel zu viele, um sie alle bei Google hochzuladen. Also hatte ich beide Welten, Handy und Spiegelreflex, immer getrennt. Das war auch ok so, aber in meinem Hirn waberte stets der Wunsch, den einen, die Mutter aller Foto Streams zu haben. 

Spulen wir vor. Ich habe Cloudspeicher aufgegeben und hoste alles selbst. Dazu gehören natürlich auch meine Fotos. Ich hatte mich schnell für **Immich** entschieden. In [diesem Artikel](https://markus-daams.com/posts/immich-fotos-und-videos-selbst-hosten/) stelle ich es vor. 
**Immich** ist kürzlich nun „stabil“ geworden. Dies bedeutet, das „breaking changes“ nur noch bei größeren Updates vorkommen. Ansonsten lässt es sich von nun an und weitgehend sorgenfrei betreiben. Ich hatte dank **Runtipi** bisher aber auch keine davon. **Runtipi** stelle ich [in diesem Artikel](https://markus-daams.com/posts/runtipi-selfhosting-einfach-gemacht/) vor.

Alles läuft? Dann ist es doch an der Zeit, meinen langgehegten Wunsch in die Tat umzusetzen.

> Ein Wort der Warnung: Wer an Systemdateien und Containern rumfuhrwerkt, hat vorher ein Backup gemacht! Backups sind immer besser als Nachsicht und durchgemachte Nächte zwecks Wiederherstellung des Urzustandes.
{: .prompt-warning}

## Der Plan: Warum kompliziert, wenn es noch komplizierter geht?

Mich graute der Gedanke an die Umsetzung, daher hatte ich es ein wenig vor mich hergeschoben. Ich wollte Folgendes bewerkstelligen:

* Eine SSD mit meinen RAW-Fotodateien an den Proxmox-Host stecken
* Diese SSD an einen unprivilegierten LXC-Container (ja, ich weiß, wofür das C steht, lass mich!) durchreichen
* Die SSD von dort an einen Docker Container in **Runtipi** weiterreichen
* Diese SSD dann in **Immich** als externe Bibliothek einbinden

Das größte Problem in diesem „Herausforderungskomplex“ ist der unprivilegierte Container. Dieser hat keinen Zugriff auf die USB-Geräte an meinem Proxmox-Host. Ich wollte das auch so belassen, denn eine meiner Regeln lautet: Ein Container darf nur nutzen, was er auch wirklich braucht. Proxmox erlaubt es aber dennoch, externe Geräte an LXC weiterzureichen. Dafür muss Proxmox das Gerät aber erst einmal kennen lernen.

Also ging ich das als Erstes an. Die SSD muss dauerhaft in Proxmox gemountet werden.

## Schritt 1: SSD in Proxmox mounten 

Der wichtigste Schritt hier ist, die SSD zu identifizieren. Das kann knifflig werden, wenn man bereits mehrere SSD an einem Host nutzt, weil man zum Beispiel **Jellyfin** im absoluten Endgame nutzt.

Um wirklich sicher zu gehen, führe ich vor und nach dem Anstecken der SSD an den USB Port diese Befehle aus:

``` terminal
dmesg | tail -n 30

# oder und besser

lsblk -f
```
![Die Ausgabe von lsblk](/assets/img/ssd-immich/lsblk-f.jpg)
_Dank lsblk -f habe ich die SSD gefunden (Screenshot: Markus Daams / 2025)_

Die wichtige Information für mich: Im System wird die neue SSD als ``sdb1`` geführt. Das notiere ich mir mal.

Als Nächstes muss die SSD gemountet werden. Dafür lege ich zunächst mal ein Verzeichnis an, denn ich will sie dauerhaft mounten.

``` terminal
mkdir -p /mnt/ssd-raws
```
In dieses Verzeichnis mounte ich nun die eben angesteckte SSD.

``` terminal
mount -t exfat -o uid=100000,gid=100000 /dev/sdb1 /mnt/ssd-raws
```
Die SSD ist mit ``exfat`` formatiert. Mit der ``uid`` und ``gid`` will ich sicher stellen, das **root** im LXC auf die SSD Zugriff hat. Das geht natürlich eleganter. Erst einmal soll es funktionieren. 

Ich will aber sicher gehen, dass es geklappt hat. Wenn kein Fehler geworfen wird, hat es das bei allen Unixoiden, aber sicher ist sicher ist …

``` terminal
ls -ld /mnt/ssd-raws
drwxr-xr-x 3 100000 100000 131072 Nov 15 17:03 /mnt/ssd-raws
```

Da das geklappt hat, geht es nun darum, die SSD auch nach einem Neustart zu mounten. Aktuell würde das System die SSD nach einem Reboot vergessen. Dafür sind zwei Schritte nötig. 

1. Ich brauche die **UUID** der SSD. Die lässt sich ganz einfach herausfinden:

``` terminal
blkid /dev/sdb1

#Die Ausgabe sieht in etwa so aus
/dev/sdb1: LABEL="RAWS" UUID="EB7D-D33B" BLOCK_SIZE="512" TYPE="exfat" PARTUUID="1c685203-119b-4fa2-b05e-a59080c63f2d"
```

Der nächste Schritt ist, einen Eintrag in die Mount Tabelle ``fstab`` zu machen. 

``` terminal
nano /etc/fstab
```

``` terminal
# Die RAW SSD
UUID=EB7D-D33B  /mnt/ssd-raws   exfat   defaults,noatime,uid=100000,gid=100000   0  0
```
{: file="/etc/fstab" }

Ab jetzt wird die SSD auch bei einem Reboot des Proxmox Hosts automatisch gemountet.

## Schritt 2: SSD an den Container durchreichen

Bisher weiß nur Proxmox, dass es die SSD gibt. Ich will sie nun zum Container durchreichen, auf dem **Runtipi** läuft. Wichtig zu wissen ist, dass der Container keinen Zugriff auf die SSD erhält, sondern auf das Verzeichnis, in das ich diese gemountet habe. Unprivilegierte Container können keine Blockgeräte mounten. Das stört in meinem Anwendungsfall aber nicht.

Als Erstes notiere ich mir die **Container-ID** (CID). Im Zweifel finde ich diese immer auf der Proxmox Oberfläche. Sie ist dem Containernamen vorangestellt. In meinem Fall heißt der Container ``106 (runtipi)``. Die **106** ist die **CID**. 

Die Konfiguration wird so ergänzt:

``` terminal
pct set 106 -mp0 /mnt/ssd-raws,mp=/media/USB-SSD
```

*Ich bin bei der Benennung der Mountpunkte so herrlich inkonsistent und schwebe davon ... whooosh*

Der Container muss anschließend neu gestartet werden, damit er was von seinem neuen Glück weiß:

``` terminal 
pct reboot 106
```
In Proxmox sind wir nun fertig. Weiter geht es im Container.

## Schritt 3: LXC an Docker an Immich
Zunächst überprüfe ich, ob der Container Zugriff auf das hinzugefügte Verzeichnis hat.

``` terminal
ls -ld /media/USB-SSD
drwxr-xr-x 3 root root 131072 Nov 15 16:03 /media/USB-SSD
```
Das sieht doch gut aus. 

Der nächste Schritt ist nun, dieses Verzeichnis **Immich** bekannt zu machen. Dies läuft bei mir aber als App von **Runtipi**, also als Docker Container. Ich muss also Docker erst einmal mitteilen, dass es im Verzeichnis des LXC ein neues Verzeichnis gibt, welches bitte an die App **Immich** weiter gereicht werden soll.

Das ist in **Runtipi** inzwischen und ein Glück sehr einfach geworden. Die ``config.yaml`` der App ( die ein Container ist) lässt sich in der Weboberfläche ergänzen. Ich weiß nicht, ab welcher Version dies hinzugekommen ist. Ich nutze aktuell die Version ``v4.6.5``, so als Richtschnur.

Ich melde mich auf der Weboberfläche an und klicke auf **Meine Apps** → **Immich** → **User config** und aktiviere **Enable user config**. Als stets Backup machender Mensch kann ich die Warnmeldung ignorieren.

In das große Textfeld habe ich den folgenden Text eingetragen:

``` yaml
services:
  immich:
    volumes:
      - /media/USB-SSD:/media/USB-SSD
```
Der LXC Pfad wird so an den Docker Container weiter gereicht. Danach bestätige ich die Änderung mit einem Klick auf **Save**.

 ![Die User Config in Runtipi](/assets/img/ssd-immich/runtipi-userconfig.jpg){: w="600"}
 _Die User Config in Runtipi (Screenshot: Markus Daams / 2025)_


## Schritt 4: Das Verzeichnis in Immich einbinden

Wir sind fast da. Das Verzeichnis sollte dem Docker Container nun ebenfalls bekannt sein. Ich füge es in **Immich** als externe Bibliothek hinzu. Dazu melde ich mich auf der Weboberfläche an und klicke rechts oben auf mein **Profilbild** → **Verwaltung** → **Externe Bibliotheken**.

Hier klicke ich auf **Bibliothek erstellen**, wähle den Benutzenamen aus und gebe dann den Mountpoint an. Hier nehme ich den Pfad, den ich schon für den LXC gewählt und so auch an Docker übergeben habe: ``/media/USB-SSD/``.

Speichern und fertig. Hat alles geklappt – bei mir hat es das ein Glück – fängt **Immich** umgehend mit der Indizierung der neuen Fotos an. Das kann, je nach Hardware und Container Konfiguration richtig, riiiiiichhhtiiig lang dauern.

![Immich nun mit allen Fotos](/assets/img/ssd-immich/immich.jpg){: w="600"}
_Alle Fotos im selben Stream - wie ich es immer wollte (Screenshot: Markus Daams / 2025)_

## Zum Schluss

Die oben fabrizierte Anleitung hat bei mir geklappt und ich freue mich darüber, dass ich endlich alle Fotos in einem Stream habe. In 15 Jahren haben sich bei mir Tausende Fotos angehäuft, jedes einzelne eine Erinnerung.

Allerdings bezweifel ich, dass meine Vorgehensweise ideal ist. So ist der Besitzer des Ordners im LXC aktuell ``root``. Durch UUID-Shift wäre es möglich, den Ordner einem User im LXC zuzuordnen. Allerdings erschien mir dies zu aufwendig (*ja, ja, klingt und riecht nach Faulheit*).

Mein Alternativplan sah vor, einen neuen Container als NFS-Share zu erstellen und so anderen Container bereit zustellen. Das hätte den Vorteil, dass ich diesen Share auch auf anderen Rechnern mounten könnte. Ob das so funktioniert und ob das klug wäre, habe ich mir allerdings noch nicht zu Ende überlegt. 

Aktuell bin ich aber froh, dass mein Plan funktioniert hat. Sollte ich einmal ein anderes Setup ausprobieren wollen, werde ich die Erfahrungen aber selbstverständlich wieder in einem Artikel verewigen.

Bis dahin: Happy basteln!

## Ressourcen


- [Runtipi Dokumentation zur User Config](https://runtipi.io/docs/guides/customize-app-config)

- [Bei Problemen ist das Proxmox Support Forum eine tolle Hilfe](https://forum.proxmox.com/)

- [Die (offizielle?) Website des "World Backup Day"](https://www.worldbackupday.com/en/)