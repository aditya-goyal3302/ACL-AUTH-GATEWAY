'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert('Acls', [])

  },

  async down(queryInterface, Sequelize) {
    queryInterface.truncate('Acls')
  }
};
