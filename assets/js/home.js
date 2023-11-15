const token = "BQDk9sqWCm648OwQIxJA6Jyk4kPTfq7I87XF20DQPfDqD__cyxBJ50UZ869c77pE7XyqOpWQuJ-qHLyFy3XHBcYoC5_o7KFHPS_yzKmzM9_AkIII7Pg";

// Function to retrieve selectedCategoryIds from localStorage
function getSelectedCategoryIdsFromLocalStorage() {
    const selectedCategoryIdsStr = localStorage.getItem("selectedCategoryIds");
    if (selectedCategoryIdsStr) {
        return JSON.parse(selectedCategoryIdsStr);
    }
    return [];
}

// Function to fetch playlists by category ID
function fetchPlaylistsByCategory(categoryId) {
    return fetch(`https://api.spotify.com/v1/browse/categories/${categoryId}/playlists`, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    .then(res => res.json())
    .then(data => data.playlists.items);
}

// Function to populate playlists for a category
async function populatePlaylistsForCategory(categoryId) {
    const playlists = await fetchPlaylistsByCategory(categoryId);

    const playlistAsideDiv = document.getElementById("playlist-aside");
    
    playlists.slice(0, 10).forEach(playlist => {
        const playlistLink = document.createElement("a");
        playlistLink.href = playlist.external_urls.spotify;
        playlistLink.className = "playlist-element text-decoration-none";
        playlistLink.textContent = playlist.name;


        playlistAsideDiv.appendChild(playlistLink);
    });
}

// Retrieve selectedCategoryIds from localStorage
const selectedCategoryIds = getSelectedCategoryIdsFromLocalStorage();

// Loop through selectedCategoryIds and populate playlists for each category
selectedCategoryIds.forEach(categoryId => {
    populatePlaylistsForCategory(categoryId);
});

// Function to fetch tracks from a playlist by playlist ID
function fetchTracksByPlaylist(playlistId) {
    return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    .then(res => res.json())
    .then(data => data.items);
}

// Function to populate tracks for a playlist and insert into tracksWrapper div
async function populateTracksForPlaylist(playlistId) {
    const tracks = await fetchTracksByPlaylist(playlistId);

    const tracksWrapperDiv = document.getElementById("tracksWrapper");

    tracks.forEach((track, index) => {
        const trackRowDiv = document.createElement("div");
        trackRowDiv.className = "row align-items-center mb-3 trackRow";
        
        const trackIdDiv = document.createElement("div");
        trackIdDiv.className = "col-1 pe-0 trackId";
        trackIdDiv.textContent = index + 1;

        const trackImgDiv = document.createElement("div");
        trackImgDiv.className = "col px-0 trackImg";
        const img = document.createElement("img");
        img.src = track.track.album.images[0].url? track.track.album.images[0].url : "";
        img.className = "img-popolar-art";
        trackImgDiv.appendChild(img);

        const trackTitleDiv = document.createElement("div");
        trackTitleDiv.className = "col me-5 trackTitle";
        trackTitleDiv.textContent = track.track.name;
        const pElement = document.createElement("p");
        pElement.className = "d-block d-md-none px-0 ms-0";
        pElement.textContent = track.track.popularity;
        trackTitleDiv.appendChild(pElement);

        const trackRatingsDiv = document.createElement("div");
        trackRatingsDiv.className = "col text-end px-0 ms-lg-5 d-none d-md-block trackRatings";
        trackRatingsDiv.textContent = track.track.popularity;

        const trackLikeDiv = document.createElement("div");
        trackLikeDiv.className = "col-1 text-end px-0 d-none d-md-block trackLike";
        const iElement = document.createElement("i");
        iElement.className = "fa-regular fa-heart like-heart";
        trackLikeDiv.appendChild(iElement);

        const trackDurationDiv = document.createElement("div");
        trackDurationDiv.className = "col-1 text-end px-0 d-none d-md-block trackDuration";
        trackDurationDiv.textContent = "3:29";

        const trackOptionsDiv = document.createElement("div");
        trackOptionsDiv.className = "col-1 text-end px-0 trackOptions";
        const iOptionsElement = document.createElement("i");
        iOptionsElement.className = "fa-solid fa-ellipsis-vertical";
        trackOptionsDiv.appendChild(iOptionsElement);

        trackRowDiv.appendChild(trackIdDiv);
        trackRowDiv.appendChild(trackImgDiv);
        trackRowDiv.appendChild(trackTitleDiv);
        trackRowDiv.appendChild(trackRatingsDiv);
        trackRowDiv.appendChild(trackLikeDiv);
        trackRowDiv.appendChild(trackDurationDiv);
        trackRowDiv.appendChild(trackOptionsDiv);

        tracksWrapperDiv.appendChild(trackRowDiv);
    });
}

// Loop through selectedCategoryIds and populate tracks for each playlist
selectedCategoryIds.forEach(async categoryId => {
    const playlists = await fetchPlaylistsByCategory(categoryId);
    playlists.slice(0, 10).forEach(playlist => {
        populateTracksForPlaylist(playlist.id);
    });
});