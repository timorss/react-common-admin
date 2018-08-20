'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DragableBodyRow = exports.BodyRow = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _reactDnd = require('react-dnd');

var _reactDndHtml5Backend = require('react-dnd-html5-backend');

var _reactDndHtml5Backend2 = _interopRequireDefault(_reactDndHtml5Backend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function dragDirection(dragIndex, hoverIndex, initialClientOffset, clientOffset, sourceClientOffset) {
  var hoverMiddleY = (initialClientOffset.y - sourceClientOffset.y) / 2;
  var hoverClientY = clientOffset.y - sourceClientOffset.y;
  if (dragIndex < hoverIndex && hoverClientY > hoverMiddleY) {
    return 'downward';
  }
  if (dragIndex > hoverIndex && hoverClientY < hoverMiddleY) {
    return 'upward';
  }
}

var BodyRow = function (_React$Component) {
  _inherits(BodyRow, _React$Component);

  function BodyRow() {
    _classCallCheck(this, BodyRow);

    return _possibleConstructorReturn(this, (BodyRow.__proto__ || Object.getPrototypeOf(BodyRow)).apply(this, arguments));
  }

  _createClass(BodyRow, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          isOver = _props.isOver,
          connectDragSource = _props.connectDragSource,
          connectDropTarget = _props.connectDropTarget,
          moveRow = _props.moveRow,
          dragRow = _props.dragRow,
          clientOffset = _props.clientOffset,
          sourceClientOffset = _props.sourceClientOffset,
          initialClientOffset = _props.initialClientOffset,
          restProps = _objectWithoutProperties(_props, ['isOver', 'connectDragSource', 'connectDropTarget', 'moveRow', 'dragRow', 'clientOffset', 'sourceClientOffset', 'initialClientOffset']);
      // const style = { ...restProps.style, cursor: 'move' };

      var className = restProps.className;
      if (isOver && initialClientOffset) {
        var direction = dragDirection(dragRow.index, restProps.index, initialClientOffset, clientOffset, sourceClientOffset);
        if (direction === 'downward') {
          className = 'rca-drop-over-downward';
        }
        if (direction === 'upward') {
          className = 'rca-drop-over-upward';
        }
      }

      return connectDragSource(connectDropTarget(_react2.default.createElement('tr', _extends({}, restProps, {
        className: className
      }))));
    }
  }]);

  return BodyRow;
}(_react2.default.Component);

var rowSource = {
  beginDrag: function beginDrag(props) {
    return {
      index: props.index
    };
  }
};

var rowTarget = {
  drop: function drop(props, monitor) {
    var dragIndex = monitor.getItem().index;
    var hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Time to actually perform the action
    props.moveRow(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

var DragableBodyRow = (0, _reactDnd.DropTarget)('row', rowTarget, function (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    sourceClientOffset: monitor.getSourceClientOffset()
  };
})((0, _reactDnd.DragSource)('row', rowSource, function (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    dragRow: monitor.getItem(),
    clientOffset: monitor.getClientOffset(),
    initialClientOffset: monitor.getInitialClientOffset()
  };
})(BodyRow));

exports.BodyRow = BodyRow;
exports.DragableBodyRow = DragableBodyRow;