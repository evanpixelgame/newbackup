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
    this.activeScene = null;
  }

  preload() {

  }

  create() {
//    this.activeScene = 'gottafigureout';

//add a function that determines the active scene and set up event listener so that it updates it when active scene changes
 //   console.log('this.scene.manager from Overlay Scene: ' + this.scene.manager);
  //  console.log('this.scene.manager.scenes from Overlay Scene: ' + this.scene.manager.scenes);

    
    this.scene.manager.scenes.forEach(scene => {
    console.log(scene.scene.key); // Access the key of each scene
    console.log(scene); // Log each scene object
    if (scene.scene.key !== 'OverlayScene') {
    this.activeScene = scene.scene.key;
}
});

    console.log('titi is the prettiest in universe and here is only active under scene: ' + this.activeScene);

this.scene.manager.scenes
    .filter(scene => scene.isActive)
    .forEach(activeScene => {
        console.log(activeScene.key); // Log the key of each active scene
    });

    
    
    
    this.fullscreenIcon = createFullscreenIcon(this); //fullscreen icon, positioned in top right corner of viewport

   // this.zoomIcons = createZoomIcons(this, this.activeScene); // positioned directly to left of fullscreen icon, at about 3/4 viewport 
    
    this.healthBar = createHealthBar(this);

    this.resizer = setupResizeListener(this);

    this.activeScene = this.getActiveScenes();
    console.log('this should make an arry of active scenes: ' + this.activeScene);
     console.log('this should make an arry of active scenes: ' + this.activeScene.key);
    
  }

  
 getActiveScenes() {
  const sceneManager = this.scene.manager;
  const loadedScenes = sceneManager.scenes;

  const activeScenes = loadedScenes.filter(scene => scene.scene.isVisible() && scene.scene.key !== 'OverlayScene');

  return activeScenes[0];
}
  
  update() {

  }
}


