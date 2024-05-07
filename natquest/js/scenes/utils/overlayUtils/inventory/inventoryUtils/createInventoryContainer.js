
export function createInventoryContainer(scene) {

    const containerWidth = window.innerWidth * 1 / 2;
    const containerHeight = window.innerHeight * 1 / 2;
    // Create a container to hold the item slots
    scene.inventoryContainer = scene.add.container(containerWidth, containerHeight);
    scene.inventoryContainer.visible = false;

    // Define the number of rows and columns for the item slots
    const numRows = 2; // Example number of rows
    const numCols = 5; // Example number of columns

    // Create item slot sprites and add them to the container
    const slotWidth = 64; // Example width of each item slot
    const slotHeight = 64; // Example height of each item slot
    const horizontalSpacing = 0; // Example horizontal spacing between item slots
    const verticalSpacing = 0; // Example vertical spacing between item slots


    // Create an array to hold references to item slot sprites
    scene.inventoryContainer.itemSlotContainers = [];

    // Create item slot containers and add them to the container
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const x = col * (slotWidth + horizontalSpacing);
            const y = row * (slotHeight + verticalSpacing);
            const itemSlotContainer = scene.add.container(x, y); // Create container for item slot

            const emptySlotSprite = scene.add.sprite(0, 0, 'emptyItemSlot'); // Example sprite for empty slot
            itemSlotContainer.add(emptySlotSprite); // Add empty slot sprite to container
            scene.inventoryContainer.add(itemSlotContainer); // Add item slot container to inventory container

            // Assign an ID to the item slot container
            const containerId = row * numCols + col + 1; // IDs start from 1
            itemSlotContainer.setName(`SlotContainer${containerId}`);

            // push to scene.inventoryContainer.
            scene.inventoryContainer.itemSlotContainers.push(itemSlotContainer);

        }
    }
}



export function createInventoryZones(scene) {

    // Create an array to hold references to item slot sprites
    scene.inventoryContainer.itemZoneContainers = [];

    // Create item slot containers and add them to the container
    for (let i = 0; i < scene.inventoryContainer.itemSlotContainers.length; i++) {
        const itemZoneContainer = scene.add.container(0, 0);
        const itemZone = scene.add.zone(0, 0, 64, 64);

        itemZone.setInteractive();

        itemZone.on('pointerover', function (pointer, gameObject) {
            // Highlight the drop zone or provide feedback
            console.log('titi esta muy bonita :D ' + i );
        });


        itemZone.on('pointerdown', function (pointer, gameObject) {
            // Highlight the drop zone or provide feedback
            console.log('pointerdown');
        });


        itemZone.on('pointerup', function (pointer, gameObject) {
            // Highlight the drop zone or provide feedback
            console.log('pointerup (click release)');
        });

        // push to scene.inventoryContainer.
        scene.inventoryContainer.itemZoneContainers.push(itemZoneContainer);

        itemZoneContainer.setName(`ZoneContainer${i}`);
        itemZoneContainer.add(itemZone);

        scene.inventoryContainer.itemSlotContainers[i].add(itemZoneContainer);

    }
}


export function createItemSlots(scene) {

    // Create an array to hold references to item slot sprites
    scene.inventoryContainer.itemSlots = [];

    // Create item slot containers and add them to the container
    for (let i = 0; i < scene.inventoryContainer.itemZoneContainers.length; i++) {
      
        const itemSlot = scene.add.container(0, 0);

        itemSlot.isEmpty = true;

        itemSlot.setName(`ItemSlot${i}`);
      
        scene.inventoryContainer.itemZoneContainers[i].add(itemSlot);
        scene.inventoryContainer.itemSlots.push(itemSlot);
    
        console.log(itemSlot);

    }
}

/*
const itemSlot = scene.add.container(0, 0); // Create container for item icon
itemSlot.isEmpty = true;
itemSlotContainer.add(itemSlot); // Add item slot container to inventory container
itemSlots.push(itemSlot);
console.log(itemSlot);


export function createInventoryZones(scene) {

    const containerWidth = window.innerWidth * 1 / 2;
    const containerHeight = window.innerHeight * 1 / 2;
    // Create a container to hold the item slots
    scene.inventoryZoneContainer = scene.add.container(containerWidth, containerHeight);
    // scene.inventoryZoneContainer.visible = false;

    // Define the number of rows and columns for the item slots
    const numRows = 2; // Example number of rows
    const numCols = 5; // Example number of columns

    // Create item slot sprites and add them to the container
    const slotWidth = 64; // Example width of each item slot
    const slotHeight = 64; // Example height of each item slot
    const horizontalSpacing = 0; // Example horizontal spacing between item slots
    const verticalSpacing = 0; // Example vertical spacing between item slots


    // Create an array to hold references to item slot sprites
    scene.inventoryContainer.itemZones = [];

    // Create item slot containers and add them to the container
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const x = col * (slotWidth + horizontalSpacing);
            const y = row * (slotHeight + verticalSpacing);
            const itemZoneContainer = scene.add.zone(x, y); // Create container for item slot

            const emptySlotSprite = scene.add.sprite(0, 0, 'emptyItemSlot'); // Example sprite for empty slot
            itemZoneContainer.add(emptySlotSprite); // Add empty slot sprite to container
            scene.inventoryContainer.add(itemZoneContainer); // Add item slot container to inventory container

            // Assign an ID to the item slot container
            const containerId = row * numCols + col + 1; // IDs start from 1
            itemZoneContainer.setName(`SlotContainer${containerId}`);

            // push to scene.inventoryContainer.
            scene.inventoryContainer.itemZones.push(itemZone);

        }
    }
}
*/

/*

export function createInventoryZones(scene) {

    const containerWidth = window.innerWidth * 1 / 2;
    const containerHeight = window.innerHeight * 1 / 2;
    // Create a container to hold the item slots
    scene.inventoryZoneContainer = scene.add.container(containerWidth, containerHeight);
   // scene.inventoryZoneContainer.visible = false;

    // Define the number of rows and columns for the item slots
    const numRows = 2; // Example number of rows
    const numCols = 5; // Example number of columns

    // Create item slot sprites and add them to the container
    const slotWidth = 64; // Example width of each item slot
    const slotHeight = 64; // Example height of each item slot
    const horizontalSpacing = 0; // Example horizontal spacing between item slots
    const verticalSpacing = 0; // Example vertical spacing between item slots


    // Create an array to hold references to item slot sprites
    scene.inventoryContainer.itemZones = [];

    // Create item slot containers and add them to the container
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const x = col * (slotWidth + horizontalSpacing);
            const y = row * (slotHeight + verticalSpacing);
            const itemZoneContainer = scene.add.zone(x, y); // Create container for item slot

            const emptySlotSprite = scene.add.sprite(0, 0, 'emptyItemSlot'); // Example sprite for empty slot
            itemZoneContainer.add(emptySlotSprite); // Add empty slot sprite to container
            scene.inventoryContainer.add(itemZoneContainer); // Add item slot container to inventory container

            // Assign an ID to the item slot container
            const containerId = row * numCols + col + 1; // IDs start from 1
            itemZoneContainer.setName(`SlotContainer${containerId}`);

            // push to scene.inventoryContainer.
            scene.inventoryContainer.itemZones.push(itemZone);

        }
    }
}









const itemZone = scene.add.zone(0, 0, 64, 64);
itemZone.setInteractive();
itemZone.on('pointerover', function (pointer, gameObject) {
    // Highlight the drop zone or provide feedback
    //  console.log('titi esta muy bonita :D ' + containerId);
    //  itemZone.disableInteractive();

});


itemZone.on('pointerdown', function (pointer, gameObject) {
    // Highlight the drop zone or provide feedback
    console.log('pointerdown' + containerId);
    console.log('pointerdown and itemzone.parentcontainer ' + itemZone.parentContainer);
    const containers = itemZone.parentContainer.list.filter(obj => obj instanceof Phaser.GameObjects.Container);
    console.log('pointerdown containers new log' + containers[0]);
    console.log(containers[0].list[0]);
    //  containers[0].list[0].x = pointer.x;
    // containers[0].list[0].y = pointer.y;
    //  itemZone.disableInteractive();
    gameObject = containers[0].list[0];
    console.log(gameObject);
    //scene.inventory.itemDrag(gameObject, scene);
    // itemZone.disableInteractive();

});

itemZone.on('pointerup', function (pointer, gameObject) {
    // Highlight the drop zone or provide feedback
    console.log('pointerup (click release)' + containerId);
    console.log('pointerup (click release) and itemzone.parentcontainer ' + itemZone.parentContainer);
});

itemZone.setName(`ItemZone${containerId}`);
itemZone.setDepth(5);
scene.inventoryContainer.itemZones.push(itemZone);
scene.inventoryContainer.sprites = [];
itemSlotContainer.add(itemZone);
//itemSlot.add(itemZone);
console.log(itemZone);




const itemSlot = scene.add.container(0, 0); // Create container for item icon
itemSlot.isEmpty = true;
itemSlotContainer.add(itemSlot); // Add item slot container to inventory container
itemSlots.push(itemSlot);
console.log(itemSlot);
            

        }
    }

}

*/
/*

export function createInventoryContainer(scene) {

    const containerWidth = window.innerWidth * 1 / 2;
    const containerHeight = window.innerHeight * 1 / 2;
    // Create a container to hold the item slots
    scene.inventoryContainer = scene.add.container(containerWidth, containerHeight);

    // Define the number of rows and columns for the item slots
    const numRows = 2; // Example number of rows
    const numCols = 5; // Example number of columns

    // Create item slot sprites and add them to the container
    const slotWidth = 64; // Example width of each item slot
    const slotHeight = 64; // Example height of each item slot
    const horizontalSpacing = 0; // Example horizontal spacing between item slots
    const verticalSpacing = 0; // Example vertical spacing between item slots


    // Create an array to hold references to item slot sprites
    const itemSlots = [];

    const itemSlotContainers = [];

    scene.inventoryContainer.itemZones = [];

    scene.inventoryContainer.itemSlots = itemSlots;
    scene.inventoryContainer.visible = false;

    // Create item slot containers and add them to the container
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const x = col * (slotWidth + horizontalSpacing);
            const y = row * (slotHeight + verticalSpacing);
            const itemSlotContainer = scene.add.container(x, y); // Create container for item slot
           
            const emptySlotSprite = scene.add.sprite(0, 0, 'emptyItemSlot'); // Example sprite for empty slot
            itemSlotContainer.add(emptySlotSprite); // Add empty slot sprite to container
            scene.inventoryContainer.add(itemSlotContainer); // Add item slot container to inventory container



            // Assign an ID to the item slot container
            const containerId = row * numCols + col + 1; // IDs start from 1
            //  const hitArea = emptySlotSprite.getBounds(); // Get child sprite's bounding box

           

            // itemSlotContainer.setInteractive({ hitArea });
            itemSlotContainer.setData('containerId', containerId);
            itemSlotContainer.setName(`SlotContainer${containerId}`);

            itemSlotContainers.push(itemSlotContainer);
 

            const itemZone = scene.add.zone(0, 0, 64, 64);
            itemZone.setInteractive();
            itemZone.on('pointerover', function (pointer, gameObject) {
                // Highlight the drop zone or provide feedback
              //  console.log('titi esta muy bonita :D ' + containerId);
                //  itemZone.disableInteractive();

            });


            itemZone.on('pointerdown', function (pointer, gameObject) {
                // Highlight the drop zone or provide feedback
                console.log('pointerdown' + containerId);
                console.log('pointerdown and itemzone.parentcontainer ' + itemZone.parentContainer);
                const containers = itemZone.parentContainer.list.filter(obj => obj instanceof Phaser.GameObjects.Container);
                console.log('pointerdown containers new log' + containers[0]);
                console.log(containers[0].list[0]);
              //  containers[0].list[0].x = pointer.x;
               // containers[0].list[0].y = pointer.y;
             //  itemZone.disableInteractive();
              gameObject = containers[0].list[0];
              console.log(gameObject);
              //scene.inventory.itemDrag(gameObject, scene);
              // itemZone.disableInteractive();
      
            });

            itemZone.on('pointerup', function (pointer, gameObject) {
                // Highlight the drop zone or provide feedback
                console.log('pointerup (click release)' + containerId);
                console.log('pointerup (click release) and itemzone.parentcontainer ' + itemZone.parentContainer);
            });

            itemZone.setName(`ItemZone${containerId}`);
            itemZone.setDepth(5);
            scene.inventoryContainer.itemZones.push(itemZone);
            scene.inventoryContainer.sprites = [];
            itemSlotContainer.add(itemZone);
            //itemSlot.add(itemZone);
            console.log(itemZone);

           


            const itemSlot = scene.add.container(0, 0); // Create container for item icon
            itemSlot.isEmpty = true;
            itemSlotContainer.add(itemSlot); // Add item slot container to inventory container
            itemSlots.push(itemSlot);
            console.log(itemSlot);
            

        }
    }

    // Store itemSlotContainers array as a property of inventoryContainer for easier access
    scene.inventoryContainer.itemSlotContainers = itemSlotContainers;
    /*
    const zoneTest = scene.add.zone(containerWidth, containerHeight, 64, 64);
    zoneTest.setInteractive( { fillColor: 0xffe000, alpha: 0.3 } );
    zoneTest.on('pointerover', function (pointer, gameObject) {
        // Highlight the drop zone or provide feedback
        console.log('titi esta muy bonita :D')
        console.log(zoneTest);
        console.log(zoneTest.id); 
    });
   

}

*/



export function populateItemSlots(items) {
    items.forEach((item, index) => {
        console.log(`about to try to populate ${item} at index: ${index}`);
        populateItemSlot(index, item.icon); // Assuming the item object has an 'icon' property
    });
}


// Function to populate an item slot with an item icon
export function populateItemSlot(slotIndex, itemIconKey) {
    const itemSlot = itemSlots[slotIndex];
    if (itemSlot) {
        const itemIcon = scene.add.sprite(0, 0, itemIconKey); // Example sprite for item icon
        itemSlot.add(itemIcon);
    }
}

// Function to depopulate an item slot
export function depopulateItemSlot(slotIndex) {
    const itemSlot = itemSlots[slotIndex];
    if (itemSlot) {
        itemSlot.removeAll(true); // Remove all children from the item slot
    }
}


// Example usage:
// populateItemSlot(0, 'itemIcon'); // Populate item slot 0 with an item icon
// depopulateItemSlot(0); // Depopulate item slot 0
