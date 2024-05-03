import { createInventoryContainer, populateItemSlots, populateItemSlot, depopulateItemSlot } from "./inventoryUtils/createInventoryContainer.js";

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


/*
  initializeInventoryItems(scene) {
    const itemSlots = scene.inventoryContainer.itemSlotContainers;
    const items = scene.inventory.items;

    // Loop through each item slot container and populate with items
    itemSlots.forEach((itemSlotContainer, index) => {
        const item = items[index]; // Get the item corresponding to the current index
        if (item) {
            const emptySlotSprite = itemSlotContainer.getAt(0); // Assuming the empty slot sprite is the first child
            
            const itemIconContainer = scene.add.container(0, 0); // Create container for item icon
itemSlotContainer.add(itemIconContainer); // Add item icon container as a child of itemSlotContainer

            const itemIcon = scene.add.sprite(0, 0, item.icon); // Create item icon sprite
            itemIcon.setScale(0.7);
            itemIcon.setInteractive({ draggable: true });
            scene.input.setDraggable(itemIcon);

            // Add drag event listeners
            itemIcon.on('dragstart', function (pointer, dragX, dragY) {
                // Optional visual feedback when dragging starts
                console.log(`attempting to start dragstart`);
                this.setAlpha(0.5);
                this.setDepth(1e9);
            });

            itemIcon.on('dragend', function (pointer, dragX, dragY, dropped) {
                console.log(`attempting to start dragend`);
                this.setAlpha(1); // Reset alpha
                // Add logic for drag end (optional)
            });

            // Update the position of the item icon during drag
            scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
                if (gameObject === itemIcon) {
                    gameObject.x = dragX; // Update the x position of the dragged item icon
                    gameObject.y = dragY; // Update the y position of the dragged item icon
                }
            });

            // Add the item icon sprite as a child of the empty slot sprite
            itemIconContainer.addChild(itemIcon);
        }
    });
}
*/



  // /*
  initializeInventoryItems(scene) {
    const itemSlots = scene.inventoryContainer.itemSlotContainers;

    const items = scene.inventory.items;

    //items.push(null);

    const itemIconContainers = [];
    console.log(items.length);

// Iterate through itemSlotContainers
itemSlots.forEach(itemSlotContainer => {
  // Get the custom ID of the current itemSlotContainer
  const containerId = itemSlotContainer.getData('containerId');

  // Create a new container inside the itemSlotContainer
  const itemIconContainer = scene.add.container(0, 0); // Example position
  itemSlotContainer.add(itemIconContainer);

  // Set the name of the new container based on the custom ID
  itemIconContainer.setName(`ItemIconContainer${containerId}`);
  console.log(itemIconContainer);
  console.log(itemIconContainer.parentContainer)
  console.log(itemSlotContainer);
  itemIconContainers.push(itemIconContainer);
});


    // Loop through each item slot container and populate with items
    itemIconContainers.forEach((itemSlotContainer, index) => {
      const item = items[index]; // Get the item corresponding to the current index
      if (item) {
        const itemIcon = scene.add.sprite(0, 0, item.icon); // Create item icon sprite
        itemIcon.setScale(.7);
        itemIcon.setInteractive({ draggable: true });
        scene.input.setDraggable(itemIcon);

              // Add drag event listeners
      itemIcon.on('dragstart', function (pointer, dragX, dragY) {
        // Optional visual feedback when dragging starts
        console.log(`attempting to start dragstart`);
        this.setAlpha(0.5);
        this.setDepth(1e9);
   
      });

      itemIcon.on('dragend', function (pointer, dragX, dragY, dropped) {
        console.log(`attempting to start dragend`);
        this.setAlpha(1); // Reset alpha
        // Add logic for drag end (optional)
        this.setDepth(1e9);
      });


         // Update the position of the item icon during drag
         scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
          if (gameObject === itemIcon) {
          /*  
            if (childContainer.parentContainer) {
              childContainer.parentContainer.remove(childContainer);
          }
          */

             /*  
            if (gameObject.parentContainer) {
              gameObject.parentContainer.remove(gameObject);
          }
          */
            gameObject.setDepth(1e9);
            gameObject.x = dragX; // Update the x position of the dragged item icon
            gameObject.y = dragY; // Update the y position of the dragged item icon
          }
        });
        
        itemSlotContainer.add(itemIcon); // Add item icon to item slot container
        console.log(itemSlotContainer);
      }
    });
    
    const containerIdlog = 2; // Example container ID you want to access
    const itemSlotContainerlog = scene.inventoryContainer.itemSlotContainers.find(container => container.getData('containerId') === containerIdlog);
    console.log(itemSlotContainerlog);
   
  }


//   */



/*

        // Add drag events
        itemIcon.on('dragstart', function (pointer, dragX, dragY) {
          // Optionally, you can add visual feedback when dragging starts
          this.setAlpha(0.5);
        });

        itemIcon.on('dragend', function (pointer, dragX, dragY, dropped) {
          // Reset the alpha when dragging ends
          this.setAlpha(1);

          if (!dropped) {
            // If the item icon was not dropped onto a valid target, reset its position
            this.x = this.input.dragStartX;
            this.y = this.input.dragStartY;
          }
        });

        itemSlotContainer.add(itemIcon); // Add item icon to item slot container
      }
    });

  }
*/
  
/*
  initializeInventoryItems(scene) {
    const itemSlots = scene.inventoryContainer.itemSlotContainers;
    const items = scene.inventory.items;
  
    // Loop through each item slot container and populate with items
    itemSlots.forEach((itemSlotContainer, index) => {
      const item = items[index]; // Get the item corresponding to the current index
  
      if (item) {
        const itemIcon = scene.add.sprite(0, 0, item.icon); // Create item icon sprite
        itemIcon.setInteractive({ draggable: true });
        scene.input.setDraggable(itemIcon);
  
        // Add drag events
        itemIcon.on('dragstart', function (pointer, dragX, dragY) {
          // Optional visual feedback
          this.setAlpha(0.5);
        });
  
        itemIcon.on('dragend', function (pointer, dragX, dragY, dropped) {
          this.setAlpha(1); // Reset alpha
  
          if (dropped) {
            const dropZone = scene.input.hitTest(pointer.x, pointer.y, { ignore: [itemIcon] }); // Check for drop zone (excluding the dragged icon)
            if (dropZone.length > 0) {
              const targetSlotContainer = dropZone[0].gameObject; // Get the target slot container
  
              // Check if the target is another valid slot container
              if (targetSlotContainer !== itemSlotContainer && targetSlotContainer.canHoldItem(item)) {
                // Swap items in the items array
                const sourceIndex = index;
                const targetIndex = itemSlots.indexOf(targetSlotContainer);
                [items[sourceIndex], items[targetIndex]] = [items[targetIndex], items[sourceIndex]];
  
                // Update item icons in both containers
                const targetIcon = targetSlotContainer.getChildAt(0); // Assuming one icon per slot
                targetIcon.setTexture(item.icon);
  
                // Optional: Handle item swap logic (e.g., equip/unequip)
              } else {
                // Reset position if not dropped on a valid target
                this.x = this.input.dragStartX;
                this.y = this.input.dragStartY;
              }
            }
          }
        });
  
        itemSlotContainer.add(itemIcon); // Add item icon to item slot container
      }
    });
  }
  

/*
  initializeDragAndDrop(scene) {
    const itemSlotContainers = scene.inventoryContainer.itemSlotContainers;


// Add drop events
itemSlotContainers.forEach(itemSlotContainer => {
  itemSlotContainer.on('drop', function (pointer, droppedItemIcon) {
      // Get the source and target containers
      const sourceContainer = droppedItemIcon.parentContainer;
      const targetContainer = this;

      // Find the indices of the source and target containers
      const sourceIndex = itemSlotContainers.indexOf(sourceContainer);
      const targetIndex = itemSlotContainers.indexOf(targetContainer);

      // Swap item icons between the source and target containers
      const sourceItemIcon = sourceContainer.getAt(1); // Assuming the item icon is the second child
      const targetItemIcon = targetContainer.getAt(1); // Assuming the item icon is the second child
      sourceContainer.remove(sourceItemIcon);
      targetContainer.remove(targetItemIcon);
      sourceContainer.add(targetItemIcon);
      targetContainer.add(sourceItemIcon);

      // Swap items in the items array
      const items = scene.inventory.items;
      [items[sourceIndex], items[targetIndex]] = [items[targetIndex], items[sourceIndex]];
  });
});

  }
*/



}