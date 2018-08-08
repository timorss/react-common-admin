'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ContainerHeader = function ContainerHeader(_ref) {
  var title = _ref.title;

  return React.createElement(
    'div',
    { className: 'containerHeader' },
    React.createElement(
      'h2',
      null,
      title
    )
  );
};

exports.default = ContainerHeader;
module.exports = exports['default'];