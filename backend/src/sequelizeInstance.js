const { Sequelize } = require('sequelize');

const sequelizeInstance = new Sequelize('postgres://user:1323@localhost:5432/hwdatabase');

module.exports = sequelizeInstance;
