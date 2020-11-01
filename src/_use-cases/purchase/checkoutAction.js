const makeCheckoutAction = ({ stripe, uuid, Customer_Stripe }) => {
  return async function checkoutAction({ amount }){

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 50,
      currency: 'brl'
    })

    return {
      paymentIntent
    }
  }
}

module.exports = makeCheckoutAction