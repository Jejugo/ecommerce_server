const makeCheckoutAction = ({ stripe, uuid }) => {
  return async function checkoutAction({ token, product, quantity, address }){
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    })

    const idempotency_key = uuid()

    const charge = await stripe.charges.create({
      amount: product.price * quantity * 100,
      currency: 'brl',
      customer: customer.id,
      receipt_email: token.email,
      description: `Congratulations! You just purched the item: ${product.name}!`,
      shipping: {
        name: token.card.name,
        address: {
          line1: `${address.street} ${address.number}`,
          line2: address.complement,
          city: 'Vinhedo',
          country: 'Brazil',
          postal_code: address.zipcode,
        }
      }

    },{
      idempotency_key
    })

    console.log('Successfully Purchased!!', charge, customer)
    return {
      charge,
      customer
    }
  }
}

module.exports = makeCheckoutAction