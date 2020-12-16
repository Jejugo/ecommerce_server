module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    name: DataTypes.STRING,
    securityNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    stripeId: DataTypes.STRING
  });

  //m x n relationship
  Customer.associate = (models) => {
    Customer.belongsToMany(models.Address, {
      through: 'Customer_Address',
      as: 'address',
      foreignKey: 'customerId'
    })

    Customer.belongsToMany(models.Product, {
      through: 'Purchase',
      as: 'product',
      foreignKey: 'customerId'
    })
  }

  return Customer;
}