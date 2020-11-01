const makeGetProductPrice = ({ retrieveProductPrice, errorMessages }) => {
  return async function getProductPrice(httpRequest){
    try {
      const {
        source = {},
        id,
      } = httpRequest.params
      const { ip } = httpRequest
      source.ip = ip

      const productPricing = await retrieveProductPrice({ id })
      console.log(productPricing)
  
      return {
        statusCode: 200,
        body: {
          productPricing
        }
      }
    }

    catch(err){
      const { status, body } = errorMessages[err.message] || { status: 400, body: err.message }

      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: status,
        body: {
          error: body || err.message,
        },
      }
    }
  }
}

module.exports = makeGetProductPrice