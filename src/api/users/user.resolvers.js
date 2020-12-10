import {
  users,
  
  userById,
  createUser,
 
  updateUser,
  removeUser,
  login,
  
} from './services/user.services.js'
import { requiresLogin } from '../common/util'

module.exports = {
  Query: {
    user: (_, args, { models: { user }, authUser }, info) => users(_, args, { models: { user }, authUser }, info),
    userById: (_, data, { models, authUser }, info) => requiresLogin(userById(_, data, { models, authUser }, info)),
    userByEmailId: async (_, data, { models, authUser }, info) => {
      // console.log(data)
      const user1 = await models.user.findOne({ email: data.email })
      // console.log(user1)
      return user1
    },

  },
  Mutation: {
    createUser: async (_, data, { models: { user } }, info) => createUser(_, data, { models: { user } }, info),
    updateUser: (_, data, { models: { user } }, info) => requiresLogin(updateUser(_, data, { models: { user } }, info)),
    removeUser: (_, data, { models: { user } }, info) => requiresLogin(removeUser(_, data, { models: { user } }, info)),
    login: (_, data, ctx, info) => login(_, data, ctx, info),

  },
  User: {
    id: async (root, args, { loaders: { idLoader }, authUser }, info) => {
      console.log(root)
      const id = await idLoader.load(root._id)
      return id
    }
  }

}
