const SongInfo = (song) => {
    let artists = ""
    let image = song.albumCover;          // Grabs the coverImage string
    if (!image) {                         // If it doesn't exist then replace it with the wikimedia "No-Image-Placeholder.svg".
        image = "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
    }
    for (const artist in song.artists) {
        artists += artist;
        if (song.artists.length > 1) {
            artists += ", "
        }
        if (song.artists.indexOf(artist) == 2) {
            artists += "..."
            break
        }
    }
    return `
        <div class="flex flex-row">
          <img src="${image}" alt="Album Cover Image">
          <div class="flex flex-col">
            <p>${song.songName}</p>
            <p>${artists}</p>
          </div>
        </div>
    `
}