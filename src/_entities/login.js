const makeLogin = ({} = {}) => {
  return function login({ username, password }){

    if(!username){
      throw new Error('Username cannot be undefined')
    }

    if(!password){
      throw new Error('Password cannot be undefined')
    }

    return {
      getUsername: () => username,
      getPassword: () => password
    }
  }
}

module.exports = makeLogin