'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

var GalleryView = function (_Component) {
  _inherits(GalleryView, _Component);

  function GalleryView(props) {
    _classCallCheck(this, GalleryView);

    var _this = _possibleConstructorReturn(this, (GalleryView.__proto__ || Object.getPrototypeOf(GalleryView)).call(this, props));

    _this.state = {
      imagePreview: null,
      galleryWidth: 0
    };
    _this.handleResize = _this.handleResize.bind(_this);
    return _this;
  }

  _createClass(GalleryView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.handleResize();
      if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') {
        window.addEventListener('resize', this.handleResize);
      }
    }
  }, {
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
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') {
        window.removeEventListener('resize', this.handleResize);
      }
    }
  }, {
    key: 'handleResize',
    value: function handleResize() {
      var element = document.getElementById('rca-gallery');
      var width = element && element.clientWidth;
      if (width) {
        this.setState({ galleryWidth: width });
      }
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
          { className: 'rca-gallery', id: 'rca-gallery' },
          _data.map(function (item) {
            var url = item.url,
                file = item.file,
                tags = item.tags,
                objectId = item.objectId,
                desc = item.desc;

            var imageUrl = file ? file.url : url;
            if (!_this3.state.galleryWidth) return _react2.default.createElement('div', { key: objectId });
            var galleryImgWidth = (_this3.state.galleryWidth - 65) / 3;
            var galleryImgHight = (_this3.state.galleryWidth - 65) / 3 * 1.2;
            return _react2.default.createElement(
              'div',
              {
                key: objectId,
                className: 'rca-g-img-container',
                style: { width: galleryImgWidth }
              },
              _react2.default.createElement(
                'div',
                {
                  className: 'rca-g-img-wrapper',
                  onClick: function onClick() {
                    return _this3.setState({ imagePreview: objectId });
                  }
                },
                _react2.default.createElement('img', {
                  alt: '#',
                  src: imageUrl,
                  className: 'rca-g-img',
                  style: { width: '100%', height: galleryImgHight }
                })
              ),
              _react2.default.createElement(
                'div',
                { className: 'rca-g-moreOption ant-btn ant-btn-primary ant-btn-circle ant-btn-lg ant-btn-icon-only' },
                _this3.renderMenu(objectId)
              ),
              _react2.default.createElement(
                'div',
                { className: 'rca-g-footer' },
                _react2.default.createElement(
                  'h3',
                  { className: 'rca-g-title' },
                  item.title
                ),
                _react2.default.createElement(
                  'p',
                  { className: 'rca-g-desc' },
                  desc
                ),
                _react2.default.createElement(
                  'p',
                  { className: 'rca-g-tags' },
                  tags ? tags.join(', ') : ''
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'rca-g-footer-bottom' },
                  _this3.props.selectMode && _react2.default.createElement(
                    'div',
                    { className: 'rca-g-select-img' },
                    _react2.default.createElement(_antd.Checkbox, {
                      checked: _this3.props.selectedMedia.includes(objectId),
                      disabled: false,
                      onChange: function onChange() {
                        return _this3.props.onSelectMedia({ url: url, file: file, objectId: objectId });
                      }
                    })
                  ),
                  _react2.default.createElement(
                    'p',
                    { className: 'rca-g-date' },
                    ' ',
                    (0, _moment2.default)(item.createdAt).format('MMM Do, YYYY'),
                    ' '
                  )
                )
              ),
              _react2.default.createElement(
                _antd.Modal,
                {
                  className: 'rca-g-modal',
                  visible: _this3.state.imagePreview === objectId,
                  footer: null,
                  onCancel: function onCancel() {
                    return _this3.setState({ imagePreview: null });
                  }
                },
                _react2.default.createElement('img', {
                  alt: 'example',
                  src: imageUrl,
                  className: 'rca-g-img-in-modal'
                })
              )
            );
          })
        )
      );
    }
  }]);

  return GalleryView;
}(_react.Component);

exports.default = GalleryView;
module.exports = exports['default'];