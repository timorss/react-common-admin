import React, { Component } from 'react';
import {
  Icon,
  Popconfirm,
  Checkbox,
  Menu,
  Dropdown,
  Modal,
} from 'antd';
import { buildQuery } from '../../utils/helpers';
import ListWrapper from '../ListWrapper';
import moment from 'moment';

export default class GalleryView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePreview: null,
      galleryWidth: 0
    };
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    this.handleResize();
    if (typeof window === 'object') {
      window.addEventListener('resize', this.handleResize);
    }
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

  componentWillUnmount () {
    if (typeof window === 'object') {
      window.removeEventListener('resize', this.handleResize);
    }
  };

  handleResize() {
    const element = document.getElementById('rca-gallery');
    const width = element && element.clientWidth;
    if (width) {
      this.setState({ galleryWidth: width });
    }
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
        <div className="rca-gallery" id="rca-gallery">
          {_data.map(item => {
            const { url, file, tags, objectId, desc } = item;
            const imageUrl = file ? file.url : url;
            if (!this.state.galleryWidth) return <div key={objectId} />;
            const galleryImgWidth = (this.state.galleryWidth - 65) / 3;
            const galleryImgHight = ((this.state.galleryWidth - 65) / 3) * 1.2;
            return (
              <div
                key={objectId}
                className="rca-g-img-container"
                style={{ width: galleryImgWidth }}
              >
                <div
                  className="rca-g-img-wrapper"
                  onClick={() => this.setState({ imagePreview: objectId })}
                >
                  <img
                    alt="#"
                    src={imageUrl}
                    className="rca-g-img"
                    style={{ width: '100%', height: galleryImgHight }}
                  />
                </div>
                <div className="rca-g-moreOption ant-btn ant-btn-primary ant-btn-circle ant-btn-lg ant-btn-icon-only">
                  {this.renderMenu(objectId)}
                </div>
                <div className="rca-g-footer">
                  <h3 className="rca-g-title">{item.title}</h3>
                  <p className="rca-g-desc">{desc}</p>
                  <p className="rca-g-tags">{tags ? tags.join(', ') : ''}</p>
                  <div className="rca-g-footer-bottom">
                    {this.props.selectMode && (
                      <div className="rca-g-select-img">
                        <Checkbox
                          checked={
                            this.props.selectedMedia.includes(objectId)
                          }
                          disabled={false}
                          onChange={() =>
                            this.props.onSelectMedia({ url, file, objectId })
                          }
                        />
                      </div>
                    )}
                    <p className="rca-g-date">
                      {' '}
                      {moment(item.createdAt).format('MMM Do, YYYY')}{' '}
                    </p>
                  </div>
                </div>
                <Modal
                  className="rca-g-modal"
                  visible={this.state.imagePreview === objectId}
                  footer={null}
                  onCancel={() => this.setState({ imagePreview: null })}
                >
                  <img
                    alt="example"
                    src={imageUrl}
                    className="rca-g-img-in-modal"
                  />
                </Modal>
              </div>
            );
          })}
        </div>
      </ListWrapper>
    );
  }
}
