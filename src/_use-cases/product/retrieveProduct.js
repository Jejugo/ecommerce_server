const makeRetrieveProduct = ({ stripe }) => {
  return async function retrieveProduct(id){
    const product = await stripe.products.retrieve(id)
    const allPrices = await stripe.prices.list()
    let price = allPrices.data.filter(price => price.product === id)
    
    if (price.length === 1)
      return {
        ...product,
        price: price[0].unit_amount / 10
      }

    return product
  }
}

module.exports = makeRetrieveProduct