class Music {
    constructor() {
        this.audio = new Audio("assets/sound/game-music-player-console-8bit-background-intro-theme-297305.mp3"); // Corrected path
        this.audio.loop = true; // Set the music to loop
        this.audio.volume = 0.5; // Set the volume (0.0 to 1.0)
    }

    play() {
        console.log("Playing music...");
        this.audio.play().catch(error => {
            console.error("Error playing audio:", error);
        });
    }

    pause() {
        this.audio.pause();
    }

    setVolume(volume) {
        this.audio.volume = volume; // Set volume between 0.0 and 1.0
    }
}

// Create an instance of the Music class
const gameMusic = new Music();

// Play the music when the user clicks the play button
document.getElementById('playMusic').addEventListener('click', () => {
    gameMusic.play();
});

// Adjust volume using the volume control slider
document.getElementById('volumeControl').addEventListener('input', (event) => {
    const volume = event.target.value;
    gameMusic.setVolume(volume);
});