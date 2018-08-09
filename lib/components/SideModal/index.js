'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _antd = require('antd');

var _configuration = require('../../configuration');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = _antd.Layout.Header,
    Sider = _antd.Layout.Sider,
    Content = _antd.Layout.Content;


var SMALL_WIDTH = 600;
var FULL_WIDTH = 800;

var openStyle = {
  backgroundColor: 'white',
  flexGrow: 0,
  flexShrink: 0,
  flexBasis: SMALL_WIDTH,
  maxWidth: SMALL_WIDTH,
  minWidth: SMALL_WIDTH,
  width: SMALL_WIDTH
};
var openFullStyle = {
  backgroundColor: 'white',
  flexGrow: 0,
  flexShrink: 0,
  flexBasis: FULL_WIDTH,
  maxWidth: FULL_WIDTH,
  minWidth: FULL_WIDTH,
  width: FULL_WIDTH
};
var closeStyle = {
  backgroundColor: 'white',
  flexGrow: 0,
  flexShrink: 0,
  flexBasis: FULL_WIDTH,
  maxWidth: FULL_WIDTH,
  minWidth: FULL_WIDTH,
  width: FULL_WIDTH
};

var SiderDemo = function (_React$Component) {
  _inherits(SiderDemo, _React$Component);

  function SiderDemo(props) {
    _classCallCheck(this, SiderDemo);

    var _this = _possibleConstructorReturn(this, (SiderDemo.__proto__ || Object.getPrototypeOf(SiderDemo)).call(this, props));

    _this.state = {
      fullScreen: true
    };
    return _this;
  }

  _createClass(SiderDemo, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var fullScreen = this.state.fullScreen;
      var _props = this.props,
          isOpen = _props.isOpen,
          onClose = _props.onClose;
      // const openWidth = fullScreen ? FULL_WIDTH : SMALL_WIDTH
      // const width = isOpen ? openWidth : 0

      var openClassName = fullScreen ? 'rca-sideModalOpenFull' : 'rca-sideModalOpen';
      var className = isOpen ? openClassName : 'rca-sideModalClosed';
      return React.createElement(
        Sider,
        {
          trigger: null,
          collapsible: true,
          collapsed: isOpen,
          width: 0,
          className: className
        },
        React.createElement(
          'div',
          { className: 'rca-sideModalTopIcons' },
          React.createElement(_antd.Icon, {
            type: fullScreen ? _configuration.langDir === 'ltr' ? "right" : 'left' : _configuration.langDir === 'ltr' ? "left" : 'right',
            onClick: function onClick() {
              return _this2.setState({ fullScreen: !fullScreen });
            }
          }),
          React.createElement(_antd.Icon, {
            type: "close",
            onClick: onClose
          })
        ),
        isOpen && this.props.children
      );
    }
  }]);

  return SiderDemo;
}(React.Component);

exports.default = SiderDemo;
module.exports = exports['default'];