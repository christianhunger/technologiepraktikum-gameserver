# API-Dokumentation

Für das Technologiepraktikum ist eine Instanz des Gameservers unter ``http://node.cloud.dmwe.de`` erreichbar.

### `GET` /contenders

Eine Liste aller Contenders absteigend sortiert nach ihrem aktuellen *Rating*. Das verknüpfte Bild kann für das Leaderboard und den Ranking Strip verwendet werden.

#### Antwort


```
[
    { "id": 1337, "name": "Vue.js", "rating": 2076, "imageUrl": "http://..." },
    { "id": 42, "name": "Sap UI5", "rating": 1420, "imageUrl": "http://..." },
    { "id": 1, "name": "React", "rating": 1021, "imageUrl": "http://..." },
    { "id": 2, "name: "jQuery", "rating": 877, "imageUrl": "http://..." },
]
```

### `GET` /round/new

Zufälliges Pairing aus allen Contenders für eine neue Spielrunde. Es kann mehrere Samples (Codeschnipsel) pro Contender geben.

#### Antwort

```
{
    "sample1": {
        "contenderId": 1337,
        "sampleUrl": "http://.."
    },
    "sample2": {
        "contenderId": 2,
        "sampleUrl": "http://..."
    }
}
```

### `POST` /round/result

Ergebnis einer Spielrunde an den Server schicken. Dieser aktualisiert daraufhin die Ratings und liefert den aktuellen Stand zurück.

#### Payload

```
{
    "winnerId": 42,
    "loserId": 1337
}
```

#### Antwort

Die aktuellen Ratings aller Teilnehmer (siehe `GET /contenders`).
