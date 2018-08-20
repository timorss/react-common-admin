'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editFormatter = exports.titleFormatter = exports.arrayFormatter = exports.partnerFormatter = exports.dateTimeZoneFormatter = exports.arrayOfPointerDisplay = exports.pointerForamtter = exports.craetedAtDateFormatter = exports.dateFormatter = exports.imageFormatter = exports.tierFormatter = exports.typeFormatter = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var typeFormatter = exports.typeFormatter = function typeFormatter(cell, row) {
  // const _queryData = this.props.objects.queries.booking_ProductType

  // if (_queryData) {
  //   let _data = _queryData.data.results || []
  //   let t = _data.find(p => p.code === cell)
  //   if (t) {
  //     return t.type
  //   }
  // }
  return '';
};

var tierFormatter = exports.tierFormatter = function tierFormatter(cell, row) {
  if (row.memberId && row.memberId.tier) {
    return _react2.default.createElement(
      'span',
      { className: 'label', style: { backgroundColor: row.memberId.tier.color } },
      row.memberId.tier.name
    );
  }
};

var imageFormatter = exports.imageFormatter = function imageFormatter(cell, row) {
  if (cell && cell.url) {
    return _react2.default.createElement('img', { src: cell.url, style: { width: 50, height: 50 } });
  }
};
var dateFormatter = exports.dateFormatter = function dateFormatter(cell, row) {
  if (cell && cell.iso) {
    return (0, _moment2.default)(cell.iso).local().format('DD MMM YYYY HH:mm');
  }
};

var craetedAtDateFormatter = exports.craetedAtDateFormatter = function craetedAtDateFormatter(cell, row) {
  if (cell) {
    return (0, _moment2.default)(cell).local().format('DD MMM YYYY HH:mm');
  }
};
var pointerForamtter = exports.pointerForamtter = function pointerForamtter(cell, row, field, extraData) {
  var options = (0, _helpers.selectOptionsFromExtraData)({ pointerTo: field.pointerTo, type: 'pointer' }, extraData);
  var value = (0, _helpers.findValueInOption)(row[field.key], options);
  return _react2.default.createElement(
    'p',
    null,
    value && value[field.labelKey] || value && value.objectId
  );
};

var arrayOfPointerDisplay = exports.arrayOfPointerDisplay = function arrayOfPointerDisplay(cell, row, field, extraData) {
  var display = null;
  var options = (0, _helpers.selectOptionsFromExtraData)({ pointerTo: field.pointerTo, type: 'pointer' }, extraData);
  var value = row[field.key];
  if (value && options) {
    value.forEach(function (objectId) {
      var currentOption = options.find(function (option) {
        return option.objectId === objectId;
      });
      var currentOptionDisplay = currentOption ? currentOption[field.displayKey] : null;
      display = (display ? display + ',' : '') + (currentOptionDisplay || objectId);
    });
  }
  return _react2.default.createElement(
    'p',
    null,
    display || row[field.key]
  );
};

var dateTimeZoneFormatter = exports.dateTimeZoneFormatter = function dateTimeZoneFormatter(cell, row) {
  if (cell) {
    var date = (0, _moment2.default)(cell.iso);
    if (row.timeZone) {
      date.tz(row.timeZone);
    }
    return date.format('DD MMM YYYY HH:mm');
  }
};

var partnerFormatter = exports.partnerFormatter = function partnerFormatter(cell, row) {
  return cell ? cell.name : '';
};

var arrayFormatter = exports.arrayFormatter = function arrayFormatter(cell, row) {
  return _react2.default.createElement(
    'span',
    { title: cell },
    cell ? cell.join() : ''
  );
};

var titleFormatter = exports.titleFormatter = function titleFormatter(cell, row) {
  if (cell) {
    return _react2.default.createElement(
      'div',
      null,
      cell
    );
  }
};

// edit row formatter with icons
var editFormatter = exports.editFormatter = function editFormatter(cell, row) {
  return _react2.default.createElement(
    'div',
    { style: { textAlign: 'center', padding: '10px' } },
    _react2.default.createElement('i', { onClick: function onClick() {
        return alert('things');
      }, className: 'zmdi zmdi-settings zmdi-hc-lg icon-alert' })
  );
};