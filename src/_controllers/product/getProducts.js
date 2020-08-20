const makeGetProducts = ({ retrieveProducts, errorMessages }) => {
  return async function getProducts(httpRequest){
    try {
      const {
        source = {},
        limit=null,
        offset=null
      } = httpRequest.query
      const { ip, headers } = httpRequest
      source.ip = ip
      source.browser = headers["User-Agent"]
      if (headers["Referer"]) {
        source.referer = headers["Referer"]
      }
      const products = await retrieveProducts(limit, offset)
  
      return {
        statusCode: 200,
        body: {
          products
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

module.exports = makeGetProducts