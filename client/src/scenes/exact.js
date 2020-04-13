var cardModule = require( 'card' );
import CardRender from '../helpers/cardrender';
import Zone from '../helpers/zone';

export default class Exact
{
    constructor( scene, socket )
    {
		this.socket = socket;
		this.scene = scene;

		this.zone = new Zone( scene );
		this.dropZone = this.zone.renderZone();
		this.outline = this.zone.renderOutline( this.dropZone );
		this.myCards = [];
		this.boardCards = [];
		this.playerIndex = -1;
		this.renderedCardsInHand = [];
		this.renderedCardsOnBoard = [];
		this.countHelper = 0;
	}

	initHand()
	{
		this.myCards = [];
		this.boardCards = [];
		this.unrenderHandCards();
		this.unrenderBoardCards();
	}

	setPlayerIndex( playerIndex )
	{
		this.playerIndex = playerIndex;
	}

	updateGameState( oldGameState, newGameState )
	{
		let handCards = [];
		let boardCards = [];

		if ( oldGameState.trickCount != newGameState.trickCount )
		{
			this.initHand();
		}

		for ( let cardIndex = 0; cardIndex < newGameState.cardEntities.length; cardIndex++ )
		{
			let owner = newGameState.cardEntities[cardIndex].owner;
			let inHand = newGameState.cardEntities[cardIndex].cardLocation == cardModule.board.CardLocation.HAND;
			if ( ( owner != -1 ) && ( owner == this.playerIndex ) && inHand )
			{
				handCards.push( newGameState.cardEntities[cardIndex] );
				//console.log( cardIndex );
			}

			let onBoard = newGameState.cardEntities[cardIndex].cardLocation == cardModule.board.CardLocation.BOARD;
			if ( onBoard )
			{
				boardCards.push( newGameState.cardEntities[cardIndex] );
			}
		}

		if ( !( JSON.stringify( handCards ) === JSON.stringify( this.myCards ) ) )
		{
			console.log( '' );
			console.log( 'hand card mismatch ' + this.countHelper );
			this.myCards = handCards;
			this.unrenderHandCards();
			this.renderHandCards();
			this.countHelper++;
		}

		boardCards.sort( ( a, b ) => a.playedOrder - b.playedOrder );

		if ( !( JSON.stringify( boardCards ) === JSON.stringify( this.boardCards ) ) )
		{
			console.log( '' );
			console.log( 'board card mismatch' + this.countHelper );
			this.boardCards = boardCards;
			console.log( boardCards );
			this.unrenderBoardCards();
			this.renderBoardCards();
			this.countHelper++;
		}

	}

	renderHandCards()
	{
		for ( let cardIndex = 0; cardIndex < this.myCards.length; cardIndex++ )
		{
			let card = cardModule.deck.Cards[ this.myCards[cardIndex].cardIndex ];
			let cardImageString = '' + cardModule.deck.SuitPrefix[card.suit] + card.val;
			console.log( cardImageString );
			let playerCard = new CardRender( this.scene, true, this.myCards[cardIndex].cardIndex );
			let image = playerCard.render( 200 + ( cardIndex * 100 ), 450, cardImageString );
			image.setData( 'cardIndex', this.myCards[cardIndex].cardIndex );
			this.renderedCardsInHand.push( image );
		}
	}

	unrenderHandCards()
	{
		for ( let renderedCard = 0; renderedCard < this.renderedCardsInHand.length; renderedCard++ )
		{
			this.renderedCardsInHand[renderedCard].destroy();
		}
		this.renderedCardsInHand = [];
	}

	renderBoardCards()
	{
		for ( let cardIndex = 0; cardIndex < this.boardCards.length; cardIndex++ )
		{
			this.renderBoardCard( this.boardCards[cardIndex].cardIndex, cardIndex );
		}
	}

	renderBoardCard( cardIndex, count )
	{
		let playerCard = new CardRender( this.scene, false );
		let card = cardModule.deck.Cards[cardIndex];
		let cardImageString = '' + cardModule.deck.SuitPrefix[card.suit] + card.val;
		console.log( cardImageString );
		let image = playerCard.render( 350 + ( count * 50 ), 175, cardImageString );
		this.renderedCardsOnBoard.push( image );
	}


	unrenderBoardCards()
	{
		for ( let renderedCard = 0; renderedCard < this.renderedCardsOnBoard.length; renderedCard++ )
		{
			this.renderedCardsOnBoard[renderedCard].destroy();
		}
		this.renderedCardsOnBoard = [];
	}

	playedCard( card )
	{
		let cardIndex = card.getData( 'cardIndex' );

		let cardEnt = this.myCards.find( heldCard => heldCard.cardIndex == cardIndex );
		if ( cardEnt )
		{
			this.myCards = this.myCards.filter( heldCard => heldCard.cardIndex != cardIndex );
			this.boardCards.push( cardEnt );
			this.unrenderHandCards();
			this.unrenderBoardCards();
			this.renderHandCards();
			this.renderBoardCards();
		}
	}

	shutdown()
	{
		this.unrenderHandCards();
		this.unrenderBoardCards();
	}
}