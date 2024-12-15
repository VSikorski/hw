const express = require('express');
const path = require('path');
const app = express();

const frontendPath = path.join(__dirname, '../../frontend');

app.use(express.json());
app.use(express.static(frontendPath));

/* ---------------------------------- REST API ---------------------------------- */

app.get('/api', (req, res) => {
    res.send('Welcome to the HW api\n');
})

app.post('/api/post/car', (req, res) => {

    const carData = req.body;

    if (!carData.name) {
        return res.status(400).json({
            error: 'Name is a required field\n'
        });
    }

    res.send(`Received the following data: ${JSON.stringify(carData)}\n`);
})


/* ------------------------------ DOCUMENT SERVING ------------------------------ */

app.get('/', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
})

module.exports = app;