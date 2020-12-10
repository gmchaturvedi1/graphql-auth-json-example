import { UserInputError } from 'apollo-server-core'
import bcrypt from 'bcrypt-nodejs'
export const user = async (_, args, { models: { user }, authUser }, info) => {
  console.log(user)
  return authUser
}

export const userById = async (_, data, { models, authUser }, info) => {
  const user1 = await models.user.findById(data.id).lean()
  console.log(user1)
  return user1
}


export const createUser = async (_, data, { models: { user } }, info) => {
  const user1 = await user.find({ email: data.email }).lean()
  if (user1.length > 0) throw new UserInputError('Email Id already registered')
  var salt = bcrypt.genSaltSync(10)
  var hash = bcrypt.hashSync(data.password, salt)
  const createdUser = await user.create({
    email: data.email,
    password: hash,
    firstName: data.firstName,
    lastName: data.lastName,
    role: 'user',
    mobileNumber: data.mobileNumber,
    url: data.url
  })
  return createdUser
}

export const updateUser = async (_, data, { models: { user } }, info) => {
  const user1 = await user.findById(data.id).lean()
  if (!user1) throw new UserInputError('No User Found')
  var salt = bcrypt.genSaltSync(10)
  let hash = null
  if (data.password) {
    hash = bcrypt.hashSync(data.password, salt)
  } else {
    const user1 = await user.findById(data.id).lean()
    hash = user1.password
  }
  data.password = hash
  const updatedUser = await user.findByIdAndUpdate(data.id, {
    $set: data
  })
  return updatedUser
}

export const removeUser = async (_, data, { models: { user } }, info) => {
  const user1 = await user.findById(data.id).lean()
  if (user1.length < 1) throw new UserInputError('No User Found')
  const removedUser = await user.findByIdAndRemove(data.id)
  return removedUser
}

export const login = async (_, data, ctx, info) => {
  try {
    const { email, password } = data
    const user = await ctx.models.user.findOne({ email })
    if (!user) throw new UserInputError('The email address ' + email + ' is not associated with any account. Double-check your email address and try again.')
    // validate password
    if (!user.comparePassword(password)) throw new UserInputError('Invalid email or password')
    console.log(user.generateJWT())
    return { user: user, token: user.generateJWT() }
  } catch (error) {
    throw new UserInputError(error.message)
  }

}