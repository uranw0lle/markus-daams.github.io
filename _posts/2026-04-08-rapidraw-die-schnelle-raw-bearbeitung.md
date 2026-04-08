---
layout: post
title: "Rapidraw - Die schnelle Raw Bearbeitung"
date: 2026-04-08 08:15:12 +0200
category: tools
author: 
tags: [tools, fotografie, linux, tipps]
description: "Bildbearbeitung ist immer noch 'So eine Sache' unter Linux. RapidRAW könnte das nun ändern."
image:
  path: /assets/img/post-header/header-rapidraw.jpg
  alt: Rapidraw - Die Lightroom Alternative?
---

# Schnell mal eine RAW bearbeiten

Ein Aspekt hat mir den vollständigen Wechsel auf Linux für eine lange Zeit schwer gemacht. Gemeint ist das Fehlen echter Alternativen für die Bildbearbeitung, insbesondere von RAW Dateien. Ich hatte mich sehr an Lightroom und später ON1 gewöhnt. Beides habe ich nie unter Linux zum Laufen bekommen, selbst mit der dunkelsten Wine-Magie nicht. Dennoch musste der Wechsel irgendwann sein und ich habe mich mit dem zufriedengegeben, was ich hatte. Das ist vor allem **Darktable**, eine Software, die mir einen ähnlichen Workflow bietet, wie die genannten Lieblinge aus der Windows Welt. Super happy war ich damit aber nie – proprietäre Software hat leider so ihre Stärken.

Kürzlich bin ich jedoch über **RapidRAW** gestolpert und meine stillen Gebete scheinen erhört worden zu sein. Eine Software, die sich anschickt, eine Alternative zu Platzhirschen wie Lightroom zu werden. Das ist reichlich ambitioniert, da Adobe nicht nur einige Jahrzehnte Vorsprung hat, sondern auch ein sehr erfolgreiches kommerzielles Modell betreibt. Die Macher hinter dem Konkurrenten bieten es nämlich kostenlos an, für Linux, MacOS und Windows. Sie bewerben es mit dem folgenden Claim:

> A beautiful, non-destructive, and GPU-accelerated RAW image editor built with performance in mind.
>>(Quelle: Github Repo)

Das technische Fundament besteht aus Rust und React, also scheint man es mit der Performance durchaus ernst zu meinen.

Die Feature-List ist sehr lang. Für mich wichtige Punkte werden unterstützt:

- Vollständiger RAW Support
- Nicht destruktive Bearbeitung (durch Sitecar Dateien)
- EXIF Support
- Gute Export Funktion

Dazu gesellt sich aber noch einiges mehr. Auszugsweise sind dies:

- Tone Mapping
- Color Grading
- Tool für Transformation
- Preset System
- Effekte wie Dunstentfernung, Vignette und mehr

Das liest sich wirklich beeindruckend und ist Grund genug, es mir einmal anzuschauen. Der folgende Text ist kein Testbericht, sondern die Text-gewordenen ersten Erfahrungen. 

Auf geht's. 

## Installation: Ebenfalls Rapid

Wie bereits erwähnt, werden die Betriebssysteme Linux, MacOS und Windows unterstützt. Für Mac und Windows stehen entsprechende Binaries bereit. Auch unter Linux werden viele Distributionen unterstützt, darunter Debian basierte Distris und Arch Linux. Wer, wie ich, seine Distribution in den Releases nicht wieder findet, kann auf das Flatpack zurückgreifen, welches man [im Flathub](https://flathub.org/en/apps/io.github.CyberTimon.RapidRAW) findet. Da ich den bereits in Fedora eingebunden habe, finde ich das entsprechende Paket im Paket-Manager *Discover* und kann es mit einem Klick installieren.

Die ganz Harten können es sich natürlich auch direkt aus dem Quellcode bauen. Es geht doch nichts über ehrliche und harte Compiler Arbeit.

## Erster Start, erster Blick

Der Start geht schnell vonstatten und man wird von einem simplen Startfenster begrüßt. Hier kann die Bilder Bibliothek ausgewählt werden, oder die Systemoptionen geladen werden. Das finde ich übrigens richtig gut, denn so kann man noch vor dem ersten Start der eignen Bildergalerie wichtige Einstellungen vornehmen. 

![RapidRAW - Startfenster](/assets/img/rapidraw/rapidraw-start.jpg){: width="650"}
_RapidRAW - Startfenster (Screenshot: Markus Daams / 2026)_

Hat man den Order ausgewählt, wechselt man in die Bibliotheksansicht. So, oder so ähnlich, kennt man es auch von anderen Tool, wie Lightroom und Darktable. Die Thumbnails werden sehr zügig erstellt. Einmal erstellt, laden die Thumbnails deutlich schneller. So kennt man es, so liebt man es.

![RapidRAW - Bibliotheksansicht](/assets/img/rapidraw/rapidraw-bibliotheksansicht.jpg){: width="650"}
_RapidRAW - Bibliotheksansicht (Screenshot: Markus Daams / 2026)_

Und genau hier fallen mir bereits die ersten Stärken von **RapidRAW** auf. Bereits in dieser Ansicht habe ich zahlreiche Möglichkeiten zu filtern. Ich kann gezielt nach RAWs oder anderen Dateien suchen, nach Bewertung, nach Datum usw. Ich kann auch gezielt nach Tags suchen, die ich hinterlegt habe. Dabei geht die Suche überraschend schnell zu Werke. Das gefällt mir sehr gut, denn sowohl in Darktable als auch in ON1 war die Suche nicht so schnell. 

Mal eben das ‚eine coole Bild vom Michel aus Februar 2017‘ finden und exportieren ist also möglich. Alleine dafür lohnt sich für mich bereits die Nutzung.

![RapidRAW - Leistungsstarke Suchfunktion](/assets/img/rapidraw/rapidraw-folder-options.jpg){: width="650"}
_Die Suchfunktion von RapidRAW geht sehr fix zu Werke (Screenshot: Markus Daams / 2026)_

Man kann die Suchfunktion durch automatisches Taggen noch verbessern, was jedoch erst einmal aktiviert werden muss. Da hier AI Zauberei zur Anwendung kommt, lasse ich aber erst einmal die Finger davon. Ich hatte mit dem AI Tagging von ON1 schlechte Erfahrungen gemacht. Fähren sind keine Häuser! 

## Bearbeitungsfunktionen


Die gute Suchfunktion ist für mich persönlich schon einmal ein echtes Alleinstellungsmerkmal.
Darüber hinaus bietet **RapidRAW** aber noch ein recht breitgefächertes Angebot von Bearbeitungstools an.

In den Basis-Einstellungen lassen sich Parameter wie Belichtung, Tonkurven, Bildschärfe und Körnung einstellen. Hier finden sich alle die Einstellungen, die man auch von anderen Tools her kennt. Ein Assistent passt auf Wunsch und Knopfdruck (fast) alle Werte automatisch an. Bei meinem kurzen Test ging die Automatik aber etwas zu aggressiv zu Werke, aber das ist sicher Geschmackssache. Die ermittelten Werte lassen sich ohnehin anpassen.

Ein weiteres, sehr nettes Feature ist die Unterstützung von LUTs.  

![RapidRAW - Das Bearbeitungsfenster](/assets/img/rapidraw/rapdraw-bearbeitungsfenster.jpg){: width="650"}
_Das Bearbeitungsfenster von RapidRAW ist übersichtlich, hat es aber in sich (Screenshot: Markus Daams / 2026)_

Das Crop-Tool bietet alle wichtigen Funktionen an, die man erwartet. Es lassen sich das Seitenverhältnis anpassen, die Rotation ändern und die Linsenkorrektur anwenden.

Das Anlegen und Bearbeiten von Masken geht ebenfalls schnell von der Hand. Die „Subject“ Auswahl hat sich bei mir als sehr treffsicher herausgestellt. Himmel und Vordergrund werden ebenfalls zuverlässig erkannt. Die angelegten Masken lassen sich alle separat und detailliert bearbeiten. Auch ohne viel Vorwissen ging mir das einfach von der Hand – echt klasse.

![RapidRAW - Maskentool](/assets/img/rapidraw/rapidraw-maskentool.jpg){: width="650"}
_Das Anlegen und Bearbeiten von Masken ist schnell und einfach (Screenshot: Markus Daams / 2026)_

Das „Inpainting“ habe ich mir nur kurz angeschaut. Hier geht es darum, unerwünschte Bildelemente löschen zu können. Das soll per AI funktionieren. Habe ich keinen externen Dienst verbunden, soll dies lokal passieren. Ich verzichte auf externe Dienste und kann daher nicht bewerten, wie gut das alles funktioniert. Die lokale Bearbeitung ist nett, aber nicht überragend. Objekte werden zwar gelöscht, aber es bleiben bestimmte Artefakte zurück.

![RapidRAW - Eraser vor der Entfernung](/assets/img/rapidraw/rapidraw-eraser-vorher.jpg){: width="650"}
_Die Dalbe soll für einen Test verschwinden (Screenshot: Markus Daams / 2026)_

![RapidRAW - Eraser nach der Entfernung](/assets/img/rapidraw/rapidraw-eraser-nachher.jpg){: width="650"}
_Teile der Dalbe und der Schatten sind noch zu sehen (Screenshot: Markus Daams / 2026)_

Ich habe das noch bei anderen Objekten probiert, jedoch keine besseren Ergebnisse produziert. Ob das mit einer externen AI besser funktioniert, kann ich jedoch nicht bewerten. Für mich ist dies aber auch nicht weiter tragisch, denn ich nutze solche Tools sehr selten.

Zu guter Letzt lassen sich auch noch Presets anlegen. Wer also die perfekten Einstellungen gefunden hat, kann sie hier speichern und lassen. Dazu gesellen sich aber noch Community Presets. So etwas kenne ich bisher nur von kommerziellen Lösungen. Ich habe sie mir kurz einmal angeschaut und wenn auch die Auswahl noch nicht groß ist, sind nette Presets dabei. Dabei werden für die Vorschau vier Bilder aus der Fotorolle geladen – ein sehr nettes und praktisches Feature. 

![RapidRAW - Community Presets](/assets/img/rapidraw/rapidraw-communitpresets.jpg){: width="650"}
_Presets gibt es auch von der Community. Oder man legt sich selbst welche an (Screenshot: Markus Daams / 2026)_

Eine Exportfunktion darf natürlich auch nicht fehlen. Über die kann ich nicht so viel berichten, außer dass sie schnell und zuverlässig funktioniert. Ich kann auch mehrere RAWs in die verschiedensten Formate exportieren, Presets anwenden, Meta-Daten ‚on the fly‘ anpassen oder entfernen, Dateinamen anpassen, Wasserzeichen einfügen und mehr. Der Export ist flexibel und schnell. 

## Eine erste Einschätzung

Ein Fazit will ich an dieser Schnelle noch nicht ziehen, dafür habe ich **RapidRAW** noch nicht ausreichend genutzt. Eines kann ich aber jetzt schon einmal sagen: Das Rapid im Namen ist verdient. Selbst als vorkompiliertes Flatpack rennt das Tool geschmeidig durch CPU und RAM.

Die Suchfunktion sticht für mich dabei aktuell heraus, denn so etwas habe ich unter Linux bisher vermisst. Wenn man über 10 Jahre Fotos durchsuchen muss, freut man sich über jedes bisschen Performance und die wird hier geliefert. Ich muss die Suchfunktion auch nicht umständlich in der UI heraussuchen und erst einmal richtig konfigurieren. Sie steht mir sofort und mit einem Klick zur Verfügung.

Die Bearbeitungsfunktionen sind nützlich und ich habe die für mich wichtigsten Einstellungen griffbereit. Fotos lassen sich also nicht nur schnell suchen und finden, ich kann sie auch fix bearbeiten und exportieren, ohne auf eine externe Anwendung zurückgreifen zu müssen. Das Maskierungstool hat mich positiv überrascht, da Objekte zuverlässig erkannt werden. Das intelligente Löschen selbiger hat bei mir aber zu keinen befriedigenden Resultaten geführt. Das ist für mich aber verschmerzbar und wenn ich Zeit und Muße finde, versuche ich die Verbindung zu einem externen AI Tool.

Zudem will ich auch nicht verheimlichen, dass das Tool immer wieder einmal abgestürzt ist. Auf einer meiner Maschinen ist es zuverlässig bei der Auswahl eines Objekts mit dem Inpainting Tool abgeschmiert und hat das ganze Betriebssystem mit sich gerissen. Auf einem anderen Computer ist das nicht passiert. Ich habe keine detaillierte Fehlersuche durchgeführt, es kann also auch am Client liegen, ich weiß es nicht. 

**RapidRAW** ist kostenlos und soll dies auch bleiben. Für ein kostenloses Tool ist es überraschend leistungsstark und ein echtes Ausrufezeichen für die Open-Source-Community. Ich will aber noch kein endgültiges Urteil fällen, das wäre bei dem kurzen Testzeitraum nicht fair. Zudem befindet es sich in aktiver Weiterentwicklung, auf dem Github Repo geht viel vor sich.

Wer  unter Linux ein Tool sucht, dass sich so ein bisschen wie Lightroom anfühlt, sollte **RapidRAW** unbedingt einmal ausprobieren.

## Ressourcen

* [RapidRAW Github Repo](https://github.com/CyberTimon/RapidRAW)

* [RapidRAW auf Flathub](https://flathub.org/en/apps/io.github.CyberTimon.RapidRAW)