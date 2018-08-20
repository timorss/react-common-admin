'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _configuration = require('../../configuration');

var _index = require('../../index');

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
    _this.onChangeAndBlur = _this.onChangeAndBlur.bind(_this);
    _this.onDelete = _this.onDelete.bind(_this);
    _this.toggleFileInclude = _this.toggleFileInclude.bind(_this);
    _this.onRefresh = _this.onRefresh.bind(_this);
    return _this;
  }

  /**
   * @function onPost
   * This function will run react-parse fetchDocument post
   * If parseDataBeforePost is undefined we will not pass an data
   * fetchDocument will use the data from reduxStore.parse...
   */


  _createClass(DocForm, [{
    key: 'onPost',
    value: function onPost() {
      var _props = this.props,
          parseDataBeforePost = _props.parseDataBeforePost,
          fetchProps = _props.fetchProps,
          modalId = _props.modalId;
      var _state = this.state,
          fileInclude = _state.fileInclude,
          fileValueHandler = _state.fileValueHandler;

      var dataToSend = parseDataBeforePost ? parseDataBeforePost(fetchProps.data) : null;
      fetchProps.post(dataToSend, fileInclude, fileValueHandler, null, { modalId: modalId });
    }

    /**
     * @function onPut
     * @param {obj} payload
     * @param {string} payload.key the key to update
     * @param {string} payload.value the value to set
     * @param {object} payload.info some info about the query, see react-parse dispatchId,fileInclude,fileValueHandler {dispatchId, fileInclude, fileValueHandler}
     * This function will run react-parse fetchDocument put
     */

  }, {
    key: 'onPut',
    value: function onPut(_ref) {
      var key = _ref.key,
          value = _ref.value,
          info = _ref.info;
      var _props2 = this.props,
          parseDataBeforePut = _props2.parseDataBeforePut,
          objectId = _props2.objectId,
          fetchProps = _props2.fetchProps;

      var _ref2 = info || {},
          dispatchId = _ref2.dispatchId,
          fileInclude = _ref2.fileInclude,
          fileValueHandler = _ref2.fileValueHandler;

      var hasFiles = this.state.fileInclude || fileInclude;
      var _fileValueHandler = this.state.fileValueHandler || fileValueHandler;
      var dataToEnd = parseDataBeforePut ? parseDataBeforePut(_defineProperty({}, key, value), objectId, fetchProps) : _defineProperty({}, key, value);
      this.props.fetchProps.put(dataToEnd, hasFiles, _fileValueHandler, dispatchId);
    }

    /**
     * @function onChange
     * @param {object} payload
     * @param {string} payload.key the key to update
     * @param {string} payload.value the value to set
     * @param {object} payload.info some info about the query, see react-parse dispatchId,fileInclude,fileValueHandler {dispatchId, fileInclude, fileValueHandler}
     * @param {boolean} payload.isValid This value come from react-cross-form
     * This function only manipulate a local data and didn't save it on the server yet, see react-parse updateField
     * but if info include the boolean putOnChange then we run this.onPut, this efficient for special inputs that didn't have onBlur
     */

  }, {
    key: 'onChange',
    value: function onChange(_ref4) {
      var key = _ref4.key,
          value = _ref4.value,
          info = _ref4.info,
          isValid = _ref4.isValid;

      // We need to know that fileInclude for the post with files if needed
      if (info && info.fileInclude) {
        this.toggleFileInclude(true, info.fileValueHandler);
      }
      // Make the local update
      this.props.fetchProps.updateField(key, value);
      // Put to Server if it is a existing document
      if (this.props.objectId && info && info.putOnChange) {
        // Value is valid
        if (isValid) {
          this.onPut({
            key: key,
            value: value,
            isValid: isValid,
            info: info
          });
        } else {
          // Value is not valid
          _configuration.notification.error('Your changes was not saved, input is not valid');
        }
      }
    }

    /**
     * @function onChangeAndBlur
     * @param {*} res
     * Some of the inputs didn't contain a blur event, this make it to work like onChange+onBlur
     */

  }, {
    key: 'onChangeAndBlur',
    value: function onChangeAndBlur(res) {
      if (!res.info) {
        res.info = {};
      }
      res.info.putOnChange = true;
      this.onChange(res);
    }

    /**
     * @function onBlur
     * @param {object} payload
     * @param {string} payload.key the key to update
     * @param {string} payload.value the value to set
     * @param {object} payload.initialValue This value comes from react-cross-form and helps us decide if we need to put data to the server
     * @param {object} payload.isValid This value comes from react-cross-form and helps us decide if we need to put data to the server
     * @param {object} payload.info some info about the query, see react-parse dispatchId,fileInclude,fileValueHandler {dispatchId, fileInclude, fileValueHandler}
     * also we let the option to pass the value inside the info and it will override the value from the input
     * because We work with react-cross-form, the blur event didn't pass any value, but you can pass info object with any data you want
     * we use this option to help special fields (like <uploadFile />) to pass a value with onBlur
     */

  }, {
    key: 'onBlur',
    value: function onBlur(payload) {
      var _props3 = this.props,
          objectId = _props3.objectId,
          saveOnBlur = _props3.saveOnBlur;
      var key = payload.key,
          initialValue = payload.initialValue,
          isValid = payload.isValid,
          info = payload.info,
          value = payload.value;

      var _value = value;
      // override the value if info contain a value
      if (info && typeof info.value !== 'undefined') {
        _value = info.value;
      }
      var isValueChanged = initialValue !== _value;
      var isExistingDocument = objectId;
      if (saveOnBlur && isExistingDocument && isValueChanged) {
        if (isValid) {
          this.onPut({
            key: key,
            value: _value,
            isValid: isValid,
            info: info && info.target ? null : info // if info.target is exist then is a input event and not relevant data
          });
        } else {
          // Value is not valid
          _configuration.notification.error('Your changes was not saved, input is not valid');
        }
      }
    }

    /**
     * @function toggleFileInclude
     * @param {boolean} value
     * @param {Function} fileValueHandler
     * This function will set on store a fileInclude flag fileValueHandler callback for react-parse
     */

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

    /**
     * @function onSubmit
     * @param {*} event
     * We want to prevent Default form submit
     */

  }, {
    key: 'onSubmit',
    value: function onSubmit(event) {
      event.preventDefault();
      // custom form handling here
    }

    /**
     * @function onDelete
     * This will run the react-parse deleteDoc
     */

  }, {
    key: 'onDelete',
    value: function onDelete() {
      var _props4 = this.props,
          fetchProps = _props4.fetchProps,
          modalId = _props4.modalId;

      fetchProps.deleteDoc(null, { modalId: modalId });
    }
  }, {
    key: 'onRefresh',
    value: function onRefresh() {
      var _props5 = this.props,
          fetchProps = _props5.fetchProps,
          onRefresh = _props5.onRefresh;

      fetchProps.refresh();
      if (onRefresh) {
        onRefresh();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props6 = this.props,
          onClose = _props6.onClose,
          objectId = _props6.objectId,
          saveOnBlur = _props6.saveOnBlur,
          fetchProps = _props6.fetchProps,
          fields = _props6.fields,
          fieldsOptions = _props6.fieldsOptions,
          showCloseButton = _props6.showCloseButton,
          showDeleteButton = _props6.showDeleteButton;
      var refresh = fetchProps.refresh,
          put = fetchProps.put,
          data = fetchProps.data;

      var isFirstLoading = objectId && (0, _isEmpty2.default)(data);
      return _react2.default.createElement(
        'div',
        { className: 'rca-docForm' },
        _react2.default.createElement(
          'form',
          { onSubmit: this.onSubmit },
          _react2.default.createElement(_index.Form, {
            fields: fields,
            data: data,
            validateType: isFirstLoading ? 'none' : 'all',
            onChange: this.onChange,
            onBlur: this.onBlur,
            onChangeAndBlur: this.onChangeAndBlur,
            onValidateStateChanged: function onValidateStateChanged(_ref5) {
              var isValid = _ref5.isValid,
                  unValidFields = _ref5.unValidFields;

              _this2.setState({ isFormValid: isValid });
            },
            toggleFileInclude: this.toggleFileInclude,
            fieldsOptions: fieldsOptions
          })
        ),
        _react2.default.createElement(
          'div',
          { style: { height: 50, pingTop: '1.6rem' } },
          !saveOnBlur && !objectId && _react2.default.createElement(
            _antd.Button,
            { type: 'primary', className: 'rca-m5', onClick: function onClick() {
                return put(data);
              } },
            'Update'
          ),
          !objectId && _react2.default.createElement(
            _antd.Button,
            { type: 'primary', onClick: this.onPost, className: 'rca-m5' },
            'Save'
          ),
          objectId && _react2.default.createElement(
            _antd.Button,
            { type: 'secondary', onClick: this.onRefresh, className: 'rca-m5' },
            'Refresh'
          ),
          objectId && showDeleteButton && _react2.default.createElement(
            _antd.Popconfirm,
            {
              title: 'Are you sure delete this ?',
              okType: 'danger',
              onConfirm: this.onDelete,
              okText: 'Yes', cancelText: 'No' },
            _react2.default.createElement(
              _antd.Button,
              { type: 'danger', className: 'rca-m5' },
              'Delete'
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


DocForm.defaultProps = {
  showCloseButton: true,
  showDeleteButton: true
};