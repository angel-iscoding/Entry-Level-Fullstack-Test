'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('users', 'email', {
      type: Sequelize.STRING(255),
      allowNull: false
    });

    await queryInterface.changeColumn('users', 'password', {
      type: Sequelize.STRING(255),
      allowNull: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('users', 'email', {
      type: Sequelize.TEXT,
      allowNull: false
    });

    await queryInterface.changeColumn('users', 'password', {
      type: Sequelize.TEXT,
      allowNull: false
    });
  }
};
