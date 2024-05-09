import { createInventoryContainer, createInventoryZones, createItemSlots } from "./inventoryUtils/createInventoryContainer.js";
import customEmitter from '../../../../main.js';

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
    createInventoryZones(scene);
    createItemSlots(scene);
  }


  // Function to check if a drop zone is valid for dropping
  isValidDropZone(dropZone) {
    // Implement logic to determine if the drop zone is valid for dropping
    return dropZone.isEmpty; // Example: Assume drop zone is valid if it's empty
  }

  // Function to update the position of the item in the drop zone
  updateItemPositionInDropZone(dropZone, tempPosition) {
    // Implement logic to update the position of the item in the drop zone
    // For example, you may update the state of the drop zone to indicate that it's no longer empty
    dropZone.isEmpty = false;
  }



  findZone(x, y, dropZones) {
    console.log(dropZones);
    for (let i = 0; i < dropZones.length; i++) {
      const zone = dropZones[i];
      if (x >= zone.x && x < zone.x + zone.width && y >= zone.y && y < zone.y + zone.height) {
        return i; // Return the index of the zone
      }
    }
    return -1; // If no zone contains the coordinate
  }

  getRelativePos(object, parentContainer) {
    let x = object.x;
    let y = object.y;
    let currentContainer = object.parentContainer;

    // Traverse up the hierarchy until the specified parentContainer is reached
    while (currentContainer && currentContainer !== parentContainer) {
      x -= currentContainer.x;
      y -= currentContainer.y;
      currentContainer = currentContainer.parentContainer;
    }

    // If the specified parentContainer is found, return the relative position
    if (currentContainer === parentContainer) {
      return { x, y };
    } else {
      // If the specified parentContainer is not found, return null or handle the error accordingly
      return null;
    }
  }


  addItemToContainer(scene, item) {

    const itemIconContainers = scene.inventoryContainer.itemIconContainers;
    const items = scene.inventory.items;

    if (scene.inventory.items.includes(item)) {
      console.log('this item is already in inventory. now adding to container, is it stackable?');
    } else {
      console.log('this item aint in your inventory');
    }

    for (let i = 0; i < itemIconContainers.length; i++) {

      //if (itemIconContainers[i].dropZone.isEmpty === false) {
      if (itemIconContainers[i].isEmpty === false) {
        // const itemIcon = scene.add.sprite(0, 0, 'emptySlotSprite');
        console.log('this itemIconContainer is filled, trying next one'); //can delete these 3 lines after testing
      }
      else { //check if slot is empty

        const itemIcon = scene.add.sprite(0, 0, item.icon); //add sprite
        //itemIconContainers[i].itemIcon = itemIcon;
        itemIcon.setDepth(100);
        itemIcon.setScale(.7);
        itemIcon.setInteractive({ draggable: true });
        // itemIcon.setOrigin(.5, .5);
        scene.input.setDraggable(itemIcon);
        // scene.inventoryContainer.items.push(itemIcon); //add item to inventorycontainer.items vs inventory.items
        itemIconContainers[i].isEmpty = false; //change slot to not empty
        this.setDragEvents(itemIcon, scene);
        // scene.inventoryContainer.itemSlots.push(itemIcon);
        console.log(itemIcon);
        itemIconContainers[i].add(itemIcon); //add the icon as child of first available iconContainer
        return;

      }
    }
  }

  // */


  setDragEvents(itemIcon, scene) {

    let dragXTotal = 0;
    let dragYTotal = 0;
    console.log(`set drag events being called;`);
    this.itemDragStart(itemIcon, scene);
    this.itemDragEnd(itemIcon, scene);
    this.itemDrag(itemIcon, scene);

  }


  itemDrag(itemIcon, scene) {

    itemIcon.on('drag', function (pointer, dragX, dragY) {
      console.log('drag');
      this.setAlpha(.5);
      this.x = dragX;
      this.y = dragY;
      // scene.inventoryContainer.itemZones
      //customEmitter.on('zoneChange')
      //in collision handlers, custom emitter passes new scene key when transitioning scenes, this subscribes to that emitter

      customEmitter.on('activeSceneChanged', () => {
        console.log(`event emitter caught in itemdrag, now in zone`);
      });

      customEmitter.on('activeSceneChanged', (i) => {
        console.log(`event emitter caught in itemdrag, now in zone ${i}`);
      });

      var isOverlapping = Phaser.Geom.Rectangle.Overlaps(scene.inventoryContainer.itemSlotContainers[2], itemIcon.getBounds());

      if (isOverlapping) {
        // The draggable item is overlapping with the drop target
        console.log("Dragged onto drop target");
      }

    });
  }


  itemDragStart(itemIcon, scene) {

    itemIcon.on('dragstart', function (pointer, dragX, dragY) {
      console.log('dragStart');
      this.setAlpha(0.5);
      scene.inventoryContainer.dragStartX = itemIcon.getBounds().x;
      scene.inventoryContainer.dragStartY = itemIcon.getBounds().y;
      scene.inventoryContainer.startSpriteState = itemIcon;
      console.log(itemIcon.getBounds());
      console.log(itemIcon);

      scene.inventoryContainer.dragStartParent = itemIcon.parentContainer;
       console.log(scene.inventoryContainer.dragStartParent);
       console.log(scene.inventoryContainer.dragStartParent.getBounds());
 // itemIcon.parentContainer.parentContainer.remove(itemIcon.parentContainer);
// itemIcon.parentContainer.parentContainer.remove(itemIcon.parentContainer);
 //console.log(itemIcon);

 // scene.inventoryContainer.itemIconContainers[6].add(itemIcon);


    });
  }

  itemDragEnd(itemIcon, scene) {

    itemIcon.on('dragend', function (pointer, dragX, dragY) {
      console.log('dragEnd');

      this.setAlpha(1);

      const itemIconContainers = scene.inventoryContainer.itemIconContainers;

      let isValidDropZone = Phaser.Geom.Rectangle.Overlaps(scene.inventoryContainer.getBounds(), itemIcon.getBounds());

      if (isValidDropZone) {
    
        // The draggable item is overlapping with the drop target
        console.log("Dragged onto drop target");

        
      let maxOverlap = 0;
      let bestDropZoneIndex = -1;
      
      for (let i = 0; i < scene.inventoryContainer.itemSlotContainers.length; i++) {
          let dropZone = scene.inventoryContainer.itemSlotContainers[i];
          let overlapArea = Phaser.Geom.Rectangle.Intersection(dropZone.getBounds(), itemIcon.getBounds()).width * Phaser.Geom.Rectangle.Intersection(dropZone.getBounds(), itemIcon.getBounds()).height;
      
          if (overlapArea > maxOverlap) {
              maxOverlap = overlapArea;
              bestDropZoneIndex = i;
          }
      }
      
      if (bestDropZoneIndex !== -1) {
          console.log(`Dropped in Zone ${bestDropZoneIndex}, slot number: ${bestDropZoneIndex + 1}`);
      } else {
          console.log("No drop zone detected == Too little of sprite in dropZone");
          const startX = scene.inventoryContainer.dragStartX;
          const startY = scene.inventoryContainer.dragStartY;
  
          console.log(itemIcon);
          const endXY = scene.inventory.getRelativePos({x: startX, y: startY}, scene);
          itemIcon.setPosition(endXY);
      }
      

      }

      else {
        const startX = scene.inventoryContainer.dragStartX;
        const startY = scene.inventoryContainer.dragStartY;

        console.log(itemIcon);
        const endXY = scene.inventory.getRelativePos({x: startX, y: startY}, scene);
        itemIcon.setPosition(endXY);

        /*
        const tween = scene.tweens.add({
          targets: itemIcon,
          x: endXY.x,
          y: endXY.y,
          ease: 'Power2', // Adjust easing for desired movement
          duration: 300, // Adjust duration for animation speed
      });
       */
      }

      //if it overlaps more than one zone, see which one it overlaps the most
      //or just return to original position if it overlaps 2



/*
      for (let i = 0; i < scene.inventoryContainer.itemSlotContainers.length; i++) {
        let dropZone = scene.inventoryContainer.itemSlotContainers[i];
        let isDropZone = Phaser.Geom.Rectangle.Overlaps(dropZone.getBounds(), itemIcon.getBounds());
        if (isDropZone) {
          console.log(`Dropped in Zone ${i}`)
        }
      }
      */

    });
  }


  initializeInventoryItems(scene) {
    const itemSlots = scene.inventoryContainer.itemSlotContainers;

    const items = scene.inventory.items;

    const itemIconContainers = [];
    console.log(items.length);

    scene.inventoryContainer.dropZones = [];
    scene.inventoryContainer.items = [];

    // Iterate through itemSlotContainers
    itemSlots.forEach(itemSlotContainer => {
      // Get the custom ID of the current itemSlotContainer
      const containerId = itemSlotContainer.getData('containerId');

      // Create a new container inside the itemSlotContainer
      const itemIconContainer = scene.add.container(0, 0); // Example position

      itemSlotContainer.add(itemIconContainer);

      // Set the name of the new container based on the custom ID
      itemIconContainer.setName(`ItemIconContainer${containerId}`);

      itemIconContainers.push(itemIconContainer);

      itemIconContainer.dropZone = { x: itemIconContainer.parentContainer.x, y: itemIconContainer.parentContainer.y, width: 64, height: 64, isEmpty: true, dropZoneID: containerId }

      scene.inventoryContainer.dropZones.push(itemIconContainer.dropZone);
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

          const newRelativeStartPos = scene.inventory.getRelativePos(itemIcon, scene.inventoryContainer);
          // console.log(`x and y of start drag: x: ${itemIcon.x} and y: ${itemIcon.y}`);

          console.log(`x and y of start drag: x: ${newRelativeStartPos.x} and y ${newRelativeStartPos.y}`);


          for (let i = 0; i < dropZonesList.length; i++) {
            const x = Math.abs(newRelativeStartPos.x);
            const y = Math.abs(newRelativeStartPos.y);
            const zone = dropZonesList[i];
            if (x >= zone.x && x < zone.x + zone.width && y >= zone.y && y < zone.y + zone.height) {
              console.log('THIS IS THE WHAT THE INDEX OF ZONE SHOULD BE ' + i);
              return i; // Return the index of the zone
            } else {
              // console.log('ZONE INDEX NOT FOUND FOR, x: ' +  dropZonesList[i].x + 'y :' + dropZonesList[i].y);
            }
          }

          this.setAlpha(0.5);
          this.setDepth(1e9);
          console.log(itemIcon.parentContainer);
          console.log(itemIcon.parentContainer.parentContainer);


          itemIcon.parentContainer.parentContainer.remove(itemIcon.parentContainer);

          scene.inventoryContainer.itemSlotContainers.ItemIconContainer6.add(itemIcon);
          console.log(itemIcon);

          console.log(`this is the inventoryContainer.dropZones array: ${scene.inventoryContainer.dropZones}`);

        });


        itemIcon.on('dragend', function (pointer, dragX, dragY, dropped) {
          console.log(`attempting to start dragend`);

        });


        // Update the position of the item icon during drag
        scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
          if (gameObject === itemIcon) {

            gameObject.setDepth(1e9);
            gameObject.x = dragX; // Update the x position of the dragged item icon
            gameObject.y = dragY; // Update the y position of the dragged item icon
            for (let i = 0; i < dropZonesList.length; i++) {
              const x = Math.abs(gameObject.x);
              const y = Math.abs(gameObject.y);
              const zone = dropZonesList[i];
              if (x >= zone.x && x < zone.x + zone.width && y >= zone.y && y < zone.y + zone.height) {
                console.log('THIS IS THE WHAT THE *END* INDEX OF ZONE SHOULD BE ' + i);
                return i; // Return the index of the zone
              } else {
                //console.log('ZONE INDEX NOT FOUND FOR, x: ' +  dropZonesList[i].x + 'y :' + dropZonesList[i].y);
              }
            }
          }
        });

        itemSlotContainer.add(itemIcon); // Add item icon to item slot container
        // console.log(itemSlotContainer);

        console.log('item populating iconSlotContainer at ', index, itemSlotContainer);
      }
    });

    const dropZonesList = scene.inventoryContainer.dropZones;
    console.log(dropZonesList);

    // Enable input events for each drop zone
    dropZonesList.forEach(dropZone => {
      const { x, y, width, height } = dropZone;

      const zone = scene.add.zone(x, y, width, height).setRectangleDropZone(width, height);
      zone.setData('dropZone', dropZone);
      zone.setInteractive();
      console.log(`created new zone: ${zone}`);

      zone.on('drop', (pointer, gameObject, dropZone) => {
        console.log(`tried to drop in zone: ${zone}`);
        const { draggedItem, dropZoneData } = gameObject.getData();
        if (draggedItem && isValidDropZone(dropZoneData)) {
          const tempPosition = { x: draggedItem.x, y: draggedItem.y };
          draggedItem.setPosition(dropZoneData.x, dropZoneData.y);
          updateItemPositionInDropZone(dropZoneData, tempPosition);
        }
      });

      zone.on('pointerover', () => {
        // graphics.alpha = 0.7;
        console.log(zone);
      });

      zone.on('pointerout', () => {
        // graphics.alpha = 0.5;
        console.log(zone);
      });
    });

  }

}