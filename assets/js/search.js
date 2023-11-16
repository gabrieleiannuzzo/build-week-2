const token = localStorage.getItem('token');
const inputField = document.getElementById('search-inp');

inputField.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();

        const querySearch = document.querySelector('#search-inp').value;
        const urlSearch = `https://api.spotify.com/v1/search?q=${querySearch}&type=track%2Calbum%2Cartist%2Cplaylist `;

        fetch(urlSearch, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        })
            .then(response => response.json())
            .then(data => {

                populateSearchAlbums(data);
                populateSearchArtist(data);
                populateSearchTracks(data);
            })
            .catch(err => console.log(err));
    }
});

function populateSearchAlbums(data) {
    for (let i = 0; i <= 3; i++) {
        const rowSearch = document.getElementById('search-row');

        const divCol = document.createElement('div');
        divCol.classList.add('col-6', 'col-lg-3', 'mb-4');

        const anchorAlbum = document.createElement('a');
        anchorAlbum.href = "albums.html?id=" + data.tracks.items[i].album.id;

        const divItemSearch = document.createElement('div');
        divItemSearch.classList.add('items-search', 'rounded', 'pt-3', 'ps-1');
        divItemSearch.style.backgroundImage = `url(${data.tracks.items[i].album.images[1].url})`
        divItemSearch.style.backgroundSize = 'cover';
        divItemSearch.style.backgroundPosition = 'center';

        const h4 = document.createElement('h4');
        h4.textContent = data.tracks.items[i].name;

        divItemSearch.appendChild(h4);
        anchorAlbum.appendChild(divItemSearch);
        divCol.appendChild(anchorAlbum);
        rowSearch.appendChild(divCol);
    }
}

function fetchArtistsImg(url) {

    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    })
        .then(response => response.json())
        .then(data => {
            artistImg = data.images[0].url
        })
        .catch(err => console.log(err));
}

function populateSearchArtist(data) {
    for (let i = 0; i <= 3; i++) {
        const rowSearch = document.getElementById('search-row');

        const divCol = document.createElement('div');
        divCol.classList.add('col-6', 'col-lg-3', 'mb-4');

        const anchorArtist = document.createElement('a');
        anchorArtist.href = "artists.html?id=" + data.tracks.items[i].artists[0].id;

        const divItemSearch = document.createElement('div');
        const artistId = data.tracks.items[i].artists[0].id;
        const url = `https://api.spotify.com/v1/artists/${artistId}`
        
        let artistImg = fetchArtistsImg(url)

        divItemSearch.classList.add('items-search', 'rounded', 'pt-3', 'ps-1');
        divItemSearch.style.backgroundImage = `url(${artistImg})`
        divItemSearch.style.backgroundSize = 'cover';
        divItemSearch.style.backgroundPosition = 'center';

        const h4 = document.createElement('h4');
        h4.textContent = data.tracks.items[i].album.artists[0].name;

        divItemSearch.appendChild(h4);
        anchorArtist.appendChild(divItemSearch);
        divCol.appendChild(anchorArtist);
        rowSearch.appendChild(divCol);
    }
}

function populateSearchTracks(data) {
    for (let i = 0; i <= 3; i++) {
        const rowSearch = document.getElementById('search-row');

        const divCol = document.createElement('div');
        divCol.classList.add('col-6', 'col-lg-3', 'mb-4');

        const divItemSearch = document.createElement('div');
        const trackId = data.tracks.items[i].id;
        

        divItemSearch.classList.add('items-search', 'rounded', 'pt-3', 'ps-1');
        divItemSearch.style.backgroundImage = `url(${data.tracks.items[i].album.images[1].url})`
        divItemSearch.style.backgroundSize = 'cover';
        divItemSearch.style.backgroundPosition = 'center';

        const h4 = document.createElement('h4');
        h4.textContent = data.tracks.items[i].name;

        divItemSearch.appendChild(h4);
        divCol.appendChild(divItemSearch);
        rowSearch.appendChild(divCol);
    }
}














function setBorderFocus() {
    const inputSearch = document.querySelector('#search-inp')
    const divToCustom = document.querySelector('.search-input-pg')
    const iconSearch = document.querySelector('#search-icon')
    inputSearch.addEventListener('focus', () => {
        divToCustom.classList.add('search-border')
        iconSearch.classList.add('text-white')
    })
    inputSearch.addEventListener('blur', () => {
        divToCustom.classList.remove('search-border')
        iconSearch.classList.remove('text-white')
    })
}

setBorderFocus()

