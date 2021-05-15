module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    street: DataTypes.STRING,
    neighborhood: DataTypes.STRING,
    number: DataTypes.STRING,
    city: DataTypes.STRING,
    zipcode: DataTypes.STRING(8),
    complement: DataTypes.STRING
  });

  //m x n relationship
  Address.associate = (models) => {
    Address.belongsToMany(models.Customer, {
      through: 'Customer_Address',
      as: 'customer',
      foreignKey: 'addressId'
    })
  }
 
  return Address;
}