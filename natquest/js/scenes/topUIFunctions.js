 export function requestFullscreen() {
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

 export function handleFullscreenChange() {


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

 export export function resizeGame(gameSize) {

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

 export function isFullscreen() {
    return (
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement
    );
  }

 export function exitFullscreen() {
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


 export function createDropdownMenu(x, y) {
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

 export function zoomIn() {
    let camera = scene.gameScene.cameras.main; // Adjust scene line
    if (camera.zoom < 3) {
      camera.zoom *= 1.1; // Increase zoom by 10%
    } else {
      console.log('Maximum zoom level reached.');
    }
  }

 export function zoomOut() {
    let camera = scene.gameScene.cameras.main; // Adjust scene line
    if (camera.zoom > 1) { // Set a minimum zoom level (1 is just an example)
      camera.zoom /= 1.1; // Decrease zoom by 10%
    } else {
      console.log('Minimum zoom level reached.');
    }
  }
