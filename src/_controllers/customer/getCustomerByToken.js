const makeGetCustomerByToken = ({ retrieveCustomerByToken, errorMessages }) => {
  return async function getCustomerByToken(httpRequest){
    try{
      const {
        token
      } = httpRequest.params

      const customer = await retrieveCustomerByToken(token)
      return {
        statusCode: 200,
        body: {
          isValid: true,
          customer
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
          error: body,
        }
      }
    }
  }
}

module.exports = makeGetCustomerByToken