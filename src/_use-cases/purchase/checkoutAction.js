const makeCheckoutAction = ({ stripeMethods, Customer }) => {

  const saveToStripe = ({ name, email }) => stripeMethods.createUser({
    name: name,
    email: email,
  }).catch(err => {
    console.log('error: ', err)
  })

  const updateCustomer = (customer) => Customer.update(
    {
      stripeId: customer.id
    },
    {
      where: {
        email: customer.email,
      },
    }
  ).catch(err => {
    console.error('erro:', err)
    new Error('ERROR_FIND_CUSTOMER')
  })

  return async function checkoutAction({ amount, customer }) {
    const retrievedUser = await stripeMethods.isStripeUser(customer)
    if (!retrievedUser || retrievedUser.deleted) {
      customer = await saveToStripe(customer)
      console.log('atualizando banco para:', customer)
      await updateCustomer(customer)
    }

    const paymentIntent = await stripeMethods.createPaymentIntent(amount, customer)
    return {
      paymentIntent,
      customer
    }
  }
}

module.exports = makeCheckoutAction