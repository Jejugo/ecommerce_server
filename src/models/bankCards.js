module.exports = (sequelize, DataTypes) => {
  const BankCard = sequelize.define('BankCard', {
    customerId: DataTypes.INTEGER,
    number: DataTypes.STRING,
    flag: DataTypes.STRING,
    expiration: DataTypes.DATE,
    cvv: DataTypes.STRING,
    name: DataTypes.STRING
  });

  return BankCard;
}