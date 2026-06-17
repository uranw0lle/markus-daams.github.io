---
layout: post
title: "Suchen und Finden im Terminal"
date: 2026-06-17 07:12:16 +0200
categories: [linux, tipps] 
author: 
tags: [linux, terminal, tipps]
description: "Wer im Terminal suchet, der findet. Eine Menge. Hier eine kleine Anleitung."
image:
    path: /assets/img/post-header/header-suchen-im-terminal.jpg
    alt: Richtig Suchen und Finden im Terminal
---

# Eine Suchmaschine namens Terminal 

Viele Linux Distributionen rühmen sich damit, dass sie so anwenderfreundlich sind, dass man das Terminal gar nicht mehr benutzen muss. Für einige trifft das meiner persönlichen Erfahrung nach sogar zu. Das ist eine prima Sache, denn es senkt die Einstiegshürden und sorgt dafür, dass mehr Menschen dem Pinguin der Betriebssysteme eine Chance geben.

Die Bedenken hinsichtlich des Terminals sind nachvollziehbar. Ein Terminal weckt erst einmal Erinnerungen an die graue Vorzeit, als Computer so groß wie Container waren und die Benutzung ein Studium voraussetze. Hinein mischt sich bei vielen das ungute Gefühl, dass man im Terminal mit nur wenigen Eingaben großen Schaden anrichten kann – was sehr oft nach wie vor stimmt. Dies bedeutet aber auch, dass das Terminal sehr mächtig sein kann. Wer es sich zutraut und bereit ist, etwas dazuzulernen, bekommt ein sehr mächtiges Werkzeug an die Hand. 

In meinen [„Tipps fürs Terminal“](https://markus-daams.com/posts/wie-war-noch-mal-der-befehl/) hatte ich bereits ein paar Tricks erläutert, mit denen man vergangene Befehle aufspüren kann. Dieses Thema will ich mit diesem Artikel erweitern, indem ich ein paar Kommandos vorstelle, mit denen man alles Mögliche suchen und finden kann.

Dieser Artikel richtet sich nicht an Profis, sondern an alle, die mal schauen wollen, was man im Terminal so tun kann. Außerdem ist es eine Erinnerungshilfe, denn die meisten von uns vergessen Befehle so schnell, wie wir sie gelernt haben. Manchmal lohnt es sich, die Basics wieder hochzuholen.

Auf geht es.

## Dateien finden

Ich nutze das Terminal sehr häufig um Konfigurationsdateien zu bearbeiten. Das geht hier einfach schneller und bequemer, als in einem Dateibrowser nebst Editor. Die Welt der Linux Distributionen ist aber so vielfältig, dass einige dieser Files unter verschiedenen Speicherpfaden zu finden sind. Ich habe ein Alter erreicht, in dem ich nicht mehr bereit bin, mit jeder Eigenheit der diversen Distris zu lernen und verlasse mich auf die Suchfunktion im Terminal.


Fangen wir mit der grundlegenden Suchfunktion an, die auf den Namen `find` hört. Mit ihr lassen sich gezielt bestimmte Dateien aufspüren. Der Aufbau ist immer:

**Kommando** (also `find`) + Ort wo gesucht werden soll + wonach gesucht werden soll. 

Beispiel:

Datei `confing.yaml` überall suchen:

```shell
find . -name "config.yaml"
```

Es kann vorkommen, dass die Groß-/Kleinschreibung ignoriert werden soll. Hier hilft dann `-iname` weiter.

```shell
find . -iname "config.yaml"
```

Wenn ich gar nicht mehr weiß, wie die Datei genau heißt, kommen Wildcards ins Spiel. Mit dem `*` kann ich nach beliebigen Namen suchen. In dem folgenden Beispiel suche ich sämtliche `.log` Dateien. Achtung, Linux ist voll von Log-Dateien, daher kann die Ausgabe sehr lang werden.

```shell
find . -name "*.log"
```

Suche ich nach Ordnern, teile ich `find` dies über `type` mit. `d` steht hier dann für Directory


```shell
find . -type d
```

Das geht natürlich auch mit `f` wie Files, also nur Dateien.

```shell
find . -type f
```

`find` ist etwas altbacken, es wirft mir auch alles aus, das es nicht durchsuchen durfte, wo also die Berechtigungen fehlen, ob ich will, oder nicht. Das kann man aber unterdrücken, indem man `2>/dev/null` anhängt. 

So sieht eine vollständige Suche im Pfad `/home/username/` nach einem Ordner aus, der mit dem Namen `Urlaub` anfängt, aber noch weiter gehen kann (Bsp. `Urlaub auf Balkonien`). Mögliche Standardfehlermeldungen werden ausgeblendet. 

```shell
find /home/username/ -type d -name "Urlaub*" 2>/dev/null 
```

**Extrawissen:**
Die 2 bedeutet, Standardfehlermeldungen (stderr) sollen nach `/dev/null` verschoben werden. Dieser Pfad führt ins Nichts und alles, was da landet, ist weg. `Keine Berechtigungen` ist so eine Standardfehlermeldung. Es bedeutet nur, dass `find` keinen Blick in diesen Ordner werfen durfte.

### Mit fd geht es bequemer

`find` ist nützlich, tut aber viel mehr, als ich brauche. Das scheinen sich auch andere gedacht zu haben und kamen mit `fd` um die Ecke. Sie haben `find` etwas aufgebohrt und mit einer neuen Vorkonfiguration versehen. Wer es nutzen will, muss es in der Regel erst installieren. Im Falle meiner Distribution geht das so:

Installation:

```shell
sudo dnf install fd-find
```

`fd` ignoriert Ordner und Pfade ohne Berechtigungen. Außerdem ignoriert es in der Voreinstellung versteckte Dateien.

Dieser Befehl sucht mir alle Ordner und Dateien heraus, die „github“ enthalten. Groß-/Kleinschreibung werden ignoriert. Also praktisch, wenn es mal schnell gehen soll und man nicht erst Parameter aneinander ketten will.

```shell
fd github
```

Wer aber doch Parameter mag, kann sie nutzen. Suche ich nur Markdown Dateien, kann ich das so machen:

```shell
fd -e md
```

Suche ich dann aber doch mal nach versteckten Dateien, kann ich sie mit `-H` (hidden) aufspüren.

```shell
fd -H "Geheimdatei"
```
`fd` ist schneller und meiner Meinung nach praktischer als `find`. Allerdings muss es oftmals erst installiert werden und steht vielleicht nicht in jeder Distribution zur Verfügung. Wenn es das aber tut, lohnt es sich. 

**Extrawissen**
`fd` ignoriert standardmäßig Pfade, die in einer `.gitignore` aufgeführt sind. Das ist für die meisten User nicht praxisrelevant, sollte man aber im Hinterkopf behalten, wenn man doch mit `git` arbeitet. `find` hingegen ignoriert die `.gitignore`.


## Dateien durchsuchen

Interessant wird es, wenn man Dateien durchsuchen will. Auch das geht im Terminal und es lässt sich praktisch jedes maschinenlesbare File durchsuchen. Das ist der Auftritt von `grep`.

Suche ich in einer bestimmten Datei nach einem Schlüsselwort, mache ich das so:

```shell
grep "ERROR" app.log
```

Möche ich gleich mehrere Dateien durchsuchen, kann `grep` einen Pfad mit `-r` rekursiv durchsuchen.

```shell
grep -r "ERROR" /home/logfiles/
```

Bei sehr langen Dateien, kann es praktisch sein, die Zeilennummer anzeigen zu lassen. Dazu verkette ich `n`.

```shell
grep -rn "ERROR" .
```

Ist mir die Groß- und Kleinschreibung nicht wichtig, übergebe ich `-i`.

```shell
grep -i "warning"
```
Es ist auch möglich, die Suche zu invertieren. Beispiel: Ich will die auskommentierten und daher nicht aktiven Einträge einer Konfigurationsdatei ausblenden. Dazu nutze ich `-v` und etwas Regex.

```shell
grep -v "^#" konfiguration.conf
```

Möchte ich mir mehr Kontext anzeigen lassen, weil die Fehlermeldung zum Beispiel sehr lang ist, geht das auch:

```shell
grep -C 3 ERROR log.txt
```

Und will ich mir nur die Anzahl von Errors anzeigen lassen, dann übergebe ich `-c` (Count):
 
```shell
grep -c ERROR log.txt
```

Möchte ich mir mit dem Wissen alle Fehler (Errors) rekursiv in einem Ordner zählen lassen, egal wie sie geschrieben werden, mache ich das so:

```shell
grep -icr "error" /meine/vielen/Logdateien/
```

### Mit ripgrep geht es ebenfalls bequemer

Wie schon mit `find` und `fd`, haben sich Menschen gefunden, die `grep` komfortabler gemacht haben. Hier kommt *ripgrep* ins Spiel. Es kommt mit sinnvollen Vorkonfigurationen und ist schneller. Allerdings muss es bei den meisten Distributionen ebenfalls erst installiert werden. Im Falle meines Fedoras geht das so:

```shell
sudo dnf install ripgrep
```

Mit dem Praxiswissen von `fd` erklären sich dann auch die folgenden Beispiele von `rg` (ripgrep). 

Ich suche nach Errors:

```shell
rg ERROR
```

Groß- und Kleinschreibung kann ignoriert werden. Die Suche nach 'Error' findet dann zum Beispiel auch 'error' und 'eRROr' :

```shell
rg -i error
```

Etwas mehr Kontext kann ich mir so anzeigen lassen:

```shell
rg -A 5 ERROR
```

## Speicherfresser suchen und finden


*Und plötzlich ist der Speicher voll* - und dann will ich heraus finden, welche Ordner und Dateien meinen Speicher auffressen. Hier kommt `du` ins Spiel, welches mir die *disk usage* anzeigt.

Gebe ich nur `du` ein, bekomme ich jedoch eine wirre Ausgabe angezeigt, mit der ich nichts anfangen kann.

Daher fängt man am besten auch gleich mit `-h` an, was für „human readable“ steht. Dieser Befehl zeigt mir Pfad und Größe aller Ordner im `/home/username/Bilder/Urlaub` Verzeichnis an.

```shell
du -h /home/username/Bilder/Urlaub
```
Möchte ich nur die Gesamtsumme angezeigt bekommen, füge ich noch `-s` hinzu. Dann werden alle Unterordner im angegebenen Pfad zusammen gerechnet und ich bekomme die Summe ausgegeben:

```shell
du -sh /home/username/Bilder/Urlaub
```
Das Ganze geht natürlich auch wieder ohne die Standardfehlermeldungen bezüglich fehlender Berechtigungen:

```shell
du -sh /home/username/Bilder/Urlaub 2>/dev/null
```

### Mit duf geht es bequemer. Und hübscher.

Wer es etwas ansehnlicher und informativer braucht, sollte einen Blick auf `duf` werfen. Damit ist es möglich, einen generellen Überblick über die Speichernutzung im System zu bekommen.

Auch dieses Paket muss zunächst installiert werden. Unter Fedora geht es so:

```shell
sudo dnf install duf
```

`duf` ist sehr mächtig, ich beschränke mich auf die Basics. Eine grafische Aufbereitung der Disk Usage aller Geräte und Laufwerke kann ich mir mit diesem Befehl anzeigen lassen:

```shell
duf
``` 
Die Ausgabe umfasst Pfad, Speicherverbrauch, verfügbarer Speicher, Filesystem und Typ des Filesystems.

Das kann natürlich eingegrenzt werden. Wenn ich mir nur die Informationen meiner `/home` Partition anzeigen will, geht das so:

```shell
duf /home
``` 

Für die erste, schnelle Übersicht, ist `duf` sehr praktisch.

## Prozesse suchen und finden

Es kommt auch unter Linux vor, dass sich manche Prozesse nicht benehmen können und mehr Leistung, Akku oder andere Ressourcen beanspruchen, als ihnen eigentlich zusteht. Im schlimmsten Fall reagiert dieser gar nicht mehr. Dann will ich diesen Prozess dennoch finden und beenden können. Das geht zum Beispiel über die PID (Process ID).

Eine Übersicht aller laufenden Prozesse bekomme ich mit diesem Befehl:

```shell
ps aux
```
Diese Liste ist in der Regel sehr lang und sehr unübersichtlich. Hier werden auch alle Sytemprozesse angezeigt. Dank `grep` kann ich mir aber bestimmte Prozesse gezielt heraussuchen:

```shell
ps aux | grep firefox
```

Bei vielen Programmen ist diese Liste immer noch sehr lang. Auch hier gibt es wieder ein kleines Tool, das sinnvollere Ausgaben produziert, `pgrep`. Unter Fedora installiert ich es so:

```shell
sudo dnf install pgrep
```
Danach kann ich gezielt nach dem Hauptprozess suchen. Ich bekomme dann die PID angezeigt, die Prozess ID. 

```shell
pgrep firefox
```

Mit Details:

```shell
pgrep -a firefox
```

Das ist schon sehr nützlich. Selbstredend gibt es ein Tool, dass mir die laufenden Prozesse grafisch aufbereitet und mit vielen nützlichen Informationen anzeigt. Sagen wir Hallo zu `top`. 

```shell
top
```

Das Tolle an `top` ist, dass es sich in Echtzeit aktualisiert und mir alle Prozesse nebst Speicherverbrauch anzeigt. `top` ist interaktiv und reagiert auf Tastatureingaben. Die für mich wichtigsten sind:

* Shift + P: Sortierung nach Prozessorlast
* Shift + M:  Sortierung nach Arbeitsspeicherverbrauch

Und mit einem Druck auf die `Q` Taste beende ich `top` wieder.

## Fazit
Dieser Artikel ist viel länger geworden, als gehofft. Eigentlich will ich Terminal Neueinsteiger eben nicht mit einer Litanei an Kommandos abschrecken. Daher ist mein Tipp, sich erst einmal nur zwei bis drei der Kommandos einzuprägen und immer einmal wieder zu nutzen. Die Tools, die ich empfohlen habe, aber die erst einmal nachinstalliert werden müssen, gehören in die Kategorie *Kann man nutzen, muss man aber nicht*. Letztendlich geht es darum, dass man sich im Terminal zurechtfindet und die Tools, die es mitbringt, ohne viel Scheu nutzen mag.

Zur Wahrheit gehört aber auch, dass die meisten dieser Tools eine Reihe an Zusatzfunktionen mitbringen. Was Parameter angeht, lassen es die Unixoiden Betriebssysteme gerne einmal maßlos krachen. Du suchst nach einer YAML Datei, die letztes Jahr bei Vollmond erstellt wurde und erst viermal verändert wurde? Die Suche lässt sich bestimmt so einstellen. Allerdings gilt auch: Man kann all diese Funktionen nutzen, man muss es nicht. Es sollte einen nicht davon abhalten, das Terminal zu nutzen. 

Daher bin ich auch ein Fan von `ripgrep`, `fd`, `duf` und Co. Sie alle sind auf die nötigsten Funktionen reduziert und geben mir genau die Informationen, die ich brauche. Die Open Source Community kümmert sich auch weiterhin darum, dass die Arbeit im Terminal Spaß machen kann. Ich bin mir sicher, dass das so bleiben wird.


## Ressourcen

Dieses Mal gibt es bei meinen Ressourcen keine Links. Sondern einen Tipp. Wer mehr über ein Tool und all seine Funktionen lernen möchte, nutzt die Manual Pages. Diese ruft man mit `man` + Name des Tools auf. Also zum Beispiel:

```shell
man find
```



