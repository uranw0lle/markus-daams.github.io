---
layout: 
title: "Proxmox Helper Scripts vorgestellt"
date: 2025-02-26 08:40:52 +0100
category: selfhosting
author: 
tags: [proxmox, selfhosting]
description: "Mit den Proxmox Helper Scripts wird Self Hosting noch einfacher."
image:
  path: /assets/img/post-header/header-proxmox-helper-scripts.jpg
  alt: Proxmox Helper Scripts - Header
---

# Proxmox - noch etwas einfacher

Wer sich mit dem Thema Self-Hosting beschäftigt, wird irgendwann auf **Proxmox** stoßen. Bei **Proxmox** handelt es sich um eine auf Linux basierende Serverplattform zum hosten von virtuellen Maschinen und Containern. Und wie viele andere, großartige Software Projekte, ist es open source. 

So lassen sich die verschiedensten Dienste als eigenständige Maschinen oder Container innerhalb einer Umgebung betreiben und auf Wunsch auch vernetzen. Hosten lässt sich alles, was das Herz begehrt. Ob [Nextcloud](https://nextcloud.com), [PiHole](https://pi-hole.net), [Jellyfin](https://jellyfin.org/) oder [Home Assistant](https://www.home-assistant.io/), diese Aufzählung hier könnte länger sein als ein Roman von Dostojewski. Aber auch Betriebssysteme wie **Windows** und **Linux** lassen sich hosten und remote nutzen. 

Es ist also kein Wunder, dass **Proxmox**, eigentlich eine Unternehmenslösung, in der Self-Hosting-Community ein gutes Standing hat.

Möchte man all die tollen Dienste nutzen, müssen diese zunächst installiert und konfiguriert werden. Je nach gewähltem Dienst kann hierbei gerne einmal ein ganzer Sonntag draufgehen. Mag sich **PiHole** noch einfach einrichten lassen, kann die Installation und Konfiguration von **Nextcloud** sehr trickreich sein. Da freut man sich über jede Hilfe, die man bekommen kann.

*Make managing your Homelab a breeze* - Mit diesem Claim wird für die **Proxmox Helper Scripts** geworben. Und der Claim passt!

## Auftritt Proxmox Helper Scripts

Wie bereits erwähnt, basiert **Proxmox** auf Linux. Das bietet den Vorteil, dass sich praktisch alles per Kommandozeile erledigen lässt und sich virtuelle Maschinen und Container über diese einrichten lassen. Woraus wiederum folgt, dass sich all diese Schritte auch per Script automatisiert erledigen lassen. 

Und genau hier kommen die **Proxmox Helper Scripts** zum Einsatz.

Bei den **Proxmox VE Helper-Scripts** handelt es sich um eine kuratierte und ständig wachsende Sammlung von Scripten, welche die Administration von **Proxmox** und die Installation von beliebten Diensten deutlich vereinfachen. Stand heute (26.02.2025) finden sich dort 292 verschiedene Scripte. 

Die Installation selbst läuft dann sehr einfach ab. Man führt ein Script in der Proxmox Konsole aus, welches alle nötigen Kommandos automatisch aufruft. Hat dann alles geklappt, wurde der gewählte Dienst installiert und kann unter der vergebenen IP-Adresse aufgerufen werden.

Das klingt etwas zu einfach, um wahr zu sein? Dann lasse ich am besten Bilder sprechen. Und etwas Text, ohne geht es nicht.

## Schritt 1: Script wählen

Für meine Beispiel-Installation wähle ich **CasaOS**. Ich bekomme auf der jeweiligen Unterseite des Scripts weitere Hinweise zu dem gewählten Dienst. Bei **CasaOS** ist für mich relevant, dass wenn der Container "privilegiert" ausgeführt wird, dieser direkten Zugriff auf Hardware Ressourcen bekommt. In diesem Fall auf die USB-Ports, was bei **CasaOS** durchaus sinnvoll sein kann. 

**LXC** zeigt mir an, dass es sich um einen Container handelt. Die vorkonfigurierten Hardware Ressourcen für den Container werden hier ebenfalls angezeigt. 

![CasaOS auf der Seite der Proxmox Helper Scripts](assets/img/proxmox-helber-scripts/1-proxmox-helper-scripts.jpg)
_CasaOS auf der Seite der Proxmox VE Helper-Scripts._

Den Befehl auf der Seite kopiere ich und führe ihn in der Kommandozeile meiner Proxmox Installation aus. Das Script kann auf Github eingesehen und dort auch herunter geladen werden.

> Wichtig: Befehle aus dem Internet nicht blind ausführen, sondern im Zweifel immer prüfen!
{: .prompt-danger}

## Schritt 2: Befehl ausführen

![Der Befehl wird in der Konsole von Proxmox ausgeführt](assets/img/proxmox-helber-scripts/2-proxmox-konsole.jpg)
_Der Befehl wird in der Konsole von Proxmox ausgeführt._

## Schritt 3: Wizard starten

Das Script selbst wird per *wget* von **GitHub** herunter geladen und ausgeführt. Der Wizard startet dann automatisch.

![Der Wizard startet automatisch, mit einer Sicherheitsabfrage](assets/img/proxmox-helber-scripts/3-proxmox-helper-script-wizard.jpg)
_Der Wizard startet automatisch und mit einer Sicherheitsabfrage._

## Schritt 4: Diagnose Daten

Auf Wunsch lassen sich anonymisierte Diagnose Daten versenden. Das ist aber freiwillig.

![Es lassen sich anonyme Diagnosedaten senden](assets/img/proxmox-helber-scripts/4-proxmox-helper-script-diagnose-daten.jpg)
_Es lassen sich anonyme Diagnosedaten senden. Das ist freiwillig._

## Schritt 5: Settings wählen

Im 5. Schritt lassen sich nun die gewünschen Settings wählen. Meiner Erfahrung nach werden die angebotenen Skripte sinnvoll vorkonfiguriert. Hier kann man also **Default Settings** wählen, wenn es schnell und einfach gehen soll. Der Container wird in diesem Fall **unprivilegiert** installiert. Das ist für mich ok, da man dies nachträglich in Proxmox ändern kann. Für diese Demonstration belasse ich es dabei.

![Wählen der Settings](assets/img/proxmox-helber-scripts/5-proxmox-helper-script-settings.jpg)
_Im nächsten Schritt lassen sich die gewünschen Settings wählen._

> Verklickt? Die Installation lässt sich jederzeit abbrechen und neu starten.
{: .prompt-tip}

## Schritt 6: Speicherort wählen

In diesem Schritt wird der Speicherort gewählt.

![Speicherort für den Container wählen](assets/img/proxmox-helber-scripts/6-proxmox-helper-script-storage.jpg)
_Ich habe zwei interne SSDs, auf denen ich meine Container und virtuellen Maschinen speichern kann._

## Schritt 7: Finalisierung der Installation

Nun heißt es zugucken. Der neue Container wird erzeugt und bereit gestellt. Das kann je nach Dienst, Internetanbindung und Server-Hardware etwas dauern. 

![Finalisierung der Installation](assets/img/proxmox-helber-scripts/7-proxmox-helper-script-installation.jpg)
_Nun wird aus einem vorkonfugierten Template ein neuer Container erzeugt und CasaOS installiert._ 

> Dinge wie IP Adressen und Subnet Mask lassen sich in den Advance Settings konfigurieren. In der Standardkonfiguration wird DHCP verwendet.
{: .prompt-info}

## Schritt 8: Wenn es läuft, dann läuft es

Nachdem die Installation abgeschlossen wurde, wird der Dienst automatisch gestartet. Ich kann **CasaOS** über die per DHCP bezogene IP-Adresse aufrufen und verwenden.

![CasaOS wurde installiert und läuft](assets/img/proxmox-helber-scripts/8-proxmox-helper-script-fertig.jpg)
_CasaOS läuft und kann sofort verwendet werden._

Das Prozedere hat nicht einmal 5 Minuten gedauert. Das ist, verglichen zu einer üblichen Installation, eine deutliche Zeitersparnis.

## Mein Fazit zu den Proxmox Helper Scripts

Wer, wie ich, gerne und viele Dienste möglichst selbst hostet, freut sich über jede Art der Arbeitserleichterung. Denn die Installation, Konfiguration und vor allem die spätere Administration der verschiedenen Dienste kann zeit- und manchmal auch nervraubend sein. 

Die **Proxmox Helper Scripts** haben mir einiges an Arbeit abgenommen. Hinter den Scripten steht eine Community, die sich ebenfalls für alle Themen rund ums Self-Hosting begeistert. Sie teilen ihre Zeit und Arbeit durch die Bereitstellung und Pflege solcher Scripte mit uns. 

Wer also selbst überlegt, seine Daten wieder zurück in den eigenen Verfügungsbereich zu holen, sollte sich **Proxmox** und die **Proxmox Helper Scripts** einmal genauer anschauen. Ich hoffe, mit diesem Artikel die Neugier geweckt zu haben. Happy Hosting!

## Ressourcen

* [Die Homepage von Proxmox](https://www.proxmox.com/de/)

* [Die Hompage der Proxmox Helper Scripts](https://community-scripts.github.io/ProxmoxVE/)

* [Die Discord Community rund um die Proxmox Helper Scripts](https://discord.com/invite/2wvnMDgdnU)

* [Github Discussions der Proxmox Helper Scripts](https://github.com/community-scripts/ProxmoxVE/discussions)


