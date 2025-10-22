---
layout: 
title: "Gaming unter Linux - Ein unvollständiger Überblick"
date: 2025-10-15 07:59:21 +0200
category: 
author: 
tags: [linux, gaming]
description: "Gaming unter Linux wird immer populärer. Zeit, meinen Senf dazu zugeben."
image:
  path: /assets/img/post-header/header-gaming-unter-linux.jpg
  alt: Gaming unter Linux - Ein unvollständiger Überblick
---

# Gaming unter Linux, das geht?

Die kurze Antwort lautet **Ja**. Es gehört ehrlicherweise noch ein **Aber** dazu. Und genau darum soll es heute gehen. Dabei spare ich mir den Blick in die Vergangenheit, denn dann werde ich mal wieder nostalgisch und muss jede Menge Tee trinken. 

Mit jeden neuen Support Ende einer Windowsversion, wie zuletzt von [Windows 10 (Link zu Computerbase)](https://www.computerbase.de/news/betriebssysteme/support-ende-goodbye-windows-10-und-nun.94657/) sehen sich manche User nach einer Alternative um. Auch stößt vielen Menschen immer wieder einmal das Geschäftsgebaren des Softwareriesen aus Redmond auf. Ob Datenschutz oder übergriffige AI Integrationen, Gründe gibt es viele. Nicht jeder will wechseln. Wer es aber vorhat, stößt bei seiner Suche bestimmt auch auf Linux. Windows ist aktuell noch das Nonplusultra, wenn es ums Gaming geht. Das aber ändert sich gerade.

Linux hat sich inzwischen zu einer dieser Alternativen entwickelt. In meinem Artikel [„Vorsicht, wilde Pinguine“](https://markus-daams.com/posts/vorsicht-wilde-pinguine/) habe ich das Thema schon einmal beleuchtet. In diesem Artikel soll es heute aber ausschließlich ums Gaming gehen. 

Meine kleine Übersicht ist unvollständig, da das Thema sehr komplex ist. Ich will versuchen, es auf die wichtigsten Aspekte herunterzubrechen. 

Legen wir los.

## Was braucht es dafür? The Essentials

Spielen unter Windows ist relativ einfach. Man sucht sich das passende Game aus, installiert es und legt los. In den meisten Fällen klappt das anstandslos. Das tut es auch unter Linux, wenn die Voraussetzungen stimmen.

Die meisten Spiele laufen nicht nativ unter Linux. Da dieses Betriebssystem nach wie vor einen eher geringen Marktanteil auf den Desktop-PCs dieser Welt  hat, ist es für Spieleentwickler und Publisher nicht sonderlich interessant, extra hierfür zu entwickeln.

Damit Windows-Spiele dennoch unter Linux laufen, braucht es eine Zwischenschicht. Genauer, es braucht eine Kompatibilitätsschicht. Vereinfacht gesagt, soll sich ein Spiel so verhalten können, wie unter Windows und dennoch unter Linux laufen.

Ich präsentiere den ersten Star Gast: **Wine**

### Wine

Die Entwicklung begann bereits 1993. Wine steht für **Wine is not an emulator**. Der Name ist wichtig, denn Wine emuliert tatsächlich nichts. Im Gaming würde eine Emulation zu viel Performance kosten. Wine biegt Windows API Aufrufe auf Linux POSIX Aufrufe um. Der Vorteil dieser Methode ist, dass die Hardware direkt angesprochen werden kann. Es muss also kein „virtuelles Windows“ dazwischen geschaltet werden. Dennoch finden sich Systemordner (wie zum Beispiel ein C:\ Drive) und eine Registry in der Laufzeitumgebung. 

![Registry unter Wine](/assets/img/gaming-unter-linux/wine-regedit.jpg){: w="450" }
_Die Registry unter Wine kann auch bearbeitet werden (Screenshot: Markus Daams / 2025)_

Neben Games lassen sich auch andere Windows Programme mit Wine unter Linux nutzen. Das funktioniert mal recht gut, mal schlecht und öfters auch gar nicht. Die Windows-API war schon immer recht komplex und wurde mit der Zeit noch sehr viel komplexer. 

Wine wird aber ständig weiter entwickelt und Spiele, die letzte Woche vielleicht noch nicht liefen, funktionieren mit dem neuen Update vielleicht. Eine gute Anlaufstelle für Neuigkeiten ist übrigens das [WindeHQ](https://www.winehq.org/).

Nachteile von Wine sind, dass die Kompatibilität nicht perfekt ist. Auch lässt die Performance besonders bei aktuellen DirectX Versionen zu wünschen übrig. Das bringt uns zur Firma **Valve**, das Unternehmen hinter **Steam**. 

Auftritt Proton.

### Proton

Valve wollte Steam Spiele unter Linux lauffähig machen. Das war mit Wine bereits möglich, sollte aber noch besser werden. Zusammen mit der Firma **CodeWeavers** ist man einige der Schwächen von Wine direkt angegangen.

Die wichtigsten Features von Proton sind:

* Die Implementierung einer Übersetzung von DirectX 9, 10, 11 und 12 auf **Vulkan**
* Esync / Fsync: Synchronisationsoptimierungen für Multithreading – verbessert FPS und verringert Latenzen
* Volle Steam Integration

Proton war und ist ein echter Turbo Booster für Gaming unter Linux. Wer heute ein Spiel über Steam startet, bekommt häufig nicht einmal mehr mit, das im Hintergrund Proton gestartet wird.
 
Dasselbe System läuft auch auf dem Steam Deck. Valve nutzt auf seinem Handheld ein eigens angepasstes Arch Linux (SteamOS) und die Spiele werden mit Proton ausgeführt. Die Anzahl der spielbaren Titel wächst dabei wöchentlich. 

![Proton unter Steam](/assets/img/gaming-unter-linux/steam-proton.jpg){: w="450" }
_Proton ist inzwischen standardmäßig unter Linux aktiv (Screenshot: Markus Daams / 2025)_

Das kommt auch allen anderen Gamern zugute, denn was auf dem Steam Deck läuft, wird sehr wahrscheinlich auch auf anderen Linux Distributionen laufen, Open Source sei Dank.

Proton hat das Gaming unter Linux also bedeutend vereinfacht, denn es entfällt viel manuelle Bastelei, die unter Wine noch nötig war. Diese Entwicklung war nicht nur gut für Valves Steam, sondern auch für andere Launcher (Stichwort **UMU**, siehe Link in den Ressourcen unten). 

## Lutris, Heroic Games Launcher, Gamehub

Neben **Steam**, gibt es noch weitere Game Launcher. So hat sich der **Epic Games Launcher** mit seinen wöchentlichen Gratis Games dauerhaft mit auf das Familienfoto geschlichen. EA und Ubi mischen hier natürliche ebenfalls mit eigenen Launchern mit.

Dank Proton hat sich inzwischen ein vitales Ökosystem entwickelt. Programme wie **Lutris** oder auch **Heroic** haben die Installation und Nutzung der verschiedenen Launcher nicht nur stark vereinfacht, die Tools sehen modern aus und vereinfachen die Verwaltung der Spiele enorm. Zudem bringen sie häufig noch angepasste Proton Versionen mit (z.B. GE-Proton). Open Source sei Dank.

![Heroic Game Launcher](/assets/img/gaming-unter-linux/heroic-launcher.jpg){: w="550" }
_Tools wie der Heroic Games Launcher vereinfachen die Installation und Verwaltung von Games (Screenshot: Markus Daams / 2025)_

An dieser Stelle will ich bekannte Tools einmal kurz vorstellen. Auch hier besteht kein Anspruch auf Vollständigkeit, sorry.

* **Lutris**: Ist fast schon ein Klassiker. Neben bekannten Game Launchern lassen sich Spiele auch klassisch per „.exe“ installieren (zum Beispiel von DVD). Neben eigens angepassten Wine Versionen, gibt es auch nützliche Community-Skripte. Allerdings ist die UI nicht sehr intuitiv, aber es gibt viele gute Anleitungen im Netz. 

* **Heroic Games Launcher**: Unterstützt aktuell *Epic*, *GOG* und *Amazon Games*. Die UI ist modern und intuitiv. Proton Versionen lassen sich bequem verwalten. 

* **Bottles**: Die UI von Bottles ist spartanisch, aber dadurch auch selbsterklärend. Es wurde nicht exklusiv für Games entwickelt. Auch Software lässt sich damit installieren. Ich habe so manches Programm mit Bottles zum Laufen gebracht, was mit einem nativ installierten Wine einfach nicht laufen wollte. Für Games ist es nicht meine erste Wahl, aber man sollte es kennen.

* **GameHub**: Der GameHub fristet fast ein Schattendasein, aber meiner Meinung nach unverdient. Neben bekannten Launchern lassen sich Proton und Wine Versionen bequem verwalten. Zudem gibt es zahllose Erweiterungen aus der Community. So lassen sich Artworks und Themse einfach nach installieren. Selbst ein Vollbildmodus steht zur Verfügung, perfekt fürs Streaming auf einen Handheld oder Fernseher. Übrigens, DOSBox, ScummVM und RetroArch werden auch unterstützt.

![Bottles UI](/assets/img/gaming-unter-linux/bottles.jpg){: w="450" }
_Die UI von Bottles ist übersichtlich, aber funktional (Screenshot: Markus Daams / 2025)_

## Ohne Treiber nützt das beste Game nichts

Das Thema Treiber unter Linux ist lang, sehr lang. Viele Hersteller von Hardware unterstützen Linux entweder gar nicht, oder sehr mangelhaft. Das hat dazu geführt, dass viele Treiber unter Linux von einer engagierten Community selbst geschrieben werden mussten, zum Beispiel durch „Reverse Engineering“. 

Sollen die Games aber mit der bestmöglichen Performance laufen, sind so entwickelte Treiber jedoch keine geeignete Lösung. In diesem Fall ist man dann auf die Unterstützung der Hersteller angewiesen. Die Platzhirsche hier heißen Nvidia, Radeon (von AMD) und so langsam auch Intel. 

Das Thema ist sehr komplex. Möchte ich den aktuellen Sachstand möglichst kurz und clickbait-mäßig zusammen fassen, dann so: Radeon ist unter Linux meine erste Wahl, Nvidia nur, wenn ich CUDA ganz dringend brauche. Warum ist das so?

**Radeon**: AMD war Linux schon immer etwas freundlich gesonnener. Viele Teile der Treiber waren bereits Open Source. AMD verzichtet jedoch inzwischen auf proprietäre Bestandteile und unterstützt die Open Source Treiber (Mesa). 

Dennoch sei angemerkt, dass viele neue Features wie zuletzt FSR4 nur mit Verzögerung auch im Linux Treiber landen. Es bleibt zu hoffen, dass sich das in Zukunft noch ändert.

**NVIDIA**: „Team Green“ und Linux sind keine Lovestory, das sei vorweggeschickt. Nvidia setzt primär auf seine eigenen proprietären Treiber. Man muss also erst einmal Glück haben, dass dieser unter der eigenen Distribution läuft. Tun sie es aber, ist der Performance recht gut. Auch bei NVIDIA kommen viele Features verzögert im Pinguin-Land an. Man hat aber Besserung geschworen. Es sollen mehr Komponenten in den Open Source Kernel Treiber wandern und auch wird die „Feature Parity“ angestrebt, soll heißen, die Treiber von Windows und Linux sollen zukünftig dasselbe Feature Set vorhalten. Ob und wann das passiert steht aber in den Sternen.

**Intel**: Der Dritte im Bunde hat Linux schon länger gut unterstützt. Viele Features sind bereits in den Kernel Treibe gewandert. Wie schon bei den beiden Erstgenannten kommen bestimmte Features erst später in Linux an. Die aktuelle „Battlemage“ Generation läuft mit Proton solide. 

Das ist nur ein sehr kurzer Überblick. Wer sich für einen Wechsel auf Linux interessiert, sollte sich speziell für seine Grafikkarte separat informieren. Generell lässt sich jedoch zusammenfassen, dass die Grafikkartentreiber unter Linux laufen und ständig besser werden. Es kann sogar passieren, dass Spiele besser unter Linux als unter Windows laufen [„Windows Was The Problem All Along
“ (Link zu Youtube / 7:37 Minuten)](https://www.youtube.com/watch?v=CJXp3UYj50Q)

## Brauche ich eine Gaming-Distribution

Linux Distributionen gibt es wie Sand am Meer. Dieser Umstand wird von einigen Zeitgenossen als Gegenargument angeführt, wenn es um Linux als Alternative geht. Windows ist einfach, denn es gibt nur einen Anbieter und (quasi) eine Version. Mit Linux verhält es sich anders. Es gibt für die verschiedensten Ansprüche die geeignete Distribution. Man hat die Qual der Wahl.

Und so gibt es natürlich auch Distributionen, die sich auf das Thema Gaming fokussiert haben. 

### Braucht man zwingend eine Gaming-Distribution?

Nein. Die oben genannten Tools wie Wine, Proton, Lutris und Co lassen sich auf den meisten Distributionen installieren. Da immer mehr Treiberbestandteile der Grafikkartenhersteller in den Linux Kernel wandern, ist auch dafür gesorgt.

### Wozu braucht es dann eine Gaming-Distribution?

Komfort. Gaming-Distribution vereinfachen die Installation der oben genannten Tools durch eigene Skripte, oder bringen diese gleich mit. So sind Wine und Proton bereits vorinstalliert. Einige Distributoren tweaken den Linux Kernel, um noch ein paar mehr Frames aus dem System zu quetschen. Auch lassen sich offizielle Treiber einfach per Skript installieren. Für viele Wechselwillige können solche Hilfen die ersten Schritte in der Linuxwelt vereinfachen. 

### Welche Gaming-Distributionen gibt es?

Viele. Ich möchte die Bekanntesten an dieser Stelle einmal sehr kurz und sehr knackig vorstellen:

**Nobara**: Diese Distribution basiert auf Fedora. Ein sehr engagierter Entwickler hat sich den „Hut“ geschnappt und auf Gaming optimiert. Wine, Proton, Treiber und viele Codecs werden schon direkt mitgeliefert. 

**Pop!_OS**: Es basiert auf dem bekannten Ubuntu, wurde aber speziell auf Gaming hin optimiert. Auch hier werden die wichtigsten Tools und Treiber direkt mitgeliefert. Zudem wird viel Wert auf eine intuitive UI gelegt. Es ist jedoch nicht immer top aktuell, da es auf einer LTS Version von Ubuntu basiert. LTS steht für „Long Term Support“. Diese Versionen werden für langen Support stabil gehalten, bekommen also nicht alle brandneuen und fancy Features sofort geliefert. Die wichtigsten Tools fürs Gaming werden aber immer aktuell gehalten.

**CachyOS**: Wie auch SteamOS basiert es auf Arch Linux. Warum es gerade (stand Oktober 2025) so viel Furore macht, kann ich nicht mal sagen. Der mitgelieferte Kernel wurde auf „hohe Reaktionsfreudigkeit“ optimiert. Generell wurde der Overhead sehr weit reduziert, sodass möglichst viel Speicher für Games frei gehalten wird. Zudem gibt es eine angepasste Version für Handhelds wie das Steam Deck. Der Paketinstaller  „Cachy OS Hello“ soll die Installation neuer Software und Verwaltung selbiger noch einmal vereinfachen. FPS Jäger werden den „Kernel Manager“ lieben.

## Mein Fazit

Gaming unter Linux ist kein Nischenthema mehr. Immer mehr Spiele- und Hardware-Tester haben Linux in ihre Benchmarks mit aufgenommen. Das Steam Deck ist ein riesiger Erfolg und weitere Anbieter wie Asus, MSI und Lenovo bringen eigene Handhelds heraus. Das Steam Deck ist nicht trotz, sondern wegen Linux ein tolles Gaming Device geworden. 

![Native Games unter Linux](/assets/img/gaming-unter-linux/linux-games.jpg){: w="450" }
_Es gibt übrigens auch viele (tolle!) native Games unter Linux (Screenshot: Markus Daams / 2025)_

Dennoch ist nicht alles Gold, was glänzt. Die Auswahl an Distributionen macht es Neulingen schwer, den richtigen Einstieg zu finden. Was ich persönlich als eine der größten Stärken der Linux Welt ansehe, kann sehr erschreckend wirken, wenn man immer nur ein Windows oder nur ein MacOS zu Auswahl hatte. Klar, wer wagt, gewinnt. Aber solche Bedenken sollte man ernst nehmen.

Die Treiber Situation verbessert sich, ist aber noch weit weg von optimal. Was wäre denn optimal? Meiner persönlichen Meinung sollten alle wichtigen Features direkt und zeitnah in den Kernel wandern. Die Hersteller der Hardware können dann gerne Tools wie Adrenalin (AMD) oder die NVIDIA App obendrauf setzen. 

Das Zocken an sich macht aber bereits viel Spaß. Launcher wie Steam, Epic und Co lassen sich genauso einfach wie unter Windows installieren. So auch die Spiele, denn Dank Proton laufen immer mehr Spiele „out of the box“. Diese Entwicklung haben wir der großartigen Open Source Community, aber auch Valve und CodeWeavers zu verdanken. 

Zusammenfassend möchte ich sagen: Gaming unter Linux ist möglich, macht Spaß und wird jede Woche besser. Wer es versuchen will, sollte Neugier und etwas Willen mitbringen, die eine oder andere Hürde zu überwinden. Als Belohnung winkt ein Betriebssystem, das keinem Großkonzern gehört, maximal konfigurierbar ist und kein Datenschutzalbtraum darstellt. 

Happy Gaming!

## Ressourcen

* [Nobara Linux auf Youtube (Deutsch / 9:03 Minuten)](https://www.youtube.com/watch?v=AIlxqCrLJOA)

* [CachyOS auf Youtube (Deutsch / 14:41 Minuten)](https://www.youtube.com/watch?v=pZHVPADLpfg)

* [Pop!_OS auf Youtube (Deutsch / 33:07 Minuten)](https://www.youtube.com/watch?v=KxUZ-Z3bKZg)

* [Eine Datenbank mit Games, Tipps und Tricks, die von Proton unterstützt werden](https://www.protondb.com/explore)

* [Die offizielle Website von Lutris](https://lutris.net/)

* [Die offizielle Website von Heroic Games Launcher](https://heroicgameslauncher.com/)

* [Das Github Repo vom GameHub](https://github.com/tkashkin/GameHub)

* [UMU: Das ultimative Tool zum Vereinheitlichen Ihrer Spiele unter Linux](https://de.linuxadictos.com/umu%3A-das-ultimative-Tool-zum-Vereinheitlichen-Ihrer-Spiele-unter-Linux.html)

* [Die offizielle Website von CodeWeavers](https://www.codeweavers.com/)