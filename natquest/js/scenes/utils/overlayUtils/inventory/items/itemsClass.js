import customEmitter from '../../../../../main.js';

// Define an item class
export default class Item {
    constructor(name, textureKey, quantity, description, flavorText, stackable, consumable, onUse, onConsume) {
        this.name = name;
        this.textureKey = textureKey;
        this.quantity = quantity; // Adjust to desired quantity if stacking is enabled
      //  this.icon: '', // Replace with your icon image key from preloader
        this.description = description;
        this.flavorText = flavorText;
        this.stackable = stackable;
        this.consumable = consumable;
        this.onUse = onUse;
        this.onConsume = onConsume;
    }
}

/*
// Create an item object example
import customEmitter from '../../../../../../main.js';
import Item from '../itemsClass.js';

const wealthPotion = new Item(
    'Wealth Potion', //name
    'wealthPotion', //texture key
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
        customEmitter.emit('removeItem', 'wealthPotion')
    }
    );

    export default wealthPotion;
*/