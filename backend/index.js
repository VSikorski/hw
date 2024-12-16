const app = require('./src/app');
const sequelize = require('./src/sequelizeInstance');
const path = require('path');

sequelize.sync()
    .then(() => {
        console.log('All models are synchronized with the database');
    })
    .catch(err => {
        console.error('Error syncing models:', err);
    });

    
const port = 3000;
app.listen(port, () => {
    console.log('Server running on http://localhost:3000/');
    //console.log('dir: ' + path.join(__dirname, '../../'));
})