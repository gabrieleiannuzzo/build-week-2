const likes = document.querySelectorAll(".like-heart");
const songTime = document.getElementById("song-time");
const songTimeLine = document.getElementById("song-time-line");
const songTimeToggler = document.getElementById("song-time-toggler");
let isMousePressed = false, clickPosition, startX, lastX, currentX;
const song = document.getElementById("song");
let songStatus = 0;
const songStatusP = document.getElementById("song-status");
let statusMinutes = Math.floor(songStatus / 60);
let statusSeconds = songStatus - (statusMinutes * 60);
let songDuration = song.getAttribute("song-duration");
const songDurationP = document.getElementById("song-duration");
const durationMinutes = Math.floor(songDuration / 60);
const durationSeconds = songDuration - (durationMinutes * 60);
let px;
let songAdvancement;
const playBtn = document.getElementById("play");
songDurationP.innerText = `${durationMinutes}:${durationSeconds}`;

likes.forEach(like => {
    like.addEventListener("click", () => {
        like.classList.toggle("fa-regular");
        like.classList.toggle("fa-solid");
    });
});

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

    document.addEventListener("mousemove", (e) => {
        if (isMousePressed) {
            currentX = e.clientX;
            let deltaX = currentX - lastX;
            lastX = currentX;
            let width = parseInt(songTimeLine.style.width);
            width += deltaX;
            if (width >= 400) width = 400;
            if (width < 0) width = 0;

            // width : 400 = status : duration
        
            songTimeLine.style.width = width + "px";
            songStatus = (width * songDuration) / 400;
            statusMinutes = Math.floor(songStatus / 60);
            statusSeconds = (parseInt(songStatus - (statusMinutes * 60))).toString().padStart(2, "0");
            songStatusP.innerText = `${statusMinutes}:${statusSeconds}`;
            console.log(width)
            console.log(songStatus)
        }
    });
});

document.addEventListener("mouseup", () => {
    isMousePressed = false;
    songTimeToggler.classList.add("d-none");
});

playBtn.addEventListener("click", () => {
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

volumeOuter.addEventListener("mouseenter", () => {
    volumeToggler.classList.remove("d-none");
})

volumeOuter.addEventListener("mouseleave", () => {
    volumeToggler.classList.add("d-none");
})