---
layout: post
title: "Object Store selbst hosten"
date: 2025-07-02 07:36:59 +0200
category: selfhosting
author: 
tags: [selfhosting, quicktipp, coding]
description: "Ein Object Store zum selbst hosten? Cool, das schaue ich mir an. Was MinIO ist und wie man es nutzt."
image:
  path: /assets/img/post-header/header-minio.jpg
  alt: MinIO - Der Objectstore zum selbst hosten
---

# Object Store?

Wenn man programmiert, gibt es sehr grob gesagt zwei Arten von Daten, mit denen man hantiert. Es gibt die strukturierten Daten. Das können Listen sein, Tabellen, Matrizen usw. usf. Diese Daten lassen sich prima in Datenbanken speichern. Es gibt dann aber noch die unstrukturierten Daten. Das können Bilder sein, Videos, Backup-Files u. v. m.. Diese Art Daten kann man nicht ohne Weiteres in eine Datenbank quetschen. 

Sicher, mit genügend finsterer Energie kann man alles in ein Byte Array verwandeln und dann doch in eine Datenbank pressen, aber bleiben wir heute dezent zivilisiert. 

## Object Store!

Und hier kommt ein **Object Store** ins Spiel. Nutze ich diesen, muss ich die Bilder, Videos, Container-Images usw. nicht konvertieren, sondern kann sie speichern und abrufen, wie die Computer-Götter sie geschaffen haben. 

Mein Programm oder meine App speichert User Daten wie Name, Anschrift, Username usw. in einer regulären Datenbank, alle Bilder und Videos jedoch in einem Object Store. 

Die Vorteile hören hier noch nicht auf. So ein Speicher kann in der Cloud gehostet werden, ist skalierbar und lässt sich durch ein umfangreiches Rechtemanagement sicher nutzen.

## Auftritt MinIO

Der Platzhirsch auf dem Gebiet der Object Stores ist Amazon mit seinem Angebot (AWS). Aber die Open Source Community war ebenfalls nicht untätig und hat einen Object Store geschaffen, der mit der Amazon S3-Cloud-Speicher-Schnittstelle kompatibel ist. 

Und für mich wichtig: MinIO lässt sich selbst hosten. Das tue ich bereits und möchte den Einrichtungsprozess kurz erläutern und wie man den Speicher anschließend nutzen kann.

## Installation von MinIO

Da ich einen Proxmox Server betreibe, bot es sich für mich an, MinIO auf diesem zu installieren. Dazu habe ich mir wieder Hilfe von den "[Proxmox Helper Scripts](https://markus-daams.com/posts/proxmox-helper-scripts-vorgestellt/)" geholt. Die Anleitung und das Script von MinIO auf Proxmox finden sich unter [diesem Link](https://community-scripts.github.io/ProxmoxVE/scripts?id=minio).

Die Installation läuft durch das Script automatisch ab und ist in ein paar Minuten durchgelaufen.

> Es gibt eine kostenlose Community Edition von MinIO. Diese ist in den Funktionen beschränkt. Für kleine Coding Projekte reicht sie aber aus.
{: .prompt-info}

![MinIO Login Screen](/assets/img/minIO/minio-welcome-screen.jpg)
_Es gibt auch eine Weboberfläche. Die meiste Arbeit macht man aber im Terminal._

Einen Haken gibt es noch: In der kostenlosen Community Edition wurde das Admin-Panel in der Weboberfläche entfernt. Das ist sehr schade, aber die Konfiguration kann auch bequem per Terminal vorgenommen werden und wer Lust hat, kann sich vom AI Chat seiner Wahl ganze Scripte bauen lassen, um bestimmte Schritte zu automatisieren.

## Konfiguration von MinIO

Mit der Konfiguration wollen wir die folgenden Dinge erreichen: Ein Bucket anlegen, in dem wir die Daten speichern und die Berechtigungen festlegen, wer was machen darf. 

So ein Bucket ist buchstäblich ein digitaler Eimer, in welchem wir die Fotos und Videos speichern. Legen wir einfach mal los.

``` shell
mc mb myminio/mynewbucket
```

Mit diesem Befehlt wird ein neuer Bucket mit dem Namen ``mynewbucket`` angelegt. Der Namen ist natürlich frei wählbar. Auch die Berechtigungen könnte man mit so einem knackigen One Liner setzen. Aber ich gehe hier die Extrameile und lege eine Datei an, mit der ich diese Berechtigungen granular festlegen kann. Keine Sorge, ist einfaches JSON.

``` shell
touch mynewbucket-policy.json
```

``` shell
nano mynewbucket-policy.json
```

``` json
{
    "Version": "2025-07-02",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:GetObject",
                "s3:PutObject",
                "s3:DeleteObject"
            ],
            "Resource": [
                "arn:aws:s3:::mynewbucket/*"
            ]
        }
    ]
}
```

```shell
mc policy set mynewbucket-policy.json myminio/mynewbucket
```

Und das war es schon. Im JSON File habe ich hinterlegt, dass neue Objecte in den Store geladen, daraus geholt und auch gelöscht werden dürfen. Für eine selbst entwickelte App sind das in der Regel die Standartberechtigungen. 

## Nutzung des Buckets

Das Tolle an MinIO ist, dass es Schnittstellenkompatibel zum Amazon S3 Object Store ist. Wir können also die Tools nutzen, die es bereits für Amazon gibt. In Rust habe ich das so gemacht und es funktioniert prima. Für Python gibt es ein MinIO Paket, welches wir nutzen können.

Anhand von Python würde das in etwas so aussehen:

``` python
pip install minio
```

In dem Paket ``minio`` befindet sich alles, was wir brauchen, um mit MinIO zu interagieren. 

Weiter geht es im Python File.

``` python
from minio import Minio # Das MinIO Paket importieren
from minio.error import S3Error # Ordentliches Error Logging ist auch nützlich

# Initialisierung des MinIO-Clients mit der Adresse des lokalen Servers
client = Minio(
    "192.168.178.64:9000",  # Adresse des lokalen MinIO-Servers
    access_key="YOUR-ACCESSKEY",  # Access Key vom Server (siehe unten Tipp)
    secret_key="YOUR-SECRETKEY",  # Secret Key vom Server (siehe unten Tipp)
    secure=False  # False, da kein https verwendet wird. Niemals in Prod nutzen :-*
)
# Name des Buckets, den wir vergeben haben.
bucket_name = "mynewbucket"

# Hochladen einer Datei
try:
    client.fput_object(
        bucket_name, "myfile.txt", "/path/to/local/file.txt"
    )
    print("Datei wurde erfolgreich hochgeladen.")
except S3Error as exc:
    print("Fehler beim Hochladen der Datei:", exc)

# Herunterladen einer Datei
try:
    client.fget_object(
        bucket_name, "myfile.txt", "/path/to/local/destination.txt"
    )
    print("Datei wurde erfolgreich heruntergeladen.")
except S3Error as exc:
    print("Fehler beim Herunterladen der Datei:", exc)

# Löschen einer Datei
try:
    client.remove_object(bucket_name, "myfile.txt")
    print("Datei wurde erfolgreich gelöscht.")
except S3Error as exc:
    print("Fehler beim Löschen der Datei:", exc)

```
> Access Key und Secret Key bei der Installation mit dem Helper Script findet man mit dem Befehl: **cat ~/minio.creds** 
{: .prompt-tip}

Das ist nur ganz grundlegender Code. Zeigt aber, dass die Syntax nicht weiter aufwendig ist und dass sich unser neuer Object Store einfach nutzen lässt. Die wichtigen Daten sind des Access Key, der Secret Key, die Server-Adresse und der Name des Buckets. Klar, solche Daten gehören besser in eine ``.env`` Datei. *Aber wer nicht ohne Coding Sünde ist, werfe die erste Exception.*

So sieht der Code etwa in Rust aus:

![MinIO in Rust](/assets/img/minIO/minio-rust.jpg)
_MinIO lässt sich auch unter Rust nutzen. Hier nutzt man dann das 'aws_sdk_s3'_


## Was es sonst noch zu wissen gibt

Ich habe die Weboberfläche kurz erwähnt, da ich diese praktisch nicht nutze. Leider wurde das Admin-Panel in der kostenlosen Version von MinIO gestrichen. Dennoch will ich es nicht vorenthalten. 

![MinIO Bucket Ansicht](/assets/img/minIO/minio-weboberfläche.jpg)
_In der Weboberfläche können wir mal in die Buckets luschern._

Grundlegende Operationen sind hier möglich. Man kann Buckets anlegen und löschen. Die Daten in den Buckets können angesehen und gelöscht werden. Auch lassen sich neue Dateien hochladen. Ich persönlich finde es aber sinnfrei, dass über die Weboberfläche zu machen. Idealerweise überlässt man seinem Code das Kommando. In meinem Screenshot oben habe ich allen Dateien eine eindeutige UUID verpasst, welche ich dann in einer regulären MySQL-Datenbank speichere. So nutze ich die Vorteile beider Welten, die der strukturierten und unstrukturierten Daten.

## Mein persönliches Fazit

Auf die Suche nach einem Storage Speicher hatte ich mich erst gemacht, als in meinem aktuellen Coding Projekt Bilder und Videos ins Spiel kamen. Alle anderen Daten konnte ich ja bequem in SQL-Datenbanken speichern. MinIO ist nicht das einzige Projekt, welches zum Ziel hat, AWS Storage Speicher nachzubilden. Es gibt noch mehr Projekte und meine Empfehlung ist, erst die persönlichen Anforderungen zu definieren und dann nach einer entsprechenden Lösung zu suchen.

Mit diesem Artikel wollte ich aufzeigen, dass es Alternativen zu AWS, Azure und Co gibt. Sie sind vielleicht nicht so bequem und oftmals auch nicht so gut dokumentiert, aber es gibt sie. MinIO hat so seine Eigenheiten, wie das fehlende Admin-Panel in der Weboberfläche, verrichtet bei mir aber ansonsten einen guten Dienst. Auch die Unterstützung in Rust, Python und anderen Sprachen ist gegeben. Insgesamt ist es ein tolles Projekt und ich werde immer wieder darauf zurückgreifen, wenn ich es mir unstrukturierten Daten zu tun bekommen sollte.

## Ressourcen

* [Offizielle Seite von MinIO](https://min.io/)

* [MinIO Dokumentation](https://min.io/docs/minio/kubernetes/upstream/index.html)

* [GitHub Repo von MinIO](https://github.com/minio/minio)

* [MinIO Proxmox Helper Script Page](https://community-scripts.github.io/ProxmoxVE/scripts?id=minio)