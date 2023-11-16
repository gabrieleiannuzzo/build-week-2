const urlParams = new URLSearchParams(window.location.search);
const albumId = urlParams.get('id');
const token = localStorage.getItem('token');


if (albumId) {
    const urlAlbum = `https://api.spotify.com/v1/albums/${albumId}`;
    //const urlTracks = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=IT`;

    fetchAlbum(urlAlbum, token);
}

function fetchAlbum(url, token) {
    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    })
        .then(response => response.json())
        .then(data => { 
            console.log(data);
            populateAlbum(data);
        })
}


function populateAlbum(data) {
    const albumImg = document.querySelector('#album-img');
    const albumName = document.querySelector('#album-name');
    const artistImg = document.querySelector('#artist-img');
    const artistName = document.querySelector('#album-artist');
    const albumYear = document.querySelector('#albumYear');
    const albumTracks = document.querySelector('#albumNumTracks');
    const albumLenght = document.querySelector('#albumLength');


    albumId.src = data.images[1].url;
    albumName.textContent = data.name;
    //artistImg.src = data.artists[0]
    artistName.textContent = data.artists[0].name;
    albumYear.textContent = data.release_date.slice(0, 4);
    albumTracks.textContent = data.tracks.total + " tracks";
    albumLenght.innerText = data.duration_ms / 6000 + " min";

    populateAlbumTracks(data)
}


function populateAlbumTracks(data) {
    i = 1;
    for (const track of data.tracks.items) {

        const idTrack = document.getElementById('idTrack');
        const nameTrack = document.getElementById('titleTrack');
        const durationTrack = document.getElementById('durationTrack');

        idTrack.innerHTML = i;
        nameTrack.innerHTML = track.name;

        const minutes = Math.floor(track.duration_ms / 60000);
        const seconds = Math.floor((track.duration_ms % 60000) / 1000);
        const formattedTime = `${minutes}:${String(seconds).padStart(2, '0')}`;
        durationTrack.innerHTML = formattedTime
    }


}

