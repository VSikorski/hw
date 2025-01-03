const sequelizeInstance = require('../sequelizeInstance')
const { DataTypes } = require('sequelize');
const Series = require('./series');

const Car = sequelizeInstance.define('Car', {
    id: {
        type: DataTypes.STRING(10),
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1967,
            max: new Date().getFullYear() + 3
        }
    },
    type: {
        type: DataTypes.STRING(15)
    },
    series_1: {
        type: DataTypes.INTEGER,
        references: {
            model: Series,
            key: 'id'
        }
    },
    series_2: {
        type: DataTypes.INTEGER,
        references: {
            model: Series,
            key: 'id'
        }
    },
    series_3: {
        type: DataTypes.INTEGER,
        references: {
            model: Series,
            key: 'id'
        }
    },
    image: {
        type: DataTypes.STRING(200)
    },
})

module.exports = Car;