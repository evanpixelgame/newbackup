export function createFullscreenIcon() {

const fullscreenIcon = this.add.sprite(8.1 * vw/ 9, 50, 'fullscreenIcon').setInteractive().setScale(.12);

    fullscreenIcon.on('pointerdown', () => {
            // Handle fullscreen icon click
          
              if (this.isFullScreen()) {
              this.exitFullScreen();
                } else {
              this.requestFullScreen();
                }
                    });


  return fullscreenIcon;
}
