const makeGetEmailCustomer = ({ verifyEmailToken, errorMessages } = {}) => {
  return async function getCustomer(httpRequest) {
    try {
      const { code } = httpRequest.params
      const res = await verifyEmailToken(code)
      if (res) {
        return {
          statusCode: 200,
          url: "http://localhost:3000",
          query: "verified",
          params: code
        }
      }
    } catch (err) {
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

module.exports = makeGetEmailCustomer
