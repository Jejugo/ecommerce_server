const makeRetrieveProduct = ({ stripe }) => {
  return async function retrieveProduct(id){
    const product = await stripe.products.retrieve(id)

    return product
  }
}

module.exports = makeRetrieveProduct