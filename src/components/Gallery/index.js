import React, { Component } from 'react';
import {
  Icon,
  Popconfirm,
  Checkbox,
  Menu,
  Dropdown,
  Modal,
  Card
} from 'antd';
import { buildQuery } from '../../utils/helpers';
import ListWrapper from '../ListWrapper';
import moment from 'moment';

const { Meta } = Card;

export default class GalleryView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePreview: null,
    };
  }

  onPagination(page, pageSize) {
    this.props.onPagination(page, pageSize);
  }

  renderMenu(objectId) {
    const renderMenus = () => {
      return (
        <Menu>
          <Menu.Item
            key="edit"
            onClick={() => {
              this.props.onEditDoc(objectId);
            }}
          >
            <Icon type="edit" /> Edit
          </Menu.Item>
          <Menu.Item key="remove">
            <Popconfirm
              okType="danger"
              title={'Are you sure delete this ?'}
              onConfirm={() => this.props.fetchProps.deleteDoc(objectId)}
              okText="Yes"
              cancelText="No"
            >
              <Icon type="delete" /> Delete
            </Popconfirm>
          </Menu.Item>
        </Menu>
      );
    };
    return (
      <Dropdown overlay={renderMenus()}>
        <a className="ant-dropdown-link" style={{ color: 'white' }} href="#">
          <Icon type="ellipsis" />
        </a>
      </Dropdown>
    );
  }

  render() {
    const props = this.props;
    const { fetchProps } = props;
    const { data } = fetchProps;
    const _data = data || [];
    const { selectedRows } = this.state;
    const isOneRowSelected = selectedRows && selectedRows.length === 1;
    return (
      <ListWrapper {...this.props} isOneRowSelected={isOneRowSelected}>
        <div className="rca-gallery">
          {_data.map(item => {
            const { url, file, title, tags, objectId, desc, alt } = item;
            const imageUrl = file ? file.url : url;
            return (
              <Card
                key={objectId}
                hoverable
                className="rca-g-img-card"
                cover={<div className='rca-g-cover'>
                  <a onClick={() => this.setState({ showImagePreview: true, imagePreviewUrl: imageUrl, imagePreviewAlt: alt })}>
                    <img alt={alt} className='rca-g-img' src={imageUrl} width="600" height="400" />
                  </a>
                  {this.props.selectMode && <div className='rca-g-select' onClick={() =>
                    this.props.onSelectMedia({ url, file, objectId })
                  }>
                    <Checkbox
                      checked={
                        this.props.selectedMedia.includes(objectId)
                      }
                      disabled={false}
                      onChange={() =>
                        this.props.onSelectMedia({ url, file, objectId })
                      }
                    />
                  </div>}
                </div>
                }
                actions={[
                  <div className='rca-g-actions' key={'actions'}>
                    <a onClick={() => { this.props.onEditDoc(objectId); }} className='rca-g-editBtn'>
                      <Icon type="edit"/>
                    </a>
                    <Popconfirm
                      okType="danger"
                      title={'Are you sure delete this ?'}
                      onConfirm={() => this.props.fetchProps.deleteDoc(objectId)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Icon type="delete" className='rca-g-deleteBtn' />
                    </Popconfirm>
                  </div>]}
              >
                <Meta
                  title={title || ''}
                  description={`${desc || ''}\n ${tags ? tags.join(', ') : ''}`}
                />
              </Card>
            )
          })}
        </div>
        <Modal
          className="rca-g-modal"
          visible={this.state.showImagePreview}
          footer={null}
          onCancel={() => this.setState({ showImagePreview: false, imagePreviewUrl: null, imagePreviewAlt: null })}
        >
          <img
            alt={this.state.imagePreviewAlt}
            src={this.state.imagePreviewUrl}
            className="rca-g-img-in-modal"
          />
        </Modal>
      </ListWrapper>
    )
  }
}
