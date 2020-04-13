const board = require( '../cards/board' );

function isCardInPlayerHand( cardEntity, playerIndex )
{
    if ( ( cardEntity.owner == playerIndex ) && ( cardEntity.cardLocation == board.CardLocation.HAND ) )
    {
        return true;
    }
    return false;
}

function getCardsInHand( cardEntities, playerIndex )
{
    cardsInHand = cardEntities.filter( cardEntity => isCardInPlayerHand( cardEntity, playerIndex ) );
    return cardsInHand;
}

function getCardsOnBoard( cardEntities )
{
    cardsInHand = cardEntities.filter( cardEntity => cardEntity.cardLocation == board.CardLocation.BOARD );
    return cardsInHand;
}

module.exports.isCardInPlayerHand = isCardInPlayerHand;
module.exports.getCardsInHand = getCardsInHand;
module.exports.getCardsOnBoard = getCardsOnBoard;
