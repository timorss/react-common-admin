import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {DragableBodyRow} from './DragBodyRow';
import Table from '../Table'

class DraggableTable extends React.Component {
  constructor(props) {
    super(props)
    this.getSortData = this.getSortData.bind(this)
  }

  components = {
    body: {
      row: DragableBodyRow,
    },
  }

  moveRow = (dragRow, hoverRow, group, groupBy) => {
    const {orderKey} = this.props;
    const dragRowNewData = {[orderKey]: hoverRow[orderKey]}
    const hoverRowNewData = {[orderKey]: dragRow[orderKey]}
    if(groupBy && dragRow[groupBy] !== hoverRow[groupBy]) {
      dragRowNewData[groupBy] = hoverRow[groupBy]
      dragRowNewData[orderKey] = this.getSortData(hoverRow[groupBy]).length
      this.props.fetchProps.put(dragRow.objectId, dragRowNewData)
    }else{
      this.props.fetchProps.put(dragRow.objectId, dragRowNewData)
      this.props.fetchProps.put(hoverRow.objectId, hoverRowNewData)
    }
  }

  getSortData(group) {
    const {fetchProps, orderKey, groupBy} = this.props;
    const data = fetchProps ? fetchProps.data || [] : []
    if(group) {
      return [...data].filter(item => item[groupBy] === group).sort((a, b) => a[orderKey] > b[orderKey])
    }
    return [...data].sort((a, b) => a[orderKey] > b[orderKey])
  }

  render() {
    const {groups, groupBy} = this.props;
    if(groups) {
      return groups.map((group, index) => {
        const data = this.getSortData(group)
        if(data.length) {
          return (
            <Table
              subTitle={group}
              key={group}
              showHeader={index === 0}
              showPagination={index === (groups.length - 1)}
              draggableTable
              draggableTableData={data}
              components={this.components}
              onRow={(index) => ({
                index,
                moveRow: (dragRow, hoverRow) => this.moveRow(dragRow, hoverRow, group, groupBy),
              })}
              {...this.props}
            />
          ) } else{
          return <p>{group} is Empty</p>
        }
      })
    }
    return (
      <Table
        draggableTable
        draggableTableData={this.getSortData()}
        components={this.components}
        onRow={(index) => ({
          index,
          moveRow: this.moveRow,
        })}
        {...this.props}
      />
    );
  }
}

const Demo = DragDropContext(HTML5Backend)(DraggableTable);

Demo.defaultProps = {
  orderKey: 'index'
}
export default Demo;
