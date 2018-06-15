
const handTypes = {
    SINGLE: 0,
    PAIR: 1,
    TRIPS: 2,
    FIVE_CARD_TRICK: 3
};

// Ranks value of cards from lowest to highest
const ranks = {
    '3c': 0,
    '3s': 1,
    '3h': 2,
    '3d': 3.1,
    '4c': 4,
    '4s': 5,
    '4h': 6,
    '4d': 7.1,
    '5c': 8,
    '5s': 9,
    '5h': 10,
    '5d': 11.1,
    '6c': 12,
    '6s': 13,
    '6h': 14,
    '6d': 15.1,
    '7c': 16,
    '7s': 17,
    '7h': 18,
    '7d': 19.1,
    '8c': 20,
    '8s': 21,
    '8h': 22,
    '8d': 23.1,
    '9c': 24,
    '9s': 25,
    '9h': 26,
    '9d': 27.1,
    '10c': 28,
    '10s': 29,
    '10h': 30,
    '10d': 31.1,
    'Jc': 32,
    'Js': 33,
    'Jh': 34,
    'Jd': 35.1,
    'Qc': 36,
    'Qs': 37,
    'Qh': 38,
    'Qd': 39.1,
    'Kc': 40,
    'Ks': 41,
    'Kh': 42,
    'Kd': 43.1,
    'Ac': 44,
    'As': 45,
    'Ah': 46,
    'Ad': 47.1,
    '2c': 48,
    '2s': 49,
    '2h': 50,
    '2d': 51.1
};

// Ranks value of suits from lowest to highest
const suits = {
    'Clubs': 0,
    'Spades': 1,
    'Hearts': 2,
    'Diamonds': 3
};

// Ranks value of hands from lowest to highest
const hands = {
    'Straight': 0,
    'Flush': 1,
    'Full House': 2,
    'Quads': 3,
    'Straight Flush': 4,
    'Royal Flush': 5
};

// Compares if a single card beats another single card
function isSingleGreater(card1, card2) {
    if (ranks[card1.rank] > ranks[card2.rank]) {
        return true;
    } else {
        return false;
    }
}

// Compares if a pair beats another pair where pair1 = card1 + card2 && pair2 = card3 +card4
function isPairGreater(pair1, pair2) {
    if (ranks[card1.rank] + ranks[card2.rank] > ranks[card3.rank] + ranks[card4.rank]) {
        return true;
    } else {
        return false;
    }
}

// Compares if a trips beats another trips where trips1 = card1 + card2 + card3 && trips2 = card4 + card5 + card6
function isTripsGreater(trips1, trips2) {
    if (ranks[card1.rank] + ranks[card2.rank] + ranks[card3.rank] > ranks[card4.rank] + ranks[card5.rank] + ranks[card6.rank]) {
        return true;
    } else {
        return false;
    }
}

// Compares if a straight beats another straight
function isStraightGreater(straight1, straight2) {
    if (hands[card1.hand] > hands[card6.rank]) {
        return true;
    } else {
        return false;
    }
}

// Compares if a flush beats another flush
function isFlushGreater(flush1, flush2) {
    if (hands[card1.hand] > hands[card6.rank]) {
        return true;
    } else {
        return false;
    }
}

// Compares if a fullhouse beats another fullhouse
function isFullhouseGreater(fullhouse1, fullhouse2) {
    if (hands[card1.hand] > hands[card6.rank]) {
        return true;
    } else {
        return false;
    }
}

// Compares if a quads beats another quads
function isQuadsGreater(quads1, quads2) {
    if (hands[card1.hand] > hands[card6.rank]) {
        return true;
    } else {
        return false;
    }
}

// Compares if a quads beats another quads
function isStraightflushGreater(straightflush1, straightflush2) {
    if (hands[card1.hand] > hands[card6.rank]) {
        return true;
    } else {
        return false;
    }
}

// Compares if a quads beats another quads
function isRoyalflushGreater(royalflush1, royalflush2) {
    if (hands[card1.hand] > hands[card6.rank]) {
        return true;
    } else {
        return false;
    }
}

function makeSureTrue(value, message) {
    if (!value) {
        throw Error("Not true:", value, message)
    }
}

makeSureTrue(isSingleGreater('3c', '4d'), 'checking single comparison')

console.log('This should be false', isSingleGreater('3c', '4d'));
console.log('This should be true', isSingleGreater('Qc', '4d'));

module.exports = BigTwo;

