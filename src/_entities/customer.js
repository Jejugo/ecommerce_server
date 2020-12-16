const makeCustomer = ({ isEmailValid } = {}) => {
  return function customer({ name, email, password, securityNumber, active = false, createdOn = Date.now(), modifiedOn = Date.now(), stripeId }){
    
    if(!name){
      throw new Error('Name must be provided.')
    }

    if(!isEmailValid(email)){
      throw new Error('Email is not invalid.')
    }

    if(!securityNumber){
      throw new Error('Securty number must be provided.')
    }

    if(!password){
      throw new Error('Password must be provided.')
    }

    if(!stripeId){
      throw new Error('stripeId must be provided.')
    }

    return Object.freeze({
      getName: () => name,
      getEmail: () => email,
      getSecurityNumber: () => securityNumber,
      getPassword: () => password,
      getActive: () => active,
      getStripeId: () => stripeId,
      getCreatedOn: () => createdOn,
      getModifiedOn: () => modifiedOn
    })
  }
}

module.exports = makeCustomer