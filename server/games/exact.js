var cardModule = require( 'card' );

const MAX_CARDS_PER_ROUND = 7;

class Exact
{
	constructor( io, socket, playerCount, gameState )
    {
		this.socket = socket;
		io.emit( 'startExact' );

		this.cardsPerRound = MAX_CARDS_PER_ROUND;
		let maxCardsPerRound = Math.floor( cardModule.deck.CARDS_IN_DECK / playerCount );
		if ( maxCardsPerRound < MAX_CARDS_PER_ROUND )
		{
			this.cardsPerRound = maxCardsPerRound;
		}
		this.maxCardsPerRound = this.cardsPerRound;

		this.goingDown = true;
		this.playerCount = playerCount;
		this.gameState = gameState;
		this.startGame();
	}

	update()
	{
		
	}

	startGame( playerCount )
	{
		this.startRound();
	}

	startRound()
	{
		this.deck = new ( cardModule.deck );
		this.deck.shuffleCards();
		this.cardOrder = 0;
		this.gameState.initRound();

		let cardsGiven = 0;
		for ( let cpr = 0; cpr < this.cardsPerRound; cpr++ )
		{
			for ( let playerIndex = 0; playerIndex < this.playerCount; playerIndex++ )
			{
				let cardIndex = this.deck.order[cardsGiven];
				this.gameState.givePlayerCard( cardIndex, playerIndex );
				let card = cardModule.deck.Cards[cardIndex];
				console.log( 'Gave Player: ' + playerIndex + '  Card: ' + card.val + ' of ' + cardModule.deck.SuitsText[card.suit] );
				cardsGiven++;
			}
		}

		//To Do: Set this to the highest bidder
        this.gameState.setTurn(0);
		this.gameState.setStartedRound( 0 );
		this.gameState.setStartedHand( 0 );
	}

	nextHand()
	{
		let cardsOnBoard = cardModule.cardHelper.getCardsOnBoard( this.gameState.cardEntities );
		let trickWinner = cardModule.exactRules.getTrickWinner( cardsOnBoard, this.gameState.trumpSuit, this.gameState.suitLed );
		this.gameState.finishHand( trickWinner );

		//To Do: Set this to the winner of the last hand
		this.gameState.setTurn( trickWinner );
		this.gameState.setStartedHand( trickWinner );

		console.log( 'Hand Finished - Trick Count: ' + this.gameState.trickCount + ' Cards Per Round: ' + this.cardsPerRound );
		if ( this.gameState.trickCount == this.cardsPerRound )
		{
			this.endRound();
		}
    }

    endRound()
    {
		//Scoring Logic

        this.nextRound();
        this.startRound();
    }

	nextRound()
	{
		console.log( 'Next Round' );
		if ( this.goingDown )
		{
			if ( this.cardsPerRound == 1 )
			{
				this.goingDown = false;
			}
		}

		if ( this.goingDown )
		{
			this.cardsPerRound--;
		}
		else
		{
			this.cardsPerRound++;
		}

		if ( this.cardsPerRound > this.maxCardsPerRound )
		{
			this.endGame();
		}
	}

	playCard( playerIndex, cardIndex )
	{
		if ( this.gameState.playCard( cardModule.exactRules.canPlayCard, playerIndex, cardIndex, this.cardOrder ) )
		{
			this.cardOrder++;
			this.gameState.advanceTurn();

			console.log( 'Started turn: ' + this.gameState.turn + ' started hand:' + this.gameState.startedHand );

			if ( this.gameState.turn == this.gameState.startedHand )
			{
				this.nextHand();
			}
		}
	}

	endGame()
	{
		console.log( 'Game Over' );
		this.gameState.end();
	}
}


module.exports = Exact;