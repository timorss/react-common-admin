import React, { Component } from 'react';
import { Button, Popconfirm, Table as TableWrapper } from 'antd';
import ListWrapper from '../ListWrapper'
const ButtonGroup = Button.Group;
const rowKey = 'objectId';

export default class SortView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: [],
      searchText: ''
    };
    this.convertPageFieldsToAntTableColumn = this.convertPageFieldsToAntTableColumn.bind(
      this
    );
    this.onSelectRow = this.onSelectRow.bind(this);
    this.toggleRow = this.toggleRow.bind(this);
    this.renderRowButtons = this.renderRowButtons.bind(this);
    this.isRowSelected = this.isRowSelected.bind(this);
  }

  isRowSelected(row) {
    return this.state.selectedRows.includes(row[rowKey]);
  }

  renderRowButtons(row = {}) {
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

  convertPageFieldsToAntTableColumn() {
    const { fields, extraData } = this.props;
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

  render() {
    const props = this.props;
    const { fetchProps } = props;
    const { data } = fetchProps;
    const isLoading = props.isLoading || fetchProps.isLoading
    const { selectedRows } = this.state;
    const rowSelection = {
      selectedRowKeys: selectedRows,
      onChange: this.onSelectRow
    };
    // const numberOfRows = info ? info.count : 0;
    const isOneRowSelected = selectedRows && selectedRows.length === 1
    return (
      <ListWrapper {...this.props} isOneRowSelected={isOneRowSelected}>
        <TableWrapper
          rowKey={rowKey}
          columns={this.convertPageFieldsToAntTableColumn()}
          onChange={this.onChange}
          dataSource={data || []}
          className="rca-table"
          loading={false}
          rowSelection={rowSelection}
          pagination={false}
        />
      </ListWrapper>
    );
  }
}
