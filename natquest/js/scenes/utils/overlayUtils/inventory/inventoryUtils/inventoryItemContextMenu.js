export default class itemContextMenu extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.scene = scene;


        this.contextMenuBackground = this.scene.add.rectangle(0, 0, 50, 50, 0xdddddd, 0.5);
        this.add(this.contextMenuBackground);

        // Create menu options
        this.useOption = this.createOption('Use');
        this.consumeOption = this.createOption('Consume');
        this.dropOption = this.createOption('Drop');
        this.discardOption = this.createOption('Discard');

        // Add options to the menu
        this.add([this.useOption, this.consumeOption, this.dropOption, this.discardOption]);

        // Hide menu initially
        this.setVisible(false);

        // Register click event listeners
        this.useOption.on('pointerdown', this.useItem, this);
        this.consumeOption.on('pointerdown', this.consumeItem, this);
        this.dropOption.on('pointerdown', this.dropItem, this);
        this.discardOption.on('pointerdown', this.discardItem, this);

        // Add the menu to the scene
        scene.add.existing(this);
    }


    createOption(text) {
        let option = this.scene.add.text(0, 0, text, { fill: '#ffffff' }).setInteractive();
        return option;
    }

    useItem() {
        // Logic for using the item
        console.log('Item used');
        this.setVisible(false);
    }

    consumeItem() {
        // Logic for using the item
        console.log('Item used');
        this.setVisible(false);
    }

    dropItem() {
        // Logic for dropping the item
        console.log('Item dropped');
        this.setVisible(false);
    }

    discardItem() {
        // Logic for dropping the item
        console.log('Item dropped');
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
