import React from 'react';
import { Loader } from '../index'
import {notification} from '../../configuration';
import {Popconfirm} from 'antd'
import {Form} from '../../index';
import isEmpty from 'lodash/isEmpty';
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
    this.toggleFileInclude = this.toggleFileInclude.bind(this);
  }

  onPost() {
    const {parseDataBeforePost, fetchProps} = this.props
    const { data, post } = fetchProps
    if (parseDataBeforePost) {
      const dataToSend = parseDataBeforePost(data)
      post(dataToSend, this.state.fileInclude, this.state.fileValueHandler)
    } else {
      post(null, this.state.fileInclude, this.state.fileValueHandler)
    }
  }

  onPut({key, value, info}) {
    const {dispatchId, fileInclude, fileValueHandler} = info || {}
    const hasFiles = this.state.fileInclude || fileInclude
    const _fileValueHandler = this.state.fileValueHandler || fileValueHandler
    this.props.fetchProps.put({ [key]: value }, hasFiles, _fileValueHandler, dispatchId)
  }

  onChange({key, value, info, isValid}) {
    if(info && info.fileInclude) {
      this.toggleFileInclude(true, info.fileValueHandler)
    }
    this.props.fetchProps.updateField(key, value)
    if(this.props.objectId && info && info.putOnChange) {
      // Value is valid
      if(isValid) {
        this.onPut({
          key,
          value,
          isValid,
          info: (info && info.target) ? null : info // if info.target then is an input event and we didn't need that
        })
      }else{
        // Value is not valid
        notification.error('Your changes was not saved, input is not valid')
      }
    }
  }

  onBlur(res) {
    const {objectId, saveOnBlur} = this.props;
    const { key, initialValue, isValid, info, value } = res
    let _value = value
    // We work with react-cross-form, the blur event didn't pass any value, but you can pass info object with any data you want
    // we use this option to help special fields (like <uploadFile />) to pass a value with onBlur, this value will override the value from the state
    // This is helpful to inputs without regular onBlur
    if(info && (typeof info.value !== 'undefined')) {
      _value = info.value
    }
    const isValueChanged = initialValue !== _value;
    // condition to run put when input blur
    if(objectId && saveOnBlur && isValueChanged) {
      // Value is valid
      if(isValid) {
        this.onPut({
          key,
          value: _value,
          isValid,
          info: (info && info.target) ? null : info // if info.target then is an input event and we didn't need that
        })
      }else{
        // Value is not valid
        notification.error('Your changes was not saved, input is not valid')
      }
    }
  }

  toggleFileInclude(value, fileValueHandler) {
    let newValue
    if(value !== undefined) {
      newValue = value
    }else{
      newValue = !this.state.fileInclude
    }
    this.setState({fileInclude: newValue, fileValueHandler})
  }
  onSubmit (event) {
    event.preventDefault();

    // custom form handling here
  }
  render() {
    const { onClose, objectId, saveOnBlur, fetchProps, fields, fieldsOptions } = this.props;
    const { error, isLoading, refresh, put, data, updateField
      // status, info, cleanData, id,  , post,
    } = fetchProps
    const isFirstLoading = objectId && isEmpty(data)
    return (
      <div className="docForm">
        <form onSubmit={this.onSubmit}>
          <Form
            fields={fields}
            data={data}
            validateType={isFirstLoading ? 'none' : 'all'}
            onChange={this.onChange}
            onBlur={this.onBlur}
            onValidateStateChanged={({ isValid, unValidFields }) => {
              this.setState({ isFormValid: isValid });
            }}
            toggleFileInclude={this.toggleFileInclude}
            fieldsOptions={fieldsOptions}
          />
        </form>
        <div style={{ height: 50, paddingTop: '1.6rem' }}>
          <button type="button" className="btn btn-secondary ant-btn ant-btn-secondary bottomBtns" onClick={onClose}> Close </button>
          {(!saveOnBlur && !objectId) && <button type="button" className="btn btn-primary ant-btn ant-btn-primary bottomBtns" onClick={() => put(data)} > Update </button>}
          {!objectId &&
            <button
              type="button"
              className="btn btn-primary ant-btn ant-btn-primary bottomBtns"
              disabled={!this.state.isFormValid}
              onClick={() => { this.onPost() }}> Save </button>}
          {objectId && <button type="button" className="btn btn-primary ant-btn ant-btn-secondary bottomBtns" onClick={refresh} > Refresh </button>}
          {/* {objectId && <button type="button" className="btn btn-primary ant-btn ant-btn-danger bottomBtns" onClick={this.onDelete} > Delete </button>} */}
          {objectId && <Popconfirm title={'Are you sure delete this ?'} okType='danger' onConfirm={this.props.fetchProps.deleteDoc} okText="Yes" cancelText="No">
            <button type="button" className="btn btn-primary ant-btn ant-btn-danger bottomBtns"> Delete </button>
          </Popconfirm>}
          {(!this.state.isFormValid) && <div>Form is not valid</div>}
        </div>
      </div>
    );
  }
}

export default DocForm;
