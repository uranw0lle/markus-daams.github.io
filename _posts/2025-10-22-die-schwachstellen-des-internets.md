---
layout: 
title: "Die Schwachstellen des Internets"
date: 2025-10-22 07:21:29 +0200
category: 
author: 
tags: [text, internet, gedanken]
description: "Das Internet hat einige Schwachstellen. Was wir tun können hängt davon ab, welche Schlüsse wir ziehen."
image:
  path: /assets/img/post-header/header-internet-schwachstellen.jpg
  alt: Die Schwachstellen des Internets
---

# Schatz, das Internet ist weg. Mal wieder.

Am 20. Oktober hatte eine Besitzerin oder ein Besitzer eines „Smarten Bettes“ ein Problem. Das Bett heizte sich 9 Grad über die Raumtemperatur auf und ließ sich nicht mehr herunterkühlen („Ich schlafe in einer Sauna“). Andere berichteten, dass das Bett nicht mehr in Schlafposition gebracht werden konnte. Berichte wie diese [(Hier geht es zum Artikel auf dexerto.com)](https://www.dexerto.com/entertainment/aws-crash-causes-2000-smart-beds-to-overheat-and-get-stuck-upright-3272251/) gibt es zahlreiche.

Grund hierfür war ein Ausfall mehrerer Clouddienste der **Amazon Web Services (AWS)** in der Region „US-EAST-1“. Viele Apps, Websites und Dienste waren davon betroffen, darunter Duolingo, Reddit, Perplexity, Docker, zahlreiche Messenger, die Liste ist sehr lang.

Spulen wir ein wenig zurück, zum 21.06.2025. Wieder waren viele Websites und Dienste über mehrere Stunden nicht erreichbar. Grund hierfür war eine DNS Störung beim Anbieter **Cloudflare**. Die Auflistung solcher großen Ausfälle lässt sich natürlich fortsetzen. Allen Störungen liegt zugrunde, dass es immer einen Single Point of Failure gab, eine zentrale Schwachstelle, die einen großen Teil des Internets mit in den Malstrom gerissen hat.

Den Kunden mit dem smarten Bett hätte ein Offline-Modus bereits geholfen. Allen anderen Diensten aber wohl nicht. Ich nehme diese Störung zum Anlass, die Schwachpunkte des Internets herauszustellen. Wir sollten zudem nicht die falschen Schlüsse ziehen.

Zeit, sich das einmal genauer anzuschauen.

## Schwachstelle 1: Cloudspeicher

Wer einmal eine App oder eine Webanwendung erstellt hat, kennt folgende Fragen vielleicht. Wo hoste ich meine Anwendung? Welche Datenbank nutze ich? Wo bekomme ich eine Domain her? Wie sorge ich für Redundanz und Backups? Vor vielen Sonnenumrundungen musste man jede Frage einzeln angehen und lösen. Heute ist das nicht mehr so, dank Cloud Services. 

Im Kern bieten Cloud Services alle Dienste an, die man früher selbst zusammen stellen und betreuen musste. Die Datenbank hatte man bei Anbieter X, die Domain bei Anbieter Y und gehostet wurde die App bei Anbieter Z. Cloudservices bieten alles an, auf einmal und an einem Fleck. 

Wer sich auf der Website der AWS [aws.amazon.com](https://aws.amazon.com/de/?nc2=h_home) umschaut, wird für praktisch jeden nur denkbaren Business- und Use Case eine passende Lösung finden. Von Privatentwicklern, über Unternehmen, bis Regierungen finden hier alles, was sie für die digitalen Herausforderungen unserer Zeit benötigen.

Es gibt im wesentlichen 3 große Anbieter für solche gebündelten Cloud Services:

1. Amazon AWS
2. Microsoft Azure
3. Google Cloud (GCP)

Je nach Quelle bündeln diese drei Anbieter bis zu 60 % der weltweiten Marktanteile. Anbieter wie Alibaba, Oracle und IBM spielen auch wichtige Rollen in diesem Markt, haben aber bisher keine derartige Signifikanz erreicht, wie die drei Platzhirsche.

Cloud Services sind nützlich und generell eine gute Sache. Warum? Wie eingangs beschrieben freuen sich kleine Entwickler und Unternehmen mit engem Budget über solche Angebote. Viele Apps wären wohl gar nicht erst entstanden, wenn sich der oder die Entwickler erst noch um Hardware und deren Anbindung an den Internet-Backbone hätten kümmern müssen. Wer neben der App Entwicklung noch eine Datenbank administrieren und sich um Backups und Erreichbarkeit kümmern muss, verliert vermutlich schnell die Lust. 

Steile These: Dank Cloud Services haben wir viele coole Apps, Websites und andere tolle Techprodukte bekommen.

Aber: Man begibt sich in die Hände eines einzigen Anbieters. Macht man es sich zu bequem, dann heizt das smarte Bett im schlimmsten Fall Amok.

Weiterhin konzentriert sich die Marktmacht nicht auf wenige Anbieter. Alle diese Unternehmen haben ihre Firmenzentrale in den USA. Alle diese Unternehmen unterliegen damit auch der Jurisdiktion der USA. Durch den Aufbau von Rechenzentren in Europa versuchen „die Drei“ aktuell ein wenig „Eurowashing“ zu betreiben, glaubhaft ist das jedoch nicht. Denn wie erst im Juli 2025 (in Frankreich) herauskam, kann Microsoft nicht garantieren, dass Daten aus der EU nicht in den USA landen. Microsoft unterliegt, wie alle US-Unternehmen, dem CLOUD Act und dem Patriot Act. Befürchtet wird, dass die US-Regierung mittels dieser Gesetze zu jeder Zeit Zugriff auf die in der EU gespeicherten Daten erhalten kann. 

Hier konzentrieren sich also zwei Probleme: Die Bündelung von Anbietern und Diensten sorgen dafür, dass selbst ein kleiner Ausfall auch nur eines Systems, durch einen Kaskaden-Effekt viele weitere Dienste beeinflusst. Zudem besteht auch nach Beteuerungen der Unternehmen Unsicherheit im Hinblick auf den Datenschutz. 

## Schwachstelle 2: CDNs 

Alles muss heute schneller gehen. Das gilt natürlich auch für die Websites und Apps, die wir den Tag über benutzen. Wurden Daten früher noch von einem Server ausgeliefert, sind heute mehrere Server beteiligt. Hier kommen die Content Delivery Networks (CDN) ins Spiel. Im Kern halten diese oft angefragte Inhalte auf speziellen Proxy- und Cache-Servern vor. Ruft man eine Website auf, so passiert es oft, dass die Bilder gar nicht mehr vom Server kommen, auf dem die Website gespeichert ist. Stattdessen werden die Bilder (und auch andere Inhalte) von einem Server in der physikalischen Nähe geliefert. So muss keine unnötige Verbindung zum Webserver aufgebaut werden und die Inhalte laden auch noch schneller. Dank CDN laden Videos und Bilder schneller, Websites werden zügiger ausgeliefert und durch verteilte Server kommt auch die gewünschte Redundanz mit rein. Yay!

Ich habe stark vereinfacht und empfehle den [Wikipedia Artikel zum Thema CDN](https://de.wikipedia.org/wiki/Content_Delivery_Network#Auswahl_von_CDN-Anbietern)

CDN sind ein integraler Bestandteil des Internets geworden. Bei besonders oft nachgefragten Inhalten sorgen sie dafür, dass die Reaktionszeiten niedrig bleiben. Das funktioniert bis zum Ausfall eines Systems. Wie in der Einleitung beschrieben, reicht ein DNS Problem bei einem Anbieter, um Teile des Internets lahm zu legen. 

Wieder haben wir es mit einer Angebots- und Marktkonzentration auf wenige Anbieter zu tun. 

Bekannte große Anbieter sind:

1. Akami
2. Cloudflare
3. Amazon CloudFront (AWS *zwinker*)

Für die Marktanteile gibt es wieder viele Quellen mit teils stark abweichenden Zahlen. Die Tendenz ist jedoch recht eindeutig: Die Top 3 kommen auf bis zu 90 % Marktanteil. 

Es ist wohl wenig verwunderlich, dass es sich wieder um US-Unternehmen handelt, die alle der amerikanischen Jurisdiktion unterliegen. Der CLOUD Act und der Patriot Act gelten also auch für diese Unternehmen.

Ein drittes Problem webt sich nun langsam mit ein: Cloud-Anbieter bieten praktischerweise CDN mit an. Umgedreht bieten Unternehmen wie Cloudflare zunehmend auch Cloud Services an. Die Verlockung ist also sehr groß, gleich alles von einem Anbieter zu nehmen. 

## Schwachstelle 3: DNS

Das Domain Name System ist eines der ältesten Bestandteile des Internets und eines der Wichtigsten. Wann immer wir Google oder Wikipedia aufrufen, kümmert es sich darum, dass wir dort hingelangen, wo wir hin wollen. Man muss sich das DNS wie ein riesiges Telefonbuch vorstellen. Wenn ich in meinem Browser ``www.wikipedia.de`` eingebe, nennt mir das DNS die IP-Adresse, unter der ich diese Website finden kann. Denn (fast) niemand hat Lust, sich ``49.13.55.174`` zu merken. Das Internet ist durch IP-Adressen verbunden und das DNS löst diese für uns auf. 

Dieser Umstand macht das Internet aber auch sehr verwundbar. Entscheidet eine Regierung oder mächtige Institution, dass eine bestimmte Internetseite nicht mehr erreichbar sein soll, so kann es nationale DNS-Anbieter anweisen, diese Seite aus dem System zu löschen. Kenne ich nun die IP-Adresse des Servers, auf dem die Seite liegt nicht, kann ich diese auch nicht mehr erreichen. 

Schlimmer noch: Hat ein DNS-Anbieter ein Problem, ist im schlimmsten Fall keine Internetseite oder App erreichbar, obwohl diese selbst einwandfrei funktionieren. 

Welche DNS-Anbieter wir nutzen, wird häufig vom Internet-Provider festgelegt. Dieser sendet die entsprechenden Einträge an den Router. Nur die Wenigsten nutzen alternative Anbieter, um zum Beispiel Sperren zu umgehen, oder verlässlichere und datenschutzfreundlichere DNS-Server zu verwenden. 

DNS-Anbieter gibt es viele. Geht es um die reine Auflösung von Webadressen, übernehmen das häufig nationale Anbieter. Geht es aber um Apps, Datenbanken, verteilte Speicher usw. wird es leider wieder haarig. Denn auch diese greifen alle auf DNS zurück.

Die Quellenlage der Marktanteile ist wieder schwierig zu durchschauen, aber es scheinen sich wieder einige wenige Anbieter hervorzuheben:

1. AWS
2. Cloudflare
3. Google

Ja nach Quelle vereinigen sich um die 75 % auf diese Anbieter. Ich muss wohl nicht mehr erwähnen, dass es sich um US-Amerikanische Unternehmen handelt. 

Habe ich es mir bei der Entwicklung meiner genialen App also richtig einfach gemacht, kommt das Hosting, das CDN und das DNS von ein und demselben Anbieter.

## Zu wenig Net im Internet

Bei dieser Betrachtung wird eine Sache sehr deutlich: Cloudservices und auch CDN haben viele Websites, Apps und Dienste ermöglicht, die es früher nie gegeben hätte. Durch die enorme Konzentration auf wenige Anbieter und praktisch nur eines Landes ist es aber auch verwundbarer geworden. Im schlimmsten Fall kann ich eben nicht mehr Spanisch mit Duolingo lernen, während mich zudem mein Bett grillt und alles nur, weil AWS eine Störung in der Region *US-EAST-1* hat. 

> Ein amerikanischer Cloudservice hat ein Problem, amerikanische Unternehmen sind betroffen und dennoch war es ein globales Problem.

Obendrauf kommt die Problematik mit dem Datenschutz. In der EU haben wir sehr weitreichende Datenschutzbestimmungen. In den USA verhält es sich naturgemäß anders. Die persönlichen Daten von Menschen sind dort ein Produkt, eine handelbare Ware. Um diese Ware haben sich viele Internetservices herum entwickelt. Es gibt den bekannten Spruch: „Wenn das Produkt nichts kostet, bist du das Produkt“. Den europäischen Datenschutzregelungen steht man dort skeptisch gegenüber, da sie das eigene Geschäftsmodell bedrohen. 
Auch hat die Regierung der USA durch diverse Gesetze praktisch uneingeschränkten Zugriff auf alle diese Daten, sollte es nötig sein. Diese Gesetze beschränken sich dabei (bewusst oder unbewusst) nicht auf die Bevölkerung, sondern auf die Anbieter der Dienste. Unsere europäischen Daten sind in diesem Fall dann Beifang.

## Toll! Und nun?

Ich denke, wir haben in Europa erkannt, dass das System verbessert werden muss. Erste Maßnahmen wurden oder werden in die Wege geleitet. So soll der „AI Development Act“ für Investitionen im Bereich AI sorgen, sodass hier nicht der Anschluss verloren wird. Es wird wohl aber noch eine Weile dauern, bis alle wichtigen „Knoten“ des Internets dieselbe Liebe zuteilwird.

Durch Verordnungen wie dem [„Digital Markets Act (DMA)“ / Link zu Wikipedia](https://de.wikipedia.org/wiki/Gesetz_%C3%BCber_digitale_M%C3%A4rkte) wird zudem sichergestellt, das der Markt kompetitiv bleibt. Die in den USA so beliebten Monopole, bzw. Oligopole sollen so aufgebrochen werden.

Und hier komme ich zu einem wichtigen Punkt: Nach dem es zum (Teil)Ausfall der AWS kam, wurden sofort Stimmen laut, die Investitionen in heimische Cloud-Anbieter gefordert haben. Das ist auch richtig und wichtig. Wer aber genauer hinschaut, muss feststellen, dass wir vor allem von US-Diensten abhängig sind, unabhängig davon, wo sie gehostet werden. 

Nehmen wir einmal meine Aufzählung von Diensten aus der Einleitung und ergänzen diese noch:

* Duolingo (USA)
* Perplexity (USA)
* Reddit (USA)
* So gut wie alle Amazon Dienste (USA)
* Diverse Apple-Dienste (USA)
* Epic Games Launcher (USA)
* Coinbase (USA)
* ... das Muster wird klar

Dies ist ein Problem, dass in der EU ebenfalls angegangen werden muss. Durch Abbau von Regulationen und anderen Hemmnissen, muss ein Umfeld gestaltet werden, in welchem wir konkurrenzfähige Apps und Dienste entwickeln und anbieten können. Ich würde gerne eine App hier in Europa entwickeln können, ohne eine Heerschar an Anwälten zu benötigen und idealerweise bei einem europäischen Cloud-Service hosten. Da ich Europäer bin, würde sich mein Geschäftsmodell nicht um die Daten der User drehen, sondern um Features.

Europa muss also nicht das eine Problem lösen (AI, Cloud), sondern viele, denn wir haben praktisch alle Trends verschlafen. 

## Mein Fazit

Der Ausfall der AWS hat viele von uns genervt. Außerdem wurden uns die Schwachpunkte des Internets wieder vor Augen geführt. Frei nach Battlestar Galactica: *„All das ist schon einmal passiert und all das wird wieder passieren“.* 

Ich will aber nicht nur schwarz malen. Wie man meinem Blog entnehmen kann, hoste ich viele Dienste selbst. Macht Google Fotos die Grätsche, bekomme ich das nicht einmal mehr mit. 
Als Europäer wünsche ich mir, dass wir ebenfalls eine „dann machen wir das eben selbst“ Attitüde entwickeln. Die Welt ist kein Disney-Film und wird unsere Probleme nicht lösen. In einer Gemeinschaft (überwiegend?) demokratischer Staaten muss es unser Anspruch sein, ein eigenen, resilienten Teil des Internets zu entwickeln. Wie bei vielem, machen es uns die Chinesen vor, wie es gehen kann. Ich bin aber davon überzeugt, dass wir das alles demokratischer und menschenfreundlicher in die Welt zaubern können.

Mögen alle Server störungsfrei bleiben.

## Ressourcen

* [Artikel über den AWS Ausfall auf heise.de](https://www.heise.de/news/Amazon-Web-Services-Globale-Stoerung-10778963.html)

* [Im Daten-Dschungel: Wie Microsoft mit dem CLOUD Act umgeht](https://news.microsoft.com/de-de/im-daten-dschungel-wie-microsoft-mit-dem-cloud-act-umgeht/)

* [AWS, Azure and Google Cloud Lead Q2 2025 Cloud Market Earnings Bolstered by AI Development](https://www.cloudwards.net/news/aws-azure-and-google-cloud-lead-q2-2025-cloud-market-earnings/)

* [CLOUD Act, Artikel auf Wikipedia](https://de.wikipedia.org/wiki/CLOUD_Act)

* [PATRIOT Act, Artikel auf Wikipedia](https://de.wikipedia.org/wiki/USA_Patriot_Act)

* [European Commission Cloud Strategy  (PDF Download, Englisch)](https://commission.europa.eu/publications/european-commission-cloud-strategy_en)