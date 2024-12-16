const express = require('express');
const path = require('path');
const app = express();
const Car = require('./models/car');

const frontendPath = path.join(__dirname, '../../frontend');

app.use(express.json());
app.use(express.static(frontendPath));

/* ---------------------------------- REST API ---------------------------------- */

app.get('/api', (req, res) => {
    res.send('Welcome to the HW api\n');
})

app.get('/api/get/car', async (req,res) => {
    const {id} = req.query;

    if (!id) {
        return res.status(400).json({ error: '`id` is a required parameter' })
    }

    try {
        const car = await Car.findByPk(id);
        if (!car) {
            return res.status(404).json({ error: `Car record with specified '${id} id' not found` })
        }
        res.status(200).json(car);
    } catch (err) {
        console.log(error);
        res.status(500).json({ error: 'Error occured fetching car record'})
    }

})

app.get('/api/get/cars', async (req,res) => {
    const {year} = req.query;

    try {
        let cars;
        if (!year) {
            cars = await Car.findAll();
        } else {
            cars = await Car.findAll({
                where: {
                    year: parseInt(year, 10)
                }
            });
        }
        res.status(200).json({cars});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error occured fetching car records'})
    }
})

app.post('/api/post/car', async (req, res) => {

    const carData = req.body;

    if (!carData.id) {
        return res.status(400).json({
            error: '`id` is a required field'
        });
    } else if (!carData.name) {
        return res.status(400).json({
            error: '`name` is a required field'
        });
    } else if (!carData.year) {
        return res.status(400).json({
            error: '`year` is a required field'
        });
    }

    try {
        const car = await Car.create(carData);
        res.status(201).json({ message: 'Car record successfully inserted', data: carData});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error occurred while inserting car record' })
    }

})


/* ------------------------------ DOCUMENT SERVING ------------------------------ */

app.get('/', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
})

module.exports = app;