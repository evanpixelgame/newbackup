export default function createInventoryIcon(scene) {

    const vw = window.innerWidth;

    scene.inventoryIcon = scene.add.sprite(6.5 * vw / 9, 50, 'inventoryIcon').setInteractive();

    scene.inventoryIcon.on('pointerdown', () => {
        // Handle fullscreen icon click
        if (scene.inventoryContainer.visible) {
            scene.inventoryContainer.visible = false;
           // scene.inventoryContainer.zonesContainer.visible = false;
            scene.inventoryContainer.itemIconsContainer.visible = false;
            
        } else {
            scene.inventoryContainer.visible = true;
          //  scene.inventoryContainer.zonesContainer.visible = true;
            scene.inventoryContainer.itemIconsContainer.visible = true;
        }
    });

    return scene.inventoryIcon;

}