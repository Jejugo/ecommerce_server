const makeGetEmailCustomer = ({ verifyEmailToken } = {}) => {
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

module.exports = makeGetEmailCustomer
