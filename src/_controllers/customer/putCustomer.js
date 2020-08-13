const errorMessages = require("../../error-messages.json")

const makePutCustomer = ({ updateCustomer }) => {
  return async function putCustomer(httpRequest) {
    try{
      const { id } = httpRequest.params

      const {
        source = {},
        customer
      } = httpRequest.body
  
      console.log('passei pelo controller, ', customer)
      const body = await updateCustomer({ id, customer })
  
      return {
        statusCode: 200,
        body,
      }
    }
    catch (err) {
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

module.exports = makePutCustomer
