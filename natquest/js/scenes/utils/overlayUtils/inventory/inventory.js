import { createInventoryContainer, createItemSlots } from "./inventoryUtils/createInventoryContainer.js";
import itemContextMenu from "./inventoryUtils/inventoryItemContextMenu.js";
import customEmitter from '../../../../main.js';

export default class Inventory {
  constructor(scene) {

    scene.add.existing(this);
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
    //createInventoryZones(scene);
    createItemSlots(scene);
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
       // itemIcon.setDepth(100);
        itemIcon.setScale(.7);
        itemIcon.setInteractive({ draggable: true });
        let lastClickTime = 0;
        let doubleClickDelay = 4000; // Adjust this value as needed
        itemIcon.ContextMenu;
       

        itemIcon.on('pointerdown', function (pointer, localX, localY, event) {

         //  console.log('pointerDowndetected');

          //let currentTime = scene.scene.time.now;
          let currentTime = this.scene.time.now; //deleted this by try isntead?

          // Calculate time since last click
          let clickTimeDifference = currentTime - lastClickTime;
      
          // Check if it's a double click
          if (clickTimeDifference < doubleClickDelay) {
              // Double-click detected
              console.log('Double-clicked on sprite');
              lastClickTime = 0;
      
              // Add your logic for double-click here
          }

       
          // Check if it's a right-click
          if (pointer.button == 2) {
            console.log('Right-clicked on sprite');
            pointer.event.preventDefault();
            pointer.event.stopPropagation();
          }

        });

        scene.input.setDraggable(itemIcon);
        this.setDragEvents(itemIcon, scene);

        itemIconContainers[i].add(itemIcon); //add the icon as child of first available iconContainer
        itemIconContainers[i].isEmpty = false; //change slot to not empty

        
      //  console.log(itemIcon);
        
        return;

      }
    }
  }


  setDragEvents(itemIcon, scene) {

    let dragXTotal = 0;
    let dragYTotal = 0;
  //  console.log(`set drag events being called;`);
    this.itemDragStart(itemIcon, scene);
    this.itemDragEnd(itemIcon, scene);
    this.itemDrag(itemIcon, scene);

  }


  itemDrag(itemIcon, scene) {

    itemIcon.on('drag', function (pointer, dragX, dragY) {
   //   console.log('drag');
   if (scene.inventoryContainer.allowDrag){
      this.setAlpha(.5);
      this.x = dragX;
      this.y = dragY;
   } else {
    console.log(`cant drag now, resetting allowDrag to true`);
    scene.inventoryContainer.allowDrag = true;
    //return false;
   }
    });
  }


  itemDragStart(itemIcon, scene) {

    itemIcon.on('dragstart', function (pointer, dragX, dragY) {
      console.log('dragStart');
      this.setAlpha(0.5);
      let lastClickTime = 0;
      let doubleClickDelay = 4000;
      scene.inventoryContainer.allowDrag = true;

      scene.inventoryContainer.dragStartTime = this.scene.time.now; //deleted this by try isntead?
      let lastDragEndTime = scene.inventoryContainer.lastDragEndTime;
      let timeSinceLastDrag = scene.inventoryContainer.dragStartTime - lastDragEndTime;
      console.log('REAL time since last drag should be: ' + timeSinceLastDrag);

      if (timeSinceLastDrag < 100) { //also make sure its dropped on same container
        console.log(`Double Clicked on item`);
        //event.stopImmediatePropagation();
       // pointer.stopImmediatePropagation();
      //  pointer.stopPropagation();
      scene.inventoryContainer.allowDrag = false;
      if (!itemIcon.contextMenu) {
        console.log('startmakingcontextmenu');
        // Create context menu if it doesn't exist
        itemIcon.contextMenu = new itemContextMenu(scene, pointer.x, pointer.y, itemIcon);
        itemIcon.contextMenu.setPosition(pointer.x, pointer.y);
        itemIcon.contextMenu.setVisible(true);
        //itemIcon.contextMenu = true;
    } else {
        // Update context menu position
        itemIcon.contextMenu.setPosition(pointer.x, pointer.y);
        itemIcon.contextMenu.setVisible(true);
    }
      return false;
      }

     // console.log(pointer);
     // console.log(scene.inventoryContainer.dragStartTime);


      scene.inventoryContainer.dragStartX = itemIcon.getBounds().x;
      scene.inventoryContainer.dragStartY = itemIcon.getBounds().y;
      scene.inventoryContainer.startSpriteState = itemIcon;
    //  console.log(itemIcon.getBounds());
     // console.log(itemIcon);

      scene.inventoryContainer.dragStartParent = itemIcon.parentContainer;
    //  console.log(scene.inventoryContainer.dragStartParent);
    //  console.log(scene.inventoryContainer.dragStartParent.getBounds());
      // itemIcon.parentContainer.parentContainer.remove(itemIcon.parentContainer);
      // itemIcon.parentContainer.parentContainer.remove(itemIcon.parentContainer);
      //console.log(itemIcon);

      // scene.inventoryContainer.itemIconContainers[6].add(itemIcon);


    });
  }

  itemDragEnd(itemIcon, scene) {

    itemIcon.on('dragend', function (pointer, dragX, dragY) {
     // console.log('dragEnd');
    //  console.log(pointer);

      let prevTime = scene.inventoryContainer.dragStartTime;
      scene.inventoryContainer.lastDragEndTime = this.scene.time.now;
      let dragDur = scene.inventoryContainer.lastDragEndTime - prevTime;
      console.log('dragend: drag duration should be: ' + dragDur);


/*
      //also add check to make sure it was dropped in same container it started
      if (dragDur < 500 && scene.inventoryContainer.quickClicks === 0) {
        console.log('dragEnd DoubleClick listen, first click');
        scene.inventoryContainer.quickClicks = 1;
      } else {
        console.log('too slow for doubleclick, first click');
      }

      if (dragDur > 500) {
        scene.inventoryContainer.quickClicks = 0;
      }

      if (dragDur < 500 && scene.inventoryContainer.quickClicks === 1) {
        console.log('dragEnd DoubleClick listen, second click');
       // scene.inventoryContainer.quickClicks = 0;
      } else {
        console.log('too slow for doubleclick, second click');
      }
*/




      this.setAlpha(1);

      const itemIconContainers = scene.inventoryContainer.itemIconContainers;
      const itemParent = itemIcon.parentContainer;

      let isValidDropZone = Phaser.Geom.Rectangle.Overlaps(scene.inventoryContainer.getBounds(), itemIcon.getBounds());

      if (isValidDropZone) {

        // The draggable item is overlapping with the drop target
      //  console.log("Dragged onto drop target");


        let maxOverlap = 0;
        let bestDropZoneIndex = -1;
        let slotID = 0;

        for (let i = 0; i < scene.inventoryContainer.itemSlotContainers.length; i++) {
          let dropZone = scene.inventoryContainer.itemSlotContainers[i];
          let overlapArea = Phaser.Geom.Rectangle.Intersection(dropZone.getBounds(), itemIcon.getBounds()).width * Phaser.Geom.Rectangle.Intersection(dropZone.getBounds(), itemIcon.getBounds()).height;

          if (overlapArea > maxOverlap) {
            maxOverlap = overlapArea;
            bestDropZoneIndex = i;
            slotID = i + 1;
          }
        }

        if (bestDropZoneIndex !== -1) {
        //  console.log(`Dropped in Zone ${bestDropZoneIndex}, slot number: ${bestDropZoneIndex + 1}`);
          if (itemIconContainers[bestDropZoneIndex].isEmpty === true) {
         //   console.log(`add icon to new empty slot and switch parent container`);
            itemIconContainers[bestDropZoneIndex].isEmpty = false;
            itemIconContainers[bestDropZoneIndex].add(itemIcon);
            itemParent.isEmpty = true;
        //    console.log(itemIcon);
            const endXY = scene.inventory.getRelativePos(itemIcon, scene);
            itemIcon.setPosition(endXY);
          } else {
            console.log(`swap icon spots`);
            //console.log(itemIconContainers[bestDropZoneIndex].first);
            const otherIcon = itemIconContainers[bestDropZoneIndex].first;
            itemParent.add(otherIcon);
            itemIconContainers[bestDropZoneIndex].add(itemIcon);
            const endXY = scene.inventory.getRelativePos(itemIcon, scene);
            itemIcon.setPosition(endXY);
            const endXYotherIcon = scene.inventory.getRelativePos(otherIcon, scene);
            otherIcon.setPosition(endXYotherIcon);

          }
        } else {
          console.log("No drop zone detected == Too little of sprite in dropZone");
          const startX = scene.inventoryContainer.dragStartX;
          const startY = scene.inventoryContainer.dragStartY;

        //  console.log(itemIcon);
          const endXY = scene.inventory.getRelativePos({ x: startX, y: startY }, scene);
          itemIcon.setPosition(endXY);
        }


      }

      else {
        const startX = scene.inventoryContainer.dragStartX;
        const startY = scene.inventoryContainer.dragStartY;

      //  console.log(itemIcon);
        const endXY = scene.inventory.getRelativePos({ x: startX, y: startY }, scene);
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


    });
  }


}