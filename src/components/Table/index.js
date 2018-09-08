import React, { Component } from 'react';
import { Button, Popconfirm, Table as TableWrapper } from 'antd';
import ListWrapper from '../ListWrapper'
const ButtonGroup = Button.Group;
const rowKey = 'objectId';
const cursorMove = {cursor: 'move'};

class TableView extends Component {
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
    this.renderRowButtons = this.renderRowButtons.bind(this);
    this.isRowSelected = this.isRowSelected.bind(this);
  }

  isRowSelected(row) {
    return this.state.selectedRows.includes(row[rowKey]);
  }

  renderRowButtons(row = {}) {
    const hasDelete = !this.props.disabledDelete && this.props.fetchProps && this.props.fetchProps.deleteDoc // react-parse cloudcode missing deleteDoc
    return (
      <ButtonGroup style={{display: 'flex'}}>
        {this.props.draggableTable &&
          <Button style={cursorMove} className='ant-btn-icon-only'>
            <i className="fa fa-arrows-alt paddingHorizontal2" />
          </Button>
        }
        <Button
          icon="edit"
          onClick={() => {
            if(this.props.customOnEdit) {
              this.props.customOnEdit(row.objectId, this.props)
            }else{
              this.props.onEditDoc(row.objectId)
            }
          }}
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

  onSelectRow(selectedRows) {
    this.setState({ selectedRows });
  }

  render() {
    const props = this.props;
    const { showPagination, showHeader, fetchProps, draggableTable, draggableTableData, onRow, components, onViewRef, onRefresh } = props;
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
      <ListWrapper
        {...this.props}
        isOneRowSelected={isOneRowSelected}
        selectedRows={selectedRows}
        showPagination={showPagination}
        showHeader={showHeader}
        ref={onViewRef}
        onRefresh={onRefresh}
      >
        <TableWrapper
          rowKey={rowKey}
          columns={this.convertPageFieldsToAntTableColumn()}
          onChange={this.onChange}
          dataSource={draggableTable ? draggableTableData : data || []}
          className="rca-table"
          loading={false}
          rowSelection={rowSelection}
          pagination={false}
          onRow={onRow}
          components={components}
        />
      </ListWrapper>
    );
  }
}

TableView.defaultProps = {
  showPagination: true,
  showHeader: true
}
export default TableView;
