export function createFullscreenIcon(scene) {

    const vw = window.innerWidth;
    const fullscreenIcon = scene.add.sprite(8.1 * vw / 9, 50, 'fullscreenIcon').setInteractive().setScale(.12);

    fullscreenIcon.on('pointerdown', () => {
        // Handle fullscreen icon click
        if (isFullScreen()) {
            exitFullScreen();
        } else {
            requestFullScreen();
        }
    });

    return fullscreenIcon;
}

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
