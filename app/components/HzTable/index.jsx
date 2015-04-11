import React from 'react';

import HzTableRow from '../HzTableRow';
import HzTableColumn from '../HzTableColumn';

import HzTableParser from '../HzTableParser';
import HzTableUtils from '../HzTableUtils';

export default class HzTable extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      sortFuncs: {}, // columnKey: function(cellA, cellB) {return int}
      filterFuncs: {}, // columnKey: function(cell) {return includeThisRow}
    };

    this.parseRows();
  }

  componentWillReceiveProps(nextProps) {
    this.parseRows();
  }

  parseRows() {
    this.parsedRows = HzTableParser.parseRows(this.props.rows);
  }
  
  prepareRows() {
    // "Prepared rows" are ready to be displayed. The only thing that needs to be done is slicing (for pagination).
    this.preparedRows = this.parsedRows;

    // columns are mutable, and HzTableColumn will set filterFunc and sortFunc on them.
    // This is probably the wrong way to do it. Maybe state in this component should maintain hashes
    // of columnKey: sortFunc and columnKey: filterFunc.
    this.preparedRows = HzTableUtils.filterRows(this.preparedRows, this.state.filterFuncs);
    this.preparedRows = HzTableUtils.sortRows(this.preparedRows, this.state.sortFuncs);
  }

  render() {
    this.prepareRows();
    
    return (
      <table className="pure-table">
        {this.renderThead()}
        {this.renderTbody()}
      </table>
    );
  }

  renderThead() {
    const ths = this.props.columns.map((column, index) => {
      return (
        <HzTableColumn
        column={column}
        filterable={this.props.filterable}
        sortable={this.props.sortable}
        key={index}
        onOrderChanged={this.handleOrderChanged.bind(this)}
        onFilterChanged={this.handleFilterChanged.bind(this)}
        />
      );
    });

    return (
      <thead>
        <tr>
          {ths}
        </tr>
      </thead>
    );
  }
  
  renderTbody() {
    return (
      <tbody>
        {this.renderRows()}
      </tbody>
    );
  }
  
  renderRows() {
    return this.preparedRows.map((row, index) => {
      return (
        <HzTableRow
        row={row}
        columns={this.props.columns}
        key={index}
        />
      );
    });
  }

  handleOrderChanged(column, sortFunc) {
    console.log("order", column);

    const sortFuncs = this.state.sortFuncs;
    sortFuncs[column.key] = sortFunc;
    
    this.setState({sortFuncs: sortFuncs});
  }
  
  handleFilterChanged(column, filterFunc) {
    const filterFuncs = this.state.filterFuncs;

    if (filterFunc) {
      filterFuncs[column.key] = filterFunc;
    } else {
      delete filterFuncs[column.key];
    }
    
    this.setState({filterFuncs: filterFuncs});
  }
}

HzTable.propTypes = {
  rows: React.PropTypes.array.isRequired,
  columns: React.PropTypes.array.isRequired,
  filterable: React.PropTypes.bool.isRequired,
  sortable: React.PropTypes.bool.isRequired,
};

HzTable.defaultProps = {
  filterable: true,
  sortable: true,
};
