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

var _ListWrapper = require('../ListWrapper');

var _ListWrapper2 = _interopRequireDefault(_ListWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ButtonGroup = _antd.Button.Group;
var rowKey = 'objectId';

var SortView = function (_Component) {
  _inherits(SortView, _Component);

  function SortView(props) {
    _classCallCheck(this, SortView);

    var _this = _possibleConstructorReturn(this, (SortView.__proto__ || Object.getPrototypeOf(SortView)).call(this, props));

    _this.state = {
      selectedRows: [],
      searchText: ''
    };
    _this.convertPageFieldsToAntTableColumn = _this.convertPageFieldsToAntTableColumn.bind(_this);
    _this.onSelectRow = _this.onSelectRow.bind(_this);
    _this.toggleRow = _this.toggleRow.bind(_this);
    _this.renderRowButtons = _this.renderRowButtons.bind(_this);
    _this.isRowSelected = _this.isRowSelected.bind(_this);
    return _this;
  }

  _createClass(SortView, [{
    key: 'isRowSelected',
    value: function isRowSelected(row) {
      return this.state.selectedRows.includes(row[rowKey]);
    }
  }, {
    key: 'renderRowButtons',
    value: function renderRowButtons() {
      var _this2 = this;

      var row = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var hasDelete = this.props.fetchProps && this.props.fetchProps.deleteDoc; // react-parse cloudcode missing deleteDoc
      return _react2.default.createElement(
        ButtonGroup,
        { style: { display: 'flex' } },
        _react2.default.createElement(_antd.Button, {
          icon: 'edit',
          onClick: function onClick() {
            return _this2.props.onEditDoc(row.objectId);
          }
        }),
        hasDelete && _react2.default.createElement(
          _antd.Popconfirm,
          {
            okType: 'danger',
            title: 'Are you sure delete this ?',
            onConfirm: function onConfirm() {
              return _this2.props.fetchProps.deleteDoc(row.objectId);
            },
            okText: 'Yes',
            cancelText: 'No'
          },
          _react2.default.createElement(_antd.Button, { icon: 'delete' })
        )
      );
    }
  }, {
    key: 'convertPageFieldsToAntTableColumn',
    value: function convertPageFieldsToAntTableColumn() {
      var _this3 = this;

      var _props = this.props,
          fields = _props.fields,
          extraData = _props.extraData;

      var columns = [];
      fields.forEach(function (field) {
        columns.push({
          title: field.title,
          key: field.key,
          width: field.actionBtn ? 50 : field.width,
          render: function render(object) {
            if (field.actionBtn /*field.key === rowKey && this.isRowSelected(object)*/) {
                return _this3.renderRowButtons(object);
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
    key: 'render',
    value: function render() {
      var props = this.props;
      var fetchProps = props.fetchProps;
      var data = fetchProps.data;

      var isLoading = props.isLoading || fetchProps.isLoading;
      var selectedRows = this.state.selectedRows;

      var rowSelection = {
        selectedRowKeys: selectedRows,
        onChange: this.onSelectRow
      };
      // const numberOfRows = info ? info.count : 0;
      var isOneRowSelected = selectedRows && selectedRows.length === 1;
      return _react2.default.createElement(
        _ListWrapper2.default,
        _extends({}, this.props, { isOneRowSelected: isOneRowSelected }),
        _react2.default.createElement(_antd.Table, {
          rowKey: rowKey,
          columns: this.convertPageFieldsToAntTableColumn(),
          onChange: this.onChange,
          dataSource: data || [],
          className: 'rca-table',
          loading: false,
          rowSelection: rowSelection,
          pagination: false
        })
      );
    }
  }]);

  return SortView;
}(_react.Component);

exports.default = SortView;
module.exports = exports['default'];