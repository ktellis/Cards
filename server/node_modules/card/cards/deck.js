
const CARDS_IN_DECK = 52;
const CARDS_PER_SUIT = 13;
const Suits =
{
    CLUBS: 0,
    DIAMONDS: 1,
    HEARTS: 2,
    SPADES: 3,
    ANY: 4,
    NONE: 5
}

const SuitsText = ['clubs', 'diamonds', 'hearts', 'spades'];
const SuitPrefix = ['C', 'D', 'H', 'S'];

const Cards =
[
        { suit: Suits.CLUBS, val: 1, index: 0 },
        { suit: Suits.CLUBS, val: 2, index: 1 },
        { suit: Suits.CLUBS, val: 3, index: 2 },
        { suit: Suits.CLUBS, val: 4, index: 3 },
        { suit: Suits.CLUBS, val: 5, index: 4 },
        { suit: Suits.CLUBS, val: 6, index: 5 },
        { suit: Suits.CLUBS, val: 7, index: 6 },
        { suit: Suits.CLUBS, val: 8, index: 7 },
        { suit: Suits.CLUBS, val: 9, index: 8 },
        { suit: Suits.CLUBS, val: 10, index: 9 },
        { suit: Suits.CLUBS, val: 11, index: 10 },
        { suit: Suits.CLUBS, val: 12, index: 11 },
        { suit: Suits.CLUBS, val: 13, index: 12 },
        { suit: Suits.DIAMONDS, val: 1, index: 13 },
        { suit: Suits.DIAMONDS, val: 2, index: 14 },
        { suit: Suits.DIAMONDS, val: 3, index: 15 },
        { suit: Suits.DIAMONDS, val: 4, index: 16 },
        { suit: Suits.DIAMONDS, val: 5, index: 17 },
        { suit: Suits.DIAMONDS, val: 6, index: 18 },
        { suit: Suits.DIAMONDS, val: 7, index: 19 },
        { suit: Suits.DIAMONDS, val: 8, index: 20 },
        { suit: Suits.DIAMONDS, val: 9, index: 21 },
        { suit: Suits.DIAMONDS, val: 10, index: 22 },
        { suit: Suits.DIAMONDS, val: 11, index: 23 },
        { suit: Suits.DIAMONDS, val: 12, index: 24 },
        { suit: Suits.DIAMONDS, val: 13, index: 25 },
        { suit: Suits.HEARTS, val: 1, index: 26 },
        { suit: Suits.HEARTS, val: 2, index: 27 },
        { suit: Suits.HEARTS, val: 3, index: 28 },
        { suit: Suits.HEARTS, val: 4, index: 29 },
        { suit: Suits.HEARTS, val: 5, index: 30 },
        { suit: Suits.HEARTS, val: 6, index: 31 },
        { suit: Suits.HEARTS, val: 7, index: 32 },
        { suit: Suits.HEARTS, val: 8, index: 33 },
        { suit: Suits.HEARTS, val: 9, index: 34 },
        { suit: Suits.HEARTS, val: 10, index: 35 },
        { suit: Suits.HEARTS, val: 11, index: 36 },
        { suit: Suits.HEARTS, val: 12, index: 37 },
        { suit: Suits.HEARTS, val: 13, index: 38 },
        { suit: Suits.SPADES, val: 1, index: 39 },
        { suit: Suits.SPADES, val: 2, index: 40 },
        { suit: Suits.SPADES, val: 3, index: 41 },
        { suit: Suits.SPADES, val: 4, index: 42 },
        { suit: Suits.SPADES, val: 5, index: 43 },
        { suit: Suits.SPADES, val: 6, index: 44 },
        { suit: Suits.SPADES, val: 7, index: 45 },
        { suit: Suits.SPADES, val: 8, index: 46 },
        { suit: Suits.SPADES, val: 9, index: 47 },
        { suit: Suits.SPADES, val: 10, index: 48 },
        { suit: Suits.SPADES, val: 11, index: 49 },
        { suit: Suits.SPADES, val: 12, index: 50 },
        { suit: Suits.SPADES, val: 13, index: 51 },
]; 

class Deck
{
    constructor()
    {
        this.order = [];
        for ( let i = 0; i < CARDS_IN_DECK; i++ )
        {
            this.order.push( i );
        }
    }

    shuffleCards()
    {
        shuffle( this.order );
    }
}

function CardAtIndex( index )
{
    return Cards[index];
}

function shuffle( a )
{
    var j, x, i;
    for ( i = a.length - 1; i > 0; i-- )
    {
        j = Math.floor( Math.random() * ( i + 1 ) );
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

module.exports = Deck;
module.exports.CARDS_IN_DECK = CARDS_IN_DECK;
module.exports.CARDS_PER_SUIT = CARDS_PER_SUIT;
module.exports.Suits = Suits;
module.exports.SuitsText = SuitsText;
module.exports.SuitPrefix = SuitPrefix;
module.exports.CardAtIndex = CardAtIndex;
module.exports.Cards = Cards;