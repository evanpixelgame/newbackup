import customEmitter from '../../../../../main.js';

// Define an item class
export default class Item {
    constructor(name, textureKey, icon, quantity, description, flavorText, stackable, consumable, onUse, onConsume) {
        this.name = name;
        this.textureKey = textureKey;
        this.icon = icon;
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
const wealthPotion = new Item(
'Wealth Potion',
'wealthPotionTexture',
1, //quantity
'Restores 10 coins. Consumable.', // use description
'It looks slightly worn out, but probably still good', // flavor text 
true, //stackable
true, //consumable
);
*/