const makeRetrieveProducts = ({ stripe }) => {
  return async function retrieveProducts({ limit, offset=null }){
    const products = await stripe.products.list({
      limit
    })
    
    return products
  }
}

module.exports = makeRetrieveProducts