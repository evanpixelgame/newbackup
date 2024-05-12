import customEmitter from '../../../../../../../main.js';
import Item from '../../itemsClass.js';

const emeraldRing = new Item(
    'Emerald Ring', //name
    'emeraldRing', //texture key
    1, //quantity
    'Looks pretty. +2 Charisma.', // use description
    `This ring could have belonged to a king...or maybe it's just a cheap fake?`, // flavor text 
    true, //stackable
    true, //consumable
    () => { //onUse method
        console.log('emeraldRing on use method');
    },

    () => { //onConsume method
        console.log('emeraldRing on consume method');
       // customEmitter.emit('healthChange', -30);
        customEmitter.emit('removeItem', 'emeraldRing')
    }
    );

    export default emeraldRing;