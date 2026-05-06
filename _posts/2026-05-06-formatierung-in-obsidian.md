---
layout: post
title: "Formatierung in Obsidian"
date: 2026-05-06 07:20:01 +0200
category: tipps 
author: 
tags: [quicktipp, tipps, tools]
description: "Markdown ist toll. Aber GFM und HTML sind toller. Entfesseln wir die Macht der Formatierung in Obsidian."
image:
  path: /assets/img/post-header/header-obsidian-formatierung.jpg
  alt: Die Macht der Formatierung in Obsidian 
---

# Am Anfang war Markdown

In [meinem Artikel über Obsidian](https://markus-daams.com/posts/wissen-und-notizen-verwalten-mit-obsidian/) habe ich mein neues und ultimatives Tool der „Wissenschaosverwaltung“ vorgestellt. Was als kurzer Test begann, ist inzwischen eine feste Institution bei mir geworden. Ich habe Obsidian auf all meinen Clients installiert und nutze es sehr gerne. All meine kleinen Wissensfetzen wie wichtige Konsolenbefehle, die Struktur meines Heimnetzwerkes und die „Das muss ich unbedingt noch erledigen“ Liste befinden sich alle an einem Ort.

Eine besondere Stärke von Obsidian ist, dass es die einzelnen Notizen nicht in einem eigenen und proprietären und im schlimmsten Fall verschlüsselten Format speichert, sondern in einfachem Plain-Text Markdown Dateien. Ich könnte diese Dateien also einfach mit zur nächsten App mitnehmen, wenn ich das wollte. In Zeiten des ungezügelten Turbokapitalismus ist das eine wohltuende Abwechslung.

Dabei bleibt es mir überlassen, ob ich Markdown überhaupt verwenden möchte oder nicht. Es zu lernen ist wirklich nicht schwer, aber zur Not kann ich in Obsidian auch einfachen Text verwenden, ganz ohne Firlefanz. Die ``.md`` Dateien lassen sich in praktisch jedem Texteditor öffnen und bearbeiten. Aber das Auge liest bekanntlich mit und dank Markdown ist es mir möglich, die Notizen auch visuell ordentlich zu strukturieren. Überschriften, fetter Text und Aufzählungszeichen sind nun einmal die Grundnahrungsmittel für eine ansehnliche Notiz.

Obsidian geht aber noch einen kleinen Schritt weiter. Wer mehr Möglichkeiten der Formatierung braucht, wie Tabellen oder Checkboxen, wird mit einfachem Markdown nicht mehr weiter kommen. Und hier betreten nun zwei weitere Stars die Bühne. Zum einen ist das **GFM** – Github Flavoured Markdown – und gutes altes **HTML**.

In diesem Artikel möchte ich beide Möglichkeiten einmal kurz vorstellen.

## Eines noch vorweg

Wie bereits erwähnt, ist die Stärke von Obsidian, dass die angelegten Dateien mobil sind. Ich kann sie also in jede Notizen-App mitnehmen, die Markdown unterstützt. Sobald man damit anfängt, Magie zu nutzen, also spezielle Formatierungen, Datenstrukturen usw., geht dieser Vorteil recht schnell flöten. Mag Obsidian noch HTML unterstützen, tut es das die nächste App vielleicht nicht mehr. Genau so verhält es sich auch mit GFM. Zudem lässt sich Obsidian mit zahlreichen Add-ons ordentlich aufbohren, die noch mächtigeres Hexenwerk ermöglichen.

Daher empfehle ich, nicht sofort den Turbo zu zünden und den Einsatz von solchen Formatierungsmöglichkeiten von der unbedingten Notwendigkeit abhängig zu machen. Nicht jedes Kuchenrezept braucht HTML und CSS um Sinn zu ergeben. Es kann halt passieren, dass die Lieblings-App irgendwann die Segel streicht und im digitalen Nirvana verschwindet. Dann freut man sich über einen Haufen Dateien, die nicht in alttestamentarischen Syntax Hieroglyphen verfasst sind.

Aber wir sind hier alle erwachsen und wissen was wir tun, oder? Also los geht es.

## Markdown mit GitHub Geschmack


Bei GitHub hat man sich irgendwann gedacht, dass Markdown zwar cool ist, es aber noch cooler sein könnte. Wer einmal auf GitHub unterwegs war, wird festgestellt haben, das so manches Repository eine echt fancy ``Readme.md`` vorzuweisen hat. Da werden in schicken Tabellen die eigenen Features vorgestellt und in noch schickeren Code-Blöcken die Schnipsel präsentiert, mit denen man das Projekt auf dem eigenen System zusammen kochen kann. Ein Beispiel hierfür ist die [Projektseite von Themer](https://github.com/mjswensen/themer#readme).

So etwas ist mit normalem Markdown nicht mehr möglich. GitHub hat hier aber dankenswerterweise keine neue Syntax aus dem Boden gestampft und in alle Unkenntlichkeit weiterentwickelt – looking at you, YAML – sondern Markdown um ein paar sinnvolle Features erweitert. Diese sind so sinnvoll, dass weitere Tools damit begonnen haben, diese Erweiterungen zu unterstützen. Wer also Markdown bereits beherrscht, lernt ein paar Dinge dazu und kann noch mehr machen. Wie cool ist das denn?

Die offiziellen Specs zu GFM finden sich [unter diesem Link](https://github.github.com/gfm/). Und so sehen die Erweiterungen aus.

### GFM: Strike Through

Manchmal möchte man einen Text löschen, ohne ihn zu löschen. Gemeint sind Textstellen, die nicht mehr aktuell sind, aber aus dokumentarischen Gründen erhalten bleiben sollen. Hier kommt der durchgestrichene Text ins Spiel. Erzeugt wird dieser mit dem Tilde-Zeichen. Auf einer deutschen Tastatur wird dieses mit der Tastenkombination ``AltGr + *`` erzeugt. Und so wird aus:

``~~Um Himmelswillen, das kann ich so nicht schreiben~~``

durch GFM:

~~Um Himmelswillen, das kann ich so nicht schreiben~~

### GFM: Tabellen

Tabellen sind nützlich und in Form von Excel haben sie sich zur tragenden Säule der menschlichen Zivilisation entwickelt, behaupte ich jetzt einfach mal. Einfaches Markdown kennt aber keine Tabellen und will man diese anlegen, wird man die Tab-Taste und Leerzeichen entschieden zu oft verwenden. Das Ergebnis wird dann, so oder so, hässlich.
GFM hat sich auch diesem Problem angenommen und Tabellen lassen wie folgt erzeugen:

``` markdown
| Überschrift 1 | Überschrift 2 | 
| ----------- | ----------- | 
| Zelle 1     | Zelle 2     |
```

Das sieht umgewandelt dann so aus:

| Überschrift 1| Überschrift 2| 
| ----------- | ----------- |
| Zelle 1     | Zelle 2     |

Obsidian rendert die Tabelle praktischerweise so, dass ich sie dann ohne Markdown weiter bearbeiten kann, wie ich es zum Beispiel von Excel her kenne.

![Eine gerenderte Tabelle in Obsidian](/assets/img/obsidian-formatierung/tabellen-in-obsidian.jpg){: width="500"}
_Eine gerenderte Tabelle in Obsidian (Screenshot: Markus Daams / 2026)_

Zugegeben, Tabellen brauchen etwas Übung, bis man diese intuitiv verwenden kann. Trotzdem sind sie eine tolle Erweiterung und auch ohne HTML nutzbar.

### GFM: Aufgabenliste: Check

Aufgabenlisten sind ebenfalls etwas, was sich in Markdown nur umständlich anlegen lassen. Man kann sich mit eckigen Klammern weiter helfen also mit ``[ ]``. Schicker wäre es doch, wenn man was zum Anklicken hätte. Das hat man sich bei GitHub ebenfalls gedacht und die Checkliste implementiert. Diese lässt sich mit GFM wie folgt umsetzen:

``` markdown

- [ ] Erledigt
- [ ] Muss ich noch tun

```

Obsidian wandelt den Code um und ich habe meine Checkliste. Weitere Aufgaben lassen sich dann per Enter hinzufügen, also kein GFM mehr nötig.

![Obsidian - Checkliste mit GFM](/assets/img/obsidian-formatierung/checkliste-in-obsidian.jpg){: width="500"}
_So sieht die mit GFM erstellte Checkliste in Obsidian aus (Screenshot: Markus Daams / 2026)_

### Syntax Highlighting

Wirklich cool wird es mit GFM, wenn man stolz seinen Quellcode präsentieren möchte. In Markdown lässt sich Python und JavaScript nicht sinnvoll formatieren. So etwas ist auf GitHub aber zwingend notwendig, der Laden dreht sich schließlich um Code. Die Lösung lautet Syntax Formatierung und Highlighting durch GFM. So sieht es aus, wenn ich in GFM Python Code schreibe:

{% raw %}
<pre>
``` python
def check_alter(alter):
    if alter >= 18:
        print("Du bist sowas von volljährig.")
    else:
        print("Du bist viel zu minderjährig.")

alter = 25
check_alter(alter)
```
</pre>
{% endraw %}

Das sieht dann so aus:

``` python
def check_alter(alter):
    if alter >= 18:
        print("Du bist sowas von volljährig.")
    else:
        print("Du bist viel zu minderjährig.")

alter = 25
check_alter(alter)
```

Man beachte, dass auch die Einrückungen übernommen werden. Das ist gerade bei Python sehr wichtig. Es wird nicht nur die verwendete Sprache angezeigt, Keywords der Syntax werden hervorgehoben. Ein weiteres Beispiel mit JavaScript:


{% raw %}
<pre>
``` js
function checkAlter(alter) {
    if (alter >= 18) {
        console.log("Du bist volljährig.");
    } else {
        console.log("Du bist noch minderjährig.");
    }
}

let alter = 25;
checkAlter(alter);
```
</pre>
{% endraw %}

Angezeigt wird das dann als:

``` js
function checkAlter(alter) {
    if (alter >= 18) {
        console.log("Du bist volljährig.");
    } else {
        console.log("Du bist noch minderjährig.");
    }
}

let alter = 25;
checkAlter(alter);
```
So zeigt Obsidian die beiden Beispiele an:

![Gerenderter Code in Obsidian](/assets/img/obsidian-formatierung/gerenderter-code-in-obsidian.jpg){: width="500"}
_So sieht ein Code Block in Obsidian aus (Screenshot: Markus Daams / 2026)_

Unterstützt werden hier viele Sprachen, darunter auch Markdown selbst.

## Den HTML Turbo zünden

Für die allermeisten Notizen reichen Markdown und GFM bereits aus. Allerdings ist man bei Obsidian noch einen Schritt weiter gegangen und hat auch HTML / CSS implementiert. Wer beides beherrscht, kann seine Notizen völlig entfesseln. Das kann von praktisch bis völlig sinnlos sein. Ich zeige einmal ein paar praktische Beispiele.

Für sehr lange Notizen mit mehreren Unterpunkten kann Ausklapptext sinnvoll sein. Markdown kennt so etwas nicht, HTML schon.  

{% raw %}
<pre>
&lt;details&gt;
  &lt;summary&gt;Klick mich&lt;/summary&gt;
  Langer Text zum Ausklappen
&lt;/details&gt;
</pre>
{% endraw %}

Dieser Code wird von Obsidian ausgewertet und umgewandelt. Mit diesem Code erzeugt man einen Ausklapptext.

<details>
  <summary>Klick mich</summary>
  Langer Text zum Ausklappen
</details>


Wer Texte ohne Tablle strukturieren möchte, kann sich dank HTML zum Beispiel mit ``<div>`` weiter helfen. Das sieht dann so:

![Obsidian - Textformatierung per div-Element](/assets/img/obsidian-formatierung/obsidian-html-div.jpg){: width="500"}
_Mit dem div Element können Texte strukturiert werden (Screenshot: Markus Daams / 2026)_

Wie man an diesem Beispiel bereits sieht, wo HTML ist, ist CSS nicht weit. Markdown bietet für Styling kaum Optionen an. Möchte man seine Texte mit zum Beispiel Farben aufwerten, ist das mit HTML und CSS möglich. 

![Obsidian - Textstyling mit CSS](/assets/img/obsidian-formatierung/obsidian-textstyling-mit-css.jpg){: width="500"}
_Mit dem div Element können Texte strukturiert werden (Screenshot: Markus Daams / 2026)_


> Zu beachten ist, dass einige HTML Elemente nur im View-Moduns (STRG + E) sichtbar sind und ansonsten nur als Code angezeigt werden.
{: .prompt-info}

## Fazit

Die vorgestellten Möglichkeiten um Notizen in Obsidian zu formatieren erweitern das normale Markdown bei weitem, fügen aber auch einiges an Komplexität hinzu. Wer neu im „Notizen Business“ ist, sollte vielleicht erst einmal bei einfachem Markdown bleiben. Mit etwas Übung hat man die Zeichen zur Textformatierung schnell auswendig gelernt und kann seine Texte entsprechend aufhübschen.

GFM ist eine praktische Erweiterung und wird dankenswerterweise auch von Obsidian unterstützt. Seien wir mal ehrlich, eine Welt ohne Tabellen ist möglich, aber unstrukturiert. Mein persönliches Highlight ist das Syntax Highlighting (der kam flach, ich weiß). Da ich für mein Heimnetz einiges an Code dokumentieren muss, kommt es mir sehr gelegen. Auf diesem Wege kann ich zum Beispiel den Inhalt von wichtigen Konfigurationsdateien dokumentieren und habe diesen im View Modus von Obsidian sogar kopierfähig. Mit HTML und CSS kann ich auf Wunsch dann völlig eskalieren und erschaffe nicht mehr nur strukturierte Notizen, sondern Kunstwerke.

Es kommt jedoch sehr auf den Anwendungszweck an. Nur, weil ich eine Tabelle mit HTML erstellen kann, muss ich es nicht zwingend tun, wenn GFM dies bereits tut. Der Inhalt der Textdateien gibt die Formatierung vor. Ein Kochrezept lässt sich sehr gut mit einfachem Markdown anlegen. Die Formatierung sollte so simpel wie möglich gehalten werden. Die Chance, dass das Obsidian Projekt von bösen Aliens aus der Timeline gelöscht wird, ist extrem gering, aber leider niemals Null. Wenn ich dann mit meinen Textdateien da stehe, werde ich froh sein, wenn ich diese mit geringem Aufwand in ein neues Tool übernehmen kann. Markdown ist am weitesten verbreitet, GFM setzt sich langsam durch und HTML ist in Notiz-Apps ein Sonderling.

Trotzdem wollte ich mit diesem Artikel einmal aufzeigen, was in Obsidian alles möglich ist. Mir ist bewusst, dass man mit entsprechenden Add-ons noch wesentlich wilder unterwegs sein kann. Das ist aber ein Thema für einen anderen Artikel.

## Ressourcen

* [Markdown Cheat Sheet auf quickref.me](https://quickref.me/markdown)

* [GitHub Flavoured Markdown](https://github.github.com/gfm/)

* [HTML Content in Obsidian](https://obsidian.md/help/html)