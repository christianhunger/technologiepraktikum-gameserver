const express = require('express');
const bodyParser = require('body-parser');
const EloRating = require("elo-rating");

// this could probably be dynamic
const serverAndPort = '127.0.0.1:3000';

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

// add cors headers
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const contenders = {
    1: {
        name: "React",
        rating: 1000,
        imageUrl: `http://${serverAndPort}/frameworks/logos/react-logo.png`,
        snippetUrls: [
            `http://${serverAndPort}/frameworks/snippets/react-snippet-1.png`,
            `http://${serverAndPort}/frameworks/snippets/react-snippet-2.png`,
            `http://${serverAndPort}/frameworks/snippets/react-snippet-3.png`,
            `http://${serverAndPort}/frameworks/snippets/react-snippet-4.png`
        ]
    },
    2: {
        name: "Sap UI 5",
        rating: 1000,
        imageUrl: `http://${serverAndPort}/frameworks/logos/ui5-logo.png`,
        snippetUrls: [
            `http://${serverAndPort}/frameworks/snippets/sap-ui-snippet-1.png`,
            `http://${serverAndPort}/frameworks/snippets/sap-ui-snippet-2.png`,
            `http://${serverAndPort}/frameworks/snippets/sap-ui-snippet-3.png`
        ]
    },
    3: {
        name: "Vue.js",
        rating: 1000,
        imageUrl: `http://${serverAndPort}/frameworks/logos/vuejs-logo.png`,
        snippetUrls: [
            `http://${serverAndPort}/frameworks/snippets/vuejs-snippet-1.png`,
            `http://${serverAndPort}/frameworks/snippets/vuejs-snippet-2.png`,
            `http://${serverAndPort}/frameworks/snippets/vuejs-snippet-3.png`
        ]
    },
    4: {
        name: "jQuery",
        rating: 1000,
        imageUrl: `http://${serverAndPort}/frameworks/logos/jquery-logo.png`,
        snippetUrls: [
            `http://${serverAndPort}/frameworks/snippets/jquery-snippet-1.png`,
            `http://${serverAndPort}/frameworks/snippets/jquery-snippet-2.png`,
            `http://${serverAndPort}/frameworks/snippets/jquery-snippet-3.png`
        ]
    },
    5: {
        name: "Angular",
        rating: 1000,
        imageUrl: `http://${serverAndPort}/frameworks/logos/angular-logo.png`,
        snippetUrls: [
            `http://${serverAndPort}/frameworks/snippets/angular-snippet-1.png`,
            `http://${serverAndPort}/frameworks/snippets/angular-snippet-2.png`,
            `http://${serverAndPort}/frameworks/snippets/angular-snippet-3.png`,
            `http://${serverAndPort}/frameworks/snippets/angular-snippet-4.png`
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
    const { firstId, secondId } = twoDifferentRandomIdsInRange(1, 5);

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

if (module === require.main) {
    const server = app.listen(process.env.PORT || 3000, () => {
        const port = server.address().port;
        console.log(`Game server listening on port ${port}!`);
    });
}

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

