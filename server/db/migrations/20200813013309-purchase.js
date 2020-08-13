'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('Purchase', {
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
    productId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Products', key: 'id'
      },
      onDelete: 'CASCADE'
    },
    quantity: {
      allowNull: false,
      type: Sequelize.INTEGER,
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

  down: async (queryInterface, Sequelize) => queryInterface.dropTable('Purchase')
};
