const audioPlayer = document.getElementById('audioPlayer');
const playButton = document.getElementById('play');
const previousButton = document.querySelector('.fa-backward-step');
const nextButton = document.querySelector('.fa-forward-step');
const volumeSlider = document.getElementById('volume');

playButton.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playButton.classList.remove('fa-play');
        playButton.classList.add('fa-pause');
    } else {
        audioPlayer.pause();
        playButton.classList.remove('fa-pause');
        playButton.classList.add('fa-play');
    }
});

previousButton.addEventListener('click', () => {
    // Gestisci il comando "Previous Song"
});

nextButton.addEventListener('click', () => {
    // Gestisci il comando "Next Song"
});

volumeSlider.addEventListener('input', () => {
    const volume = volumeSlider.value;
    audioPlayer.volume = volume;
});