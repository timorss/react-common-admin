'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPointer = exports.findValueInOption = exports.selectOptionsFromExtraData = exports.getFieldValidatorMessage = exports.getFieldValue = exports.buildQuery = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _validate = require('validate.js');

var _validate2 = _interopRequireDefault(_validate);

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var buildQuery = exports.buildQuery = function buildQuery(_ref) {
  var searchText = _ref.searchText,
      fields = _ref.fields;

  var text = searchText;
  var query = void 0;
  if (text === '') {
    query = {};
  } else {
    var _searchFields = fields.filter(function (field) {
      return field.search;
    });
    if (_searchFields) {
      query = {
        $or: _searchFields.map(function (field) {
          switch (field.key) {
            // case 'productId':
            //   return {
            //     'productId': {
            //       $exists: true,
            //       '$inQuery': {
            //         'where': { 'name': { '$regex': text, $options: 'i' } }, 'className': 'Product'
            //       }
            //     }
            //   }
            // case 'memberId': {
            //   const splitText = text.split(' ')
            //   let where = {}
            //   if (splitText.length === 2) {
            //     where = { $and: [{ 'firstName': { '$regex': splitText[0], $options: 'i' } }, { 'lastName': { '$regex': splitText[1], $options: 'i' } }] }
            //   } else {
            //     // where = {
            //     //   $or: [{ 'firstName': { '$regex': text, $options: 'i' } },
            //     //   { 'lastName': { '$regex': text, $options: 'i' } },
            //     //   {
            //     //     'tier': {
            //     //       '$inQuery': { 'where': { 'name': { '$regex': text, $options: 'i' } }, 'className': 'Tier' }
            //     //     }
            //     //   }]
            //     // }
            //   }
            //   return {
            //     'memberId': {
            //       '$inQuery': {
            //         'where': where, 'className': 'Member'
            //       }
            //     }
            //   }
            // }
            default:
              return _defineProperty({}, field.key, { '$regex': text, $options: 'i' });
          }
        }).filter(function (o) {
          return o;
        })
      };
    } else {
      query = {};
    }
  }
  return query;
};

var getFieldValue = exports.getFieldValue = function getFieldValue(field) {
  var documentData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var formatter = field.formatter;
  var fieldValue = documentData[field.key];
  var value = formatter ? formatter(fieldValue) : fieldValue;
  return value;
};
var getFieldValidatorMessage = exports.getFieldValidatorMessage = function getFieldValidatorMessage(field, value) {
  var validators = field.validators;

  var message = null;
  if (validators) {
    message = _validate2.default.single(value, validators);
  }
  return message && message[0];
};
var selectOptionsFromExtraData = exports.selectOptionsFromExtraData = function selectOptionsFromExtraData(field) {
  var extraData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  debugger;
  if (field.type === 'pointer') {
    return extraData[field.pointerTo];
  }
};

var findValueInOption = exports.findValueInOption = function findValueInOption(value, options) {
  if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && options) {
    var option = (0, _find2.default)(options, function (o) {
      return o.objectId === value.objectId;
    }) || {};
    var newValue = _extends({}, value, option);
    return newValue;
  }
  return value;
};

/**
 * createPointer- return pointer
 */
var createPointer = exports.createPointer = function createPointer(schemaName, objectId) {
  return {
    className: schemaName,
    objectId: objectId,
    __type: 'Pointer'
  };
};