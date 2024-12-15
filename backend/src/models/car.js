const sequelizeInstance = require('../sequelizeInstance')
const { DataTypes } = require('sequelize');

const Car = sequelizeInstance.define('Car', {
    id: {
        type: DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true
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
    image: {
        type: DataTypes.STRING(200),
        allowNull: true
    }
})

module.exports = Car;