export function resizer(scene) {

scene.scale.on('resize', handleFullscreenChange, scene);

}

 function handleFullscreenChange() {

    if (scene.scale.isFullscreen) {

      scene.resizeGame({ width: window.innerWidth, height: window.innerHeight });
    } else {

      scene.resizeGame({ width: window.innerWidth, height: window.innerHeight });
    }
  }

resizeGame(gameSize) {

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

