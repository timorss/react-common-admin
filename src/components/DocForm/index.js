import React from 'react';
import {Popconfirm, Button} from 'antd'
import isEmpty from 'lodash/isEmpty';
import {notification} from '../../configuration';
import {Form} from '../../index';
class DocForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fileInclude: false,
      isFormValid: true,
    }
    this.onPost = this.onPost.bind(this)
    this.onPut = this.onPut.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeAndBlur = this.onChangeAndBlur.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.toggleFileInclude = this.toggleFileInclude.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  /**
   * @function onPost
   * This function will run react-parse fetchDocument post
   * If parseDataBeforePost is undefined we will not pass an data
   * fetchDocument will use the data from reduxStore.parse...
   */
  onPost() {
    const {parseDataBeforePost, fetchProps, modalId} = this.props
    const {fileInclude, fileValueHandler} = this.state
    const dataToSend = parseDataBeforePost ? parseDataBeforePost(fetchProps.data) : null
    fetchProps.post(dataToSend, fileInclude, fileValueHandler, null, {modalId})
  }

  /**
   * @function onPut
   * @param {obj} payload
   * @param {string} payload.key the key to update
   * @param {string} payload.value the value to set
   * @param {object} payload.info some info about the query, see react-parse dispatchId,fileInclude,fileValueHandler {dispatchId, fileInclude, fileValueHandler}
   * This function will run react-parse fetchDocument put
   */
  onPut({key, value, info}) {
    const {parseDataBeforePut, objectId, fetchProps} = this.props;
    const {dispatchId, fileInclude, fileValueHandler} = info || {}
    const hasFiles = this.state.fileInclude || fileInclude
    const _fileValueHandler = this.state.fileValueHandler || fileValueHandler
    const dataToEnd = parseDataBeforePut ? parseDataBeforePut({ [key]: value }, objectId, fetchProps) : { [key]: value }
    this.props.fetchProps.put(dataToEnd, hasFiles, _fileValueHandler, dispatchId)
  }

  /**
   * @function onChange
   * @param {object} payload
   * @param {string} payload.key the key to update
   * @param {string} payload.value the value to set
   * @param {object} payload.info some info about the query, see react-parse dispatchId,fileInclude,fileValueHandler {dispatchId, fileInclude, fileValueHandler}
   * @param {boolean} payload.isValid This value come from react-cross-form
   * This function only manipulate a local data and didn't save it on the server yet, see react-parse updateField
   * but if info include the boolean putOnChange then we run this.onPut, this efficient for special inputs that didn't have onBlur
   */
  onChange({key, value, info, isValid}) {
    // We need to know that fileInclude for the post with files if needed
    if(info && info.fileInclude) {
      this.toggleFileInclude(true, info.fileValueHandler)
    }
    // Make the local update
    this.props.fetchProps.updateField(key, value)
    // Put to Server if it is a existing document
    if(this.props.objectId && info && info.putOnChange) {
      // Value is valid
      if(isValid) {
        this.onPut({
          key,
          value,
          isValid,
          info
        })
      }else{
        // Value is not valid
        notification.error('Your changes was not saved, input is not valid')
      }
    }
  }

  /**
   * @function onChangeAndBlur
   * @param {*} res
   * Some of the inputs didn't contain a blur event, this make it to work like onChange+onBlur
   */
  onChangeAndBlur(res) {
    if(!res.info) {
      res.info = {}
    }
    res.info.putOnChange = true;
    this.onChange(res)
  }

  /**
   * @function onBlur
   * @param {object} payload
   * @param {string} payload.key the key to update
   * @param {string} payload.value the value to set
   * @param {object} payload.initialValue This value comes from react-cross-form and helps us decide if we need to put data to the server
   * @param {object} payload.isValid This value comes from react-cross-form and helps us decide if we need to put data to the server
   * @param {object} payload.info some info about the query, see react-parse dispatchId,fileInclude,fileValueHandler {dispatchId, fileInclude, fileValueHandler}
   * also we let the option to pass the value inside the info and it will override the value from the input
   * because We work with react-cross-form, the blur event didn't pass any value, but you can pass info object with any data you want
   * we use this option to help special fields (like <uploadFile />) to pass a value with onBlur
   */
  onBlur(payload) {
    const {objectId, saveOnBlur} = this.props;
    const { key, initialValue, isValid, info, value } = payload
    let _value = value
    // override the value if info contain a value
    if(info && (typeof info.value !== 'undefined')) {
      _value = info.value
    }
    const isValueChanged = initialValue !== _value;
    const isExistingDocument = objectId;
    if(saveOnBlur && isExistingDocument && isValueChanged) {
      if(isValid) {
        this.onPut({
          key,
          value: _value,
          isValid,
          info: (info && info.target) ? null : info // if info.target is exist then is a input event and not relevant data
        })
      }else{
        // Value is not valid
        notification.error('Your changes was not saved, input is not valid')
      }
    }
  }

  /**
   * @function toggleFileInclude
   * @param {boolean} value
   * @param {Function} fileValueHandler
   * This function will set on store a fileInclude flag fileValueHandler callback for react-parse
   */
  toggleFileInclude(value, fileValueHandler) {
    let newValue
    if(value !== undefined) {
      newValue = value
    }else{
      newValue = !this.state.fileInclude
    }
    this.setState({fileInclude: newValue, fileValueHandler})
  }

  /**
   * @function onSubmit
   * @param {*} event
   * We want to prevent Default form submit
   */
  onSubmit (event) {
    event.preventDefault();
    // custom form handling here
  }

  /**
   * @function onDelete
   * This will run the react-parse deleteDoc
   */
  onDelete() {
    const {fetchProps, modalId} = this.props
    fetchProps.deleteDoc(null, { modalId })
  }

  onRefresh() {
    const { fetchProps, onRefresh } = this.props;
    fetchProps.refresh();
    if(onRefresh) {
      onRefresh()
    }
  }

  render() {
    const { onClose, objectId, saveOnBlur, fetchProps, fields, fieldsOptions, showCloseButton, showDeleteButton } = this.props;
    const { refresh, put, data } = fetchProps
    const isFirstLoading = objectId && isEmpty(data)
    return (
      <div className="rca-docForm">
        <form onSubmit={this.onSubmit}>
          <Form
            fields={fields}
            data={data}
            validateType={isFirstLoading ? 'none' : 'all'}
            onChange={this.onChange}
            onBlur={this.onBlur}
            onChangeAndBlur={this.onChangeAndBlur}
            onValidateStateChanged={({ isValid, unValidFields }) => {
              this.setState({ isFormValid: isValid });
            }}
            toggleFileInclude={this.toggleFileInclude}
            fieldsOptions={fieldsOptions}
          />
        </form>
        <div style={{ height: 50, pingTop: '1.6rem' }}>
          {/* {showCloseButton && <Button type='secondary' className='rca-m5' onClick={onClose}>Close</Button>} */}
          {(!saveOnBlur && !objectId) && <Button type='primary' className='rca-m5' onClick={() => put(data)}>Update</Button>}
          {!objectId && <Button type='primary' onClick={this.onPost} className='rca-m5'>Save</Button>}
          {objectId && <Button type='secondary' onClick={this.onRefresh} className='rca-m5'>Refresh</Button>}
          {(objectId && showDeleteButton) &&
            <Popconfirm
              title={'Are you sure delete this ?'}
              okType='danger'
              onConfirm={this.onDelete}
              okText="Yes" cancelText="No">
              <Button type='danger' className='rca-m5'>Delete</Button>
            </Popconfirm>
          }
          {(!this.state.isFormValid) && <div>Form is not valid</div>}
        </div>
      </div>
    );
  }
}

export default DocForm;

DocForm.defaultProps = {
  showCloseButton: true,
  showDeleteButton: true,
};
