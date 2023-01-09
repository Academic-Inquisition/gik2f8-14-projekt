const SongInfo = (song) => {
    let artistString = ""
    let artists = [song.artists];
    let image = song.albumArt;          // Grabs the coverImage string
    if (!image) {                         // If it doesn't exist then replace it with the wikimedia "No-Image-Placeholder.svg".
        image = "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
    }
    artists.forEach(artist => {
        if (!(artists.indexOf(artist) > 2)){
            artistString += artist;
        }

        if (artists.indexOf(artist) < artists.length - 1 && !(artists.indexOf(artist) > 1)) {
            artistString += ", ";
        }

        if (artists.indexOf(artist) === 2) {
            artistString += ", ...";
        }
    });

    return `
      <tr>
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
}