class ClientState
{
    constructor( id )
    {
        this.playerIndex = -1;
        this.id = id;
    }

    setPlayerIndex( playerIndex )
    {
        this.playerIndex = playerIndex;
    }
}

module.exports = ClientState;
