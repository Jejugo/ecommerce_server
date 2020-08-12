const makeUpdateCustomer = ({ Customer }) => {
  const updateCustomerById = async (id, customer) =>{
    const CustomerInstance = await Customer.findOne({where: { id }})

    CustomerInstance.name = customer.name,
    CustomerInstance.email = customer.email
    CustomerInstance.updatedAt = new Date().toISOString()
    CustomerInstance.save()

    return CustomerInstance
  }

  const updateAddress = async (customerUpdated, address) => {
    //for now, customer can only have ONE address.
    //That is why Im getting only the first occurance
    const [ Address ] = await customerUpdated.getAddress()
    return Address.update({
      street: address.street,
      neighborhood: address.neighborhood,
      number: address.number,
      zipcode: address.zipcode,
      complement: address.complement,
      updatedAt: new Date().toISOString()
    })
  }
  

  return async function updateCustomer({ id, customer }) {

    const customerUpdated = await updateCustomerById(id, customer.personalData)
    await updateAddress(customerUpdated, customer.address)
    
    const customerRaw = customerUpdated.get({ plain: true })

    const { password, ...customerData } = customerRaw

    return {
      status: 'success',
      ...customerData,
      address: {
        ...customer.address
      }
    }
  }
}

module.exports = makeUpdateCustomer
