const makeUpdateCustomer = ({ Customer, Address }) => {
  const updateCustomerById = async (id, customer) => {
    const CustomerInstance = await Customer.findOne({ where: { id } });

    (CustomerInstance.name = customer.name),
      (CustomerInstance.email = customer.email);
    CustomerInstance.updatedAt = new Date().toISOString();
    CustomerInstance.save();

    return CustomerInstance;
  };

  const updateAddress = async (customerUpdated, address) => {
    //for now, customer can only have ONE address.
    //That is why Im getting only the first occurance
    try {
      const [AddressInst] = await customerUpdated.getAddress();
      if (AddressInst) {
        return AddressInst.update({
          street: address.street,
          neighborhood: address.neighborhood,
          city: address.city,
          number: address.number,
          zipcode: address.zipcode,
          complement: address.complement,
          updatedAt: new Date().toISOString(),
        });
      }

      const addressCreated = await Address.create({
        street: address.street,
        neighborhood: address.neighborhood,
        number: address.number,
        city: address.city,
        zipcode: address.zipcode,
        complement: address.complement,
        updatedAt: new Date().toISOString(),
      });

      const id = addressCreated.get({ plain: true }).id;
      customerUpdated.setAddress([id]);
    } catch (err) {
      console.error('There was an error saving the address: ', err);
    }
  };

  return async function updateCustomer({ id, customer }) {
    const customerUpdated = await updateCustomerById(id, customer.personalData);
    await updateAddress(customerUpdated, customer.address);

    const customerRaw = customerUpdated.get({ plain: true });

    const { password, ...customerData } = customerRaw;

    return {
      status: 'success',
      ...customerData,
      address: {
        ...customer.address,
      },
    };
  };
};

module.exports = makeUpdateCustomer;
