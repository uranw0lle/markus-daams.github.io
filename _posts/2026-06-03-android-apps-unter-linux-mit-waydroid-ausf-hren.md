---
layout: post
title: "Android Apps unter Linux mit Waydroid ausführen"
date: 2026-06-03 07:24:28 +0200
category: linux
author: 
tags: [linux, android, tipps, tools]
description: "Ich wollte ein Android Game auf Linux ausführen. Mit Waydroid geht das erstaunlich gut."
image:
    path: /assets/img/post-header/header-waydroid.jpg
    alt: Waydroid - Android Apps unter Linux ausführen
---

# Waydroid - Way to go

Es gab eine Zeit, da habe ich Smartphone Games sehr gerne gespielt. War im Büro mal wieder Leerlauf angesagt, hat man sich mit Spielen wie „Star Wars: Galaxy of Heroes“ die Zeit vertrieben und regelrechte Wettkämpfe ausgeführt. Und genau diese Erinnerung spülte mir mein Hirn erst kürzlich wieder auf die gedankliche Tagesordnung. Ich habe erst einmal kurz geprüft, ob es das Spiel noch gibt und als dieser Test positiv ausfiel, fragte ich mich, ob Android Games nicht eigentlich auch auf Linux laufen müssten. Was man sich halt so fragt ...

Ganz so blöd ist der Gedanke nicht, wenn ich mich ein klein wenig selbst loben darf. Android basiert schließlich auf Linux und man muss das Rad nicht immer neu erfinden. Dazu kommt, dass ich bereits Erfahrungen mit dem „Subsystem for Linux“ gemacht habe, als ich noch Windows nutzte. Dieses Projekt hatte zum Ziel, Android Apps unter Windows lauffähig zu machen. Da kam am Ende aber nur eine halbherzige Umsetzung mit dem Amazon App Store bei heraus und wurde später wieder beendet.

Die Linux Community ist bei solchen Vorhaben aber persistenter unterwegs. Mit **Waydroid** ist es möglich, Android Apps unter Linux auszuführen und das klappt erstaunlich gut. Im Folgenden erkläre ich, was es damit auf sich hat und wie ich es installiert habe.

## Container - mal wieder

Waydroid macht es sich sehr einfach und einfach ist hier gut. Es nutzt selbst ein einfaches Android Image, welches auf [LineageOS](https://lineageos.org/) beruht. Dieses Image wird in einen Container gekapselt und ausgeführt. Für den Container wird [LXC](https://linuxcontainers.org/) genutzt, eine quelloffene Virtualisierungslösung, die man zum Beispiel von [Proxmox](https://markus-daams.com/tags/proxmox/) her kennt.

Diese Technik hat den Vorteil, dass es direkt auf den Linux-Kernel des Host-Systems zugreifen kann und auf diesem Wege auf die angeschlossene Hardware wie zum Beispiel die Tastatur, die Maus usw. Die Apps laufen also („fast“) mit nativer Performance. Das ist prinzipiell sehr gut, im Falle von Android aber nicht unbedingt gut – dazu später mehr.

Wir haben also Waydroid, welches einen Container (LXC) ausführt, in dem ein LineageOS Android läuft und auf dem können wir es krachen lassen.

Und genau das machen wir jetzt.

## Installation

Die Installation kann sehr einfach sein, oder nicht so einfach, es kommt auf das Host-System an. Da ich Fedora nutze, ist die Installation sehr einfach. Für andere Distributionen empfehle ich einen Blick in die sehr gute Dokumentation vom Waydroid Projekt, welche man [unter diesem Link](https://docs.waydro.id/usage/install-on-desktops) findet.

> **Noch ein wichtiger Hinweis:** Aktuell funktioniert Waydroid nur mit Wayland. Wer einen anderen Kompositor nutzt schaut also in die Röhre :/ 
{: .prompt-info}

### Für Fedora

Die Installation erfolgt hier aus dem offiziellen Repository, die Installation ist ein Oneliner:

``` shell
sudo dnf install waydroid
```
Die Paketabhängigkeiten werden natürlich automatisch aufgelöst. Wichtig zu wissen ist, dass LXC installiert wird, die diesem Projekt zugrundeliegende Container-Lösung. 

![Waydrod - Übersicht der Paketabhängigkeiten](/assets/img/waydroid/waydroid-abhaengigkeiten.jpg){: w="550"}
_Waydroid bringt eine Reihe von Paketabhängigkeiten mit sich (Screenshot: Markus Daams / 2026)_

Die Installation ist hier aber noch nicht am Ende. Als Nächstes muss Waydroid gestartet werden und es öffnet sich ein Fenster, welches zwei Links benötigt (System OTA, Vendor OTA). Beide Links kann man der Installationsanleitung entnehmen.

* **System OTA:** ``https://ota.waydro.id/system``
* **Vendor OTA:** ``https://ota.waydro.id/vendor``

Im Auswahlfenster darunter kann man sich entweder für ein minimales Android 13 entscheiden, oder ein Android 13 mit Google Apps. Da ich den Playstore brauchen werde, entscheide ich mich für letzteres.

![Waydroid - Installation abschließen](/assets/img/waydroid/waydroid-installation.jpg){: w="550"}
_Die beiden Links findet man in der offiziellen Installationsanleitung (Screenshot: Markus Daams / 2026)_

Nachdem auch dieser Schritt abgeschlossen ist, wird der Container mit Android automatisch gestartet. Es öffnet sich ein Startfenster, das ein bisschen an das auf einem Tablet erinnert.

![Waydroid - Startseite nach der Installation](/assets/img/waydroid/waydroid-startbildschirm.jpg){: w="550"}
_Waydroid - Die Startseite sieht sehr nach Android aus (Screenshot: Markus Daams / 2026)_

Da es sich um ein Android handelt, bedient es sich auch so. Nun aber mit Maus und Tastatur, anstatt mit Wischgesten. Ziehe ich die Maus vom oberen Bildrand herunter, finde ich den Schnellzugriff, den ich auch von meinem Smartphone her kenne.

![Waydroid - Schnellzugriff des Androids](/assets/img/waydroid/waydroid-quickaccess.jpg){: w="550"}
_Waydroid - Der Schnellzugriff ist ebenfalls vorhanden (Screenshot: Markus Daams / 2026)_

Das ist sehr praktisch, denn da es sich um ein Android handelt, finde ich mich im Menü schnell zurecht und kann es zum Beispiel auch auf Deutsch umstellen.

## Playstore? Ja, aber …

Da ich ja mit dem Vorsatz gestartet bin, ein bestimmtes Spiel zu installieren, suche ich den Playstore und starte ihn. Wie gewohnt muss ich mich erst einmal bei Google anmelden. Hierbei bin ich auf eine kleine Schwierigkeit gestoßen. Auf meine Passkey Verwaltung des Hostsystems kann dieses Android nicht zugreifen. Glücklicherweise habe ich noch die Authentifizierung per Zweitgerät aktiv, also das übliche „Ja, das bin ich“ auf einem anderen Gerät. Damit konnte ich mich nun anmelden und der Playstore stand mir offen.

Ich suchte nach dem besagten Game und fand ... nichts. Dieses Problem hatte ich schon einmal unter Windows. Bestimmte Games, eigentlich fast alle, waren dort ebenfalls nicht verfügbar. Und da fiel es mir dann auch wieder ein: Ich führe ein Betriebssystem auf einem **x86 Intel Chip** aus, dass eigentlich für **ARM** vorgesehen ist. Auch die vielen Android Apps werden nur für ARM kompiliert und gepackt. Das Game kann mit meinem Prozessor nichts anfangen.

## Sprechen sie ARM?

Was es nun braucht, ist ein ARM-Translator, der alle Calls auf x86 umbiegt. Das hatte ich damals unter Windows nicht hinbekommen, unter Linux ist das weniger ein Problem. Die großartige Community um Waydroid herum hat diese Übersetzer gebaut. Diesen müssen wir aber nachinstallieren. Ein entsprechendes [Repo findet sich auf GitHub](https://github.com/casualsnek/waydroid_script).

Wir wollen einen Translator installieren und in den Container injizieren. Das ist nicht weiter aufwendig, bringt aber noch weitere Paketabhängigkeiten mit sich. Wer es nicht schon installiert hat, benötigt noch ``python3`` und ``pip``. Beide findet man bei den allermeisten Distros in den regulären Repositorys. Python regiert schließlich heimlich die Welt, oder?

Danach können wir uns aber an die Installation machen. 

``` shell
git clone https://github.com/casualsnek/waydroid_script
cd waydroid_script
python3 -m venv venv
venv/bin/pip install -r requirements.txt
sudo venv/bin/python3 main.py
```

Was passiert hier? Wir klonen das Repo auf unser Host-System und ``cd``'en da rein. Wir erstellen eine virtuelle Umgebung und installieren anschließend die benötigten Pakete mit ``pip``. Anschließend führen wir die ``main.py`` aus. Dieses Script bietet ein interaktives Menü im Terminal, um verschiedene Komponenten nachzuinstallieren:

1. Android 13 auswählen
2. Install
3. **libhoudini** für Intel / **libndk** für AMD

Da ich einen Intel Chip habe, installiere ich **libhoudini**. 

> Tipp: Wer schon im Install Menü ist, kann gleich noch das **Smartdock** mit installieren. Dann haben wir im Android eine Taskleiste, wie man sie vom Desktop her kennt. Sehr praktisch.
{: .prompt-tip}

Anschließend wird der Waydroid Dienst einmal neu gestartet. Sicher ist sicher.

``` shell
systemctl restart waydroid-container.service 
```

Um nun zu überprüfen, ob der Translator aktiv ist, kann man diesen Befehl ausführen:

``` shell
waydroid shell getprop ro.product.cpu.abilist
```

Die Ausgabe sollte in etwa so aussehen:

``` shell
x86_64,x86,arm64-v8a,armeabi-v7a,armeabi
```

Da sollte also „irgendwas mit ARM“ stehen. Nun starten wir wieder Waydroid. Das neue Dock begrüßt uns. Es benötigt noch ein paar Berechtigungen, das kennt man bereits vom Android auf dem Smartphone.

![Waydroid - Das Berechtigungssystem von Android ist auch hier aktiv](/assets/img/waydroid/waydroid-smartdock-berechtigungen.jpg){: w="550"}
_Das Berechtigungssystem von Android kennt man bereits, es ist hier dasselbe (Screenshot: Markus Daams / 2026)_

Danach hat unser Container Android aber eine schicke und sehr praktische Taskleiste. Für die Arbeit am Desktop ist das sehr nützlich.

![Waydroid - Das Smartdock in Aktion](/assets/img/waydroid/waydroid-smartdock.jpg){: w="550"}
_Das Smartdock hat sogar ein Startmenü. Sehr cool (Screenshot: Markus Daams / 2026)_

## So, nun aber, ich will zocken!

Der Playstore sieht bei mir jetzt anders aus. Es sind viel mehr Apps verfügbar und auch „Star Wars: Galaxy of Heroes“ lässt sich finden und installieren. 

![Der Playstore zeigt mehr Apps an](/assets/img/waydroid/waydroid-playstore.jpg){: w="550"}
_Der Playstore zeigt nun auch Apps für ARM (Screenshot: Markus Daams / 2026)_

Und siehe da, das Spiel startet, ich kann mich auch beim Google Play Service anmelden und los zocken. Das Spiel ist nicht sehr hungrig, wenn es um die Grafikleistung geht und läuft daher gut.

![Ednlich zocken, das Spiel startet](/assets/img/waydroid/waydrooid-star-wars-galaxy-of-heroes.jpg){: w="550"}
_Mit dem ARM-Translator startet das Spiel endlich (Screenshot: Markus Daams / 2026)_

## Mein Fazit

Meine Erfahrungen mit dem „Android Subystem for Windows“ waren damals mehr als ernüchternd. Es lief praktisch nichts und die angebotenen Apps wurden von Amazon kuratiert. Mein erneuter Versuch unter Linux verlief viel erfreulicher. Das liegt natürlich auch daran, dass Android und Linux Zwillingsschwestern sind. Meine PC-Hardware wird dank der LXC Technik ebenfalls gut erkannt und ich kann Android bequem mit Maus und Tastatur bedienen.

Ich habe erst ein paar Apps ausprobiert, nichts davon war wirklich Hardware hungrig. Ich kann zur Performance des ARM-Translators keine verwertbaren Aussagen treffen. Wer es aber selbst ausprobieren möchte, sollte es versuchen. Die Installation ist für die meisten Distributionen einfach gehalten. Meine übliche Warnung sei an dieser Stelle jedoch wieder in die Welt geschrieben: Scripts aus dem Internet nicht blind ausführen, sondern einmal überprüfen. Zur Not lässt man die AIs des Vertrauens darüber schauen, die meisten verstehen sich ja auf Code.

Ansonsten wünsche ich viel Spaß mit Android auf Linux.

## Ressourcen

* [Waydroid - offizielle Website](https://waydro.id/)

* [Waydroid - GitHub Repo](https://github.com/waydroid/waydroid)

* [Waydroid - Dokumentation (Englisch)](https://docs.waydro.id/usage/install-on-desktops)

* [Waydroid Scrips - GitHub Repo](https://github.com/casualsnek/waydroid_script)
