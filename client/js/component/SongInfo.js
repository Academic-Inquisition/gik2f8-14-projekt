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
};