const express = require('express');
const bodyParser = require('body-parser');
const EloRating = require("elo-rating");
const KittenContenders = require("./contenders/kitten-contenders");
const FrameworkContenders = require("./contenders/web-framework-contenders");


const opponents = FrameworkContenders;

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

/**
 * {winnerId: *, loserId: *}
 */
app.post('/update-rating', (req, res) => {
    const { winnerId, loserId } = req.body;

    const winner = opponents[winnerId];
    const loser = opponents[loserId];

    const { playerRating, opponentRating } = EloRating.calculate(
        winner.rating,
        loser.rating,
        true
    );

    winner.rating = playerRating;
    opponentRating.rating = opponentRating;

    res.send(JSON.stringify(opponents));
});

app.get('/contenders', (req, res) => {
    res.send(JSON.stringify(opponents));
});

app.get('/next-round', (req, res) => {
    const { firstId, secondId } = twoDifferentRandomIdsInRange(1, 10);

    const nextRound = {
        opponent1: {
            id: firstId,
            imageUrl: opponents[firstId].imageUrl
        },
        opponent2: {
            id: secondId,
            imageUrl: opponents[secondId].imageUrl
        }
    };

    res.send(JSON.stringify(nextRound));
});

app.get('/leaderboard', (req, res) => {
    res.send(JSON.stringify(opponentsSortedByRating(opponents)));
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

    min = Math.ceil(min);
    max = Math.floor(max);
    const result = Math.floor(Math.random() * (max - min)) + min;
    return result;
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

const opponentsSortedByRating = opponents => Object.entries(opponents)
    .map(entry => {
        return {
            id: entry[0],
            ...entry[1]
        };
    })
    .sort((opponent1, opponent2) => opponent2.rating - opponent1.rating);

