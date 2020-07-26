const verifyEmailToken = require('../../use-cases/email')

const makePostEmailCustomer = () => {
  return async function postEmailCustomer(httpRequest){
    try {
      const { code } = httpRequest.query

      const { ip, headers } = httpRequest
      source.ip = ip
      source.browser = headers["User-Agent"]
      if (headers["Referer"]) {
        source.referer = headers["Referer"]
      }  

      const body = await verifyEmailToken(code)

      return {
        statusCode: 200,
        body
      }

    } catch(err){
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 400,
        body: {
          error: err.message,
        },
      }
    }

  }
}

module.exports = makePostEmailCustomer