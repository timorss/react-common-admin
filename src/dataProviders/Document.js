import React from 'react';
import PropTypes from 'prop-types';
import { FetchDocument } from 'react-parse'
import {notification, defaultDocumentMessages} from '../configuration';

export default class DocWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null
    }
    this.onPostFinished = this.onPostFinished.bind(this);
    this.onPutFinished = this.onPutFinished.bind(this);
    this.onDeleteFinished = this.onDeleteFinished.bind(this);
    this.onFetchEnd = this.onFetchEnd.bind(this);
    this.notification = this.notification.bind(this);
  }

  onFetchEnd({ error, status, data, info }) {
    this.setState({error, status, data, info})
  }
  notification(type, messageKey, data) {
    const messagesFromProps = this.props.messages || {};
    if(!notification) {
      console.log('react-common-admin - missing notification services, check react-common-admin.initCommonAdmin')
    }else{
      notification[type](messagesFromProps[messageKey] || defaultDocumentMessages[messageKey], data)
    }
  }

  onPostFinished(res) {
    this.props.onPostFinished(res)
    if (res.error) {
      this.notification('error', 'onPostFailedMessage', res)
    } else{
      this.notification('success', 'onPostMessage', res)
    }
  }

  onPutFinished(res) {
    this.props.onPutFinished(res)
    if (res.error) {
      this.notification('error', 'onPutFailedMessage', res)
    } else{
      this.notification('success', 'onPutMessage', res)
    }
  }

  onDeleteFinished(res) {
    this.props.onDeleteFinished(res)
    if (res.error) {
      this.notification('error', 'onDeleteFailedMessage', res)
    } else{
      this.notification('success', 'onDeleteMessage', res)
    }
  }

  render() {
    const { isOpen, customTitle, onClose, saveOnBlur, targetName, schemaName, fields, objectId, viewComponent, extraData, fieldsOptions, messages, ...resProps } = this.props
    const WrapperElement = this.props.wrapper
    const title = customTitle ? customTitle({state: this.state, props: this.props}) : (objectId ? `Edit - ${objectId}` : 'Create New Doc')
    return (
      <WrapperElement
        key={targetName}
        isOpen={isOpen}
        title={title}
        objectId={objectId}
        onClose={onClose}
      >
        <FetchDocument
          key={targetName}
          schemaName={schemaName}
          targetName={targetName}
          objectId={objectId}
          leaveClean
          // Call backs
          onFetchEnd={this.onFetchEnd}
          onPostEnd={this.onPostFinished}
          onPutEnd={this.onPutFinished}
          onDeleteEnd={this.onDeleteFinished}
          // Info that will pass to viewComponent
          // -- Method to close modal
          onClose={onClose}
          // -- Put on each blur from input
          saveOnBlur={saveOnBlur}
          // -- fields to render
          fields={fields}
          collectionTargetName={this.props.collectionTargetName}
          fieldsOptions={fieldsOptions}
          component={viewComponent}
          title={title}
          messages={messages}
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
  parseDataBeforePost: PropTypes.func // Yoc can pass a function that get the document data and return the data you want to post the server
};

DocWrapper.defaultProps = {
  saveOnBlur: true,
  onPostFinished: () => {},
  onPutFinished: () => {},
  onDeleteFinished: () => {},
};
