import React, { Component } from 'react';
import {
  Button,
  Icon,
  Input,
  Popconfirm,
  Menu,
  Dropdown,
  Pagination,
  Spin
} from 'antd';

import { buildQuery, isEmptyString } from '../../utils/helpers';

const Search = Input.Search;

class ListWrapper extends Component {
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
    this.renderAddBtn = this.renderAddBtn.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.renderDeleteButton = this.renderDeleteButton.bind(this);
    this.renderSearch = this.renderSearch.bind(this);
    this.onInputSearch = this.onInputSearch.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  onRefresh() {
    const { fetchProps, onRefresh } = this.props;
    fetchProps.refresh();
    if(onRefresh) {
      onRefresh()
    }
  }

  renderSearch() {
    return (
      <div className={'rca-listWrapper-search'}>
        <Search
          className={'rca-listWrapper-searchInput'}
          placeholder="input search text"
          onChange={this.onInputSearch}
          value={this.state.searchText}
        />
        <Button type="secondary" onClick={this.onClearSearch}>clear</Button>
      </div>
    )
  }

  renderDeleteButton() {
    return (
      <Popconfirm
        okType="danger"
        title={'Are you sure delete this ?'}
        onConfirm={this.onDelete}
        okText="Yes"
        cancelText="No"
      >
        <Button type="danger" className="rca-mL15">Delete</Button>
      </Popconfirm>
    )
  }

  renderAddBtn() {
    const { onCreateNewDoc, renderAddBtn } = this.props;
    if (renderAddBtn) {
      return renderAddBtn(this.props);
    } else {
      return (
        <Button type="primary" ghost onClick={onCreateNewDoc} className="mL15">
          Add
        </Button>
      );
    }
  }

  renderPagination() {
    const props = this.props;
    const { fetchProps } = props;
    const { info } = fetchProps;
    const numberOfRows = info ? info.count : 0;
    if(numberOfRows <= this.props.limit) return null;
    return (
      <Pagination
        style={{ textAlign: 'right' }}
        showSizeChanger
        onShowSizeChange={this.onPagination}
        onChange={this.onPagination}
        defaultCurrent={this.props.skip / this.props.limit || 1}
        total={numberOfRows || 0}
      />
    )
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
              <Icon type="delete" /> Edit
            </Popconfirm>
          </Menu.Item>
        </Menu>
      );
    };
    return (
      <Dropdown overlay={renderMenus()}>
        <a className="ant-dropdown-link" style={{ color: '#6f8826' }} href="#">
          <Icon type="ellipsis" />
        </a>
      </Dropdown>
    );
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
    this.props.onPagination(page, pageSize);
  }

  onSearchChange(key, value) {
    const { fields } = this.props;
    this.setState({ [key]: value }, () => {
      const newQuery = buildQuery({ [key]: value, fields });
      this.props.onQueryChanged(newQuery);
    });
  }

  onClearSearch() {
    this.onSearchChange('searchText', '');
  }

  onPageChange(page, pageSize) {
    const { onSkipChanged, limit } = this.props;
    onSkipChanged(page * limit);
  }

  onEdit() {
    const rowId = this.props.selectedRows[0]
    if(this.props.customOnEdit) {
      this.props.customOnEdit(rowId, this.props)
    }else{
      this.props.onEditDoc(rowId)
    }
  }

  onDelete() {
    this.props.fetchProps.deleteDoc(this.props.selectedRows[0])
  }

  onInputSearch(e) {
    this.onSearchChange('searchText', e.target.value)
  }

  render() {
    const { fetchProps, isOneRowSelected, showPagination, showHeader, subTitle } = this.props;
    const isLoading = this.props.isLoading || fetchProps.isLoading;
    const hasSubTitle = isEmptyString(subTitle)
    return (
      <div className="rca-listWrapper-Screen">
        <div className="rca-listWrapper-Screen-Content">
          {(isLoading && showHeader) && <Spin className="rca-listWrapper-loader"/>}
          {showHeader && <div className={'rca-listWrapper-header'}>
            {this.renderSearch()}
            <div className="rca-listWrapper-actions">
              <Button type="secondary" className="rca-mL15" onClick={this.onRefresh} >Refresh</Button>
              {isOneRowSelected && this.renderDeleteButton()}
              {isOneRowSelected && <Button type="warning" onClick={this.onEdit} className="rca-mL15" >Edit</Button>}
              {this.renderAddBtn()}
            </div>
          </div>
          }
          {hasSubTitle && <h3>{subTitle}</h3>}
          <div className='rca-listWrapper-body'>
            {this.props.children}
          </div>
          {showPagination && this.renderPagination()}
        </div>
      </div>
    );
  }
}

ListWrapper.defaultProps = {
  showPagination: true,
  showHeader: true,
  onEditDoc: () => console.log('ListWrapper - missing onEditDoc')
}
export default ListWrapper;
