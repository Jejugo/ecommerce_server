'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('Customer_Stripes', {
     id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    customerEmail: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    stripeId: {
      allowNull: false,
      type: Sequelize.STRING,
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

  down: async (queryInterface, Sequelize) => queryInterface.dropTable('Customer_Stripes')
};
