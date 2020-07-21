const makeAddress = () => {
  return function address({ street, number, neighborhood, complement = '', zipcode, createdOn = Date.now(), modifiedOn = Date.now() }){
    if(!street){
      throw new Error('Street must be provided.')
    }

    if(!number){
      throw new Error('Number must be provided.')
    }

    if(!neighborhood){
      throw new Error('Neighborhood must be provided.')
    }
    
    if(!zipcode){
      throw new Error('Zipcode must be provided.')
    }

    return Object.freeze({
      getStreet: () => street,
      getNumber: () => number,
      getNeighborhood: () => neighborhood,
      getComplement: () => complement,
      getZipcode: () => zipcode,
      getCreatedOn: () => createdOn,
      getModifiedOn: () => modifiedOn
    })
  }
}

module.exports = makeAddress