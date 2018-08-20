'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _helpers = require('../../utils/helpers');

var _helpers2 = require('src/logic/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Search = _antd.Input.Search;

var ListWrapper = function (_Component) {
  _inherits(ListWrapper, _Component);

  function ListWrapper(props) {
    _classCallCheck(this, ListWrapper);

    var _this = _possibleConstructorReturn(this, (ListWrapper.__proto__ || Object.getPrototypeOf(ListWrapper)).call(this, props));

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
    _this.renderAddBtn = _this.renderAddBtn.bind(_this);
    _this.onEdit = _this.onEdit.bind(_this);
    _this.onDelete = _this.onDelete.bind(_this);
    _this.renderDeleteButton = _this.renderDeleteButton.bind(_this);
    _this.renderSearch = _this.renderSearch.bind(_this);
    _this.onInputSearch = _this.onInputSearch.bind(_this);
    _this.onRefresh = _this.onRefresh.bind(_this);
    return _this;
  }

  _createClass(ListWrapper, [{
    key: 'onRefresh',
    value: function onRefresh() {
      var _props = this.props,
          fetchProps = _props.fetchProps,
          onRefresh = _props.onRefresh;

      fetchProps.refresh();
      if (onRefresh) {
        onRefresh();
      }
    }
  }, {
    key: 'renderSearch',
    value: function renderSearch() {
      return _react2.default.createElement(
        'div',
        { className: 'rca-listWrapper-search' },
        _react2.default.createElement(Search, {
          className: 'rca-listWrapper-searchInput',
          placeholder: 'input search text',
          onChange: this.onInputSearch,
          value: this.state.searchText
        }),
        _react2.default.createElement(
          _antd.Button,
          { type: 'secondary', onClick: this.onClearSearch },
          'clear'
        )
      );
    }
  }, {
    key: 'renderDeleteButton',
    value: function renderDeleteButton() {
      return _react2.default.createElement(
        _antd.Popconfirm,
        {
          okType: 'danger',
          title: 'Are you sure delete this ?',
          onConfirm: this.onDelete,
          okText: 'Yes',
          cancelText: 'No'
        },
        _react2.default.createElement(
          _antd.Button,
          { type: 'danger', className: 'rca-mL15' },
          'Delete'
        )
      );
    }
  }, {
    key: 'renderAddBtn',
    value: function renderAddBtn() {
      var _props2 = this.props,
          onCreateNewDoc = _props2.onCreateNewDoc,
          renderAddBtn = _props2.renderAddBtn;

      if (renderAddBtn) {
        return renderAddBtn(this.props);
      } else {
        return _react2.default.createElement(
          _antd.Button,
          { type: 'primary', ghost: true, onClick: onCreateNewDoc, className: 'mL15' },
          'Add'
        );
      }
    }
  }, {
    key: 'renderPagination',
    value: function renderPagination() {
      var props = this.props;
      var fetchProps = props.fetchProps;
      var info = fetchProps.info;

      var numberOfRows = info ? info.count : 0;
      return _react2.default.createElement(_antd.Pagination, {
        style: { textAlign: 'right' },
        showSizeChanger: true,
        onShowSizeChange: this.onPagination,
        onChange: this.onPagination,
        defaultCurrent: this.props.skip / this.props.limit || 1,
        total: numberOfRows || 0
      });
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
              ' Edit'
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
      var _props3 = this.props,
          onSkipChanged = _props3.onSkipChanged,
          limit = _props3.limit;

      onSkipChanged(page * limit);
    }
  }, {
    key: 'onEdit',
    value: function onEdit() {
      var rowId = this.props.selectedRows[0];
      if (this.props.customOnEdit) {
        this.props.customOnEdit(rowId, this.props);
      } else {
        this.props.onEditDoc(rowId, this.props);
      }
    }
  }, {
    key: 'onDelete',
    value: function onDelete() {
      this.props.fetchProps.deleteDoc(this.props.selectedRows[0]);
    }
  }, {
    key: 'onInputSearch',
    value: function onInputSearch(e) {
      this.onSearchChange('searchText', e.target.value);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props,
          fetchProps = _props4.fetchProps,
          isOneRowSelected = _props4.isOneRowSelected,
          showPagination = _props4.showPagination,
          showHeader = _props4.showHeader,
          subTitle = _props4.subTitle;

      var isLoading = this.props.isLoading || fetchProps.isLoading;
      var hasSubTitle = ~(0, _helpers2.isEmptyString)(subTitle);
      return _react2.default.createElement(
        'div',
        { className: 'rca-listWrapper-Screen' },
        _react2.default.createElement(
          'div',
          { className: 'rca-listWrapper-Screen-Content' },
          isLoading && showHeader && _react2.default.createElement(_antd.Spin, { className: 'rca-listWrapper-loader' }),
          showHeader && _react2.default.createElement(
            'div',
            { className: 'rca-listWrapper-header' },
            this.renderSearch(),
            _react2.default.createElement(
              'div',
              { className: 'rca-listWrapper-actions' },
              _react2.default.createElement(
                _antd.Button,
                { type: 'secondary', className: 'rca-mL15', onClick: this.onRefresh },
                'Refresh'
              ),
              isOneRowSelected && this.renderDeleteButton(),
              isOneRowSelected && _react2.default.createElement(
                _antd.Button,
                { type: 'warning', onClick: this.onEdit, className: 'rca-mL15' },
                'Edit'
              ),
              this.renderAddBtn()
            )
          ),
          hasSubTitle && _react2.default.createElement(
            'h3',
            null,
            subTitle
          ),
          _react2.default.createElement(
            'div',
            { className: 'rca-listWrapper-body' },
            this.props.children
          ),
          showPagination && this.renderPagination()
        )
      );
    }
  }]);

  return ListWrapper;
}(_react.Component);

ListWrapper.defaultProps = {
  showPagination: true,
  showHeader: true,
  onEditDoc: function onEditDoc() {
    return console.log('ListWrapper - missing onEditDoc');
  }
};
exports.default = ListWrapper;
module.exports = exports['default'];