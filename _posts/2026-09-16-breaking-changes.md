---
layout: post
title: "Breaking Changes"
date: 2026-09-16 07:05:34 +0200
category: selfhosting
author: 
tags: [selfhosting, proxmox, text, linux]
description: "Nach dem Update ist vor dem Update. Warum Breaking Changes nerven, aber so wichtig sind."
image:
  path: /assets/img/post-header/header-breaking-changes.jpg
  alt: Zwei Worte, die viel Arbeit bedeuten - Breaking Changes
---

# Bis einer weint, meistens ich

Jedes Mal, wenn Spotify, Netflix und Co die Preise erneut erhöhen, oder Google wieder einen liebgewonnenen Dienst einstellt, dann lächelt eine bestimmte Gruppe von Menschen still in sich hinein. Die Rede ist von denen, die Services, Apps und Tools selbst hosten. Dank [Proxmox](https://markus-daams.com/tags/proxmox/), TrueNAS, Unraid und vielen weiteren Lösungen da draußen ist dieses Thema Mainstream fähig geworden. Dienste wie [Immich](https://markus-daams.com/posts/immich-fotos-und-videos-selbst-hosten/) sind hierbei so gut geworden, dass sich die kommerzielle Konkurrenz schon fast schämen sollte.

Server einrichten, Software installieren, Geräte verbinden und schön ist die Welt, oder?

Leider ist dem nicht so, denn Software veraltet immer schneller. Hierdurch ist man als Betreiber seiner eigenen kleinen Serverfarm verpflichtet, eben diese Software auf dem neuesten Stand zu halten. Je komplexer die eigenen Installationen sind, desto aufwendiger kann so etwas werden. Einige dieser Updates haben es nämlich in sich.

Entwicklungstools werden immer besser, Programmieren zu lernen ist einfacher und beliebter denn je und Trends wie [CI / CD](https://markus-daams.com/posts/container-bauen-mit-github-actions/) und nicht zuletzt die KI befeuern eine Beschleunigung der Entwicklungszyklen. Immer mehr Programmierer bzw. KI-Agents beteiligen sich an Software Projekten. Das reicht von einfachen Commits für Features bis zu Bugfixes als Massengut.

Das bringt mich nun zu meinem Thema, die **Breaking Changes**. Eine Software bekommt ein Update, dass bestimmte Funktionen oder Bestandteile so weit verändert, dass etwas buchstäblich „bricht“. Eine API funktioniert nicht mehr wie gewohnt, die Datenbank wird gewechselt oder man schreibt gleich alles in einer neuen und modernen Programmiersprache. Der Fantasie sind keine Grenzen gesetzt.

Diese Breaking Changes können viel Arbeit machen. Sie sind aber auch wichtig. Ich will das anhand von vier Beispielen deutlich machen, die mir alle innerhalb von zwei Wochen über den Update-Weg gelaufen sind.

Schauen wir uns das an.

## Portainer - Kapitalismus hits again

Portainer ist sehr beliebt. Es handelt sich um einen grafischen Überbau von [Docker](https://www.docker.com/) und hat sich wegen seiner sinnvollen Funktionen und besonders wegen der „Community Edition“ in die Herzen vieler Hoster und Entwickler geschlichen. Portainer richtet sich vor allem an kommerzielle Kunden, hat die Open Source Community aber stets mit bedacht. Man konnte die Portainer CE Version nutzen und wurde nicht penetrant in die Enterprise Lösungen geschubst.

Nun, das galt bisher.

Mit der Version 3 wird Portainer die Community Edition nicht mehr anbieten. Als Trostpflaster verkündet man, die Version 2.45 noch eine Weile mit Sicherheitsupdates zu versorgen. Neue Features wird es aber keine mehr geben bzw. nur noch gegen Entgeld. 

Das ist zunächst einmal kein Breaking Change im klassischen Sinne. Ich nutze Portainer aber sehr gerne und zudem für einige Services, die mir wichtig geworden sind, darunter [AudioMuse-AI](https://github.com/NeptuneHub/AudioMuse-AI). Mit dem Wechsel der Geschäftsstrategie wurde mir der langsame Tod der Community Edition angekündigt, denn nichts anderes bedeutet dieser Schwenk. Ich muss mich nun nach einer Alternative umschauen, wenn ich weiterhin zuverlässig Sicherheitsupdates bekommen möchte. Und in einer Welt, in der immer schneller immer tollere Funktionen programmiert werden, freut man sich eben auch über das eine oder andere Feature Update.

Dieser Breaking Change macht für mich eine Migration der Image- und Container-Verwaltung notwendig. Aktuell teste ich [Arcane](https://github.com/getarcaneapp/arcane). Deren Motto auf der [offiziellen Website](https://getarcane.app/) - *Always free. Forever. Never changing*. Ich hoffe es. 

## Paperless -  Nur ein Breaking Change? Viele!

[Paperless-ngx](paperless-ngx.com) ist diese Art Software, die man einmal installiert und dann schnell wieder vergisst. Sie arbeitet still im Hintergrund und ist dennoch unheimlich nützlich. Es handelt sich um eine digitale Dokumentenverwaltung. Wer auf ein papierloses Büro umsteigen möchte, kommt an Paperless-ngx schon fast nicht mehr vorbei. Ich nutze es für Briefe, Bescheide, Formulare, Abrechnungen u. v. m. Obwohl sich auch dieses Projekt vornehmlich an kleine bis mittlere Unternehmen richtet, ist es auch ein heimlicher Star im privaten Bereich.

Mit der [Version 3](https://docs.paperless-ngx.com/changelog/#paperless-ngx-300) wurde aber nicht nur ein Breaking Change ausgeliefert, es kamen gleich neun! Also wennschon dennschon.

Meine Installation konnte ich nicht so ohne weiteres updaten. Da die API umgestellt wurde und sich auch was an der Datenbank geändert hat, war viel Handarbeit im Terminal angesagt. Zunächst hatte ich die Arbeit aufgeschoben. Ich habe es mir zur Angewohnheit gemacht, wenigstens ein Minor Update (z.B. von 3.0 auf 3.1) abzuwarten. Allerdings ist das nicht immer möglich, denn häufig werden mit solchen Updates auch Security Fixes ausgeliefert. Bei diesen warte ich ungern lange, denn dank KI werden Sicherheitslücken immer schneller entdeckt und ausgenutzt.

Mit Version 3 kamen aber auch eine Ladung  Features und Verbesserungen hinzu. Die Anpassung der Konfigurationen und der Datenbank haben mich alles in allem 1,5 Stunden gekostet. 
![Paperless-ngx - Changelog](/assets/img/breaking-changes/paperless-ngx-breaking-changes.jpg)
_Breaking Change, Breaking Change, Breaking Change ... (Screenshot: Markus Daams / 2026)_

## Navidrome – kleine Änderung, große Wirkung

Es gibt Projekte, da muss man einfach fest mit Breaking Changes rechnen. Das gilt vor allem für jene, deren Versionsnummer kleiner 0 ist. Im Falle von [Navidrome](https://www.navidrome.org/) ging es von Version 0.63 auf die Version 0.64.

Navidrome ist eine Software um Musik lokal zu hosten und zu streamen. Man kann sich damit quasi sein eigenes Spotify basteln. Die Entwicklung hat zuletzt Fahrt aufgenommen und ich nutze Navidrome richtig gerne.

Der Versionssprung brachte einen wichtigen Breaking Change mit sich. Die internen IDs der einzelnen Musikfiles wurden neu kodiert und damit vereinheitlicht. Das ist notwendig und sinnvoll, denn mit dieser ID kann jedes Musik-File eindeutig identifiziert werden. Durch diesen Wechsel wurde es aber nötig, alle verbundenen Apps zu aktualisieren. Diese mussten die gespeicherten und alten IDs löschen und durch die neuen ersetzen – was mit einer erneuten Synchronisation schnell erledigt ist.

Für mich was dies aber etwas mehr „Breaking“. Ich habe AudioMuse-AI mit Navidrome verbunden. Die Änderung der ID bedeutete, das AudioMuse die Musik-Files nicht mehr finden konnte. Das brachte mich zunächst ins Schwitzen, denn die initiale Analyse aller Files hatte fast eine Woche gedauert (viel Musik, schwache Hardware). Es graute mir ein wenig davor, das nun noch einmal machen zu müssen.

Glück für mich war, dass die Macher hinter AudioMuse diese Herausforderung antizipierten und einen [Migrationspfad](https://github.com/NeptuneHub/AudioMuse-AI/discussions/908) ermöglichten. Durch die interne Provider-Migration von Navidrome zu Navidrome konnte ich die Datenbank aktualisieren. Dies ersparte mir eine vollständige neue Analyse.

Die Aktualisierung von Navidrome, sowie die Provider-Migration in AudioMuse nebst „Refresh“ Analyse haben mich insgesamt zwei Stunden gekostet. Die Umstellung der ID bei Navidrome ist nachvollziehbar und macht die Software fit für die Zukunft. Daher war es mir die Mühe wert. 

![Navidrome - Changelog](/assets/img/breaking-changes/navidrome-breaking-changes.jpg)
_Ist doch nur eine ID, warum so ernst? (Screenshot: Markus Daams / 2026)_

## Jellyfin -  Was Navidrome kann, können wir auch

Beim Projekt [Jellyfin](https://jellyfin.org/posts/jellyfin-release-12.0/) wollte man nicht zurückstecken und ist von Version 10.12.x gleich auf Version 12 gesprungen. Auch bei Jellyfin profitiert man von dem Umstand, dass sich immer mehr Entwickler finden, die zu tollen open source Projekten etwas beitragen wollen.

Jellyfin ist großartig, denn man kann neben Filmen, Serien und Musik auch Hörbücher und E-Books hosten. Und noch viel mehr, denn inzwischen ist es ein digitales Schweizer Taschenmesser der Self-Hosting-Community geworden.

Das Update auf die Version 12 brachte drei wichtige Breaking Changes mit sich. Das Schema der Datenbank und die API wurden geändert. Dazu müssen Plugins nun **.NET 10** adressieren und hierfür entsprechend neu gebaut werden. Eine Containerschiff-Ladung voller Features und Verbesserungen rundet das Major Upgrade ab.

Auch dieses Update hätte ich gerne erst einmal aufgeschoben und mindestens auf die Version 12.1 gewartet. Aber der Satz *This release includes a number of security fixes on both the server and the web client.* weckte mal wieder Handlungsdrang in mir. Das Update lief glücklicherweise sauber durch, aber als begeisterter Freund von Plugins musste ich feststellen, dass die meisten nicht mehr funktionierten. In den folgenden Tagen wurden diese entweder von den Entwicklern aktualisiert, oder ich musste mich nach Alternativen umschauen, weil das dazugehörige Projekt nicht mehr aktiv war. Meine eigene App verwendet ebenfalls die API. Hier musste ich die Authentifizierungsmethode anpassen, mit der ich die API angesprochen habe. 

Jellyfin ist deutlich schneller geworden, sodass das Update ein großer Sprung nach vorne ist. Die Aktualisierung selbst ging sehr schnell vonstatten. Allerdings fehlen mir nach wie vor Funktionen, die von Plugins bereitgestellt wurden, die nicht mehr gepflegt werden. Der Zeitaufwand lässt sich so nicht sinnvoll berechnen. 

![Jellyfin - Changelog](/assets/img/breaking-changes/jellyfin-breaking-changes.jpg)
_Datenbank und API geändert, darf es noch etwas mehr sein? Security? (Screenshot: Markus Daams / 2026)_

## Breaking Changes nerven, aber müssen sein

Die oben beschriebenen Fälle liefen innerhalb von zwei Wochen bei mir auf. Im Falle von Paperless-ngx ist es meine Schuld, weil ich etwas länger abgewartet hatte. Die Worte Datenbank und Migration lösen bei mir eine nervöse Gänsehaut mit Kälteschauer aus. Durch die vielen Änderungen in und an den Projekten, aber auch durch meine eigenen Anpassungen lief in kurzer Zeit viel Arbeit auf.

Beschweren will ich mich aber nicht. Diese Projekte werden vor allem von ehrenamtlichen Menschen betrieben und unterstützt. Dass ich mich bei jeder Preiserhöhung und Feature-Streichung der großen Unternehmen entspannt zurücklehnen kann, habe ich genau diesen Leuten zu verdanken.

Auch die digitale Welt dreht sich immer schneller. Neue Projekte schießen wie Pilze aus dem Boden und bereits existierende werden mit vielen neuen Updates und Features versorgt. Dazu kommen die bereits angesprochenen Security Fixes. Durch die KI haben wir erst feststellen können, wie viele Löcher im Wassertank namens Software stecken. Sicherheitslücken zu finden und zu schließen ist mittlerweile ein intensiver Sport geworden. Auch wenn man sein eigenes Netzwerk soweit vom Internet trennt, wie es möglich und praktikabel ist, Updates müssen dennoch eingespielt werden. Heute reicht schon ein kompromittierter PC, um das eigene Netzwerk mit in den Abgrund zu reißen.

Mein kleines Fazit lautet wie folgt. Die Worte Breaking und Changes werden mich auch weiterhin nervös machen. Beruhigen tue ich mich mit einer guten Backup-Strategie und sauberer Dokumentation in zum Beispiel [Obsidian](https://markus-daams.com/posts/wissen-und-notizen-verwalten-mit-obsidian/). Zudem versuche ich weiterhin in Sachen Programmierung halbwegs auf dem neuesten Stand zu bleiben.

Breaking Changes sind mir lieber als Preiserhöhungen 😋