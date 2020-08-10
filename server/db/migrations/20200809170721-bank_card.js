'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('BankCards', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    customerId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Customers', key: 'id'
      },
      onDelete: 'CASCADE'
    },
    number: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true,
    },
    flag: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    expiration: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    cvv: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: async (queryInterface, Sequelize) => queryInterface.dropTable('BankCards')
};
