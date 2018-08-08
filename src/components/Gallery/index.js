import React, { Component } from 'react';
import { Button, Icon, Input, Popconfirm, Checkbox, Menu, Dropdown, Modal, Pagination } from 'antd';
import { buildQuery } from '../../utils/helpers';
import moment from 'moment'

const Search = Input.Search;
const ButtonGroup = Button.Group;
const rowKey = 'objectId';

export default class GalleryView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      imagePreview: null,
      galleryWidth: 0
    };
    this.onChange = this.onChange.bind(this);
    this.onPagination = this.onPagination.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onClearSearch = this.onClearSearch.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    this.handleResize()
    if(typeof window === 'object') {
      window.addEventListener('resize', this.handleResize)
    }
  }

  onChange(pagination, filters, sorter) {
    const { dataList } = this.props;
    if (sorter && sorter.columnKey && sorter.order) {
      if (sorter.order === 'ascend') {
        dataList.getSortAsc(sorter.columnKey);
      } else {
        dataList.getSortDesc(sorter.columnKey);
      }
      this.setState({ dataList: dataList.getAll() });
    }
  }

  onPagination(page, pageSize) {
    this.props.onPagination(page, pageSize)
  }

  renderMenu(objectId) {
    const renderMenus = () => {
      return (
        <Menu>
          <Menu.Item key="edit" onClick={() => { this.props.onEditDoc(objectId) }}>
            <Icon type="edit" />{' '}Edit
          </Menu.Item>
          <Menu.Item key="remove">
            <Popconfirm
              okType="danger"
              title={'Are you sure delete this ?'}
              onConfirm={() => this.props.fetchProps.deleteDoc(objectId)}
              okText="Yes"
              cancelText="No"
            >
              <Icon type="delete" />{' '}Edit
            </Popconfirm>
          </Menu.Item>
        </Menu>
      )
    }
    return <Dropdown overlay={renderMenus()}>
      <a className="ant-dropdown-link" style={{color: '#6f8826'}} href="#"><Icon type="ellipsis" /></a></Dropdown>
  }

  onSearchChange(key, value) {
    const { fields } = this.props;
    this.setState({[key]: value}, () => {
      const newQuery = buildQuery({ [key]: value, fields })
      this.props.onQueryChanged(newQuery)
    })
  }

  onClearSearch() {
    this.onSearchChange('searchText', '')
  }

  onPageChange(page, pageSize) {
    const { onSkipChanged, limit } = this.props;
    onSkipChanged(page * limit);
  }

  componentWillUnmount = () => {
    if(typeof window === 'object') {
      window.removeEventListener('resize', this.handleResize)
    }
  };

  handleResize () {
    const elment = document.getElementById('rca-gallery')
    const width = elment && elment.clientWidth;
    if(width) { this.setState({ galleryWidth: width }) }
  };

  render() {
    const props = this.props;
    const { fetchProps, isLoading, limit, onCreateNewDoc } = props;
    const { info, data, refresh } = fetchProps;
    const _data = data || []
    const { selectedRows } = this.state;
    const numberOfRows = info ? info.count : 0;
    const isOneRowSelected = selectedRows && selectedRows.length === 1
    return (
      <div>
        <div className="genericTable">
          <div className={'genericTableHeaderBtn'}>
            <div className={'gLSearchWrapper'}>
              <Search
                className={'searchInput'}
                placeholder="input search text"
                onChange={e =>
                  this.onSearchChange('searchText', e.target.value)
                }
                value={this.state.searchText}
              />
              <Button type="secondary" onClick={this.onClearSearch}>
                clear
              </Button>
            </div>
            <Button type="secondary"
              className='mL15'
              loading={isLoading || this.state.loading}
              onClick={() => {
                this.showLoader(1000);
                refresh();
              }}
            >
              Refresh
            </Button>
            {isOneRowSelected &&
            <Popconfirm

              okType="danger"
              title={'Are you sure delete this ?'}
              onConfirm={() => { console.log(this.props) } } //;this.props.fetchProps.deleteDoc(selectedRows[0].objectId)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="danger" className='mL15'>Delete</Button>
            </Popconfirm>
            }
            {isOneRowSelected &&
            <Button type="warning" onClick={() => this.props.onEditDoc(selectedRows[0].objectId)} className='mL15'>
              Edit
            </Button>
            }
            <Button type="primary" ghost onClick={onCreateNewDoc} className='mL15'>
              Create
            </Button>
          </div>
          <div className='rca-gallery' id='rca-gallery'>
            {
              _data.map(item => {
                const {url, file, tags, objectId, desc} = item;
                const imageUrl = file ? file.url : url
                if(!this.state.galleryWidth) return <div key={objectId} />
                const galleryImgWidth = (this.state.galleryWidth - 65) / 3;
                const galleryImgHight = (this.state.galleryWidth - 65) / 3 * 1.2;
                return (
                  <div key={objectId} className='rca-g-img-container' style={{width: galleryImgWidth}}>
                    <div className="rca-g-img-wrapper" onClick={() => this.setState({ imagePreview: objectId })}>
                      <img alt="#" src={imageUrl} className='rca-g-img' style={{width: '100%', height: galleryImgHight}} />
                    </div>
                    <div className="rca-g-moreOption">
                      {this.renderMenu(objectId)}
                    </div>
                    <div className="rca-g-footer">
                      <h3 className="rca-g-title">{item.title}</h3>
                      <p className="rca-g-desc">{desc}</p>
                      <p className="rca-g-tags">{tags ? tags.join(', ') : ''}</p>
                      <div className='rca-g-footer-bottom'>
                        {this.props.selectMode && <div className='rca-g-select-img'>
                          <Checkbox
                            checked={this.props.selectedMedia.indexOf(objectId) > -1}
                            disabled={false}
                            onChange={() => this.props.onSelectMedia({ url, file, objectId })}
                          />
                        </div>}
                        <p className="rca-g-date"> {moment(item.createdAt).format('MMM Do, YYYY')} </p>
                      </div>
                    </div>
                    <Modal className='rca-g-modal' visible={this.state.imagePreview === objectId} footer={null} onCancel={() => this.setState({ imagePreview: null })}>
                      <img alt="example" src={imageUrl} className='rca-g-img-in-modal' />
                    </Modal>
                  </div>
                )
              })
            }
          </div>
        </div>
        <Pagination
          style={{textAlign: 'right'}}
          showSizeChanger
          onShowSizeChange={this.onPagination}
          onChange={this.onPagination}
          defaultCurrent={this.props.skip / this.props.limit || 1}
          total={numberOfRows || 0}
        />
      </div>
    );
  }
}
