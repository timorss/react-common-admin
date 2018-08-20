'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var notification = exports.notification = {
  success: function success(message, data) {
    return console.log('react-common-admin - success', message, data);
  },
  error: function error(message, data) {
    return console.log('react-common-admin - error', message, data);
  },
  info: function info(message, data) {
    return console.log('react-common-admin - info', message, data);
  },
  warning: function warning(message, data) {
    return console.log('react-common-admin - warning', message, data);
  },
  warn: function warn(message, data) {
    return console.log('react-common-admin - warn', message, data);
  }
};

var defaultDocumentMessages = exports.defaultDocumentMessages = {
  onPostMessage: 'react-common-admin document - Created successfully',
  onPostFailedMessage: 'react-common-admin document - Created failed',
  onPutMessage: 'react-common-admin document - Update successfully',
  onPutFailedMessage: 'react-common-admin document - Update failed):',
  onDeleteMessage: 'react-common-admin document - Deleted successfully',
  onDeleteFailedMessage: 'react-common-admin document -  Deleted failed'
};

var langDir = exports.langDir = 'ltr';
/**
 *
 * @param {*} res
 * @param {*} res.notification
 */
var initCommonAdmin = exports.initCommonAdmin = function initCommonAdmin(res) {
  if (res.notification) {
    if (_typeof(res.notification) === 'object' || typeof res.notification === 'function') {
      // Show Warning if one of the methods are missing
      if (!res.notification.success || !res.notification.error || !res.notification.info || !res.notification.warning || !res.notification.warn) {
        console.warn('react-common-admin.initCommonAdmin({notification}), notification need to include {success, error, info, warning, warn}');
      }
      // Replace (default)notification with notification from initCommonAdmin
      exports.notification = notification = res.notification;
    } else {
      // Show error, res.notification most be an object
      console.error('react-common-admin.initCommonAdmin({notification}), notification need to be an object and to include {success, error, info, warning, warn}');
    }
  }

  if (res.customTitle) {
    if (typeof res.customTitle !== 'function') {
      console.log('customTitle need to be a function ({ state, props }) => {"string"} ');
    } else {
      exports.customTitle = customTitle = res.customTitle;
    }
  }

  if (res.defaultDocumentMessages) {
    if (_typeof(res.defaultDocumentMessages) === 'object') {
      // Show Warning if one of the methods are missing
      if (!res.defaultDocumentMessages.onPostMessage || !res.defaultDocumentMessages.onPostFailedMessage || !res.defaultDocumentMessages.onPutMessage || !res.defaultDocumentMessages.onPutFailedMessage || !res.defaultDocumentMessages.onDeleteMessage || !res.defaultDocumentMessages.onDeleteFailedMessage) {
        console.warn('react-common-admin.initCommonAdmin({defaultDocumentMessages}), defaultDocumentMessages need to include {onPostMessage, onPostFailedMessage, onPutMessage, onPutFailedMessage, onDeleteMessage, onDeleteFailedMessage}');
      }
      // Replace (default)defaultDocumentMessages with defaultDocumentMessages from initCommonAdmin
      exports.defaultDocumentMessages = defaultDocumentMessages = res.defaultDocumentMessages;
    } else {
      // Show error, res.defaultDocumentMessages most be an object
      console.warn('react-common-admin.initCommonAdmin({defaultDocumentMessages}), defaultDocumentMessages must be an object and need to include {onPostMessage, onPostFailedMessage, onPutMessage, onPutFailedMessage, onDeleteMessage, onDeleteFailedMessage}');
    }
  }

  if (res.langDir) {
    exports.langDir = langDir = res.langDir;
  }

  if (res.setParams) {
    exports.setParams = setParams = res.setParams;
  }
  if (res.getParams) {
    exports.getParams = getParams = res.getParams;
  }
};

var customTitle = exports.customTitle = function customTitle(_ref) {
  var state = _ref.state,
      props = _ref.props;

  console.log('customTitle', { state: state, props: props });
  return 'missing customTitle- use react-common-admin.initCommonAdmin({customTitle})';
};
var setParams = exports.setParams = function setParams(paramsToSet) {
  console.log('missing setParams- use react-common-admin.initCommonAdmin({setParams})');
};
var getParams = exports.getParams = function getParams(paramsToSet) {
  console.log('missing getParams- use react-common-admin.initCommonAdmin({getParams})');
};
/*eslint no-console: "off"*/