const urlParams = new URLSearchParams(window.location.search);
const artistId = urlParams.get('id');
//const token = localStorage.getItem('token');
const token = "BQBJa1LMjvp92CmJw4gS5216CgTgAQI7TNIDrVhypBA2mvJLydX07aaYMosSbbjVro_j-WZrTliKU9JMvXNrMj4gJ5sAcIb6ZrPL0GPpijVxhNzQqgc"

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

        const divRatings = document.createElement('div');
        divRatings.classList.add('col', 'text-end', 'px-0', 'ms-lg-5', 'd-none', 'd-md-block', 'track-ratings');
        divRatings.textContent = formattedTime;

        const divLike = document.createElement('div');
        divLike.classList.add('col-1', 'text-end', 'px-0', 'd-none', 'd-md-block', 'track-like');

        const iHeart = document.createElement('i');
        iHeart.classList.add('fa-regular', 'fa-heart', 'hide-icon', 'd-md-none');

        divCol1.appendChild(spanNumber);
        divCol1.appendChild(iPlay);
        divCol2.appendChild(img);
        divCol.appendChild(p);

        divLike.appendChild(iHeart);
        divRatings.appendChild(divLike);
        divCol.appendChild(divRatings);

        divRow.appendChild(divCol1);
        divRow.appendChild(divCol2);
        divRow.appendChild(divCol);
        divLike.appendChild(iHeart);

        tracksWrapper.appendChild(divRow);
        i++;
    }

    const trackPlayBtns = document.getElementsByClassName('track-row');
    for (let i = 0; i < trackPlayBtns.length; i++) {
        console.log(trackPlayBtns[i]);
        trackPlayBtns[i].addEventListener('click', (event) => {
            const clickedTrackIndex = Array.from(trackPlayBtns).indexOf(event.currentTarget);
            if (data.tracks[clickedTrackIndex].previewUrl) {
                const previewUrl = data.tracks[clickedTrackIndex].previewUrl;
                console.log(previewUrl);
                playCurrentTrack(previewUrl); // Call playCurrentTrack when a track is clicked
            }
        });
    }
    
    function playCurrentTrack(previewUrl) {
        const audioPlayer = document.getElementById('audioPlayer');
        const playButton = document.getElementById('play');
    
        console.log('Attempting to play:', previewUrl); // Log the URL for debugging
    
        // Check if the audio player is already playing a different track
        if (audioPlayer.src !== previewUrl) {
            audioPlayer.src = previewUrl;
        }
    
        // Play or pause the audio
        if (audioPlayer.paused) {
            audioPlayer.play()
                .then(() => {
                    playButton.classList.remove('fa-play');
                    playButton.classList.add('fa-pause');
                })
                .catch((error) => {
                    console.error('Error playing audio:', error);
                });
        } else {
            audioPlayer.pause();
            playButton.classList.remove('fa-pause');
            playButton.classList.add('fa-play');
        }
    }
    
}

function populateArtist(data) {
    const artistNameTitle = document.getElementById('artist-name');
    const artistFollowersTitle = document.getElementById('visulizzazioni-art');
    const artistBgImg = document.querySelector('.artist');
    const artistFollowers2 = document.querySelector('.monthly-listners');

    artistNameTitle.textContent = data.name;
    artistFollowersTitle.textContent = data.followers.total;
    artistFollowers2.textContent = data.followers.total;
    artistBgImg.style.backgroundImage = `url(${data.images[0].url})`;
    artistBgImg.style.backgroundSize = 'cover';
    artistBgImg.style.backgroundPosition = 'center';
    artistBgImg.style.backgroundRepeat = 'no-repeat'
}