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

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDocumentModal: false,
      currentDocId: null,
      docKey: 0
    };
    this.onCreateNewDoc = this.onCreateNewDoc.bind(this);
    this.onEditDoc = this.onEditDoc.bind(this);
    this.closeDocumentModal = this.closeDocumentModal.bind(this);
    this.onPostFinished = this.onPostFinished.bind(this);
    this.onDeleteFinished = this.onDeleteFinished.bind(this);
    this.onPutFinished = this.onPutFinished.bind(this);
    this.renderCollection = this.renderCollection.bind(this);
    this.renderDocument = this.renderDocument.bind(this);
    this.increaseDocKey = this.increaseDocKey.bind(this);
    this.convertExtraDataToFieldsOptions = this.convertExtraDataToFieldsOptions.bind(this);
  }

  onPostFinished({ error, status, data, info }) {
    if (error) {
      console.log('Post faield', error);
    } else {
      collectionActions.refreshCollection({
        targetName: this.props.targetName
      });
      this.setState({ currentDocId: info.objectId, showDocumentModal: true });
    }
  }

  onDeleteFinished({ error, status, data, info }) {
    if (error) {
      console.log('Delete faield', error);
    } else {
      collectionActions.refreshCollection({
        targetName: this.props.targetName
      });
      this.setState({ currentDocId: null, showDocumentModal: false });
    }
  }

  onPutFinished({ error, status, data, info }) {
    if (error) {
      //alert('onPutFinished faield', error)
    } else {
      collectionActions.refreshCollection({
        targetName: this.props.targetName
      });
    }
  }

  closeDocumentModal() {
    this.setState({ showDocumentModal: false, currentDocId: null }, () => this.props.onShowDocumentModal(false));
  }

  onCreateNewDoc() {
    this.setState({
      showDocumentModal: true,
      currentDocId: null,
      docKey: this.increaseDocKey()
    }, () => this.props.onShowDocumentModal(true));
  }

  increaseDocKey() {
    return this.state.docKey + 1;
  }

  onEditDoc(docId) {
    this.setState({
      showDocumentModal: true,
      currentDocId: docId,
      docKey: this.increaseDocKey()
    }, () => this.props.onShowDocumentModal(true));
  }

  handleFetchExtraData(fetchExtraData) {
    if (fetchExtraData) {
      return fetchExtraData.map(item => {
        return (
          <FetchCollection
            key={item.targetName}
            render={() => null}
            {...item}
          />
        );
      });
    }
  }

  convertExtraDataToFieldsOptions() {
    const {extraData, documentProps} = this.props
    const {fields} = documentProps
    console.log({extraData, fields})
    const fieldsOptions = {}
    /*
        extraData is object of data collection by targetNames,
        fieldsOptions need to be an object of extraData by fieldKey, each field get is data by field.targetName
      */
    if(extraData) {
      fieldsOptions.all = extraData;
      fields.forEach(field => {
        const {targetName, key} = field
        if(targetName) {
          fieldsOptions[key] = extraData[targetName]
        }
      })
    }
    console.log('fieldsOptions0', fieldsOptions)
    return fieldsOptions;
  }

  renderDocument() {
    const { showDocumentModal, currentDocId, docKey } = this.state;
    const {
      targetName,
      schemaName,
      documentProps,
      extraData
    } = this.props;
    const {fields, wrapper, viewComponent, parseDataBeforePost, saveOnBlur, skip, limit, query, onLimitChanged, onSkipChanged, onOrderChanged, onQueryChanged, messages, ...resDocumentProps} = documentProps;
    const documentTargetName = `${targetName}-${currentDocId || 'new_doc'}`;
    return (
      <Document
        key={`${documentTargetName}${docKey}`} // important key- new components instance
        // ---react-parse---
        // data
        targetName={documentTargetName}
        schemaName={schemaName}
        objectId={currentDocId}
        // callbacks
        onPostFinished={this.onPostFinished}
        onDeleteFinished={this.onDeleteFinished}
        onPutFinished={this.onPutFinished}
        collectionTargetName={targetName}
        // extraData is pass as fieldsOptions, field with targetName will get data from extraData
        fieldsOptions={this.convertExtraDataToFieldsOptions()}
        extraData={extraData}
        // ---View---
        // wrapper component
        wrapper={wrapper || DefaultSideModal}
        // pass to wrapper component - toggle to show/hide the document
        isOpen={showDocumentModal}
        onClose={this.closeDocumentModal}
        // this is the view that get all document props {onClose, objectId, saveOnBlur, fetchProps, fields, extraData, ...documentProps}, fetchProps is react-parse response
        viewComponent={viewComponent || DefaultDocForm}
        parseDataBeforePost={parseDataBeforePost}
        saveOnBlur={saveOnBlur}
        fields={fields}
        query={query}
        onLimitChanged={onLimitChanged}
        onSkipChanged={onSkipChanged}
        onOrderChanged={onOrderChanged}
        onQueryChanged={onQueryChanged}
        messages={messages}
        {...resDocumentProps}
      />
    );
  }

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
    const {fields, viewComponent, dataHandler, ...resCollectionProps} = collectionProps;
    return (
      <Collection
        key={schemaName}
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
        // this is the view that get all collection props {title, onQueryChanged,skip,limit,fetchProps,showLoader,onEditDoc,onCreateNewDoc,extraData   ...collectionProps}, fetchProps is react-parse response
        viewComponent={viewComponent || DefaultTable}
        {...resCollectionProps}
      />
    );
  }

  render() {
    const { title, showPageHeader } = this.props;
    return (
      <Layout className={'rca'}>
        <Layout>
          <Layout.Header className={'rca-pageHeader'}>
            {showPageHeader && <ContainerHeader title={title} />}
          </Layout.Header>
          <Layout.Content className={'rca-pageContent'} >
            {this.renderCollection()}
          </Layout.Content>
        </Layout>
        {this.renderDocument()}
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
  onShowDocumentModal: () => {},
  showPageHeader: true
};
Page.propTypes = {
  showPageHeader: PropTypes.bool,
};

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
