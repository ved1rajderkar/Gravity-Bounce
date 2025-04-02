class FullscreenHandler {
    constructor() {
        this.gameArea = document.getElementById('gameArea');
        this.fullscreenBtn = document.getElementById('fullscreenBtn');
        this.setupFullscreenButton();
    }

    setupFullscreenButton() {
        this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
        
        // Update button icon when fullscreen changes
        document.addEventListener('fullscreenchange', () => {
            this.fullscreenBtn.innerHTML = document.fullscreenElement ? '⮌' : '⛶';
            if (document.fullscreenElement) {
                this.gameArea.classList.add('fullscreen');
            } else {
                this.gameArea.classList.remove('fullscreen');
            }
        });
    }

    async toggleFullscreen() {
        try {
            if (!document.fullscreenElement) {
                await this.gameArea.requestFullscreen();
            } else {
                await document.exitFullscreen();
            }
        } catch (err) {
            console.error('Error toggling fullscreen:', err);
        }
    }
}