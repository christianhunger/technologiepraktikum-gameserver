# API-Dokumentation

### GET /ratings

#### Antwort

```
[
    { "contenderId": 1, "rating": 1021, "thumbnailUrl": "http://..." },
    { "contenderId": 2, "rating": 877, "thumbnailUrl": "http://..." },
    { "contenderId": 42, "rating": 1420, "thumbnailUrl": "http://..." },
    { "contenderId": 1337, "rating": 2076, "thumbnailUrl": "http://..." }
]
```


### GET /round/new

#### Antwort

```
{
    "contender1": {
        "contenderId": 1337,
        "sampleImageUrl": "http://.."
    },
    "contender2": {
        "contenderId": 2,
        "sampleImageUrl": "http://..."
    }
}
```

### POST /round/result

#### Payload

```
{
    "winnerId": 42,
    "loserId": 1337
}
```

#### Antwort

Die aktuellen Ratings (siehe `/ratings`).
