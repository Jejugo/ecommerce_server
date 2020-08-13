customerByTokenResponse = (customer) => ({
  id: customer.id,
  name: customer.name,
  securityNumber: customer.securityNumber,
  email: customer.email,
  active: 1,
  createdAt: customer.createdAt,
  updatedAt: customer.updatedAt,
  address: {
    id: customer["address.id"],
    street: customer["address.street"],
    neighborhood: customer["address.neighborhood"],
    number: customer["address.number"],
    zipcode: customer["address.zipcode"],
    complement: customer["address.complement"],
    createdAt: customer["address.createdAt"],
    updatedAt: customer["address.updatedAt"],
  }
})

module.exports = {
  customerByTokenResponse,
}
