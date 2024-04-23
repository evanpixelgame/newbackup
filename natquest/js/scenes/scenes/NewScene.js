import BaseScene from '../BaseScene.js';
import { sensorHandler } from '../collisionHandlers/newSceneCollisionHandler.js';

 export default class NewScene extends BaseScene {
  constructor() {
   super('NewScene');
  }

  init(data) {
    // Initialize scene properties from the data passed from the previous scene
    super.init();
    this.mapKey = 'insidemap';
   // this.player = data.player;
    this.velocityChange = 2;
    this.startPosX = 970;
    this.startPosY = 665;
    this.playerPosX = 970;
     this.playerPosY = 665;
    this.cameraZoomLevel = 1;
    console.log('Player received in NewScene:', this.player);
  }

  preload() {
  }

  create() {
   super.create();
   this.sensorHandling = sensorHandler(this, this.map, this.player);
       console.log('this.scene.manager from NewScene Scene: ' + this.scene.manager);
    console.log('this.scene.manager.scenes from NewScene Scene: ' + this.scene.manager.scenes);
     console.log('this.scene.manager.scenes.scene from Overlay Scene: ' + this.scene.manager.scenes.scene);
  }

  update(time, delta) {
   super.update(time, delta);
    // Update logic for the scene, if necessary
  }
}
