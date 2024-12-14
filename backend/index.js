const express = require('express');
const path = require('path');
const app = express();

const frontendPath = path.join(__dirname, '../frontend')

app.use(express.static(frontendPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
})

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000/');
})