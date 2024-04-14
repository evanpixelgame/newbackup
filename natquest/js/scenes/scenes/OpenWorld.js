import { PlayerSprite } from '../PlayerSprite.js';
import { GameUI } from '../GameUI.js';
import { MobileControls } from '../MobileControls.js';
import { sensorMapSet, createCollisionObjects } from '../collisionHandlers/mapSetter.js';
import { sensorHandler } from '../collisionHandlers/openWorldCollisionHandler.js';
import { createMap, createMapBoundary, createKeyboardAssignments, updatePlayerMovement, createPlayerAnimations } from '../baseSceneFunctions.js';

export default class OpenWorld extends Phaser.Scene {
  constructor() {
    super({ key: 'OpenWorld' });

    this.engine = null;
    this.world = null;
    this.map = null;
    this.mapKey = null;
    this.player = null;
    this.velocityChange = null;
  }

  init(data) {
    this.openWorldScene = data.OpenWorld;
    this.mapKey = data.mapKey || 'map';
    this.player = data.player;
    this.velocityChange = data.velocityChange || 2;
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

    this.player = new PlayerSprite(this, 495, 325, 'player'); // Create the player object, just took away this.world as 2nd argument
    console.log(this.player);

  this.worldBoundary = createWorldBoundary(this, this.map);

    this.collisionObjects = createCollisionObjects(this, this.map);
    this.sensorMapping = sensorMapSet(this, this.map, this.sensorID);
    this.sensorHandling = sensorHandler(this, this.map, this.player);

    // Constrain the camera
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
    this.cameras.main.setZoom(2);


     createKeyboardAssignments(this);
     createPlayerAnimations(this);

          }

    /* 
    this.NewSceneLaunched = false; //sets a flag that collision handler will change, this will determine whether newScene gets launched (first time) or resumed (subsequent times)
     this.events.on('resume', () => {
            console.log('OpenWorld has been resumed!');
           this.scene.launch('PlayerControls', { player: this.player });
        });       */

  


  update(time, delta) {
    
    updatePlayerMovement(this, this.player, this.velocityChange);
    
  }
  
}
