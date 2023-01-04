let songNameValid = false;
let yearValid = false;
let artistsValid = false;
let albumNameValid = false;
let albumArtValid = true;
let songLengthValid = true;

const songName = form.addName;
const year = form.addYear;
const artists = form.addArtists
const albumName = form.addAlbumName
const albumArt = form.addAlbumArt
const songLength = form.addLength
//const api = new Api("http://localhost:5000/tasks");
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
            albumArtValid = true;
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

    if (!songNameValid){
        validationMessage = "Fältet 'Song name' är obligatoriskt!";
        document.getElementById('songError').innerText = validationMessage;
        document.getElementById('songError').classList.remove('hidden');
    }

    if (!yearValid){
        validationMessage = "Fältet 'Release year' är obligatoriskt!";
        document.getElementById('yearError').innerText = validationMessage;
        document.getElementById('yearError').classList.remove('hidden');
    }

    if (!artistsValid){
        validationMessage = "Fältet 'Artists' är obligatoriskt!";
        document.getElementById('artistsError').innerText = validationMessage;
        document.getElementById('artistsError').classList.remove('hidden');
    }

    if (!albumNameValid){
        validationMessage = "Fältet 'Album name' är obligatoriskt!";
        document.getElementById('albumError').innerText = validationMessage;
        document.getElementById('albumError').classList.remove('hidden');
    }

    if (songNameValid && yearValid && artistsValid && albumNameValid){
        saveSong();
    }
}

function saveSong() {
    const song = {
        songName: form.addName.value,
        releaseYear: form.addYear.value,
        artists: form.addArtists.value,
        albumName: form.addAlbumArt.value,
        albumArt: "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg",
        songLength: form.addLength.value
    };
    
    //api.create(song).then((song) => { if (song) renderPlayList() });
    
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
}

function renderPlayList() {
    //application.getAll().then(songs => {
        playlist.innerHTML = '';
        if (songs && songs.length > 0) {
            playlist.insertAdjacentHTML('beforeend', PlayList(songs));
        }
    //});
}

const PlayList = (songs) => {
    let html = `<table id ="playlist" class="border border-separate border-spacing-y-2 border-spacing-2">
                    <tr class="">
                        <th class="pr-4">#</th>
                        <th class="pr-12">Titel</th>
                        <th class="pr-12">Album</th>
                        <th class="pr-12">År</th>
                        <th>Längd</th>
                    </tr>`;
    
    songs.forEach(song => {
        html += SongInfo(song);
    })

    html += `</table>`;

    return html;
}

const SongInfo = (song) => {
    let artists = "";
    let image = song.albumArt;          // Grabs the coverImage string
    if (!image) {                         // If it doesn't exist then replace it with the wikimedia "No-Image-Placeholder.svg".
        image = "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
    }
    
    song.artists.forEach(artist => {
        if (!(song.artists.indexOf(artist) > 2)){
            artists += artist;
        }

        if (song.artists.indexOf(artist) < song.artists.length - 1 && !(song.artists.indexOf(artist) > 1)) {
            artists += ", ";
        }

        if (song.artists.indexOf(artist) == 2) {
            artists += ", ...";
        }
    });

    let html = `<tr>
                    <td>${song.id + 1}</td>
                    <td class="pr-12">
                        <div class="flex flex-row">
                            <img src="${image}" alt="Album Cover Image" width="80" height="80">
                            <div class="flex flex-col justify-content-center">
                                <p class="pb-2 pl-4">${song.songName}</p>
                                <p class="pl-4">${artists}</p>
                            </div>
                        </div>
                    </td>
                    <td class="pr-12">${song.albumName}</td>
                    <td class="pr-12">${song.releaseYear}</td>
                    <td class="pr-12">${song.songLength}</td>
                </tr>`;

    return html;
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


renderPlayList();