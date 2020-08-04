const errorMessages = require('../../error-messages.json')

const makePostLogin = ({ loginAction }) => {
  return async function postLogin(httpRequest){
    try {
      const {
        source = {},
        username,
        password
      } = httpRequest.body
      const { ip, headers } = httpRequest
      source.ip = ip
      source.browser = headers["User-Agent"]
      if (headers["Referer"]) {
        source.referer = headers["Referer"]
      }
      const tokens = await loginAction({ username, password })
  
      return {
        statusCode: 200,
        body: tokens
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

module.exports = makePostLogin