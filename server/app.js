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

app.get('/', async (req, res) => {

})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
