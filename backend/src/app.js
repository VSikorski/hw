const express = require('express');
const app = express();
const cors = require('cors');
const Car = require('./models/car');
const Series = require('./models/series');
const associateModels = require('./models/associations');
associateModels();

app.use(cors());
app.use(express.json());

/* ---------------------------------- REST API ---------------------------------- */

app.get('/api', (req, res) => {
    return res.send('Welcome to the HW api\n');
})

/* ----------------------- Series ----------------------- */

app.post('/api/post/series', async (req, res) => {
    const seriesData = req.body;

    seriesData.id = parseInt(series.id, 10);
    seriesData.year = parseInt(series.year, 10);
    seriesData.setCount = parseInt(series.setCount, 10);

    if (isNaN(series.id)) {
        return res.status(400).json({
            error: '`id` is a required field'
        });
    } else if (!seriesData.type) {
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

    const dupSeries = await Series.findByPk(seriesData.id);
    if (dupSeries) {
        return res.status(400).json({ error: `Series record with specified id '${seriesData.id}' already exists` });
    }

    try {
        const series = await Series.create(seriesData);
        return res.status(201).json({ message: 'Series record successfully inserted', data: series });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error occurred while inserting series record' });
    }
})

app.post('/api/post/series/bulk', async (req, res) => {
    const seriesData = req.body;
    let seriesArr = [];
    let messageLog = '';
    
    if (!Array.isArray(seriesData)) {
        return res.status(400).json({ error: 'Message body must be an array.' });
    }
    if (seriesData.length === 0) {
        return res.status(400).json({ error: 'Array cannot be empty.' });
    }

    const operations = seriesData.map(async (series) => {
        series.id = parseInt(series.id, 10);
        series.year = parseInt(series.year, 10);
        series.setCount = parseInt(series.setCount, 10);

        if (isNaN(series.id)) {
            messageLog += '- Series is missing a valid `id` and was skipped.\n';
            return;
        }
        if (!series.type) {
            messageLog += `- Series with id: ${series.id} is missing the required parameter \`type\` and was skipped.\n`;
            return;
        }
        if (!series.name) {
            messageLog += `- Series with id: ${series.id} is missing the required parameter \`name\` and was skipped.\n`;
            return;
        }
        if (isNaN(series.year)) {
            messageLog += `- Series with id: ${series.id} is missing a valid \`year\` and was skipped.\n`;
            return;
        }
        if (isNaN(series.setCount)) {
            messageLog += `- Series with id: ${series.id} is missing a valid \`setCount\` and was skipped.\n`;
            return;
        }

        const dupSeries = await Series.findByPk(series.id);
        if (dupSeries) {
            messageLog += `- Series with id: ${series.id} contains a duplicate in the database and was skipped.\n`;
            return;
        }

        try {
            const newSeries = await Series.create(series);
            seriesArr.push(newSeries);
        } catch (error) {
            console.log(error);
            messageLog += `- Error creating a new series record with id: ${series.id}. Error: ${error.message}\n`;
        }
    });

    await Promise.all(operations);

    const responseMessage = seriesArr.length > 0 
        ? 'Series were successfully inserted.'
        : 'No records were inserted.';
    
    return res.status(seriesArr.length > 0 ? 201 : 400).json({ 
        message: responseMessage, 
        log: messageLog, 
        insertedRecords: seriesArr 
    });
});


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
        const series = await Series.findByPk(id);
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
        const car = await Car.findByPk(id, {
            attributes: {
                exclude: ['series_1', 'series_2', 'series_3', 'createdAt', 'updatedAt']
            },
            include: [
                {
                    model: Series,
                    as: 'series1',
                    attributes: {exclude: ['createdAt', 'updatedAt']}
                },
                {
                    model: Series,
                    as: 'series2',
                    attributes: {exclude: ['createdAt', 'updatedAt']}
                },
                {
                    model: Series,
                    as: 'series3',
                    attributes: {exclude: ['createdAt', 'updatedAt']}
                }
            ]
        });
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
            cars = await Car.findAll({
                attributes: {
                    exclude: ['series_1', 'series_2', 'series_3', 'createdAt', 'updatedAt']
                },
                include: [
                    {
                        model: Series,
                        as: 'series1',
                        attributes: {exclude: ['createdAt', 'updatedAt']}
                    },
                    {
                        model: Series,
                        as: 'series2',
                        attributes: {exclude: ['createdAt', 'updatedAt']}
                    },
                    {
                        model: Series,
                        as: 'series3',
                        attributes: {exclude: ['createdAt', 'updatedAt']}
                    }
                ]
            });
        } else {
            cars = await Car.findAll({
                where: {
                    year: parseInt(year, 10)
                },
                attributes: {
                    exclude: ['series_1', 'series_2', 'series_3', 'createdAt', 'updatedAt']
                },
                include: [
                    {
                        model: Series,
                        as: 'series1',
                        attributes: {exclude: ['createdAt', 'updatedAt']}
                    },
                    {
                        model: Series,
                        as: 'series2',
                        attributes: {exclude: ['createdAt', 'updatedAt']}
                    },
                    {
                        model: Series,
                        as: 'series3',
                        attributes: {exclude: ['createdAt', 'updatedAt']}
                    }
                ]
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