---
layout: 
title: "Proxmox Upgrade Von 8 Auf 9"
date: 2025-10-08 07:58:28 +0200
category: selfhosting
author: 
tags: [selfhosting, proxmox]
description: "Ich mache das Upgrade von Proxmox von Version 8 auf 9. So lief es ab."
image:
  path: /assets/img/post-header/header-proxmox-upgrade.jpg
  alt: Proxmox Upgrade - Ein Erfahrungsbericht
---

# Jedes Upgrade ist ein kleines Abenteuer

Man, was habe ich mich früher darüber gefreut, wenn von irgendwas eine neue Version heraus gekommen ist. Ich habe innerlich jede neue Version von Android, Playstation OS, Steam, KDE, Anno 1800, Gina Wild Filme und was weiß ich noch gefeiert. Neue Versionen waren immer toll und sind es sicher auch immer noch. 

Eine Sache habe ich jedoch bei mir feststellen können und ich bin mir auch sicher, dass das mit dem Alter gekommen ist – je wichtiger eine bestimmte Komponente wird, desto weniger euphorisch nimmt man die Nachricht auf, dass es eine neue Version davon gibt.

Bei meinem Home Server ist genau das der Fall. Er ist inzwischen ein vitaler Bestandteil meiner täglichen Routinen. Möchte ich morgens auch nur das Licht anschalten, wird der entsprechende Befehl über **Home Assistant** abgesetzt, welcher als LXC-Container auf meinem Proxmox Server läuft. Möchte ich einen Film gucken, oder Musik hören, kümmert sich ein **Jellyfin** Container darum. Meine Startseite im Browser? **Heimdall** wird ebenfalls auf dem Server vorgehalten. Meine Fotos anschauen? Das ist ein Fall für **Immich**. Und ich kann noch lange so weiter machen. Self Hosting ist wie Meth, nur dass die Zähne intakt bleiben. 

Es fällt mir daher schwer, ein funktionierendes System auf den läuternden Pfad der Aktualisierung zu schicken. Aber es muss sein, denn wichtige Sicherheitsupdates gibt es in Zukunft nur für die aktuellste Version. Und über neue Features freue ich mich immer, das wächst sich nicht mehr raus. 

Also, mutig voran, wird schon schiefgehen. 

## Vorbereitung

Proxmox Version 9 ist am 6. August veröffentlicht worden. Als Basis dient das ebenfalls neue Debian 13 „Trixie“. Das klingt alles schon leicht „bleeding edge“, wenn man bedenkt, dass „Trixie“ erst am 9. August erschien. Aber es ist Debian, also ohnehin schon recht stabil und auch wenn mir mein Home Server viel bedeutet, ich hoste hier kein Krankenhaus-Management-System. 

Ich habe aber Foren und Subreddits beobachtet und nicht feststellen können, dass es zu größeren Problemen gekommen ist. Dennoch war für mich der wichtigste 1. Schritt: Backups aller Container und virtuellen Maschinen. Das nimmt etwas Zeit in Anspruch, aber ich will mein Glück auch nicht überstrapazieren. Vorgehen tue ich nach [der offiziellen Anleitung](https://pve.proxmox.com/wiki/Upgrade_from_8_to_9) von Proxmox. Da auch mein DNS-Server als Container läuft, muss ich notfalls auf die Mobilfunkverbindung ausweichen. Ich werde sicherlich zu faul sein, die DNS-Einstellungen im Notfall zu ändern. Ich kenne mich zu gut.

## Schritt 1: Upgrade auf Version 8.4

Bevor der eigentliche Upgrade-Prozess beginnen kann, muss der Host auf die Version **8.4** (oder später) aktualisiert werden. Grund hierfür ist, dass mit dem Upgrade ein Tool installiert wird, welches eine Checklist erstellt, ob das eigene System bereit für den anstehenden Prozess ist. 

``` shell
apt update
apt dist-upgrade
pveversion
```

``pveversion`` sollte dann eine Zahl größer **8.4** ausgeben. Danach kann die Checkliste erstellt werden. Es gibt dafür zwei Möglichkeiten:

``` shell
pve8to9
```
Gibt eine kurze Liste mit den wichtigsten Checks aus. In meinem Fall reicht die Liste, da ich nicht viel an der Installation von Proxmox geändert habe. Ich werde nur ein Auge auf den Reverse Proxy **Nginx** haben.

``` shell
 pve8to9 --full
```

Mit dem Parameter ``-full`` wird eine ausführlichere Liste erstellt.

Mein Ergebnis sieht so aus:

```shell
SKIP: NOTE: Expensive checks, like CT cgroupv2 compat, not performed without '--full' parameter

= SUMMARY =

TOTAL:    44
PASSED:   30
SKIPPED:  6
WARNINGS: 5
FAILURES: 0

ATTENTION: Please check the output for detailed information!
```

Die Warnings kann ich ignorieren. Das Script beschwert sich, dass der Backup Server offline ist. Diesen habe ich per NFS-Share eingebunden. Ich habe die Backups allerdings schon gemacht. Eine andere Warnung betrifft die Microcode Upgrades für den Prozessor. Ich habe mir das auf meine Todo-Liste gesetzt und werde mich nach dem Upgrade darum kümmern. Alles Wichtige ist aber grün gefärbt, also ist die Bahn frei.

## Schritt 2: Trixie Repositorys einbinden

Da mit dem Versionssprung auf 9 auch die Debian Basis erneuert wird, müssen die alten Debian 12 „Bookworm“ Repositorys durch die Debian 13 „Trixie“ Repositorys ersetzt werden. Das geht einfach per Stream Editor:

``` shell
sed -i 's/bookworm/trixie/g' /etc/apt/sources.list
sed -i 's/bookworm/trixie/g' /etc/apt/sources.list.d/pve-enterprise.list
```

Den zweiten Befehl kann ich mir sparen, da ich keine Subscription habe und die Enterprise Repositorys nicht nutzen kann. 
Ich schaue nun einmal kurz nach, ob das auch geklappt hat:

``` shell
cat /etc/apt/sources.list
```

``` shell
deb http://ftp.debian.org/debian trixie main contrib
deb http://ftp.debian.org/debian trixie-updates main contrib
deb http://security.debian.org/debian-security trixie-security main contrib
``` 
{: file="/etc/apt/sources.list" }

Das sieht gut aus. Jetzt muss noch das Proxmox Repository hinzugefügt werden. Ich bediene mich wieder an der „no subsciption“ Version:

```shell
cat > /etc/apt/sources.list.d/proxmox.sources << EOF
Types: deb
URIs: http://download.proxmox.com/debian/pve
Suites: trixie
Components: pve-no-subscription
Signed-By: /usr/share/keyrings/proxmox-archive-keyring.gpg
EOF
```
Der nächste Schritt ist optional und nur notwendig, wenn **Ceph** verwendet wird. Da ich nur einen Knoten nutze und aktuell auch kein verteiltes Storage-System verwende, kann ich diesen Schritt überspringen. Der Vollständigkeit halber füge ich den Befehl hier aber mit ein:

``` shell
cat > /etc/apt/sources.list.d/ceph.sources << EOF
Types: deb
URIs: http://download.proxmox.com/debian/ceph-squid
Suites: trixie
Components: no-subscription
Signed-By: /usr/share/keyrings/proxmox-archive-keyring.gpg
EOF
```

## Schritt 3: Go for Upgrade

Als Erstes müssen die Repositorys aktualisiert werden.

``` shell
apt update
```

Meine Ausgabe sieht so aus:

``` shell
Get:1 http://security.debian.org/debian-security trixie-security InRelease [43.4 kB]
Get:2 http://ftp.debian.org/debian trixie InRelease [140 kB]
Get:3 http://ftp.debian.org/debian trixie-updates InRelease [47.3 kB]
Get:4 http://security.debian.org/debian-security trixie-security/main amd64 Packages [51.4 kB]
Get:5 http://security.debian.org/debian-security trixie-security/main Translation-en [34.5 kB]
Get:6 http://ftp.debian.org/debian trixie/main amd64 Packages [9,669 kB]      
Hit:7 http://download.proxmox.com/debian/ceph-quincy bookworm InRelease   
Get:8 http://download.proxmox.com/debian/pve trixie InRelease [2,771 B]   
Hit:9 http://download.proxmox.com/debian/pve bookworm InRelease         
Get:10 http://download.proxmox.com/debian/pve trixie/pve-no-subscription amd64 Packages [233 kB]
Get:11 http://ftp.debian.org/debian trixie/main Translation-en [6,484 kB]      
Get:12 http://ftp.debian.org/debian trixie/contrib amd64 Packages [53.8 kB]
Get:13 http://ftp.debian.org/debian trixie/contrib Translation-en [49.6 kB]
Get:14 http://ftp.debian.org/debian trixie-updates/main amd64 Packages [5,412 B]
Get:15 http://ftp.debian.org/debian trixie-updates/main Translation-en [4,096 B]
Fetched 16.8 MB in 3s (5,831 kB/s)  
```

Da hat sich noch der Bücherwurm eingeschlichen. Das schaue ich mir einmal genauer an:

```shell
grep -R "bookworm" /etc/apt/sources.list /etc/apt/sources.list.d/
```

Erwischt. Die Ausgabe sieht so aus:

```shell
/etc/apt/sources.list.d/pve-enterprise.list.disabled:# deb https://enterprise.proxmox.com/debian/pve bookworm pve-enterprise
/etc/apt/sources.list.d/ceph.list.disabled:# deb http://download.proxmox.com/debian/ceph-quincy bookworm enterprise
/etc/apt/sources.list.d/ceph.list.disabled:deb http://download.proxmox.com/debian/ceph-quincy bookworm no-subscription
/etc/apt/sources.list.d/ceph-no-subscription.list:deb http://download.proxmox.com/debian/ceph-quincy bookworm no-subscription
/etc/apt/sources.list.d/pve-install-repo.list:deb http://download.proxmox.com/debian/pve bookworm pve-no-subscription
/etc/apt/sources.list.d/pvetest-for-beta.list:# deb http://download.proxmox.com/debian/pve bookworm pvetest
/etc/apt/sources.list.d/pve-no-subscription.list:deb http://download.proxmox.com/debian/pve bookworm pve-no-subscription
```
Vorsichtig ist die Mutter der digitalen Porzellankiste. Ich mache ein Backup und lösche die alten Einträge:

```shell
mkdir -p /root/apt-sources-backup
cp /etc/apt/sources.list.d/*.list* /root/apt-sources-backup/

rm /etc/apt/sources.list.d/pve-enterprise.list* \
   /etc/apt/sources.list.d/ceph.list* \
   /etc/apt/sources.list.d/ceph-no-subscription.list \
   /etc/apt/sources.list.d/pve-install-repo.list \
   /etc/apt/sources.list.d/pvetest-for-beta.list \
   /etc/apt/sources.list.d/pve-no-subscription.list
```
Ein erneutes ``grep -R "bookworm" /etc/apt/sources.list /etc/apt/sources.list.d/`` fördert keine Altlasten mehr zutage. Ich probiere es erneut:

``` shell
apt update
Hit:1 http://security.debian.org/debian-security trixie-security InRelease
Hit:2 http://ftp.debian.org/debian trixie InRelease
Hit:3 http://download.proxmox.com/debian/pve trixie InRelease
Get:4 http://ftp.debian.org/debian trixie-updates InRelease [47.3 kB]
Fetched 47.3 kB in 0s (105 kB/s)
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
609 packages can be upgraded. Run 'apt list --upgradable' to see them.
```
Das sieht schon viel besser aus, das Upgrade kann starten. Dieser Schritt kann, je nach System, viel Zeit in Anspruch nehmen. Zudem weist die Anleitung darauf hin, dass immer einmal wieder Änderungen an Systemdateien bestätigt werden müssen. Da bin ich gespannt, denn so viel habe ich (hoffentlich) nicht geändert.

Ich starte das Upgrade um 11:47 Uhr mit dem Befehl:

```shell
apt dist-upgrade
```

Im Abschnitt **Upgrade the system to Debian Trixie and Proxmox VE 9.0** werden die Dateien aufgeführt, die geändert werden und welche Antworten man geben kann oder sollte. Ich richte mich während des Upgrades nach diesem Leitfaden.

Das Upgrade ist um 12:10 Uhr durchgelaufen. Da auch der Kernel aktualisiert wurde, steht als Nächstes ein Reboot an. Das verbinde ich mit einem weiteren Script. Die **Proxmox Helper Scripts** (einen Artikel von mir findet sich unter [diesem Link](https://markus-daams.com/posts/proxmox-helper-scripts-vorgestellt/)) bieten ein Post Install Script an. Was macht dieses Script?

* Es entfernt die Enterprise-Repositorys
* Es fügt auf Wunsch ein Test-Repository hinzu
* Es entfernt die "Brudi, du hast keine Subscription" Meldung
* Es akualisiert das System
* Es leitet den Reboot ein

Alle Schritte werden abgefragt und können wahlweise aktiviert oder deaktiviert werden. Da ich das System bereits auf den neusten Stand gebracht habe, passiert bei dem entsprechenden Schritt nichts weiter. Als Letztes steht nun der Reboot an.

## Schritt 4: Bist du da?

Durch den Reboot wurde meine SSH Session beendet. Ich warte also ab und schlürfe meinen Tee. Schon zwei Minuten später kann ich mich wieder verbinden. Auch das Web Frontend lädt. Alle meine Container und virtuellen Maschinen sind gestartet. 

Es hat gelappt!

## Mein Fazit

Die offizielle Anleitung von Proxmox ist wirklich gut, denn sie hat mich sicher durch den Upgrade-Prozess geleitet. Dass es so gut gelaufen ist, ist sicher auch dem Umstand geschuldet, dass ich nicht sehr viel an den Systemdateien geändert hatte. Auch nutze ich kein komplexes Umfeld mit verteilten Knoten und Storage nutze. Zudem musste ich nichts am Bootloader ändern. Kurz um: Ich hatte es einfach. 

Dennoch ist bei einem solchen Upgrade immer Vorsicht und Vorarbeit angesagt. Mein erster und wichtigster Schritt ist sowieso ein paar Wochen abzuwarten, was sich in der Community so tut. Ist alles ruhig, bin auch ich beruhigt. Wer also noch auf Version 8 sitzt, dem sei gesagt, nur Mut. Zumal der Support für die Menschen ohne Subscription nächstes Jahr ohnehin auslaufen wird. 

Eine letzte Empfehlung von mir ist, die AI der Wahl (ChatGPT und Co) bereit zu halten. Geht während des Upgrades etwas schief, kann man die digitalen Assistenten um Hilfe bitten. Und wer mag, kann sich die Befehle aus der Anleitung erklären lassen. Linux lernen lohnt sich. 

Zum Schluss bleibt mir noch zu sagen: Viel Glück mit dem Upgrade. 

## Ressourcen

* [Die offizielle Anleitung von Proxmox für das Upgrade von Version 8 auf 9.](https://pve.proxmox.com/wiki/Upgrade_from_8_to_9)

* [Das Proxmox Forum (es gibt auch Support auf Deutsch)](https://forum.proxmox.com/)

* [Der Subreddit (gut für Erfahrungsberichte)](https://www.reddit.com/r/Proxmox/)