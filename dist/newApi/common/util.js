"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapAttributes = exports.selectedFields = exports.requestedFields = exports.requiresLogin = exports.adminsOnly = exports.membersOnly = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// //check verification of user authenticated  in resolver
var _require = require('graphql-parse-resolve-info'),
    parseResolveInfo = _require.parseResolveInfo,
    simplifyParsedResolveInfoFragmentWithType = _require.simplifyParsedResolveInfoFragmentWithType;

var _require2 = require('apollo-server-core'),
    AuthenticationError = _require2.AuthenticationError; // Role Wise Authentication


var requiresRole = function requiresRole(role) {
  return function (resolver) {
    return function (parent, args, context, info) {
      if (context.authUser && (!role || context.authUser.role === role)) {
        return resolver(parent, args, context, info);
      } else {
        throw new AuthenticationError('Unauthorized');
      }
    };
  };
};

var membersOnly = requiresRole('MEMBER');
exports.membersOnly = membersOnly;
var adminsOnly = requiresRole('ADMIN');
exports.adminsOnly = adminsOnly;
var requiresLogin = requiresRole(null);
exports.requiresLogin = requiresLogin;

var requestedFields = function requestedFields(info) {
  var parsedResolveInfoFragment = parseResolveInfo(info);

  var _simplifyParsedResolv = simplifyParsedResolveInfoFragmentWithType(parsedResolveInfoFragment, info.returnType),
      fields = _simplifyParsedResolv.fields;

  var required = {};
  Object.entries(fields).forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    if (Object.keys(value.fieldsByTypeName).length === 0) {
      required[key] = 1;
    }
  });
  return required;
};

exports.requestedFields = requestedFields;

var selectedFields = function selectedFields(d) {
  var fields = '';

  var _iterator = _createForOfIteratorHelper(d.fieldNodes[0].selectionSet.selections),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var e = _step.value;

      //    console.log(e.name.value)
      // if (e.name.value === 'id') {
      //   fields._id = 1
      // }
      if (e.name.value !== 'id' || e.name.value != 'result') {
        //    fields[e.name.value] = 1
        fields = fields.concat(' ' + e.name.value);
      }
    } // console.log(fields)

  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return fields;
};

exports.selectedFields = selectedFields;

var mapAttributes = function mapAttributes(model, _ref3) {
  var fieldNodes = _ref3.fieldNodes;
  // get the fields of the Model (columns of the table)
  var columns = new Set(Object.keys(model.rawAttributes));
  var requested_attributes = fieldNodes[0].selectionSet.selections.map(function (_ref4) {
    var value = _ref4.name.value;
    return value;
  }); // filter the attributes against the columns

  return requested_attributes.filter(function (attribute) {
    return columns.has(attribute);
  });
};

exports.mapAttributes = mapAttributes;