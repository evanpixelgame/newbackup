


export function createInventoryContainer(scene) {

    const containerWidth = window.innerWidth * 1 / 2;
    const containerHeight = window.innerHeight * 1 / 2;
    // Create a container to hold the item slots
    scene.inventoryContainer = scene.add.container(containerWidth, containerHeight);

    // Define the number of rows and columns for the item slots
    const numRows = 2; // Example number of rows
    const numCols = 5; // Example number of columns

    // Create an array to hold references to item slot sprites
    const itemSlots = [];

    // Create item slot sprites and add them to the container
    const slotWidth = 64; // Example width of each item slot
    const slotHeight = 64; // Example height of each item slot
    const horizontalSpacing = 0; // Example horizontal spacing between item slots
    const verticalSpacing = 0; // Example vertical spacing between item slots

    scene.inventoryContainer.itemSlots = itemSlots;
    scene.inventoryContainer.visible = false;


    const itemSlotContainers = [];

    // Create item slot containers and add them to the container
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const x = col * (slotWidth + horizontalSpacing);
            const y = row * (slotHeight + verticalSpacing);
            const itemSlotContainer = scene.add.container(x, y); // Create container for item slot
            const emptySlotSprite = scene.add.sprite(0, 0, 'emptyItemSlot'); // Example sprite for empty slot
            itemSlotContainer.add(emptySlotSprite); // Add empty slot sprite to container
            scene.inventoryContainer.add(itemSlotContainer); // Add item slot container to inventory container
            itemSlotContainers.push(itemSlotContainer);



            // Assign an ID to the item slot container
            const containerId = row * numCols + col + 1; // IDs start from 1
            //  const hitArea = emptySlotSprite.getBounds(); // Get child sprite's bounding box

            const zoneTest = scene.add.zone(0, 0, 64, 64);
            zoneTest.setInteractive({ fillColor: 0xffe000, alpha: 0.3 });
            zoneTest.on('pointerover', function (pointer, gameObject) {
                // Highlight the drop zone or provide feedback
                console.log('titi esta muy bonita :D ' + containerId);
                console.log(zoneTest.fillColor);
            });
            itemSlotContainer.add(zoneTest);

            // itemSlotContainer.setInteractive({ hitArea });
            itemSlotContainer.setData('containerId', containerId);
            itemSlotContainer.setName(`SlotContainer${containerId}`);

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
    */

}


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
