const urlParams = new URLSearchParams(window.location.search);
const artistId = urlParams.get('id');
const token = localStorage.getItem('token');

if (artistId) {
    const urlArtist = `https://api.spotify.com/v1/artists/${artistId}`;
    const urlTracks = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=IT`;

    fetchArtists(urlArtist, token);
    fetchTracks(urlTracks, token);
}

function fetchArtists(url, token) {
    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    })
        .then(response => response.json())
        .then(data => { populateArtist(data) })
}

function fetchTracks(url, token) {
    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            populateTracks(data)
        })
}

function populateTracks(data) {
    const tracksWrapper = document.querySelector('#tracksWrapper');

    for (let i = 0; i < 10; i++) {

        const divRow = document.createElement('div');
        divRow.classList.add('row', 'align-items-center', 'mb-3', 'px-1', 'py-2', 'track-row');

        const divCol1 = document.createElement('div');
        divCol1.classList.add('col-1', 'track-id');

        const spanNumber = document.createElement('span');
        spanNumber.classList.add('number-hover');
        spanNumber.textContent = '1';

        const iPlay = document.createElement('i');
        iPlay.classList.add('fa-solid', 'fa-play', 'd-none', 'play-hover');

        divCol1.appendChild(spanNumber);
        divCol1.appendChild(iPlay);

        const divCol2 = document.createElement('div');
        divCol2.classList.add('col-1', 'px-0', 'me-2', 'me-xl-0', 'track-img');

        const img = document.createElement('img');
        img.classList.add('img-popolar-art');
        img.src = data.tracks[i].images[1].url;

        divCol2.appendChild(img);
        divRow.appendChild(divCol1);
        divRow.appendChild(divCol2);

        tracksWrapper.appendChild(divRow);

    }

}

function populateArtist(data) {

    const artistNameTitle = document.getElementById('artist-name');
    const artistFollowersTitle = document.getElementById('visulizzazioni-art');
    const artistBgImg = document.querySelector('.artist')

    artistNameTitle.textContent = data.name;
    artistFollowersTitle.textContent = data.followers.total;
    artistBgImg.style.backgroundImage = `url(${data.images[0].url})`;
    artistBgImg.style.backgroundSize = 'cover';
    artistBgImg.style.backgroundPosition = 'center';
    artistBgImg.style.backgroundRepeat = 'no-repeat';


}