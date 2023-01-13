const express = require('express');
const app = express();
const fs = require('fs/promises');

const PORT = 5000;

app.use(express.json()).use(express.urlencoded({extended: false})).use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', '*');
        res.header('Access-Control-Allow-Methods', '*');
        next();
    });

/**
 * Method: PUT
 * Comment: Adds a new playlist to the backend.
 */
app.put('/tasks/playlist/', async (req, res) => {
    try {
        let body = req.body;
        const listBuffer = await fs.readFile('./data/playlists.json');
        const currentPlaylists = JSON.parse(listBuffer);
        let maxListId = 0;
        if (currentPlaylists && currentPlaylists.length > 0) {
            maxListId = currentPlaylists.reduce(
                (maxId, current) => current.id > maxId ? current.id : maxId, maxListId
            );
        }
        const newId = [body.playListName];
        const newPlaylist = currentPlaylists ? [...currentPlaylists, body.playListName] : [newId];
        const plData = body ? {id: maxListId, ...body} : [body];
        await fs.writeFile('./data/playlists.json', JSON.stringify(newPlaylist));
        await fs.writeFile(`./data/playlist/${body.playListName}.json`, JSON.stringify(plData))
        res.send(newPlaylist);
    } catch (error) {
        res.status(500).send({error: error.stack});
    }
});

/**
 * Method: GET
 * Comment: Gets the list of all playlists from the backend.
 */
app.get('/tasks/playlist/', async (req, res) => {
    try {
        const buffer = await fs.readFile('./data/playlists.json');
        let list = JSON.parse(buffer);
        res.send(list);
    } catch (e) {
        res.status(500).send({e});
    }
});

/**
 * Method: GET
 * Comment: Gets a specific playlist from the backend.
 */
app.get('/tasks/playlist/:id', async (req, res) => {
    try {
        const buffer = await fs.readFile('./data/playlists.json');
        let list = JSON.parse(buffer);
        const file = await fs.readFile('./data/playlist/' + list[req.params.id]);
        let playlist = JSON.parse(file);
        res.send(playlist);
    } catch (e) {
        res.status(500).send({e});
    }
});

/**
 * Method: DELETE
 * Comment: Removes a specific playlist from the backend.
 */
app.delete('/tasks/playlist/:id', async (req, res) => {
    try {
        const body = req.body
        const id = req.params.id;
        const listBuffer = await fs.readFile('./data/playlists.json');
        const currentPlaylists = JSON.parse(listBuffer);
        if (currentPlaylists.length > 0) {
            await fs.writeFile('./data/playlists.json',
                JSON.stringify(currentPlaylists.filter((playlist) => playlist.id != id))
            );
            res.send({message: `Spellistan med namnet ${body.playListName} togs bort`});
        } else {
            res.status(404).send({error: 'Ingen spellista att ta bort'});
        }
    } catch (error) {
        res.status(500).send({error: error.stack});
    }
});

/**
 * Method: PUT
 * Comment: Adds a song to the playlist
 */
app.put('/tasks/playlist/song/', async (req, res) => {
    try {
        const body = req.body
        const buffer = await fs.readFile('./data/playlists.json');
        let list = JSON.parse(buffer);
        if (list && list.length > 0) {
            const buf = await fs.readFile('./data/playlist/' + list[body.id])
            let playlist = JSON.parse(buf)
            let maxSongId = 0;
            if (playlist["songs"] && playlist["songs"].length > 0) {
                maxSongId = playlist.reduce(
                    (maxId, current) => current.id > maxId ? current.id : maxId, maxSongId
                )
            }
            if (playlist) {
                let id = body.id
                body.id = maxSongId + 1
                playlist["songs"].push(body)
                await fs.writeFile('./data/playlist/' + list[id], JSON.stringify(playlist, null, 2));
                res.send({message: `Låten med namnet ${body.songName} lades till`, dat: playlist})
            }
        }
    } catch (error) {
        res.status(500).send({error});
    }
});

/**
 * Method: PATCH
 * Comment: Updates a specific song from the playlist in the backend.
 */
app.patch('/tasks/playlist/song/', async (req, res) => {
    try {
        const body = req.body
        const buffer = await fs.readFile('./data/playlists.json');
        let list = JSON.parse(buffer);
        if (body.id && list && list.length > 0) {
            const buf = await fs.readFile('./data/' + list[body.id] + ".json")
            let playlist = JSON.parse(buf)
            if (playlist) {
                let songs = playlist.songs
                for (let i = 0; i < playlist.length; i++) {
                    if (songs[i].id == body.song_id) {
                        songs[i] = body.song
                        break
                    }
                }
                let position = playlist.indexOf(body.song)
            }
        }
    } catch (error) {
        res.status(500).send({error});
    }
});

/**
 * Method: DELETE
 * Comment: Removes a specific song from the playlist in the backend.
 */
app.delete('/tasks/playlist/song/', async (req, res) => {
    try {
        const body = req.body;
        const buffer = await fs.readFile('./data/playlists.json');
        let list = JSON.parse(buffer);
        if (body.id && list && list.length > 0) {
            const buf = await fs.readFile('./data/' + list[body.id] + ".json");
            let playlist = JSON.parse(buf);
            if (playlist) {
                let songs = playlist.songs;
                let songToRemove = null;
                songs.forEach((song) => {
                    if (song.id == body.song_id) songToRemove = song;
                });
                songs.remove(songToRemove);
            }
        }
    } catch (error) {
        res.status(500).send({error});
    }
});

/**
 * Opens up the ExpressJS / NodeJS server to listen to the PORT variable.
 * Full Default Address: `http://localhost:5000`
 */
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
