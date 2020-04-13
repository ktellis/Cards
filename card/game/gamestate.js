const board = require( '../cards/board' );
const cardEntity = require( './cardentity' );
const deck = require( '../cards/deck' );
const trickEntity = require( './trickentity' );
const cardHelper = require( './cardhelper' );

const MAX_PLAYERS = 52;
const TURN_INVALID = -1;

const GameInstanceState = 
{
    FRONTEND: 0,
    RUNNING: 1
}

const Phase =
{
    BIDDING: 0,
    PLAYING: 1
}

class GameState
{
    constructor( playerCount )
    {
        this.instanceState = GameInstanceState.FRONTEND;
        this.playerCount = playerCount;
        this.gameType = -1;
    }

    initRound()
    {
        this.cardEntities = [];
        for ( let i = 0; i < deck.CARDS_IN_DECK; i++ )
        {
            this.cardEntities[i] = new cardEntity( i );
        }

        this.tricks = [];
        this.trickCount = 0;
        this.turn = TURN_INVALID;
        this.startedRound = TURN_INVALID;
        this.startedHand = TURN_INVALID;
        this.suitLed = deck.Suits.NONE;
        this.trumpSuit = deck.Suits.NONE;
        console.log( 'Suit Led is now: ' + this.suitLed  );
    }

    start( gameType )
    {
        this.instanceState = GameInstanceState.RUNNING;
        this.gameType = gameType;
    }

    end()
    {
        this.instanceState = GameInstanceState.FRONTEND;
    }

    //Players
    addPlayer()
    {
        this.playerCount++;
    }

    setPlayers( playerCount )
    {
        this.playerCount = playerCount;
    }

    //Tricks
    makeTrick( cards, playerIndex )
    {
        let trick = new trickEntity();
        trick.owner = playerIndex;
        for ( let i = 0; i < cards.length; i++ )
        {
            trick.addCard( cards[i] );
            cards[i].trick = this.trickCount;
        }

        this.tricks.push( trick );
        this.trickCount++;
    }

    //Card Functions
    givePlayerCard( index, playerIndex )
    {
        this.cardEntities[index].owner = playerIndex;
        this.cardEntities[index].cardLocation = board.CardLocation.HAND;
    }

    hasCardInHand( playerIndex, index )
    {
        if ( ( this.cardEntities[index].owner == playerIndex ) && ( this.cardEntities[index].cardLocation == board.CardLocation.HAND ) )
        {
            return true;
        }
        
        return false;
    }

    playCard( gameRules, playerIndex, index, cardOrder )
    {
        if ( !this.isPlayersTurn( playerIndex ) )
        {
            console.log( 'Not the turn of player: ' + playerIndex + ' Turn is: ' + this.turn );
            return false;
        }

        if ( !this.hasCardInHand( playerIndex, index ) )
        {
            console.log( 'Player: ' + playerIndex + 'Does not have card: ' + index + ' in hand' );
            return false;
        }

        if ( !gameRules( cardHelper.getCardsInHand( this.cardEntities, playerIndex ), index, this.suitLed ) )
        {
            console.log( 'Game rules disallow player: ' + playerIndex + ' to play card: ' + index );
            return false;
        }

        console.log( 'Player ' + playerIndex + ' played card ' + index );
        this.cardEntities[index].cardLocation = board.CardLocation.BOARD;
        this.cardEntities[index].playedOrder = cardOrder;

        if ( this.suitLed == deck.Suits.NONE )
        {
            console.log( 'Suit Led is now: ' + deck.CardAtIndex( index ).suit );
            this.suitLed = deck.CardAtIndex( index ).suit;
        }
        return true;
    }

    //Turn
    advanceTurn()
    {
        if ( this.turn + 1 < this.playerCount )
        {
            this.turn++;
        }
        else if ( this.turn + 1 == this.playerCount )
        {
            this.turn = 0;
        }
        else
        {
            console.log( 'ERROR: DID NOT CHANGE TURN' );
        }
        console.log( 'Turn is now: ' + this.turn );
    }

    setTurn( playerIndex )
    {
        this.turn = playerIndex;
        console.log( 'Turn is now: ' + this.turn );
    }

    setStartedRound( playerIndex )
    {
        this.startedRound = playerIndex;
    }

    setStartedHand( playerIndex )
    {
        this.startedHand = playerIndex;
    }

    finishHand( playerIndex )
    {
        let trickCards = [];
        for ( let cardIndex = 0; cardIndex < this.cardEntities.length; cardIndex++ )
        {
            if ( this.cardEntities[cardIndex].cardLocation == board.CardLocation.BOARD )
            {
                this.cardEntities[cardIndex].cardLocation = board.CardLocation.TRICK;
                trickCards.push( this.cardEntities[cardIndex] );
            }
        }

        this.makeTrick( trickCards, playerIndex );
        this.turn = playerIndex;
        this.startedHand = playerIndex;
        this.suitLed = deck.Suits.NONE;
        console.log( 'Suit Led is now: ' + this.suitLed  );
    }

    isPlayersTurn( playerIndex )
    {
        if ( playerIndex == this.turn )
        {
            return true;
        }

        return false;
    }
}

module.exports = GameState;
module.exports.GameInstanceState = GameInstanceState;