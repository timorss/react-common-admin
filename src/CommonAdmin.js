// ### CommonAdmin docs: https://github.com/doronnahum/react-common-admin
import React from 'react';
import PropTypes from 'prop-types';
import {
  ContainerHeader,
  Layout,
  SideModal as DefaultSideModal,
  DocForm as DefaultDocForm,
  Table as DefaultTable
} from './components/index';
import { connect } from 'react-redux';
import { selectors, collectionActions, FetchCollection } from 'react-parse';
import Document from './dataProviders/Document';
import Collection from './dataProviders/Collection';
import find from 'lodash/find';
import { notification, defaultDocumentMessages, getParams, setParams } from './configuration';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleDocuments: [/* {id: string, isOpen: boolean, dataFromCollection: {...}}, newDoc: boolean, isMinimized: boolean, fullScreen: boolean */],
      docKey: 0,
      fetchExtraDataKey: 0
    };
    this.onCreateNewDoc = this.onCreateNewDoc.bind(this);
    this.onEditDoc = this.onEditDoc.bind(this);
    this.closeDocumentModal = this.closeDocumentModal.bind(this);
    this.onPostFinished = this.onPostFinished.bind(this);
    this.onDeleteFinished = this.onDeleteFinished.bind(this);
    this.onPutFinished = this.onPutFinished.bind(this);
    this.renderCollection = this.renderCollection.bind(this);
    this.renderDocuments = this.renderDocuments.bind(this);
    this.getExtraDataAsFieldsOptions = this.getExtraDataAsFieldsOptions.bind(this);
    this.notification = this.notification.bind(this);
    this.getVisibleDocuments = this.getVisibleDocuments.bind(this);
    this.parseDataBeforePost = this.parseDataBeforePost.bind(this);
    this.parseDataBeforePut = this.parseDataBeforePut.bind(this);
    this.toggleFullScreen = this.toggleFullScreen.bind(this);
    this.toggleMinimized = this.toggleMinimized.bind(this);
    this.syncParamOnLoad = this.syncParamOnLoad.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onCollectionFetchEnd = this.onCollectionFetchEnd.bind(this);
    this.onCollectionDeleteEnd = this.onCollectionDeleteEnd.bind(this);
    this.minimizedDocumentBeforeMe = 0
    this.lastVisibleDocumentsLength = null
  }
  componentDidMount() {
    this.syncParamOnLoad()
  };

  /**
   * @function notification
   * @param {*} type oneOf 'error', 'success', 'info', 'warning'
   * @param {*} messageKey oneOf 'onPostMessage','onPostFailedMessage','onPutMessage','onDeleteMessage','onDeleteFailedMessage'
   * @param {*} data object
   * This is a wrapper of notification service that help to use defaultDocumentMessages when messagesFromProps is didn't found
   */
  notification(type, messageKey, data) {
    const messagesFromProps = this.props.messages || {};
    if (!notification) {
      console.log('react-common-admin - missing notification services, check react-common-admin.initCommonAdmin')
    } else {
      notification[type](messagesFromProps[messageKey] || defaultDocumentMessages[messageKey], data)
    }
  }

  // ---- react-parse callbacks ----- //

  /**
   * @function onPostFinished
   * @param {object} res react-parse onPostFinished response
   */
  onPostFinished(res) {
    const { error, boomerang, info } = res;
    if (error) {
      this.notification('error', 'onPostFailedMessage', res)
    } else {
      collectionActions.refreshCollection({ targetName: this.props.targetName });
      if(this.props.documentProps.stayOpenAfterPost) {
        this.replaceTemporaryDocIdWithNewDocFromServer(boomerang.modalId, info.objectId)
      }else {
        this.closeDocumentModal(boomerang.modalId)
      }
      this.notification('success', 'onPostMessage', res)
    }
    if (this.props.documentProps.onPostFinished) {
      this.props.documentProps.onPostFinished(res)
    }
  }
  onCollectionFetchEnd(res) {
    const {keepSyncByTargetName, collectionProps} = this.props;
    if(keepSyncByTargetName) {
      keepSyncByTargetName.forEach(targetName => {
        collectionActions.refreshCollection({targetName})
      })
    }
    if(collectionProps.onFetchEnd) {
      collectionProps.onFetchEnd(res)
    }
  }
  onCollectionDeleteEnd(res) {
    this.notification('success', 'onDeleteMessage', res)
    if(this.props.collectionProps.onDeleteEnd) {
      this.props.collectionProps.onDeleteEnd(res)
    }
  }
  /**
   * @function onDeleteFinished
   * @param {object} res react-parse onDeleteFinished response
   */
  onDeleteFinished(res) {
    const { error, boomerang } = res;
    if (error) {
      this.notification('error', 'onDeleteFailedMessage', res)
    } else {
      collectionActions.refreshCollection({
        targetName: this.props.targetName
      });
      this.closeDocumentModal(boomerang.modalId)
      this.notification('success', 'onDeleteMessage', res)
    }
    if (this.props.documentProps.onDeleteFinished) {
      this.props.documentProps.onDeleteFinished(res)
    }
  }

  /**
   * @function onPutFinished
   * @param {object} res react-parse onPutFinished response
   */
  onPutFinished(res) {
    const { error } = res
    if (error) {
      this.notification('error', 'onPutFailedMessage', res)
    } else {
      collectionActions.refreshCollection({
        targetName: this.props.targetName
      });
      this.notification('success', 'onPutMessage', res)
    }
    if (this.props.documentProps.onPutFinished) {
      this.props.documentProps.onPutFinished(res)
    }
  }

  /**
   * @function onRefresh
   * This function will trigger by collection/document viewComponent refresh button
   */
  onRefresh() {
    if (this.props.refreshExtraDataOnRefresh) {
      this.setState({ fetchExtraDataKey: this.state.fetchExtraDataKey + 1 }) // Change key will trigger react-parse fetch
    }
  }

  // ---- Data handlers ----- //
  /**
   * @function handleFetchExtraData
   * @param {array} fetchExtraData array of object, each object is react-parse FetchCollection props
   * We Use this data to fetch data from server to inputs dropDown or display in the table with special formatter
   */
  handleFetchExtraData(fetchExtraData) {
    if (fetchExtraData) {
      return fetchExtraData.map(item => {
        return (
          <FetchCollection
            key={`${item.targetName}-${this.state.fetchExtraDataKey}`}
            render={() => null}
            {...item}
          />
        );
      });
    }
  }

  /**
   * @function getExtraDataAsFieldsOptions
   * This function will return fetch data as an object, split by fields targetName
   * and each input will get is own options
   */
  getExtraDataAsFieldsOptions() {
    const { extraData, documentProps } = this.props
    const { fields } = documentProps
    const fieldsOptions = {}
    if (extraData) {
      fieldsOptions.all = extraData;
      fields.forEach(field => {
        const { targetName, key } = field
        if (targetName) {
          fieldsOptions[key] = extraData[targetName]
        }
      })
    }
    return fieldsOptions;
  }

  /**
   * @function parseDataBeforePost
   * @param {*} data data to send the server
   * This function allows to manipulate the data outside the document from before we post to server
   */
  parseDataBeforePost(data) {
    const { parseDataBeforePost } = this.props.documentProps
    if (parseDataBeforePost) {
      const tableProps = this.collectionViewRef.props
      return parseDataBeforePost(data, tableProps)
    } else {
      return data
    }
  }

  /**
   * @function parseDataBeforePut
   * @param {*} data data to send the server
   * This function allows to manipulate the data outside the document from before we put to server
   */
  parseDataBeforePut(data, objectId, fetchProps) {
    const { parseDataBeforePut } = this.props.documentProps
    if (parseDataBeforePut) {
      const tableProps = this.collectionViewRef.props
      return parseDataBeforePut(data, tableProps, objectId, fetchProps)
    } else {
      return data
    }
  }

  // ---- Documents visible handlers ----- //

  /**
   * @function syncParamOnLoad
   * This function mange initial visibleDocuments from url params
   */
  syncParamOnLoad() {
    if (this.props.paramSync) {
      const params = getParams();
      const visibleDocumentsFromParams = params.vd
      if (visibleDocumentsFromParams) {
        let visibleDocuments = JSON.parse(visibleDocumentsFromParams)
        visibleDocuments = visibleDocuments.map(item => {
          //id, isOpen, dataFromCollection, newDoc, isMinimized, fullScreen
          const _item = {}
          _item.id = item.i;
          _item.isOpen = item.o;
          _item.isMinimized = item.m
          _item.dataFromCollection = item.d
          _item.fullScreen = item.f
          return _item;
        })
        this.setState({ visibleDocuments })
      }
    }
  }

  /**
   * @function getVisibleDocuments
   * This function return all visibleDocuments from state
   * default document - When documentProps include objectId then this document added as a default document
   */
  getVisibleDocuments() {
    const { documentProps } = this.props
    const visibleDocuments = [...this.state.visibleDocuments]
    if (documentProps.objectId) {
      visibleDocuments.push({ id: documentProps.objectId, isOpen: true })
    }
    return visibleDocuments
  }

  /**
   * @function onCreateNewDoc
   * @param {object} dataFromCollection Data that pass from table row to document
   */
  onCreateNewDoc(dataFromCollection) {
    const { openAsFullDoc } = this.props
    const visibleDocuments = [...this.state.visibleDocuments];
    const _dataFromCollection = (dataFromCollection && dataFromCollection.target) ? null : dataFromCollection // we didn't want input event
    visibleDocuments.push({ id: `new${this.state.docKey}`, isOpen: true, dataFromCollection: _dataFromCollection, newDoc: true, fullScreen: openAsFullDoc, isMinimized: false })
    this.setState({ docKey: this.state.docKey + 1 })
    this.setVisibleDocuments(visibleDocuments)
  }

  /**
   * @function onEditDoc
   * @param {string} docId document object id
   * @param {object} dataFromCollection Data that pass from table row to document
   */
  onEditDoc(docId, dataFromCollection) {
    const { openAsFullDoc } = this.props
    const isDocumentIsAlreadyOpen = find(this.state.visibleDocuments, function (obj) { return obj.id === docId })
    if (isDocumentIsAlreadyOpen) {
      notification.info('This document is already in use');
    } else {
      const visibleDocuments = [...this.state.visibleDocuments];
      const _dataFromCollection = (dataFromCollection && dataFromCollection.target) ? null : dataFromCollection // we didn't want input event
      visibleDocuments.push({ id: docId, isOpen: true, dataFromCollection: _dataFromCollection, fullScreen: openAsFullDoc, isMinimized: false })
      this.setVisibleDocuments(visibleDocuments)
    }
  }

  /**
   * function closeDocumentModal
   * @param {string} modalId each Document have a unique key, objectId for existing docs and `new${this.state.docKey}` for new ones
   */
  closeDocumentModal(modalId) {
    const visibleDocuments = this.state.visibleDocuments.filter(item => item.id !== modalId)
    this.setVisibleDocuments(visibleDocuments)
  }
  /**
   * function replaceTemporaryDocIdWithNewDocFromServer
   * Help us convert create doc to edit doc
   * @param {string} modalId each Document have a unique key, objectId for existing docs and `new${this.state.docKey}` for new ones
   */
  replaceTemporaryDocIdWithNewDocFromServer(modalId, newObjectId) {
    const visibleDocuments = this.state.visibleDocuments.map(item => {
      if(item.id === modalId) {
        item.id = newObjectId;
        item.newDoc = false;
      }
      return item
    })
    this.setVisibleDocuments(visibleDocuments)
  }

  toggleMinimized(modalId) {
    const visibleDocuments = this.state.visibleDocuments.map(item => {
      if (item.id === modalId) {
        item.isMinimized = !item.isMinimized
      }
      return item
    })
    this.setVisibleDocuments(visibleDocuments)
  }

  toggleFullScreen(modalId) {
    const visibleDocuments = this.state.visibleDocuments.map(item => {
      if (item.id === modalId) {
        item.fullScreen = !item.fullScreen
      }
      return item
    })
    this.setVisibleDocuments(visibleDocuments)
  }

  setVisibleDocuments(visibleDocuments) {
    this.setState({ visibleDocuments })
    if (this.props.onVisibleDocumentsChanged) {
      if (this.lastVisibleDocumentsLength !== visibleDocuments.length) {
        this.lastVisibleDocumentsLength = visibleDocuments.length;
        this.props.onVisibleDocumentsChanged(visibleDocuments.length)
      }
    }
    if (this.props.paramSync) {
      const _visibleDocuments = []
      visibleDocuments.forEach(item => {
        // id, isOpen, dataFromCollection, newDoc, isMinimized, fullScreen
        if(!item.isOpen || item.newDoc) return
        const _item = {}
        _item.i = item.id;
        _item.o = item.isOpen ? 1 : 0;
        _item.m = item.isMinimized ? 1 : 0
        _item.d = item.dataFromCollection
        _item.f = item.fullScreen ? 1 : 0
        _visibleDocuments.push(_item)
      })
      setParams('vd', JSON.stringify(_visibleDocuments))
    }
  }

  getInitialValue(fields, initialValue) {
    if(this.initialValueFlag) { // We want getInitialValue to run only one time
      return this.initialValue
    }
    let finalInitialValue = null;
    let initialValueFromFields = null;
    fields.forEach(item => {
      if(typeof item.initialValue !== 'undefined') {
        if(!initialValueFromFields) initialValueFromFields = {};
        initialValueFromFields[item.key] = item.initialValue
      }
    })
    if(initialValue || initialValueFromFields) {
      finalInitialValue = {...initialValue, ...initialValueFromFields}
    };
    this.initialValue = finalInitialValue
    this.initialValueFlag = true;
    return finalInitialValue
  }

  /**
   * @function renderDocuments
   * This function render Document for each of the visibleDocuments
   * Document is a react-parse FetchDocument with a wrapper around docForm
   * The wrapper is from react-common-admin usual is a modal or side modal
   */
  renderDocuments() {
    const {
      targetName,
      schemaName,
      documentProps,
      extraData,
      showCollection,
      collectionData
    } = this.props;
    const { fields, showCloseButton, showDeleteButton, wrapper,
      viewComponent, saveOnBlur, skip, limit, query, onLimitChanged,
      parseDataBeforePost, parseDataBeforePut, // do not remove, we didn't want this on resDocumentProps, it will overwrite this.parseDataBeforePost...
      onSkipChanged, onOrderChanged, onQueryChanged, messages, initialValue,
      parseDataBeforeChange,
      ...resDocumentProps } = documentProps;
    const visibleDocuments = this.getVisibleDocuments()
    this.minimizedDocumentBeforeMe = 0 // reset the minimizedDocumentBeforeMe, We count it when visibleDocuments.map is running
    return visibleDocuments.map(({ id, isOpen, dataFromCollection, newDoc, isMinimized, fullScreen }) => {
      const isNew = newDoc
      const documentTargetName = `${targetName}-${id}`;
      const isDocumentOpen = isOpen || !showCollection // When showCollection is false then document is always Open
      const _minimizedDocumentBeforeMe = this.minimizedDocumentBeforeMe
      if (isMinimized) { this.minimizedDocumentBeforeMe++ }
      return (
        <Document
          {...resDocumentProps}
          key={documentTargetName}
          // ---react-parse---
          // data
          targetName={documentTargetName}
          schemaName={schemaName}
          objectId={isNew ? null : id}
          collectionData={collectionData}
          // callbacks
          onPostFinished={this.onPostFinished}
          onDeleteFinished={this.onDeleteFinished}
          onPutFinished={this.onPutFinished}
          collectionTargetName={targetName}
          // extraData is pass as fieldsOptions, field with targetName will get data from extraData
          fieldsOptions={this.getExtraDataAsFieldsOptions()}
          extraData={extraData}
          // ---View---
          // wrapper component
          wrapper={wrapper || DefaultSideModal}
          showCloseButton={showCloseButton}
          showDeleteButton={showDeleteButton}
          minimizedDocumentBeforeMe={_minimizedDocumentBeforeMe || 0} // We need this value to Know what is the right margin From right when documents are minimized
          modalId={id}
          isMinimized={isMinimized}
          fullScreen={fullScreen}
          toggleMinimized={this.toggleMinimized}
          toggleFullScreen={this.toggleFullScreen}
          // pass to wrapper component - toggle to show/hide the document
          isOpen={isDocumentOpen}
          onClose={this.closeDocumentModal}
          // this is the view that get all document props {onClose, objectId, saveOnBlur, fetchProps, fields, extraData, ...documentProps}, fetchProps is react-parse response
          viewComponent={viewComponent || DefaultDocForm}
          parseDataBeforePost={this.parseDataBeforePost}
          parseDataBeforePut={this.parseDataBeforePut}
          saveOnBlur={saveOnBlur}
          fields={fields}
          query={query}
          onLimitChanged={onLimitChanged}
          onSkipChanged={onSkipChanged}
          onOrderChanged={onOrderChanged}
          onQueryChanged={onQueryChanged}
          messages={messages}
          dataFromCollection={dataFromCollection}
          onRefresh={this.onRefresh}
          initialValue={this.getInitialValue(fields, initialValue)}
          parseDataBeforeChange={parseDataBeforeChange}
        />
      );
    })
  }

  /**
   * @function renderCollection
   * This function render Collection
   * Collection is a react-parse FetchCollection that handle the query, pagination
   * and render Table or other viewComponent to screen
   */
  renderCollection() {
    const {
      showLoader, // this from mapStateToProps
      title,
      targetName,
      schemaName,
      collectionProps,
      extraData,
      functionName
    } = this.props;
    const { fields, viewComponent, dataHandler, tableProps, ...resCollectionProps } = collectionProps;
    return (
      <Collection
        key={schemaName}
        ref={ref => { this.collectionRef = ref }}
        onViewRef={ref => { this.collectionViewRef = ref }}
        // ---react-parse---
        // data
        schemaName={schemaName}
        targetName={targetName}
        // cloud code
        functionName={functionName}
        dataHandler={dataHandler}
        // callbacks
        onDeleteFinished={() => { alert('onDeleteFinished') }}
        //
        title={title}
        fields={fields}
        // doc
        onCreateNewDoc={this.onCreateNewDoc}
        onEditDoc={this.onEditDoc}
        extraData={extraData}
        showLoader={showLoader}
        // this is the view that get all collection props {onQueryChanged,skip,limit,fetchProps,showLoader,onEditDoc,onCreateNewDoc,extraData   ...collectionProps}, fetchProps is react-parse response
        viewComponent={viewComponent || DefaultTable}
        onRefresh={this.onRefresh}
        onDeleteEnd={this.onCollectionDeleteEnd}
        onFetchEnd={this.onCollectionFetchEnd}
        {...tableProps}
        {...resCollectionProps}
      />
    );
  }

  render() {
    const { title, showPageHeader, showCollection, isChild } = this.props;
    return (
      <Layout className={`rca-main ${isChild ? 'rca-child' : ''}`}>
        <Layout>
          {showPageHeader && <Layout.Header className={'rca-main-pageHeader'}>
            <ContainerHeader title={title} />
          </Layout.Header>
          }
          <Layout.Content className={'rca-main-pageContent'} >
            {showCollection && this.renderCollection()}
            {(!showCollection) && this.renderDocuments()}
          </Layout.Content>
        </Layout>
        {showCollection && this.renderDocuments()}
        {this.handleFetchExtraData(this.props.fetchExtraData)}
      </Layout>
    );
  }
}

const mapStateToProps = (state, { targetName, fetchExtraData }) => {
  let extraData;
  if (fetchExtraData) {
    extraData = {};
    fetchExtraData.forEach(item => {
      extraData[item.targetName] = selectors.selectCollectionData(
        state,
        item.targetName
      );
    });
  }
  return {
    collectionData: selectors.selectCollectionData(state, targetName),
    showLoader: selectors.selectCollectionLoading(state, targetName),
    error: selectors.selectCollectionError(state, targetName),
    extraData
  };
};

export default connect(
  mapStateToProps,
  null
)(Page);

Page.defaultProps = {
  showPageHeader: true,
  showCollection: true,
  openAsFullDoc: true,
  paramSync: true,
  isChild: false,
  refreshExtraDataOnRefresh: true,
};
Page.propTypes = {
  showPageHeader: PropTypes.bool,
};
