
import customEmitter from '../../../../../../main.js';
import Item from '../itemsClass.js';

const poisonPotionWeak = new Item(
    'Poison Potion Weak', //name
    'poisonPotionWeak', //texture key
    1, //quantity
    `Poison. Don't drink. But if you do, -30 HP. Consumable.`, // use description
    'Looks gross, but definitely tastes worse.', // flavor text 
    true, //stackable
    true, //consumable
    () => { //onUse method
        console.log('poisonPotion on use method');
    },

    () => { //onConsume method
        console.log('poisonPotion on consume method');
        customEmitter.emit('healthChange', -30);
  
    }
    );

    export default poisonPotionWeak;