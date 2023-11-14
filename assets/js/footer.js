const likes = document.querySelectorAll(".like-heart");

likes.forEach(like => {
    like.addEventListener("click", () => {
        like.classList.toggle("fa-regular");
        like.classList.toggle("fa-solid");
    });
});

const songTime = document.getElementById("song-time");
const songTimeLine = document.getElementById("song-time-line");
const songTimeToggler = document.getElementById("song-time-toggler");
let isMousePressed = false, clickPosition, startX, lastX, currentX;

songTime.addEventListener("click", (e) => {
    clickPosition = e.clientX - songTime.getBoundingClientRect().left;
    songTimeLine.style.width = clickPosition + "px";
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

    mouseMove = document.addEventListener("mousemove", (e) => {
        if (isMousePressed) {
            currentX = e.clientX;
            let deltaX = currentX - lastX;
            lastX = currentX;
            let width = parseInt(songTimeLine.style.width);
            width += deltaX;
            if (width >= 400) width = 400;
        
            songTimeLine.style.width = width + "px";
        }
    });
});

document.addEventListener("mouseup", () => {
    isMousePressed = false;
    document.removeEventListener("mousemove", mouseMove);
    songTimeToggler.classList.add("d-none");
});