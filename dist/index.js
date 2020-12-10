"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _compression = _interopRequireDefault(require("compression"));

var _graphqlYoga = require("graphql-yoga");

var _path = _interopRequireDefault(require("path"));

var cookieParser = require('cookie-parser');

var cors = require('cors');

var _require = require('apollo-server-memcached'),
    MemcachedCache = _require.MemcachedCache;

var gqlServerConfig = require('./newApi/index.mobile.js');

require('./db')();

var server = new _graphqlYoga.GraphQLServer(gqlServerConfig); // const corsOptions = {
//   origin: process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_FRONTEND_URL : 'http://localhost:8000',
//   credentials: true // <-- REQUIRED backend setting
// }
//server.express.use(cors(corsOptions))

server.express.use(cors());
server.express.use(cookieParser());
var serverOptionsMobile = {
  port: 8005,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
  // tracing: true,
  // debug: true,
  deduplicator: true,
  bodyParserOptions: {
    limit: '100mb'
  },
  persistedQueries: {
    cache: new MemcachedCache(['memcached-server-1', 'memcached-server-2', 'memcached-server-3'], {
      retries: 10,
      retry: 10000
    } // Options
    )
  }
};

var shouldCompress = function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false;
  } // fallback to standard filter function


  return _compression.default.filter(req, res);
};

server.express.use((0, _compression.default)({
  filter: shouldCompress
})); // server.express.use('/voyager', voyagerMiddleware({ endpointUrl: '/' }))

server.express.use('/static', _express.default.static(_path.default.join(__dirname, '../../uploads')));
server.start(serverOptionsMobile, function (_ref) {
  var port = _ref.port;
  return console.log("Server on port ".concat(port));
});