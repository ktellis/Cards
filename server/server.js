const server = require( 'express' )();
const http = require( 'http' ).createServer( server );
const io = require( 'socket.io' )( http );
const gameInstance = require( './gameinstance' );
var cardModule = require( 'card' );

let clients = [];

io.on( 'connection', function ( socket )
{
	console.log( 'A user connected: ' + socket.id );

	if ( !this.gameInstance || clients.length == 0 )
	{
		this.gameInstance = 0;
    }

	clients.push( new cardModule.clientState( socket.id ) );
	console.log( 'client count: ' + clients.length );

	socket.on( 'disconnect', function ()
	{
		console.log( 'A user disconnected: ' + socket.id );
		clients = clients.filter( client => client.id !== socket.id );
		console.log( 'client count: ' + clients.length );
	} )

	let self = this;
	socket.on( 'startgame', function ( gametype )
	{
		if ( self.gameInstance )
		{
			delete self.gameInstance;
		}

		for ( clientIndex = 0; clientIndex < clients.length; clientIndex++ )
		{
			clients[clientIndex].playerIndex = clientIndex;
		}

		self.gameInstance = new gameInstance( io, socket, clients.length, gametype );
	} )

	socket.on( 'quitgame', function ()
	{
		console.log( 'Quit Game' );

		if ( self.gameInstance )
		{
			self.gameInstance.endGame();
		}
	} )

	socket.on( 'playcard', function ( cardIndex )
	{
		console.log( 'Client ' + socket.id + ' attempted to play card ' + cardIndex );
		let client = clients.find( element => element.id == socket.id );
		if ( client )
		{
			if ( self.gameInstance )
			{
				self.gameInstance.playCard( client.playerIndex, cardIndex );
			}
		}
	} )

	self.count = 0;
	setInterval( () =>
	{
		if ( self.gameInstance != 0 )
		{
			self.gameInstance.update();
		}
		else
		{
			io.emit( 'selectgame' );
		}

		for ( let clientIndex = 0; clientIndex < clients.length; clientIndex++ )
		{
			io.to( clients[clientIndex].id ).emit( 'clientstate', clients[clientIndex] );
		}
	}, 50 );
} );

http.listen( 3000, function ()
{
	console.log( 'Server started!' );
} );

