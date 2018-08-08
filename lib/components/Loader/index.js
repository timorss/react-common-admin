'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Loader = function Loader() {
  return _react2.default.createElement(
    'div',
    { className: 'rca-doc-loader' },
    _react2.default.createElement(_antd.Icon, { type: 'loading' })
  );
};
exports.default = Loader;
module.exports = exports['default'];