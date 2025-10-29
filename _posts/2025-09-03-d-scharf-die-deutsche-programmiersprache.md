---
layout: post
title: "D Scharf - Die deutsche Programmiersprache"
date: 2025-09-03 10:09:47 +0200
category: coding
author: 
tags: [coding, satire, text]
description: "Die Zeit ist gekommen für eine unangenehm deutsche Programmiersprache. 'D Scharf' ist hier"
image:
  path: /assets/img/post-header/header-d-scharf.jpg
  alt: D Scharf - Die Lösdung für ein Problem, das niemand hatte.
---

## Echt jetzt?

Wir leben in einer Welt der Anglophonie. Die englische Sprache greift um sich wie die Tentakeln eines Oktopus in einem Film der Erwachsenenunterhaltung aus Japan. Selbstredent trifft dies auch auf die Welt der Programmiersprachen zu.

Es wird Zeit, das zu ändern. In diesem Artikel geht es um die Struktur meiner neuen Programmiersprache „D Scharf“. Sie lehnt sich grob an der bekannten Sprache „C#“ (gesprochen C Sharp) an. Dabei unternehme ich den Versuch, die eleganten Elemente von Java mit der Torfigkeit von Python und der unangenehmen Penetranz von JavaScript zu vereinen. Dabei ist mir aber wichtig, dass sich wichtige kulturelle Elemente aus Deutschland in dieser neuen Sprache wieder finden. Darunter unser Fetisch für Bürokratie und ausufernden Verwaltungsvorschriften. 

In diesem Artikel will ich einen kurzen Überblick über die Struktur der Sprache geben und auch einige Kodier-Beispiele einfügen. Die Sprache befindet sich aktuell noch in der Frühphase der Entwicklung, des behördlichen Genehmigungsverfahrens und einer umfassenden Umweltverträglichkeitsprüfung durch die Bundesbehörden, der EU und den Vereinten Nationen. 

Fangen wir an.

## Grundlegende Elemente

Da es sich um eine deutsche Programmiersprache handelt, muss sie sich ein paar Neuerungen verweigern. Es ist also eine klassische „Einzelfaden“ (Single Thread) Sprache. Wir lassen also getrost alle Zentralprozessorkerne links liegen, bis auf den einen Kern, auf dem unsere Anwendung laufen wird. Es wird aber eine Lösung bereitgestellt werden, um mehrere Prozesse parallel laufen zu lassen.  

Zunächst beginnen wir mit den Grundlagen.

### Importe

Importe werden mit dem Schlüsselwort **importiere** begonnen. Mit dem Wort **als** kann ein Alias für den Import festgelegt werden. 

> Wichtig: Es gibt keine reservierten Schlüsselwörter. Man kann also alle Wörter auch als Variablennamen verwenden und totales Chaos auslösen. Auf diesem Wege ist man gezwungen, gehorsam zu programmieren und sich zu konzentrieren! 
{: .prompt-warning}

Wichtige Elemente wie die Texteingabe und Ausgabe müssen selbstverständlich erst importiert werden. Möchte man Text über die Kommandozeile ein- und ausgeben, muss die entsprechende Standardbibliothek importiert werden. 

Das sieht ungefähr so aus:

```Code 
importiere StdEingAusg aus StandardBibliothek als StdBibl
```
Die jeweiligen Bibliotheken bringen dann Methoden mit, die sich fortan nutzen lassen. Bevor wir uns dies genauer anschauen, blicken wir zunächst einmal auf die Datentypen.

### Datentypen

Beispiele für Datentypen sind:

* ``BoolscherDatenTyp`` = Ein Wert, der entweder wahr oder falsch ist.
* ``Zeichenk`` = Eine beliebig lange Zeichenkette, die aus allen UTF-8 Zeichen bestehen kann.
* ``Ganzz`` = Eine Ganzzahl
* ``FließkomZahl`` = Eine Fließkommazahl
* ``FließkomZahlDopGenau`` = Eine Fließkommazahl mit doppelter Genauigkeit
* ``Datenstr`` = Eine Datenstruktur, vergleichbar mit einem Array

## Ein erster Code

Wir haben nun bereits die Grundlagen, um einen ersten Quelltext zu schreiben. So würde eine einfache Text Ein- und Ausgabe erfolgen.

```console
importiere StdEingAusg aus StandardBibliothek als StdBibl

Neue Zeichenk = NameDesBenutzers.
NameDesBenutzers = "Leer".

NameDesBenutzers = StdBibl.Konsoleneingabe
StdBibl.DruckeAus(NameDesBenutzers)
```

**Erklärung:** Durch den Import bekommen wir Zugriff auf die Methoden in der Standard Bibliothek. Durch `Neue Zeichenk` initialisieren wir eine neue Variable, in der wir die Texteingabe aufnehmen. Anschließen muss diese neue Variable sofort belegt werden. Erfolgt dies nicht, gilt die Variable als undefiniert. Der Kompilierer würde dies mit folgender Fehlermeldung quittieren: `Fehler in Zeile 4: Direkter Verstoß gegen die interne Richtlinie zur Behandlung von neu initialisierten Variablen. Kompiliervorgang wird abgebrochen. Ein ausführliches Fehlerprotokoll wurde in /sonstiges/Report/Fehlerreport/Verstöße/Fehler.prot abgelegt, welches umgehend zu lesen ist.`

Die Variable `NameDesBenutzers` wird durch die `StdBibl.Konsoleneingabe` abgefangen. Durch `StdBibl.DruckeAus` kann dieser Wert dann ausgegeben werden.

## Schleifen

Bisher haben wir nur einfache Texteingabe und die Ausgabe praktiziert. Eine gute Programmiersprache ist aber nichts, ohne schöne Schleifen. **D Sharf** kann natürlich auch hier weiter helfen. Die Struktur richtet sich grob an bereits existierenden Schleifen aus. Allerdings ist es wichtig zu wissen, dass Schleifen ebenfalls importiert werden müssen. 

```console
importiere SchleifenBibliothek als SchlBibl
importiere StdEingAusg aus StandardBibliothek als StdBibl

Neue Ganzz = Iterator
Iterator = 0

Solange (Iterator = 0; Iterator < 10; Iterator = Iterator + 1) {
    tue {
        StdBibl.DruckeAus(Iterator)
    }
    sonst {
        verlassen
    }
}
```

**Erklärung:**  Zunächst werden die benötigten Bibliotheken importiert. Für den Iterator legen wir einen neue `Ganzz` (Ganzzahl) Variable an, welche wir umgehen belegen, um nicht gegen die internen Richtlinien zu verstoßen. Die Schleife beginnt mit `Solange`. In Klammern dahinter wird die Bedingung definiert, innerhalb derer die Schleife ihre Gültigkeit bestitzt. Mit `tue` wird dann die Aufgabe der Schleife definiert. In diesem Fall erfolgt die Ausgabe des aktuellen Iterators. Die Schleife muss in jedem Fall einen `sonst` Fall enthalten. Dies kann, wie im Beispiel zu sehen, auch nur der Abbruch der Schleife (`verlassen`) sein. Da unsere Schleife aber ihre Bedingung in jedem Fall erfüllt, wird dieser Fall nie erreicht werden. 

Auch Entscheidungsfälle lassen sich mit **D Scharf** abbilden.

```console
importiere SchleifenBibliothek als SchlBibl
importiere StdEingAusg aus StandardBibliothek als StdBibl

Neue BoolscherDatenTyp = BoolDt
BoolDt = WAHR

Wenn (BoolDt = WAHR) {
    StdBibl.DruckeAus("Der geprüfte wird wurde auf Warheit getestet. Das Ergebnis ist positiv")
} sonst {
    StdBibl.DruckeAus("Der geprüfte wird wurde auf Warheit getestet. Das Ergebnis ist negativ")
} andernfalls {
    verlassen
}
```
**Erklärung:** Bei den `Wenn` Schleifen lassen sich Werte von zum Beispiel Boolschen Datentypen (`BoolscherDatenTyp`) auf Wahrheit testen. Die `Wenn` Schleife braucht immer einen `sonst` Fall und einen `andernfalls` Fall. Ansonsten kommt es zu einer Fehlermeldung. Die kann zum Beispiel so aussehen: `Fehler in Zeile 7: Direkter Verstoß gegen die internen Richtlinien. Der Wenn-Fall wurde unsachgemäß konstruiert und wurde aufgrund dieser Nachlässigkeit vorzeitig beendet. Ein ausführliches Fehlerprotokoll wurde in /sonstiges/Report/Fehlerreport/Verstöße/Fehler.prot abgelegt, welches umgehend zu lesen ist.`

## Asynchroner Code

Da „D Scharf“ eine Einzelfaden-Sprache ist, werden die kodierten Aufgaben ordnungsgemäß der Reihe nach abgearbeitet. Schwierig wird es dann, wenn eine der Aufgaben verzögert ausgeführt werden muss, weil man zum Beispiel auf die Antwort eines im Netz befindlichen Applikationsdatenschnittstelle (API) warten muss. Für solche Fälle bietet „D Scharf“ die `Versprechen` an. Mit diesen lassen sich Fälle konstruieren, die zeitlich asynchron erfolgen. 

Der folgende Code zeigt eine Datenabfrage einer  Applikationsdatenschnittstelle.

```console

importiere VersprechenBibliothek als VersLib
importiere StdEingAusg aus StandardBibliothek als StdB

Neue Zeichenk = >InternetAdresseDatenschnittstelle
>InternetAdresseDatenschnittstelle = 'https://applikationsdatenpunkt.üw/daten/verwaltungsvorschriften/ausallerwelt/eisenbahnbenutzungsverordnung_aegypten_1965.json'

Neue Zeichenk = Ladung
Ladung = "Leer"

Versprechen(>InternetAdresseDatenschnittstelle) &=> {
    .dann(
        Ladung = Antwort(>InternetAdresseDatenschnittstelle)
        StdB.DruckeAus(Ladung)
    )
    .fallsNicht (
        verlassen
    )
    .fehler(f)(
        StdB.DruckeAus(f)
    )   
        
}
```

**Erklärung:** Hier zeigt sich die ganze Eleganz dieser neuen Sprache. Die `VersprechenBibliothek` stellt die Möglichkeit zur Verfügung, Kodierungen asynchron auszuführen. Zunächt initialisieren wird zwei Variablen. Eine nimmt die Internetadresse der Applikationsdatenschnittstelle auf, die andere wird die Rückmeldung (meist JSON) aufnehmen. 
Das `Versprechen` wird eingeleitet und es wird versucht, im `dann` Fall die `Antwort` in die `Ladung` zu übertragen. Klappt dies nicht, wird der `fallsNicht` Fall ausgelöst. In diesem Fall verlassen wir den Versprechen-Block. Im Falle einer Fehlermeldung wird der `fehler` Fall ausgelöst. 

## So weit, so gut

Damit schließe ich die Einführung in „D Scharf“, die deutsche Programmiersprache. Aktuell wird fieberhaft daran gearbeitet, einen Kompilierer zu programmieren. Dies gelingt aber erst, wenn das Limit von ChatGPT abgelaufen ist.

Die Sprache wird laufend um neue Funktionen erweitert. Von Polymorphismus bis Mehrfachvererbung ist alles dabei, was sich vermutlich niemand wirklich wünscht. Jedoch lassen sich viele Funktionen aufgrund komplexer Genehmigungsprozesse und Verträglichkeitsprüfungen nicht mehr hinzufügen, oder entfernen. 

Mit dem endgültigen Release wird im Jahr 2044 gerechnet, vorbehaltlich einer Zulassungsgenehmigung durch das Bundesamt für Programmiersprachen (BaPi) und dem Veterinäramt in Köln.  

## Ressourcen

* [Fart Lang](https://fartlang.org/)

* [Chicken](https://en.wikipedia.org/wiki/Chicken_(Scheme_implementation))

* [Ook](https://www.dangermouse.net/esoteric/ook.html)

* [Velato](https://velato.net/)