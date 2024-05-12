import OpenWorld from './scenes/OpenWorld.js';

export class Preloader extends Phaser.Scene {
    constructor() {
        super({ key: 'Preloader' });
    }

    preload() {

        //***************************CREATE BACKDROP AND PROGRESS BAR FOR LOADING**********************************^^^**********    

        // Display a progress bar during asset loading
        const progressBar = this.add.rectangle(this.game.config.width / 2, this.game.config.height / 2, 300, 50, 0xcccccc);
        progressBar.setOrigin(0, 0.5);

        const progressText = this.add.text(this.game.config.width / 2, this.game.config.height / 2 + 50, 'Loading...', {
            fontFamily: 'Knewave',
            color: 'black',
            fontSize: '32px'
        });
        progressText.setOrigin(0.5, 0.5);

        this.load.on('progress', (percent) => {
            progressBar.setScale(percent, 1);
            progressText.setText(`Loading: ${Math.floor(percent * 100)}%`);
        });

        // Create backdrop
        const backdrop = this.add.graphics();
        backdrop.fillStyle(0x000000, 0.7); // Black with 70% opacity
        backdrop.fillRect(0, 0, this.game.config.width, this.game.config.height);


        //***************************LOAD BACKGROUND IMAGES ************************************************************    
        this.load.image('backgroundLandscape', 'assets/backgrounds/startScreenBackgroundLandscape.png');
        this.load.image('background', 'assets/backgrounds/startScreenBackground.png');

        //***************************LOAD TILESETS FOR MAPS************************************************************
        this.load.image('tiles', 'assets/tilesets/tilemap2.png');
        this.load.image('tilesheetInterior', 'assets/tilesets/tilesheetInterior.png');
        this.load.image('tilesheetTerrain', 'assets/tilesets/tilesheetTerrain.png');
        this.load.image('tilesheetBuildings', 'assets/tilesets/tilesheetBuildings.png');
        this.load.image('tilesheetWalls', 'assets/tilesets/tilesheetWalls.png');
        this.load.image('tilesheetObjects', 'assets/tilesets/tilesheetObjects.png');
        this.load.image('tilesheetFlourishes', 'assets/tilesets/tilesheetFlourishes.png');

        //***************************LOAD MAPS*************************************************************************^^^    
        this.load.tilemapTiledJSON('map', 'assets/json/map.json');
        this.load.tilemapTiledJSON('insidemap', 'assets/json/insidemap.json');
        this.load.tilemapTiledJSON('nextroommap', 'assets/json/nextroommap.json');


        //***************************LOAD UI IMAGES************************************************************************     
        this.load.image('base', 'assets/images/base.png');
        this.load.image('thumb', 'assets/images/thumb.png');
        this.load.image('zoomInIcon', 'assets/UI/icons/zoom-icon.png');
        this.load.image('zoomOutIcon', 'assets/UI/icons/zoom-out-icon.png');
        this.load.image('settingsIcon', 'assets/UI/icons/settings-icon.png');
        this.load.image('fullscreenIcon', 'assets/UI/icons/full-screen-icon.png');
        this.load.image('infoIcon', 'assets/UI/icons/info-icon.png');
        this.load.image('emptyItemSlot', 'assets/images/inventory/emptyItemSlot.png'); //64x64px
        this.load.image('inventoryIcon', 'assets/images/inventory/inventoryIcon.png'); //64x64px

        //***************************LOAD INVENTORY ITEMS IMAGES************************************************************************

        this.load.image('healthPotionWeak', 'assets/images/inventory/potions/healthPotionWeakIcon.png'); //64x64px
        this.load.image('poisonPotionWeak', 'assets/images/inventory/potions/poisonPotionWeakIcon.png'); //64x64px
        this.load.image('manaPotionWeak', 'assets/images/inventory/potions/manaPotionWeakIcon.png'); //64x64px
        this.load.image('wealthPotion', 'assets/images/inventory/potions/wealthPotionTexture.png'); //64x64px
        this.load.image('emeraldRing', 'assets/images/inventory/equipment/rings/emeraldRingIcon.png'); //64x64px   
        
        //***************************LOAD PLUGINS***************************************************************************    
        this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
        this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);


        //***************************LOAD PLAYER SPRITE SHEETS***************************************************************
        this.load.spritesheet("player", "assets/sprites/player/fatWolf.png", {
            frameWidth: 64,
            frameHeight: 64
        });


        //***************************WHEN FINISHED LOADING, START FIRST SCENE************************************************    
        this.load.on('complete', () => {
            progressText.destroy(); // Remove the progress text when loading is complete
            progressBar.destroy(); // Remove the progress bar when loading is complete
            this.scene.add('OpenWorld', OpenWorld);
            this.scene.start('OpenWorld');
        });
    }

}
