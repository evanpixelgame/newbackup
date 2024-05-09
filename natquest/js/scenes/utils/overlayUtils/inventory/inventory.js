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

  /*

  createItemIconContainers(scene) {

    const itemSlots = scene.inventoryContainer.itemSlotContainers;

    const itemIconContainers = [];

    //scene.inventoryContainer.itemIconContainers = [];
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


      itemIconContainer.dropZone = { x: itemIconContainer.parentContainer.x, y: itemIconContainer.parentContainer.y, width: 64, height: 64, isEmpty: true, dropZoneID: containerId }

      const dropZone = scene.add.zone(itemIconContainer.dropZone.x, itemIconContainer.dropZone.y, itemIconContainer.dropZone.width, itemIconContainer.dropZone.height, {
        // Optional properties
        // name: 'zone1', // Assign a custom name
        fillColor: 0xffe000, // Set a fill color for debugging (with alpha)
        alpha: 0.5, // Transparency of the fill color (0-1)
      });
      dropZone.setInteractive();
      //const dropZone = new Zone(scene, itemIconContainer.parentContainer.x, itemIconContainer.parentContainer.y, 64, 64);

      dropZone.input.dropZone = true;

      dropZone.input.hitArea.width = 64;
      dropZone.input.hitArea.height = 64;

      itemIconContainers.push(itemIconContainer);


      dropZone.on('pointerover', function (pointer, gameObject) {
        // Highlight the drop zone or provide feedback
        console.log(itemIconContainer.dropZone.dropZoneID + 'is being draggedover now :D')
      });

      dropZone.on('drop', function (pointer, gameObject) {
        // Process the dropped item
        console.log('Item dropped onto drop zone :' + itemIconContainer.dropZone.dropZoneID + ' with object: ' + gameObject);
      });

      console.log(dropZone);

      scene.inventoryContainer.dropZones.push(itemIconContainer.dropZone);
    });

    scene.inventoryContainer.itemIconContainers = itemIconContainers;
  }

  */

  // /*
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
      scene.inventoryContainer.itemZones
      //customEmitter.on('zoneChange')
        //in collision handlers, custom emitter passes new scene key when transitioning scenes, this subscribes to that emitter
       
        customEmitter.on('activeSceneChanged', () => {
          console.log(`event emitter caught in itemdrag, now in zone`);
      });

        customEmitter.on('activeSceneChanged', (i) => {
          console.log(`event emitter caught in itemdrag, now in zone ${i}`);
      });
    });
  }


  itemDragStart(itemIcon, scene) {

    itemIcon.on('dragstart', function (pointer, dragX, dragY) {
      console.log('dragStart');
      this.setAlpha(0.5);
      const zoneContainers = scene.inventoryContainer.itemZoneContainers;
      zoneContainers.forEach(zone => {
       // console.log(zone);
      });

/*
      scene.inventoryContainer.itemZoneContainers.forEach(zone => {
        console.log(scene.test);
        zone.setDepth(200);
        zone.bringToTop();
      });
     

      scene.inventoryContainer.itemSlotContainers.forEach(itemSlotContainer => {
        const containers = itemSlotContainer.parentContainer.list.filter(obj => obj instanceof Phaser.GameObjects.Container);
       console.log('dragteststartbefore' + containers[0]);
        itemSlotContainer.parentContainer.swap(containers[0], containers[1]);
        console.log('dragstarttestorder' + containers[0].list);
      });

 */
      /*
      scene.inventoryContainer.itemZones.forEach(zone => {
        console.log(scene.test);
        zone.setDepth(101); 
      });
      */
      /*
            scene.inventoryContainer.sprites.forEach(sprite => {
              if (sprite === itemIcon) {
                console.log(`this is the current sprite`);
              }
              else {
              console.log(`this is not the current sprite`);
              sprite.disableInteractive();
              }
            });
      
            itemIcon.setInteractive({ draggable: true });
            scene.inventory.itemDrag(itemIcon, scene);
       */
    });


  }

  itemDragEnd(itemIcon, scene) {

    itemIcon.on('dragend', function (pointer, dragX, dragY) {
      console.log('dragEnd');
      this.setAlpha(1);
     /*
      scene.inventoryContainer.itemZoneContainers.forEach(zone => {
        zone.setDepth(200);
        zone.bringToTop();
        console.log(zone);
      });

      
      scene.inventoryContainer.itemSlotContainers.forEach(itemSlotContainer => {
        const containers = itemSlotContainer.parentContainer.list.filter(obj => obj instanceof Phaser.GameObjects.Container);
       //console.log('dragteststartbefore' + containers[0]);
        itemSlotContainer.parentContainer.swap(containers[0], containers[1]);
       // console.log('dragstarttestorder' + containers[0].list);
      });

      scene.inventoryContainer.itemZoneContainers.forEach((zone) => {
         
        if (Phaser.Geom.Intersects.RectangleToRectangle(zone.getBounds(), itemIcon.getBounds())) {
            // DragObject dropped over the current zone
            console.log('DragObject dropped over zone:', zone);
            // You can perform any actions here, such as handling the drop or triggering events
        }
    });
*/
      /*
      scene.inventoryContainer.sprites.forEach(sprite => {
        if (sprite === itemIcon) {
          console.log(`this sprite should already be interactive`);
        }
        else {
        console.log(`this sprite needs to be made interactive again`);
        itemIcon.setInteractive({ draggable: true });
        scene.inventory.itemDrag(itemIcon, scene);
        }
      });
      */

      // scene.time.delayedCall(500, () => delayDisable(scene));


      /*
      scene.inventoryContainer.itemZones.forEach(zone => {
        console.log('dsiabling zone');
        zone.setDepth(99); 
       // zone.disableInteractive();
      });
      */

    });
  }






  /*
  addItemToContainer(scene, item) {
 
     //const iconContainers = scene.inventoryContainer.itemIconContainers;
     const iconContainers = scene.inventoryContainer.itemZones;
     const items = scene.inventory.items;
 
     if (scene.inventory.items.includes(item)) {
       console.log('this item is already in inventory. now adding to container, is it stackable?');
     } else {
       console.log('this item aint in your inventory');
     }
 
     for (let i = 0; i < iconContainers.length; i++) {
 
       if (iconContainers[i].isEmpty === false) {
         console.log('this itemIconContainer is filled, trying next one') //can delete these 3 lines after testing
       }
 
       if (iconContainers[i].isEmpty === true) { //check if slot is empty
 
         const itemIcon = scene.add.sprite(0, 0, item.icon); //add sprite
         iconContainers[i].add(itemIcon); //add the icon as child of first available iconContainer
         //iconContainers[i].itemIcon = itemIcon;
         itemIcon.setScale(.7);
         itemIcon.setInteractive({ draggable: true });
         // itemIcon.setOrigin(.5, .5);
         scene.input.setDraggable(itemIcon);
         scene.inventoryContainer.items.push(itemIcon); //add item to inventorycontainer.items vs inventory.items
         iconContainers[i].dropZone.isEmpty = false; //change slot to not empty
         this.setDragEvents(itemIcon, scene);
         return;
 
       } else {
         console.log('sorry spots taken. your inventory is full.');
       }
     }
   }
 */


  /*
itemDragStart(itemIcon, scene) {

 itemIcon.on('dragstart', function (pointer, dragX, dragY) {
   console.log('dragStart');
   this.setAlpha(0.5);
  // this.setDepth(1e9);
 //  this.setOrigin(.5, .5);
   const newRelativePos = scene.inventory.getRelativePos(itemIcon, scene.inventoryContainer);
   console.log(newRelativePos);

   const relativePointerX = pointer.x - scene.inventoryContainer.x;
   const relativePointerY = pointer.y - scene.inventoryContainer.y;
   const offsetX = pointer.x - itemIcon.x;
   const offsetY = pointer.y - itemIcon.y;
   // Save the offset for later use
//console.log(`offsetX: ${offsetX}  offsetY: ${offsetY}`);
//console.log(`relative pointer start pos: X: ${relativePointerX}  Y: ${relativePointerY}`);
   // Save the offset for later use
   itemIcon.offsetX = offsetX;
   itemIcon.offsetY = offsetY;
});

}



itemDragEnd(itemIcon, scene) {

 itemIcon.on('dragend', function (pointer, dragX, dragY) {
   console.log('dragEnd');
   this.setAlpha(1);
   //this.setDepth(1e9);
 //  this.setOrigin(.5, .5);

  // this.x = dragX;
  // this.y = dragY;
console.log('drag x: ' + dragX + ' y: ' + dragY)
   //console.log('pointer pos before adjust' + pointer.x, pointer.y);
   //const newPointer = scene.inventory.getRelativePos(pointer, scene);
   //console.log(newPointer);
   const newRelativePos = scene.inventory.getRelativePos(itemIcon, scene.inventoryContainer);
   console.log(`before drag adjustment:x: ${newRelativePos.x}, y: ${newRelativePos.y} `);
   newRelativePos.x += dragX;
   newRelativePos.y += Math.abs(dragY);
   console.log(`after drag adjustment:x: ${newRelativePos.x}, y: ${newRelativePos.y} `);
   console.log(`after drag adjustment +32:x: ${Math.abs(newRelativePos.x) + 32}, y: ${newRelativePos.y + 32} `);
   const dropZonesList = scene.inventoryContainer.dropZones;
   let dropZone = 0;

   for (let i = 0; i < dropZonesList.length; i++) {
     const x = Math.abs(newRelativePos.x) + 32;
     const y = Math.abs(newRelativePos.y) + 32;
     const zone = dropZonesList[i];
     if (x >= zone.x && x < zone.x + zone.width && y >= zone.y && y < zone.y + zone.height) {
       console.log('THIS IS THE WHAT THE INDEX OF ZONE SHOULD BE ' + i);  
       dropZone = i;
      // return i; // Return the index of the zone //comment out so doesnt return early?
     } else {
      // console.log('ZONE INDEX NOT FOUND FOR, x: ' +  dropZonesList[i].x + 'y :' + dropZonesList[i].y);
     }
   }

   console.log(`TITI IS BEAUTIFUL and dropzone# is: ${dropZone}`)
  
   // console.log(`pointer before: x: ${pointer.x}, y: ${pointer.y}`);
  // console.log(`offsetx: ${itemIcon.offsetX}, offsety: ${itemIcon.offsetY}`);
  // console.log(`pointer after: x: ${pointer.x - itemIcon.offsetX}, y: ${pointer.y - itemIcon.offsetY}`);
 
  itemIcon.parentContainer.parentContainer.remove(itemIcon.parentContainer);

  scene.inventoryContainer.itemIconContainers[6].add(itemIcon);

 });

}



itemDrag(itemIcon, scene) {

 itemIcon.on('drag', function (pointer, dragX, dragY) {
   console.log('drag');
   this.setAlpha(.5);
  // this.setDepth(1e9);
  // this.setOrigin(.5, .5);
   //this.x = pointer.x;
   //this.y = pointer.y;
   this.x = dragX;
   this.y = dragY;
   //pointer.x = this.x;
  // pointer.y = this.y;

  // Update the icon's position to match the pointer position with offset
  //itemIcon.x = pointer.x - offsetX;
  //itemIcon.y = pointer.y - offsetY;
  
 });
 
}

 */

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

  /*
 initializeInventoryItems(scene) {
   const itemSlots = scene.inventoryContainer.itemSlotContainers;

   const items = scene.inventory.items;

   items.push(null);

   const itemIconContainers = [];
   console.log(items.length);

   scene.inventoryContainer.dropZones = []

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

     // console.log(itemIconContainer);
     // console.log(itemIconContainer.parentContainer)
     // console.log(itemSlotContainer);

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
         const dropZoneArrayLength = dropZonesList.length; 
        // console.log(dropZoneArrayLength);
       // const startZone = scene.inventory.findZone(newRelativeStartPos, dropZonesList);
       
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
        // console.log('asdfasdfas' + scene.inventoryContainer.dropZones);
        // console.log(`ideally the zone its starting from: ${startZone}`);

         this.setAlpha(0.5);
         this.setDepth(1e9);
         console.log(itemIcon.parentContainer);
         console.log(itemIcon.parentContainer.parentContainer);
        // itemIcon.parentContainer.parentContainer.remove(itemIcon.parentContainer);
         //scene.inventoryContainer.itemSlotContainers[9].add(itemIcon.parentContainer);
         
         //itemIcon.parentContainer.parentContainer.remove(itemIcon.parentContainer);
        // scene.inventoryContainer.itemSlotContainers[9].add(itemIcon.parentContainer);

         itemIcon.parentContainer.parentContainer.remove(itemIcon.parentContainer);
        // scene.inventoryContainer.itemSlotContainers[9].add(itemIcon.parentContainer);
         //itemIcon.parentContainer.setParent(scene.inventoryContainer.itemSlotContainers[6])
         //itemIcon.parentContainer.remove(itemIcon);
          scene.inventoryContainer.itemSlotContainers.ItemIconContainer6.add(itemIcon);
         console.log(itemIcon);
       
         console.log(`this is the inventoryContainer.dropZones array: ${scene.inventoryContainer.dropZones}`);

       });


       itemIcon.on('dragend', function (pointer, dragX, dragY, dropped) {
         console.log(`attempting to start dragend`);
         const newRelativeEndPos = scene.inventory.getRelativePos(itemIcon, scene.inventoryContainer);
         this.setAlpha(1); // Reset alpha
         // Add logic for drag end (optional)
         this.setDepth(1e9);
         console.log(`x and y of end drag: x: ${itemIcon.x} and y: ${itemIcon.y}`);
         console.log(`x and y of end drag: x: ${newRelativeEndPos.x} and y ${newRelativeEndPos.y}`);
        // const endZone = scene.inventory.findZone(newRelativeEndPos, dropZonesList);
      //   console.log(`ideally the zone its dragged to ${endZone}`);
      for (let i = 0; i < dropZonesList.length; i++) {
       const x = Math.abs(newRelativeEndPos.x);
       const y = Math.abs(newRelativeEndPos.y);
       console.log(`x and y of end drag: x: ${itemIcon.x} and y: ${itemIcon.y}`);
       console.log(`x and y of end drag: x: ${x} and y ${y}`);
      
       const zone = dropZonesList[i];
       if (x >= zone.x && x < zone.x + zone.width && y >= zone.y && y < zone.y + zone.height) {
         console.log('THIS IS THE WHAT THE *END* INDEX OF ZONE SHOULD BE ' + i);  
         return i; // Return the index of the zone
       } else {
         console.log('ZONE INDEX NOT FOUND FOR, x: ' +  dropZonesList[i].x + 'y :' + dropZonesList[i].y);
       }
   }


  // scene.inventoryContainer.itemSlotContainers[6].add(itemIcon.parentContainer);

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
     
     else {
console.log('no item yet at ', index, itemSlotContainer);

//item.icon = 'emptyItemsSlot';
//item.icon = '';
const itemIcon = scene.add.sprite(0, 0); // Create item icon sprite
itemIcon.setScale(.7);
itemIcon.setInteractive({ draggable: true });
scene.input.setDraggable(itemIcon);

// Add drag event listeners
itemIcon.on('dragstart', function (pointer, dragX, dragY) {

const newRelativeStartPos = scene.inventory.getRelativePos(itemIcon, scene.inventoryContainer);
// console.log(`x and y of start drag: x: ${itemIcon.x} and y: ${itemIcon.y}`);
 
console.log(`x and y of start drag: x: ${newRelativeStartPos.x} and y ${newRelativeStartPos.y}`);
 const dropZoneArrayLength = dropZonesList.length; 
// console.log(dropZoneArrayLength);
// const startZone = scene.inventory.findZone(newRelativeStartPos, dropZonesList);

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
// console.log('asdfasdfas' + scene.inventoryContainer.dropZones);
// console.log(`ideally the zone its starting from: ${startZone}`);

 this.setAlpha(0.5);
 this.setDepth(1e9);
 console.log(itemIcon.parentContainer);
 console.log(itemIcon.parentContainer.parentContainer);
// itemIcon.parentContainer.parentContainer.remove(itemIcon.parentContainer);
 //scene.inventoryContainer.itemSlotContainers[9].add(itemIcon.parentContainer);
 
 //itemIcon.parentContainer.parentContainer.remove(itemIcon.parentContainer);
// scene.inventoryContainer.itemSlotContainers[9].add(itemIcon.parentContainer);

 itemIcon.parentContainer.parentContainer.remove(itemIcon.parentContainer);
// scene.inventoryContainer.itemSlotContainers[9].add(itemIcon.parentContainer);
 //itemIcon.parentContainer.setParent(scene.inventoryContainer.itemSlotContainers[6])
 //itemIcon.parentContainer.remove(itemIcon);
  scene.inventoryContainer.itemSlotContainers.ItemIconContainer6.add(itemIcon);
 console.log(itemIcon);

 console.log(`this is the inventoryContainer.dropZones array: ${scene.inventoryContainer.dropZones}`);

});


itemIcon.on('dragend', function (pointer, dragX, dragY, dropped) {
 console.log(`attempting to start dragend`);
 const newRelativeEndPos = scene.inventory.getRelativePos(itemIcon, scene.inventoryContainer);
 this.setAlpha(1); // Reset alpha
 // Add logic for drag end (optional)
 this.setDepth(1e9);
 console.log(`x and y of end drag: x: ${itemIcon.x} and y: ${itemIcon.y}`);
 console.log(`x and y of end drag: x: ${newRelativeEndPos.x} and y ${newRelativeEndPos.y}`);
// const endZone = scene.inventory.findZone(newRelativeEndPos, dropZonesList);
//   console.log(`ideally the zone its dragged to ${endZone}`);
for (let i = 0; i < dropZonesList.length; i++) {
const x = Math.abs(newRelativeEndPos.x);
const y = Math.abs(newRelativeEndPos.y);
console.log(`x and y of end drag: x: ${itemIcon.x} and y: ${itemIcon.y}`);
console.log(`x and y of end drag: x: ${x} and y ${y}`);

const zone = dropZonesList[i];
if (x >= zone.x && x < zone.x + zone.width && y >= zone.y && y < zone.y + zone.height) {
 console.log('THIS IS THE WHAT THE *END* INDEX OF ZONE SHOULD BE ' + i);  
 return i; // Return the index of the zone
} else {
 console.log('ZONE INDEX NOT FOUND FOR, x: ' +  dropZonesList[i].x + 'y :' + dropZonesList[i].y);
}
}


// scene.inventoryContainer.itemSlotContainers[6].add(itemIcon.parentContainer);

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







     }
   });

const dropZonesList = scene.inventoryContainer.dropZones;
console.log(dropZonesList);

// Enable input events for each drop zone
dropZonesList.forEach(dropZone => {
 const { x, y, width, height } = dropZone;
 //const graphics = this.add.graphics();
 //graphics.fillStyle(0x00ff00, 0.5);
// graphics.fillRect(x, y, width, height);

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

*/

}

function delayDisable(scene) {



  scene.inventoryContainer.itemZones.forEach(zone => {
    console.log('dsiabling zone');
    zone.setDepth(99);
    zone.disableInteractive();
  });

}