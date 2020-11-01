const makePostCheckout = ({ checkoutAction, errorMessages }) => {
  return async function postCheckout(httpRequest){
    try{
      const {
        source = {},
        payment_method_id,
        address,
        product,
        quantity,
        customer
      } = httpRequest.body
      const { ip, headers } = httpRequest
      source.ip = ip
      source.browser = headers["User-Agent"]
      if (headers["Referer"]) {
        source.referer = headers["Referer"]
      }
      headers['setHeader'] = 'HttpOnly;Secure;SameSite=Strict'
      console.log('chegou aqui', payment_method_id, customer, product, quantity, address)
      const body = await checkoutAction({ payment_method_id, customer, product, quantity, address })
      console.log(body)
      // return {
      //   statusCode: 200,
      //   body: {
      //     message: 'Successfully purchased!',
      //     ...body
      //   }
      // }
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