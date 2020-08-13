module.exports = (sequelize, DataTypes) => {
  const Purchase = sequelize.define("Purchase", {
    idCustomer: DataTypes.INTEGER,
    idProduct: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  })

  return Purchase
}
