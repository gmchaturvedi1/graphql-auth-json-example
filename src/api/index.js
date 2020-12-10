import { PubSub } from 'graphql-yoga'
import user from './users'
import Auth from '../authenticate'
const loaders = require('./loaders')
const merge = require('lodash/merge')
const pubsub = new PubSub()
const context = async (request) => {
  // console.log(request.request.user)
  const authUser = await Auth(request.request ? request.request.headers.authorization : null, user.model)
  const ctx = {
    ...request,
    models: {

      user: user.model,
    },
    loaders: loaders(),
    authUser: authUser,
    pubsub
  }
  return ctx
}

module.exports = {
  typeDefs: [user.typeDefs].join(' '),
  resolvers: merge({}, user.resolvers),
  context: context
}
