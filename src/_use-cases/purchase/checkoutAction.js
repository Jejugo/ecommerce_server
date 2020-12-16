const makeCheckoutAction = ({ stripe }) => {
  return async function checkoutAction({ amount, customer }){
    console.log('realizando o pagamento', amount)
    console.log('usuario: ', customer)
    const newUser = await stripe.customers.create({
        ...customer,
        description: `New user created: ${customer.name}`,
    })

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount*10,
      currency: 'brl',
      customer: newUser.id
    })

    return {
      paymentIntent,
      newUser
    }
  }
}

module.exports = makeCheckoutAction