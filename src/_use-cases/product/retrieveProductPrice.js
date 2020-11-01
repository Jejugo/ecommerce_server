const makeRetrieveProductPrice = ({ stripe }) => function retrieveProductPrice({ id }){
    return stripe.prices.retrieve(id)
  }

module.exports = makeRetrieveProductPrice