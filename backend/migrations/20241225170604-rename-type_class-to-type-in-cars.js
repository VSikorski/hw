'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Cars', 'type_class', 'type');
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Cars', 'type', 'type_class');
  },
};
