'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _helpers = require('../../utils/helpers');

var _ListWrapper = require('../ListWrapper');

var _ListWrapper2 = _interopRequireDefault(_ListWrapper);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Meta = _antd.Card.Meta;

var GalleryView = function (_Component) {
  _inherits(GalleryView, _Component);

  function GalleryView(props) {
    _classCallCheck(this, GalleryView);

    var _this = _possibleConstructorReturn(this, (GalleryView.__proto__ || Object.getPrototypeOf(GalleryView)).call(this, props));

    _this.state = {
      imagePreview: null
    };
    return _this;
  }

  _createClass(GalleryView, [{
    key: 'onPagination',
    value: function onPagination(page, pageSize) {
      this.props.onPagination(page, pageSize);
    }
  }, {
    key: 'renderMenu',
    value: function renderMenu(objectId) {
      var _this2 = this;

      var renderMenus = function renderMenus() {
        return _react2.default.createElement(
          _antd.Menu,
          null,
          _react2.default.createElement(
            _antd.Menu.Item,
            {
              key: 'edit',
              onClick: function onClick() {
                _this2.props.onEditDoc(objectId);
              }
            },
            _react2.default.createElement(_antd.Icon, { type: 'edit' }),
            ' Edit'
          ),
          _react2.default.createElement(
            _antd.Menu.Item,
            { key: 'remove' },
            _react2.default.createElement(
              _antd.Popconfirm,
              {
                okType: 'danger',
                title: 'Are you sure delete this ?',
                onConfirm: function onConfirm() {
                  return _this2.props.fetchProps.deleteDoc(objectId);
                },
                okText: 'Yes',
                cancelText: 'No'
              },
              _react2.default.createElement(_antd.Icon, { type: 'delete' }),
              ' Delete'
            )
          )
        );
      };
      return _react2.default.createElement(
        _antd.Dropdown,
        { overlay: renderMenus() },
        _react2.default.createElement(
          'a',
          { className: 'ant-dropdown-link', style: { color: 'white' }, href: '#' },
          _react2.default.createElement(_antd.Icon, { type: 'ellipsis' })
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var props = this.props;
      var fetchProps = props.fetchProps;
      var data = fetchProps.data;

      var _data = data || [];
      var selectedRows = this.state.selectedRows;

      var isOneRowSelected = selectedRows && selectedRows.length === 1;
      return _react2.default.createElement(
        _ListWrapper2.default,
        _extends({}, this.props, { isOneRowSelected: isOneRowSelected }),
        _react2.default.createElement(
          'div',
          { className: 'rca-gallery' },
          _data.map(function (item) {
            var url = item.url,
                file = item.file,
                title = item.title,
                tags = item.tags,
                objectId = item.objectId,
                desc = item.desc,
                alt = item.alt;

            var imageUrl = file ? file.url : url;
            return _react2.default.createElement(
              _antd.Card,
              {
                key: objectId,
                hoverable: true,
                className: 'rca-g-img-card',
                cover: _react2.default.createElement(
                  'div',
                  { className: 'rca-g-cover' },
                  _react2.default.createElement(
                    'a',
                    { onClick: function onClick() {
                        return _this3.setState({ showImagePreview: true, imagePreviewUrl: imageUrl, imagePreviewAlt: alt });
                      } },
                    _react2.default.createElement('img', { alt: alt, className: 'rca-g-img', src: imageUrl, width: '600', height: '400' })
                  ),
                  _this3.props.selectMode && _react2.default.createElement(
                    'div',
                    { className: 'rca-g-select', onClick: function onClick() {
                        return _this3.props.onSelectMedia({ url: url, file: file, objectId: objectId });
                      } },
                    _react2.default.createElement(_antd.Checkbox, {
                      checked: _this3.props.selectedMedia.includes(objectId),
                      disabled: false,
                      onChange: function onChange() {
                        return _this3.props.onSelectMedia({ url: url, file: file, objectId: objectId });
                      }
                    })
                  )
                ),
                actions: [_react2.default.createElement(
                  'div',
                  { className: 'rca-g-actions', key: 'actions' },
                  _react2.default.createElement(
                    'a',
                    { onClick: function onClick() {
                        _this3.props.onEditDoc(objectId);
                      }, className: 'rca-g-editBtn' },
                    _react2.default.createElement(_antd.Icon, { type: 'edit' })
                  ),
                  _react2.default.createElement(
                    _antd.Popconfirm,
                    {
                      okType: 'danger',
                      title: 'Are you sure delete this ?',
                      onConfirm: function onConfirm() {
                        return _this3.props.fetchProps.deleteDoc(objectId);
                      },
                      okText: 'Yes',
                      cancelText: 'No'
                    },
                    _react2.default.createElement(_antd.Icon, { type: 'delete', className: 'rca-g-deleteBtn' })
                  )
                )]
              },
              _react2.default.createElement(Meta, {
                title: title || '',
                description: (desc || '') + '\n ' + (tags ? tags.join(', ') : '')
              })
            );
          })
        ),
        _react2.default.createElement(
          _antd.Modal,
          {
            className: 'rca-g-modal',
            visible: this.state.showImagePreview,
            footer: null,
            onCancel: function onCancel() {
              return _this3.setState({ showImagePreview: false, imagePreviewUrl: null, imagePreviewAlt: null });
            }
          },
          _react2.default.createElement('img', {
            alt: this.state.imagePreviewAlt,
            src: this.state.imagePreviewUrl,
            className: 'rca-g-img-in-modal'
          })
        )
      );
    }
  }]);

  return GalleryView;
}(_react.Component);

exports.default = GalleryView;
module.exports = exports['default'];