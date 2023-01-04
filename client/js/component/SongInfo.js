/* const SongInfo = (song) => {
    let artists = "";
    let image = song.albumArt;          // Grabs the coverImage string
    if (!image) {                         // If it doesn't exist then replace it with the wikimedia "No-Image-Placeholder.svg".
        image = "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
    }
    
    song.artists.forEach(artist => {
        artists += artist;
        if (song.artists.indexOf(artist) < song.artists.length - 1) {
            artists += ", ";
        }
        if (song.artists.indexOf(artist) == 2) {
            artists += ", ...";
        }
    });
}; */