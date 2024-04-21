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

    //creates the UI icons and graphics and make up the game's UI/HUD
  //  this.icons = createUIIcons(this);
    
    // Instantiate the gameUI class within the uiLayer, gives functionality to the icons at the top of screen
   // this.gameUI = new TopIcons(this, this.game, this.uiLayer, this.icons);

     var dialog = this.rexUI.add.dialog({
            x: 400 / this.cameras.main.zoom,
            y: 300 / this.cameras.main.zoom,

            background: this.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x1565c0),

            title: this.rexUI.add.label({
                background: this.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x003c8f),
                text: this.add.text(0, 0, 'Title', {
                    fontSize: '24px'
                }),
                space: {
                    left: 15,
                    right: 15,
                    top: 10,
                    bottom: 10
                }
            }),

            content: this.add.text(0, 0, 'Do you want to build a snow man?', {
                fontSize: '24px'
            }),

            actions: [], // Assing an empty array instead of `undefined`

            choices: [], // Assing an empty array instead of `undefined`

            space: {
                title: 25,
                content: 25,
                action: 15,
                choice: 15,

                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
                choices: 20,
            },

            align: {
                actions: 'right', // 'center'|'left'|'right'
            },

            expand: {
                content: false,  // Content is a pure text object
            }
        })
            .addAction([
                this.createLabel('Yes'),
                this.createLabel('No')
            ])
            .addChoice([
                this.createLabel('Choice-A'),
                this.createLabel('Choice-B')
            ])
            .layout()
            .setScale(.1)
            .setScrollFactor(0, 0)
            // .drawBounds(this.add.graphics(), 0xff0000)
            .popUp(1000);

this.container = this.add.container(); // Create a container

this.redRectangle = this.add.graphics(); // Create red rectangle graphics object (assuming it's already defined)
this.redRectangle.fillStyle(0xff0000); // Set red fill color (assuming it's already defined)
this.redRectangle.fillRect(0, 0, 50, 25); // Draw rectangle (assuming it's already defined)

this.container.add(this.redRectangle); // Add rectangle to the container

// Set relative position within the container (e.g., centered)
this.redRectangle.setPosition(this.container.width / 2, this.container.height / 2); 

// Optional: Set origin point for rotation or scaling (e.g., center)
this.redRectangle.setOrigin(0.5, 0.5);
    
  }


//METHOD
 createLabel(text) {
    return this.rexUI.add.label({
        // width: 40,
        // height: 40,

        background: this.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0x5e92f3),

        text: this.add.text(0, 0, text, {
            fontSize: '24px'
        }),

        space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
        }
    });
}

  update(time, delta) {
    //Update the position of player based on user input and velocity
    updatePlayerMovement(this, this.player, this.velocityChange); 
  }
  
}
