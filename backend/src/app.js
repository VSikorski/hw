const express = require('express');
const app = express();
const cors = require('cors');
const Car = require('./models/car');
const Series = require('./models/series');

app.use(cors());
app.use(express.json());

/* ---------------------------------- REST API ---------------------------------- */

app.get('/api', (req, res) => {
    return res.send('Welcome to the HW api\n');
})

/* ----------------------- Series ----------------------- */

app.post('/api/post/series', async (req, res) => {
    const seriesData = req.body;
    if (!seriesData.type) {
        return res.status(400).json({
            error: '`type` is a required field'
        });
    } else if (!seriesData.name) {
        return res.status(400).json({
            error: '`name` is a required field'
        });
    } else if (!seriesData.year) {
        return res.status(400).json({
            error: '`year` is a required field'
        });
    } else if (!seriesData.setCount) {
        return res.status(400).json({
            error: '`setCount` is a required field'
        });
    }
    try {
        const series = await Series.create(seriesData);
        return res.status(201).json({ message: 'Series record successfully inserted', data: series });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error occurred while inserting series record' });
    }
})

app.get('/api/get/series/all', async (req,res) => {
    const {year} = req.query;
    try {
        let series;
        if (!year) {
            series = await Series.findAll();
        } else {
            series = await Series.findAll({
                where: {
                    year: parseInt(year, 10)
                }
            });
        }
        return res.status(200).json({series});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error occured fetching series records'});
    }
})

app.get('/api/get/series', async (req,res) => {
    const {id} = req.query;
    if (!id) {
        return res.status(400).json({ error: '`id` is a required parameter' });
    }
    try {
        const series = await Series.findByPk(id);
        if (!series) {
            return res.status(404).json({ error: `Series record with specified id '${id}' not found` });
        }
        return res.status(200).json(series);
    } catch (err) {
        console.log(error);
        return res.status(500).json({ error: 'Error occured fetching series record'});
    }
})

app.delete('/api/delete/series', async (req, res) => {
    const {id} = req.query;
    if (!id) {
        return res.status(400).json({ error: '`id` is a required parameter' });
    }
    try {
        const series = await Car.findByPk(id);
        if (!series) {
            return res.status(404).json({ error: `Series record with specified id '${id}' not found` });
        }
        await series.destroy();
        return res.status(200).json({ message: `Series record with id '${id}' successfully deleted` });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error occurred deleting series record' });
    }
})

app.patch('/api/patch/series', async (req, res) => {
    const {id} = req.query;
    const newSeriesData = req.body;
    if (!id) {
        return res.status(400).json({ error: '`id` is a required parameter' });
    }
    try {
        const series = await Series.findByPk(id);
        if (!series) {
            return res.status(404).json({ error: `Series record with specified id '${id}' not found` });
        }
        if (newSeriesData.type) {
            series.type = newSeriesData.type;
        }
        if (newSeriesData.name) {
            series.name = newSeriesData.name;
        }
        if (newSeriesData.year) {
            series.year = newSeriesData.year;
        }
        if (newSeriesData.setCount) {
            series.setCount = newSeriesData.setCount;
        }
        await series.save();
        return res.status(200).json({ message: `Series record with id '${id}' successfully updated`, data: series });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error occurred updating series record' });
    }
})

/* ------------------------ Cars ------------------------ */

app.patch('/api/patch/car', async (req, res) => {
    const {id} = req.query;
    const newCarData = req.body;
    if (!id) {
        return res.status(400).json({ error: '`id` is a required parameter' });
    }
    try {
        const car = await Car.findByPk(id);
        if (!car) {
            return res.status(404).json({ error: `Car record with specified id '${id}' not found` });
        }
        if (newCarData.name) {
            car.name = newCarData.name;
        }
        if (newCarData.year) {
            car.year = newCarData.year;
        }
        if (newCarData.type) {
            car.type = newCarData.type;
        }
        if (newCarData.image) {
            car.image = newCarData.image;
        }
        if (newCarData.series_1) {
            car.series_1 = newCarData.series_1;
        }
        if (newCarData.series_2) {
            car.series_2 = newCarData.series_2;
        }
        if (newCarData.series_3) {
            car.series_3 = newCarData.series_3;
        }
        await car.save();
        return res.status(200).json({ message: `Car record with id '${id}' successfully updated`, data: car });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error occurred updating car record' });
    }
})

app.delete('/api/delete/car', async (req, res) => {
    const {id} = req.query;
    if (!id) {
        return res.status(400).json({ error: '`id` is a required parameter' });
    }
    try {
        const car = await Car.findByPk(id);
        if (!car) {
            return res.status(404).json({ error: `Car record with specified id:'${id}' not found` });
        }
        await car.destroy();
        return res.status(200).json({ message: `Car record with id '${id}' successfully deleted` });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error occurred deleting car record' });
    }
})

app.get('/api/get/car', async (req,res) => {
    const {id} = req.query;
    if (!id) {
        return res.status(400).json({ error: '`id` is a required parameter' });
    }
    try {
        const car = await Car.findByPk(id);
        if (!car) {
            return res.status(404).json({ error: `Car record with specified id '${id}' not found` });
        }
        return res.status(200).json(car);
    } catch (err) {
        console.log(error);
        return res.status(500).json({ error: 'Error occured fetching car record'});
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
        return res.status(200).json({cars});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error occured fetching car records'});
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
        return res.status(201).json({ message: 'Car record successfully inserted', data: car});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error occurred while inserting car record' });
    }
})

module.exports = app;