import { createInventoryContainer, populateItemSlot, depopulateItemSlot } from "./inventoryUtils/createInventoryContainer.js";

export default class Inventory {
    constructor(scene) {

        scene.add.existing(this)
        this.items = [];
        this.inventoryContainer = [];
        this.activeItemBar = [];
        
    }




    addItem(item) {
        const existingItemIndex = this.items.findIndex(existingItem => existingItem.name === item.name);
        if (existingItemIndex !== -1 && item.stackable) { // Item is stackable and already exists
          this.items[existingItemIndex].quantity += item.quantity;
        } else {
          this.items.push(item);
        }
    }

    removeItem(item) {
        const index = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
    }

    displayFullInventory() {
        console.log('Inventory:');
        this.items.forEach(item => {
            console.log(item);
        });
    }

    createInventoryContainer(scene) {
      console.log('call the import funct w/ method of same name');
      createInventoryContainer(scene);
    }


}

/*
    createItemBar() {
        this.itemBar = this.add.container(400, 500); // Adjust position

        // Inventory item display (example using Images for icons)
        const itemIconSize = 64; // Adjust as needed
        let yOffset = 0; // Keep track of vertical position for each item

        for (const item of this.items) {
          const itemImage = new Image(this, x, yOffset, item.icon, 0).setScale(itemIconSize / item.icon.width, itemIconSize / item.icon.height);
          const quantityText = this.add.bitmapText(x + itemIconSize + 10, yOffset, 'inventoryFont', item.quantity, 16); // Adjust font size
          yOffset += itemIconSize + 5; // Adjust spacing for next item
          const itemDescription = item.description;
          const itemFlavorText = item.flavorText;
         
    
          //Add event listeners for item interaction (use with caution to avoid performance issues)
          itemImage.on('pointerdown', () => this.handleItemUse(item));
    
          if (this.itemBar) {
            itemImage.setDepth(1); // Ensure items appear above other game elements (if applicable)
            quantityText.setDepth(1);
            this.itemBar.add(itemImage);
            this.itemBar.add(quantityText);
          }
        }
    }

    createInventoryHotkeys() { 
    this.key1 = this.input.keyboard.addKey('1');
    this.key2 = this.input.keyboard.addKey('2');
    this.key3 = this.input.keyboard.addKey('3');
    this.key4 = this.input.keyboard.addKey('4');
    this.key5 = this.input.keyboard.addKey('5');
    this.key6 = this.input.keyboard.addKey('6');
    this.key7 = this.input.keyboard.addKey('7');
    this.key8 = this.input.keyboard.addKey('8');
    this.key9 = this.input.keyboard.addKey('9');
    this.key0 = this.input.keyboard.addKey('0');
  }
   



//instead of using update loop, just use event listeners for this
//since updates of this dont really need to be checked every frame
//also probaly need to do similar logic for setting up item bar and full inventory display
    updateActiveItem() {

        if (Phaser.Input.Keyboard.JustDown(this.key1)) {
            this.selectNewItem(this.itemBar[0]);
          }
        else if (Phaser.Input.Keyboard.JustDown(this.key2)) {
            this.selectNewItem(this.itemBar[1]);
          }
          else if (Phaser.Input.Keyboard.JustDown(this.key3)) {
            this.selectNewItem(this.itemBar[2]);
          }
          else if (Phaser.Input.Keyboard.JustDown(this.key4)) {
            this.selectNewItem(this.itemBar[3]);
          }
          else if (Phaser.Input.Keyboard.JustDown(this.key5)) {
            this.selectNewItem(this.itemBar[4]);
          }
          else if (Phaser.Input.Keyboard.JustDown(this.key6)) {
            this.selectNewItem(this.itemBar[5]);
          }
          else if (Phaser.Input.Keyboard.JustDown(this.key7)) {
            this.selectNewItem(this.itemBar[6]);
          }
          else if (Phaser.Input.Keyboard.JustDown(this.key8)) {
            this.selectNewItem(this.itemBar[7]);
          }  
          else if (Phaser.Input.Keyboard.JustDown(this.key9)) {
            this.selectNewItem(this.itemBar[8]);
          }
          else if (Phaser.Input.Keyboard.JustDown(this.key0)) {
            this.selectNewItem(this.itemBar[9]);
          }
    }

    selectNewItem(itemBarKey) {

    }

}
*/
/*
// Example usage:
const playerInventory = new Inventory();
playerInventory.addItem(healthPotionWeak);
playerInventory.displayInventory();

const healthPotionWeak = {
    name: 'Health Potion Weak',
    quantity: 1, // Adjust to desired quantity if stacking is enabled
    icon: 'healthPotionWeakIcon', // Replace with your icon image key from preloader
    description: 'Restores 10 HP. Consumable.',
    flavorText: 'It looks slightly worn out, but probably still good',
    stackable: true,
    consumable: true,
  };
  
  // Call the addItem function from your scene class
  this.addItem(healthPotionWeak);
  */