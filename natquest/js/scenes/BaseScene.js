import { PlayerSprite } from './PlayerSprite.js';
//import { TopIcons } from './gameUI.js';
import { sensorMapSet, createCollisionObjects } from './collisionHandlers/mapSetter.js';
//import { sensorHandler } from './collisionHandlers/openWorldCollisionHandler.js'; //need to be sure to import each scenes collisionhandler
import { createMap, createMapBoundary, createCameraConstraints, createKeyboardAssignments, createMobileControls, updatePlayerMovement, createPlayerAnimations, createUIIcons } from './baseSceneFunctions.js';

export default class BaseScene extends Phaser.Scene {
  constructor(key) {
    super({ key: key });

    this.engine = null;
    this.world = null;
    this.map = null;
    this.mapKey = null;
    this.player = null;
    this.startPosX = null;
    this.startPosY = null;
    this.velocityChange = null;
    this.cameraZoomLevel = 2;
    this.topIcons = null;
  }

  init(data) {
  /*  in future scenes, can accept arguments for passed data with backup cases if there's info to transfer across scenes
    this.mapKey = data.mapKey || 'map';
    this.velocityChange = data.velocityChange || 2;
    this.playerPosX = data.playerPosX || 495;
    this.playerPosY = data.playerPosY || 325;
    */
    this.mapKey = 'insidemap';
    this.velocityChange = 2;
    this.startPosX = 495;
    this.startPosY = 325;
    this.playerPosX = 495;
    this.playerPosY = 325;
    this.cameraZoomLevel = 1;
  }
  
  create() {
    
    // Create Matter.js engine
    this.matterEngine = Phaser.Physics.Matter.Matter.World;
    this.engine = this.matter.world;
    this.world = this.matterEngine.create({
      // your Matter.js world options here
    });

    this.icons = createUIIcons(this);
         this.healthBar = this.add.rectangle(
    (window.innerWidth / 4),  // X coordinate relative to the viewport
    (window.innerHeight / 4),  // Y coordinate relative to the viewport
    500,  // Width of the object
    100,  // Height of the object
    0xff0000  // Color of the object (red)
);

    this.healthBar.setScrollFactor(0, 0);
    this.healthBar.setDepth(1000);
    this.healthBar.setScale(this.cameraZoomLevel / 2);
    // Set the original position of the health bar
    this.healthBar.originalX = window.innerWidth / 6;
    this.healthBar.originalY = window.innerHeight / 6;
  //  this.healthBar.setScrollFactor(0, 0);
 //   this.world.add(this.healthBar);

    // Set up camera zoom event
 //   this.cameras.main.on('zoom', this.adjustHealthBarPosition); //took away ,this as last argument 


// Create a new camera with width and height equal to the window size
//this.overlayCamera = this.cameras.add(0, 0, window.innerWidth, window.innerHeight);

// Set camera properties
//this.overlayCamera.setBackgroundColor('rgba(0, 0, 0, 0)'); // Set transparent background

// Configure camera position, size, and other settings as needed
//this.overlayCamera.setViewport(0, 0, window.innerWidth, window.innerHeight); // Adjust position and size as needed
    
//    this.icons.setMask(0b010);
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
    
    //Creates switch cases with event listeners for what should happen when sensors ojjects are triggered in this scene/map
    //each scene needs its own unique sensorHandler. possibly more for different types of interactions that are scene specific
   // this.sensorHandling = sensorHandler(this, this.map, this.player);

    //Starting configuration for camera, also makes sure camera follow the player
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
    this.cameras.main.setZoom(this.cameraZoomLevel);
    
    //Create mobile or desktop controls for player input, ie. (joystick || keyboard)
    if (this.sys.game.device.os.android || this.sys.game.device.os.iOS) {
    createMobileConrols(this); } else { createKeyboardAssignments(this); }
    
     //creates the animations associated with the user input, ie. 'a' key triggers 'walk-left' animation
     createPlayerAnimations(this);

    //this.uiContainer = this.add.container(0, 0);
//this.uiContainer.setScale(1);
 //   this.uiContainer.add(this.icons);
    this.uiContainer = this.add.container(0, 0);
this.uiContainer.setSize(window.innerWidth, window.innerHeight); // 100% width and height

this.text = this.add.text(200, 100, 'This is a UI overlay', { font: '24px Arial', fill: '#ffffff' }).setOrigin(0.5); // Center within container
this.text.setPosition(0.5, 0.5); // Center horizontally and vertically (relative to container)
this.uiContainer.add(this.text);

  }

  update(time, delta) {
    //Update the position of player based on user input and velocity
    updatePlayerMovement(this, this.player, this.velocityChange); 
  }
  
}
