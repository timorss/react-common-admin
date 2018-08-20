import React from 'react';
import PropTypes from 'prop-types';
import { FetchDocument } from 'react-parse'

export default class DocWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null
    }
    this.onFetchEnd = this.onFetchEnd.bind(this);
  }

  onFetchEnd({ error, status, data, info }) {
    this.setState({error, status, data, info})
  }

  render() {
    const { isOpen, customTitle, onClose, saveOnBlur,
      targetName, schemaName, fields, objectId, viewComponent,
      extraData, fieldsOptions, messages, dataFromCollection,
      modalId, minimizedDocumentBeforeMe, toggleMinimized, toggleFullScreen,
      onPostFinished, onDeleteFinished, onPutFinished, isMinimized, fullScreen, onRefresh,
      ...resProps } = this.props
    const WrapperElement = this.props.wrapper
    const title = customTitle ? customTitle({state: this.state, props: this.props}) : (objectId ? `Edit - ${objectId}` : 'Create New Doc')
    return (
      <WrapperElement
        key={targetName}
        isOpen={isOpen}
        title={title}
        objectId={objectId}
        onClose={onClose}
        modalId={modalId}
        minimizedDocumentBeforeMe={minimizedDocumentBeforeMe}
        isMinimized={isMinimized}
        fullScreen={fullScreen}
        toggleMinimized={toggleMinimized}
        toggleFullScreen={toggleFullScreen}
      >
        <FetchDocument
          key={targetName}
          schemaName={schemaName}
          targetName={targetName}
          objectId={objectId}
          leaveClean
          // Call backs
          onFetchEnd={this.onFetchEnd}
          onPostEnd={onPostFinished}
          onPutEnd={onPutFinished}
          onDeleteEnd={onDeleteFinished}
          // Info that will pass to viewComponent
          // -- Method to close modal
          onClose={onClose}
          // -- Put on each blur from input
          saveOnBlur={saveOnBlur}
          // -- fields to render
          fields={fields}
          collectionTargetName={this.props.collectionTargetName}
          fieldsOptions={fieldsOptions}
          extraData={extraData}
          component={viewComponent}
          title={title}
          messages={messages}
          modalId={modalId}
          dataFromCollection={dataFromCollection}
          onRefresh={onRefresh}
          {...resProps}
        />
      </WrapperElement>
    );
  }
}

DocWrapper.propTypes = {
  // react-parse
  schemaName: PropTypes.string.isRequired, // react-parse schemaName
  targetName: PropTypes.string.isRequired, // react-parse targetName
  viewComponent: PropTypes.any.isRequired, // react-parse component to render
  // callback
  onPostFinished: PropTypes.func, // Call back that call when postFinished, get the response from react-parse onPostFinished
  onPutFinished: PropTypes.func, // Call back that call when postFinished, get the response from react-parse onPutFinished
  onDeleteFinished: PropTypes.func, // Call back that call when postFinished, get the response from react-parse onDeleteFinished
  // configuration
  fields: PropTypes.array.isRequired, // data that will pass to react-parse document view
  saveOnBlur: PropTypes.bool, // When true we call onPut when input is blur, but only if newValue !== initialValue (initialValue is value from onFocus)
  parseDataBeforePost: PropTypes.func, // Yoc can pass a function that get the document data and return the data you want to post the server
  dataFromCollection: PropTypes.object
};

DocWrapper.defaultProps = {
  saveOnBlur: true,
  onPostFinished: () => {},
  onPutFinished: () => {},
  onDeleteFinished: () => {},
  dataFromCollection: {}
};
