import bcrypt from 'bcrypt-nodejs'
import jwt from 'jsonwebtoken'

const config = {
  secret: 'thisismysecret'
}
export const tokenForUser = user => {
  const timeStamp = new Date().getTime()
  // return jwt.encode({sub:user.id,iat:timeStamp},config.secret);
  return jwt.sign({ subject: user._id, iat: timeStamp, expiresIn: '10000 days' }, config.secret)
}
