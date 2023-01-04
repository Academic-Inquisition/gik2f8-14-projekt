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

// Get Index (R, Read)
app.get('/', async (req, res) => {

})

// Add Playlist (C, Create)
app.put('/playlist/', async (req, res) => {

})

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
})

// Delete Playlist (D, Delete)
app.delete('/playlist/:id', async (req, res) => {

})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
