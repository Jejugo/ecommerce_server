module.exports = (sequelize, DataTypes) => {
  const CustomerStripe = sequelize.define("Customer_Stripe", {
    customerEmail: DataTypes.INTEGER,
    stripeId: DataTypes.STRING
  })

  return CustomerStripe
}
