const express = require('express');
const path = require('path');
const app = express();

const frontendPath = path.join(__dirname, '../../frontend');

app.use(express.json());
app.use(express.static(frontendPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
})

module.exports = app;