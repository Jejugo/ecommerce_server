const makePostRefreshToken = ({ jwt }) => {

  const generateAccessToken = (user) => jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1800s' })

  return async function postRefreshToken(httpResponse) {
    try {
      console.log(httpResponse.body)
      const { token: refreshToken } = httpResponse.body;
      if (!refreshToken) return { statusCode: 401 };
      //check on database if refreshToken exists
      const { username } = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN)
      const usernameNewAccessToken = {
        username
      }
      const accessToken = generateAccessToken(usernameNewAccessToken)

      return {
        statusCode: 200,
        body: {
          accessToken
        }
      }
    }
    catch(err){
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 400,
        body: {
          error: err.message
        }
      }
    }
  };
};

module.exports = makePostRefreshToken
