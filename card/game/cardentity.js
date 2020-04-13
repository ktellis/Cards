const board = require( '../cards/board' );

const PLAYER_INVALID = -1;
const TRICK_INVALID = -1;
const PLAYED_ORDER = -1;

class CardEntity
{
    constructor( cardIndex )
    {
        this.cardIndex = cardIndex;
        this.cardLocation = board.CardLocation.DECK;
        this.owner = PLAYER_INVALID;
        this.trick = TRICK_INVALID;
        this.playedOrder = PLAYED_ORDER;
    }
}

module.exports = CardEntity;