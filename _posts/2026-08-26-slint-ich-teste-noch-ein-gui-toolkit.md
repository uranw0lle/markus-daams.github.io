---
layout: post
title: "Slint - das nächste Toolkit bitte"
date: 2026-08-26 07:16:37 +0200
ategory: coding
author: 
tags: [coding, rust]
description: "Programm- und GUI-Logik trennen, einfache Syntax und noch mehr? Ich muss mir Slint einmal anschauen."
image:
  path: /assets/img/post-header/header-slint.jpg
  alt: Slint gibt es für C++, Python. JavaScript und Rust
---

# Warum das Ganze?

Meine kreative Schaffenskraft kreist aktuell wieder um mein selbst gebautes Social Network, das mir aktuell als Ideenablage und Sh*t Post Halde dient. Es ist meine kleine Technik Demo, mit der ich neue Dinge ausprobiere und mir zum Beispiel auch anschaue, was Bot / Agenten so posten, wenn man sie von der Kette lässt. Kurz zur Erinnerung: Das Backend ist in Rust geschrieben, die Bilder, Videos usw. landen per [S3 Gateway](https://markus-daams.com/posts/ein-s3-gateway-mit-versitygw/) in einem Object Store, sonstige Daten in einer PostgreSQL Datenbank und das aktuelle Frontend materialisierte sich in [Vite](https://vite.dev/guide/). Das läuft alles prima und ich will mich auch gar nicht beschweren. Dennoch frage ich mich, ob ich das Frontend nicht ebenfalls in die Rust-Welt ziehen kann.

In einem [vorherigen Artikel](https://markus-daams.com/posts/rust-dioxus-angeschaut/) hatte ich mir dafür Dioxus angeschaut und für gut befunden. Es handelt sich hierbei aber nicht um ein reines GUI-Toolkit, sondern um ein komplettes Fullstack Framework. Ich muss nicht alle Komponenten nutzen, klar. Dennoch ist es recht … voluminös.

Da lohnt es sich für mich, über den Tellerrand zu schauen und weitere Toolkits zu testen. Das Rust-Ökosystem wächst und gedeiht, daher mangelt es nicht an Alternativen.

Bei meiner Suche bin ich auf **Slint** gestoßen. Meine ersten Eindrücke will ich in diesem Artikel schildern.

## Slint frisst fast alles

Meine Überlegung geht so: Das Backend bietet API-Endpunkte, in denen jeder Client alles abladen kann, solange er die passenden Daten liefert und einen gültigen Auth-Token mitbringt. Das heißt, mein Social Network kann über eine Web-UI angesteuert werden, über Scripte von lokalen AI-Bots, aber eben auch über klassische Softwarelösungen, die lokal laufen. Man stelle sich vor, man hat eine native Software auf dem eigenen Rechner, die mit dem Social Network kommuniziert. Das hat eine Reihe von Vorteilen (*nativ kann schneller sein*) und Nachteilen (*Portabilität geht flöten*). 

Meine aktuelle Lösung (Vite) läuft in einem LXC auf Proxmox, wiederum in einem Docker-Container der einen Webserver bereitstellt. Mit **Slint** wäre es mir möglich, eine App zu schreiben, die direkt auf einem Client-PC läuft. Es wäre keine Weboberfläche nötig. Selbstredend muss jeder Client, der an dem Netzwerk teilnehmen möchte, die Software installiert haben.

Hier kommen ein paar Stärken von Slint ins Spiel, die ich ebenfalls einmal aufzählen will:

1. Slint stellt nur das GUI-Toolkit bereit (leichtgewichtig, yeah!)
2. Programmlogik kommt von einer separaten Software (flexibel, yeah!)
3. Diese kann in JavaScript, C++. Python und eben Rust geschrieben sein
4. Sprache ist deklarativ und erinnert an CSS, QML usw. 
5. Slint ist API stabil: > Version 1.x.
6. Es gibt eine Qt Anbindung (für KDE / Linux nützlich)
7. Es gibt sogar einen eigenes Backend nebst Renderer!
8. Läuft zur Not auf Kartoffel(*PCs*)

Ich kann die Software in Rust schreiben und die GUI in Slint-*ianisch* (?). Das klingt so gut, dass ich das einmal ausprobiert habe.

## Is’ nur ein Test, Vibe Code ahoi!

Für Rust findet sich unter [diesem Link](https://docs.slint.dev/latest/docs/rust/slint/) die Crate Dokumentation. Allerdings stellen die Maintainer für die unterstützten Sprachen auch Templates bereit. Unter diesem Link findet sich das [Slint-Rust-Template](https://github.com/slint-ui/slint-rust-template) nebst Erklärung.

Die Installation ist wahrlich nicht schwer:

1. Datei herunter laden und entpacken
2. `cd` in das Projektverzeichnis
3. `cargo run`

Sowohl die `main.rs`, als auch die für Slint wichtige `.slint` Datei sind bereits mit Beispiel-Code befüllt. Die Syntax von Slint erinnert an CSS, sodass sich die Logik schnell erschließt.

Ich habe mir von **Claude** allerdings ein anderes Programm schreiben lassen. 

![Slint - Demo der GUI](/assets/img/misc/slint-demo.jpg)
_Das mitgelieferte GUI Toolkit meldet sich brav in Wayland an (Screenshot: Markus Daams / 2026)_

Das von Claude erstellte Programm lief sofort, da es keine weiteren Komponenten erforderte. 

Allerdings hatte ich das Problem, dass das Toolkit mit dem auf meinem System installierten Qt nichts anfangen konnte, ich nutze KDE (mit Qt 6.11.1) . Die Fehlermeldung war nichtssagend. Meine erste und völlig ins Blaue hineingeratene Vermutung ist, dass ich die Qt-Header verlinken bzw. `qmake` installieren muss. Für eine genauere Fehlersuche blieb mir aber keine Zeit und Slint bringt sein eigenes Toolkit mit.

Wie sieht die Syntax aus?

## Beispiel Code

```qml
export component MainWindow inherits Window {
    width: 200px;
    height: 100px;

    // Property: Rust kann diese lesen und schreiben
    in-out property <int> counter: 0;

    // Callback: wird von Rust "abonniert"
    callback increment-clicked();

    // Ab hier geht dann das UI Style Gelöt los
    VerticalLayout {
        alignment: center;

        Text {
            text: "Zähler: " + counter;
            font-size: 20px;
            horizontal-alignment: center;
        }

        Button {
            text: "+1";
            clicked => { increment-clicked(); }
        }
    }
}
```

**Kleiner Hinweis dazu:** Ich habe in Jekyll keinen slint-Lexer, daher nutze ich für das Syntax Highlighting QML. Nicht verwirren lassen, Slint ist noch neu und nerdy.

Die Rust Logik würde in etwa so aussehen:

```rust
slint::include_modules!();

fn main() -> Result<(), slint::PlatformError> {
    let ui = MainWindow::new()?;

    ui.on_increment_clicked({
        let ui_weak = ui.as_weak();
        move || {
            let ui = ui_weak.unwrap();
            ui.set_counter(ui.get_counter() + 1);
        }
    });

    ui.run()
}
```

Kurz um: Per `in-out` property kann das Rust Programm Werte lesen und schreiben. Durch den Callback kann Rust den Counter in diesem Beispiel abonnieren. Dadurch wird die Zwei-Wege-Kommunikation etabliert. In diesem Fall handelt es sich um die Zahl das Counters. Rust liest und inkrementiert den Wert, die UI zeigt diesen an. Da sich nur der Wert des Counters ändert, wird auch nur diese Zahl geändert und nicht etwa die ganze UI neu gerendert. Die UI selbst wird mit einer sehr an CSS erinnernden Sprache gestaltet. Die eigentliche Programmlogik ist demnach von der UI strickt getrennt. Das würde zum Beispiel ermöglichen, dass ich von Rust auf Python wechseln kann, ohne viel an der UI ändern zu müssen. Oder auf JavaScript, wenn ich den Pfefferminztee mal wieder zu lange habe ziehen lassen.

Bemerkenswert ist, dass Slint unter Linux keinen mitgelieferten Windowmanager bzw. Compositer benötigt. Das ist insbesondere für Embedded Systeme interressant. Detaillierte Informationen dazu findet sich in der Dokumentation im Abschnitt [Backends & Renderers](https://docs.slint.dev/latest/docs/slint/guide/backends-and-renderers/backends_and_renderers/#renderers). Da es auf meinem System mit Qt nicht kommunizieren konnte, ist es auf das mitgebrachte Winit  + FemtoVG zurück gefallen. Das ist bereits integriert. Wer will, kann jedoch auf das [LinuxKMS Backend](https://docs.slint.dev/latest/docs/slint/guide/backends-and-renderers/backend_linuxkms/) wechseln. Nutzt man dies, ist kein X-, oder Wayland-Server mehr nötig.

## Mein kleines Fazit

Ein Urteil will ich an dieser Stelle noch nicht abgeben, da ich mir das Ganze erst einmal nur angesehen habe. Dennoch habe ich Eindrücke sammeln können und diese sind durchaus positiv.

Slint ist noch sehr neu, aber schon stabil. Ich muss nicht damit rechnen, dass mögliche „Breaking Changes“ bereits geleistete Arbeit ruinieren. Nur die Kommunikation mit Qt hat bei mir – auf die Schnelle – noch nicht klappen wollen. Ich bin mir aber sicher, dass ich das hinbekommen würde, denn das Projekt wirbt schließlich damit.

Als sehr vorteilhaft sehe ich die einfache Syntax - diese ist sehr CSS-like - und die einfache Projektstruktur. Wenn ich wollen würde, könnte ich den gesamten UI Code in der `app.slint` Datei unterbringen und glücklich sein.

Slint ist schlank und sehr ressourcenschonend. Selbst auf dem *RaspberryPi* und anderen Embedded Systemen lassen sich schicke und schnelle GUIs nebst Programmlogik zum Laufen bekommen. Da sehe ich auch einen Haupteinsatzzweck von Slint: Heimautomatisierung, homemade Dashboards usw. Durch das sehr flexible Toolkit lassen sich jedoch auch native Anwendungen für die Desktops dieser Welt bauen.

Für mein Vorhaben baue ich gerade das UML-Diagramm und ein Kanban-Board zusammen. Ich habe Slint mit aufgenommen. Ich werde es also für mich evaluieren, wenn es ans Eingemachte geht.

Wer auf der Suche nach einem reinen GUI-Toolkit mit integriertem Backend / Renderer, einfacher Syntax und maximaler Flexibilität hinsichtlich des Hardwareunterbaus ist, sollte sich Slint unbedingt einmal anschauen. 


## Ressourcen 

* [Slint - offizielle Projekt Website](https://slint.dev/)

* [Slint - ofizielles GitHub Repo](https://github.com/slint-ui/slint)

* [Slint - Rust Template auf GitHub](https://github.com/slint-ui/slint-rust-template)

* [Slint - offizielle Dokumentation (Englisch)](https://docs.slint.dev/latest/docs/slint/)

* [Slint Crate auf doc.rs](https://docs.rs/slint/latest/slint/)
