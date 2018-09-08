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

var _index = require('./components/index');

var _reactRedux = require('react-redux');

var _reactParse = require('react-parse');

var _Document = require('./dataProviders/Document');

var _Document2 = _interopRequireDefault(_Document);

var _Collection = require('./dataProviders/Collection');

var _Collection2 = _interopRequireDefault(_Collection);

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

var _configuration = require('./configuration');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // ### CommonAdmin docs: https://github.com/doronnahum/react-common-admin


var Page = function (_React$Component) {
  _inherits(Page, _React$Component);

  function Page(props) {
    _classCallCheck(this, Page);

    var _this = _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).call(this, props));

    _this.state = {
      visibleDocuments: [/* {id: string, isOpen: boolean, dataFromCollection: {...}}, newDoc: boolean, isMinimized: boolean, fullScreen: boolean */],
      docKey: 0,
      fetchExtraDataKey: 0
    };
    _this.onCreateNewDoc = _this.onCreateNewDoc.bind(_this);
    _this.onEditDoc = _this.onEditDoc.bind(_this);
    _this.closeDocumentModal = _this.closeDocumentModal.bind(_this);
    _this.onPostFinished = _this.onPostFinished.bind(_this);
    _this.onDeleteFinished = _this.onDeleteFinished.bind(_this);
    _this.onPutFinished = _this.onPutFinished.bind(_this);
    _this.renderCollection = _this.renderCollection.bind(_this);
    _this.renderDocuments = _this.renderDocuments.bind(_this);
    _this.getExtraDataAsFieldsOptions = _this.getExtraDataAsFieldsOptions.bind(_this);
    _this.notification = _this.notification.bind(_this);
    _this.getVisibleDocuments = _this.getVisibleDocuments.bind(_this);
    _this.parseDataBeforePost = _this.parseDataBeforePost.bind(_this);
    _this.parseDataBeforePut = _this.parseDataBeforePut.bind(_this);
    _this.toggleFullScreen = _this.toggleFullScreen.bind(_this);
    _this.toggleMinimized = _this.toggleMinimized.bind(_this);
    _this.syncParamOnLoad = _this.syncParamOnLoad.bind(_this);
    _this.onRefresh = _this.onRefresh.bind(_this);
    _this.onCollectionFetchEnd = _this.onCollectionFetchEnd.bind(_this);
    _this.onCollectionDeleteEnd = _this.onCollectionDeleteEnd.bind(_this);
    _this.minimizedDocumentBeforeMe = 0;
    _this.lastVisibleDocumentsLength = null;
    return _this;
  }

  _createClass(Page, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.syncParamOnLoad();
    }
  }, {
    key: 'notification',


    /**
     * @function notification
     * @param {*} type oneOf 'error', 'success', 'info', 'warning'
     * @param {*} messageKey oneOf 'onPostMessage','onPostFailedMessage','onPutMessage','onDeleteMessage','onDeleteFailedMessage'
     * @param {*} data object
     * This is a wrapper of notification service that help to use defaultDocumentMessages when messagesFromProps is didn't found
     */
    value: function notification(type, messageKey, data) {
      var messagesFromProps = this.props.messages || {};
      if (!_configuration.notification) {
        console.log('react-common-admin - missing notification services, check react-common-admin.initCommonAdmin');
      } else {
        _configuration.notification[type](messagesFromProps[messageKey] || _configuration.defaultDocumentMessages[messageKey], data);
      }
    }

    // ---- react-parse callbacks ----- //

    /**
     * @function onPostFinished
     * @param {object} res react-parse onPostFinished response
     */

  }, {
    key: 'onPostFinished',
    value: function onPostFinished(res) {
      var error = res.error,
          boomerang = res.boomerang,
          info = res.info;

      if (error) {
        this.notification('error', 'onPostFailedMessage', res);
      } else {
        _reactParse.collectionActions.refreshCollection({ targetName: this.props.targetName });
        if (this.props.documentProps.stayOpenAfterPost) {
          this.replaceTemporaryDocIdWithNewDocFromServer(boomerang.modalId, info.objectId);
        } else {
          this.closeDocumentModal(boomerang.modalId);
        }
        this.notification('success', 'onPostMessage', res);
      }
      if (this.props.documentProps.onPostFinished) {
        this.props.documentProps.onPostFinished(res);
      }
    }
  }, {
    key: 'onCollectionFetchEnd',
    value: function onCollectionFetchEnd(res) {
      var _props = this.props,
          keepSyncByTargetName = _props.keepSyncByTargetName,
          collectionProps = _props.collectionProps;

      if (keepSyncByTargetName) {
        keepSyncByTargetName.forEach(function (targetName) {
          _reactParse.collectionActions.refreshCollection({ targetName: targetName });
        });
      }
      if (collectionProps.onFetchEnd) {
        collectionProps.onFetchEnd(res);
      }
    }
  }, {
    key: 'onCollectionDeleteEnd',
    value: function onCollectionDeleteEnd(res) {
      this.notification('success', 'onDeleteMessage', res);
      if (this.props.collectionProps.onDeleteEnd) {
        this.props.collectionProps.onDeleteEnd(res);
      }
    }
    /**
     * @function onDeleteFinished
     * @param {object} res react-parse onDeleteFinished response
     */

  }, {
    key: 'onDeleteFinished',
    value: function onDeleteFinished(res) {
      var error = res.error,
          boomerang = res.boomerang;

      if (error) {
        this.notification('error', 'onDeleteFailedMessage', res);
      } else {
        _reactParse.collectionActions.refreshCollection({
          targetName: this.props.targetName
        });
        this.closeDocumentModal(boomerang.modalId);
        this.notification('success', 'onDeleteMessage', res);
      }
      if (this.props.documentProps.onDeleteFinished) {
        this.props.documentProps.onDeleteFinished(res);
      }
    }

    /**
     * @function onPutFinished
     * @param {object} res react-parse onPutFinished response
     */

  }, {
    key: 'onPutFinished',
    value: function onPutFinished(res) {
      var error = res.error;

      if (error) {
        this.notification('error', 'onPutFailedMessage', res);
      } else {
        _reactParse.collectionActions.refreshCollection({
          targetName: this.props.targetName
        });
        this.notification('success', 'onPutMessage', res);
      }
      if (this.props.documentProps.onPutFinished) {
        this.props.documentProps.onPutFinished(res);
      }
    }

    /**
     * @function onRefresh
     * This function will trigger by collection/document viewComponent refresh button
     */

  }, {
    key: 'onRefresh',
    value: function onRefresh() {
      if (this.props.refreshExtraDataOnRefresh) {
        this.setState({ fetchExtraDataKey: this.state.fetchExtraDataKey + 1 }); // Change key will trigger react-parse fetch
      }
    }

    // ---- Data handlers ----- //
    /**
     * @function handleFetchExtraData
     * @param {array} fetchExtraData array of object, each object is react-parse FetchCollection props
     * We Use this data to fetch data from server to inputs dropDown or display in the table with special formatter
     */

  }, {
    key: 'handleFetchExtraData',
    value: function handleFetchExtraData(fetchExtraData) {
      var _this2 = this;

      if (fetchExtraData) {
        return fetchExtraData.map(function (item) {
          return _react2.default.createElement(_reactParse.FetchCollection, _extends({
            key: item.targetName + '-' + _this2.state.fetchExtraDataKey,
            render: function render() {
              return null;
            }
          }, item));
        });
      }
    }

    /**
     * @function getExtraDataAsFieldsOptions
     * This function will return fetch data as an object, split by fields targetName
     * and each input will get is own options
     */

  }, {
    key: 'getExtraDataAsFieldsOptions',
    value: function getExtraDataAsFieldsOptions() {
      var _props2 = this.props,
          extraData = _props2.extraData,
          documentProps = _props2.documentProps;
      var fields = documentProps.fields;

      var fieldsOptions = {};
      if (extraData) {
        fieldsOptions.all = extraData;
        fields.forEach(function (field) {
          var targetName = field.targetName,
              key = field.key;

          if (targetName) {
            fieldsOptions[key] = extraData[targetName];
          }
        });
      }
      return fieldsOptions;
    }

    /**
     * @function parseDataBeforePost
     * @param {*} data data to send the server
     * This function allows to manipulate the data outside the document from before we post to server
     */

  }, {
    key: 'parseDataBeforePost',
    value: function parseDataBeforePost(data) {
      var parseDataBeforePost = this.props.documentProps.parseDataBeforePost;

      if (parseDataBeforePost) {
        var tableProps = this.collectionViewRef.props;
        return parseDataBeforePost(data, tableProps);
      } else {
        return data;
      }
    }

    /**
     * @function parseDataBeforePut
     * @param {*} data data to send the server
     * This function allows to manipulate the data outside the document from before we put to server
     */

  }, {
    key: 'parseDataBeforePut',
    value: function parseDataBeforePut(data, objectId, fetchProps) {
      var parseDataBeforePut = this.props.documentProps.parseDataBeforePut;

      if (parseDataBeforePut) {
        var tableProps = this.collectionViewRef.props;
        return parseDataBeforePut(data, tableProps, objectId, fetchProps);
      } else {
        return data;
      }
    }

    // ---- Documents visible handlers ----- //

    /**
     * @function syncParamOnLoad
     * This function mange initial visibleDocuments from url params
     */

  }, {
    key: 'syncParamOnLoad',
    value: function syncParamOnLoad() {
      if (this.props.paramSync) {
        var params = (0, _configuration.getParams)();
        var visibleDocumentsFromParams = params.vd;
        if (visibleDocumentsFromParams) {
          var visibleDocuments = JSON.parse(visibleDocumentsFromParams);
          visibleDocuments = visibleDocuments.map(function (item) {
            //id, isOpen, dataFromCollection, newDoc, isMinimized, fullScreen
            var _item = {};
            _item.id = item.i;
            _item.isOpen = item.o;
            _item.isMinimized = item.m;
            _item.dataFromCollection = item.d;
            _item.fullScreen = item.f;
            return _item;
          });
          this.setState({ visibleDocuments: visibleDocuments });
        }
      }
    }

    /**
     * @function getVisibleDocuments
     * This function return all visibleDocuments from state
     * default document - When documentProps include objectId then this document added as a default document
     */

  }, {
    key: 'getVisibleDocuments',
    value: function getVisibleDocuments() {
      var documentProps = this.props.documentProps;

      var visibleDocuments = [].concat(_toConsumableArray(this.state.visibleDocuments));
      if (documentProps.objectId) {
        visibleDocuments.push({ id: documentProps.objectId, isOpen: true });
      }
      return visibleDocuments;
    }

    /**
     * @function onCreateNewDoc
     * @param {object} dataFromCollection Data that pass from table row to document
     */

  }, {
    key: 'onCreateNewDoc',
    value: function onCreateNewDoc(dataFromCollection) {
      var openAsFullDoc = this.props.openAsFullDoc;

      var visibleDocuments = [].concat(_toConsumableArray(this.state.visibleDocuments));
      var _dataFromCollection = dataFromCollection && dataFromCollection.target ? null : dataFromCollection; // we didn't want input event
      visibleDocuments.push({ id: 'new' + this.state.docKey, isOpen: true, dataFromCollection: _dataFromCollection, newDoc: true, fullScreen: openAsFullDoc, isMinimized: false });
      this.setState({ docKey: this.state.docKey + 1 });
      this.setVisibleDocuments(visibleDocuments);
    }

    /**
     * @function onEditDoc
     * @param {string} docId document object id
     * @param {object} dataFromCollection Data that pass from table row to document
     */

  }, {
    key: 'onEditDoc',
    value: function onEditDoc(docId, dataFromCollection) {
      var openAsFullDoc = this.props.openAsFullDoc;

      var isDocumentIsAlreadyOpen = (0, _find2.default)(this.state.visibleDocuments, function (obj) {
        return obj.id === docId;
      });
      if (isDocumentIsAlreadyOpen) {
        _configuration.notification.info('This document is already in use');
      } else {
        var visibleDocuments = [].concat(_toConsumableArray(this.state.visibleDocuments));
        var _dataFromCollection = dataFromCollection && dataFromCollection.target ? null : dataFromCollection; // we didn't want input event
        visibleDocuments.push({ id: docId, isOpen: true, dataFromCollection: _dataFromCollection, fullScreen: openAsFullDoc, isMinimized: false });
        this.setVisibleDocuments(visibleDocuments);
      }
    }

    /**
     * function closeDocumentModal
     * @param {string} modalId each Document have a unique key, objectId for existing docs and `new${this.state.docKey}` for new ones
     */

  }, {
    key: 'closeDocumentModal',
    value: function closeDocumentModal(modalId) {
      var visibleDocuments = this.state.visibleDocuments.filter(function (item) {
        return item.id !== modalId;
      });
      this.setVisibleDocuments(visibleDocuments);
    }
    /**
     * function replaceTemporaryDocIdWithNewDocFromServer
     * Help us convert create doc to edit doc
     * @param {string} modalId each Document have a unique key, objectId for existing docs and `new${this.state.docKey}` for new ones
     */

  }, {
    key: 'replaceTemporaryDocIdWithNewDocFromServer',
    value: function replaceTemporaryDocIdWithNewDocFromServer(modalId, newObjectId) {
      var visibleDocuments = this.state.visibleDocuments.map(function (item) {
        if (item.id === modalId) {
          item.id = newObjectId;
          item.newDoc = false;
        }
        return item;
      });
      this.setVisibleDocuments(visibleDocuments);
    }
  }, {
    key: 'toggleMinimized',
    value: function toggleMinimized(modalId) {
      var visibleDocuments = this.state.visibleDocuments.map(function (item) {
        if (item.id === modalId) {
          item.isMinimized = !item.isMinimized;
        }
        return item;
      });
      this.setVisibleDocuments(visibleDocuments);
    }
  }, {
    key: 'toggleFullScreen',
    value: function toggleFullScreen(modalId) {
      var visibleDocuments = this.state.visibleDocuments.map(function (item) {
        if (item.id === modalId) {
          item.fullScreen = !item.fullScreen;
        }
        return item;
      });
      this.setVisibleDocuments(visibleDocuments);
    }
  }, {
    key: 'setVisibleDocuments',
    value: function setVisibleDocuments(visibleDocuments) {
      this.setState({ visibleDocuments: visibleDocuments });
      if (this.props.onVisibleDocumentsChanged) {
        if (this.lastVisibleDocumentsLength !== visibleDocuments.length) {
          this.lastVisibleDocumentsLength = visibleDocuments.length;
          this.props.onVisibleDocumentsChanged(visibleDocuments.length);
        }
      }
      if (this.props.paramSync) {
        var _visibleDocuments = [];
        visibleDocuments.forEach(function (item) {
          // id, isOpen, dataFromCollection, newDoc, isMinimized, fullScreen
          if (!item.isOpen || item.newDoc) return;
          var _item = {};
          _item.i = item.id;
          _item.o = item.isOpen ? 1 : 0;
          _item.m = item.isMinimized ? 1 : 0;
          _item.d = item.dataFromCollection;
          _item.f = item.fullScreen ? 1 : 0;
          _visibleDocuments.push(_item);
        });
        (0, _configuration.setParams)('vd', JSON.stringify(_visibleDocuments));
      }
    }
  }, {
    key: 'getInitialValue',
    value: function getInitialValue(fields, initialValue) {
      if (this.initialValueFlag) {
        // We want getInitialValue to run only one time
        return this.initialValue;
      }
      var finalInitialValue = null;
      var initialValueFromFields = null;
      fields.forEach(function (item) {
        if (typeof item.initialValue !== 'undefined') {
          if (!initialValueFromFields) initialValueFromFields = {};
          initialValueFromFields[item.key] = item.initialValue;
        }
      });
      if (initialValue || initialValueFromFields) {
        finalInitialValue = _extends({}, initialValue, initialValueFromFields);
      };
      this.initialValue = finalInitialValue;
      this.initialValueFlag = true;
      return finalInitialValue;
    }

    /**
     * @function renderDocuments
     * This function render Document for each of the visibleDocuments
     * Document is a react-parse FetchDocument with a wrapper around docForm
     * The wrapper is from react-common-admin usual is a modal or side modal
     */

  }, {
    key: 'renderDocuments',
    value: function renderDocuments() {
      var _this3 = this;

      var _props3 = this.props,
          targetName = _props3.targetName,
          schemaName = _props3.schemaName,
          documentProps = _props3.documentProps,
          extraData = _props3.extraData,
          showCollection = _props3.showCollection,
          collectionData = _props3.collectionData;

      var fields = documentProps.fields,
          showCloseButton = documentProps.showCloseButton,
          showDeleteButton = documentProps.showDeleteButton,
          wrapper = documentProps.wrapper,
          viewComponent = documentProps.viewComponent,
          saveOnBlur = documentProps.saveOnBlur,
          skip = documentProps.skip,
          limit = documentProps.limit,
          query = documentProps.query,
          onLimitChanged = documentProps.onLimitChanged,
          parseDataBeforePost = documentProps.parseDataBeforePost,
          parseDataBeforePut = documentProps.parseDataBeforePut,
          onSkipChanged = documentProps.onSkipChanged,
          onOrderChanged = documentProps.onOrderChanged,
          onQueryChanged = documentProps.onQueryChanged,
          messages = documentProps.messages,
          initialValue = documentProps.initialValue,
          parseDataBeforeChange = documentProps.parseDataBeforeChange,
          resDocumentProps = _objectWithoutProperties(documentProps, ['fields', 'showCloseButton', 'showDeleteButton', 'wrapper', 'viewComponent', 'saveOnBlur', 'skip', 'limit', 'query', 'onLimitChanged', 'parseDataBeforePost', 'parseDataBeforePut', 'onSkipChanged', 'onOrderChanged', 'onQueryChanged', 'messages', 'initialValue', 'parseDataBeforeChange']);

      var visibleDocuments = this.getVisibleDocuments();
      this.minimizedDocumentBeforeMe = 0; // reset the minimizedDocumentBeforeMe, We count it when visibleDocuments.map is running
      return visibleDocuments.map(function (_ref) {
        var id = _ref.id,
            isOpen = _ref.isOpen,
            dataFromCollection = _ref.dataFromCollection,
            newDoc = _ref.newDoc,
            isMinimized = _ref.isMinimized,
            fullScreen = _ref.fullScreen;

        var isNew = newDoc;
        var documentTargetName = targetName + '-' + id;
        var isDocumentOpen = isOpen || !showCollection; // When showCollection is false then document is always Open
        var _minimizedDocumentBeforeMe = _this3.minimizedDocumentBeforeMe;
        if (isMinimized) {
          _this3.minimizedDocumentBeforeMe++;
        }
        return _react2.default.createElement(_Document2.default, _extends({}, resDocumentProps, {
          key: documentTargetName
          // ---react-parse---
          // data
          , targetName: documentTargetName,
          schemaName: schemaName,
          objectId: isNew ? null : id,
          collectionData: collectionData
          // callbacks
          , onPostFinished: _this3.onPostFinished,
          onDeleteFinished: _this3.onDeleteFinished,
          onPutFinished: _this3.onPutFinished,
          collectionTargetName: targetName
          // extraData is pass as fieldsOptions, field with targetName will get data from extraData
          , fieldsOptions: _this3.getExtraDataAsFieldsOptions(),
          extraData: extraData
          // ---View---
          // wrapper component
          , wrapper: wrapper || _index.SideModal,
          showCloseButton: showCloseButton,
          showDeleteButton: showDeleteButton,
          minimizedDocumentBeforeMe: _minimizedDocumentBeforeMe || 0 // We need this value to Know what is the right margin From right when documents are minimized
          , modalId: id,
          isMinimized: isMinimized,
          fullScreen: fullScreen,
          toggleMinimized: _this3.toggleMinimized,
          toggleFullScreen: _this3.toggleFullScreen
          // pass to wrapper component - toggle to show/hide the document
          , isOpen: isDocumentOpen,
          onClose: _this3.closeDocumentModal
          // this is the view that get all document props {onClose, objectId, saveOnBlur, fetchProps, fields, extraData, ...documentProps}, fetchProps is react-parse response
          , viewComponent: viewComponent || _index.DocForm,
          parseDataBeforePost: _this3.parseDataBeforePost,
          parseDataBeforePut: _this3.parseDataBeforePut,
          saveOnBlur: saveOnBlur,
          fields: fields,
          query: query,
          onLimitChanged: onLimitChanged,
          onSkipChanged: onSkipChanged,
          onOrderChanged: onOrderChanged,
          onQueryChanged: onQueryChanged,
          messages: messages,
          dataFromCollection: dataFromCollection,
          onRefresh: _this3.onRefresh,
          initialValue: _this3.getInitialValue(fields, initialValue),
          parseDataBeforeChange: parseDataBeforeChange
        }));
      });
    }

    /**
     * @function renderCollection
     * This function render Collection
     * Collection is a react-parse FetchCollection that handle the query, pagination
     * and render Table or other viewComponent to screen
     */

  }, {
    key: 'renderCollection',
    value: function renderCollection() {
      var _this4 = this;

      var _props4 = this.props,
          showLoader = _props4.showLoader,
          title = _props4.title,
          targetName = _props4.targetName,
          schemaName = _props4.schemaName,
          collectionProps = _props4.collectionProps,
          extraData = _props4.extraData,
          functionName = _props4.functionName;

      var fields = collectionProps.fields,
          viewComponent = collectionProps.viewComponent,
          dataHandler = collectionProps.dataHandler,
          tableProps = collectionProps.tableProps,
          resCollectionProps = _objectWithoutProperties(collectionProps, ['fields', 'viewComponent', 'dataHandler', 'tableProps']);

      return _react2.default.createElement(_Collection2.default, _extends({
        key: schemaName,
        ref: function ref(_ref2) {
          _this4.collectionRef = _ref2;
        },
        onViewRef: function onViewRef(ref) {
          _this4.collectionViewRef = ref;
        }
        // ---react-parse---
        // data
        , schemaName: schemaName,
        targetName: targetName
        // cloud code
        , functionName: functionName,
        dataHandler: dataHandler
        // callbacks
        , onDeleteFinished: function onDeleteFinished() {
          alert('onDeleteFinished');
        }
        //
        , title: title,
        fields: fields
        // doc
        , onCreateNewDoc: this.onCreateNewDoc,
        onEditDoc: this.onEditDoc,
        extraData: extraData,
        showLoader: showLoader
        // this is the view that get all collection props {onQueryChanged,skip,limit,fetchProps,showLoader,onEditDoc,onCreateNewDoc,extraData   ...collectionProps}, fetchProps is react-parse response
        , viewComponent: viewComponent || _index.Table,
        onRefresh: this.onRefresh,
        onDeleteEnd: this.onCollectionDeleteEnd,
        onFetchEnd: this.onCollectionFetchEnd
      }, tableProps, resCollectionProps));
    }
  }, {
    key: 'render',
    value: function render() {
      var _props5 = this.props,
          title = _props5.title,
          showPageHeader = _props5.showPageHeader,
          showCollection = _props5.showCollection,
          isChild = _props5.isChild;

      return _react2.default.createElement(
        _index.Layout,
        { className: 'rca-main ' + (isChild ? 'rca-child' : '') },
        _react2.default.createElement(
          _index.Layout,
          null,
          showPageHeader && _react2.default.createElement(
            _index.Layout.Header,
            { className: 'rca-main-pageHeader' },
            _react2.default.createElement(_index.ContainerHeader, { title: title })
          ),
          _react2.default.createElement(
            _index.Layout.Content,
            { className: 'rca-main-pageContent' },
            showCollection && this.renderCollection(),
            !showCollection && this.renderDocuments()
          )
        ),
        showCollection && this.renderDocuments(),
        this.handleFetchExtraData(this.props.fetchExtraData)
      );
    }
  }]);

  return Page;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state, _ref3) {
  var targetName = _ref3.targetName,
      fetchExtraData = _ref3.fetchExtraData;

  var extraData = void 0;
  if (fetchExtraData) {
    extraData = {};
    fetchExtraData.forEach(function (item) {
      extraData[item.targetName] = _reactParse.selectors.selectCollectionData(state, item.targetName);
    });
  }
  return {
    collectionData: _reactParse.selectors.selectCollectionData(state, targetName),
    showLoader: _reactParse.selectors.selectCollectionLoading(state, targetName),
    error: _reactParse.selectors.selectCollectionError(state, targetName),
    extraData: extraData
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, null)(Page);


Page.defaultProps = {
  showPageHeader: true,
  showCollection: true,
  openAsFullDoc: true,
  paramSync: true,
  isChild: false,
  refreshExtraDataOnRefresh: true
};
Page.propTypes = process.env.NODE_ENV !== "production" ? {
  showPageHeader: _propTypes2.default.bool
} : {};
module.exports = exports['default'];