
// TopIcons.js
export class TopIcons {
  constructor(scene, xPositions, y) {
    this.scene = scene;
    this.icons = this.createIcons(xPositions, y);
    this.setupIconInteractions();
  }

  createIcons(xPositions, y) {
    const icons = {
      infoIcon: this.scene.add.sprite(xPositions.info, y, 'infoIcon').setInteractive().setScale(0.18),
      settingsIcon: this.scene.add.sprite(xPositions.settings, y, 'settingsIcon').setInteractive().setScale(0.11),
      zoomInIcon: this.scene.add.sprite(xPositions.zoomIn, y, 'zoomInIcon').setInteractive().setScale(0.2),
      zoomOutIcon: this.scene.add.sprite(xPositions.zoomOut, y, 'zoomOutIcon').setInteractive().setScale(0.2),
      fullscreenIcon: this.scene.add.sprite(xPositions.fullscreen, y, 'fullscreenIcon').setInteractive().setScale(0.12),
    };

    return icons;
  }

 setupIconInteractions() {
    // You can add event listeners or interactions here
     this.topIcons.icons.infoIcon.on('pointerdown', () => {
      console.log('Info icon clicked.');
    });
    
    this.icons.settingsIcon.on('pointerdown', () => {
      console.log('Settings icon clicked.');
    });
    
    // Add more interactions for other icons
  

  
    settingsIcon.on('pointerdown', () => {

    this.dropdownContainer = this.add.group();
    let isDropdownVisible = false;
      // Get the position of the settings icon
      const { x, y } = settingsIcon;

      // Toggle the visibility of the dropdown menu
      this.dropdownContainer.setVisible(!isDropdownVisible); // Use "this.dropdownContainer" to access the class property

      if (!isDropdownVisible) {
        // If the dropdown menu is not visible, create and display it
        this.createDropdownMenu(x, y + settingsIcon.displayHeight);
      } else {
        // If the dropdown menu is already visible, hide it
        this.dropdownContainer.clear(true, true);
      }

      // Update the flag to reflect the new visibility state
      isDropdownVisible = !isDropdownVisible;
    });


    // ****************************************************************ZOOM IN ICON FUNC*************************************************************

    zoomInIcon.on('pointerdown', () => {


      this.zoomIn();
    });

    // ****************************************************************ZOOM OUT ICON FUNC*************************************************************

    zoomOutIcon.on('pointerdown', () => {


      this.zoomOut();

    });


    // ****************************************************************FULLSCREEN ICON FUNC*************************************************************

    fullscreenIcon.on('pointerdown', () => {
      // Handle fullscreen icon click

      if (this.isFullScreen()) {
        this.exitFullScreen();
      } else {
        this.requestFullScreen();
      }
    });

    // ****************************************************************INFO ICON FUNC*************************************************************


    let isMessageDisplayed = false;
    const desktopInfoMsg = 'WASD to move';
    const mobileInfoMsg = 'virtual joystick\nto move';


    // Add event listener to the info icon
    infoIcon.on('pointerdown', () => {
      // Toggle message visibility
      isMessageDisplayed = !isMessageDisplayed;

      // Check if the message is currently displayed
      if (isMessageDisplayed) {
        // Handle info icon click when the message is displayed


        if (!this.sys.game.device.os.android && !this.sys.game.device.os.iOS) {
          this.scale.setGameSize(window.innerWidth, window.innerHeight);
          // Help text for PC
          this.add
            .text(2.5 * vw / 11, 30, desktopInfoMsg, {
              font: '18px monospace',
              fill: '#ffffff',
              padding: { x: 20, y: 10 },
              backgroundColor: '#000000', //maybe add some transparency and change color
            })
            .setScrollFactor(0);
        } else {
          this.add
            .text(2.5 * vw / 11, 30, mobileInfoMsg, {
              font: '12px monospace',
              fill: '#ffffff',
              padding: { x: 20, y: 10 },
              backgroundColor: '#000000', //maybe add some transparency and change color
            })
            .setScrollFactor(0);
        }
      } else {
        // Handle info icon click when the message is not displayed
        console.log('info icon clicked - Message hidden');

        // Remove the message from the scene
        this.children.each(child => {
          if (child instanceof Phaser.GameObjects.Text) {
            child.destroy();
          }
        });
      }
    });

    // ****************************************************************EVENT LISTENERS*************************************************************

    this.requestFullScreen(); //JUST ADDED THIS AS TEST TO SEE IF IT WORKS TO START OFF IN AUTOFULLSCREEN

    //   this.scale.on('fullscreenchange', this.handleFullscreenChange.bind(this));
    this.scale.on('resize', this.handleFullscreenChange, this);

  }
  // ^^^closing brackets of create func

  // ****************************************************************FULL SCREEN BUTTON METHODS*************************************************************

  requestFullScreen() {
    const element = document.documentElement;

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { /* Firefox */
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { /* IE/Edge */
      element.msRequestFullscreen();
    }
  }

  handleFullscreenChange() {


    // Check if the game is running on a mobile device
    const isMobile = /Mobi|Android|iOS/i.test(navigator.userAgent);

    // Apply delay only if on a mobile device was running into problem where it would capture resize zone too early and cut off the canvas
    if (isMobile) {
      // Wait for a short delay before resizing
      setTimeout(() => {
        if (this.scale.isFullscreen) {

          this.resizeGame({ width: window.innerWidth, height: window.innerHeight });
        } else {

          this.resizeGame({ width: window.innerWidth, height: window.innerHeight });
        }
      }, 1000); // Adjust the delay time as needed
    } else {
      // Resize immediately without delay for desktop
      if (this.scale.isFullscreen) {

        this.resizeGame({ width: window.innerWidth, height: window.innerHeight });
      } else {

        this.resizeGame({ width: window.innerWidth, height: window.innerHeight });
      }
    }
  }

  resizeGame(gameSize) {

    const { width, height } = gameSize;

    // Resize the game canvas
    this.sys.game.canvas.style.width = width + 'px';
    this.sys.game.canvas.style.height = height + 'px';

    // Resize the game config to match the new size
    this.sys.game.config.width = width;
    this.sys.game.config.height = height;

    // Call resize events on all scenes
    this.events.emit('resize', gameSize);
  }

  isFullScreen() {
    return (
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement
    );
  }

  exitFullScreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }

  // ****************************************************************DROP DOWN SCREEN BUTTON METHODS*************************************************************


  createDropdownMenu(x, y) {
    // Create a dropdown container group
    this.dropdownContainer = this.add.group(); // Use "this.dropdownContainer" to access the class property

    // Add dropdown options
    const options = ['Audio Controls', 'Graphic Controls', 'Save & Exit'];
    options.forEach((option, index) => {
      const optionText = this.add.text(x, y + index * 50, option, { fill: '#ffffff' })
        .setInteractive();
      this.dropdownContainer.add(optionText);

      // Set up click event for each option
      optionText.on('pointerdown', () => {
        console.log(`Selected: ${option}`);
        // Handle option selection logic here
      });
    });

    // Set up click event for dropdown button to close the dropdown menu
    this.dropdownContainer.on('pointerdown', () => {
      this.dropdownContainer.clear(true, true);
      isDropdownVisible = false;
    });

    // Make the dropdown container visible
    this.dropdownContainer.setVisible(true);
  }


  //**********************************************************************ZOOM METHODS****************************************************************

  zoomIn() {
    let camera = this.gameScene.cameras.main; // Adjust this line
    if (camera.zoom < 3) {
      camera.zoom *= 1.1; // Increase zoom by 10%
    } else {
      console.log('Maximum zoom level reached.');
    }
  }

  zoomOut() {
    let camera = this.gameScene.cameras.main; // Adjust this line
    if (camera.zoom > 1) { // Set a minimum zoom level (1 is just an example)
      camera.zoom /= 1.1; // Decrease zoom by 10%
    } else {
      console.log('Minimum zoom level reached.');
    }
  }
}
