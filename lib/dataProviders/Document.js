'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactParse = require('react-parse');

var _configuration = require('../configuration');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DocWrapper = function (_React$Component) {
  _inherits(DocWrapper, _React$Component);

  function DocWrapper(props) {
    _classCallCheck(this, DocWrapper);

    var _this = _possibleConstructorReturn(this, (DocWrapper.__proto__ || Object.getPrototypeOf(DocWrapper)).call(this, props));

    _this.state = {
      data: null
    };
    _this.onPostFinished = _this.onPostFinished.bind(_this);
    _this.onPutFinished = _this.onPutFinished.bind(_this);
    _this.onDeleteFinished = _this.onDeleteFinished.bind(_this);
    _this.onFetchEnd = _this.onFetchEnd.bind(_this);
    _this.notification = _this.notification.bind(_this);
    return _this;
  }

  _createClass(DocWrapper, [{
    key: 'onFetchEnd',
    value: function onFetchEnd(_ref) {
      var error = _ref.error,
          status = _ref.status,
          data = _ref.data,
          info = _ref.info;

      this.setState({ error: error, status: status, data: data, info: info });
    }
  }, {
    key: 'notification',
    value: function notification(type, messageKey, data) {
      var messagesFromProps = this.props.messages || {};
      if (!_configuration.notification) {
        console.log('react-common-admin - missing notification services, check react-common-admin.initCommonAdmin');
      } else {
        _configuration.notification[type](messagesFromProps[messageKey] || _configuration.defaultDocumentMessages[messageKey], data);
      }
    }
  }, {
    key: 'onPostFinished',
    value: function onPostFinished(res) {
      this.props.onPostFinished(res);
      if (res.error) {
        this.notification('error', 'onPostFailedMessage', res);
      } else {
        this.notification('success', 'onPostMessage', res);
      }
    }
  }, {
    key: 'onPutFinished',
    value: function onPutFinished(res) {
      this.props.onPutFinished(res);
      if (res.error) {
        this.notification('error', 'onPutFailedMessage', res);
      } else {
        this.notification('success', 'onPutMessage', res);
      }
    }
  }, {
    key: 'onDeleteFinished',
    value: function onDeleteFinished(res) {
      this.props.onDeleteFinished(res);
      if (res.error) {
        this.notification('error', 'onDeleteFailedMessage', res);
      } else {
        this.notification('success', 'onDeleteMessage', res);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          isOpen = _props.isOpen,
          customTitle = _props.customTitle,
          onClose = _props.onClose,
          saveOnBlur = _props.saveOnBlur,
          targetName = _props.targetName,
          schemaName = _props.schemaName,
          fields = _props.fields,
          objectId = _props.objectId,
          viewComponent = _props.viewComponent,
          extraData = _props.extraData,
          fieldsOptions = _props.fieldsOptions,
          messages = _props.messages,
          dataFromCollection = _props.dataFromCollection,
          resProps = _objectWithoutProperties(_props, ['isOpen', 'customTitle', 'onClose', 'saveOnBlur', 'targetName', 'schemaName', 'fields', 'objectId', 'viewComponent', 'extraData', 'fieldsOptions', 'messages', 'dataFromCollection']);

      var WrapperElement = this.props.wrapper;
      var title = customTitle ? customTitle({ state: this.state, props: this.props }) : objectId ? 'Edit - ' + objectId : 'Create New Doc';
      return _react2.default.createElement(
        WrapperElement,
        {
          key: targetName,
          isOpen: isOpen,
          title: title,
          objectId: objectId,
          onClose: onClose
        },
        _react2.default.createElement(_reactParse.FetchDocument, _extends({
          key: targetName,
          schemaName: schemaName,
          targetName: targetName,
          objectId: objectId,
          leaveClean: true
          // Call backs
          , onFetchEnd: this.onFetchEnd,
          onPostEnd: this.onPostFinished,
          onPutEnd: this.onPutFinished,
          onDeleteEnd: this.onDeleteFinished
          // Info that will pass to viewComponent
          // -- Method to close modal
          , onClose: onClose
          // -- Put on each blur from input
          , saveOnBlur: saveOnBlur
          // -- fields to render
          , fields: fields,
          collectionTargetName: this.props.collectionTargetName,
          fieldsOptions: fieldsOptions,
          component: viewComponent,
          title: title,
          messages: messages,
          dataFromCollection: dataFromCollection
        }, resProps))
      );
    }
  }]);

  return DocWrapper;
}(_react2.default.Component);

exports.default = DocWrapper;


DocWrapper.propTypes = process.env.NODE_ENV !== "production" ? {
  // react-parse
  schemaName: _propTypes2.default.string.isRequired, // react-parse schemaName
  targetName: _propTypes2.default.string.isRequired, // react-parse targetName
  viewComponent: _propTypes2.default.any.isRequired, // react-parse component to render
  // callback
  onPostFinished: _propTypes2.default.func, // Call back that call when postFinished, get the response from react-parse onPostFinished
  onPutFinished: _propTypes2.default.func, // Call back that call when postFinished, get the response from react-parse onPutFinished
  onDeleteFinished: _propTypes2.default.func, // Call back that call when postFinished, get the response from react-parse onDeleteFinished
  // configuration
  fields: _propTypes2.default.array.isRequired, // data that will pass to react-parse document view
  saveOnBlur: _propTypes2.default.bool, // When true we call onPut when input is blur, but only if newValue !== initialValue (initialValue is value from onFocus)
  parseDataBeforePost: _propTypes2.default.func, // Yoc can pass a function that get the document data and return the data you want to post the server
  dataFromCollection: _propTypes2.default.object
} : {};

DocWrapper.defaultProps = {
  saveOnBlur: true,
  onPostFinished: function onPostFinished() {},
  onPutFinished: function onPutFinished() {},
  onDeleteFinished: function onDeleteFinished() {},
  dataFromCollection: {}
};
module.exports = exports['default'];