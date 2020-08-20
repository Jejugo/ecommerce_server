const { login } = require("../../_entities")

const makeLoginAction = ({ jwt, bcrypt, Customer }) => {
  const generateResponse = (credentials) => {
    const userHash = {
      username: credentials.getUsername(),
    }
    const accessToken = generateAccessToken(userHash)
    const refreshToken = generateRefreshToken(userHash)

    return { accessToken, refreshToken, expiresIn: "1800s" }
  }

  const generateAccessToken = (userHash) =>
    jwt.sign(userHash, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1800s" })

  const generateRefreshToken = (userHash) =>
    jwt.sign(userHash, process.env.REFRESH_TOKEN)

  const findCustomer = (email) =>
    Customer.findOne({
      where: {
        email,
      },
      raw: true,
    })

  const checkPassword = async (loginPassword, foundPassword) =>
    bcrypt.compare(loginPassword, foundPassword)

  return async function loginAction({ username, password }) {
    try {
      const loginCredentials = login({ username, password })
      const customerFound = await findCustomer(username)
      if (customerFound) {
        const isSamePassword = await checkPassword(
          loginCredentials.getPassword(),
          customerFound.password
        )

        if (customerFound && isSamePassword) {
          return generateResponse(loginCredentials)

        } else {
          throw "WRONG_PASSWORD"
        }
      } else {
        throw "CUSTOMER_NOT_FOUND"
      }
    } catch (err) {
      throw new Error(err)
    }
  }
}

module.exports = makeLoginAction
