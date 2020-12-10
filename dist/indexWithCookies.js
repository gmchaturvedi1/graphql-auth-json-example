// import express from 'express'
// import compression from 'compression'
// import { GraphQLServer /* PubSub */ } from 'graphql-yoga'
// import User from './newApi/users/user.model'
// import path from 'path'
// // import { express as voyagerMiddleware } from 'graphql-voyager/middleware'
// const cookieParser = require('cookie-parser')
// const jwt = require('jsonwebtoken')
// const cors = require('cors')
// const { MemcachedCache } = require('apollo-server-memcached')
// const gqlServerConfig = require('./newApi')
// require('./db')()
// // require('./mail.config')
// const server = new GraphQLServer(gqlServerConfig)
// const corsOptions = {
//   origin: process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_FRONTEND_URL : 'http://localhost:8000',
//   credentials: true // <-- REQUIRED backend setting
// }
// server.express.use(cors(corsOptions))
// server.express.use(cookieParser())
// // 2. decode the JWT so we can get the user Id on each request
// server.express.use((req, res, next) => {
//   const { token } = req.cookies
//   if (token) {
//     console.log('token', token)
//     const decode = jwt.verify(token, 'thisismysecret')
//     // put the userId onto the req for future requests to access
//     req.userId = decode.subject
//     console.log('userId', req.userId)
//   }
//   next()
// })
// // 3. Create a middleware that populates the user on each request
// server.express.use(async (req, res, next) => {
//   console.log(req.userId + '123')
//   // if they aren't logged in, skip this
//   if (!req.userId) return next()
//   const user = await User.findById(req.userId)
//   req.user = user
//   gqlServerConfig.context.authUser = req.user
//   //  console.log('req.user', JSON.stringify(req.user))
//   next()
// })
// const serverOptions = {
//   port: 8001,
//   endpoint: '/graphql',
//   cors: {
//     credentials: true,
//     //origin: process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_FRONTEND_URL : 'http://localhost:8000' // your frontend url.
//   },
//   subscriptions: '/subscriptions',
//   playground: '/playground',
//   tracing: true,
//   debug: true,
//   deduplicator: true,
//   bodyParserOptions: { limit: '100mb' },
//   persistedQueries: {
//     cache: new MemcachedCache(
//       ['memcached-server-1', 'memcached-server-2', 'memcached-server-3'],
//       { retries: 10, retry: 10000 } // Options
//     )
//   }
// }
// const shouldCompress = (req, res) => {
//   if (req.headers['x-no-compression']) {
//     // don't compress responses with this request header
//     return false
//   }
//   // fallback to standard filter function
//   return compression.filter(req, res)
// }
// server.express.use(compression({ filter: shouldCompress }))
// // server.express.use('/voyager', voyagerMiddleware({ endpointUrl: '/' }))
// server.express.use('/static', express.static(path.join(__dirname, '../../uploads')))
// server.start(serverOptions, ({ port }) => console.log(`Server on port ${port}`))
"use strict";