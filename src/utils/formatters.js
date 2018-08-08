import React from 'react'
import moment from 'moment'
import {selectOptionsFromExtraData, findValueInOption} from './helpers'

export const typeFormatter = function (cell, row) {
  // const _queryData = this.props.objects.queries.booking_ProductType

  // if (_queryData) {
  //   let _data = _queryData.data.results || []
  //   let t = _data.find(p => p.code === cell)
  //   if (t) {
  //     return t.type
  //   }
  // }
  return ''
}

export const tierFormatter = function(cell, row) {
  if (row.memberId && row.memberId.tier) {
    return <span className='label' style={{ backgroundColor: row.memberId.tier.color }}>{row.memberId.tier.name}</span>
  }
}

export const dateFormatter = function (cell, row) {
  if (cell && cell.iso) {
    return moment(cell.iso).local().format('DD MMM YYYY HH:mm')
  }
}
export const pointerForamtter = function (cell, row, field, extraData) {
  const options = selectOptionsFromExtraData({pointerTo: field.pointerTo, type: 'pointer'}, extraData)
  const value = findValueInOption(row[field.key], options)
  return (value && value[field.labelKey]) || (value && value.objectId)
}

export const dateTimeZoneFormatter = function(cell, row) {
  if (cell) {
    const date = moment(cell.iso)
    if (row.timeZone) {
      date.tz(row.timeZone)
    }
    return date.format('DD MMM YYYY HH:mm')
  }
}

export const partnerFormatter = function (cell, row) {
  return cell ? cell.name : ''
}

export const arrayFormatter = function (cell, row) {
  return <span title={cell} >{cell.join()}</span>
}

export const titleFormatter = function(cell, row) {
  if (cell) {
    return <div>{cell}</div>
  }
}

// edit row formatter with icons
export const editFormatter = function(cell, row) {
  return (<div style={{ textAlign: 'center', padding: '10px' }}>

    <i onClick={() => alert('things')} className="zmdi zmdi-settings zmdi-hc-lg icon-alert" />

  </div>

  )
}
