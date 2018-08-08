'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _helpers = require('../../utils/helpers');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Search = _antd.Input.Search;
var ButtonGroup = _antd.Button.Group;
var rowKey = 'objectId';

var GalleryView = function (_Component) {
  _inherits(GalleryView, _Component);

  function GalleryView(props) {
    _classCallCheck(this, GalleryView);

    var _this = _possibleConstructorReturn(this, (GalleryView.__proto__ || Object.getPrototypeOf(GalleryView)).call(this, props));

    _this.componentWillUnmount = function () {
      if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') {
        window.removeEventListener('resize', _this.handleResize);
      }
    };

    _this.state = {
      searchText: '',
      imagePreview: null,
      galleryWidth: 0
    };
    _this.onChange = _this.onChange.bind(_this);
    _this.onPagination = _this.onPagination.bind(_this);
    _this.onPageChange = _this.onPageChange.bind(_this);
    _this.onSearchChange = _this.onSearchChange.bind(_this);
    _this.onClearSearch = _this.onClearSearch.bind(_this);
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
    key: 'onChange',
    value: function onChange(pagination, filters, sorter) {
      var dataList = this.props.dataList;

      if (sorter && sorter.columnKey && sorter.order) {
        if (sorter.order === 'ascend') {
          dataList.getSortAsc(sorter.columnKey);
        } else {
          dataList.getSortDesc(sorter.columnKey);
        }
        this.setState({ dataList: dataList.getAll() });
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
            { key: 'edit', onClick: function onClick() {
                _this2.props.onEditDoc(objectId);
              } },
            _react2.default.createElement(_antd.Icon, { type: 'edit' }),
            ' ',
            'Edit'
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
              ' ',
              'Edit'
            )
          )
        );
      };
      return _react2.default.createElement(
        _antd.Dropdown,
        { overlay: renderMenus() },
        _react2.default.createElement(
          'a',
          { className: 'ant-dropdown-link', style: { color: '#6f8826' }, href: '#' },
          _react2.default.createElement(_antd.Icon, { type: 'ellipsis' })
        )
      );
    }
  }, {
    key: 'onSearchChange',
    value: function onSearchChange(key, value) {
      var _this3 = this;

      var fields = this.props.fields;

      this.setState(_defineProperty({}, key, value), function () {
        var _buildQuery;

        var newQuery = (0, _helpers.buildQuery)((_buildQuery = {}, _defineProperty(_buildQuery, key, value), _defineProperty(_buildQuery, 'fields', fields), _buildQuery));
        _this3.props.onQueryChanged(newQuery);
      });
    }
  }, {
    key: 'onClearSearch',
    value: function onClearSearch() {
      this.onSearchChange('searchText', '');
    }
  }, {
    key: 'onPageChange',
    value: function onPageChange(page, pageSize) {
      var _props = this.props,
          onSkipChanged = _props.onSkipChanged,
          limit = _props.limit;

      onSkipChanged(page * limit);
    }
  }, {
    key: 'handleResize',
    value: function handleResize() {
      var elment = document.getElementById('rca-gallery');
      var width = elment && elment.clientWidth;
      if (width) {
        this.setState({ galleryWidth: width });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var props = this.props;
      var fetchProps = props.fetchProps,
          isLoading = props.isLoading,
          limit = props.limit,
          onCreateNewDoc = props.onCreateNewDoc;
      var info = fetchProps.info,
          data = fetchProps.data,
          refresh = fetchProps.refresh;

      var _data = data || [];
      var selectedRows = this.state.selectedRows;

      var numberOfRows = info ? info.count : 0;
      var isOneRowSelected = selectedRows && selectedRows.length === 1;
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'genericTable' },
          _react2.default.createElement(
            'div',
            { className: 'genericTableHeaderBtn' },
            _react2.default.createElement(
              'div',
              { className: 'gLSearchWrapper' },
              _react2.default.createElement(Search, {
                className: 'searchInput',
                placeholder: 'input search text',
                onChange: function onChange(e) {
                  return _this4.onSearchChange('searchText', e.target.value);
                },
                value: this.state.searchText
              }),
              _react2.default.createElement(
                _antd.Button,
                { type: 'secondary', onClick: this.onClearSearch },
                'clear'
              )
            ),
            _react2.default.createElement(
              _antd.Button,
              { type: 'secondary',
                className: 'mL15',
                loading: isLoading || this.state.loading,
                onClick: function onClick() {
                  _this4.showLoader(1000);
                  refresh();
                }
              },
              'Refresh'
            ),
            isOneRowSelected && _react2.default.createElement(
              _antd.Popconfirm,
              {

                okType: 'danger',
                title: 'Are you sure delete this ?',
                onConfirm: function onConfirm() {
                  console.log(_this4.props);
                } //;this.props.fetchProps.deleteDoc(selectedRows[0].objectId)}
                , okText: 'Yes',
                cancelText: 'No'
              },
              _react2.default.createElement(
                _antd.Button,
                { type: 'danger', className: 'mL15' },
                'Delete'
              )
            ),
            isOneRowSelected && _react2.default.createElement(
              _antd.Button,
              { type: 'warning', onClick: function onClick() {
                  return _this4.props.onEditDoc(selectedRows[0].objectId);
                }, className: 'mL15' },
              'Edit'
            ),
            _react2.default.createElement(
              _antd.Button,
              { type: 'primary', ghost: true, onClick: onCreateNewDoc, className: 'mL15' },
              'Create'
            )
          ),
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
              if (!_this4.state.galleryWidth) return _react2.default.createElement('div', { key: objectId });
              var galleryImgWidth = (_this4.state.galleryWidth - 65) / 3;
              var galleryImgHight = (_this4.state.galleryWidth - 65) / 3 * 1.2;
              return _react2.default.createElement(
                'div',
                { key: objectId, className: 'rca-g-img-container', style: { width: galleryImgWidth } },
                _react2.default.createElement(
                  'div',
                  { className: 'rca-g-img-wrapper', onClick: function onClick() {
                      return _this4.setState({ imagePreview: objectId });
                    } },
                  _react2.default.createElement('img', { alt: '#', src: imageUrl, className: 'rca-g-img', style: { width: '100%', height: galleryImgHight } })
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'rca-g-moreOption' },
                  _this4.renderMenu(objectId)
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
                    _this4.props.selectMode && _react2.default.createElement(
                      'div',
                      { className: 'rca-g-select-img' },
                      _react2.default.createElement(_antd.Checkbox, {
                        checked: _this4.props.selectedMedia.indexOf(objectId) > -1,
                        disabled: false,
                        onChange: function onChange() {
                          return _this4.props.onSelectMedia({ url: url, file: file, objectId: objectId });
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
                  { className: 'rca-g-modal', visible: _this4.state.imagePreview === objectId, footer: null, onCancel: function onCancel() {
                      return _this4.setState({ imagePreview: null });
                    } },
                  _react2.default.createElement('img', { alt: 'example', src: imageUrl, className: 'rca-g-img-in-modal' })
                )
              );
            })
          )
        ),
        _react2.default.createElement(_antd.Pagination, {
          style: { textAlign: 'right' },
          showSizeChanger: true,
          onShowSizeChange: this.onPagination,
          onChange: this.onPagination,
          defaultCurrent: this.props.skip / this.props.limit || 1,
          total: numberOfRows || 0
        })
      );
    }
  }]);

  return GalleryView;
}(_react.Component);

exports.default = GalleryView;