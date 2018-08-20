'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDnd = require('react-dnd');

var _reactDndHtml5Backend = require('react-dnd-html5-backend');

var _reactDndHtml5Backend2 = _interopRequireDefault(_reactDndHtml5Backend);

var _DragBodyRow = require('./DragBodyRow');

var _Table = require('../Table');

var _Table2 = _interopRequireDefault(_Table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DraggableTable = function (_React$Component) {
  _inherits(DraggableTable, _React$Component);

  function DraggableTable(props) {
    _classCallCheck(this, DraggableTable);

    var _this = _possibleConstructorReturn(this, (DraggableTable.__proto__ || Object.getPrototypeOf(DraggableTable)).call(this, props));

    _this.components = {
      body: {
        row: _DragBodyRow.DragableBodyRow
      }
    };

    _this.moveRow = function (dragRow, hoverRow, group, groupBy) {
      var orderKey = _this.props.orderKey;

      var dragRowNewData = _defineProperty({}, orderKey, hoverRow[orderKey]);
      var hoverRowNewData = _defineProperty({}, orderKey, dragRow[orderKey]);
      if (groupBy && dragRow[groupBy] !== hoverRow[groupBy]) {
        dragRowNewData[groupBy] = hoverRow[groupBy];
        dragRowNewData[orderKey] = _this.getSortData(hoverRow[groupBy]).length;
        _this.props.fetchProps.put(dragRow.objectId, dragRowNewData);
      } else {
        _this.props.fetchProps.put(dragRow.objectId, dragRowNewData);
        _this.props.fetchProps.put(hoverRow.objectId, hoverRowNewData);
      }
    };

    _this.getSortData = _this.getSortData.bind(_this);
    return _this;
  }

  _createClass(DraggableTable, [{
    key: 'getSortData',
    value: function getSortData(group) {
      var _props = this.props,
          fetchProps = _props.fetchProps,
          orderKey = _props.orderKey,
          groupBy = _props.groupBy;

      var data = fetchProps ? fetchProps.data || [] : [];
      if (group) {
        return [].concat(_toConsumableArray(data)).filter(function (item) {
          return item[groupBy] === group;
        }).sort(function (a, b) {
          return a[orderKey] > b[orderKey];
        });
      }
      return [].concat(_toConsumableArray(data)).sort(function (a, b) {
        return a[orderKey] > b[orderKey];
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          groups = _props2.groups,
          groupBy = _props2.groupBy;

      if (groups) {
        return groups.map(function (group, index) {
          var data = _this2.getSortData(group);
          if (data.length) {
            return _react2.default.createElement(_Table2.default, _extends({
              subTitle: group,
              key: group,
              showHeader: index === 0,
              showPagination: index === groups.length - 1,
              draggableTable: true,
              draggableTableData: data,
              components: _this2.components,
              onRow: function onRow(index) {
                return {
                  index: index,
                  moveRow: function moveRow(dragRow, hoverRow) {
                    return _this2.moveRow(dragRow, hoverRow, group, groupBy);
                  }
                };
              }
            }, _this2.props));
          } else {
            return _react2.default.createElement(
              'p',
              null,
              group,
              ' is Empty'
            );
          }
        });
      }
      return _react2.default.createElement(_Table2.default, _extends({
        draggableTable: true,
        draggableTableData: this.getSortData(),
        components: this.components,
        onRow: function onRow(index) {
          return {
            index: index,
            moveRow: _this2.moveRow
          };
        }
      }, this.props));
    }
  }]);

  return DraggableTable;
}(_react2.default.Component);

var Demo = (0, _reactDnd.DragDropContext)(_reactDndHtml5Backend2.default)(DraggableTable);

Demo.defaultProps = {
  orderKey: 'index'
};
exports.default = Demo;