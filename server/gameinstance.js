var exactModule = require( './games/exact' );

var cardModule = require( 'card' );

class GameInstance
{
	constructor( io, socket, playerCount, gametype )
	{
		console.log( 'starting game: ' + gametype );

		this.socket = socket;
		this.io = io;
		this.playerCount = playerCount;
		this.gametype = gametype;
		this.gameState = new cardModule.gameState( this.playerCount );
		this.startGame( gametype );
		this.count = 0;
	}

	startGame( gametype )
	{
		console.log( this.game );
		this.gameState.start( gametype );
		if ( gametype == 0 )
		{
			this.game = new exactModule( this.io, this.socket, this.playerCount, this.gameState );
		}
	}

	playCard( playerIndex, cardIndex )
	{
		this.game.playCard( playerIndex, cardIndex );
	}

	// Main Game Loop
	update()
	{
		this.count++;
		this.gameState.countTest++;
		this.io.emit( 'gamestate', this.gameState );
		if ( this.game )
		{
			this.game.update();
		}
	}
	
	endGame()
	{
		this.gameState.end();
	}
}


module.exports = GameInstance;