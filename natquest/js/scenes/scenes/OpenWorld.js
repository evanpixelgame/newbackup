//STILL TO DO: add resize handler to gameUI and then import and create gameUI 
//(make sure to return gameUI or the array needed so that can hide visibility of it as needed)
//once resize handler is removed from start menu and put in gameUI, startMenu scene can be removed safely
//then can just switch removal of prior scenes to the event listener that starts basescene/openworld

import { PlayerSprite } from '../PlayerSprite.js';
import { TopIcons } from '../gameUI.js';
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
    this.topIcons = null;
  }

  init(data) {
    this.openWorldScene = data.OpenWorld;
    this.mapKey = data.mapKey || 'map';
    this.player = data.player;
    this.velocityChange = data.velocityChange || 2;
    this.startPosX = data.startPosX || 495;
    this.startPosY = data.startPosY || 325;
    this.topIcons = data.topIcons;
  }

  create() {
    
    // Create Matter.js engine
    this.matterEngine = Phaser.Physics.Matter.Matter.World;
    this.engine = this.matter.world;
    this.world = this.matterEngine.create({
      // your Matter.js world options here
    });

    //Creates the scene's map from Tiled JSON data
    this.map = createMap(this, this.mapKey);

    //Creates a new instance of the PlayerSprite class to add a matter.js player body object to the scene
    this.player = new PlayerSprite(this, this.startPosX, this.startPosY, 'player');

    //Creates a boundary around outer border of map so player cannot move outside the visible map
    this.worldBounds = createMapBoundary(this, this.map, this.world);

    //Takes the scene's map and creates the barriers where the player cannot pass through from the map's Collision Layer
    this.collisionObjects = createCollisionObjects(this, this.map);
    
    //Takes the scene's map and creates sensor objects based on the map's Sensor Layer
    this.sensorMapping = sensorMapSet(this, this.map, this.sensorID);
    
    //Creates switch cases with event listeners for what should happen when sensors ojjects are triggered in this scene/map, each scene may need its own unique sensorHandler
    this.sensorHandling = sensorHandler(this, this.map, this.player);

    //Starting configuration for camera, also makes sure camera follow the player
   // this.cameraConstraints = createCameraConstraints(this, this.map, this.player);
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
    //this.cameras.main.setZoom(2);
    
    //Create mobile or desktop controls for player input, ie. (joystick || keyboard)
    if (this.sys.game.device.os.android || this.sys.game.device.os.iOS) {
    createMobileConrols(this); } else { createKeyboardAssignments(this); }
    
     //creates the animations associated with the user input, ie. 'a' key triggers 'walk-left' animation
     createPlayerAnimations(this);
const vw = window.innerWidth;

const icons = {
  infoIcon: this.add.sprite(1 * vw / 11, 50, 'infoIcon').setInteractive().setScale(0.18).setOrigin(0, 0).setScrollFactor(0, 0),
  settingsIcon: this.add.sprite(6.5 * vw / 9, 50, 'settingsIcon').setInteractive().setScale(0.11).setOrigin(0, 0).setScrollFactor(0, 0),
  zoomInIcon: this.add.sprite(7 * vw / 9, 50, 'zoomInIcon').setInteractive().setScale(0.2).setOrigin(0.5, 0).setScrollFactor(0, 0),
  zoomOutIcon: this.add.sprite(7.5 * vw / 9, 50, 'zoomOutIcon').setInteractive().setScale(0.2).setOrigin(0.5, 0).setScrollFactor(0, 0),
  fullscreenIcon: this.add.sprite(8.1 * vw / 9, 50, 'fullscreenIcon').setInteractive().setScale(0.12).setOrigin(0.5, 0).setScrollFactor(0, 0)
};

this.icons = icons;

// Instantiate the gameUI class within the uiLayer
this.gameUI = new TopIcons(this, this.game, this.uiLayer, this.icons);
  
  }

  update(time, delta) {
    //Update the position of player based on user input and velocity
    updatePlayerMovement(this, this.player, this.velocityChange); 
  }
  
}
