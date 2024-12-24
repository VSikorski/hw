const sequelizeInstance = require('../sequelizeInstance')
const { DataTypes } = require('sequelize');

const Series = sequelizeInstance.define('Series', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type_class: {
        type: DataTypes.STRING(15)
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
    set_count: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = Series;