class TrickEntity
{
    constructor()
    {
        this.cards = [];
        this.owner = 0;
    }

    addCard( cardIndex )
    {
        this.cards.push( cardIndex );
    }
}

module.exports = TrickEntity;