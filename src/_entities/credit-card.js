const makeCreditCard = ({ isCreditCardValid } = {}) => {
  return function creditCard({ number, expiration, cvv, name, active = false, createdOn = Date.now(), modifiedOn = Date.now() }){
    
    if(!number){
      throw new Error('Number must be provided.')
    }

    if(!expiration){
      throw new Error('Expiration date must be provided.')
    }

    if(!cvv){
      throw new Error('CVV must be provided.')
    }

    if(!name){
      throw new Error('Card name must be provided.')
    }

    return Object.freeze({
      getNumber: () => number,
      getExpiration: () => expiration,
      getCvv: () => cvv,
      getName: () => name,
      getCreatedOn: () => createdOn,
      getModifiedOn: () => modifiedOn
    })
  }
}

module.exports = makeCreditCard