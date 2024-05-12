import customEmitter from '../../../../../../main.js';
import Item from '../itemsClass.js';

const wealthPotion = new Item(
    'Wealth Potion', //name
    'wealthPotionTexture', //texture key
    'wealthPotionTexture', //icon key, will be replaced with texture so delete after 
    1, //quantity
    'Restores 10 coins. Consumable.', // use description
    'It looks slightly worn out, but probably still good', // flavor text 
    true, //stackable
    true, //consumable
    () => { //onUse method
        console.log('wealthPotion on use method');
    },

    () => { //onConsume method
        console.log('wealthPotion on consume method');
        customEmitter.emit('healthChange', -30);
    }
    );

    export default wealthPotion;