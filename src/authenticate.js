// const { ObjectId } = require( 'mongodb' )
// import user from './newApi/users/user.model'
// const HEADER_REGEX = /bearer token-(.*)$/
const jwt = require('jsonwebtoken')

const config = {
  secret: 'thisismysecret'
}

const authenticate = async (authorization, Users) => {
  // console.log(authorization)
  if (!authorization || authorization === 'null') {
    return null
  } else {
    const decode = await jwt.verify(authorization, config.secret)
    // console.log(decode.subject)
    const user = await Users.find({ _id: decode.subject }).lean()
    // console.log(user)
    return user[0]
  }
  //  return email &&
}
module.exports = authenticate
