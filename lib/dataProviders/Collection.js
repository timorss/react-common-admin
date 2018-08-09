'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactParse = require('react-parse');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Collection = function (_React$Component) {
  _inherits(Collection, _React$Component);

  function Collection(props) {
    _classCallCheck(this, Collection);

    var _this = _possibleConstructorReturn(this, (Collection.__proto__ || Object.getPrototypeOf(Collection)).call(this, props));

    _this.state = {
      query: _this.props.query,
      limit: _this.props.limit,
      skip: _this.props.skip,
      order: _this.props.order
    };
    _this.onQueryChanged = _this.onQueryChanged.bind(_this);
    _this.onLimitChanged = _this.onLimitChanged.bind(_this);
    _this.onSkipChanged = _this.onSkipChanged.bind(_this);
    _this.onOrderChanged = _this.onOrderChanged.bind(_this);
    _this.onPagination = _this.onPagination.bind(_this);
    _this.getLimit = _this.getLimit.bind(_this);
    _this.getSkip = _this.getSkip.bind(_this);
    _this.getOrder = _this.getOrder.bind(_this);
    return _this;
  }

  _createClass(Collection, [{
    key: 'onPagination',
    value: function onPagination(page, size) {
      if (this.props.onPagination) {
        this.props.onPagination(page, size);
      } else {
        this.setState({
          skip: (page - 1) * size,
          limit: size
        });
      }
    }
  }, {
    key: 'onLimitChanged',
    value: function onLimitChanged(limit) {
      if (this.props.onLimitChanged) {
        this.props.onLimitChanged(limit);
      } else {
        this.setState({ limit: limit });
      }
    }
  }, {
    key: 'onQueryChanged',
    value: function onQueryChanged(query) {
      if (this.props.onQueryChanged) {
        this.props.onQueryChanged(query);
      } else {
        this.setState({ query: query });
      }
    }
  }, {
    key: 'onSkipChanged',
    value: function onSkipChanged(skip) {
      if (this.props.onQueryChanged) {
        this.props.onSkipChanged(skip);
      } else {
        this.setState({ skip: skip });
      }
    }
  }, {
    key: 'onOrderChanged',
    value: function onOrderChanged(order) {
      if (this.props.onQueryChanged) {
        this.props.onOrderChanged(order);
      } else {
        this.setState({ order: order });
      }
    }
  }, {
    key: 'getLimit',
    value: function getLimit() {
      var _props = this.props,
          onLimitChanged = _props.onLimitChanged,
          limit = _props.limit;

      if (onLimitChanged) return limit;
      return this.state.limit;
    }
  }, {
    key: 'getSkip',
    value: function getSkip() {
      var _props2 = this.props,
          onSkipChanged = _props2.onSkipChanged,
          skip = _props2.skip;

      if (onSkipChanged) return skip;
      return this.state.skip;
    }
  }, {
    key: 'getOrder',
    value: function getOrder() {
      var _props3 = this.props,
          onOrderChanged = _props3.onOrderChanged,
          order = _props3.order;

      if (onOrderChanged) return order;
      return this.state.order;
    }
  }, {
    key: 'getQuery',
    value: function getQuery() {
      var _props4 = this.props,
          onQueryChanged = _props4.onQueryChanged,
          query = _props4.query;

      if (onQueryChanged) return query;
      return this.state.query;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props5 = this.props,
          targetName = _props5.targetName,
          schemaName = _props5.schemaName,
          query = _props5.query,
          leaveClean = _props5.leaveClean,
          viewComponent = _props5.viewComponent,
          onClose = _props5.onClose,
          extraData = _props5.extraData,
          onCreateNewDoc = _props5.onCreateNewDoc,
          onEditDoc = _props5.onEditDoc,
          fields = _props5.fields,
          keys = _props5.keys,
          include = _props5.include,
          functionName = _props5.functionName,
          dataHandler = _props5.dataHandler,
          tableProps = _props5.tableProps,
          resProps = _objectWithoutProperties(_props5, ['targetName', 'schemaName', 'query', 'leaveClean', 'viewComponent', 'onClose', 'extraData', 'onCreateNewDoc', 'onEditDoc', 'fields', 'keys', 'include', 'functionName', 'dataHandler', 'tableProps']);

      var props = _extends({}, resProps, {
        key: targetName,
        targetName: targetName,
        keys: keys,
        include: include,
        leaveClean: true,
        enableCount: true,
        // Call backs
        // Info that will pass to viewComponent
        // -- Method to close modal
        onClose: onClose, // Method to close modal,
        onCreateNewDoc: onCreateNewDoc,
        onEditDoc: onEditDoc,
        // -- fields to render
        fields: fields,
        limit: this.getLimit(),
        skip: this.getSkip(),
        order: this.getOrder(),
        onQueryChanged: this.onQueryChanged,
        onLimitChanged: this.onLimitChanged,
        onSkipChanged: this.onSkipChanged,
        onOrderChanged: this.onOrderChanged,
        onPagination: this.onPagination,
        extraData: extraData,
        component: viewComponent
      }, tableProps);
      if (functionName) {
        return _react2.default.createElement(_reactParse.FetchCloudCode, _extends({
          functionName: functionName,
          params: this.getQuery(),
          dataHandler: dataHandler
        }, props));
      }
      return _react2.default.createElement(_reactParse.FetchCollection, _extends({
        schemaName: schemaName,
        query: this.getQuery()
      }, props));
    }
  }]);

  return Collection;
}(_react2.default.Component);

exports.default = Collection;

Collection.propTypes = process.env.NODE_ENV !== "production" ? {
  onCreateNewDoc: _propTypes2.default.func,
  onEditDoc: _propTypes2.default.func,
  viewComponent: _propTypes2.default.element, // if Empty we use Table
  fields: _propTypes2.default.array, // [{ label: 'User name', key: 'username', search: true }...]
  enabledMultiSelect: _propTypes2.default.bool,
  query: _propTypes2.default.object,
  limit: _propTypes2.default.number,
  skip: _propTypes2.default.number,
  order: _propTypes2.default.string,
  onQueryChanged: _propTypes2.default.func,
  onSkipChanged: _propTypes2.default.func,
  onLimitChanged: _propTypes2.default.func
} : {};

Collection.defaultProps = {
  wrapperType: 'sideDoc',
  enabledMultiSelect: true,
  query: {},
  limit: 10,
  skip: 0,
  order: 'createdAt'
};
module.exports = exports['default'];