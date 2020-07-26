const { registerCustomer } = require("../../use-cases")

const makePostCustomer = () => {
  return async function postCustomer(httpRequest) {
    try {
      const {
        source = {},
        name,
        email,
        password,
        securityNumber
      } = httpRequest.body
      const { ip, headers } = httpRequest
      source.ip = ip
      source.browser = headers["User-Agent"]
      if (headers["Referer"]) {
        source.referer = headers["Referer"]
      }

      const customerBody = {
        name,
        email,
        password,
        securityNumber
      }

      const body = await registerCustomer(customerBody)

      return {
        statusCode: 200,
        body,
      }
    } catch (err) {
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

module.exports = makePostCustomer
