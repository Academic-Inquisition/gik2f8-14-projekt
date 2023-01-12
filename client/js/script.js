const api = new Api("http://localhost:5000/tasks");

let songNameValid = false;
let yearValid = false;
let artistsValid = false;
let albumNameValid = false;
let albumArtValid = true;
let songLengthValid = true;

let selectedPlaylist = -1;

const form = document.getElementById('form')
const songName = form.addName;
const year = form.addYear;
const artists = form.addArtists;
const albumName = form.addAlbumName;
const albumArt = form.addAlbumArt;
const songLength = form.addLength;

const playlist = document.getElementById('playlist');

form.addEventListener('submit', onSubmit);
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

function validateField(field) {
    const {name, value} = field;
    let validationMessage = '';
    switch(name){
        case 'addName': {
            if (value.length === 0){
                songNameValid = false;
                validationMessage = "Fältet 'Song name' är obligatoriskt!";
            }
            else {
                songNameValid = true;
            }
            break;
        }
        case 'addYear':{
            if (value.length === 0){
                yearValid = false;
                validationMessage = "Fältet 'Release year' är obligatoriskt!";
            }
            else {
                yearValid = true;
            }
            break;
        }
        case 'addArtists':{
            if (value.length === 0){
                artistsValid = false;
                validationMessage = "Fältet 'Artists' är obligatoriskt!";
            }
            else {
                artistsValid = true;
            }
            break;
        }
        case 'addAlbumName': {
            if (value.length === 0){
                albumNameValid = false;
                validationMessage = "Fältet 'Album name' är obligatoriskt!";
            }
            else {
                albumNameValid = true;
            }
            break;
        }
        case 'addAlbumArt': {
            if (!validateURL(value.toString()) && value.length > 0) {
                albumArtValid = false
                validationMessage = "Fältet innehåller inte en giltig internetadress!"
            } else {
                albumArtValid = true
            }
            break;
        }
        case 'addLength': {
            if (value.length === 0){
                songNameValid = false;
                validationMessage = "Fältet 'Song length' är obligatoriskt!";
            }
            else if (value.length !== 5){
                songLengthValid = true;
                validationMessage = "Använd formatet mm:ss!";
            }
            else {
                songLengthValid = true;
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

    if (!songNameValid) {
        validationMessage = "Fältet 'Song name' är obligatoriskt!";
        document.getElementById('songError').innerText = validationMessage;
        document.getElementById('songError').classList.remove('hidden');
    }

    if (!yearValid) {
        validationMessage = "Fältet 'Release year' är obligatoriskt!";
        document.getElementById('yearError').innerText = validationMessage;
        document.getElementById('yearError').classList.remove('hidden');
    }

    if (!artistsValid) {
        validationMessage = "Fältet 'Artists' är obligatoriskt!";
        document.getElementById('artistsError').innerText = validationMessage;
        document.getElementById('artistsError').classList.remove('hidden');
    }

    if (!albumNameValid) {
        validationMessage = "Fältet 'Album name' är obligatoriskt!";
        document.getElementById('albumError').innerText = validationMessage;
        document.getElementById('albumError').classList.remove('hidden');
    }

    if (selectedPlaylist === -1) {
        validationMessage = "Du måste välja en spellista först!";
        document.getElementById('playListError').innerText = validationMessage;
        document.getElementById('playListError').classList.remove('hidden');
    }

    if (songNameValid && yearValid && artistsValid && albumNameValid && selectedPlaylist !== -1){
        saveSong();
    }
}

function saveSong() {
    const song = {
        songName: form.addName.value,
        releaseYear: form.addYear.value,
        artists: form.addArtists.value,
        albumName: form.addAlbumName.value,
        albumArt: form.addAlbumArt.value,
        songLength: form.addLength.value
    };
    
    api.addSongToPlaylist(0, song).then((song) => { if (song) renderPlayList(selectedPlaylist) });
    
    //songName.value = '';
    //year.value = '';
    //artists.value = '';
    //albumName.value = '';
    //albumArt.value = '';
    //songLength.value = '';

    //songNameValid = false;
    //yearValid = false;
    //artistsValid = false;
    //albumNameValid = false;
}

function renderPlayList(playlist_id) {
    sidebar = document.getElementById('sidebar');
    toggleButton = document.getElementById('toggleSelect');
    selection = document.getElementById('content__selection');
    contentHeader = document.getElementById('content__header');
    sidebarHeader = document.getElementById('sidebar__header');

    selection.remove();
    toggleButton.classList.remove('hidden');
    html = `<button onclick="renderSelection()">Välj ny spellista</button>`;
    
    form.classList.remove('hidden');
    sidebarHeader.innerText = "Lägg till låt";
    contentHeader.insertAdjacentHTML('beforeend', html);
    

    api.getPlaylistByID(playlist_id).then(result => {
        playlist.innerHTML = '';
        console.log(result.id);
        selectedPlaylist = result.id;
        header.innerText = result.playListName;
        // README: Resultatet vi får tbx är spellistan i format av vår JSON-Schema.
        // Plocka ut informationen ni behöver ifrån den!
        if (result) {
            playlist.insertAdjacentHTML('beforeend', PlayList(result));
        }
    });
}

function renderSelection() {
    content = document.getElementById('content');
    header = document.getElementById('content__header');
    sidebarHeader = document.getElementById('sidebar__header');
    toggleButton = document.getElementById('toggleSelect');
    selection = document.getElementById('content__selection');
    
    selectedPlaylist = -1;
    playlist.innerHTML = '';
    header.innerText = "Välj Spellista";
    sidebarHeader.innerText = "Lägg till spellista";

    form.classList.add('hidden');
    toggleButton.classList.add('hidden');
    
    let html = `<ul id="content__selection">`

    api.getAllPlaylists().then(playlists => {
            if (playlists) {
                for (i = 0; i < playlists.length; i++){
                    html += PlaylistSelect(playlists[i], i);
                }
                content.insertAdjacentHTML('beforeend', html);
            }
    });
}

const songs = [
    {
        "id": 0,
        "songName": "Nothing Else Matters",
        "releaseYear": "1991",
        "artists": [
            "Metallica"
        ],
        "albumName": "Metallica",
        "albumArt": "https://www.albumartexchange.com/coverart/_tn/me/metallica_metallicablackalbum_73p.jpg",
        "songLength": "6:38"
    },
    {
        "id": 1,
        "songName": "Nothing Else Matters",
        "releaseYear": "2021",
        "artists": [
            "Miley Cyrus",
            "WATT",
            "Elton John",
            "Yo-Yo Ma",
            "Robert Trujillo",
            "Chad Smith"
        ],
        "albumName": "The Metallica Blacklist",
        "albumArt": "https://www.albumartexchange.com/coverart/_tn/me/metallica_themetallicablacklis_eant.jpg",
        "songLength": "6:35"
    },
    {
        "id": 2,
        "songName": "Stairway to Heaven",
        "releaseYear": "1971",
        "artists": [
          "Led Zeppelin"
        ],
        "albumName": "Led Zeppelin IV",
        "albumArt": "https://www.albumartexchange.com/coverart/_tn/le/ledzeppelin_ledzeppeliniv12_crcx.jpg",
        "songLength": "8:02"
    },
    {
        "id": 3,
        "songName": "Stairway to Heaven",
        "releaseYear": "1971",
        "artists": [
          "Led Zeppelin"
        ],
        "albumName": "Led Zeppelin IV",
        "albumArt": "",
        "songLength": "8:02"
    }
]

renderSelection();