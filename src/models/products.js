module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    img: DataTypes.STRING,
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
  })

  //m x n relationship
  Product.associate = (models) => {
    Product.belongsToMany(models.Customer, {
      through: "Purchase",
      as: "customer",
      foreignKey: "purchaseId",
    })
  }

  return Product
}
