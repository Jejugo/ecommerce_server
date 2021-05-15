const customerByTokenResponse = (customer) => ({
  id: customer.id,
  name: customer.name,
  securityNumber: customer.securityNumber,
  email: customer.email,
  stripeId: customer.stripeId,
  active: 1,
  createdAt: customer.createdAt,
  updatedAt: customer.updatedAt,
  address: {
    id: customer["address.id"],
    street: customer["address.street"],
    neighborhood: customer["address.neighborhood"],
    city: customer["address.city"],
    number: customer["address.number"],
    zipcode: customer["address.zipcode"],
    complement: customer["address.complement"],
    createdAt: customer["address.createdAt"],
    updatedAt: customer["address.updatedAt"]
  }
})

const customerRegistration = (customer, hashedPassword, stripeId) => ({
  name: customer.getName(),
  securityNumber: customer.getSecurityNumber(),
  email: customer.getEmail(),
  active: customer.getActive(),
  password: hashedPassword,
  stripeId
})

module.exports = {
  customerByTokenResponse,
  customerRegistration
}
