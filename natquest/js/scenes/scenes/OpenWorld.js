//STILL TO DO: add resize handler to gameUI and then import and create gameUI 
//(make sure to return gameUI or the array needed so that can hide visibility of it as needed)
//once resize handler is removed from start menu and put in gameUI, startMenu scene can be removed safely
//then can just switch removal of prior scenes to the event listener that starts basescene/openworld

import { PlayerSprite } from '../PlayerSprite.js';
import { GameUI } from '../GameUI.js';
import { MobileControls } from '../MobileControls.js';
import { sensorMapSet, createCollisionObjects } from '../collisionHandlers/mapSetter.js';
import { sensorHandler } from '../collisionHandlers/openWorldCollisionHandler.js';
import { createMap, createWorldBoundary, createCameraConstraints, createKeyboardAssignments, updatePlayerMovement, createPlayerAnimations } from '../baseSceneFunctions.js';

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

  preload() {
  }

  create() {
    // Create Matter.js engine
    this.matterEngine = Phaser.Physics.Matter.Matter.World;
    this.engine = this.matter.world;
    this.world = this.matterEngine.create({
      // your Matter.js world options here
    });

//handle removal of the scenes in the transition handlers/event listeners
     this.scene.remove('Preloader');
    // this.scene.remove('StartMenu');  // currently have startMenu still active so the resize handler in it can be active.
    //switch the resize handling to a scene that gets launched from OpenWorld so startmenu can be removed but resize will still have access to canvas
    //then the resize handler can be launched from openworld with the other things
     this.scene.remove('Settings');
     this.scene.remove('NameSelect');
     this.scene.remove('CharSelect');
     this.scene.remove('WelcomePlayer');
    
    if (this.sys.game.device.os.android || this.sys.game.device.os.iOS) {
      this.scene.add('./MobileControls.js', MobileControls);
      this.scene.launch('MobileControls', { player: this.player, speed: this.speed });
    }
    this.scene.add('./GameUI.js', GameUI);
    this.scene.launch('GameUI', { gameScene: this });

    this.map = createMap(this, this.mapKey);

    this.player = new PlayerSprite(this, this.startPosX, this.startPosY, 'player'); // Create the player object, just took away this.world as 2nd argument

    createWorldBoundary(this, this.map);

    this.collisionObjects = createCollisionObjects(this, this.map);
    this.sensorMapping = sensorMapSet(this, this.map, this.sensorID);
    this.sensorHandling = sensorHandler(this, this.map, this.player);

     createCameraConstraints(this, this.map, this.player);
     createKeyboardAssignments(this);
     createPlayerAnimations(this);
          }

  update(time, delta) {
    updatePlayerMovement(this, this.player, this.velocityChange); 
  }
  
}
