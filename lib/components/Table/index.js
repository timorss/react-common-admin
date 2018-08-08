'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _helpers = require('../../utils/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Search = _antd.Input.Search;
var ButtonGroup = _antd.Button.Group;
var rowKey = 'objectId';

var SortView = function (_Component) {
  _inherits(SortView, _Component);

  function SortView(props) {
    _classCallCheck(this, SortView);

    var _this2 = _possibleConstructorReturn(this, (SortView.__proto__ || Object.getPrototypeOf(SortView)).call(this, props));

    _this2.componentWillUnmount = function () {
      _this2.loaderTimeOut && clearTimeout(_this2.loaderTimeOut);
    };

    _this2.state = {
      selectedRows: [],
      searchText: ''
    };
    _this2.onChange = _this2.onChange.bind(_this2);
    _this2.convertPageFieldsToAntTableColumn = _this2.convertPageFieldsToAntTableColumn.bind(_this2);
    _this2.onPagination = _this2.onPagination.bind(_this2);
    _this2.onSelectRow = _this2.onSelectRow.bind(_this2);
    _this2.toggleRow = _this2.toggleRow.bind(_this2);
    _this2.renderRowButtons = _this2.renderRowButtons.bind(_this2);
    _this2.onPageChange = _this2.onPageChange.bind(_this2);
    _this2.isRowSelected = _this2.isRowSelected.bind(_this2);
    _this2.onSearchChange = _this2.onSearchChange.bind(_this2);
    _this2.onClearSearch = _this2.onClearSearch.bind(_this2);
    return _this2;
  }

  _createClass(SortView, [{
    key: 'onPagination',
    value: function onPagination(page, pageSize) {
      this.props.onPagination(page, pageSize);
    }
  }, {
    key: 'isRowSelected',
    value: function isRowSelected(row) {
      return this.state.selectedRows.indexOf(row[rowKey]) !== -1;
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
    key: 'renderRowButtons',
    value: function renderRowButtons() {
      var _this3 = this;

      var row = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var _this = this;
      // console.log('renderRowButton',{ object, props: this.props})
      var isSelected = this.isRowSelected(row);
      var hasDelete = this.props.fetchProps && this.props.fetchProps.deleteDoc; // react-parse cloudcode missing deleteDoc
      return _react2.default.createElement(
        ButtonGroup,
        { style: { display: 'flex' } },
        _react2.default.createElement(_antd.Button, {
          icon: 'edit',
          onClick: function onClick() {
            return _this3.props.onEditDoc(row.objectId);
          }
        }),
        hasDelete && _react2.default.createElement(
          _antd.Popconfirm,
          {
            okType: 'danger',
            title: 'Are you sure delete this ?',
            onConfirm: function onConfirm() {
              return _this3.props.fetchProps.deleteDoc(row.objectId);
            },
            okText: 'Yes',
            cancelText: 'No'
          },
          _react2.default.createElement(_antd.Button, { icon: 'delete' })
        )
      );
    }
  }, {
    key: 'onSearchChange',
    value: function onSearchChange(key, value) {
      var _this4 = this;

      var fields = this.props.fields;

      this.setState(_defineProperty({}, key, value), function () {
        var _buildQuery;

        var newQuery = (0, _helpers.buildQuery)((_buildQuery = {}, _defineProperty(_buildQuery, key, value), _defineProperty(_buildQuery, 'fields', fields), _buildQuery));
        _this4.props.onQueryChanged(newQuery);
      });
    }
  }, {
    key: 'onClearSearch',
    value: function onClearSearch() {
      var fields = this.props.fields;

      this.onSearchChange('searchText', '');
    }
  }, {
    key: 'convertPageFieldsToAntTableColumn',
    value: function convertPageFieldsToAntTableColumn() {
      var _this5 = this;

      var _props = this.props,
          fields = _props.fields,
          fetchProps = _props.fetchProps,
          extraData = _props.extraData;
      // const {data} = fetchProps

      var columns = [];
      fields.forEach(function (field) {
        columns.push({
          title: field.title,
          key: field.key,
          width: field.actionBtn ? 50 : field.width,
          render: function render(object) {
            if (field.actionBtn /*field.key === rowKey && this.isRowSelected(object)*/) {
                return _this5.renderRowButtons(object);
              } else if (field.formatter) {
              return field.formatter(object[field.key], object, field, extraData);
            } else {
              return _react2.default.createElement(
                'p',
                null,
                object[field.key]
              );
            }
          }
        });
      });
      return columns;
    }
  }, {
    key: 'onSelectRow',
    value: function onSelectRow(selectedRows, toggleRow) {
      this.setState({ selectedRows: selectedRows });
    }
  }, {
    key: 'toggleRow',
    value: function toggleRow(row) {
      if (this.isRowSelected(row)) {
        var selectedRows = this.state.selectedRows.filter(function (item) {
          return item !== row.objectId;
        });
        this.setState({ selectedRows: selectedRows });
      } else {
        this.state.selectedRows.push(row.objectId);
        this.setState({ selectedRows: this.state.selectedRows });
      }
    }
  }, {
    key: 'onPageChange',
    value: function onPageChange(page, pageSize) {
      var _props2 = this.props,
          onSkipChanged = _props2.onSkipChanged,
          limit = _props2.limit;

      onSkipChanged(page * limit);
    }
  }, {
    key: 'showLoader',
    value: function showLoader(delay) {
      var _this6 = this;

      var _this = this;
      this.setState({ loading: true }, function () {
        _this6.loaderTimeOut = setTimeout(function () {
          _this.setState({ loading: false });
        }, delay);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this7 = this;

      var props = this.props;
      var fetchProps = props.fetchProps,
          isLoading = props.isLoading,
          onCreateNewDoc = props.onCreateNewDoc;
      var info = fetchProps.info,
          data = fetchProps.data,
          refresh = fetchProps.refresh;
      var selectedRows = this.state.selectedRows;

      var rowSelection = {
        selectedRowKeys: selectedRows,
        onChange: this.onSelectRow
      };
      var numberOfRows = info ? info.count : 0;
      var isOneRowSelected = selectedRows && selectedRows.length === 1;
      var hasDelete = this.props.fetchProps && this.props.fetchProps.deleteDoc; // react-parse cloudcode missing deleteDoc
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
                  return _this7.onSearchChange('searchText', e.target.value);
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
                  _this7.showLoader(1000);
                  refresh();
                }
              },
              'Refresh'
            ),
            isOneRowSelected && hasDelete && _react2.default.createElement(
              _antd.Popconfirm,
              {

                okType: 'danger',
                title: 'Are you sure delete this ?',
                onConfirm: function onConfirm() {
                  return _this7.props.fetchProps.deleteDoc(selectedRows[0]);
                },
                okText: 'Yes',
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
                  return _this7.props.onEditDoc(selectedRows[0]);
                }, className: 'mL15' },
              'Edit'
            ),
            _react2.default.createElement(
              _antd.Button,
              { type: 'primary', ghost: true, onClick: onCreateNewDoc, className: 'mL15' },
              'Add'
            )
          ),
          _react2.default.createElement(_antd.Table, {
            rowKey: rowKey,
            columns: this.convertPageFieldsToAntTableColumn(),
            onChange: this.onChange,
            dataSource: data || [],
            className: 'isoSortingTable',
            loading: isLoading,
            rowSelection: rowSelection,
            pagination: {
              showSizeChanger: true,
              onShowSizeChange: this.onPagination,
              onChange: this.onPagination,
              defaultCurrent: this.props.skip / this.props.limit || 1,
              total: numberOfRows || 0
            }
          })
        )
      );
    }
  }]);

  return SortView;
}(_react.Component);

exports.default = SortView;
module.exports = exports['default'];