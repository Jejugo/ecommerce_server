const makeCheckoutAction = ({ stripe, uuid, Customer_Stripe }) => {

  const saveUserToDatabase = async (email, customerPurchase) => Customer_Stripe.create({
    customerEmail: email,
    stripeId: customerPurchase.id
  })

  const retrieveFromDatabase = async (email) => {
    return Customer_Stripe.findOne({
      where: {
        customerEmail: email,
      },
      raw: true,
    })
  }

  const chargeUser = async ({ product, customer, address, quantity, customerStripeId }) => {
    const idempotencyKey = uuid()

    return stripe.charges.create({
      amount: product.price * quantity * 100,
      currency: 'brl',
      customer: customerStripeId,
      receipt_email: customer.email,
      description: `Congratulations! You just purched the item: ${product.name}!`,
      shipping: {
        address: {
          line1: address.line1,
          city: 'Manaus',
          country: address.country,
          postal_code: address.zipcode,
        }
      }

    },{
      idempotencyKey
    })
  }


  return async function checkoutAction({ payment_method_id, customer, product, quantity, address }){

    const userDb = await retrieveFromDatabase(customer.email)
    if(!userDb){
      const customerPurchase = await stripe.customers.create({
        email: customer.email,
        name: customer.name,
        address,
        payment_method: payment_method_id
      })

      await saveUserToDatabase(customer.email, customerPurchase)
      charge = await chargeUser({ product, customer, address, quantity, customerStripeId: customerPurchase.id})

      console.log('Successfully Purchased!!', charge, customer)
      return {
        charge,
        customer
      }
    }

    else{
      console.log('User already exists')
      console.log(userDb)
      charge = await chargeUser({ product, customer, address, quantity, customerStripeId: userDb.stripeId })

      console.log('Successfully Purchased!!', charge, customer)
      return {
        charge,
        customer
      }
    }
  }
}

module.exports = makeCheckoutAction