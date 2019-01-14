# API-Dokumentation

### `GET` /contenders

#### Antwort


```
[
    { "id": 1337, "name": "Vue.js", "rating": 2076, "imageUrl": "http://..." },
    { "id": 42, "name": "Sap UI5", "rating": 1420, "imageUrl": "http://..." },
    { "id": 1, "name": "React", "rating": 1021, "imageUrl": "http://..." },
    { "id": 2, "name: "jQuery", "rating": 877, "imageUrl": "http://..." },
]
```

Die Liste ist absteigend sortiert nach dem aktuellen *Rating.* 

### `GET` /round/new

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

#### Payload

```
{
    "winnerId": 42,
    "loserId": 1337
}
```

#### Antwort

Die aktuellen Ratings aller Teilnehmer (siehe `GET /contenders`).
