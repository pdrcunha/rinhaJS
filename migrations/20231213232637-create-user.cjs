'use strict';
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID
      },
      apelido: {
        type: DataTypes.STRING(32),
        allowNull: false,
        unique: true
      },
      nome: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      nascimento: {
        type: DataTypes.DATE,
        allowNull: false
      },
      stack: {
        type: DataTypes.TEXT(),
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
