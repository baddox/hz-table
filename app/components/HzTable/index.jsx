import React from 'react';
import HzTableRow from '../HzTableRow';
import HzTableParser from '../HzTableParser';
import HzTableColumn from '../HzTableColumn';

export default class HzTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {test: true};
    
    this.setRows();
  }

  componentWillReceiveProps(nextProps) {
    this.setRows();
  }

  setRows() {
    this.rows = HzTableParser.parseRows(this.props.rows);
  }

  render() {
    return (
      <table className="pure-table">
        {this.renderThead()}
        {this.renderTbody()}
      </table>
    );
  }

  renderThead() {
    const ths = this.props.columns.map((column) => {
      return <HzTableColumn column={column} filterable={this.props.filterable} />
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
    return this.rows.map((row) => {
      return <HzTableRow row={row} columns={this.props.columns} />
    });
  }
}

HzTable.propTypes = {
  rows: React.PropTypes.array.isRequired,
  columns: React.PropTypes.array,
  filterable: React.PropTypes.bool,
};

HzTable.defaultProps = {
  filterable: false,
};
