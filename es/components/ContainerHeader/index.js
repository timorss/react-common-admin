'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ContainerHeader = function ContainerHeader(_ref) {
  var title = _ref.title;

  return _react2.default.createElement(
    'div',
    { className: 'containerHeader' },
    _react2.default.createElement(
      'h2',
      null,
      title
    )
  );
};

exports.default = ContainerHeader;