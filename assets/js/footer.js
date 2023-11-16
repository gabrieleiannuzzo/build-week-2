class Footer {
    constructor (title, artist, img, duration, next, previous) {
        this.title = title;
        this.artist = artist;
        this.img = img;
        this.duration = duration;
        this.next = next;
        this.previous = previous;
        this.HTMLInit();
    }

    HTMLInit () {
        const template = document.getElementById("footer-template");
        const clone = document.importNode(template.content, true).firstElementChild;
    }
}

const target = document.getElementById("footer");

// FUNZIONE DI GESTIONE DELLA FUNZIONALITA DEI LIKE
const footer = document.getElementById("footer");

function likesHandler(section) {
    let likes = section.querySelectorAll(".like-heart");

    likes.forEach(like => {
        like.addEventListener("click", () => {
            like.classList.toggle("fa-regular");
            like.classList.toggle("fa-solid");
        });
    });
}

likesHandler(document.body);

// FUNZIONE DI GESTIONE ICONE
const underlineIcons = document.querySelectorAll(".underline-icon");
underlineIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        icon.classList.toggle("underline");
        icon.nextElementSibling.classList.toggle("underline");
    });
});






let songTime = document.getElementById("song-time");
let songTimeLine = document.getElementById("song-time-line");
let songTimeToggler = document.getElementById("song-time-toggler");
let isMousePressed = false, clickPosition, startX, lastX, currentX;
let song = document.getElementById("song");
let songStatus = 0;
let songStatusP = document.getElementById("song-status");
let statusMinutes = Math.floor(songStatus / 60);
let statusSeconds = songStatus - (statusMinutes * 60);
let songDuration = song.getAttribute("song-duration");
let songDurationP = document.getElementById("song-duration");
let durationMinutes = Math.floor(songDuration / 60);
let durationSeconds = songDuration - (durationMinutes * 60);
let px;
let songAdvancement;
const play = document.getElementById("play");
songDurationP.innerText = `${durationMinutes}:${durationSeconds}`;



songTime.addEventListener("click", (e) => {
    clickPosition = e.clientX - songTime.getBoundingClientRect().left;
    songTimeLine.style.width = clickPosition + "px";

    songStatus = parseInt((clickPosition * songDuration) / 400);
    statusMinutes = Math.floor(songStatus / 60);
    statusSeconds = (songStatus - (statusMinutes * 60)).toString().padStart(2, "0");
    songStatusP.innerText = `${statusMinutes}:${statusSeconds}`;
})

songTime.addEventListener("mouseenter", () => {
    if (!isMousePressed) songTimeToggler.classList.remove("d-none");
});

songTime.addEventListener("mouseleave", () => {
    if (!isMousePressed) songTimeToggler.classList.add("d-none");
});

songTime.addEventListener("mousedown", (e) => {
    isMousePressed = true;
    e.preventDefault();
    clickPosition = e.clientX - songTime.getBoundingClientRect().left;
    songTimeLine.style.width = clickPosition + "px";
    startX = e.clientX;
    lastX = startX;
    songTimeToggler.classList.remove("d-none");
    document.body.classList.add("pointer");
});

document.addEventListener("mousemove", (e) => {
    if (isMousePressed) {
        currentX = e.clientX;
        let deltaX = currentX - lastX;
        lastX = currentX;
        let width = parseInt(songTimeLine.style.width);
        width += deltaX;
        if (width >= 400) width = 400;
        if (width < 0) width = 0;

        songTimeLine.style.width = width + "px";
        songStatus = (width * songDuration) / 400;
        statusMinutes = Math.floor(songStatus / 60);
        statusSeconds = (parseInt(songStatus - (statusMinutes * 60))).toString().padStart(2, "0");
        songStatusP.innerText = `${statusMinutes}:${statusSeconds}`;
        console.log(width)
        console.log(songStatus)
    }
});

document.addEventListener("mouseup", () => {
    isMousePressed = false;
    songTimeToggler.classList.add("d-none");
    document.body.classList.remove("pointer");
});

play.addEventListener("click", () => {
    let playBtn = document.getElementById("play-btn")
    if (playBtn.classList.contains("fa-play")) {
        playBtn.classList.remove("fa-play");
        playBtn.classList.add("fa-pause");
        playBtn.classList.remove("play");

        songAdvancement = setInterval(() => {
            songStatus += 1;
            statusMinutes = Math.floor(songStatus / 60);
            statusSeconds = (songStatus - (statusMinutes * 60)).toString().padStart(2, "0");
            songStatusP.innerText = `${statusMinutes}:${statusSeconds}`;

            px = (400 * songStatus) / songDuration;
            songTimeLine.style.width = px + "px";
        }, 1000);
    } else {
        playBtn.classList.add("fa-play");
        playBtn.classList.remove("fa-pause");
        playBtn.classList.add("play");

        clearInterval(songAdvancement);
    }
});






const volumeOuter = document.getElementById("volume-outer");
const volume = document.getElementById("volume");
const volumeToggler = document.getElementById("volume-toggler");
const volumeIcon = document.getElementById("volume-icon");
let clickPositionVolume;
let audio;
let volumePercentage = 1, volumeStatus, volumeClicked = false;
let isMousePressedVolume, startVolumeX, lastVolumeX, currentVolumeX;

volumeOuter.addEventListener("mouseenter", () => {
    if (!isMousePressedVolume) volumeToggler.classList.remove("d-none");
});

volumeOuter.addEventListener("mouseleave", () => {
    if (!isMousePressedVolume) volumeToggler.classList.add("d-none");
});

volumeOuter.addEventListener("click", (e) => {
    volumeClicked = false;
    clickPositionVolume = e.clientX - volumeOuter.getBoundingClientRect().left;
    if (clickPositionVolume > 100) clickPositionVolume = 100;
    if (clickPositionVolume < 0) clickPositionVolume = 0;
    volume.style.width = clickPositionVolume + "px";

    volumePercentage = (clickPositionVolume / 100).toFixed(2);

    if (volumePercentage >= 0.5) {
        volumeIcon.classList.remove("fa-volume-xmark", "fa-volume-low");
        volumeIcon.classList.add("fa-volume-high");
    } else if (volumePercentage > 0 && volumePercentage < 0.5) {
        volumeIcon.classList.remove("fa-volume-xmark", "fa-volume-high");
        volumeIcon.classList.add("fa-volume-low");
    } else if (volumePercentage == 0) {
        volumeIcon.classList.remove("fa-volume-low", "fa-volume-high");
        volumeIcon.classList.add("fa-volume-xmark");
    }
});

volumeOuter.addEventListener("mousedown", (e) => {
    isMousePressedVolume = true;
    volumeClicked = true;
    e.preventDefault();
    clickPositionVolume = e.clientX - volumeOuter.getBoundingClientRect().left;
    volume.style.width = clickPositionVolume + "px";
    startVolumeX = e.clientX;
    lastVolumeX = startVolumeX;
    volumeToggler.classList.remove("d-none");
    document.body.classList.add("pointer");
});

document.addEventListener("mousemove", (e) => {
    if (isMousePressedVolume) {
        currentVolumeX = e.clientX;
        let deltaVolumeX = currentVolumeX - lastVolumeX;
        lastVolumeX = currentVolumeX;
        let width = parseInt(volume.style.width);
        width += deltaVolumeX;
        if (width >= 100) width = 100;
        if (width < 0) width = 0;
        volume.style.width = width + "px";

        volumePercentage = (width / 100).toFixed(2);

        if (volumePercentage >= 0.5) {
            volumeIcon.classList.remove("fa-volume-xmark", "fa-volume-low");
            volumeIcon.classList.add("fa-volume-high");
        } else if (volumePercentage > 0 && volumePercentage < 0.5) {
            volumeIcon.classList.remove("fa-volume-xmark", "fa-volume-high");
            volumeIcon.classList.add("fa-volume-low");
        } else if (volumePercentage == 0) {
            volumeIcon.classList.remove("fa-volume-low", "fa-volume-high");
            volumeIcon.classList.add("fa-volume-xmark");
        }
    }
});

document.addEventListener("mouseup", () => {
    isMousePressedVolume = false;
    volumeToggler.classList.add("d-none");
    document.body.classList.remove("pointer");
});

volumeIcon.addEventListener("click", () => {
    if (!volumeClicked) volumeStatus = parseInt(volume.style.width) / 100;
    volumeClicked = volumeClicked ? false : true;

    if (volumeClicked) {
        volume.style.width = 0;
        volumeIcon.classList.remove("fa-volume-low", "fa-volume-high");
        volumeIcon.classList.add("fa-volume-xmark");
    } else {
        if (volumeStatus >= 0.5) {
            volumeIcon.classList.remove("fa-volume-xmark", "fa-volume-low");
            volumeIcon.classList.add("fa-volume-high");
        } else if (volumeStatus > 0 && volumeStatus < 0.5) {
            volumeIcon.classList.remove("fa-volume-xmark", "fa-volume-high");
            volumeIcon.classList.add("fa-volume-low");
        }

        volume.style.width = (volumeStatus * 100) + "px";
    }
});

// OTTIMIZZARE LE FETCH DI HOME.JS