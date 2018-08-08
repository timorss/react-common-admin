'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('../index');

var _configuration = require('../../configuration');

var _antd = require('antd');

var _index2 = require('../../index');

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DocForm = function (_React$Component) {
  _inherits(DocForm, _React$Component);

  function DocForm(props) {
    _classCallCheck(this, DocForm);

    var _this = _possibleConstructorReturn(this, (DocForm.__proto__ || Object.getPrototypeOf(DocForm)).call(this, props));

    _this.state = {
      fileInclude: false,
      isFormValid: true
    };
    _this.onPost = _this.onPost.bind(_this);
    _this.onPut = _this.onPut.bind(_this);
    _this.onBlur = _this.onBlur.bind(_this);
    _this.onChange = _this.onChange.bind(_this);
    _this.toggleFileInclude = _this.toggleFileInclude.bind(_this);
    return _this;
  }

  _createClass(DocForm, [{
    key: 'onPost',
    value: function onPost() {
      var _props = this.props,
          parseDataBeforePost = _props.parseDataBeforePost,
          fetchProps = _props.fetchProps;
      var data = fetchProps.data,
          post = fetchProps.post;

      if (parseDataBeforePost) {
        var dataToSend = parseDataBeforePost(data);
        post(dataToSend, this.state.fileInclude, this.state.fileValueHandler);
      } else {
        post(null, this.state.fileInclude, this.state.fileValueHandler);
      }
    }
  }, {
    key: 'onPut',
    value: function onPut(_ref) {
      var key = _ref.key,
          value = _ref.value,
          info = _ref.info;

      var _ref2 = info || {},
          dispatchId = _ref2.dispatchId,
          fileInclude = _ref2.fileInclude,
          fileValueHandler = _ref2.fileValueHandler;

      var hasFiles = this.state.fileInclude || fileInclude;
      var _fileValueHandler = this.state.fileValueHandler || fileValueHandler;
      this.props.fetchProps.put(_defineProperty({}, key, value), hasFiles, _fileValueHandler, dispatchId);
    }
  }, {
    key: 'onChange',
    value: function onChange(_ref3) {
      var key = _ref3.key,
          value = _ref3.value,
          info = _ref3.info,
          isValid = _ref3.isValid;

      if (info && info.fileInclude) {
        this.toggleFileInclude(true, info.fileValueHandler);
      }
      this.props.fetchProps.updateField(key, value);
      if (this.props.objectId && info && info.putOnChange) {
        // Value is valid
        if (isValid) {
          this.onPut({
            key: key,
            value: value,
            isValid: isValid,
            info: info && info.target ? null : info // if info.target then is an input event and we didn't need that
          });
        } else {
          // Value is not valid
          _configuration.notification.error('Your changes was not saved, input is not valid');
        }
      }
    }
  }, {
    key: 'onBlur',
    value: function onBlur(res) {
      var _props2 = this.props,
          objectId = _props2.objectId,
          saveOnBlur = _props2.saveOnBlur;
      var key = res.key,
          initialValue = res.initialValue,
          isValid = res.isValid,
          info = res.info,
          value = res.value;

      var _value = value;
      // We work with react-cross-form, the blur event didn't pass any value, but you can pass info object with any data you want
      // we use this option to help special fields (like <uploadFile />) to pass a value with onBlur, this value will override the value from the state
      // This is helpful to inputs without regular onBlur
      if (info && typeof info.value !== 'undefined') {
        _value = info.value;
      }
      var isValueChanged = initialValue !== _value;
      // condition to run put when input blur
      if (objectId && saveOnBlur && isValueChanged) {
        // Value is valid
        if (isValid) {
          this.onPut({
            key: key,
            value: _value,
            isValid: isValid,
            info: info && info.target ? null : info // if info.target then is an input event and we didn't need that
          });
        } else {
          // Value is not valid
          _configuration.notification.error('Your changes was not saved, input is not valid');
        }
      }
    }
  }, {
    key: 'toggleFileInclude',
    value: function toggleFileInclude(value, fileValueHandler) {
      var newValue = void 0;
      if (value !== undefined) {
        newValue = value;
      } else {
        newValue = !this.state.fileInclude;
      }
      this.setState({ fileInclude: newValue, fileValueHandler: fileValueHandler });
    }
  }, {
    key: 'onSubmit',
    value: function onSubmit(event) {
      event.preventDefault();

      // custom form handling here
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props3 = this.props,
          onClose = _props3.onClose,
          objectId = _props3.objectId,
          saveOnBlur = _props3.saveOnBlur,
          fetchProps = _props3.fetchProps,
          fields = _props3.fields,
          fieldsOptions = _props3.fieldsOptions;
      var error = fetchProps.error,
          isLoading = fetchProps.isLoading,
          refresh = fetchProps.refresh,
          put = fetchProps.put,
          data = fetchProps.data,
          updateField = fetchProps.updateField;

      var isFirstLoading = objectId && (0, _isEmpty2.default)(data);
      return _react2.default.createElement(
        'div',
        { className: 'docForm' },
        _react2.default.createElement(
          'form',
          { onSubmit: this.onSubmit },
          _react2.default.createElement(_index2.Form, {
            fields: fields,
            data: data,
            validateType: isFirstLoading ? 'none' : 'all',
            onChange: this.onChange,
            onBlur: this.onBlur,
            onValidateStateChanged: function onValidateStateChanged(_ref4) {
              var isValid = _ref4.isValid,
                  unValidFields = _ref4.unValidFields;

              _this2.setState({ isFormValid: isValid });
            },
            toggleFileInclude: this.toggleFileInclude,
            fieldsOptions: fieldsOptions
          })
        ),
        _react2.default.createElement(
          'div',
          { style: { height: 50, paddingTop: '1.6rem' } },
          _react2.default.createElement(
            'button',
            { type: 'button', className: 'btn btn-secondary ant-btn ant-btn-secondary bottomBtns', onClick: onClose },
            ' Close '
          ),
          !saveOnBlur && !objectId && _react2.default.createElement(
            'button',
            { type: 'button', className: 'btn btn-primary ant-btn ant-btn-primary bottomBtns', onClick: function onClick() {
                return put(data);
              } },
            ' Update '
          ),
          !objectId && _react2.default.createElement(
            'button',
            {
              type: 'button',
              className: 'btn btn-primary ant-btn ant-btn-primary bottomBtns',
              disabled: !this.state.isFormValid,
              onClick: function onClick() {
                _this2.onPost();
              } },
            ' Save '
          ),
          objectId && _react2.default.createElement(
            'button',
            { type: 'button', className: 'btn btn-primary ant-btn ant-btn-secondary bottomBtns', onClick: refresh },
            ' Refresh '
          ),
          objectId && _react2.default.createElement(
            _antd.Popconfirm,
            { title: 'Are you sure delete this ?', okType: 'danger', onConfirm: this.props.fetchProps.deleteDoc, okText: 'Yes', cancelText: 'No' },
            _react2.default.createElement(
              'button',
              { type: 'button', className: 'btn btn-primary ant-btn ant-btn-danger bottomBtns' },
              ' Delete '
            )
          ),
          !this.state.isFormValid && _react2.default.createElement(
            'div',
            null,
            'Form is not valid'
          )
        )
      );
    }
  }]);

  return DocForm;
}(_react2.default.Component);

exports.default = DocForm;