(function() {
    'use strict';

    const handTypes = {
        SINGLE: 1,
        PAIR: 2,
        PRIAL: 3,
        FIVE_CARD_TRICK: 5
    };

    const ranks = {
        '3': 0,
        '4': 1,
        '5': 2,
        '6': 3,
        '7': 4,
        '8': 5,
        '9': 6,
        '10': 7,
        'J': 8,
        'Q': 9,
        'K': 10,
        'A': 11,
        '2': 12
    };

    const suits = {
        'Clubs': 0,
        'Hearts': 1,
        'Diamonds': 2,
        'Spades': 3
    };

    function isValidPair(cards) {
        return cards[0].rank === cards[1].rank;
    }

    function handIsValid(cards) {
        const type = cards.length;
        switch(type) {
        case handTypes.PAIR:
            return isValidPair(cards);
        default:
            return true;
        }
    }

    function isSingleGreater(card1, card2) {
        return ranks[card2.rank] > ranks[card1.rank] || suits[card2.suit] > suits[card1.suit];
    }

    function isGreater(currentState, newHand) {
        const type = currentState.cards.length;
        switch(type) {
        case handTypes.SINGLE:
            return isSingleGreater(currentState.cards[0], newHand.cards[0]);
        default:
            return false;
        }
    }

    function PusoyDos(config) {

    }

    PusoyDos.compare = (currentState, newHand) => {
        const validationFailures = {
            invalid: false,
            value: false,
            type: false
        };

        if(!handIsValid(newHand.cards)) {
            validationFailures.invalid = true;
        } else if(currentState.cards.length !== newHand.cards.length) {
            validationFailures.type = true;
        } else if(!isGreater(currentState, newHand)){
            validationFailures.value = true;
        }

        const validMove = Object.values(validationFailures).every(v => !v);

        return validMove || validationFailures;
    };

    if(typeof module !== 'undefined') {
        module.exports = PusoyDos;
    } else {
        window.pusoyDos = PusoyDos;
    }
})();