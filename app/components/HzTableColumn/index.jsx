import React from 'react';
import HzTableSorter from '../HzTableSorter';
import HzTableUtils from '../HzTableUtils';

// This is actually a th that goes in a tr of a thead
export default class HzTableColumn extends React.Component {
  render() {
    return (
      <th>
        <div>{this.props.column.displayName}{this.renderSorter()}</div>
        {this.renderFilter()}
      </th>
    );
  }

  renderSorter() {
    return this.getOption("sortable") ? <HzTableSorter order={"asc"} onOrderChanged={this.props.onOrderChanged.bind(this, this.props.column)} /> : null;
  }

  renderFilter() {
    return this.getOption("filterable") ? <input type="text" onKeyUp={this.handleFilterChanged.bind(this)} /> : null;
  }

  getOption(key) {
    const tableOption = this.props[key];
    const columnOption = this.props.column[key] === true;
    // If present, column option overrides table option.
    const hasOption = (key in this.props.column) ? columnOption : tableOption;
    return hasOption;
  }

  handleFilterChanged(event) {
    const filterFunc = HzTableUtils.generateFilterFunc(event.target.value);
    console.log("filter", event.target.value, filterFunc);
    this.props.onFilterChanged(this.props.column, filterFunc);
  }
}

HzTableColumn.propTypes = {
  filterable: React.PropTypes.bool.isRequired,
  sortable: React.PropTypes.bool.isRequired,
  onOrderChanged: React.PropTypes.func.isRequired,
  onFilterChanged: React.PropTypes.func.isRequired,
};
