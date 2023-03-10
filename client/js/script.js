const api = new Api("http://localhost:5000/tasks");

let songNameValid = false;
let yearValid = false;
let artistsValid = false;
let albumNameValid = false;
let albumArtValid = true;
let songLengthValid = true;

let playlistNameValid = false;
let playlistAuthorsValid = false;

let selectedPlaylist = -1;
let submitType = "playlist";

const songForm = document.getElementById('songForm')
const songName = songForm.addName;
const year = songForm.addYear;
const artists = songForm.addArtists;
const albumName = songForm.addAlbumName;
const albumArt = songForm.addAlbumArt;
const songLength = songForm.addLength;

const playlistForm = document.getElementById('playlistForm');
const playlistName = playlistForm.addPlaylistName;
const playlistAuthors = playlistForm.addAuthors;

const playlist = document.getElementById('playlist');
const toggleButton = document.getElementById('toggleSelect');
const deleteButton = document.getElementById('deleteButton');
const contentHeader = document.getElementById('content__header');
const sidebarHeader = document.getElementById('sidebar__header');

songForm.addEventListener('submit', onSubmit);
year.addEventListener('blur', (e) => validateField(e.target));
year.addEventListener('input', (e) => validateField(e.target));
artists.addEventListener('blur', (e) => validateField(e.target));
artists.addEventListener('input', (e) => validateField(e.target));
songName.addEventListener('blur', (e) => validateField(e.target));
songName.addEventListener('input', (e) => validateField(e.target));
albumArt.addEventListener('blur', (e) => validateField(e.target));
albumArt.addEventListener('input', (e) => validateField(e.target));
albumName.addEventListener('blur', (e) => validateField(e.target));
albumName.addEventListener('input', (e) => validateField(e.target));
songLength.addEventListener('blur', (e) => validateField(e.target));
songLength.addEventListener('input', (e) => validateField(e.target));

playlistForm.addEventListener('submit', onSubmit);
playlistName.addEventListener('blur', (e) => validateField(e.target));
playlistName.addEventListener('input', (e) => validateField(e.target));
playlistAuthors.addEventListener('blur', (e) => validateField(e.target));
playlistAuthors.addEventListener('input', (e) => validateField(e.target));

function validateField(field) {
    const {name, value} = field;
    let validationMessage = '';
    switch(name){
        case 'addName': {
            if (value.length === 0){
                songNameValid = false;
                validationMessage = "F??ltet 'Song name' ??r obligatoriskt!";
            }
            else {
                songNameValid = true;
            }
            break;
        }
        case 'addYear':{
            if (value.length === 0){
                yearValid = false;
                validationMessage = "F??ltet 'Release year' ??r obligatoriskt!";
            }
            else {
                yearValid = true;
            }
            break;
        }
        case 'addArtists':{
            if (value.length === 0){
                artistsValid = false;
                validationMessage = "F??ltet 'Artists' ??r obligatoriskt!";
            }
            else {
                artistsValid = true;
            }
            break;
        }
        case 'addAlbumName': {
            if (value.length === 0){
                albumNameValid = false;
                validationMessage = "F??ltet 'Album name' ??r obligatoriskt!";
            }
            else {
                albumNameValid = true;
            }
            break;
        }
        case 'addAlbumArt': {
            if (!validateURL(value.toString()) && value.length > 0) {
                albumArtValid = false
                validationMessage = "F??ltet inneh??ller inte en giltig internetadress!"
            } else {
                albumArtValid = true
            }
            break;
        }
        case 'addLength': {
            if (value.length === 0){
                songNameValid = false;
                validationMessage = "F??ltet 'Song length' ??r obligatoriskt!";
            }
            else {
                songLengthValid = true;
            }
            break;
        }
        case 'addPlaylistName': {
            if (value.length === 0){
                playlistNameValid = false;
                validationMessage = "F??ltet 'Playlist name' ??r obligatoriskt!";
            }
            else {
                playlistNameValid = true;
            }
            break;
        } 
        case 'addAuthors': {
            if (value.length === 0){
                playlistAuthorsValid = false;
                validationMessage = "F??ltet 'Author(s)' ??r obligatoriskt!";
            }
            else {
                playlistAuthorsValid = true;
            }
            break;
        } 
    }

    const errorMessage = field.previousElementSibling.children[1];
    errorMessage.innerText = validationMessage;
    errorMessage.classList.remove('hidden');
}

function onSubmit(e) {
    e.preventDefault();
    let validationMessage = '';
    if (submitType === "song") {
        if (!songNameValid) {
            validationMessage = "F??ltet 'Song name' ??r obligatoriskt!";
            document.getElementById('songError').innerText = validationMessage;
            document.getElementById('songError').classList.remove('hidden');
        }
    
        if (!yearValid) {
            validationMessage = "F??ltet 'Release year' ??r obligatoriskt!";
            document.getElementById('yearError').innerText = validationMessage;
            document.getElementById('yearError').classList.remove('hidden');
        }
    
        if (!artistsValid) {
            validationMessage = "F??ltet 'Artists' ??r obligatoriskt!";
            document.getElementById('artistsError').innerText = validationMessage;
            document.getElementById('artistsError').classList.remove('hidden');
        }
    
        if (!albumNameValid) {
            validationMessage = "F??ltet 'Album name' ??r obligatoriskt!";
            document.getElementById('albumError').innerText = validationMessage;
            document.getElementById('albumError').classList.remove('hidden');
        }
    
        if (selectedPlaylist === -1) {
            validationMessage = "Du m??ste v??lja en spellista f??rst!";
            document.getElementById('playListError').innerText = validationMessage;
            document.getElementById('playListError').classList.remove('hidden');
        }
    
        if (songNameValid && yearValid && artistsValid && albumNameValid && selectedPlaylist !== -1){
            saveSong();
        }
    }
    else if (submitType === "playlist") {
        //console.log('test');
        if (!playlistNameValid) {
            validationMessage = "F??ltet 'Playlist name' ??r obligatoriskt!";
            document.getElementById('playlistNameError').innerText = validationMessage;
            document.getElementById('playlistNameError').classList.remove('hidden');
        }
    
        if (!playlistAuthorsValid) {
            validationMessage = "F??ltet 'Authors' ??r obligatoriskt!";
            document.getElementById('authorsError').innerText = validationMessage;
            document.getElementById('authorsError').classList.remove('hidden');
        }

        if (playlistNameValid && playlistAuthorsValid){
            savePlaylist();
        }
    }
    
}

function saveSong() {
    const song = {
        songName: songForm.addName.value,
        releaseYear: songForm.addYear.value,
        artists: songForm.addArtists.value,
        albumName: songForm.addAlbumName.value,
        albumArt: songForm.addAlbumArt.value,
        songLength: songForm.addLength.value
    };
    console.log(selectedPlaylist);
    api.addSongToPlaylist(selectedPlaylist, song).then((song) => {
        if (song) {
            renderPlayList(selectedPlaylist);
            songName.value = '';
            year.value = '';
            artists.value = '';
            albumName.value = '';
            albumArt.value = '';
            songLength.value = '';
            songNameValid = false;
            yearValid = false;
            artistsValid = false;
            albumNameValid = false;
            songLengthValid = false;
        }
    });
}

function savePlaylist() {
    const playlistData = {
        playListName: playlistForm.addPlaylistName.value,
        authors: [playlistForm.addAuthors.value],
        songs: []
    };

    api.createPlayList(playlistData).then((playlist) => {
        if (playlist) {
            renderSelection();
            playlistName.value = '';
            playlistAuthors.value = '';
            playlistNameValid = false;
            playlistAuthorsValid = false;
        }
    });
}

function deleteSong(song_id) {
    api.deleteSongFromPlaylist(selectedPlaylist, song_id).then(() => renderPlayList(selectedPlaylist));
}

function deletePlaylist() {
    api.deletePlaylist(selectedPlaylist).then(() => renderSelection());
}

function renderPlayList(playlist_id) {
    const selection = document.getElementById('content__selection');
    if (selection) selection.remove();
    submitType = "song";
    
    toggleButton.classList.remove('hidden');
    deleteButton.classList.remove('hidden');
    
    songForm.classList.remove('hidden');
    playlistForm.classList.add('hidden');
    sidebarHeader.innerText = "L??gg till l??t";
    
    selectedPlaylist = playlist_id.toLowerCase()

    api.getPlaylistByID(selectedPlaylist).then(result => {
        playlist.innerHTML = '';
        selectedPlaylist = result.playListName;
        contentHeader.innerText = result.playListName;
        // README: Resultatet vi f??r tbx ??r spellistan i format av v??r JSON-Schema.
        // Plocka ut informationen ni beh??ver ifr??n den!
        console.log(result);
        if (result) {
            playlist.insertAdjacentHTML('beforeend', PlayList(result));
        }
    });
}

function renderSelection() {
    selectedPlaylist = -1;
    submitType = "playlist";
    playlist.innerHTML = '';
    contentHeader.innerText = "V??lj Spellista";
    sidebarHeader.innerText = "L??gg till spellista";

    songForm.classList.add('hidden');
    toggleButton.classList.add('hidden');
    deleteButton.classList.add('hidden');
    playlistForm.classList.remove('hidden');

    const exists = document.getElementById('content__selection');
    
    let html = `<ul id="content__selection">`;

    api.getAllPlaylists().then(playlists => {
        if (playlists) {
            if (exists) exists.remove()
            for (let i = 0; i < playlists.length; i++){
                html += PlaylistSelect(`${playlists[i]}`);
            }
            content.insertAdjacentHTML('beforeend', html);
        }
    });
}

renderSelection();