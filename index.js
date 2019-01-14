const express = require('express');
const bodyParser = require('body-parser');
const EloRating = require("elo-rating");


const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));


const contenders = {
    1: {
        name: "React",
        rating: 1000,
        imageUrl: "http://127.0.0.1:3000/frameworks/logos/react-logo.png",
        snippetUrls: [
            "http://127.0.0.1:3000/frameworks/snippets/sap-ui-snippet-1.png"
        ]
    },
    2: {
        name: "Sap UI 5",
        rating: 1000,
        imageUrl: "http://127.0.0.1:3000/frameworks/logos/ui5-logo.png",
        snippetUrls: [
            "http://127.0.0.1:3000/frameworks/snippets/react-snippet-1.png"
        ]
    }
};


app.get('/contenders', (req, res) => {
    res.send(JSON.stringify(contendersSortedByRating(contenders)));
});


app.post('/round/result', (req, res) => {
    const { winnerId, loserId } = req.body;

    const winner = contenders[winnerId];
    const loser = contenders[loserId];

    const { playerRating, opponentRating } = EloRating.calculate(
        winner.rating,
        loser.rating,
        true
    );

    winner.rating = playerRating;
    loser.rating = opponentRating;

    res.send(JSON.stringify(contendersSortedByRating(contenders)));
});


app.get('/round/new', (req, res) => {
    const { firstId, secondId } = twoDifferentRandomIdsInRange(1, 2);

    const contender1 = contenders[firstId];
    const contender2 = contenders[secondId];

    const nextRound = {
        sample1: {
            contenderId: firstId,
            sampleUrl: pickRandomElement(contender1.snippetUrls)
        },
        sample2: {
            contenderId: secondId,
            sampleUrl: pickRandomElement(contender2.snippetUrls)
        }
    };

    res.send(JSON.stringify(nextRound));
});


app.listen(3000, () => {
    console.log('Game server listening on port 3000!');
});

/**
 * Geenrates a random integer id in the range [min, max].
 * Throws an error if max <= min!
 *
 * @param {number} min - The lower bound.
 * @param {number} max - The upper bound.
 * @returns {number}
 */
const randomIntInRange = (min, max) => {
    if (max <= min) {
        throw "Invalid arguments: max <= min.";
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Generates two distinct integer ids in the range [min, max].
 * Throws an error if max <= min!
 *
 * @param {number} min - The lower bound.
 * @param {number} max - The upper bound.
 * @returns {{firstId: *, secondId: *}} - A tuple containing the ids.
 */
const twoDifferentRandomIdsInRange = (min, max) => {
    if (max <= min) {
        throw "Invalid arguments: max <= min.";
    }

    const firstId = randomIntInRange(min, max);
    let secondId = randomIntInRange(min, max);

    while (firstId === secondId) {
        secondId = randomIntInRange(min, max);
    }

    return { firstId, secondId };
};

const pickRandomElement = list => list[Math.floor(Math.random() * list.length)];


const contendersSortedByRating = opponents => Object.entries(opponents)
    .map(entry => {
        return {
            id: entry[0],
            name: entry[1].name,
            rating: entry[1].rating,
            imageUrl: entry[1].imageUrl
        };
    })
    .sort((opponent1, opponent2) => opponent2.rating - opponent1.rating);

