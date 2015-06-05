import React from 'react';
import HzTableSorter from './HzTableSorter';
import HzTableUtils from './HzTableUtils';

// This is actually a th that goes in a tr of a thead
export default class HzTableColumn extends React.Component {
  componentDidMount() {
    if (this.props.column.column.defaultSort) {
      this.props.onOrderChanged(this.props.column.column.key, this.props.column.column.defaultSort);
    }
    if (this.props.column.column.defaultFilter) {
      const filter = HzTableUtils.generateFilter(this.props.column.column.defaultFilter);
      this.props.onFilterChanged(this.props.column.column.key, filter);
    }
  }
  
  render() {
    return (
      <th>
        <div>{this.props.column.column.displayName}{this.renderSorter()}</div>
        {this.renderFilter()}
      </th>
    );
  }

  renderSorter() {
    const sortOrder = (typeof this.props.sortOrder === "string") ? this.props.sortOrder : this.props.column.column.defaultSortOrder;
    return this.getOption("sortable") ? <HzTableSorter sortOrder={sortOrder} onOrderChanged={this.props.onOrderChanged.bind(this, this.props.column.column.key)} /> : null;
  }

  renderFilter() {
    return this.getOption("filterable") ? <input type="text" onKeyUp={this.handleFilterChanged.bind(this)} defaultValue={this.props.column.column.defaultFilter}/> : null;
  }

  getOption(key) {
    const tableOption = this.props[key];
    const columnOption = this.props.column.column[key] === true;
    // If present, column option overrides table option.
    const hasOption = (key in this.props.column.column) ? columnOption : tableOption;
    return hasOption;
  }

  handleFilterChanged(event) {
    const filter = HzTableUtils.generateFilter(event.target.value);
    this.props.onFilterChanged(this.props.column.column.key, filter);
  }
}

HzTableColumn.propTypes = {
  filterable: React.PropTypes.bool.isRequired,
  sortable: React.PropTypes.bool.isRequired,
  sortOrder: React.PropTypes.string,
  onOrderChanged: React.PropTypes.func.isRequired,
  onFilterChanged: React.PropTypes.func.isRequired,
};
