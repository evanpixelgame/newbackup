import customEmitter from '../../../../../main.js';
export default class itemContextMenu extends Phaser.GameObjects.Container {
    constructor(scene, x, y, item) {
        super(scene, x, y);
        this.scene = scene;
        this.item = item;

        this.setSize(64, 64);

        this.contextMenuBackground = this.scene.add.rectangle(this.width / 2, this.height / 2, 64, 64, 0xdddddd, 0.5);
        this.add(this.contextMenuBackground);

        // Create menu options
        this.useOption = this.createOption('Use', 0);
        if (this.item.consumable === true) {
            this.consumeOption = this.createOption('Consume', 10);
        } else {
            console.log('menu item not consumable');
        }
        this.inspectOption = this.createOption('Inspect', 20);
        this.dropOption = this.createOption('Drop', 30);
        this.discardOption = this.createOption('Discard', 40);
        this.closeOption = this.createOption('Close', 50);

        // Add options to the menu
        this.add([this.useOption, this.inspectOption, this.dropOption, this.discardOption, this.closeOption]);
        if (this.item.consumable === true) {
            this.add([this.consumeOption]);
        }

        // Hide menu initially
        this.setVisible(false);


        // Register click event listeners

        this.useOption.on('pointerdown', this.useItem, this);
        if (this.item.consumable === true) {
            this.consumeOption.on('pointerdown', this.consumeItem, this);
        } else {
            console.log('item doesnt need consume listener');
             //make consume appeare but be inactive and grayed out ^^^
            this.consumeOption.on('pointerdown', this.consumeItem, this)
        }
        this.inspectOption.on('pointerdown', this.inspectItem, this);
        this.dropOption.on('pointerdown', this.dropItem, this);
        this.discardOption.on('pointerdown', this.discardItem, this);
        this.closeOption.on('pointerdown', this.closeMenu, this);

        // Add the menu to the scene
        scene.add.existing(this);
    }


    createOption(text, y) {
        let option = this.scene.add.text(0, y, text, {
            fill: '#ffffff',
            fontSize: '12px' // Add fontSize property here
        }).setInteractive();
        return option;
    }

    useItem() {
        // Logic for using the item
        console.log('Item used');
        if (typeof this.item.onUse === 'function') {
            console.log(`custom itemclass on use method`)
            this.item.onUse();
        }

        this.setVisible(false);
    }

    consumeItem() {
        // Logic for using the item
        console.log('Item used');
        if (typeof this.item.onConsume === 'function') {
            console.log(`custom itemclass on consume method`)
            this.item.onConsume();
        }
        this.setVisible(false);
    }


    inspectItem() {
        // Logic for dropping the item
        console.log('Inspect Item');
        console.log(this.item.flavorText);
        this.setVisible(false);
    }

    dropItem() {
        // Logic for dropping the item
        console.log('Item dropped');
        this.item.parentContainer.remove(this.item);
        console.log(this.item);
       // this.item.parentContainer.parentContainer.remove(this.item); 
        console.log(this.scene.activeScene);// remove from inventorycontainer and put in scene ideally next to player
        this.scene.activeScene.add.existing(this.item);
       // this.item.setPosition(window.innerWidth/2, window.innerHeight/2);
     //  this.item.setPosition(300, 300);
     this.item.setPosition(this.scene.activeScene.player.x + 30, this.scene.activeScene.player.y + 30)
        this.item.setScrollFactor(1, 1);
        this.item.setScale(.3);
        console.log(this.item);
        this.setVisible(false);
    }


    discardItem() {
        // Logic for dropping the item
        console.log('Item discarded');
        customEmitter.emit('removeItem', this.item.textureKey);
        this.setVisible(false);
    }


    closeMenu() {
        // Logic for dropping the item
        console.log('CloseMenu');
        this.setVisible(false);
    }
}

/*
// Usage example:
// When right-clicking an inventory item, display the context menu
let contextMenu;

// Assume inventoryItem is a Phaser.GameObjects.Sprite
inventoryItem.on('pointerdown', (pointer) => {
    if (pointer.rightButtonDown()) {
        if (!contextMenu) {
            // Create context menu if it doesn't exist
            contextMenu = new ContextMenu(scene, pointer.x, pointer.y);
        } else {
            // Update context menu position
            contextMenu.setPosition(pointer.x, pointer.y);
            contextMenu.setVisible(true);
        }
    }
});
*/
