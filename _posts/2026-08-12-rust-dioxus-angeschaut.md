---
layout: post
title: "Rust Dioxus angeschaut"
date: 2026-08-12 07:11:46 +0200
category: coding
author: 
tags: [coding, rust]
description: "Das Rust Ökosystem wächst und gedeiht.Ich habe mir Dioxus einmal angeschaut."
image:
  path: /assets/img/post-header/header-rust-dioxus.jpg
  alt: Dioxus ist ein Rust powered Fullstack Framework 
---

# Der Neue im Block

Ich habe in meinem Blog schön öfters über Rust geschrieben. Das war nicht immer [ganz so ernst gemeint](https://markus-daams.com/posts/programmiersprachen-sind-halt-so/), aber stets mit stiller Bewunderung, denn Rust mäandert sich seinen Weg an die Spitze der beliebtesten Programmiersprachen. Ich habe es zuletzt verwendet, um ein Backend für ein eigenes kleines Social Network zusammen zuschustern. Dieses Backend läuft nach wie vor, ist robust und zudem angenehm Ressourcen schonend. Das Frontend wurde mit Vite (React) erstellt. In einer Welt, in der es mehr denn je auf Sicherheit ankommt, hat Rust seinen festen Platz.

Daher schaue ich mir auch immer einmal wieder an, was sich in dem Ökosystem rund um Rust so alles tut. Laufend entstehen neue Frameworks und bereits existierende werden trotz oder gerade wegen Vibe Coding weiter entwickelt. Eines davon hört auf den Namen **Dioxus**.

Dioxus beschreibt sich selbst wie folgt: 

> Build for web, desktop, and mobile, and more with a single codebase. Zero-config setup, integrated hot-reloading, and signals-based state management

Da wurden sämtliche Keywords abgefeuert, die man heutzutage auf die Menge loslassen muss. 
Für mich bemerkenswert: Es gibt hier ein cross-plattform Framework, das JSX ähnliche Syntax in Rust unterstützt. Backend, Frontend und Routing aus einem Guss.

Dioxus ist Stand heute (12.08.2026) in der Version 0.7x verfügbar. Für echte Produktivsysteme also noch nicht empfehlenswert. Dennoch klingt das Paket interessant, also luschere ich mal rein.

# Installation

Auch wenn ich in diesem Text nicht mit viel Code herumwerfen möchte, stelle ich die Installation einmal kurz vor. Während man neue Projekte in Rust typischerweise manuell anlegt, bringt Dioxus seine eigene CLI mit. Das bedeutet, die Erstellung eines neuen Projektes und die Entwicklung (z.B. Hot Reload) erinnern an andere Frameworks (JSX, Tailwind usw. usf.).

Anstatt also die Abhängigkeiten per (z.B.) `cargo` zu laden (das macht Dioxus), installiert man die `dioxus-cli`. Wie das geht, wird in der [Installationsanleitung](https://dioxuslabs.com/learn/0.7/getting_started/) erklärt. Selbstredend ist Rust eine Installationsvoraussetzung.

Ich habe mich für den klassischen One Liner entschieden:

```shell
curl -sSL https://dioxus.dev/install.sh | bash
```

> Auch hier wieder der Hinweis: Solche Zeilen nicht blind kopieren und ausführen, sondern immer den Blick in das Script wagen, das da ausgeführt wird :)
{: .prompt-warning}

Das war es schon und die CLI kann genutzt werden. Um das zu überprüfen, tippen wir sanft folgendes Kommando ein:

```shell
dx --version
dioxus 0.7.10 (57d6794)
```
Mit der CLI können neue Projekte angelegt werden, der Entwicklungsserver gestartet werden, das Projekt gebaut werden usw. Wer schon einmal mit irgend einem Framework dieser Art gearbeitet hat, weiß, was hier abgeht. Insgesamt macht das schon einen guten Eindruck.
Ich erstelle mir für den Test ein einfaches Webprojekt für eine Bildergalerie.
```shell
dx new bildergalerie

```

Hier startet nun ein Setup Assistent. Für mein Projekt habe ich diese Auswahl getroffen:

+ **Template:** *Bare-Bones* (also das Grundgerüst)
+ **Fullstack:** *false* (Für den Test brauche ich kein Backend)
+ **Dioxus Router:** *true* (Einen Router braucht man irgendwie ja immer)
+ **Tailwind CSS:** *true* (UI interessiert mich ebenfalls)
+ **Prompts for LLMs:** *false* (Niemand promptet so virtuos wie ich!)
+ **Web, Desktop, Mobile:** *Web* (Für den Test nehme ich Web. Mobile schaue ich mir später an)

Die CLI legt nun die Projektstruktur an und ich kann direkt los legen:

```shell
cd bildergallerie
dx serve
```

Damit wird der lokale Server gestartet und ich kann direkt loslegen. Der erste Start nimmt allerdings etwas Zeit in Anspruch, denn Tailwind muss installiert werden und die `cargo.toml` wird einmal durchgeknuspert. Sind alle Abhängigkeiten installiert, kann es aber echt losgehen.

Wie man sieht, ähnelt das Setup vielen bekannten Frameworks. Der Dummy-Code wird nach dem Start im Browser gerendert.

![Dioxus startet mit Dummy Code](/assets/img/dioxus/dioxus-dummy-code.jpg)
_Dummy Code und eine Beispiel Route von Dioxus (Screenshot: Markus Daams / 2026)_

## Sieht alles aus wie man es kennt

In der `main.rs` befindet sich bereits Dummy-Code. Da ich mich für den mitgelieferten Router entschieden habe, wird auch eine Beispiel-Route angelegt. Wie man es zum Beispiel von JSX kennt: URL-Parameter werden als Props an die Router Component übergeben,

Innerhalb der Rust-Component geht es dann mit RSX weiter, eine Syntax, die sehr der von JSX ähnelt – das finde ich cool. 

## Beispiel Code

Tailwind bringt seine CSS Klassen mit und diese lassen sich angenehm einfach einbinden. Die Component wird mit Rust erstellt, die RSX Syntax lässt mich dann den Rest in JSX ähnlichem Code gestalten. Das sieht dann in etwa so aus:

```rust
#[component]
pub fn Bildergalerie(id: i32) -> Element {
    rsx! {
        div {
             class: "mx-auto max-w-3xl p-8",

                h1 {
                    class: "text-5xl font-bold tracking-tight",
                    "Die Bildergalerie"
                }

                p {
                    class: "mt-4 text-lg text-gray-600",
                    "Hier ist die Bildergalerie mit der ID: {id}"
                }
            }
    }
}
```

Für meine Bildergalerie, die ich für diesen Test angelegt habe, ergibt dich der Code aus derselben Logik. 

```css
 div {
      class: "mt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3",

                img {
                    class: "h-64 w-full rounded-lg object-cover",
                    src: asset!("/assets/bilder/img-01.jpg"),
                    alt: "Foto 1"
                }

                img {
                    class: "h-64 w-full rounded-lg object-cover",
                    src: asset!("/assets/bilder/img-02.jpg"),
                    alt: "Foto 2"
                }

                img {
                    class: "h-64 w-full rounded-lg object-cover",
                    src: asset!("/assets/bilder/img-03.jpg"),
                    alt: "Foto 3"
                }
       }
```
Dioxus optimiert die Dateien im Ordner `assets` automatisch und kümmert sich um das bundling. 

![Dioxus startet mit Dummy Code](/assets/img/dioxus/dioxus-bildergalerie.jpg)
_Die Component ist Rust und Tailwind kümmert sich um die UI. (Screenshot: Markus Daams / 2026)_

## Groß umlernen muss man hier nicht

Da habe ich also ruckzuck meine kleine Bildergalerie angelegt. Groß umlernen muss ich mit Dioxus nämlich nicht. Rust macht seine Rust Dinge und so lässt sich das Routing fix anlegen und nutzen. Einen Deep Dive in das Routing findet sich natürlich in der [Dokumentation](https://dioxuslabs.com/learn/0.7/tutorial/routing) des Projektes.

Die RSX Syntax lehnt sich sehr dicht an die von JSX an. Wer also irgendwann mal irgendwas in JSX gecodet hat, fühlt sich hier schnell zu Hause. Mittels Tailwind lassen sich zügig ansehnliche Ergebnisse erzielen und selbstredend lässt sich auch Custom CSS einbinden. Die erzeugten Components können zudem wiederverwendbar gemacht werden und Props lassen sich durchreichen – kennt man, kann man weiter nutzen. Signals und Hooks scheinen ebenfalls mit von der Partie zu sein, das habe ich aber nicht ausprobiert. Insgesamt eine Runde Sache.

## Für wen lohnt sich das?

Dioxus hat sich ambitionierte Ziele gesetzt. Ein plattformunabhängiges Fullstack Framework kombiniert mit Rust ist ein ganz schöner Brocken. Statefull Components, Live View Rendering, RSX (wie JSX) Syntax, Typesafe Routing … ich könnte hier noch eine Weile weiter tippen. Als Framework ist das ein Brett. Dazu kommt die Modularität, denn man kann all die Sachen über Bord werfen, die man nicht braucht. So lassen sich auch reine Frontend Applikationen entwickeln, wenn man das wünscht.

Daher bin ich schon sehr angetan von Dioxus. Möchte ich mein selbst gebrautes Social Network neu aufsetzen, würde ich das vermutlich mit eben diesem Framework tun. Warum?

- Das Routing ist nicht sonderlich komplex. Es gibt eine Navigation und ein paar Unterseiten. Dioxus bildet das sauber ab. Routing und Datenbank-Logik hatte ich im Backend (Rust) implementiert. Ich könnte viel von dem Code sogar wiederverwenden (*… mmmhhh neues Projekt incoming?*)

- Ich habe auf Vite als Framework gesetzt, also React. Zudem hatte ich das CSS noch händisch zusammen gebastelt. Tailwind hätte mir Zeit und Nerven gespart. Die RSX Syntax weicht kaum von der von JSX ab, berücksichtigt halt das Rust Rückgrat.

- Ich hatte viel auf wiederverwendbare Components gesetzt. Diese lassen sich in Dioxus genau so oder ähnlich umsetzen.

- Dioxus kümmert sich um das Bundling und den Build Prozess. Das musste ich für Frontend und Backend separat aufsetzten und gerade bei den [Github Actions](https://markus-daams.com/posts/container-bauen-mit-github-actions/), dem Bau der Docker Container und dem Deployment ist viel Schweiß geflossen, bis das endlich klappte. 

Da Dioxus aber noch voll in der Entwicklung steckt, ist es für Heavy Use Produktivsysteme vermutlich noch nicht geeignet. Denn Version 0.7 kann auch bedeuten, dass Version 0.8 mit Breaking Changes daher kommt. Je nach Komplexität des Projektes kann so etwas schnell viel Zeit und Nerven kosten. Wofür würde ich Dioxus also aktuell verwenden?

* Internes Tooling
* Cross Plattform Dashboards
* Fast Prototyping für Fullstack Apps
* Spaß Projekte (sowieso)
* ... so was in der Art

Also alles, was nicht unbedingt ins Internet muss, um Revenue zu generieren.

## Mein vorläufiges Fazit

Ich hatte Dioxus schon lange hier auf einem kleinen digitalen Notizzettel stehen. Ich weiß nicht einmal mehr, wo ich das aufgeschnappt hatte. Um so mehr freut es mich, dass mich die Neugier gepackt hatte und es hat sich gelohnt. 

Von der Installation, über das Setup bis zur ersten Einrichtung geht sich in Dioxus alles ganz angenehm gewohnt an. Dazu kommt die Sicherheit, dass der [Borrow Checker](https://rustc-dev-guide.rust-lang.org/borrow-check.html) von Rust jede noch so kleine Sünde sieht und bestraft – Sicherheit geht stets vor. Daher habe ich mir vorgenommen, etwas tiefer einzusteigen. Ich werde beizeiten einmal evaluieren, ob ich mein Social Network in Dioxus neu anlege.

Vielleicht konnte ich mit diesem Text ja ein wenig Neugierde wecken. Es freut mich sehr, dass das Ökosystem rund um Rust sprießt und gedeiht. 

## Ressourcen

* [Dioxus - offizielle Website](https://dioxuslabs.com/)

* [Dioxus - offizielles GitHub Repo](https://github.com/dioxuslabs/dioxus)

* [Dioxus - offizielle Dokumentation (Version 0.7)](https://dioxuslabs.com/learn/0.7/)