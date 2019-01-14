# API-Dokumentation

### `GET` /contenders

#### Antwort

```
[
    { "id": 1, "name": "React", "rating": 1021, "thumbnailUrl": "http://..." },
    { "id": 2, "name: "jQuery", "rating": 877, "thumbnailUrl": "http://..." },
    { "id": 42, "name": "Sap UI5", "rating": 1420, "thumbnailUrl": "http://..." },
    { "id": 1337, "name": "Vue.js", "rating": 2076, "thumbnailUrl": "http://..." }
]
```


### `GET` /round/new

#### Antwort

```
{
    "contender1": {
        "contenderId": 1337,
        "imageUrl": "http://.."
    },
    "contender2": {
        "contenderId": 2,
        "imageUrl": "http://..."
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
