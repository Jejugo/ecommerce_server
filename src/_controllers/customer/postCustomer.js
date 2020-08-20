const makePostCustomer = ({ registerCustomer, errorMessages } = {}) => {
  return async function postCustomer(httpRequest) {
    try {
      const {
        source = {},
        name,
        email,
        password,
        securityNumber,
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
        securityNumber,
      }

      const body = await registerCustomer(customerBody)

      return {
        statusCode: 200,
        body,
      }
    } catch (err) {
      const { status, body } = errorMessages[err.message] || { status: 400, body: err.message }
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: status,
        body: {
          error: body,
        },
      }
    }
  }
}

module.exports = makePostCustomer
