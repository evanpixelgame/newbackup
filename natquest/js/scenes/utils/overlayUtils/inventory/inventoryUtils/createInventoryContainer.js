
export function createInventoryContainer(scene) {
// Create a container to hold the item slots
const inventoryContainer = scene.add.container(window.innerWidth * 3 / 4, window.innerHeight * 3 / 4);

// Define the number of rows and columns for the item slots
const numRows = 2; // Example number of rows
const numCols = 5; // Example number of columns

// Create an array to hold references to item slot sprites
const itemSlots = [];

// Create item slot sprites and add them to the container
const slotWidth = 64; // Example width of each item slot
const slotHeight = 64; // Example height of each item slot
const horizontalSpacing = 10; // Example horizontal spacing between item slots
const verticalSpacing = 10; // Example vertical spacing between item slots
for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
        const x = col * (slotWidth + horizontalSpacing);
        const y = row * (slotHeight + verticalSpacing);
        const itemSlot = scene.add.sprite(x, y, 'emptyItemSlot'); // Example sprite for item slot
        inventoryContainer.add(itemSlot);
        itemSlots.push(itemSlot);
    }
}
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
