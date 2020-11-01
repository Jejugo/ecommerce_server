const makePostCheckout = ({ checkoutAction, errorMessages }) => {
  return async function postCheckout(httpRequest){
    try{
      const {
        source = {},
        amount
      } = httpRequest.body
      const { ip, headers } = httpRequest
      source.ip = ip
      source.browser = headers["User-Agent"]
      if (headers["Referer"]) {
        source.referer = headers["Referer"]
      }
      headers['setHeader'] = 'HttpOnly;Secure;SameSite=Strict'
      console.log('chegou aqui', amount)
      const body = await checkoutAction({ amount })
      console.log(body)
      return {
        statusCode: 200,
        body: {
          message: 'Successfully purchased!',
          ...body
        }
      }
    }

    catch(err){
      const { status, body } = errorMessages[err.message] || { status: 400, body: err.message }
      console.log(err)

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

module.exports = makePostCheckout