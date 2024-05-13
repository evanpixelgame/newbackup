import customEmitter from '../../../../../../../main.js';
import Item from '../../itemsClass.js';

const emeraldRing = new Item(
    'Emerald Ring', //name
    'emeraldRing', //texture key
    1, //quantity
    'Looks pretty. +2 Charisma.', // use description
    `This ring could have belonged to a king...or maybe it's just a cheap fake?`, // flavor text 
    false, //stackable
    false, //consumable
    () => { //onUse method
        console.log('emeraldRing on use method');
    },

    () => { //onConsume method
        console.log('emeraldRing on consume method');
       // customEmitter.emit('healthChange', -30); //hurts coming out
        //make ring poopable if consumed, loses 1 coin resale value per poop
        //if gets neg you will have to pay ppl to buy
        //achievement for paying someone to buy neg value ring
        customEmitter.emit('removeItem', 'emeraldRing');
    }
    );

    export default emeraldRing;