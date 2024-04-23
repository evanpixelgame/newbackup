import { createFullscreenIcon } from './overlaySceneFunctions/fullscreen.js';
//import { createZoomIcons } from './overlaySceneFunctions/zoom.js';
import { resizeGame, setupResizeListener } from './overlaySceneFunctions/resizer.js';
import { createHealthBar } from './overlaySceneFunctions/healthBar.js';

export default class OverlayScene extends Phaser.Scene {
  constructor() {
    super({ key: 'OverlayScene' })
    
  }

  init(data) {
   // this.player = data.player;
  }

  preload() {

  }

  create() {
//    this.activeScene = 'gottafigureout';

//add a function that determines the active scene and set up event listener so that it updates it when active scene changes
 //   console.log('this.scene.manager from Overlay Scene: ' + this.scene.manager);
  //  console.log('this.scene.manager.scenes from Overlay Scene: ' + this.scene.manager.scenes);

    this.scene.manager.scenes.forEach(scene => {
    console.log(scene.key); // Access the key of each scene
    console.log(scene); // Log each scene object
});

this.scene.manager.scenes
    .filter(scene => scene.isActive)
    .forEach(activeScene => {
        console.log(activeScene.key); // Log the key of each active scene
    });

    
    
    
    this.fullscreenIcon = createFullscreenIcon(this); //fullscreen icon, positioned in top right corner of viewport

   // this.zoomIcons = createZoomIcons(this, this.activeScene); // positioned directly to left of fullscreen icon, at about 3/4 viewport 
    
    this.healthBar = createHealthBar(this);

    this.resizer = setupResizeListener(this);

    this.activeScenes = this.getActiveScenes();
    console.log('this should make an arry of active scenes: ' + this.activeScenes);
    
  }

/*
getActiveScenes() {
  const sceneManager = this.scene.manager;
  const loadedScenes = sceneManager.scenes;
  const activeScenes = [];

  for (const scene of loadedScenes) {
    if (scene.scene.isVisible()) {
      activeScenes.push(scene);
    }
  }

  return activeScenes;
}
*/
  
 getActiveScenes() {
  const sceneManager = this.scene.manager;
  const loadedScenes = sceneManager.scenes;

  const activeScenes = loadedScenes.filter(scene => scene.scene.isVisible() && scene.key !== 'OverlayScene');

  return activeScenes;
}
  
  update() {

  }
}


