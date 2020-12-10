// import type from './user.type'
import types from './user.type'

export default {
  resolvers: require('./user.resolvers'),
  typeDefs: types,
  model: require('./user.model')
}
