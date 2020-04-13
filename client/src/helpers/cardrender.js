export default class CardRender
{
    constructor( scene, interactive, cardIndex )
    {
        this.render = ( x, y, sprite ) =>
        {
            let card = undefined;
            if ( interactive )
            {
                card = scene.add.image( x, y, sprite ).setScale( .3, .3 ).setInteractive();
                scene.input.setDraggable( card );
            }
            else
            {
                card = scene.add.image( x, y, sprite ).setScale( .3, .3 );
            }
            card.setData( 'cardIndex', cardIndex );
            return card;
        }
    }
}