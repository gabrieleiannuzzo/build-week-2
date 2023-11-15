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
    let i = 1;

    for (const track of data.tracks) {

        const divRow = document.createElement('div');
        divRow.classList.add('row', 'align-items-center', 'mb-3', 'px-1', 'py-2', 'track-row');

        const divCol1 = document.createElement('div');
        divCol1.classList.add('col-1', 'track-id');

        const spanNumber = document.createElement('span');
        spanNumber.classList.add('number-hover');
        spanNumber.textContent = i;

        const iPlay = document.createElement('i');
        iPlay.classList.add('fa-solid', 'fa-play', 'd-none', 'play-hover');

        const divCol2 = document.createElement('div');
        divCol2.classList.add('col-1', 'px-0', 'me-2', 'me-xl-0', 'track-img');

        const img = document.createElement('img');
        img.classList.add('img-popolar-art');
        img.src = track.album.images[1].url;

        const divCol = document.createElement('div');
        divCol.classList.add('col', 'me-5', 'me-md-2', 'ms-3', 'ms-md-2', 'ms-lg-1', 'ms-xl-0', 'mt-3', 'mt-md-0', 'track-title');
        divCol.textContent = track.name;

        const p = document.createElement('p');
        p.classList.add('d-block', 'd-md-none', 'px-0', 'ms-0');
        const minutes = Math.floor(track.duration_ms / 60000);
        const seconds = Math.floor((track.duration_ms % 60000) / 1000);
        const formattedTime = `${minutes}:${String(seconds).padStart(2, '0')}`;
        p.textContent = formattedTime

        // Creazione dell'elemento div con le classi 'col text-end px-0 ms-lg-5 d-none d-md-block track-ratings'
        const divRatings = document.createElement('div');
        divRatings.classList.add('col', 'text-end', 'px-0', 'ms-lg-5', 'd-none', 'd-md-block', 'track-ratings');
        divRatings.textContent = '1.740.786.593';

        // Creazione dell'elemento div con le classi 'col-1 text-end px-0 d-none d-md-block track-like'
        const divLike = document.createElement('div');
        divLike.classList.add('col-1', 'text-end', 'px-0', 'd-none', 'd-md-block', 'track-like');

        // Creazione dell'elemento i con le classi 'fa-regular fa-heart hide-icon d-md-none'
        const iHeart = document.createElement('i');
        iHeart.classList.add('fa-regular', 'fa-heart', 'hide-icon', 'd-md-none');

        divCol1.appendChild(spanNumber);
        divCol1.appendChild(iPlay);
        divCol2.appendChild(img);
        divCol.appendChild(p);
        divRow.appendChild(divCol1);
        divRow.appendChild(divCol2);
        divRow.appendChild(divCol);
        divLike.appendChild(iHeart);

        tracksWrapper.appendChild(divRow);
        i++;
    }

}

function populateArtist(data) {
    console.log(data);
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