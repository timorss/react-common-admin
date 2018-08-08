import React from 'react';
import PropTypes from 'prop-types';
import { FetchCollection, FetchCloudCode } from 'react-parse'

class Collection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: this.props.query,
      limit: this.props.limit,
      skip: this.props.skip,
      order: this.props.order
    }
    this.onQueryChanged = this.onQueryChanged.bind(this);
    this.onLimitChanged = this.onLimitChanged.bind(this);
    this.onSkipChanged = this.onSkipChanged.bind(this);
    this.onOrderChanged = this.onOrderChanged.bind(this);
    this.onPagination = this.onPagination.bind(this);
    this.getLimit = this.getLimit.bind(this);
    this.getSkip = this.getSkip.bind(this);
    this.getOrder = this.getOrder.bind(this);
  }

  onPagination(page, size) {
    if(this.props.onPagination) {
      this.props.onPagination(page, size)
    } else{
      this.setState({
        skip: (page - 1) * size,
        limit: size
      })
    }
  }
  onLimitChanged(limit) {
    if(this.props.onLimitChanged) {
      this.props.onLimitChanged(limit)
    } else{
      this.setState({ limit })
    }
  }

  onQueryChanged(query) {
    if(this.props.onQueryChanged) {
      this.props.onQueryChanged(query)
    } else{
      this.setState({ query })
    }
  }

  onSkipChanged(skip) {
    if(this.props.onQueryChanged) {
      this.props.onSkipChanged(skip)
    } else{
      this.setState({ skip })
    }
  }

  onOrderChanged(order) {
    if(this.props.onQueryChanged) {
      this.props.onOrderChanged(order)
    } else{
      this.setState({ order })
    }
  }

  getLimit() {
    const {onLimitChanged, limit} = this.props
    if(onLimitChanged) return limit
    return this.state.limit
  }

  getSkip() {
    const {onSkipChanged, skip} = this.props
    if(onSkipChanged) return skip
    return this.state.skip
  }

  getOrder() {
    const {onOrderChanged, order} = this.props
    if(onOrderChanged) return order
    return this.state.order
  }

  getQuery() {
    const {onQueryChanged, query} = this.props
    if(onQueryChanged) return query
    return this.state.query
  }


  render() {
    const { targetName, schemaName, query, leaveClean, viewComponent, onClose, extraData, onCreateNewDoc, onEditDoc, fields, keys, include, functionName, dataHandler, ...resProps } = this.props
    const props = {
      ...resProps,
      key: targetName,
      targetName,
      keys: keys,
      include: include,
      leaveClean: true,
      enableCount: true,
      // Call backs
      // Info that will pass to viewComponent
      // -- Method to close modal
      onClose: onClose, // Method to close modal,
      onCreateNewDoc: onCreateNewDoc,
      onEditDoc: onEditDoc,
      // -- fields to render
      fields: fields,
      limit: this.getLimit(),
      skip: this.getSkip(),
      order: this.getOrder(),
      onQueryChanged: this.onQueryChanged,
      onLimitChanged: this.onLimitChanged,
      onSkipChanged: this.onSkipChanged,
      onOrderChanged: this.onOrderChanged,
      onPagination: this.onPagination,
      extraData: extraData,
      component: viewComponent,
    }
    if(functionName) {
      return (
        <FetchCloudCode
          functionName={functionName}
          params={this.getQuery()}
          dataHandler={dataHandler}
          {...props}
        />
      )
    }
    return (
      <FetchCollection
        schemaName={schemaName}
        query={this.getQuery()}
        {...props}
      />
    );
  }
}

export default Collection
Collection.propTypes = {
  onCreateNewDoc: PropTypes.func,
  onEditDoc: PropTypes.func,
  viewComponent: PropTypes.element, // if Empty we use Table
  fields: PropTypes.array, // [{ label: 'User name', key: 'username', search: true }...]
  enabledMultiSelect: PropTypes.bool,
  query: PropTypes.object,
  limit: PropTypes.number,
  skip: PropTypes.number,
  order: PropTypes.string,
  onQueryChanged: PropTypes.func,
  onSkipChanged: PropTypes.func,
  onLimitChanged: PropTypes.func
};

Collection.defaultProps = {
  wrapperType: 'sideDoc',
  enabledMultiSelect: true,
  query: {},
  limit: 10,
  skip: 0,
  order: 'createdAt'
};
