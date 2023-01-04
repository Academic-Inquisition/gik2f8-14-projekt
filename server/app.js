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
 *
 */
app.put('/playlist/', async (req, res) => {
    try {
        const listBuffer = await fs.readFile('./data/playlists.json');
        const currentPlaylists = JSON.parse(listBuffer);
        let maxTaskId = 1;
        if (currentPlaylists && currentPlaylists.length > 0) {
            maxTaskId = currentPlaylists.reduce(
                (maxId, currentElement) =>
                    currentElement.id > maxId ? currentElement.id : maxId,
                maxTaskId
            );
        }
        const newId = {id: maxTaskId + 1, ...task};
        const newPlaylist = currentPlaylists ? [...currentPlaylists, newId] : [newId];
        await fs.writeFile('./data/playlists.json', JSON.stringify(newPlaylist));
        res.send(newPlaylist);
    } catch (error) {
        res.status(500).send({error: error.stack});
    }
});

/**
 *
 */
app.get('/playlist/', async (req, res) => {
    try {
        const buffer = await fs.readFile('./data/playlists.json');
        let list = JSON.parse(buffer);
        res.send(list);
    } catch (e) {
        res.status(500).send({e});
    }
});

/**
 *
 */
app.get('/playlist/:id', async (req, res) => {
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
 *
 */
app.delete('/playlist/:id', async (req, res) => {
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
 *
 */
app.put('/playlist/song', async (req, res) => {
    try {
        const body = req.body
        const buffer = await fs.readFile('./data/playlists.json');
        let list = JSON.parse(buffer);
        if (body.id && list && list.length > 0) {
            const buf = await fs.readFile('./data/' + list[body.id] + ".json")
            let playlist = JSON.parse(buf)
            if (playlist) {
                let songs = playlist.songs
                songs.append(body.song)
            }
        }
    } catch (error) {
        res.status(500).send({error});
    }
});

/**
 *
 */
app.patch('/playlist/song', async (req, res) => {
    try {
        const body = req.body
        const buffer = await fs.readFile('./data/playlists.json');
        let list = JSON.parse(buffer);
        if (body.id && list && list.length > 0) {
            const buf = await fs.readFile('./data/' + list[body.id] + ".json")
            let playlist = JSON.parse(buf)
            if (playlist) {
                let songs = playlist.songs
                let position = playlist.indexOf(body.song)
                songs[position] = body.song
            }
        }
    } catch (error) {
        res.status(500).send({error});
    }
});

/**
 *
 */
app.delete('/playlist/song', async (req, res) => {
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
