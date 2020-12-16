const makeCheckoutAction = ({ stripe, Customer }) => {

  const findCustomer = (email) =>
  Customer.findOne({
    where: {
      email,
    },
    raw: true
  })

  return async function checkoutAction({ amount, customer }){
    const { stripeId } = await findCustomer(customer.email)

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount*10,
      currency: 'brl',
      customer: stripeId
    })

    return {
      paymentIntent
    }
  }
}

module.exports = makeCheckoutAction