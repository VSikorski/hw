const Car = require('./car');
const Series = require('./series');

const associateModels = () => {
  Series.hasMany(Car, { foreignKey: 'series_1', as: 'CarsSeries1' });
  Series.hasMany(Car, { foreignKey: 'series_2', as: 'CarsSeries2' });
  Series.hasMany(Car, { foreignKey: 'series_3', as: 'CarsSeries3' });

  Car.belongsTo(Series, { foreignKey: 'series_1', as: 'Series1' });
  Car.belongsTo(Series, { foreignKey: 'series_2', as: 'Series2' });
  Car.belongsTo(Series, { foreignKey: 'series_3', as: 'Series3' });
};

module.exports = associateModels;
