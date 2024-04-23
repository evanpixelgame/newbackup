export function createFullscreenIcon(scene) {
const vw = window.innerWidth;
const fullscreenIcon = scene.add.sprite(8.1 * vw/ 9, 50, 'fullscreenIcon').setInteractive().setScale(.12);

    fullscreenIcon.on('pointerdown', () => {
            // Handle fullscreen icon click
          
              if (scene.isFullScreen()) {
              scene.exitFullScreen();
                } else {
              scene.requestFullScreen();
                }
                    });


  return fullscreenIcon;
}
