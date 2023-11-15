const urlParams = new URLSearchParams(window.location.search);
const artistId = urlParams.get('artistId');
console.log(artistId);