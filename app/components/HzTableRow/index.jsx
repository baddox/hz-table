import React from 'react';
import HzTableCell from '../HzTableCell';

export default class HzTableRow extends React.Component {
  render() {
    return (
      <tr>
        {this.renderCells()}
      </tr>
    );
  }

  renderCells() {
    return this.props.columns.map((parsedColumn, index) => {
      const cell = this.props.row[parsedColumn.column.key];
      return <HzTableCell cell={cell} column={parsedColumn} key={index} />;
    });
  }
}

HzTableRow.propTypes = {
  row: React.PropTypes.object.isRequired,
  columns: React.PropTypes.array.isRequired,
};
