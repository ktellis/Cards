const cardHelper = require( '../game/cardhelper' );
const deck = require( '../cards/deck' );


function canPlayCard( handCards, cardIndex, suitLed )
{
    let card = deck.CardAtIndex( cardIndex );

    if ( suitLed == deck.Suits.NONE )
        return true;

    if ( card.suit == suitLed )
        return true;

    let matchingCard = false;
    for ( let cardCount = 0; cardCount < handCards.length; cardCount++ )
    {
        if ( deck.Cards[handCards[cardCount].cardIndex].suit == suitLed )
        {
            console.log( 'has a different card of the same suit!' );
            matchingCard = true;
            break;
        }
    }

    return !matchingCard;
}

function isCardTrump( card1, trumps )
{
    return card1.suit == trumps;
}

function isCardHigher( card1, card2 )
{
    if( card1.val == 1)
        return true;

    if( card2.val == 1)
        return false;

    if( card1.val > card2.val )
        return true;

    return false;
}

function isCardStronger( card1, card2, suitTrump, suitLed )
{
    let card1Trump = false;
    if( card1.suit == suitTrump )
    {
        card1Trump = true;
    }

    let card2Trump = false;
    if( card2.suit == suitTrump )
    {
        card2Trump = true;
    }

    let card1SuitLed = false;
    if( card1.suit == suitLed )
    {
        card1SuitLed = true;
    }

    let card2SuitLed = false;
    if( card2.suit == suitLed )
    {
        card2SuitLed = true;
    }

    isCard1Higher = false;
    if( card1Trump )
    {
        if( card2Trump )
        {
            if( isCardHigher( card1, card2 ))
            {
                isCard1Higher = true;
            }
            else
            {
                isCard1Higher = false;
            }
        }
        else
        {
            isCard1Higher = true;
        }
    }
    else
    {
        if( card2Trump )
        {
            isCard1Higher = false;
        }
        else
        {
            if( card1SuitLed )
            {
                if( card2SuitLed )
                {
                    if( isCardHigher( card1, card2 ))
                    {
                        isCard1Higher = true;
                    }
                    else
                    {
                        isCard1Higher = false;
                    } 
                }
                else
                {
                    isCard1Higher = true;
                }
            }
            else
            {
                if( card2SuitLed )
                {
                    isCard1Higher = false;
                }
                else
                {
                    if( isCardHigher( card1, card2 ))
                    {
                        isCard1Higher = true;
                    }
                    else
                    {
                        isCard1Higher = false;
                    } 
                }
            }
        }
    }

    return isCard1Higher;
}

function getTrickWinner( boardCards, trumpSuit, ledSuit )
{
    let bestCard = undefined;
    let bestCardEnt = undefined;
    for( let cardCount = 0; cardCount < boardCards.length; cardCount++ )
    {
        let tempCardEnt = boardCards[cardCount];
        let tempCard = deck.CardAtIndex( tempCardEnt.cardIndex );
        if( bestCard == undefined )
        {
            bestCard = tempCard;
            bestCardEnt = tempCardEnt;
        }
        else if( isCardStronger( tempCard, bestCard, trumpSuit, ledSuit ) )
        {
            bestCard = tempCard;
            bestCardEnt = tempCardEnt;
        }
    }

    return bestCardEnt.owner;
}

module.exports.canPlayCard = canPlayCard;
module.exports.getTrickWinner = getTrickWinner;
