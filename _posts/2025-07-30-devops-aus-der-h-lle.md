---
layout: post
title: "Devops aus der Hölle"
date: 2025-07-30 09:15:14 +0200
category: satire
author: 
tags: [satire, text, coding]
description: "Softwarentwicklung ist wie eine BDSM Session, bei der das Safeword vergessen wurde. Ein Satiretext."
image:
  path: /assets/img/post-header/header-das-wort-zum-mittwoch.jpg
  alt: Das Wort zum Mittwoch
---

# Das Wort zum Mittwoch

Ich hatte mir für meinen kleinen Blog vorgenommen, immer mal wieder über den Tellerrand zu schauen. Daher wird es nun Zeit für eine neue Kategorie: „Das Wort zum Mittwoch“. Darunter sammele ich ab sofort alle Texte, die sich woanders nicht einsortieren wollen. 

Anbei nun der erste Text. Dessen Inhalt füttert sich vornehmlich aus Berufserfahrung, stellt aber keine Abbildung tatsächlicher Ereignisse dar. Vielmehr handelt es sich um eine satirische Aufarbeitung von Vorkommnissen, die sich nur vielleicht so zugetragen haben können. Oder auch nicht, schließlich war niemand von uns bei der Irrfahrt von Odysseus dabei und trotzdem nehmen wir dem „Brudi“ schon ab, dass das alles so passiert ist. Viel Spaß.

## Der Morgen eines beliebigen Freitags

Ich betrete das Büro. Als Erstes schlägt mir der Geruch der Kaffeemaschine ins Gesicht, die mit aller Kraft versucht, gegen die Urkräfte des Kalks ihre koffeinierte Brühe in die Kanne zu husten. Es ist ein modernes Büro, mit bunten Sitzmöbeln, einem Aquarium, noch bunteren Wänden und einem Banner, welches die Belegschaft mit der Botschaft „Crafting a better tomorrow“ begrüßt. Nur dass die Möbel mit Kaffeeflecken aus der Maschine übersät sind, die sich gerade im Endkampf der Getränkeveredelung befindet, die Fische im Aquarium wie Häftlinge des Todestrakts ihre Runden drehen und dass das eine „t“ des Banners verblasst. Wir craften hier also nichts Anderes als ein „beta tomorrow“. Passt. 

Ich setze mich an meinen Arbeitsplatz und lasse mich von der Popup-Fanfare meines Betriebssystems begrüßen. Neu eingestellte Meetings, neue Nachrichten in *Slack*, neue Issues auf dem *Jira-Board* und irgendeine heruntergekommene Gestalt scheint etwas an einem meiner Confluence-Artikel geändert zu haben. Mögen die Götter, an die diese Kreatur glauben mag, Erbarmen mit ihr haben, denn ich werde es sicher nicht. Meine Artikel sind perfekt, so wie sie sind! Schade, dass das Messer-Emote in *Slack* bei uns gelöscht wurde.

Ein Blick auf den Monitor an der Wand mir gegenüber zeigt neben der Nachricht „Last week we have onboarded 212 new customers“ im nächsten Slide ein Grafana-Board mit etwas zu viel Rottönen. Anscheinend röchelt unsere AWS-Instanz mal wieder auf der zweiten Lunge. Das interessiert mich aber nicht, denn was im Backend passiert, bleibt auch da, komme, was wolle.

## 09:00 Uhr: Stand-up Meeting

Harmonische Perfektion erreicht ein Tag erst, wenn man dem SCRUM-Monster gehuldigt hat. Wir versammeln uns in der Mitte des Raumes, um uns die täglichen Nichtigkeiten verbal um die Ohren zu hauen. 

Mit durch jahrelanger Praxis austrainierter Heuchelei teile ich stolz mit, dass ich eines der Items auf dem JIRA-Board abschließen konnte. Den Code werde ich heute noch zur Review freigeben und da diese keinerlei Beanstandungen ergeben wird, landet er auch zielsicher in der Testumgebung.

 Ja, mein fester Vorsatz für diesen Freitag ist, genau einen Commit von ein paar Zeilen Code in das Repository unserer Abteilung zu zelebrieren. Das wird meine gesamte Tagesleistung bleiben. Vielleicht schaue ich auch noch den Fischen zu, wie sie vermutlich depressionsgeschwängert durch das brackige Wasser gleiten. Eine großartige Tagesleistung, wie ich finde. 

Natürlich höre ich mit einem viertel Ohr zu, was meine Kollegen so alles fabrizieren. Wir sprechen abwechselnd Englisch und Deutsch, denn die Einen sind zu faul das Andere zu lernen, und die Anderen sind zu schlecht, um es zu können. Für gewöhnlich ist es auch egal, was in diesem Meeting gesagt wird, denn wenn es zu heikel wird, droht ein weiteres Meeting am Freitag, das niemand, absolut niemand will, außer das SCRUM-Monster. Aber dann fielen sie, die Worte des Grauens: „Das geht heute noch Prod“ (ins Produktivsystem, Anm. d. Verf.).

Was? Was geht hier heute noch Prod? Nicht an einem Freitag! Bitte nicht! „Ist nur eine Änderung an den CSS-Klassen“ höre ich. Das Wort „nur“ ist bei der Softwareentwicklung das Äquivalent zur Wasserstoffbombe in der Teilchenphysik. Aber bei der Abwägung zwischen Extra-Meeting am Freitag und möglichem CSS-Supergau entscheide ich mich für „hoffentlich komme ich hier noch pünktlich raus“. 

## 9:30 - 12:00 Uhr: Ab in die Ticket Mine!

Durch eine Änderung in der internen Support Struktur dürfen der Customer Support und auch ein paar andere Departments nun selbst Issues auf dem Jira-Board erstellen, wann immer sie einen Fehler in unserem ABSOLUT PERFEKTEN Produkt finden. Weil Personalmangel im Support herrscht, können sie dies nicht mehr selber machen. Also warum nicht einfach den Adel darum bitten, die Kartoffeln zu pflücken. Heute ist es meine qualvolle Pflicht, diese vorzusortieren, zu prüfen und weitere Ergänzungen vorzunehmen. 

Ich, der ich auserkoren wurde, neue Features zu entwickeln, Code zu vervollkommnen, das Produkt mit meinen himmlischen Fähigkeiten weiter zu perfektionieren muss nun Tickets vom Fußvolk lesen und irgendwas damit machen. In der SCRUM-Religion wäre das pure Häresie, aber wenn die Stelle des Projektmanagers mal wieder vakant ist, zwei praxisfremde „Heads of what ever“ dies nun interimsweise übernommen haben, dann dürfen eben auch die Mäuse der anderen Departments auf den Tischen tanzen. Und wie sie tanzen.

Issue Nummer 187: „Kunde beklagt, dass die Darstellung des Kundenbereichs auf seinem Iphone schwer zu lesen ist“ – Ach echt? Danke für diese erschöpfende und keine Frage mehr offenlassende Fehlerbeschreibung! „UI-Team, bitte Kundenbereich leichter zum Lesen machen“. 

Da wir ein cooles und modernes Unternehmen sind, verbietet es sich natürlich, solch ein Ticket auszudrucken, um einen Backstein zu wickeln und dem Ersteller mit viel Effet in die Fresse zu commiten. Ich setze es auf „stalled“, fordere weitere Informationen an und quäle mich zum nächsten Ticket. Die Schichten in der Ticket-Mine sind lang und hart.

### 11 Uhr: Meeting mit Gestalten

Eine der „Heads of …“ hat mich und zwei andere Developer zu einem Meeting eingeladen. Ich bin so froh, dass es im fünften Stock ist, da der einzige Meetingraum dort im Sommer so heiß wird, dass Holzatome beginnen zu fusionieren. Aber „Heads of …“ hat ihr Büro im vierten und wir sind im EG, also treffen wir uns in der Mitte. Dämliche, blöde …

„Ich hatte gerade einen Call mit Marketing. Die neue Anzeige ging zumindest digital einen Monat zu früh raus. Wir brauchen also das neue Feature im Dashboard etwas eher. Ich wollte mit euch einmal besprechen, ob wir den Zeitplan des aktuellen Sprints neu gestalten können“ – Lebendige Mordlust entsteht bei 32 Grad Zimmertemperatur und einem Raum voll von Leuten, die so tun, als könnten sie, was sie vorspielen zu sein. Der nach einem überreifen Roquefort riechenden Senior Dev übernimmt das Reden und ich gebe zu, in diesen Momenten liebe ich diese vollbärtigen, nur mit VIM programmierenden Waldschrate. Eloquent teilte er ihr mit, dass wenn Marketing gedenkt, ihren Haufen so dermaßen weit neben die Schüssel zu donnern, der beste Plan nicht ist, das Haus neu zu bauen, sondern die Sche** am besten einfach wegzumachen.  

Das Meeting war laut, heiß und fruchtlos. Unser cooles junges Unternehmen hat auf jedem Stockwerk Kühlschränke mit modernen und garantiert fair getradeten Getränken. Vielleicht werden die ja im Winter wieder aufgefüllt, wer weiß.

## 12:30 - 13:00 Uhr: Der Hunger treibt es rein

Zur Mittagspause verlasse ich gerne und durchaus fluchtartig unser cooles und modernes Bürogebäude, das so herrlich nicht klimatisiert erschaffen wurde. Ich probiere eines der neuen Restaurants in dem Block um die Ecke aus und stelle fest, Äthiopisch ist bei der Hitze absolut nicht mein Fall. Aber ich treibe es mir rein um später damit angeben zu können, wie modern und zeitgemäß ich bin, während ich mir wünschte, ich hätte mir den guten alten Döner zwischen die Kiemen getrieben. Ich kehre zurück ins Büro und steuere die Küche im Erdgeschoss an. Freitags ist Obsttag, also versuche ich mir einen Apfel zu ergattern. Cool – denke ich – die anderen haben die Obstkiste schon geplündert. Es sind noch grüne Bananen da und Kohlrabi, mein Lieblingsobst. 

Dieser Tag muss enden.


## 13:15 Uhr: Der Tragödie erster Teil

Während ich geistig abwesend auf die Fische starre und mich frage, ob ich mich mit ihnen zum Gruppensuizid verabreden kann, ploppt mein *Slack* auf. Ich hasse es, wenn mich jemand am Freitag direkt anschreibt. Das gilt für ausnahmslos jeden Tag, aber am Freitag besonders. 

„Du, der Unit-Test ist fehlgeschlagen, magst du dir das noch einmal anschauen?“. 

Wie kannst du es wagen, auch nur anzunehmen, mein Code wäre nicht über absolut jeden nur denkbaren und nicht denkbaren Zweifel erhaben. Bettwanzen haben einen höheren Lebenszweck, als du je zu erreichen träumen dürftest. Und wie wäre es mit einem „Bitte“? Nehme dir deinen Unit-Test und schiebe ihn dir trocken und quer in den … Ich tippe: „Klar, ich schaue mir das kurz an“. 
Gut, ok, ich habe eine falsche Umgebungsvariable gesetzt und ein Datum falsch konvertiert. Normalerweise bin ich perfekt, mein Code sowieso! 

Und dann sehe ich es. Mein noch leicht hasserfüllter Blick richtet sich auf den Monitor an der Wand. Eines der Dashboards, die dort monoton durch sliden, zeigt den Ticketeingang im Support. Normalerweise rocken die Jungs und Mädels die Ticketwarteschlange am Freitag runter, aber nun steht da eine dreistellige Zahl. Da müsste 40 stehen, aber es waren 321. 

Instinktiv ducke ich mich weg. Ich kralle mir ein belangloses Ticket von dem Jira-Board, weise es mir virtuos zu, vertiefe mich in den Text der Fehlerbeschreibung. Ich werde mein Leben geben, um dieses Ticket zu lösen.

Denn tief in meinem Inneren wusste ich, wenn es dreistellig wird, hat Frontend oder Backend Mist gebaut. Und an diesem Freitag wollte Frontend „nur was Kleines am CSS“ ins Produktivsystem pushen, so wie die Hindenburg nur nach New York wollte. Es ist Freitag und heute blende ich Probleme konsequent aus. Ich schaue auf mein neues Ticket: „Kunde sagt, dass er seine Rechnungen auf dem Ipad nicht öffnen kann. Aber woanders geht es.“ – Faszinieren und ein Mysterium. Natürlich fehlen wieder sämtliche Angaben wie Version des Betriebssystems, genaue Fehlerbeschreibung zur Reproduktion und viele weitere Details. Aber hey, ich habe das Ticket angeleckt, nun ist es meins.

„Leute, nur mal kurz …“. Der Roquefort Käse steht in der Mitte des Raumes und setzt an. Wenn einer der Senior Devs das Wort erhebt, dann muss man lauschen, als würde der Papst das Ende der Welt verkünden. „Wer hat da heute CSS committed?“ Das Blame Game geht los. Einer der neuen Junior Devs hatte einen Geistesblitz, einer der Senior Devs hat bei der Pair Programming Session nicht aufgepasst oder so wenig Bock wie ich und Unit-Test-Einläufe kriege sowieso nur ich. 
Richtig cool ist aber, dass der Senior Dev gar nicht vor Ort ist. Er ist nicht einmal auf demselben Kontinent und nur remote zugeschaltet. Und selbstredend hat die fragliche Person schon längst Feierabend. 
Und natürlich fällt der Blick auf mich und es folgt eine Bitte, die eigentlich ein direkter Befehl ist, das „nur noch kurz“ zu fixen. Für jedes „nur“, das in diesem Unternehmen geäußert wird, sollte die betreffende Person den Kopf ins Aquarium stecken müssen. Für mindestens fünf Minuten. 

Kommt, liebe Fische, lasst uns zusammen den ewigen Schlaf finden. 

Einem Senior Dev wie Roquefort Käse brauche ich nicht damit kommen, dass ich gerade ein anderes, extrem hochwichtiges Prio 1 Ticket auf meinem Namen habe, wo auch das Management im Loop sein könnte. Mit meiner mir maximal möglichsten weinerlichen Stimme frage ich, ob schon ein Ticket da ist. Natürlich ist es das. „Kunde sagt, dass er sich nicht mehr einloggen kann“. Hat der Kunde schon versucht, zur Hölle zu fahren? Ich assigne mir das Ticket. Nicht weil ich es will, sondern weil ich es muss und ich den Fischen nicht die Genugtuung geben will, mich überlebt zu haben. 

## 17:15 Uhr: Git commit -m "leckt mich alle!"

Der exterritoriale Senior Dev und die Blattlaus eines Junior Devs hatten CSS-Klassen verwendet, die eigentlich erst für ein zukünftiges Redesign vorgesehen waren. Aber irgendwelche Mikroben aus dem Department Marketing hatten Teile des Designs bereits in die Werbematerialien einfließen lassen und wollten ein paar der Änderungen schon im Dashboard sehen. Blattlaus hatte aber ein paar der IDs vergessen, die wir benötigen, um bestimmte Java-Script Funktionen zu triggern. Wie zum Beispiel das verfluchte Login! Gerne hätte ich den Kollegen für Unit-Tests eine würzige Slack-Nachricht gesendet, aber ich habe am Montag keine Lust auf ein Meeting mit dem HR. Außerdem hatte ich hatte das Zeichenlimit erreicht und dies mit einem Hauch zu vielen Schimpfwörtern. Es wäre meine letzte Slack-Nachricht gewesen und mein letztes Meeting mit dem HR.

git commit -m „Fix CSS. Added missing id’s. Ticket 118.“ 

git push

Slack ploppt auf. „Schreibst du heute noch kurz die PMA¹? Dann haben wir alles, denke ich“. Ich beginne eine Antwort zu tippen. Ich stoppe und lösche die Nachricht.

Ich atme tief durch, schaue zu den Fischen, erlabe mich kurz an der Tristess ihres Daseins. 
 
Wenn ich schon ins HR muss, dann will ich als Legende gehen, nicht so. Ich öffne stattdessen Word und beginne dort zu tippen.

*Ende*

> 1: PMA: Post Mortem Analysis = Ein Fehlerreport