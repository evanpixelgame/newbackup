import { PlayerSprite } from '../PlayerSprite.js';
import { GameUI } from '../GameUI.js';
// import PlayerControls from '../PlayerControls.js';
// import { PlayerAnimations } from '../PlayerAnimations.js';
import { MobileControls } from '../MobileControls.js';
import { sensorMapSet, createCollisionObjects } from '../collisionHandlers/mapSetter.js';
import { sensorHandler } from '../collisionHandlers/openWorldCollisionHandler.js';
import { createKeyboardAssignments, updatePlayerMovement, createPlayerAnimations } from '../baseSceneFunctions.js';
//import { NextScene } from './NextScene.js'; //this needs to be imported into the collision handler where newscene is called instead


export default class OpenWorld extends Phaser.Scene {
  constructor() {
    super({ key: 'OpenWorld' });

    this.engine = null;
    this.world = null;
    this.map = null;
    this.player = null;
    this.velocityChange = 2;

  }

  init(data) {
    this.openWorldScene = data.OpenWorld;
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
 //   this.scene.add('./PlayerAnimations.js', PlayerAnimations);
  //  this.scene.launch('PlayerAnimations', { player: this.player, speed: this.speed });

    const map = this.make.tilemap({ key: 'map' });
    // Load tileset
    const tilesetsData = [
      { name: 'tilesheetTerrain', key: 'tilesheetTerrain' },
      { name: 'tilesheetInterior', key: 'tilesheetInterior' },
      { name: 'tilesheetBuildings', key: 'tilesheetBuildings' },
      { name: 'tilesheetWalls', key: 'tilesheetWalls' },
      { name: 'tilesheetObjects', key: 'tilesheetObjects' },
      { name: 'tilesheetFlourishes', key: 'tilesheetFlourishes' }
    ];

    const tilesets = [];
    tilesetsData.forEach(tilesetData => {
      tilesets.push(map.addTilesetImage(tilesetData.name, tilesetData.key));
    });

    // Create layers using all tilesets
    const layers = [];
    for (let i = 0; i < map.layers.length; i++) {
      layers.push(map.createLayer(i, tilesets, 0, 0));
    }

    this.player = new PlayerSprite(this, 495, 325, 'player'); // Create the player object, just took away this.world as 2nd argument
    console.log(this.player);

//    this.scene.add('./PlayerControls.js', PlayerControls);
//    this.scene.launch('PlayerControls', { player: this.player });

    // Set world bounds for the player
    const boundaryOffset = 2; // increase value to decrease how close player can get to map edge
    const worldBounds = new Phaser.Geom.Rectangle(
      boundaryOffset,
      boundaryOffset,
      map.widthInPixels - 2 * boundaryOffset,
      map.heightInPixels - 2 * boundaryOffset
    );

    this.matter.world.setBounds(0, 0, worldBounds.width, worldBounds.height);
    console.log(this.world);

    this.collisionObjects = createCollisionObjects(this, map);
    this.sensorMapping = sensorMapSet(this, map, this.sensorID);
    this.sensorHandling = sensorHandler(this, map, this.player);

    // Constrain the camera
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
    this.cameras.main.setZoom(2);


     createKeyboardAssignments(this);
     createPlayerAnimations(this);

    // this.createAnimations();
    
    this.NewSceneLaunched = false; //sets a flag that collision handler will change, this will determine whether newScene gets launched (first time) or resumed (subsequent times)

/*            this.events.on('resume', () => {
            console.log('OpenWorld has been resumed!');
           this.scene.launch('PlayerControls', { player: this.player });
        });
*/
    
    }

  /*
  createAnimations() {
    this.anims.create({
      key: 'walking-up',
      frames: this.anims.generateFrameNames('player', {
        frames: [
          130, 131, 132, 133, 134, 135, 136, 137, 138
        ]
      }),
      yoyo: false,
      frameRate: 12,
      repeat: -1
    });

    this.anims.create({
      key: 'walking-left',
      frames: this.anims.generateFrameNames('player', {
        frames: [
          117, 118, 119, 120, 121, 122, 123, 124, 125
        ]
      }),
      yoyo: false,
      frameRate: 12,
      repeat: -1
    });

    this.anims.create({
      key: 'walking-down',
      frames: this.anims.generateFrameNames('player', {
        frames: [
          104, 105, 106, 107, 108, 109, 110, 111, 112
        ]
      }),
      yoyo: false,
      frameRate: 12,
      repeat: -1
    });

    this.anims.create({
      key: 'walking-right',
      frames: this.anims.generateFrameNames('player', {
        frames: [
          143, 144, 145, 146, 147, 148, 149, 150, 151
        ]
      }),
      yoyo: false,
      frameRate: 12,
      repeat: -1
    });
  }
*/

  update(time, delta) {

 if (!this.player) return; // Guard clause
    //   console.log(this.player);
    // Ensure we're accessing the Matter.js body directly
    const playerBody = this.player.body;

    // Define a constant velocity value
   // const velocity = this.player.velocityChange; // This might need adjustment based on your scale
const velocity = this.velocityChange;


    // Initialize velocity changes to 0
    let velocityX = 0;
    let velocityY = 0;

    if (this.cursors.left.isDown) {
      velocityX = -velocity; // Move left
      //     this.player.anims.play('walking-left', true);
    } else if (this.cursors.right.isDown) {
      velocityX = velocity; // Move right
      //       this.player.anims.play('walking-right', true);

    }

    if (this.cursors.up.isDown) {
      velocityY = -velocity; // Move up
      //   this.player.anims.play('walking-down', true);
    } else if (this.cursors.down.isDown) {
      velocityY = velocity; // Move down
      //  this.player.anims.play('walking-up', true);
    }

    // Set the player's velocity directly
    // Ensure we're working with the Matter body, which might require adjusting how you access the player's body
    //  Matter.Body.setVelocity(playerBody, { x: velocityX, y: velocityY });
    if (this.player && this.player.body) {
      Matter.Body.setVelocity(this.player.body, { x: velocityX, y: velocityY });
    }

    // Optional: Reset to zero velocity if no key is pressed
    if (this.player && this.player.body) {
      if (!this.cursors.left.isDown && !this.cursors.right.isDown && !this.cursors.up.isDown && !this.cursors.down.isDown) {
        Matter.Body.setVelocity(playerBody, { x: 0, y: 0 });
        //    this.player.anims.stop();
      }
    }

    if (velocityX !== 0 || velocityY !== 0) {
      if (velocityX > 0) {
        this.player.anims.play('walking-right', true);
      } else if (velocityX < 0) {
        this.player.anims.play('walking-left', true);
      } else if (velocityY < 0) {
        this.player.anims.play('walking-down', true);
      } else if (velocityY > 0) {
        this.player.anims.play('walking-up', true);
      }
    } else {
      // Stop animation when no movement
      this.player.anims.stop();
    }
    this.player.setRotation(0);
    
   /*
    // Get player's position and velocity
    let posX = this.player.body.position.x;
    let posY = this.player.body.position.y;
    let velX = this.player.body.velocity.x;
    let velY = this.player.body.velocity.y;
    //console.log(posX, posY, velX, velY);
    */
  }

}
window.OpenWorld = OpenWorld;
