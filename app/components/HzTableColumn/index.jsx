import React from 'react';
//import HzTableColumn from '../HzTableColumn';

// This is actually a th that goes in a tr of a thead
export default class HzTableColumn extends React.Component {
  render() {
    return (
      <th>
        <div>{this.props.column.displayName}</div>
        {this.renderFilter()}
      </th>
    );
  }

  renderFilter() {
    const tableFilterable = this.props.filterable;
    const columnFilterable = this.props.column.filterable === true;
    // If present, column.filterable overrides tableFilterable.
    const filterable = ("filterable" in this.props.column) ? columnFilterable : tableFilterable;

    return filterable ? <input type="text" onKeyUp={this.handleFilterChange}/> : null;
  }

  handleFilterChange(event) {
    this.props.onFilterChange(event.target.value);
  }
}

HzTableColumn.propTypes = {
  filterable: React.PropTypes.bool.isRequired,
}
