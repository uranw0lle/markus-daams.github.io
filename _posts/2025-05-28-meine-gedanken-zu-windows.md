---
layout: 
title: "Meine Gedanken zu Windows"
date: 2025-05-28 09:14:30 +0200
category: gedanken
author: 
tags: [linux, windows, gedanken, text]
description: "Ich lebe in einer komplizieten Dreier-Beziehung mit Linux und Windows. Aber muss das sein?"
image:
  path: /assets/img/post-header/header-meine-gedanken-zu-windows.jpg
  alt: Meine Gedanken zu Windows
---

# Windows, wir können ja Freunde bleiben

Ich hoffe sehr, der folgende Text gerät nicht zu einem Rant, denn den habe ich eigentlich gar nicht im Sinn. Letztes Wochenende habe ich auf einem meiner Laptops Fedora 42 installiert. Damit läuft nun Linux auf drei meiner vier Computer. Da war es dann auch an der Zeit mal wieder darüber zu reflektieren, wie ich zu den jeweiligen Betriebssystemen stehe und warum ich Microsoft immer öfter den Laufpass gebe. 

Doch bevor ich ins Detail gehe, will ich über meinen Einstieg in die Linux-Welt berichten.

## Linux war irgendwie schon immer da

Meinen allerersten Kontakt zu Linux hatte ich auf dem Laptop eines Klassenkameraden. Er hatte auf einer alten Möhre Mandrake Linux installiert und es war Liebe auf den ersten Blick. Denn damals gab es eigentlich nur Windows XP und was auch immer Cupertino sich ausgedacht hatte. In Zeiten von langsamen Internetverbindungen konnte ich selbst aber keine ISO herunterladen. Daher bestellte ich mir von Ebay eine DVD mit SuSE Linux 8.1 nebst Handbuch und begann mein Linux Abenteuer, welches mich zu vielen weiteren Distributionen führen sollte.

Linux weckte meinen Basteltrieb und ich habe mir gerne mal eine komplette Nacht um die Ohren geschlagen, nur um eine Infrarot-Verbindung zwischen meinem Laptop und meinem Handy hinzubekommen. Mit Linux war so etwas möglich und ich habe in dieser Zeit fast alles über Computer gelernt, was ich wissen musste. Aber dennoch schielte ich immer wieder auf Windows. Denn obwohl XP mitunter sehr fehlerbehaftet war, war es in seiner Gesamtheit halt einfacher zu bedienen. Besonders, wenn man Gamer war. 

## Fast forward: Windows 7

Mit Windows 7 kam ich dann zurück in die Arme von Redmond. Dieses Betriebssystem war meiner Meinung nach gelungen. Es war nicht so aufgebläht wie Vista, die Funktionen beschränkten sich auf das Nötigste und mit Diensten wie *OneDrive* kam auch neuer Komfort hinzu. Ohne viel installieren oder einrichten zu müssen, konnte ich Files über mehrere Computer hinweg synchron halten und nutzen.

Microsoft begann zudem, in meinen Augen, immer mehr richtigzumachen. Anstatt Linux und Open Source im Allgemeinen auf allen Ebenen zu bekämpfen und zu verteufeln, begann man sich mit diesem Ökosystem zu verbinden. Man bot Linux auf der eigenen Azure Plattform an, beteiligte sich an der Treiberentwicklung und hat sogar selbst Open-Source-Software entwickelt. Tatsächlich schreibe ich diesen Artikel in VS Code, einer quelloffenen Entwicklung von Microsoft. 

Das war eine Zeit, in der ich Linux nur noch sehr sporadisch nutzte. Windows 7 bot eine Leichtigkeit, die man besonders dann schätzen lernte, wenn Computer nicht länger Spielzeug sein sollten, sondern – leider – auch Arbeitsmaschinen. Ich wurde älter und die Anforderungen an einen Computer änderten sich. 

## Es war wohl zu schön, um es so zu lassen

Und dann begann man sich in Redmonds zu verrennen. Immer wieder und immer weiter.

Mit Windows 8 wollte man die Oberfläche für PC und Tablets vereinen, was gründlich misslang. Windows 8.1 hat die gröbsten Fehler wieder ausgebügelt. Windows 9 hat man sich direkt geschenkt und mit Windows 10 ist der alte Desktop dann endgültig zurückgekommen. Das alles habe ich noch geduldig mitgemacht, denn Windows half mir weiterhin, mich auf alle die Dinge zu konzentrieren, die mir wichtig waren.

## Der Deal war immer klar

Für mich sah der Deal immer so aus: Ich gebe Microsoft etwas Geld und ein paar meiner Daten und bekomme im Gegenzug ein moderndes Betriebssystem, welches laufend aktualisiert wird. Windows XP hat das „nach Hause telefonieren“ begonnen und die Nachfolger haben dies munter fortgesetzt. 

Bei Windows 11 muss ich aber sagen: Holla die Waldfee! Windows kabelt wirklich viel in die Heimat:

![Windows Telemetrie in Pi-hole](/assets/img/windows/pi-hole-top-blocked-domains.jpg)
_Glückwunsch zu den Plätzen 2, 3, 4, 5 und 6 geht an Microsoft in der Telemetrie-Olympiade._

Der Deal scheint sich irgendwie und von mir unbemerkt deutlich zugunsten Redmonds verschoben zu haben.

## Der Deal stimmt nicht mehr

*OneDrive* schiebt ungefragt alles in die Cloud, was es in die digitalen Griffel bekommt. So ist es dann auch passiert, dass die komplette Installation von Starfield (immerhin 120 GB), welches ich mir über den Game-Pass gezogen habe, nach dem Download und der Installation wieder in meinen *OneDrive* hoch geladen wurde. Klar, das Installationsverzeichnis kann man ändern. Aber warum war das in diesem Fall die Standardeinstellung?

Als Microsoft den neuen Edge auf Chromium Basis vorstellte, war ich durchaus begeistert. Die Rendering Engine (diese erzeugt aus dem Quelltext die Website) von Chromium und damit auch von Edge basiert auf KHTML, welches dem KDE Projekt aus der Linux Welt entstammte. Linux fand also seinen Weg zurück in meine Wahrnehmungssphäre. Das geht sogar so weit, dass sich der neue Edge auch unter Linux installieren und nutzen ließ. Ich habe diesen neuen Edge eine Zeit lang gerne benutzt und er war mein Haupt-Browser.

Aber auch hier konnte es Microsoft nicht gut sein lassen. Der neue Edge wurde mit der Zeit mit immer mehr Funktionen überfrachtet, welche ich nur selten als nützlich empfand. Und leider sendete der Browser dann ebenfalls viele Daten nach Hause, was ich im Pi-hole nachvollziehen konnte. Ich gab dann irgendwann auf und wechselte zurück zu Firefox.

## Und nach uns die Recall-Funktion

Ich könnte noch lange so weiter machen, aber ich werfe mal einen Blick in das Heute. Microsoft stellt mit „Recall“ eine neue Funktion vor: Der eigene Desktop wird permanent aufgezeichnet, damit man noch nach Wochen per Freitext nach Dingen suchen kann, die man am Computer gemacht hat. Die Vorstellung der Funktion war, symptomatisch, von datenschutzrechtlichen Problemen begleitet. Sei es die anfangs unverschlüsselte Datenbank, die Aufnahme von Passwörtern und Bankdaten, es rumorte rund um die Vorstellung. Diese Probleme wurden gelöst, aber dennoch bleibt ein Produkt, welches meiner Meinung nach ein Problem löst, das praktisch niemand hat. Eine Innovation um der Innovations-Willen.

## Nächste Halt des Hype Trains: AI

Es ist verständlich, dass Microsoft den Trend rund um das Thema KI / AI mitnehmen will. Beim Thema Smartphone und auch Suchmaschinen wurde man im Staub zurückgelassen, das wollte man nicht noch einmal zulassen. Also landet der „Copilot“ überall dort, wo er benötigt wird, aber auch dort, wo er nicht gebraucht wird. Inzwischen finde ich den Copilot nicht mehr nur im Office Paket, er hat sich auch in Paint und in der Foto-App niedergelassen. Auch soll er möglichst bald in Notepad aufschlagen und mit Recall wird er wirklich tief ins System verankert werden. 

Ich kann den Sinn der Entwicklung noch einigermaßen nachvollziehen, aber ich muss es nicht mögen. In meiner Vorstellung sollte der Computer die Arbeit und das Spaß-haben erleichtern. Er soll es mir aber nicht abnehmen. Wenn Paint die Bilder malt, brauche ich Paint nicht mehr. Wenn Notepad die Texte schreibt, brauche ich auch das nicht mehr. 

Dazu kommt, dass Microsoft vielleicht keine persönlichen Daten abfischt, aber lokale Trainingsdaten oder Leistungstelemetrie finden sicher ihren Weg nach Redmond. 

## Linux aus dem Windschatten

Ich nutze selbst ein Steam Deck. Auf diesem läuft ein modifiziertes Arch Linux. Es ist eine tolle Gaming-Plattform und eignet sich auch als Computer, denn der KDE Desktop lässt sich uneingeschränkt nutzen. Die Arbeit damit hat mir so viel Spaß gemacht, dass ich mir direkt einen neuen PC angeschafft habe, auf dem Fedora mit KDE werkelt. 

In der Tat ist das Steam Deck so sehr für das Gaming geeignet, dass Windows auf dieser Geräteklasse gar nicht gut aussieht. Der Youtuber „Dave2D“ hat einen Vergleich zwischen Linux und Windows angestellt, bei welchem Windows ordentlich Federn lassen musste. [Link zu Youtube: "Windows Was The Problem All Along" / Englisch / 7:37 Minuten](https://www.youtube.com/watch?v=CJXp3UYj50Q)

Bei dem Vergleich kommt heraus, dass Windows den Akku zu schnell leer saugt, die meisten Spiele langsamer laufen, als unter Linux, und dass die Desktop-Oberfläche ebenfalls nicht geeignet ist, um sinnvoll auf kleinen Bildschirmen zu funktionieren. 
Dazu kommt eine Suspend-Funktion von Linux, die ihresgleichen sucht. Man kann ein Spiel jederzeit pausieren und das Steam Deck in den Schlafmodus schicken. Aufwachen tut es dann in Sekunden und man kann direkt weiter zocken. Ich liebe diese Funktion. Windows bekommt dies so leider nicht hin.

Das sind Probleme, die ich im Kleinen auch auf meinem LG-Gram Laptop feststellen konnte. Entweder der Laptop geht nicht richtig in den Tiefschlaf, oder will sich aus diesem nicht mehr wecken lassen. Da Windows sich manchmal mehr Ressourcen gönnt, als man annehmen möchte, ist auch der Akku schneller leer.

## On-off-Beziehung zurück im Status Off

Müsste ich meine Gefühlslage zusammenfassen, dann würde ich das so tun: Windows macht mir keinen Spaß mehr. Die Fluffigkeit ist abhandengekommen. 

Zu viele Komponenten werden nicht weiter entwickelt, es fehlen Innovationen und wenn es, wie mit AI, dann doch mal welche gibt, lösen sie Probleme, die ich nie hatte. Die Abteilungen Marketing und Monetarisierung haben wohl das Heft des Handelns in Redmond übernommen. 

Da das Cloud-Geschäft inzwischen die Haupteinnahme-Quelle von Microsoft ist, kann ich zumindest nachvollziehen, warum der Entwicklungsschwerpunkt auch dort hingewandert ist. Mit Betriebssystemen allein kann man kein großes Geld mehr machen. Allerdings verliert man dadurch auch die Möglichkeit, die User in das eigene Ökosystem zu ziehen. 

## Der Pinguin watschelt allen davon.

All die vielen Entwicklerinnen und Entwickler von Linux und Open-Source-Software im Allgemeinen haben den User nie als Quelle von Geld und Daten verstanden, sondern als … na ja, User eben. Menschen coden für andere Menschen, vielleicht auch im Glauben an eine etwas bessere Welt. 

Ich habe kürzlich auf einem meiner Windows Laptops ebenfalls Fedora (mit Gnome) installiert. Dabei habe ich auch gemerkt, wie erwachsen und ausgereift das ganze Ökosystem mit der Zeit geworden ist. Ich hatte keinerlei Treiberprobleme und der Laptop läuft auch noch besser. Der Standby verdient hier seinen Namen und der Laptop schläft tief und fest, lässt sich aber schnell wieder wecken. 

Gnome weckt in mir Emotionen, die ich zuletzt mit Windows 7 hatte. Ein durchdachter und sehr aufgeräumter Desktop. Ich finde alles genau dort, wo ich es erwarte. Linux läuft also nicht mehr nur auf fast allen Servern dieser Welt, den meisten Smartphones dieser Welt (ja, Android ist im Kern Linux), den meisten Gaming-Handhelds dieser Welt, es läuft nun auch wieder auf drei meiner vier Computer.  

## Was bleibt?

Ich werde Windows nicht aufgeben. Mein vierter Computer läuft also weiterhin mit Windows. Ich bin mir sicher, dass man in Redmond mit der Zeit erkennt, dass man mit der Zeit gehen muss. Den News zufolge hat man wohl auch schon erkannt, dass das Steam Deck langsam Fahrt aufnimmt und das Valve, die Firma dahinter, viel Geld und Ressourcen in das Thema Gaming unter Linux investiert. Dank Valve legt zum Beispiel [Proton (Link zur ProtonDB)](https://www.protondb.com/) einen gewaltigen Entwicklungsschritt nach dem Anderen hin. Gaming unter Linux ist also kein Nischenthema mehr. Um dieser Entwicklung etwas entgegenzusetzen, wird man sich in Redmond aber anstrengen müssen. Windows muss entschlackt und die Benutzeroberfläche ordentlich umgekrempelt werden. Ich kann mir sehr gut vorstellen, dass ihnen das auch gelingen wird.

Für die nächste Zukunft werde ich aber wieder auf Linux setzen, denn hier finden zur Zeit Innovationen statt, die den User in den Mittelpunkt stellen. Auch ist es in Sachen Datenschutz deutlich besser aufgestellt, als Windows. Ich habe zu jeder Zeit die volle Kontrolle. Es fühlt sich aktuell einfach besser an. An Microsoft kann ich nur einen Wunsch richten: **Bring back the Fluffigkeit!**
