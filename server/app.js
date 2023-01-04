const express = require('express');
const app = express();
const fs = require('fs/promises');

const PORT = 5000;

app
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
  });

// Add Playlist (C, Create)
app.post('/playlist/', async (req, res) => {
  try{
  const playlist = req.body;
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
  const newId = { id: maxTaskId + 1, ...task };
    const newPlaylist = currentPlaylists ? [...currentPlaylists, newId] : [newId];
    await fs.writeFile('./data/playlists.json', JSON.stringify(newPlaylist));
    res.send(newPlaylist);
  }
  catch (error){
    res.status(500).send({ error: error.stack });
  }
});

// Add Playlist (C, Create)
app.patch('/playlist/song', async (req, res) => {
  try{const body = req.body
    const buffer = await fs.readFile('./data/playlists.json');
    let list = JSON.parse(buffer);
    if (body.id && list && list.length > 0) {
        const id = body.id
        const buf = await fs.readFile('./data/' + list[id] + ".json")
        let playlist = JSON.parse(buf)
        if (playlist) {
            let songs = playlist.songs
            songs.append(req.body.song)
          }
      }}
    catch(error){
      res.status(500).send({error});
    }
});

// Get List of Playlists (R, Read)
app.get('/playlist/', async (req, res) => {
  try {
      const buffer = await fs.readFile('./data/playlists.json');
      let list = JSON.parse(buffer);
      res.send(list);
  } catch (e) {
      res.status(500).send({e});
  }
});

// Get Playlist (R, Read)
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

// Delete Playlist (D, Delete)
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
      res.send({ message: `Spellistan med namnet ${body.playListName} togs bort` });
    } else {
      res.status(404).send({ error: 'Ingen spellista att ta bort' });
    }
  } catch (error) {
    res.status(500).send({ error: error.stack });
  }

});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
