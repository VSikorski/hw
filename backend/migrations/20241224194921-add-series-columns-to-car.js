'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Cars', 'series_1', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Series',
        key: 'id'
      }
    });
    await queryInterface.addColumn('Cars', 'series_2', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Series',
        key: 'id'
      }
    });
    await queryInterface.addColumn('Cars', 'series_3', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Series',
        key: 'id'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Cars', 'series_1');
    await queryInterface.removeColumn('Cars', 'series_2');
    await queryInterface.removeColumn('Cars', 'series_3');
  }
};
