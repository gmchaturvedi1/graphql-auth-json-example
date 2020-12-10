import express from 'express'
import compression from 'compression'
import { GraphQLServer /* PubSub */ } from 'graphql-yoga'
import path from 'path'
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { MemcachedCache } = require('apollo-server-memcached')
const gqlServerConfig = require('./api/index.js')
require('./db')()

const server = new GraphQLServer(gqlServerConfig)

// const corsOptions = {
//   origin: process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_FRONTEND_URL : 'http://localhost:8000',
//   credentials: true // <-- REQUIRED backend setting
// }

//server.express.use(cors(corsOptions))
server.express.use(cors())

server.express.use(cookieParser())

const serverOptionsMobile = {

  port: 8005,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
  // tracing: true,
  // debug: true,
  deduplicator: true,
  bodyParserOptions: { limit: '100mb' },
  persistedQueries: {
    cache: new MemcachedCache(
      ['memcached-server-1', 'memcached-server-2', 'memcached-server-3'],
      { retries: 10, retry: 10000 } // Options
    )
  }
}

const shouldCompress = (req, res) => {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }

  // fallback to standard filter function
  return compression.filter(req, res)
}

server.express.use(compression({ filter: shouldCompress }))
// server.express.use('/voyager', voyagerMiddleware({ endpointUrl: '/' }))
server.express.use('/static', express.static(path.join(__dirname, '../../uploads')))
server.start(serverOptionsMobile, ({ port }) => console.log(`Server on port ${port}`))
