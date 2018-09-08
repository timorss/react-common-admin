'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Modal = exports.DraggableTable = exports.StaticDoc = exports.Gallery = exports.Table = exports.DocForm = exports.SideModal = exports.Loader = exports.ContainerHeader = exports.Layout = undefined;

var _layout = require('antd/lib/layout');

Object.defineProperty(exports, 'Layout', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_layout).default;
  }
});

var _ContainerHeader = require('./ContainerHeader');

var _ContainerHeader2 = _interopRequireDefault(_ContainerHeader);

var _Loader = require('./Loader');

var _Loader2 = _interopRequireDefault(_Loader);

var _SideModal = require('./SideModal');

var _SideModal2 = _interopRequireDefault(_SideModal);

var _Modal = require('./Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _DocForm = require('./DocForm');

var _DocForm2 = _interopRequireDefault(_DocForm);

var _Table = require('./Table');

var _Table2 = _interopRequireDefault(_Table);

var _Gallery = require('./Gallery');

var _Gallery2 = _interopRequireDefault(_Gallery);

var _StaticDoc = require('./StaticDoc');

var _StaticDoc2 = _interopRequireDefault(_StaticDoc);

var _DraggableTable = require('./DraggableTable');

var _DraggableTable2 = _interopRequireDefault(_DraggableTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.ContainerHeader = _ContainerHeader2.default;
exports.Loader = _Loader2.default;
exports.SideModal = _SideModal2.default;
exports.DocForm = _DocForm2.default;
exports.Table = _Table2.default;
exports.Gallery = _Gallery2.default;
exports.StaticDoc = _StaticDoc2.default;
exports.DraggableTable = _DraggableTable2.default;
exports.Modal = _Modal2.default;