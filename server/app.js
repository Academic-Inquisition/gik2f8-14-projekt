const express = require('express');
const app = express();
const fs = require('fs/promises');
const fss = require('fs')
const path = require("path");

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
        if (!fss.existsSync("./data/playlists.json")) {
            console.log("File './data/playlists.json' not found, creating file")
            await fs.writeFile('./data/playlists.json', JSON.stringify([]));
        }
        const listBuffer = await fs.readFile('./data/playlists.json');
        const currentPlaylists = JSON.parse(listBuffer);
        let maxListId = 0;
        if (currentPlaylists && currentPlaylists.length > 0) {
            maxListId = currentPlaylists.reduce(
                (maxId, current) => current.id > maxId ? current.id : maxId, maxListId
            );
        }
        const newId = [body.playListName.toLowerCase() + ".json"];
        const newPlaylist = currentPlaylists ? [...currentPlaylists, body.playListName.toLowerCase() + ".json"] : [newId];
        const plData = body ? {id: maxListId + 1, ...body} : [body];
        await fs.writeFile('./data/playlists.json', JSON.stringify(newPlaylist, null, 2));
        await fss.mkdir(path.join(__dirname, '/data/playlist'), {recursive: true},(err) => {
            if (err) return console.log(err)
        })
        await fs.writeFile(`./data/playlist/${body.playListName.toLowerCase()}.json`, JSON.stringify(plData, null, 2))
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
        let id = req.params.id;
        if (!id.endsWith(".json")) id = id + ".json"
        const file = await fs.readFile('./data/playlist/' + id);
        let playlist = JSON.parse(file);
        console.log(playlist);
        res.send(playlist);
    } catch (e) {
        res.status(500);//.send({e});
    }
});

/**
 * Method: DELETE
 * Comment: Removes a specific playlist from the backend.
 */
app.delete('/tasks/playlist/:id', async (req, res) => {
    try {
        const body = req.body
        const id = req.params.id.toLowerCase();
        const listBuffer = await fs.readFile('./data/playlists.json');
        const currentPlaylists = JSON.parse(listBuffer);
        if (currentPlaylists.length > 0) {
            await fs.writeFile('./data/playlists.json',
                JSON.stringify(currentPlaylists.filter((playlist) => playlist !== id + ".json"))
            );
            console.log(__dirname + `/data/playlist/${id + ".json"}`)
            await fs.unlink(__dirname + `/data/playlist/${id + ".json"}`)
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
        const body = req.body;
        console.log(body);
        const buffer = await fs.readFile('./data/playlists.json');
        let list = JSON.parse(buffer);
        if (list && list.length > 0) {
            const buf = await fs.readFile('./data/playlist/' + body.id.toLowerCase() + ".json");
            let playlist = JSON.parse(buf);
            let maxSongId = 0;
            if (playlist["songs"] && playlist["songs"].length > 0) {
                for (let i = 0; i < playlist["songs"].length; i++) {
                    let songs = playlist["songs"]
                    let song = songs[i]
                    song.id = i
                }
                maxSongId = playlist["songs"].length;
            }
            if (playlist) {
                let fn = body.id.toLowerCase() + ".json";
                body.id = maxSongId;
                playlist["songs"].push(body);
                await fs.writeFile('./data/playlist/' + fn, JSON.stringify(playlist, null, 2));
                res.send({message: `Låten med namnet ${body.songName} lades till`, dat: playlist});
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
app.delete('/tasks/playlist/song/:id', async (req, res) => {
    try {
        const body = req.body;
        if (body.song_id != null) {
            let fn = req.params.id + ".json";
            const buf = await fs.readFile('./data/playlist/' + fn);
            let playlist = JSON.parse(buf);
            if (playlist) {
                let songs = playlist.songs;
                for (let song in songs) {
                    if (songs[song].id === body.song_id) {
                        songs.splice(song, 1)
                        if (songs && playlist["songs"].length > 0) {
                            for (let i = 0; i < playlist["songs"].length; i++) {
                                let songs = playlist["songs"]
                                let song = songs[i]
                                song.id = i
                            }
                        }
                        await fs.writeFile('./data/playlist/' + fn, JSON.stringify(playlist, null, 2));
                        res.send({message: `Låten med id ${body.song_id} togs bort till`, dat: playlist});
                        break;
                    }
                }
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



/**
 * NYI
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
            }
        }
    } catch (error) {
        res.status(500).send({error});
    }
});