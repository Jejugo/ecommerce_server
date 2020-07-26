const makeVerifyEmailToken = ({} = {}) => {
  return function verifyEmailToken(code){
    console.log('code: ', code)

    //verify if user exists on database
  }
}

module.exports = makeVerifyEmailToken