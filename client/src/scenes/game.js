var cardModule = require( 'card' );

import io from 'socket.io-client';
import Exact from './Exact';

export default class Game extends Phaser.Scene
{
	constructor()
	{
		super()
		{
			key: 'Game'
		}
	}

	preload()
	{
		this.load.image( 'C', 'src/assets/logo.png' );
		this.load.image( 'C1', 'src/assets/PNG-cards/ace_of_clubs.png' );
		this.load.image( 'C2', 'src/assets/PNG-cards/2_of_clubs.png' );
		this.load.image( 'C3', 'src/assets/PNG-cards/3_of_clubs.png' );
		this.load.image( 'C4', 'src/assets/PNG-cards/4_of_clubs.png' );
		this.load.image( 'C5', 'src/assets/PNG-cards/5_of_clubs.png' );
		this.load.image( 'C6', 'src/assets/PNG-cards/6_of_clubs.png' );
		this.load.image( 'C7', 'src/assets/PNG-cards/7_of_clubs.png' );
		this.load.image( 'C8', 'src/assets/PNG-cards/8_of_clubs.png' );
		this.load.image( 'C9', 'src/assets/PNG-cards/9_of_clubs.png' );
		this.load.image( 'C10', 'src/assets/PNG-cards/10_of_clubs.png' );
		this.load.image( 'C11', 'src/assets/PNG-cards/jack_of_clubs2.png' );
		this.load.image( 'C12', 'src/assets/PNG-cards/queen_of_clubs2.png' );
		this.load.image( 'C13', 'src/assets/PNG-cards/king_of_clubs2.png' );

		this.load.image( 'D1', 'src/assets/PNG-cards/ace_of_diamonds.png' );
		this.load.image( 'D2', 'src/assets/PNG-cards/2_of_diamonds.png' );
		this.load.image( 'D3', 'src/assets/PNG-cards/3_of_diamonds.png' );
		this.load.image( 'D4', 'src/assets/PNG-cards/4_of_diamonds.png' );
		this.load.image( 'D5', 'src/assets/PNG-cards/5_of_diamonds.png' );
		this.load.image( 'D6', 'src/assets/PNG-cards/6_of_diamonds.png' );
		this.load.image( 'D7', 'src/assets/PNG-cards/7_of_diamonds.png' );
		this.load.image( 'D8', 'src/assets/PNG-cards/8_of_diamonds.png' );
		this.load.image( 'D9', 'src/assets/PNG-cards/9_of_diamonds.png' );
		this.load.image( 'D10', 'src/assets/PNG-cards/10_of_diamonds.png' );
		this.load.image( 'D11', 'src/assets/PNG-cards/jack_of_diamonds2.png' );
		this.load.image( 'D12', 'src/assets/PNG-cards/queen_of_diamonds2.png' );
		this.load.image( 'D13', 'src/assets/PNG-cards/king_of_diamonds2.png' );

		this.load.image( 'H1', 'src/assets/PNG-cards/ace_of_hearts.png' );
		this.load.image( 'H2', 'src/assets/PNG-cards/2_of_hearts.png' );
		this.load.image( 'H3', 'src/assets/PNG-cards/3_of_hearts.png' );
		this.load.image( 'H4', 'src/assets/PNG-cards/4_of_hearts.png' );
		this.load.image( 'H5', 'src/assets/PNG-cards/5_of_hearts.png' );
		this.load.image( 'H6', 'src/assets/PNG-cards/6_of_hearts.png' );
		this.load.image( 'H7', 'src/assets/PNG-cards/7_of_hearts.png' );
		this.load.image( 'H8', 'src/assets/PNG-cards/8_of_hearts.png' );
		this.load.image( 'H9', 'src/assets/PNG-cards/9_of_hearts.png' );
		this.load.image( 'H10', 'src/assets/PNG-cards/10_of_hearts.png' );
		this.load.image( 'H11', 'src/assets/PNG-cards/jack_of_hearts2.png' );
		this.load.image( 'H12', 'src/assets/PNG-cards/queen_of_hearts2.png' );
		this.load.image( 'H13', 'src/assets/PNG-cards/king_of_hearts2.png' );

		this.load.image( 'S1', 'src/assets/PNG-cards/ace_of_spades.png' );
		this.load.image( 'S2', 'src/assets/PNG-cards/2_of_spades.png' );
		this.load.image( 'S3', 'src/assets/PNG-cards/3_of_spades.png' );
		this.load.image( 'S4', 'src/assets/PNG-cards/4_of_spades.png' );
		this.load.image( 'S5', 'src/assets/PNG-cards/5_of_spades.png' );
		this.load.image( 'S6', 'src/assets/PNG-cards/6_of_spades.png' );
		this.load.image( 'S7', 'src/assets/PNG-cards/7_of_spades.png' );
		this.load.image( 'S8', 'src/assets/PNG-cards/8_of_spades.png' );
		this.load.image( 'S9', 'src/assets/PNG-cards/9_of_spades.png' );
		this.load.image( 'S10', 'src/assets/PNG-cards/10_of_spades.png' );
		this.load.image( 'S11', 'src/assets/PNG-cards/jack_of_spades2.png' );
		this.load.image( 'S12', 'src/assets/PNG-cards/queen_of_spades2.png' );
		this.load.image( 'S13', 'src/assets/PNG-cards/king_of_spades2.png' );

		this.load.image( 'cardback', 'src/assets/PNG-cards/card_back.png' );

	}

	create()
	{
		let self = this;
		this.buttonsInitialized = false;
		this.updateGameButtons( true );

		this.socket = io( 'http://localhost:3000' );

		this.socket.on( 'connect', function ()
		{
			console.log( 'Connected' );
		} )

		this.socket.on( 'gamestate', function ( gameState )
		{
			self.updateGameState( gameState );
			//console.log( gameState );
		} )

		this.socket.on( 'clientstate', function ( clientState )
		{
			self.updateClientState( clientState );
		} )

		this.socket.on( 'selectgame', function ()
		{
			self.updateGameButtons( true );
		} )

		this.initInput();
	}

	initInput()
	{
		let self = this;
		this.input.on( 'dragstart', function ( pointer, gameObject )
		{
			{
				gameObject.setTint( 0xff69b4 );
			}
		} )

		this.input.on( 'dragend', function ( pointer, gameObject, dropped )
		{
			{
				gameObject.setTint();
				if ( !dropped )
				{
					gameObject.x = gameObject.input.dragStartX;
					gameObject.y = gameObject.input.dragStartY;
				}
			}
		} )

		this.input.on( 'drag', function ( pointer, gameObject, dragX, dragY )
		{
			{
				gameObject.x = dragX;
				gameObject.y = dragY;
			}
		} )

		this.input.on( 'drop', function ( pointer, gameObject, dropZone )
		{
			{
				dropZone.data.values.cards++;
				gameObject.x = ( dropZone.x - 350 ) + ( dropZone.data.values.cards * 50 );
				gameObject.y = dropZone.y;
				gameObject.disableInteractive();
				self.socket.emit( 'playcard', gameObject.getData( 'cardIndex' ) );
				self.gameMode.playedCard( gameObject );
			}
		} )
	}

	updateClientState( clientState )
	{
		let firstRun = false;
		if( !this.lastClientState )
		{
			firstRun = true;
			this.lastClientState = clientState;
		}

		if ( this.gameMode )
		{
			this.gameMode.setPlayerIndex( clientState.playerIndex );
		}

		this.lastClientState = clientState;
	}

	updateGameState( gameState )
	{
		let firstRun = false;
		if ( !this.lastGameState )
		{
			this.lastGameState = gameState;
			firstRun = true;
			console.log( 'firstRun' );
		}

		let lastGameState = this.lastGameState;
		if ( gameState.instanceState == cardModule.gameState.GameInstanceState.RUNNING )
		{
			if ( firstRun || ( ( gameState.instanceState != lastGameState.instanceState ) || ( lastGameState.gameType != gameState.gameType ) ) )
			{
				if ( gameState.instanceState != lastGameState.instanceState )
				{
					console.log( 'instance state change: ' + gameState.instanceState + ' ' + lastGameState.instanceState  );
				}

				if ( gameState.gameType != lastGameState.gameType )
				{
					console.log( 'gametype state change: ' + gameState.gameType + ' ' + lastGameState.gameType );
				}
				switch ( gameState.gameType )
				{
					case 0:
						console.log( 'StartExact' );
						self.gameMode = new Exact( self, self.socket );
						break;
					default:
						break;
				}
			}

			self.gameMode.updateGameState( lastGameState, gameState );
		}
		else
		{
			if ( self.gameMode )
			{
				console.log( 'EndGame' );
				self.gameMode.shutdown();
				delete self.gameMode;
				self.gameMode = undefined;
			}
		}

		this.updateGameButtons( gameState.instanceState == cardModule.gameState.GameInstanceState.FRONTEND );
		this.lastGameState = gameState;
	}

	updateGameButtons( initialize )
	{
		self = this;
		if ( initialize )
		{
			if ( !this.buttonsInitialized )
			{
				if ( self.quitText )
				{
					self.quitText.destroy();
				}

				this.wasEverInitialized = true;
				this.exactText = this.add.text( 75, 350, ['EXACT'] ).setFontSize( 18 ).setColor( '#00ffff' ).setInteractive();
				this.rumbleText = this.add.text( 75, 400, ['RUMBLE'] ).setFontSize( 18 ).setColor( '#00ffff' ).setInteractive();

				this.exactText.on( 'pointerdown', function ()
				{
					self.socket.emit( 'startgame', 0 );
				} )

				this.exactText.on( 'pointerover', function ()
				{
					self.exactText.setColor( '#ff69b4' );
				} )

				this.exactText.on( 'pointerout', function ()
				{
					self.exactText.setColor( '#00ffff' );
				} )

				this.rumbleText.on( 'pointerdown', function ()
				{
					self.socket.emit( 'startgame', 1 );
				} )

				this.rumbleText.on( 'pointerover', function ()
				{
					self.rumbleText.setColor( '#ff69b4' );
				} )

				this.rumbleText.on( 'pointerout', function ()
				{
					self.rumbleText.setColor( '#00ffff' );
				} )

				this.buttonsInitialized = true;
			}
		}
		else
		{
			if ( this.buttonsInitialized )
			{
				if ( self.rumbleText )
				{
					self.rumbleText.destroy();
				}

				if ( self.exactText )
				{
					self.exactText.destroy();
				}

				this.buttonsInitialized = false;

				this.quitText = this.add.text( 75, 150, ['QUIT GAME'] ).setFontSize( 18 ).setColor( '#00ffff' ).setInteractive();

				this.quitText.on( 'pointerdown', function ()
				{
					self.socket.emit( 'quitgame' );
				} )

				this.quitText.on( 'pointerover', function ()
				{
					self.quitText.setColor( '#ff69b4' );
				} )

				this.quitText.on( 'pointerout', function ()
				{
					self.quitText.setColor( '#00ffff' );
				} )
			}
		}
		
	}

	update()
	{
		
	}

}