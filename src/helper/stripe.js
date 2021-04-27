
const stripe = require('stripe')('sk_test_51HEoDCLSuvyhvVGumaaei3zEpEYlpaOadJeRphDyrpb0999ySE3BuNztJFbCcpL4nXlgnREH4QA2U4Yienr2bMlm00C4M6RE1Q')

const createUser = (customer) => {
    console.log(customer)
    return stripe.customers.create({
        ...customer,
        description: `New user created: ${customer.name}`,
    })

}

const createPaymentIntent = (amount, customer) => stripe.paymentIntents.create({
    amount: amount * 10,
    currency: 'brl',
    customer: customer.stripeId || customer.id
})

const isStripeUser = (customer) => stripe.customers.retrieve(
    customer.stripeId
);


module.exports = {
    createUser,
    createPaymentIntent,
    isStripeUser
}