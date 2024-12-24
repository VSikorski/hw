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
    type_class: {
        type: DataTypes.STRING(15)
    },
    image: {
        type: DataTypes.STRING(200)
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
    }
})

Car.belongsTo(Series, { foreignKey: 'series_1', as: 'Series1' });
Car.belongsTo(Series, { foreignKey: 'series_2', as: 'Series2' });
Car.belongsTo(Series, { foreignKey: 'series_3', as: 'Series3' });

module.exports = Car;