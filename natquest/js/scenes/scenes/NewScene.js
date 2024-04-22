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
  console.log(this.map.height, this.map.width);
    console.log(this.map);
 //  this.map.gameObject.setScale(2, 2);
  // this.map.setDisplaySize(2, 2);
  // this.map.height *= 2;
 //  this.map.width *= 2;
   this.player.setScale(2);
  }

  update(time, delta) {
   super.update(time, delta);
    // Update logic for the scene, if necessary
  }
}
