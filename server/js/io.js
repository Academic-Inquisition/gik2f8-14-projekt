const fs = require('fs/promises')

async function getPlaylistByID(id) {
    const files = fs.readdir('./data/')
    for (let file in files) {
        if (file.toString() == 'schema.json') continue;
        let fileBuffer = await fs.readFile(file);
        let playlist = JSON.parse(fileBuffer);
        if (playlist.id == id) {
            return playlist;
        }
    }
}

function getPlaylistByName(playlistName) {
    const files = fs.readdir('./data/')
    for (let file in files) {
        if (file.toString() == 'schema.json') continue;
        if (file.toString() == playlistName) return fs.readFile(file).then((buf) => JSON.parse(buf))
    }
}