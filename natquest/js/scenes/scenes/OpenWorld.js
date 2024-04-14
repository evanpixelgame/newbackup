//STILL TO DO: add resize handler to gameUI and then import and create gameUI 
//(make sure to return gameUI or the array needed so that can hide visibility of it as needed)
//once resize handler is removed from start menu and put in gameUI, startMenu scene can be removed safely
//then can just switch removal of prior scenes to the event listener that starts basescene/openworld

import { PlayerSprite } from '../PlayerSprite.js';
import { GameUI } from '../GameUI.js';
import { sensorMapSet, createCollisionObjects } from '../collisionHandlers/mapSetter.js';
import { sensorHandler } from '../collisionHandlers/openWorldCollisionHandler.js';
import { createMap, createMapBoundary, createCameraConstraints, createKeyboardAssignments, createMobileControls, updatePlayerMovement, createPlayerAnimations } from '../baseSceneFunctions.js';

export default class OpenWorld extends Phaser.Scene {
  constructor() {
    super({ key: 'OpenWorld' });

    this.engine = null;
    this.world = null;
    this.map = null;
    this.mapKey = null;
    this.player = null;
    this.startPosX = null;
    this.startPosY = null;
    this.velocityChange = null;
  }

  init(data) {
    this.openWorldScene = data.OpenWorld;
    this.mapKey = data.mapKey || 'map';
    this.player = data.player;
    this.velocityChange = data.velocityChange || 2;
    this.startPosX = data.startPosX || 495;
    this.startPosY = data.startPosY || 325;
  }

  create() {
    // Create Matter.js engine
    this.matterEngine = Phaser.Physics.Matter.Matter.World;
    this.engine = this.matter.world;
    this.world = this.matterEngine.create({
      // your Matter.js world options here
    });

    this.scene.add('./GameUI.js', GameUI);
    this.scene.launch('GameUI', { gameScene: this });

    this.map = createMap(this, this.mapKey);

    this.player = new PlayerSprite(this, this.startPosX, this.startPosY, 'player'); // Create the player object, just took away this.world as 2nd argument

    createMapBoundary(this, this.map);

    this.collisionObjects = createCollisionObjects(this, this.map);
    this.sensorMapping = sensorMapSet(this, this.map, this.sensorID);
    this.sensorHandling = sensorHandler(this, this.map, this.player);

     createCameraConstraints(this, this.map, this.player);

    //DONT DELETE: once mobilecontrolsworking as imported function, switch to if statement below for controls 
  //  if (this.sys.game.device.os.android || this.sys.game.device.os.iOS) {
  //   createMobileConrols(this); } else { createKeyboardAssignments(this); }
     
    createKeyboardAssignments(this);
     createPlayerAnimations(this);
          }

  update(time, delta) {
    updatePlayerMovement(this, this.player, this.velocityChange); 
  }
  
}
