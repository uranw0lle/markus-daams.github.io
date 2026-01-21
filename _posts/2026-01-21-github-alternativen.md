---
layout: post
title: "Github Alternativen"
date: 2026-01-21 08:22:02 +0100
category: coding
author: 
tags: [coding, selfhosting]
description: "Die Welt wird immer wilder. Ich mache mich auf die Suche nach einer GitHub Alternative."
image:
  path: /assets/img/post-header/header-github-alternativen.jpg
  alt: Github Alternativen
---

# Hoffen ist gut, Vorsorge ist besser

Wir waren nur ein paar Tage in 2026, als die Welt noch weiter frei drehte, als sie es ohnehin schon tat. Dieselbe Welt wird auch zunehmen isolationistischer und in diese Gemengelage kommen Großkonzerne, die einen ordentlichen Reibach machen wollen. Alles wird nicht nur wilder, sondern auch teurer, viel teurer.

In solche Gedanken schweife ich vor allem dann ab, wenn ich meine Codeauswüchse in Richtung GitHub hochlade. Ich mag diese Seite sehr gerne, denn man kann hier Code hoch- und herunterladen, verwalten, mit anderen zusammenarbeiten und viel, viel mehr. Sucht man nach dem Code irgendeines Projektes, landet man zu 95 % (emotionale Evidenz) auf GitHub. Es ist beliebt und bietet ein tolles Angebot, ohne das man dafür etwas zahlen muss (man kann aber). Allerdings gehört es zu Microsoft. Ein Unternehmen, das seit einiger Zeit durch Preiserhöhungen und wahnhafte AI Integration in so gut wie alles auffällt. Ein kostenloses Angebot passt hier nicht in das Bild eines Unternehmens, das sich konsequente Monetarisierung als den einzig wahren Fixstern auserkoren hat.

Aber hier kommt die gute Nachricht! GitHub mag eines Tages ebenfalls dem Mammon zum Opfer fallen, **Git** aber nicht. Git ist die Versionsverwaltung, die hinter dem Angebot von Microsoft steht und diese ist open source und kostenfrei. Wir haben dieses Projekt übrigens Linus Torvalds zu verdanken, dem Vater von Linux, gelobt sei sein Name auf ewig.

Jeder kann selbst eine eigene Versionsverwaltung auf Basis von Git aufsetzen. So ist es auch nicht verwunderlich, dass es neben GitHub noch weitere Anbieter gibt. Es ist also an der Zeit, einen Blick auf mögliche Alternativen zu werfen.

## GitLab 

Ich fange mit **GitLab** an, denn es ist neben GitHub der zweite Elefant im Stall. **GitLab** bietet neben einem Premium-Angebot auch einen Free-Tier an, also einen kostenlosen Tarif.
Dieser bietet, Stand 21.01.2026, folgende Features:

- Code Verwaltung und CI / CD Integration
- Bis zu 5 User-Lizenzen (pro Account für Colab)
- 400 Compute Minuten pro Monat
- 10 GiB Speicher

Für kleine Projekte reicht das völlig aus und liest sich auch nicht schlecht. Wer sich einmal eine CI / CD Pipeline eingerichtet hat, will so etwas auch nicht mehr missen, selbst wenn es um die eigenen [Frickel-Projekte](https://markus-daams.com/posts/container-bauen-mit-github-actions/) geht.

Jetzt kommt das große „Aber“: **GitLab** ist ein US-Unternehmen und unterliegt vollständig der US-Jurisdiktion. Zudem haben besonders amerikanische Unternehmen aktuell den Hang dazu, kostenlose Angebote zu streichen und die Premium Tarife teurer zu machen. Daher wäre ein Wechsel von GitHub auf **GitLab** für mich nur eine Verschiebung meines Problems. Ich schaue besser einmal weiter.

## Der Blick nach Europa: Codeberg

Für „einfach nur hosten“ gibt es [**Codeberg**](https://codeberg.org/). Hinter diesem non-profit Projekt steht die Codeberg e. V., eine gemeinnützige Organisation aus Deutschland. Ziel ist es, eine Infrastruktur zu schaffen, die vollständig dem europäischen Recht unterliegt und so weit es irgendwie möglich ist, unabhängig von US-Technologie zu agieren. So stehen die Server zum Beispiel in der EU. Den europäischen Datenschutz gibt es also als Kirsche oben auf die Sahne. Es gibt hier nicht einmal Cookies oder sonstiges Tracking.

Die Finanzierung erfolgt durch die Mitglieder und durch Spenden. Laut den [F.A.Qs](https://docs.codeberg.org/getting-started/faq/) besteht keine Gefahr, dass [**Codeberg**](https://codeberg.org/) in nächster Zeit verschwindet.
Das Angebot ist „Git typisch“, also (auszugsweise):

* Speicher für den eigenen Code
* Kollaboration mit anderen Usern
* Wiki, Markdown, alles was es für die Doku braucht
* Bug Tracker / Issue Verwaltung
* Codeberg Pages (vgl. GitHub Pages)

Liest sich alles toll und ist es auch. Ich freue mich sehr über solche Anbieter. Allerdings ist es für mich ebenfalls keine Alternative. **Codeberg** richtet sich vor allem an Open-Source-Projekte. Diese Projekte sollten also unter einer freien Lizenz stehen. Welche das sind, wird in dem entsprechenden Artikel erläutert [Licensing on Codeberg
(auf Englisch)](https://docs.codeberg.org/getting-started/licensing/). Private Repos sind nicht gerne gesehen, auch wenn sich aktuell toleriert werden, wenn man sich aktiv an anderen Projekten beteiligt. Möchte man also seinen Code „lieber für sich“ behalten, ist **Codeberg** vielleicht nicht die beste Wahl. Für eine ausführliche Erläuterung empfehle ich die F.A.Qs.

Mein Zwischenfazit: Codeberg ist toll, aber nichts für einen Eigenbrödler wie mich.

## Selbst ist der Hoster: GitLab?

Weiter oben im Artikel habe ich bereits **GitLab** erwähnt und warum ich es nicht in Betracht ziehe. Allerdings gibt es eine Möglichkeit, **GitLab** zu europäisieren. Denn es gibt da noch die [**GitLab Community Edition (CE)**](https://gitlab.com/browse/gitlab-ce). Diese ist kostenlos, steht unter einer freien Lizenz (MIT) und kann von jedem gehostet werden, dem danach der Sinn steht.

Aber das **Aber** von oben muss auch an dieser Stelle mit angefügt werden: Es ist eine Bazooka auf ein Problem, das eher ein Skalpell erfordert. **GitLab** ist ein Feature Monster und benötigt entsprechende Ressourcen. Mein kleiner Proxmox-Server könnte es stemmen, aber dieses Projekt würde viel mehr Probleme lösen, als ich habe und imstande zu verursachen bin. Es lohnt sich eher für kleine und mittlere Unternehmen, die sich einen Server bei Hetzner gönnen können und mehrere Projekte gleichzeitig verwalten wollen. Solche Anforderungen habe ich aktuell nicht. Ich werde es mir aber zu einem anderen Zeitpunkt genauer anschauen. 

## Eine Nummer kleiner: Gitea? Forgejo!

Die gute Nachricht vorweg: **Gitea** selbst ist open source (MIT Lizenz) und kann von jedem gehostet werden. Das ist also ganz in meinem Sinne. Allerdings steht dahinter die „Gitea Limited“, ebenfalls ein profitorientiertes Unternehmen, welches das einst freie Projekt an sich gezogen hat. Man kann es immer noch installieren und nutzen, aber irgendwie missfällt mir die Art und Weise, wie mit dem Projekt umgegangen wurde. In [diesem Wikipedia Artikel](https://de.wikipedia.org/wiki/Gitea) gibt es die Hintergründe dazu.

> *Ein Code-Königreich für eine Lösung ohne ein profitorientiertes Unternehmen!*

Wer rettet mal wieder den Tag? Die Open-Source-Community! Gitea bekam einen Fork namens **Forgejo**, hinter dem eine große und freie Community steht. Sogar das oben erwähnte **Codeberg** setzt hierauf. Das schaue ich mir einmal an und installiere es in einem schnell erstellten LXC.

Die Installation per Docker Compose geht ebenfalls fix von der Hand:

``` yaml
services:
  forgejo:
    image: codeberg.org/forgejo/forgejo:14.0.1
    container_name: forgejo
    restart: unless-stopped
    ports:
      - "3000:3000"
      - "2222:22"
    volumes:
      - ./data:/data
      - ./config:/etc/forgejo
    environment:
      - USER_UID=1000
      - USER_GID=1000
```
 Nach der Installation ist Forgejo dann unter der IP meines LXC erreichbar. Ein kleiner Installationsassistent fragt ein paar Basis-Daten ab und das war es. Fertig ist die kleine Code-Halde.

Das Look & Feel ist an GitHub angelehnt, daher muss ich mich nicht groß umorientieren. 

![Forgejo Repository Ansicht](/assets/img/forgejo/forgejo-repo-ansicht.jpg){: width="600"}
_Forgejo Repository Ansicht (Screenshot: Markus Daams / 2025)_

![Forgejo Issue Ansicht](/assets/img/forgejo/forgejo-issue.jpg){: width="600"}
_Forgejo Issue Ansicht (Screenshot: Markus Daams / 2025)_

![Forgejo Aktivitäten Ansicht](/assets/img/forgejo/forgejo-aktivitäten.jpg){: width="600"}
_Forgejo Aktivitäten Ansicht (Screenshot: Markus Daams / 2025)_

Mit **Forgejo** bekomme ich eine wirklich gute Alternative zu GitHub.
Was mir am besten gefällt: **Forgejo** ist vollständig open source und die Community groß genug, um das wohlige Gefühl der Dauerhaftigkeit in mir zu erzeugen. Ich begebe mich nicht in die Abhängigkeit eines einzelnen, profitorientierten Unternehmens. Zudem lässt sich die Feature-Liste durchaus sehen:

* Leichtgewichtig und performant auf kleinen Systemen
* Issue Verwaltung
* Wiki
* Markdown Gelöt
* CI / CD Pipeline lässt sich mit Actions einrichten
* und vieles mehr.

## Habe ich meine Alternative gefunden?

In unruhigen Zeiten wie diesen hinterfragt man viele Dinge, an die man sich in der Vergangenheit gewöhnt hat. So etwas wie eine Versionsverwaltung für eigene Code-Projekte gehört konsequenterweise auch dazu. Ich nutze **GitHub** sehr gerne, denn ich nutze es schon sehr lange, finde viele Features toll und … nun ja, ich habe mich daran gewöhnt. Es erscheint mir bedauerlicherweise nicht mehr so unwahrscheinlich, dass sich dieser Zustand eines Tages ändert. Daher hatte ich die Suche nach einer Alternative schon länger auf meinem Zettel. Nach meinem [letzten Artikel zum Thema GitHub Actions](https://markus-daams.com/posts/container-bauen-mit-github-actions/) ging die Suche los.

Alternativen gibt es in diesem Fall ein Glück sehr viele, aber nicht jede löst das zugrunde liegende Problem, die Abhängigkeit von einem einzigen Unternehmen, welches wiederum abhängig von einer Regierung sein kann. Wie so oft hört auch hier die Lösung oftmals auf den Namen „Open Source“. Ist die Community groß genug, ist davon auszugehen, dass das Projekt auch auf lange Sicht genügend Unterstützung erhält. Allerdings fällt beim selbst hosten ein kleiner aber feiner Teil weg: Den Computer zum Speichern der Daten und die Rechenpower muss ich wieder selbst stellen. Den Strom bekomme ich ebenfalls nicht gratis. Freiheit hat eben ihren Preis.

Ich habe also die Qual der Wahl. Auf der einen Seite steht ein kostenloses Angebot, betrieben von einem Unternehmen, dass sich bedrohlich der dunklen Seite der Macht verschreibt. Auf der anderen Seite bin ich der kleine Rebell, der einen kleinen LXC hostet und das Beste hofft. 

Ich stürze mich auch hier in das Abenteuer und gebe **Forgejo** eine Chance. Mal schauen, vielleicht ergeben sich ja auch spannenden Themen für weitere Blog-Artikel.

## Ressourcen

Es gibt natülich noch viel mehr Anbieter, ich konnte nicht alle aufzählen. Mit diesem Artikel wollte ich auch nur meine kleine Reise auf der Suche nach einer geeigneten Alternative beschreiben.

* [Offizielle Seite von GitLab](https://gitlab.com/)
* [Offizielle Seite von Codeberg](https://codeberg.org/)
* [Offizielle Seite von Gitea](https://gitea.com/)
* [Offizielle Seite von Forgejo](https://forgejo.org/)





