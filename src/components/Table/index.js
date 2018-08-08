import React, { Component } from 'react';
import { Button, Input, Popconfirm, Table as TableWrapper } from 'antd';
import { buildQuery } from '../../utils/helpers';
const Search = Input.Search;
const ButtonGroup = Button.Group;
const rowKey = 'objectId';

export default class SortView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: [],
      searchText: ''
    };
    this.onChange = this.onChange.bind(this);
    this.convertPageFieldsToAntTableColumn = this.convertPageFieldsToAntTableColumn.bind(
      this
    );
    this.onPagination = this.onPagination.bind(this);
    this.onSelectRow = this.onSelectRow.bind(this);
    this.toggleRow = this.toggleRow.bind(this);
    this.renderRowButtons = this.renderRowButtons.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.isRowSelected = this.isRowSelected.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onClearSearch = this.onClearSearch.bind(this);
  }

  onPagination(page, pageSize) {
    this.props.onPagination(page, pageSize)
  }
  isRowSelected(row) {
    return this.state.selectedRows.indexOf(row[rowKey]) !== -1;
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
  renderRowButtons(row = {}) {
    const _this = this;
    // console.log('renderRowButton',{ object, props: this.props})
    const isSelected = this.isRowSelected(row);
    const hasDelete = this.props.fetchProps && this.props.fetchProps.deleteDoc // react-parse cloudcode missing deleteDoc
    return (
      <ButtonGroup style={{display: 'flex'}}>
        <Button
          icon="edit"
          onClick={() => this.props.onEditDoc(row.objectId)}
        />
        {hasDelete && <Popconfirm
          okType="danger"
          title={'Are you sure delete this ?'}
          onConfirm={() => this.props.fetchProps.deleteDoc(row.objectId)}
          okText="Yes"
          cancelText="No"
        >
          <Button icon="delete" />
        </Popconfirm>
        }
      </ButtonGroup>
    );
  }
  onSearchChange(key, value) {
    const { fields } = this.props;
    this.setState({[key]: value}, () => {
      const newQuery = buildQuery({ [key]: value, fields })
      this.props.onQueryChanged(newQuery)
    })
  }
  onClearSearch() {
    const { fields } = this.props;
    this.onSearchChange('searchText', '')
  }
  convertPageFieldsToAntTableColumn() {
    const { fields, fetchProps, extraData } = this.props;
    // const {data} = fetchProps
    const columns = [];
    fields.forEach(field => {
      columns.push({
        title: field.title,
        key: field.key,
        width: field.actionBtn ? 50 : field.width,
        render: object => {
          if (field.actionBtn /*field.key === rowKey && this.isRowSelected(object)*/) {
            return this.renderRowButtons(object);
          } else if (field.formatter) {
            return field.formatter(object[field.key], object, field, extraData);
          } else {
            return <p>{object[field.key]}</p>;
          }
        }
      });
    });
    return columns;
  }
  onSelectRow(selectedRows, toggleRow) {
    this.setState({ selectedRows });
  }

  toggleRow(row) {
    if(this.isRowSelected(row)) {
      const selectedRows = this.state.selectedRows.filter(item => item !== row.objectId)
      this.setState({selectedRows})
    } else{
      this.state.selectedRows.push(row.objectId)
      this.setState({selectedRows: this.state.selectedRows})
    }
  }
  onPageChange(page, pageSize) {
    const { onSkipChanged, limit } = this.props;
    onSkipChanged(page * limit);
  }
  showLoader(delay) {
    let _this = this;
    this.setState({ loading: true }, () => {
      this.loaderTimeOut = setTimeout(() => {
        _this.setState({ loading: false });
      }, delay);
    });
  }
  componentWillUnmount = () => {
    this.loaderTimeOut && clearTimeout(this.loaderTimeOut);
  };

  render() {
    const props = this.props;
    const { fetchProps, isLoading, onCreateNewDoc } = props;
    const { info, data, refresh } = fetchProps;
    const { selectedRows } = this.state;
    const rowSelection = {
      selectedRowKeys: selectedRows,
      onChange: this.onSelectRow
    };
    const numberOfRows = info ? info.count : 0;
    const isOneRowSelected = selectedRows && selectedRows.length === 1
    const hasDelete = this.props.fetchProps && this.props.fetchProps.deleteDoc // react-parse cloudcode missing deleteDoc
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
            {(isOneRowSelected && hasDelete) &&
            <Popconfirm

              okType="danger"
              title={'Are you sure delete this ?'}
              onConfirm={() => this.props.fetchProps.deleteDoc(selectedRows[0])}
              okText="Yes"
              cancelText="No"
            >
              <Button type="danger" className='mL15'>Delete</Button>
            </Popconfirm>
            }
            {isOneRowSelected &&
            <Button type="warning" onClick={() => this.props.onEditDoc(selectedRows[0])} className='mL15'>
              Edit
            </Button>
            }
            <Button type="primary" ghost onClick={onCreateNewDoc} className='mL15'>
              Add
            </Button>
          </div>
          <TableWrapper
            rowKey={rowKey}
            columns={this.convertPageFieldsToAntTableColumn()}
            onChange={this.onChange}
            dataSource={data || []}
            className="isoSortingTable"
            loading={isLoading}
            rowSelection={rowSelection}
            pagination={{
              showSizeChanger: true,
              onShowSizeChange: this.onPagination,
              onChange: this.onPagination,
              defaultCurrent: this.props.skip / this.props.limit || 1,
              total: numberOfRows || 0
            }}
          />
        </div>
      </div>
    );
  }
}
