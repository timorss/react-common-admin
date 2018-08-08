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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Page = function (_React$Component) {
  _inherits(Page, _React$Component);

  function Page(props) {
    _classCallCheck(this, Page);

    var _this = _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).call(this, props));

    _this.state = {
      showDocumentModal: false,
      currentDocId: null,
      docKey: 0
    };
    _this.onCreateNewDoc = _this.onCreateNewDoc.bind(_this);
    _this.onEditDoc = _this.onEditDoc.bind(_this);
    _this.closeDocumentModal = _this.closeDocumentModal.bind(_this);
    _this.onPostFinished = _this.onPostFinished.bind(_this);
    _this.onDeleteFinished = _this.onDeleteFinished.bind(_this);
    _this.onPutFinished = _this.onPutFinished.bind(_this);
    _this.renderCollection = _this.renderCollection.bind(_this);
    _this.renderDocument = _this.renderDocument.bind(_this);
    _this.increaseDocKey = _this.increaseDocKey.bind(_this);
    _this.convertExtraDataToFieldsOptions = _this.convertExtraDataToFieldsOptions.bind(_this);
    return _this;
  }

  _createClass(Page, [{
    key: 'onPostFinished',
    value: function onPostFinished(_ref) {
      var error = _ref.error,
          status = _ref.status,
          data = _ref.data,
          info = _ref.info;

      if (error) {
        console.log('Post faield', error);
      } else {
        _reactParse.collectionActions.refreshCollection({
          targetName: this.props.targetName
        });
        this.setState({ currentDocId: info.objectId, showDocumentModal: true });
      }
    }
  }, {
    key: 'onDeleteFinished',
    value: function onDeleteFinished(_ref2) {
      var error = _ref2.error,
          status = _ref2.status,
          data = _ref2.data,
          info = _ref2.info;

      if (error) {
        console.log('Delete faield', error);
      } else {
        _reactParse.collectionActions.refreshCollection({
          targetName: this.props.targetName
        });
        this.setState({ currentDocId: null, showDocumentModal: false });
      }
    }
  }, {
    key: 'onPutFinished',
    value: function onPutFinished(_ref3) {
      var error = _ref3.error,
          status = _ref3.status,
          data = _ref3.data,
          info = _ref3.info;

      if (error) {
        //alert('onPutFinished faield', error)
      } else {
        _reactParse.collectionActions.refreshCollection({
          targetName: this.props.targetName
        });
      }
    }
  }, {
    key: 'closeDocumentModal',
    value: function closeDocumentModal() {
      var _this2 = this;

      this.setState({ showDocumentModal: false, currentDocId: null }, function () {
        return _this2.props.onShowDocumentModal(false);
      });
    }
  }, {
    key: 'onCreateNewDoc',
    value: function onCreateNewDoc() {
      var _this3 = this;

      this.setState({
        showDocumentModal: true,
        currentDocId: null,
        docKey: this.increaseDocKey()
      }, function () {
        return _this3.props.onShowDocumentModal(true);
      });
    }
  }, {
    key: 'increaseDocKey',
    value: function increaseDocKey() {
      return this.state.docKey + 1;
    }
  }, {
    key: 'onEditDoc',
    value: function onEditDoc(docId) {
      var _this4 = this;

      this.setState({
        showDocumentModal: true,
        currentDocId: docId,
        docKey: this.increaseDocKey()
      }, function () {
        return _this4.props.onShowDocumentModal(true);
      });
    }
  }, {
    key: 'handleFetchExtraData',
    value: function handleFetchExtraData(fetchExtraData) {
      if (fetchExtraData) {
        return fetchExtraData.map(function (item) {
          return _react2.default.createElement(_reactParse.FetchCollection, _extends({
            key: item.targetName,
            render: function render() {
              return null;
            }
          }, item));
        });
      }
    }
  }, {
    key: 'convertExtraDataToFieldsOptions',
    value: function convertExtraDataToFieldsOptions() {
      var _props = this.props,
          extraData = _props.extraData,
          documentProps = _props.documentProps;
      var fields = documentProps.fields;

      console.log({ extraData: extraData, fields: fields });
      var fieldsOptions = {};
      /*
          extraData is object of data collection by targetNames,
          fieldsOptions need to be an object of extraData by fieldKey, each field get is data by field.targetName
        */
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
      console.log('fieldsOptions0', fieldsOptions);
      return fieldsOptions;
    }
  }, {
    key: 'renderDocument',
    value: function renderDocument() {
      var _state = this.state,
          showDocumentModal = _state.showDocumentModal,
          currentDocId = _state.currentDocId,
          docKey = _state.docKey;
      var _props2 = this.props,
          targetName = _props2.targetName,
          schemaName = _props2.schemaName,
          documentProps = _props2.documentProps,
          extraData = _props2.extraData;

      var fields = documentProps.fields,
          wrapper = documentProps.wrapper,
          viewComponent = documentProps.viewComponent,
          parseDataBeforePost = documentProps.parseDataBeforePost,
          saveOnBlur = documentProps.saveOnBlur,
          skip = documentProps.skip,
          limit = documentProps.limit,
          query = documentProps.query,
          onLimitChanged = documentProps.onLimitChanged,
          onSkipChanged = documentProps.onSkipChanged,
          onOrderChanged = documentProps.onOrderChanged,
          onQueryChanged = documentProps.onQueryChanged,
          messages = documentProps.messages,
          resDocumentProps = _objectWithoutProperties(documentProps, ['fields', 'wrapper', 'viewComponent', 'parseDataBeforePost', 'saveOnBlur', 'skip', 'limit', 'query', 'onLimitChanged', 'onSkipChanged', 'onOrderChanged', 'onQueryChanged', 'messages']);

      var documentTargetName = targetName + '-' + (currentDocId || 'new_doc');
      return _react2.default.createElement(_Document2.default, _extends({
        key: '' + documentTargetName + docKey // important key- new components instance
        // ---react-parse---
        // data
        , targetName: documentTargetName,
        schemaName: schemaName,
        objectId: currentDocId
        // callbacks
        , onPostFinished: this.onPostFinished,
        onDeleteFinished: this.onDeleteFinished,
        onPutFinished: this.onPutFinished,
        collectionTargetName: targetName
        // extraData is pass as fieldsOptions, field with targetName will get data from extraData
        , fieldsOptions: this.convertExtraDataToFieldsOptions(),
        extraData: extraData
        // ---View---
        // wrapper component
        , wrapper: wrapper || _index.SideModal
        // pass to wrapper component - toggle to show/hide the document
        , isOpen: showDocumentModal,
        onClose: this.closeDocumentModal
        // this is the view that get all document props {onClose, objectId, saveOnBlur, fetchProps, fields, extraData, ...documentProps}, fetchProps is react-parse response
        , viewComponent: viewComponent || _index.DocForm,
        parseDataBeforePost: parseDataBeforePost,
        saveOnBlur: saveOnBlur,
        fields: fields,
        query: query,
        onLimitChanged: onLimitChanged,
        onSkipChanged: onSkipChanged,
        onOrderChanged: onOrderChanged,
        onQueryChanged: onQueryChanged,
        messages: messages
      }, resDocumentProps));
    }
  }, {
    key: 'renderCollection',
    value: function renderCollection() {
      var _props3 = this.props,
          showLoader = _props3.showLoader,
          title = _props3.title,
          targetName = _props3.targetName,
          schemaName = _props3.schemaName,
          collectionProps = _props3.collectionProps,
          extraData = _props3.extraData,
          functionName = _props3.functionName;

      var fields = collectionProps.fields,
          viewComponent = collectionProps.viewComponent,
          dataHandler = collectionProps.dataHandler,
          resCollectionProps = _objectWithoutProperties(collectionProps, ['fields', 'viewComponent', 'dataHandler']);

      return _react2.default.createElement(_Collection2.default, _extends({
        key: schemaName
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
        // this is the view that get all collection props {title, onQueryChanged,skip,limit,fetchProps,showLoader,onEditDoc,onCreateNewDoc,extraData   ...collectionProps}, fetchProps is react-parse response
        , viewComponent: viewComponent || _index.Table
      }, resCollectionProps));
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props,
          title = _props4.title,
          showPageHeader = _props4.showPageHeader;

      return _react2.default.createElement(
        _index.Layout,
        { className: 'rca' },
        _react2.default.createElement(
          _index.Layout,
          null,
          _react2.default.createElement(
            _index.Layout.Header,
            { className: 'rca-pageHeader' },
            showPageHeader && _react2.default.createElement(_index.ContainerHeader, { title: title })
          ),
          _react2.default.createElement(
            _index.Layout.Content,
            { className: 'rca-pageContent' },
            this.renderCollection()
          )
        ),
        this.renderDocument(),
        this.handleFetchExtraData(this.props.fetchExtraData)
      );
    }
  }]);

  return Page;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state, _ref4) {
  var targetName = _ref4.targetName,
      fetchExtraData = _ref4.fetchExtraData;

  var extraData = void 0;
  if (fetchExtraData) {
    extraData = {};
    fetchExtraData.forEach(function (item) {
      extraData[item.targetName] = _reactParse.selectors.selectCollectionData(state, item.targetName);
    });
  }
  return {
    showLoader: _reactParse.selectors.selectCollectionLoading(state, targetName),
    error: _reactParse.selectors.selectCollectionError(state, targetName),
    extraData: extraData
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, null)(Page);


Page.defaultProps = {
  onShowDocumentModal: function onShowDocumentModal() {},
  showPageHeader: true
};
Page.propTypes = process.env.NODE_ENV !== "production" ? {
  showPageHeader: _propTypes2.default.bool
} : {};

/*
### CommonAdmin


```jsx
<CommonAdmin
  title - string - title to display
  targetName - string - react-parse targetName
  schemaName - string - react-parse schemaName
  functionName - string - react-parse functionName (for using react-parse FetchCloudCode) - TODO // missing collection delete in this situation
  onShowDocumentModal - function - call back that call when DocumentModal is changed
  fetchExtraData - array - array of objects, each object is react-parse collection configuration  {schemaName: 'Member', targetName: 'MemberData'}
  documentProps - object - {
    fields - array - react-cross-form fields to render
    wrapper - element - optional - You can replace the default side modal wrapper , wrapper get this props (isOpen, onClose,title, children)
    viewComponent - element - optional - You can replace the default form,
    messages : object - {
      // You can display a custom message, this data will pass to your notification service, see react-common-admin initCommonAdmin
      onPostMessage: 'Create successfully',
      onPostFailedMessage: 'Create failed',
      onPutMessage: 'Update successfully',
      onPutFailedMessage: 'Update failed',
      onDeleteMessage: 'Deleted successfully',
      onDeleteFailedMessage: 'Deleted failed',
    },
    parseDataBeforePost - function - optional - function that call with the data before post, (data) => {return ({...data, {test: 1})}
    saveOnBlur - boolean - default is true, run react-parse put when input is blur
    title - string - title to display
    customTitle - function -  function that get {state, props} and return string as title
    // You can addd in this any parameters you want and the will pass to your viewComponent
  },
  collectionProps - object - {
    fields - array - this is the field that pass to viewComponent, [{key: 'objectId', title: 'Object Id', search: true, formatter: () => {}} ]
    viewComponent - element - optional - You can replace the default Table,
    dataHandler - function - if you using cloud code as collection data, see react parse dataHandler
    limit - number- react-parse limit value , default is 10
    skip - number- react-parse skip value , default is 0,
    order - string - react-parse string, default is 'createdAt'
    query - object - react-parse query, default is {}
    // optional function handler that be call and return a new value
    // if you didn't pass this handlers than you limit and skip is used as initial value 
    onLimitChanged (number)
    onSkipChanged (number)
    onOrderChanged, (string)
    onQueryChanged, (object)
    onPagination // (page,size)
  }
/>
```

### documentProps.viewComponent
Your view component will get this props {
  fetchProps - see react-parse FetchDocument fetchProps {data, error, status, info. isLoading, refresh, cleanData, put, post, deleteDoc, updateField}
  onClose, - function - call to close modal
  isOpen - boolean - is modal open
  objectId, - string - empty on new document
  saveOnBlur, - boolean
  fields, - array
  fieldsOptions - fetchExtraData is pass to document as fieldsOptions - pass only for fields that contain a targetName, the key for each value in fieldsOptions is the targetName
  extraData - all fetchExtraData results,
   ... all other parameters from your documentProps configuration
}

### collectionProps.viewComponent
Your view component will get this props {
  fetchProps - see react-parse FetchCollecton fetchProps {data, error, status, info. isLoading, refresh, cleanData, put, post, deleteDoc, updateField}
                * fetchProps is different if you are using cloud code
  fields - array
  dataHandler - function
  extraData - all fetchExtraData results
  title - string
  onCreateNewDoc- function - call this and document modal will display
  onEditDoc- function - call this with object and document modal will display to edit
  skip - number
  limit - number
  // function to call when you want to set a new value
  onLimitChanged
  onSkipChanged
  onOrderChanged
  onQueryChanged
  onPagination
... all other parameters from your collectionProps configuration
}


*/