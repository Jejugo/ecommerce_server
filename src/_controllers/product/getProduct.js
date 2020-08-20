const makeGetProduct = ({ retrieveProduct, errorMessages }) => {
  return async function getProduct(httpRequest){
    try {
      const {
        source = {},
        id,
      } = httpRequest.params
      const { ip, headers } = httpRequest
      source.ip = ip
      source.browser = headers["User-Agent"]
      if (headers["Referer"]) {
        source.referer = headers["Referer"]
      }
      console.log('passando')
      console.log(id)
      const product = await retrieveProduct(id)
  
      return {
        statusCode: 200,
        body: {
          product
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

module.exports = makeGetProduct