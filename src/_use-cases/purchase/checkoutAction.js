const makeCheckoutAction = ({ stripe }) => {

  const createStripeCustomer = async (customer) => {
    const newUser = await stripe.customers.create({
      ...customer,
      description: `New user created: ${customer.name}`,
    })

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 10,
      currency: 'brl',
      customer: newUser.id
    })

    return {
      newUser,
      paymentIntent
    }
  }

  return async function checkoutAction({ amount, customer }) {
    return createStripeCustomer(customer)
  }
}

module.exports = makeCheckoutAction