
import customEmitter from '../../../../../../main.js';
import Item from '../itemsClass.js';

const healthPotionWeak = new Item(
    'health Potion', //name
    'healthPotionWeak', //texture key
    1, //quantity
    'Restores 10 HP. Consumable.', // use description
    'It looks slightly worn out, but probably still good', // flavor text 
    true, //stackable
    true, //consumable
    () => { //onUse method
        console.log('healthPotion on use method');
    },

    () => { //onConsume method
        console.log('healthPotion on consume method');
        customEmitter.emit('healthChange', 30);

    }
    );

    export default healthPotionWeak;