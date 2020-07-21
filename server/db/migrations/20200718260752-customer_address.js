'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('Customer_Address', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    addressId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Addresses', key: 'id'
      },
      onDelete: 'CASCADE'
    },
    customerId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Customers', key: 'id'
      },
      onDelete: 'CASCADE'
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

  down: async (queryInterface, Sequelize) => queryInterface.dropTable('Customer_Address')
};
