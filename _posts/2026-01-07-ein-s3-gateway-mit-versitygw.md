---
layout: post
title: "Ein S3 Gateway mit versitygw"
date: 2026-01-07 08:51:17 +0100
category: selfhosting
author: 
tags: [selfhosting, docker, quicktipp, coding]
description: "Mal eben jedes Filesystem in einen S3 Storage verwandeln? Das geht! Mit versitygw."
image:
  path: /assets/img/post-header/header-versitygw.jpg
  alt: Ein S3 Gateway Mit versitygw
---

# Simple Storage Solution @ Home

Mein „großes Projekt“ aus dem letzten Jahr begann als Fingerübung und endete darin, ein eigenes Social Network zu coden. Das Ganze hatte ich mit meinem [Vibe Coding Abenteuer](https://markus-daams.com/posts/ich-habe-mal-vibe-coding-ausprobiert/) kombiniert. Irgendwann stellte sich heraus, dass ich einen flexiblen Speicher für Daten aller Art brauchte. Meine erste Idee war es, Bilder in Byte Arrays zu verwandeln, um sie in einer SQL Datenbank zu speichern. Das ist leider kein Scherz und nicht mein stolzester Moment als Besitzer eines Hirns. Es kamen später Videos dazu und mir wurde klar, der Speicher darf in keinster Weise limitieren. 
Ich hatte bereits gute Erfahrungen mit dem S3 (Simple Storage Solution) von Amazon gemacht. Kurz gesagt, legt man ein Bucket an und wirft einfach alle Dateien rein. Den Speicher kümmert der Dateityp nicht, die Behandlung selbiger erfolgt dann im Backend und / oder Frontend. 

So einen Speicher wünschte ich mir auch für mein kleines, wirres Projekt und bin bei meiner Suche auf [MinIO](https://markus-daams.com/posts/ich-habe-mal-vibe-coding-ausprobiert/) gestoßen. Die AWS Lösungen kamen für so ein kleines Projekt nicht infrage, denn einmal falsch geklickt und fertig ist die 3.756,56 Euro Rechnung. **MinIO** ist ein S3 kompatibler Object Store zum selbst hosten. Damals war es eine gute Lösung für mich, aber ich war auch nicht wirklich happy, denn:

- MinIO bringt Overhead mit, z.B. eine WebGUI, die in der kostenlosen Version nutzlos ist
- Das Setup ist relativ aufwendig, wenn man nicht Docker nutzen will oder kann
- Die Community Edition, also die kostenlose Version, wird sehr stiefmütterlich behandelt

Wirklich happy war ich damit nicht, aber für ein kleines Projekt reichte es.

## Eine Alternative muss her

Ich hatte mich immer einmal wieder mit einer Alternative beschäftigt. Dabei bin ich auf das Projekt [versitygw](https://github.com/versity/versitygw/) gestoßen. Es handelt sich um ein S3 kompatibles Gateway. Es bringt ein paar Dinge mit, die mir gefallen:

- S3 API kompatibel. Ich muss an meinem Code also fast nichts ändern
- Jeder Speicher kann als „Bucket“ verwendet werden, auch der lokale Speicher
- Protokoll kompatibel zu ``posix`` und S3
- Performance durch Clustering, wenn ich es darauf anlege 
- Minimaler Overhead

Klingt doch gut, ich probiere es mal aus. Wenn es klappt, schwenke ich mein Projekt um.

## Installation

Für einen schnellen Überblick reicht mir die Installation per **Docker**. Da ich mein Projekt später einmal „containerisieren“ möchte, bietet sich das ohnehin an.

Als Erstes lege ich einen lokalen Ordner an, in welchem ich später die Buckets anlege.

```shell
sudo mkdir /opt/versity/data
```

Anschließend erstelle ich mir ein kleines compose file:

```yaml
version: "3.9"
services:
  versitygw:
    image: versity/versitygw:latest
    container_name: versitygw

    command: >
      --port :7070
      --access demo
      --secret demo123
      posix
      /data
    ports:
      - "7070:7070"
    volumes:
      - /opt/versity/data:/data
    environment:
      RUST_LOG: info
    restart: unless-stopped
```

Das war es. Der Container horcht auf den Port ``7070`` und ich begnüge mich mit den ``posix`` Rechten des Hostsystems. Meine ultrageheimen Credentials (``access`` und ``secret``) sind an Kreativität nicht zu überbieten, aber nur für den Fall: Bitte niemals so in einer Produktionsumgebung verwenden.

Das Gateway ist eingerichtet und läuft, wie kann man das nun testen?

## Das neue S3 Gateway testen

Der einfachste und schnellste Weg – wie ich finde – ist die ``aws`` Konsole, die es natürlich auch für Linux gibt. Auch diese lässt sich fix installieren. Für Fedora geht das so, für andere Distributionen dann eben mit dem abweichenden Befehl (ich meine ``apt`` und Konsorten):

```shell
sudo dnf install awscli2
```
Damit ich das Gateway korrekt ansprechen kann, muss irgendwo die Zugangsdaten hinterlegen. Da ich das Ganze immer noch teste, speichere ich diese Daten temporär:

```shell
export AWS_ACCESS_KEY_ID=demo
export AWS_SECRET_ACCESS_KEY=demo123
export AWS_DEFAULT_REGION=us-east-1
```

> Die Region ist egal, da es eine lokale Installation ist. Sie wäre nur wichtig, wenn wir tatsächlich Cloud Services wie **AWS** oder **Azure** nutzen würden. Aus Syntax-Gründen müssen wir sie dennoch angeben. 
{: .prompt-info}

Jetzt kann per ``aws`` Konsole hoffentlich ein Bucket erstellt werden:

```shell
aws --endpoint-url http://192.168.178.67:7070 s3 mb s3://test-bucket
make_bucket: test-bucket
```
Ich verbinde mich remote von einem anderen Rechner aus. Man kann das natürlich auch auf der lokalen Maschine machen, auf welcher der Container läuft. Ich teste aber gerne auch gleich den Fernzugriff mit, da das später für meine App relevant ist.

> Klappt dies nicht? Die Berechtigungen für den Ordner /opt/versity/data sind eventuell nicht richtig gesetzt. Für einen Test kann man den **sudo chmod 777 /opt/versity/data** Hammer auspacken, um Berechtigungsprobleme auszuschließen. Aber bitte nicht so lassen :-*
{: .prompt-info}

Das ``test-bucket`` wurde erstellt. Nun kann ich versuchen, ein File hochzuladen und anzusehen, denn darum geht es bei dem ganzen Zenober schließlich:

```shell
echo "Hallo Versity. Hallo Test Bucket!" > test.txt && aws --endpoint-url http://192.168.178.67:7070 s3 cp test.txt s3://test-bucket/
```

Ich erstelle eine Textdatei ``test.txt`` mit dem Inhalt „*Hallo Versity. Hallo Test Bucket!*“ und schiebe sie per ``aws`` Konsole in das neue Bucket. Das war es. Ich lasse mir den Inhalt des Buckets einfach einmal anzeigen:

```shell
aws --endpoint-url http://192.168.178.67:7070 s3 ls s3://test-bucket/
```

Das Ergebnis sollte in etwas so aussehen:

```shell
2026-01-07 11:21:39         34 test.txt
``` 

Und den Inhalt lasse ich mir auch gleich anzeigen. Eine ``presign`` URL kann so erstellt werden:

```shell
aws --endpoint-url http://192.168.178.67:7070 s3 presign s3://test-bucket/test.txt
```

Danach wird die erstellte URL mit ``curl`` aufgerufen:

```shell
curl 'http://192.168.178.67:7070/test-bucket/test.txt?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=demo%2F20260107%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260107T115435Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=55fc20547647058e95035e8d83765005e01de99b3a305e69b192987ceb23460b'

Hallo Versity. Hallo Test Bucket!
[2]   Exit 127                   X-Amz-Credential=demo%2F20260107%2Fus-east-1%2Fs3%2Faws4_request
[3]-  Exit 127                   X-Amz-Date=20260107T115435Z
[4]+  Exit 127                   X-Amz-Expires=3600
```

Prima, das Gateway läuft und Dateien können hoch und heruntergeladen werden.

## Mein vorläufiges Fazit

Ich wünschte, ich wäre schon eher auf **versitygw** gestoßen. Es handelt sich um ein schlankes, aber sehr mächtiges S3 Gateway. Durch die API Kompatibilität ist der Aufwand zur Umstellung minimal. Im günstigsten Fall müssen nur ein paar Daten in der ``.env`` Datei des Projektes angepasst werden. 

Bezüglich der Berechtigungen kommt mir die ``posix`` Kompatibilität sehr entgegen. Da mein Frontend als einziger „User“ Dateien hochlädt und zur Anzeige im Browser URLs erstellt, reichen einfache Lese- und Schreibberechtigungen. Mit **MinIO** war mir das so nicht möglich. Hier ist die Regelung der Berechtigungen nur über Bucket Policies möglich – zu viel Aufwand für kleinere Projekte. Mit ``posix`` nutze ich das bereits sehr granulare Rechtesystem von Linux (Unix), also ACLs / UIDs / GIDs. Salopp gesagt, es wirkt auf Ordner und nicht auf Buckets. Bei mir ist der Ordner also gleichzeitig auch das Bucket. Ein Wechsel ist zudem jederzeit möglich, wenn ich es benötige.

Bevor ich den vollständigen Wechsel vollziehe, will ich aber mein Frontend und Backend per GitHub Actions bauen und in Container verwandeln. Das ist ein Thema für einen anderen Artikel und bestimmt ein Quell immerwährender Freude.

Wer auf der Suche nach einer sehr flexiblen Speicherlösung für die eigene App ist, sollte sich **versitygw** anschauen. S3 hat sich breit etabliert und ist bestens dokumentiert, wodurch die Handhabung nochmals vereinfacht wird. Der Code in den meisten Sprachen ist schlank und einfach zu implementieren. Sollte sich die eigene App überraschend als totaler Überkracher erweisen, kann man jederzeit auf leistungsfähigen Cloudspeicher umstellen, ohne viel Code ändern zu müssen. 

Über meine Byte Array Eskapaden breite ich den Mantel des schamvollen Schweigens. 

## Ressourcen

* [Die offizielle Website von **versitygw**](https://www.versity.com/products/versitygw/)

* [Das GitHub Repo von **versitygw**:versitygw](https://github.com/versity/versitygw)

* [Die Wiki von **versitygw**](https://github.com/versity/versitygw/wiki/Articles)