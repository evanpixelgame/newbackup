import BaseScene from '../BaseScene.js';
//import { sensorHandler } from '../collisionHandlers/newSceneCollisionHandler.js';

 export default class InitScene extends BaseScene {
  constructor() {
   super('InitScene');
  }

  init(data) {
    // Initialize scene properties from the data passed from the previous scene
    super.init();
    this.mapKey = 'map';
   // this.player = data.player;
    this.velocityChange = 2;
    this.startPosX = 970;
    this.startPosY = 665;
    this.playerPosX = 970;
     this.playerPosY = 665;
    this.cameraZoomLevel = 2;
    console.log('Player received in NewScene:', this.player);
  }

  preload() {
  }

  create() {
   super.create();
   this.sensorHandling = sensorHandler(this, this.map, this.player);
  }

  update(time, delta) {
   super.update(time, delta);
    // Update logic for the scene, if necessary
  }
}
