const sequelizeInstance = require('../sequelizeInstance')
const { DataTypes } = require('sequelize');

const Car = sequelizeInstance.define('Car', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Car;