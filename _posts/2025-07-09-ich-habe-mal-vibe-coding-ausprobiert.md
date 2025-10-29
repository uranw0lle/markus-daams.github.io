---
layout: post
title: "Ich habe mal Vibe Coding ausprobiert"
date: 2025-07-09 06:53:02 +0200
category: coding
author: 
tags: [coding, learning, text]
description: "Ich habe Vibe Coding ausprobiert und mich blöd angestellt. Hier ist mein erster Erfahrungsbericht."
image:
  path: /assets/img/post-header/header-vibe-coding.jpg
  alt: Meine Erfahrung mit Vibe Coding
---

# Was zur Hölle ist denn nun schon wieder Vibe Coding?

Fragen wie diese stellen sich mir, wenn ich mir sinnlose [Memes auf Reddit](https://www.reddit.com/r/programminghumor/) anschaue. 

Bei jedem neuen Trend gehe ich erst einmal in meinen ‚ignore mode‘, schließlich bin ich nicht mehr der jüngste und habe mir das Privileg verdient, Änderungen erst einmal und rundheraus abzulehnen. In diesem Modus bleibe ich aber nicht lange und dann wird der Begriff erst einmal geduckduckgot. Die kurze Definition von Vibe Coding liest sich wie folgt:

*Vibe Coding bezeichnet eine Art der Softwareentwicklung, bei der nahezu ausschließlich der Prompt eines LLM oder GPT bedient wird, um den für die Software erforderlichen Quellcode zu generieren. Vibe Coding ist eine Variante des Prompt Engineerings. Anders als die qualifizierte Softwareentwicklung, die Überprüfungen und Tests des Quellcodes und des Produkts auf Fehlerfreiheit durch Fachpersonal einschließt, soll Vibe Coding keine Vorkenntnisse oder Ausbildung erfordern* (Quelle: Wikipedia. [https://de.wikipedia.org/wiki/Vibe_Coding](https://de.wikipedia.org/wiki/Vibe_Coding))

Und in der Tat habe ich mich immer einmal wieder gefragt, ob es inzwischen möglich ist, Software komplett mit einer generativen AI wie **ChatGPT** zu entwickeln. In diesem Bereich wurden in kurzer Zeit sehr große Entwicklungssprünge gemacht, also warum sollte es nicht gehen? 

## Meine bisherigen Erfahrungen

Meine Fahrt auf dem AI-Hype-Train begann schon sehr früh. So habe ich in der Betaphase des **Microsoft Copilot** mitgemacht und auch **Codeium (heute Windsurf)** benutzt, sobald es verfügbar war. Ich habe mir Code-Blöcke generieren lassen, oder die AI genutzt, um Code zu debuggen. Es ist mir aber nie in den Sinn gekommen, ganze Projekt-Files generieren zu lassen. Meine Experimente hatten viel zu oft unbenutzbaren Code zur Folge. Das will ich aber nicht allein auf die AI schieben, denn präzises Prompten ist nach wie vor Gold, wenn es um funktionierenden Code geht. Oder um es mal anders auszudrücken: 

>Je schlechter ich eine Programmiersprache kann, desto besser muss ich meine Muttersprache können, wenn ich mit der AI zum Erfolg kommen will. 

Ich habe mich mit der Zeit immer öfter von einer AI unterstützen lassen. Besonders dann, wenn es um repetitiven Code ging, auf den ich einfach keine Lust mehr hatte. Durch ein Array loopen um irgendwas zu tun? AI, mach einmal kurz. Files in Python laden, an *Pandas* weiterreichen und per *Seaborn* schick machen? Da mache ich doch keine Gehirnzelle mehr für krumm. Besonders hilfreich wurde es, wenn ich Shell-Scripte für Linux brauchte. Seien es Massentasks um Dateien zu konvertieren und zu verschieben, oder Scripte um die Netzwerkkonfiguration auf mehreren Clients zu ändern. Da denke ich nicht mehr groß nach, sondern lasse die AI ans Werk. 

Ich nutze die neuen Möglichkeiten also sehr gerne, nur noch nicht in dem Umfang, dass es einen eigenen Namen wie „Vibe Coding“ verdient. Es war an der Zeit, dass sich das ändert und ich mich blind in dieses neue Thema stürzte.

## Mein Projekt mit neuen Vibes

Es begann mit einer fixen Idee, die ich mit mir herumschleppte. Ich wollte ein Projekt beginnen, bei dem ich sowohl Frontend als auch Backend selbst entwickle. Mein Ziel war es, ein besseres Verständnis für beide Komponenten zu entwickeln. Besonders die Interaktion der beiden hat mich immer interessiert. Wie werden Daten sicher weiter gereicht, gespeichert und wieder zurückgeliefert? Mit der Zeit und durch viele Programmierkurse haben sich viele Versatzstücke an Wissen in mir angesammelt und nun wollte ich ein paar Puzzlestücke verbinden. So ein Projekt ist ideal dafür.

Mein Projekt sollte ein einfacher Kurznachrichtendienst-Klon wie Bluesky oder Mastodon sein. Ziel für mich war es, eine Registrierungs- und Login-Funktion zu implementieren, sowie die Möglichkeit, Texte zu posten. Klingt einfach, sodass mein Hirn es kompliziert machen musste. Aber dazu später mehr. Zwei Dinge standen für mich fest:

1. Das Frontend entwickle ich in React. Ich habe mich kurze Zeit später für das [React Framework Vite](https://vite.dev/guide/) entschieden. Ich probiere gerne neue Dinge aus und Vite bringt einen Development Server mit, der einfach und schnell funktioniert. 

2. Das Backend wird mit Rust geschrieben. Ich habe eine morbide und fast schon makabere Beziehung zu dieser Domina aller Programmiersprachen. Ich will sie besser verstehen.

Der Code für das Backend kommt aber nicht aus einer AI, sondern aus [diesem Blog-Artikel](https://www.rustfinity.com/blog/create-high-performance-rest-api-with-rust). Es handelt sich eher um einfachen Boilerplate-Code. Mir ging es generell erst einmal darum, den Code zu verstehen und wie **Axium** in Rust funktioniert (überraschend gut, wie sich herausstellt). Der Code erzeugt einen Server mit einer Route, die „Hello World“ ausspuckt. Ein guter Anfang. 

![Rust - Boilerplate Code für das Backend](/assets/img/vibe-coding/rust-boilerplate.jpg)
_Der Code kommt von einem Blog Artikel und diente mir als Ausgangsbasis (Quelle: Screenshot / Markus Daams)_

Im Frontend bin ich mit dem Basis-Code des Frameworks gestartet. Man npm’t sich das Framework in den Ordner der Wahl, generiert sein neues Projekt und beginnt die Arbeit mit ``npm run dev``. **Vite** startet den Server und bietet ein überraschend gut funktionierendes Hot Reload. Als Datenbank kommt eine einfache **PostgreSQL** Datenbank zum Einsatz, die ich lokal hoste. 

Bis hier hin habe ich keine AI genutzt, aber ich wollte ja die Vibes spüren, also änderte ich meinen Flow von nun an.

## Woche 1: Die Basics

In der ersten Woche ging es mir darum, das Frontend Einsatz reif zu machen. Ich habe **ChatGPT** nach einem CSS-Framework gefragt, denn ich hatte dieses Mal nicht die geringste Lust, selbst was zu schreiben. Mir wurden die bekanntesten Frameworks und deren Vor- und Nachteile erläutert. Ich kannte sie alle und die Beschreibungen waren meiner Meinung nach gut. Es wurde dann am Ende **Material UI**. Warum? Dieses Framework ist sehr weit verbreitet, sehr gut dokumentiert und ich hatte das Gefühl, dass die AI Chats dieser Welt dadurch bessere Antworten generieren werden. Meine Liebe für freakige und exotische Frameworks musste hinten anstehen. 

Als Erstes musste es möglich sein, sich zu registrieren. Den Code dafür ließ ich mir dieses Mal generieren. In den Prompts gab ich stets an, welche Sprachen und Frameworks ich verwendete. Ich nutzte mehrere Anbieter, denn nicht jeder Code funktionierte.

* Registrierfunktion: Für diese brauchte ich im Frontend ein Formular. Das habe ich mir von **Deep Seek** erstellen lassen. Das war keine Hexerei, denn **Material UI** bringt ein tolles Formular mit sich. Im Backend benötigte ich eine Route für Axium, eine Handler-Funktion welche die Datenbank-Operation vornimmt und einen dazugehörigen Struct. Hier hat mir **Gemini** weiter geholfen.

* Login-Funktion: Dasselbe in Grün. Das Formular habe ich mir von **Deep Seek** erstellen lassen und der Backend-Code kam von **Gemini**.

![Registrierformular erstellt mit Material UI durch Deep Seek](/assets/img/vibe-coding/projekt-registrieren.jpg){: w="600"}
_Registrierformular erstellt mit Material UI durch Deep Seek (Quelle: Screenshot / Markus Daams)_

Der Code lief nicht auf Anhieb, denn **Gemini** arbeitete im Falle von Axium mit veralteter Syntax. Hier hat mir dann **Windsurf** ausgeholfen, welches ich als Add-on im **VS Code** nutze.

## Woche 2: Authentication

Hat sich ein User angemeldet, muss das irgendwo hinterlegt werden, damit das Frontend davon weiß. Hier tappte ich das erste Mal im Dunklen. Ich wusste, wie man so etwas zum Beispiel in *PHP* implementiert, aber nicht in *Rust*. Dabei sind die Unterschiede gar nicht so groß, wie sich heraus stellte. Ich ließ mich erneut von **Chat GPT** beraten und die Entscheidung viel auf **JSON Webtoken**. Mein Backend erzeugt nach erfolgreicher Anmeldung ein Token und liefert dieses dem Frontend zurück. Damit war es mir dann möglich, Routen im Frontend zu schützen, also vor nicht angemeldeten Usern zu verstecken. Auch konnte ich den Status nach der Anmeldung auf „logged in“ setzen. Allerdings brauchte es **Chat GPT** und **Deep Seek**, um dies umzusetzen. 

In der zweiten Woche ließ ich mir auch die Navigation von **Deep Seek** erstellen. Durch das JSON-Webtoken war es mir nun möglich, einen *Auth Provider* im Frontend zu implementieren. Der prüft, ob das Token gültig ist, leitet den User auf die Login-Seite weiter, falls nicht und löscht es, falls sich der User abmeldet. 

## Woche 3: Posts

In der zweiten Woche ließ ich mir von **Deep Seek** ein globales Theme erstellen, damit im Frontend nicht immer alles so hässlich ist. Das Resulat gefiel mir nach ein paar Promts und ich übernahm es. 

Nun aber kam der aufregendere Teil. Ich wollte, das User einen Post mit einem Titel verfassen können. Diese Posts sollten dann, natürlich, auch wieder angezeigt werden können. 

* Für das Frontend hieß das: Ein Formular für einen Post musste her. Ich hatte hier Sonderwünsche wie eine Zeichenbegrenzung und eine Anzeige, wieviele Zeichen noch geschrieben werden können. Um all das umzusetzen, brauchte ich mit **Deep Seek** eine Weile. Die Funktion zum Zählen der Zeichen musste ich dann von **Windsurf** debuggen lassen.

* Das Backend benötigte wieder eine Route, eine Handler-Funktion um die Posts in die Datenbank zu schreiben und einen dazugehörigen Struct. Der Code wurde fix von **Gemini** erstellt. Googles AI kämpfte aber wieder mit veralteter Syntax und teils sinnlosen Structs. Ich habe das aber selbst korrigiert – Vibes hin oder her. 

![Nun können Posts verfasst werden](/assets/img/vibe-coding/projekt-post.jpg)
_Die Posts werden an eine '/posts' Route im Backend gesendet und per POST in die Datenbank geschrieben (Quelle: Screenshot / Markus Daams)_

## Woche 4: Posts rendern

Die Posts sollten natürlich auch angezeigt werden. Meine Prompts wurden immer präziser und ich habe stets Dateien an die Chats mit angehängt, damit ich nicht jedes mal schreiben musste, dass ich **Material UI** verwende, oder einen Proxy für Vite, damit alle Requests vom Frontend an die ‚/api‘ Proxy gesendet werden sollen. Meine Prompts liefen auf das Muster hinaus: *Ergänze diesen Code um die Funktion, Posts zu rendern. Die API liefert folgende JSON Payload: post_id, title, body ...*. 

Im Frontend: Ich habe **Deep Seek** darum gebeten, die Posts so zu rendern, dass sie aussehen, wie von einem bekannten Kurznachrichtendienst. Ich blieb da sehr unpräzise, weil ich erst einmal sehen wollte, was dabei herumkommt. Ein bis zwei Prompts später hatte ich ein Ergebnis, das mir gefiel.

Im Backend: Das wurde zur Routine und ich hätte den Code am liebsten selbst geschrieben, aber die Vibes. DIE VIBES! **Gemini** gab mir die Route, die Handler-Funktion und den Struct.

![Die Posts werden gerendert](/assets/img/vibe-coding/projekt-posts-rendern.jpg)
_Die Posts werden nun auch im Frontend gerendert (Quelle: Screenshot / Markus Daams)_

In dieser Woche ließ ich **Le Chat** den Backend-Code etwas aufräumen, denn ich habe viele Warnungen bekommen, aufgrund veralteter Syntax. Die Domina mit Namen Rust mag sowas nicht. **Le Chat** schien mir in Sachen Rust eher auf dem neuesten Stand zu sein, als seine Kollegen. Das ist aber nur ein Gefühl.

## Woche 4: Mit den Ansprüchen wächst das Chaos

Ich kam mit dem Projekt recht gut voran und überlegte mir, was ich denn sonst noch gerne umsetzten würde. Kurznachrichten sind toll, aber wie wäre es mit Bildern? Geht doch alles super einfach mit der AI. 

Die Probleme begannen damit, dass ich gar keine Idee hatte, wie ich die Bilder der User speichern wollte. Als Erstes kam mir meine existierende Datenbank in den Sinn. Mein Projekt war nur ein kleines Hirngespinst für mich und sollte niemals live gehen. Warum die Bilder nicht einfach in Byte Arrays umwandeln und in der Datenbank speichern? Die Idee mochten **Gemini**, **Deep Seek**, **Chat GPT** und **Le Chat** gar nicht. Ich habe den dazugehörigen Code auch nie zum Laufen bekommen. Die Behandlung der Byte Arrays hat mir sowohl im Frontend, als auch im Backend Kopfschmerzen bereitet. Denn, das habe ich am Ende der Woche dann auch eingesehen, es war von Anfang an eine schwachsinnige Idee. 

Ich wollte dieses Projekt nutzen, um neue Dinge zu lernen. Irgendwann einmal hatte ich mit AWS Buckets hantiert. Gab es so etwas auch zum selbst hosten? Ja, gab es! [Hier mein Artikel dazu](https://markus-daams.com/posts/object-store-selbst-hosten/). Also änderte ich mein Projekt dahingehend, die Bilder in einem Object Store zu hosten. 

* Backend: **Gemini** musste ich nur mitteilen, dass ich **MinIO** nutze und dies in mein Projekt integrieren will. Es dauerte aber eine Weile, bis ich die korrekte Syntax bekam, denn wieder war diese oftmals veraltet.

* Frontend: Das ließ ich wieder von **Deep Seek** machen, denn es gefiel mir, was die Chinesen mit Material UI so alles anstellen können. Die Navigtion habe ich im selben Atemzug erneuert. 

![Bilder Posts sind nun auch möglich](/assets/img/vibe-coding/projek-bilderposts.jpg)
_Für die Bilder Posts habe ich Code aus den Text Posts recycelt. Das muss eine AI irgendwann mal aufräumen(Quelle: Screenshot / Markus Daams)_

Ja, das Chaos wurde mehr. Denn ich hatte immer mal wieder mit Bugs zu kämpfen, aber bekam auch immer mehr Ideen, wie es mit dem Projekt weiter gehen sollte. 

#### Und hier begann das Chaos:

Ich hatte mir nie ein Ziel gesetzt, wie der Endzustand des Projekts auszusehen hat. Mein Code wurde immer umfangreicher und es wurde zunehmend schwer, sinnvolle Prompts zu verfassen, ohne mindestens drei Projekt-Files mit anzuhängen. Außerdem hatte ich sekündlich neue Ideen, die ich umsetzen wollte. Warum nur *IstagramTwitterBook* daraus machen, wenn es auch *IstagramTwitterBookRedditTumblr* sein konnte? Features sind wie Schokomuffins mit flüssigem Schokokern und Schokostreuseln: Ich kann nicht genug davon bekommen. Error Handling? Hoppla, leider völlig ignoriert. Dafür brauche ich schnell mal eine mächtige Middleware. 

Ich musste umsteuern. 

1. Ich habe mir in meiner Nextcloud ["Deck"](https://apps.nextcloud.com/apps/deck) installiert. Ein super simples Kanban-Board. Hier habe ich zwei Boards erstellt, für Frontend und Backend. Ich erstelle hier Issues für Bugs und Feature Requests. Ich bleibe zwar bei meiner Meinung, dass SCRUM eine Pseudoreligion für Nerdige Supernerds ist (schreibe ich als SCRUM-Master), aber ein paar Ideen aus dieser Welt sind praktisch.

2. Ich integriere **Copilot** und **Gemini** neben **Windsurf** direkt in VS Code. Der Vorteil ist, dass alle Änderungen direkt in den Code übertragen werden können. 

![Deck Item in Nextcloud](/assets/img/vibe-coding/projekt-item.jpg)
_SCRUM ist doof, aber Kanban Boards sind die Erlösung für Feature Junkies wie mich (Quelle: Screenshot / Markus Daams)_

Beides hat mir sehr geholfen. Durch das Board fiel es mir nicht nur einfacher, mit auf bestimme Features zu konzentrieren. Bei der Formulierung habe ich auch bewusst darüber nach gedacht, was ich an Code sowohl im Frontend, als auch im Backend benötigte. Ich habe bei bestimmten Themen dann erst einmal etwas AI Recherche betrieben, um die Formulierungen zu verfeinern. Erst, wenn ich damit zufrieden war, ging es ans prompten. 

Mit diesem Vorgehen kam ich nun schneller zu Ergebnissen. Neue Features lassen sich viel schneller umsetzen, da ich genau weiß, was ich brauche und wie ich die Prompts verfassen muss. Allerdings ist meine ``main.rs``, welche den Backend-Code enthält, auf 784 Zeilen angewachsen. Ich muss modularisieren und will das mit einer AI machen. 

Ob das gut geht?  

## To be continued

Soweit erst einmal mein Erfahrungsbericht. Diesen werde ich auf jeden Fall fortsetzen. Mir ist bewusst, dass ich das „Vibe Coding“ noch nicht zu 100 % lebe, da ich noch oft selbst Hand anlege. Ich gebe aber auch zu, dass ich mich hin und wieder auch ungeschickt anstelle. Ich startete ohne klares Ziel und habe mir praktisch keine Projekt-Parameter gesetzt. Dennoch macht mir das Ganze viel Spaß. Ich lerne ständig dazu und passe meine Vorgehensweise kontinuierlich an. Dadurch war es mir möglich, ein etwas komplexeres Feature sehr schnell zu „vibe coden“.

Aber davon berichte ich im nächsten Artikel.

## Ressourcen

* [Vibe Coding Artikel auf Wikipedia](https://de.wikipedia.org/wiki/Vibe_Coding)

* [Was ist Vibe Coding? Definition, Tools, Vor- und Nachteile (Blog-Artikel auf datacamp.org)](https://www.datacamp.com/de/blog/vibe-coding)

* [Vibe Coding Memes auf programmerhumor.io](https://programmerhumor.io/memes/vibe-coding)