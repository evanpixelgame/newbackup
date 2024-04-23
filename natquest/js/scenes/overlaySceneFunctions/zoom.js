  
export function createZoomIcons(scene, activeScene) {
  const vw = window.innerWidth;
  
   const zoomInIcon = scene.add.sprite(7 * vw / 9, 50, 'zoomInIcon').setInteractive().setScale(0.2);
   const zoomOutIcon = scene.add.sprite(7.5 * vw / 9, 50, 'zoomOutIcon').setInteractive().setScale(0.2);

// scene.events.on('activeSceneChanged', scene.updateActiveScene, this);

    scene.events.on('newActiveScene', (newScene) => {
        // Update the activeScene variable
        activeScene = newScene;
        // Perform any other actions based on the scene change
        // For example, update zoom based on the new active scene
    });
  
 zoomInIcon.on('pointerdown', () => {
         if (activeScene.cameras.main.zoom < 3) {
    activeScene.cameras.main.zoom *= 1.1; // Increase zoom by 10%
  } else {
    console.log('Maximum zoom level reached.');
  }
        });

 zoomOutIcon.on('pointerdown', () => {
       if (activeScene.cameras.main.zoom > 1) { // Set a minimum zoom level (0.2 is just an example)
    activeScene.cameras.main.zoom /= 1.1; // Decrease zoom by 10%
  } else {
    console.log('Minimum zoom level reached.');
  }
        });
  
  return 
}
