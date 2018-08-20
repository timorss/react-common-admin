'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _configuration = require('../../configuration');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sider = _antd.Layout.Sider;

var SiderDemo = function (_React$Component) {
  _inherits(SiderDemo, _React$Component);

  function SiderDemo(props) {
    _classCallCheck(this, SiderDemo);

    var _this = _possibleConstructorReturn(this, (SiderDemo.__proto__ || Object.getPrototypeOf(SiderDemo)).call(this, props));

    _this.toggleFullScreen = _this.toggleFullScreen.bind(_this);
    _this.toggleMinimized = _this.toggleMinimized.bind(_this);
    return _this;
  }

  _createClass(SiderDemo, [{
    key: 'toggleMinimized',
    value: function toggleMinimized() {
      this.props.toggleMinimized(this.props.modalId);
    }
  }, {
    key: 'toggleFullScreen',
    value: function toggleFullScreen() {
      this.props.toggleFullScreen(this.props.modalId);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          isOpen = _props.isOpen,
          onClose = _props.onClose,
          modalId = _props.modalId,
          objectId = _props.objectId,
          minimizedDocumentBeforeMe = _props.minimizedDocumentBeforeMe,
          title = _props.title,
          isMinimized = _props.isMinimized,
          fullScreen = _props.fullScreen;
      // const openWidth = fullScreen ? FULL_WIDTH : SMALL_WIDTH
      // const width = isOpen ? openWidth : 0

      var openClassName = fullScreen ? 'rca-sideModalOpenFull' : 'rca-sideModalOpen';
      var className = isMinimized ? 'rca-sideModalMinimized' : isOpen ? openClassName : 'rca-sideModalClosed';
      var minimizedStyle = { right: minimizedDocumentBeforeMe * 180 + 5 };
      var minimizedTitleStyle = { fontSize: 15 };
      var isNew = !objectId;
      return _react2.default.createElement(
        Sider,
        {
          trigger: null,
          collapsible: true,
          collapsed: isOpen,
          width: 0,
          className: className,
          style: isMinimized ? minimizedStyle : null
        },
        _react2.default.createElement(
          'div',
          { className: 'rca-sideModalTop' },
          _react2.default.createElement(
            'h2',
            { style: isMinimized ? minimizedTitleStyle : null },
            title
          ),
          _react2.default.createElement(
            'div',
            { className: 'rca-sideModalTopIcons' },
            isNew ? _react2.default.createElement(
              _antd.Popconfirm,
              {
                okType: 'danger',
                title: 'Are you sure delete this ?',
                onConfirm: function onConfirm() {
                  return onClose(modalId);
                },
                okText: 'Yes',
                cancelText: 'No'
              },
              _react2.default.createElement(_antd.Icon, {
                className: 'rca-closeIcon',
                type: 'close-circle'
              })
            ) : _react2.default.createElement(_antd.Icon, {
              className: 'rca-closeIcon',
              type: 'close-circle',
              onClick: function onClick() {
                return onClose(modalId);
              }
            }),
            _react2.default.createElement(_antd.Icon, {
              type: isMinimized ? 'plus-circle' : 'minus-circle',
              className: 'rca-minimizedIcon',
              onClick: this.toggleMinimized
            }),
            _react2.default.createElement(_antd.Icon, {
              style: { color: isMinimized ? 'grey' : '#59b10d' },
              className: 'rca-sizeIcon',
              type: fullScreen ? _configuration.langDir === 'ltr' ? 'right-circle' : 'left-circle' : _configuration.langDir === 'ltr' ? 'left-circle' : 'right-circle',
              onClick: isMinimized ? null : this.toggleFullScreen
            })
          )
        ),
        isOpen && this.props.children
      );
    }
  }]);

  return SiderDemo;
}(_react2.default.Component);

exports.default = SiderDemo;
module.exports = exports['default'];