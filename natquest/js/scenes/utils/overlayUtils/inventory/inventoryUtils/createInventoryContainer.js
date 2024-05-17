
const containerWidth = window.innerWidth * 1 / 2;
const containerHeight = window.innerHeight * 1 / 2;
// Define the number of rows and columns for the item slots
const numRows = 2; // Example number of rows
const numCols = 5; // Example number of columns

// Create item slot sprites and add them to the container
const slotWidth = 64; // Example width of each item slot
const slotHeight = 64; // Example height of each item slot
const horizontalSpacing = 0; // Example horizontal spacing between item slots
const verticalSpacing = 0; // Example vertical spacing between item slots


export function createInventoryContainer(scene) {

    // Create a container to hold the item slots
    scene.inventoryContainer = scene.add.container(containerWidth, containerHeight);
    scene.inventoryContainer.visible = false;

    // Create an array to hold references to item slot sprites
    scene.inventoryContainer.itemSlotContainers = [];
    scene.inventoryContainer.containerSprites = [];
    scene.inventoryContainer.sprites = [];
    scene.inventoryContainer.dragStartX = 0;
    scene.inventoryContainer.dragStartY = 0;
    scene.inventoryContainer.dragStartParent;
    scene.inventoryContainer.dragStartTime;
    scene.inventoryContainer.quickClicks = 0;

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


export function createItemSlots(scene) {

    scene.inventoryContainer.itemIconsContainer = scene.add.container(containerWidth, containerHeight);
    scene.inventoryContainer.itemIconsContainer.visible = false;


    // Create an array to hold references to item slot sprites
    scene.inventoryContainer.itemIconContainers = [];

    // Create item slot containers and add them to the container
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {

            const x = col * (slotWidth + horizontalSpacing);
            const y = row * (slotHeight + verticalSpacing);

            const itemIconContainer = scene.add.container(x, y);
            const i = row * numCols + col + 1;

            itemIconContainer.setName(`itemIconContainer${i}`);

            itemIconContainer.isEmpty = true;

            scene.inventoryContainer.itemIconContainers.push(itemIconContainer);

            scene.inventoryContainer.itemIconsContainer.add(itemIconContainer);

          //  itemIconContainer.add(item);
        }
    }
}