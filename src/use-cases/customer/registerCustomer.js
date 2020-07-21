const { customer: customerEntity } = require("../../entities")
const { address: addressEntity } = require("../../entities")

const makeRegisterCustomer = ({ bcrypt, Customer, Address }) => {

  const saveToDb = async (customer, addresses, hashedPassword) => {
    const customerCreate = await Customer.create({
      name: customer.getName(),
      securityNumber: customer.getSecurityNumber(),
      email: customer.getEmail(),
      password: hashedPassword,
    })

    //create all addresses for single customer. 
    const addressesCreated = await Promise.all(
      addresses.map((address) =>
        Address.create({
          street: address.getStreet(),
          number: address.getNumber(),
          neighborhood: address.getNeighborhood(),
          complement: address.getComplement(),
          zipcode: address.getZipcode(),
        })
      )
    )
    const idList = addressesCreated.map((addressCreated) =>
      addressCreated.get({ plain: true }).id
    )

    await Promise.all(idList.map((id) => customerCreate.setAddress([id])))
  }

  const findCustomer = async (name) =>
    Customer.findOne({
      where: {
        name,
      },
    })

  return async function registerCustomer(customerBody) {
    const addresses = customerBody.addresses.map((address) =>
      addressEntity({ ...address })
    )
    const customer = customerEntity({
      ...customerBody,
    })

    const customerFound = await findCustomer(customer.getName())

    if (customerFound) {
      throw new Error("Customer already exists.")
    }

    const hashedPassword = await bcrypt.hash(customer.getPassword(), 10)
    await saveToDb(customer, addresses, hashedPassword)

    return {
      message: "Data saved successfully.",
      data: customer,
    }
  }
}

module.exports = makeRegisterCustomer
