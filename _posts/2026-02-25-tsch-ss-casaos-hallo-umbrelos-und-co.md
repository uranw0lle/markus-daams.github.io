---
layout: post
title: "Tschüss CasaOS - Hallo Alternativen"
date: 2026-02-25 08:52:27 +0100
category: selfhosting
author: 
tags: [selfhosting, linux, raspberry-pi]
description: "CasaOS wird nicht mehr weiterentwickelt. Zeit, sich nach Alternativen umzuschauen."
image:
  path: /assets/img/post-header/header-umbrelos.jpg
  alt: Mi Casa es su UmbrelOS 
---

# „We have upgraded CasaOS to ZimaOS“

So kann man es natürlich auch ausdrücken. Mit bestem Marketingsprech wurde angekündigt, dass **CasaOS** nicht mehr weiter entwickelt wird. Alle Ressourcen wenden sich nun dem designierten Nachfolger **ZimaOS** zu. Für viele ist das nicht weiter tragisch, für einige aber schon.

Es ist schon einige Zeit her, dass ich auf der Suche nach einem NAS OS war. Da ich einen Raspberry Pi 4 herumfliegen hatte, bin ich bei meiner Suche auf **CasaOS** gestoßen. Das Projekt hatte mich schnell begeistert, denn es handelte sich um ein Betriebssystem für verschiedene Computer, wie dem Raspberry Pi und ließ sich wie ein modernes Betriebssystem bedienen. Als Unterbau diente Docker, aber anstatt mit Images, Containern und Compose Files zu jonglieren, installierte ich Apps und konfigurierte wichtige Einstellungen über eine moderne UI. Manchmal möchte man nur Klicken statt YAML, besonders als Anfänger. 

Diese Zeiten sind allerdings vorbei, denn **CasaOS** wird nicht mehr weiter entwickelt, es befindet sich im *Maintanance Mode*. Die Community versucht ihr Bestes, hier mit Workarounds weiterzuhelfen. Ich finde aber, dass das keine dauerhafte Lösung ist. Auch wer sein Heimnetz ohne externe Anbindung betreibt, sollte die Sicherheit mitdenken. Zudem wird Docker fleißig weiter entwickelt, womit es zunehmend schwerer wird, neue Software in **CasaOS** zu installieren.

Daher schaue ich mir eine Alternative genauer an und zeige noch zweite weitere Möglichkeiten auf. Mein Raspi ist noch lange nicht am Ende.

## Warum nicht ZimaOS?

Das lässt sich für mich schnell beantworten: Auf dem Raspberry Pi (ARM) läuft es nicht, da es nur für x86 (Intel / AMD) verfügbar ist. Da ich auf meiner Intel Maschine Proxmox nutze, kommt es für mich einfach nicht infrage.

Aber das Internet ist groß, die Community nicht untätig und wenn man im Regen stehen gelassen wird, findet sich immer ein Regenschirm – zum Beispiel mit **UmbrelOS** (*badum tsss Anm. d. Redaktion*).

**UmbrelOS** bietet denselben, bzw. ähnlichen Komfort wie **CasaOS**. Für mich sind das:

* Eine moderne UI
* Unterstützung von ARM, hier Raspberry Pi 4 und 5
* Eine aktive Community
* Einfache Installation und Konfiguration

Das Projekt selbst stammt aus der Ecke der Crypto Miner, was man hier und da auch merkt. Aber keine Sorge, es ist viel mehr als eine weitere Bitcoin Wallet UI.

## Installation und Eindrücke

Die Installation ist recht einfach. Ich empfehle hierfür den erst kürzlich rundum modernisierten **Raspberry Pi Imager**. Dieser ist auch für Linux verfügbar. Fedora liefert diesen direkt im App Store aus und ich bin mir sicher, dass es bei den meisten anderen Distros ähnlich ist.

Für die Installation wird natürlich noch das Image benötigt. Da ich über die offizielle Website keinen Link finden konnte (vielleicht war ich zu blind), habe ich mich für das [offizielle GitHub Repo](https://github.com/getumbrel/umbrel) entschieden. Mit einem Klick auf „Releases“ (rechte Seite) gelangt man zu allen veröffentlichten Versionen. Ich entscheide mich für den Download mit **umbrelos-pi4.img.zip** im Namen, da ich einen Raspberry Pi 4 nutze.

Das Image kann gepackt bleiben, darum kümmert sich der Imager. Diesen öffne ich nun und wähle Folgendes aus:

* „Choose Device“: Raspberry Pi 4 
*  „Choose OS“: **Use Custom**, ganz unten in der Liste. Hier wähle ich nun die eben heruntergeladene ZIP Datei aus.
* „Choose Storage“: Hier wähle ich die SD Card aus, die ich per Card Reader verbunden habe

Der Imager schreibt **UmbrelOS** auf die SD Card, was dauern kann. Nach dem Schreibvorgang kann die SD Card zurück in den Raspberry. 

![Raspberry Pi Imager](/assets/img/umbrell-os/raspberry-pi-imager.jpg){: w="550"}
_Der Rasperry Pi Imager schreibt das Image auf die SD Card (Screenshot: Markus Daams / 2026)_

Nachdem ich den Raspberry per LAN-Kabel verbunden und unter Strom gesetzt habe, musste ich mich ein wenig gedulden. Der erste Boot hat ca. 10 Minuten gedauert. Bis dahin reagiert das neue Betriebssystem erst einmal gar nicht. Aber das war zu erwarten, denn die erste Initialisierung braucht einfach Zeit.

Die IP-Adresse habe ich mir aus der Oberfläche meines Routers gefischt. Nach einiger Zeit hat sich die Weboberfläche geöffnet und ich wurde vom Onboarding Screen begrüßt. Hier werden Name und Passwort vergeben, also keine Hexerei. 

![UmbrelOS Onboarding Screen](/assets/img/umbrell-os/umbrell-os-onboarding.jpg){: w="550"}
_Nach dem Booten begrüßt mich der Onboarding Screen (Screenshot: Markus Daams / 2026)_

Das Onboarding geht schnell vonstatten und ich werde von einer modernen Weboberfläche begrüßt. Unten finde ich eine Taskleiste mit den wichtigsten Links und oben gibt es Empfehlungen für Apps. Hier finde ich fast nur Crypto Apps, aber keine Sorge, es gibt noch viel mehr und diese Ansicht ändert sich schon bald.

![UmbrelOS Startseite](/assets/img/umbrell-os/umbrell-os-startseite.jpg){: w="550"}
_Die Startseite von UmbrelOS. Das ändert sich aber noch (Screenshot: Markus Daams / 2026)_

Die Systemeinstellungen sind aufgeräumt und auf das Nötigste begrenzt. Ich kann das Wallpaper ändern, 2-Faktor-Authentifizierung einrichten, Backups anlegen sowie einspielen und noch einiges mehr. Mir wird zudem die Systemauslastung angezeigt, was ich sehr nützlich finde. Es gibt auch einen Migrationsassistenten, den ich aber nicht ausprobiert habe. 

## Apps, Apps und Apps

Das A und O eines solchen Betriebssystems sind natürlich die Apps. Der integrierte Store bietet hier bereits eine reichliche Auswahl. Wer will, kann mit einem Klick **Home Assistant**, **Immich** , **Navidrome** und Co installieren. Allerdings sollte man die zur Verfügung stehende Rechenpower im Hinterkopf behalten. 

Wie bereits erwähnt, ist die zugrundeliegende Technik Docker. Man muss sich jedoch keine Sorgen machen, denn die Pakete, die ich getestet habe, waren alle sinnvoll vorkonfiguriert. Installieren und loslegen, perfekt für den ersten Start ins selbst gehostete Heimnetz.

![Der integrierte App Store](/assets/img/umbrell-os/umbrell-os-app-store.jpg){: w="550"}
_Der integrierte App Store bietet eine gute Vorauswahl (Screenshot: Markus Daams / 2026)_

Ich habe mir für einen Test **Grafana** und **InfluxDB2** installiert. Die Installation dauerte jeweils aber gefühlt sehr lange, um die 10 Minuten. Der erste Start von Grafana dauerte noch einmal so lange, bis die WebUI laden wollte. Danach liefen beide Apps aber anstandslos. Zudem ist der Raspberry Pi 4 auch nicht mehr der Schnellste. Alles in allem also durchaus vertretbar.

![So sieht UmbrelOS nach der Installation der ersten Apps aus](/assets/img/umbrell-os/umbrell-os-erste-apps.jpg){: w="550"}
_So sieht UmbrelOS nach der Installation der ersten Apps aus (Screenshot: Markus Daams / 2026)_

Wer will, findet im Internet weitere Community-Stores mit weiteren Apps. Natürlich sollte man hier immer mit Bedacht vorgehen, denn die Apps werden abseits der offiziellen Repos bereit gestellt. Bei meiner Suche bin ich auf [Big Bear Umbrel](https://github.com/bigbeartechworld/big-bear-umbrel) gestoßen. Hier habe ich **Zigbee2MQTT** gefunden. Wer den **Home Assistant** nutzt, findet das vielleicht nützlich. Alle Apps, die ich mir angeschaut hatte, verfügten über eine ordentliche Beschreibung. Entwickler und Projekte waren verlinkt und es wurden weitere Empfehlungen angezeigt. Die Aufmachung ist modern und informativ, ich mag so etwas.
## Fazit und weitere Alternativen

Wer **CasaOS** mochte und diese Art der Usability weiter nutzen möchte, sollte sich **UmbrelOS** auf alle Fälle einmal anschauen. Die Installation dürfte selbst für Anfänger zu schaffen sein. Dank der sinnvollen Vorkonfiguration dürften die ersten Schritte im Selfhosting sehr einfach verlaufen. Wer später abenteuerlustig wird, kann sich per **ssh** verbinden und sich per Terminal austoben. Es gibt für Profis in den erweiterten Einstellungen ein integriertes Terminal, in welchem man im Host-System selbst, als auch in den Apps arbeiten kann.

Meine Empfehlung ist zudem, nicht zu lange mit einem Wechsel weg von **CasaOS** zu warten, auch wenn ich sehr genau weiß, dass so ein Wechsel schwer und mühselig ist. Aber nichts veraltet so schnell wie Software, die nicht mehr unterstützt wird.

Neben **CasaOS** gibt es jedoch noch weitere Alternativen. Zwei davon möchte ich hier ebenfalls noch kurz vorstellen.

## 1. Runtipi

In einem [älteren Artikel](https://markus-daams.com/posts/runtipi-selfhosting-einfach-gemacht/) habe ich **Runtipi** schon einmal vorgestellt. Es handelt sich in diesem Fall ebenfalls um einen Überbau für Docker – oder sollte ich sagen, Übertipi? (*Es geht immer noch flacher -.- Anm. d. Redaktion*)

Es wird eine Weboberfläche bereitgestellt, über welche kuratierte Apps (Container Images) bereitgestellt werden. Diese lassen sich per Klick installieren und aktualisieren. Weitere Features sind:

* Ein Performance-Dashboard
* Backup Funktion für jede App separat
* Compose Overrides lassen sich über die UI einfügen
* Bereitstellung eines selbst signierten SSL-Zertifikats (nützlich für die lokalen Domains)
* Profis können eigene Apps abseits des Stores hinzufügen

Für Anfänger vielleicht nicht so geeignet: Das Update des Host OS (also Runtipi) lässt sich aktuell nur über Terminal anstoßen, nicht über die Weboberfläche.

Auf die Installation gehe ich nun nicht so genau ein. Diese ist aber auch nicht weiter wild. Anstatt eines eigenen Images, wählen wir im **Raspberry Pi Imager** ein voreingestelltes Betriebssystem aus.

1. **Raspberry Pi Imager** starten und den richtigen Raspi auswählen
2. Unter „Choose OS“ den Menüpunkt „Raspberry Pi OS (other) auswählen und danach Raspberry Pi Lite“ (Diese Version bringt keinen Desktop mit)
3. SD Card auswählen
4. Nach „Next“ auf „Edit Settings“ klicken und „SSH“ aktivieren. Außerdem noch „username“ und „password“ hinterlegen. Denn nur so kann man sich später mit dem Raspberry Pi verbinden

![Im minimal Image müssen wir SSH aktivieren](/assets/img/umbrell-os/pi-imager-enable-ssh.jpg){: w="550"}
_SSH muss aktiviert werden, bevor das Image auf die SD Card geschrieben wird (Screenshot: Markus Daams / 2026)_

Das Booten dauert ca. 5 Minuten. Danach können wir uns per SSH verbinden. Die IP-Adresse fische ich mir über meinen Router raus. Im Terminal / Command Prompt / Konsole eines beliebigen PCs geht es dann weiter:

```
ssh myusername@192.168.178.40
```
Das im Imager hinterlegte Passwort eingeben, den Fingerprint einmalig akzeptieren und die Verbindung steht.

**Runtipi** lässt sich nun per Script installieren. Den dazu nötigen Befehl finde ich direkt auf der [offiziellen Projektseite](https://runtipi.io/):

```
curl -L https://setup.runtipi.io | bash
```
> Wie immer die kleine Warnung, Scripte nicht blind auszuführen! Gegebenenfalls die AI der Wahl einmal drüber schauen lassen.
{: .prompt-warning}

Die Installation dauert ein wenig, danach findet sich die Weboberfläche unter der IP-Adresse des Raspberrys. Nun kann man im Browser loslegen, Apps suchen und installieren.

### Zwischenfazit Runtipi

Ich nutze es bereits für einige Apps, bei denen ich weder Zeit, noch Geduld für zu viel Docker-Gelöt habe. Ich kann die Apps per Klick installieren, updaten und zudem Backups erstellen und wieder einspielen.

Sowohl Installation als auch Aktualisierung sind aber nicht ganz so einsteigerfreundlich wie man es von **CasaOS** oder dem oben vorgestellten **UmbrelOS** gewohnt ist. Wer ein bisschen Terminal nicht scheut, sollte es sich aber einmal anschauen. 

## 2. Portainer

Wer sich von den Ketten der vorkonfigurierten Betriebssysteme zumindest ein wenig lösen möchte, findet in **Portainer** das etwas tiefere Schwimmbecken.

Alle von mir vorgestellten Alternativen nutzen Docker als technischen Unterbau. Bei dem nächsten Tipp verhält es sich nicht anders, aber es gibt deutlich mehr Freiheiten. Die Installation ist jedoch nicht mehr ganz so trivial. In diesem [YouTube Video vom „Maker Magazin“ (15:23 Minuten / Deutsch)](https://www.youtube.com/watch?v=9T23qVoCIB0&t=1s) wird diese Schritt für Schritt erklärt. Alternativ installiert man es über **DietPI**, welches ich [in diesem Artikel](https://markus-daams.com/posts/mit-dietpi-zum-headless-raspi/) vorstelle.

**Portainer** bietet einige Vorteile:

* Es lassen sich beliebige Images (natürlich CPU Architektur beachten) installieren, also kein kuratierter App-Store
* Es lassen sich Stacks installieren (per Compose File gleich einen Rutsch an Images installieren und konfigurieren)
* Backups lassen sich per UI verwalten
* und vieles, vieles mehr

![Portainer UI](/assets/img/umbrell-os/portainer.jpg){: w="550"}
_Die UI von Portainer (Screenshot: Markus Daams / 2026)_

### Zwischenfazit Portainer

Sowohl Installation als auch Konfiguration und Nutzung sind nicht mehr so einfach wie **CasaOS** und Co. Wenn ein Wechsel aber ohnehin ansteht, lohnt es sich vielleicht, die eigenen Fähigkeiten zu erweitern. Mit **Portainer** kann ich viele Vorteile der Docker Technik nutzen, die ich in den vorkonfigurierten Betriebssystemen aus Gründen der Usability nicht nutzen kann, oder nur auf Umwegen. Alles, was es braucht, ist in ein schlankes Host-Betriebssystem.

**Tipp:** Für Docker gibt es noch mehr Oberflächen, wie zum Beispiel **Yacht** oder **Rancher**. 

## Fazit

Dass **CasaOS** nicht mehr weiter geführt wird, habe ich nur durch Zufall erfahren. Ich habe wohl aus Langeweile die Website angesteuert und den Hinweis zu **ZimaOS** gefunden. Auf dem GitHub Repo finde ich zu diesem Thema nur etwas in den „Discussions“, siehe zum Beispiel hier → [https://github.com/IceWhaleTech/CasaOS/discussions/2386](https://github.com/IceWhaleTech/CasaOS/discussions/2386). Ich bin nicht der Einzige, an dem diese Neuigkeit vorbeigegangen ist.

Zum Glück gibt es aber genügend Alternativen, denn der Raspberry erfreut sich weiterhin einer regen Beliebtheit. Ich hoffe, dass ich mit diesem Artikel ein paar Denkanstöße liefern konnte. Mir ist klar, dass so ein Wechsel viel Arbeit, Zeit und Mühe kostet. Ich wünsche allen, die es angehen, viel Glück und Erfolg.

## Ressourcen

* [Das GitHub Repo von UmbrelOS](https://github.com/getumbrel/umbrel)

* [Die offizielle Website von UmbrelOS](https://umbrel.com/umbrelos)

* [Die offizielle Website von Runtipi](https://runtipi.io/)

* [Die offizielle Website von Portainer](https://portainer.io/)

* [Raspberry Pi Imager Doku(Englisch)](https://www.raspberrypi.com/documentation/computers/getting-started.html#raspberry-pi-imager)

 
