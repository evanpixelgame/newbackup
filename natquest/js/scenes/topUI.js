export function createTopUI() {
    const vw = window.innerWidth;
    const xMid = vw * .5;
    const vh = window.innerHeight;

    // ****************************************************************TOP BAR UI ICONS*************************************************************


    const infoIcon = scene.add.sprite(1 * vw / 11, 50, 'infoIcon').setInteractive();
    const settingsIcon = scene.add.sprite(6.5 * vw / 9, 50, 'settingsIcon').setInteractive();
    const zoomInIcon = scene.add.sprite(7 * vw / 9, 50, 'zoomInIcon').setInteractive();
    const zoomOutIcon = scene.add.sprite(7.5 * vw / 9, 50, 'zoomOutIcon').setInteractive();   //was at 7.5 vw changed temp for diagnosis
    const fullscreenIcon = scene.add.sprite(8.1 * vw / 9, 50, 'fullscreenIcon').setInteractive();

    infoIcon.setScale(.18);
    settingsIcon.setScale(0.11);
    zoomInIcon.setScale(0.2);
    zoomOutIcon.setScale(0.2);
    fullscreenIcon.setScale(.12);

    // ****************************************************************SETTINGS ICON FUNC*************************************************************
    scene.dropdownContainer = scene.add.group();
    let isDropdownVisible = false;

    settingsIcon.on('pointerdown', () => {


      // Get the position of the settings icon
      const { x, y } = settingsIcon;

      // Toggle the visibility of the dropdown menu
      scene.dropdownContainer.setVisible(!isDropdownVisible); // Use "scene.dropdownContainer" to access the class property

      if (!isDropdownVisible) {
        // If the dropdown menu is not visible, create and display it
        scene.createDropdownMenu(x, y + settingsIcon.displayHeight);
      } else {
        // If the dropdown menu is already visible, hide it
        scene.dropdownContainer.clear(true, true);
      }

      // Update the flag to reflect the new visibility state
      isDropdownVisible = !isDropdownVisible;
    });


    // ****************************************************************ZOOM IN ICON FUNC*************************************************************

    zoomInIcon.on('pointerdown', () => {


      scene.zoomIn();
    });

    // ****************************************************************ZOOM OUT ICON FUNC*************************************************************

    zoomOutIcon.on('pointerdown', () => {


      scene.zoomOut();

    });


    // ****************************************************************FULLSCREEN ICON FUNC*************************************************************

    fullscreenIcon.on('pointerdown', () => {
      // Handle fullscreen icon click

      if (scene.isFullScreen()) {
        scene.exitFullScreen();
      } else {
        scene.requestFullScreen();
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


        if (!scene.sys.game.device.os.android && !scene.sys.game.device.os.iOS) {
          scene.scale.setGameSize(window.innerWidth, window.innerHeight);
          // Help text for PC
          scene.add
            .text(2.5 * vw / 11, 30, desktopInfoMsg, {
              font: '18px monospace',
              fill: '#ffffff',
              padding: { x: 20, y: 10 },
              backgroundColor: '#000000', //maybe add some transparency and change color
            })
            .setScrollFactor(0);
        } else {
          scene.add
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
        scene.children.each(child => {
          if (child instanceof Phaser.GameObjects.Text) {
            child.destroy();
          }
        });
      }
    });

    // ****************************************************************EVENT LISTENERS*************************************************************

    scene.requestFullScreen(); //JUST ADDED scene AS TEST TO SEE IF IT WORKS TO START OFF IN AUTOFULLSCREEN

    //   scene.scale.on('fullscreenchange', scene.handleFullscreenChange.bind(scene));
    scene.scale.on('resize', scene.handleFullscreenChange, scene);
  const infoIcon = scene.add.sprite(1 * vw / 11, 50, 'infoIcon').setInteractive();
    const settingsIcon = scene.add.sprite(6.5 * vw / 9, 50, 'settingsIcon').setInteractive();
    const zoomInIcon = scene.add.sprite(7 * vw / 9, 50, 'zoomInIcon').setInteractive();
    const zoomOutIcon = scene.add.sprite(7.5 * vw / 9, 50, 'zoomOutIcon').setInteractive();   //was at 7.5 vw changed temp for diagnosis
    const fullscreenIcon
  const topIcons = [infoIcon, settingsIcon, zoomInIcon, zoomOutIcon, fullscreenIcon]; 
  return topIcons;

  }
  // ^^^closing brackets of create func

  // ****************************************************************FULL SCREEN BUTTON METHODS*************************************************************

 function requestFullScreen() {
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

 function handleFullscreenChange() {


    // Check if the game is running on a mobile device
    const isMobile = /Mobi|Android|iOS/i.test(navigator.userAgent);

    // Apply delay only if on a mobile device was running into problem where it would capture resize zone too early and cut off the canvas
    if (isMobile) {
      // Wait for a short delay before resizing
      setTimeout(() => {
        if (scene.scale.isFullscreen) {

          scene.resizeGame({ width: window.innerWidth, height: window.innerHeight });
        } else {

          scene.resizeGame({ width: window.innerWidth, height: window.innerHeight });
        }
      }, 1000); // Adjust the delay time as needed
    } else {
      // Resize immediately without delay for desktop
      if (scene.scale.isFullscreen) {

        scene.resizeGame({ width: window.innerWidth, height: window.innerHeight });
      } else {

        scene.resizeGame({ width: window.innerWidth, height: window.innerHeight });
      }
    }
  }

 function resizeGame(gameSize) {

    const { width, height } = gameSize;

    // Resize the game canvas
    scene.sys.game.canvas.style.width = width + 'px';
    scene.sys.game.canvas.style.height = height + 'px';

    // Resize the game config to match the new size
    scene.sys.game.config.width = width;
    scene.sys.game.config.height = height;

    // Call resize events on all scenes
    scene.events.emit('resize', gameSize);
  }

 function isFullScreen() {
    return (
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement
    );
  }

 function exitFullScreen() {
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


 function createDropdownMenu(x, y) {
    // Create a dropdown container group
    scene.dropdownContainer = scene.add.group(); // Use "scene.dropdownContainer" to access the class property

    // Add dropdown options
    const options = ['Audio Controls', 'Graphic Controls', 'Save & Exit'];
    options.forEach((option, index) => {
      const optionText = scene.add.text(x, y + index * 50, option, { fill: '#ffffff' })
        .setInteractive();
      scene.dropdownContainer.add(optionText);

      // Set up click event for each option
      optionText.on('pointerdown', () => {
        console.log(`Selected: ${option}`);
        // Handle option selection logic here
      });
    });

    // Set up click event for dropdown button to close the dropdown menu
    scene.dropdownContainer.on('pointerdown', () => {
      scene.dropdownContainer.clear(true, true);
      isDropdownVisible = false;
    });

    // Make the dropdown container visible
    scene.dropdownContainer.setVisible(true);
  }


  //**********************************************************************ZOOM METHODS****************************************************************

 function zoomIn() {
    let camera = scene.gameScene.cameras.main; // Adjust scene line
    if (camera.zoom < 3) {
      camera.zoom *= 1.1; // Increase zoom by 10%
    } else {
      console.log('Maximum zoom level reached.');
    }
  }

 function zoomOut() {
    let camera = scene.gameScene.cameras.main; // Adjust scene line
    if (camera.zoom > 1) { // Set a minimum zoom level (1 is just an example)
      camera.zoom /= 1.1; // Decrease zoom by 10%
    } else {
      console.log('Minimum zoom level reached.');
    }
  }
