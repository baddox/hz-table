import React from 'react';

import HzTableRow from './HzTableRow';
import HzTableColumn from './HzTableColumn';

import HzTableParser from './HzTableParser';
import HzTableUtils from './HzTableUtils';

export default class HzTable extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      sortOrders: {}, // columnKey: "asc" or "desc". Right now, only supporting one column sort at a time!
      filters: {}, // columnKey: {operator: op, query: string}, op is undefined or "<" or ">"
    };

    this.parseRows();
  }

  componentWillReceiveProps(nextProps) {
    this.parseRows();
  }

  parseRows() {
    this.parsedColumns = HzTableParser.parseColumns(this.props.columns, this.props.widgets);
    this.parsedColumnsByKey = HzTableParser.groupByKey(this.parsedColumns);
    this.parsedRows = HzTableParser.parseRows(this.props.rows, this.parsedColumns);
  }
  
  prepareRows() {
    // "Prepared rows" are ready to be displayed. The only thing that needs to be done is slicing (for pagination).
    this.preparedRows = this.parsedRows;

    this.preparedRows = HzTableUtils.filterRows(this.preparedRows, this.parsedColumnsByKey, this.state.filters);
    this.preparedRows = HzTableUtils.sortRows(this.preparedRows, this.parsedColumnsByKey, this.state.sortOrders);

    HzTableParser.addSortOrdersToParsedColumns(this.parsedColumns, this.state.sortOrders);
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
    const ths = this.parsedColumns.map((column, index) => {
      return (
        <HzTableColumn
        column={column}
        filterable={this.props.filterable}
        sortable={this.props.sortable}
        sortOrder={column.sortOrder}
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
        columns={this.parsedColumns}
        key={index}
        />
      );
    });
  }

  handleOrderChanged(columnKey, order) {
    if (order) {
      this.setState({sortOrders: {[columnKey]: order}});
    } else {
      this.setState({sortOrders: {}});
    }
  }
  
  handleFilterChanged(columnKey, filter) {
    const filters = this.state.filters;

    if (filter) {
      filters[columnKey] = filter;
    } else {
      delete filters[columnKey];
    }
    
    this.setState({filters: filters});
  }
}

HzTable.propTypes = {
  rows: React.PropTypes.array.isRequired,
  columns: React.PropTypes.array.isRequired,
  
  filterable: React.PropTypes.bool.isRequired,
  sortable: React.PropTypes.bool.isRequired,
  
  widgets: React.PropTypes.object,
};

HzTable.defaultProps = {
  filterable: true,
  sortable: true,
  
  widgets: {}, // widgetString: Widget
};
