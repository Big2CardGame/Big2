(function() {
    'use strict';

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
        '3d': 3,
        '4c': 4,
        '4s': 5,
        '4h': 6,
        '4d': 7,
        '5c': 8,
        '5s': 9,
        '5h': 10,
        '5d': 11,
        '6c': 12,
        '6s': 13,
        '6h': 14,
        '6d': 15,
        '7c': 16,
        '7s': 17,
        '7h': 18,
        '7d': 19,
        '8c': 20,
        '8s': 21,
        '8h': 22,
        '8d': 23,
        '9c': 24,
        '9s': 25,
        '9h': 26,
        '9d': 27,
        '10c': 28,
        '10s': 29,
        '10h': 30,
        '10d': 31,
        'Jc': 32,
        'Js': 33,
        'Jh': 34,
        'Jd': 35,
        'Qc': 36,
        'Qs': 37,
        'Qh': 38,
        'Qd': 39,
        'Kc': 40,
        'Ks': 41,
        'Kh': 42,
        'Kd': 43,
        'Ac': 44,
        'As': 45,
        'Ah': 46,
        'Ad': 47,
        '2c': 48,
        '2s': 49,
        '2h': 50,
        '2d': 51
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
        return ranks[card2.rank] > ranks[card1.rank];
    }

    // Compares if a pair beats another pair where pair1 = card1 + card2 && pair2 = card3 +card4
    function isPairGreater(pair1, pair2) {
        return ranks[card1.rank] + ranks[card2.rank] > ranks[card3.rank] + ranks[card4.rank];
    // If combined value of pairs are equal (ie: 4c4d = 4s4h), then suit value is next tiebreaker

    }

    // Compares if a trips beats another trips where trips1 = card1 + card2 + card3 && trips2 = card4 + card5 + card6
    function isTripsGreater(trips1, trips2) {
        return ranks[card1.rank] + ranks[card2.rank] + ranks[card3.rank]> ranks[card4.rank] + ranks[card5.rank] + ranks[card6.rank];  
    }

    // Compares if a hand beats another hand
    function isHandGreater(hand1, hand2) {
        return ranks[hand1.rank] > ranks[hand2.rank];
    // If hands are both straights, then straight to highest card wins
    // If both straights are to the same number, then higher suit between final card in straight wins

    // If hands are both flushes, then flush with higher suit wins
    // If both flushes are the same suit, then highest card in flush wins

    // If hands are both quads, then highest non-single card wins

    // If hands are both straight flushes, then higher suit wins
    // If both straight flushes are the same suit, then highest card in straight flush wins

    // If hands are both royal flushes (AKQJ10), then higher suit wins  
        
    }
    
    function startGame(ranks) {
        if (rank = 0) {
          return "Start";
        } else {
          return "CANNOT Start";
        }
      }
      
      console.log(rank(51));
      // expected output: "CANNOT Start"






    function isGreater(currentState, newHand) {
        const type = currentState.cards.length;
        switch(type) {
        case handTypes.SINGLE:
            return isSingleGreater(currentState.cards[0], newHand.cards[0]);
        default:
            return false;
        }
    }


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

    function BigTwo(config) {

    }

    BigTwo.compare = (currentState, newHand) => {
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
        module.exports = BigTwo;
    } else {
        window.BigTwo = BigTwo;
    }
})();