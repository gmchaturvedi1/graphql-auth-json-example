"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createConsumer = exports.createWebRtcTransport = exports.runMediasoupWorker = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _config = _interopRequireDefault(require("./config"));

var _mediasoup = _interopRequireDefault(require("mediasoup"));

var runMediasoupWorker = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    var mediaCodecs;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _mediasoup.default.createWorker({
              logLevel: _config.default.mediasoup.worker.logLevel,
              logTags: _config.default.mediasoup.worker.logTags,
              rtcMinPort: _config.default.mediasoup.worker.rtcMinPort,
              rtcMaxPort: _config.default.mediasoup.worker.rtcMaxPort
            });

          case 2:
            worker = _context.sent;
            worker.on('died', function () {
              console.error('mediasoup worker died, exiting in 2 seconds... [pid:%d]', worker.pid);
              setTimeout(function () {
                return process.exit(1);
              }, 2000);
            });
            mediaCodecs = _config.default.mediasoup.router.mediaCodecs;
            _context.next = 7;
            return worker.createRouter({
              mediaCodecs: mediaCodecs
            });

          case 7:
            mediasoupRouter = _context.sent;

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function runMediasoupWorker() {
    return _ref.apply(this, arguments);
  };
}();

exports.runMediasoupWorker = runMediasoupWorker;

var createWebRtcTransport = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
    var _config$mediasoup$web, maxIncomingBitrate, initialAvailableOutgoingBitrate, transport;

    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _config$mediasoup$web = _config.default.mediasoup.webRtcTransport, maxIncomingBitrate = _config$mediasoup$web.maxIncomingBitrate, initialAvailableOutgoingBitrate = _config$mediasoup$web.initialAvailableOutgoingBitrate;
            _context2.next = 3;
            return mediasoupRouter.createWebRtcTransport({
              listenIps: _config.default.mediasoup.webRtcTransport.listenIps,
              enableUdp: true,
              enableTcp: true,
              preferUdp: true,
              initialAvailableOutgoingBitrate: initialAvailableOutgoingBitrate
            });

          case 3:
            transport = _context2.sent;

            if (!maxIncomingBitrate) {
              _context2.next = 12;
              break;
            }

            _context2.prev = 5;
            _context2.next = 8;
            return transport.setMaxIncomingBitrate(maxIncomingBitrate);

          case 8:
            _context2.next = 12;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](5);

          case 12:
            return _context2.abrupt("return", {
              transport: transport,
              params: {
                id: transport.id,
                iceParameters: transport.iceParameters,
                iceCandidates: transport.iceCandidates,
                dtlsParameters: transport.dtlsParameters
              }
            });

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[5, 10]]);
  }));

  return function createWebRtcTransport() {
    return _ref2.apply(this, arguments);
  };
}();

exports.createWebRtcTransport = createWebRtcTransport;

var createConsumer = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(producer, rtpCapabilities) {
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (mediasoupRouter.canConsume({
              producerId: producer.id,
              rtpCapabilities: rtpCapabilities
            })) {
              _context3.next = 3;
              break;
            }

            console.error('can not consume');
            return _context3.abrupt("return");

          case 3:
            _context3.prev = 3;
            _context3.next = 6;
            return consumerTransport.consume({
              producerId: producer.id,
              rtpCapabilities: rtpCapabilities,
              paused: producer.kind === 'video'
            });

          case 6:
            consumer = _context3.sent;
            _context3.next = 13;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](3);
            console.error('consume failed', _context3.t0);
            return _context3.abrupt("return");

          case 13:
            if (!(consumer.type === 'simulcast')) {
              _context3.next = 16;
              break;
            }

            _context3.next = 16;
            return consumer.setPreferredLayers({
              spatialLayer: 2,
              temporalLayer: 2
            });

          case 16:
            return _context3.abrupt("return", {
              producerId: producer.id,
              id: consumer.id,
              kind: consumer.kind,
              rtpParameters: consumer.rtpParameters,
              type: consumer.type,
              producerPaused: consumer.producerPaused
            });

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3, 9]]);
  }));

  return function createConsumer(_x, _x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.createConsumer = createConsumer;