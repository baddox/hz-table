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
    return this.props.columns.map((column, i) => {
      const cell = this.props.row[column.key];
      return <HzTableCell cell={cell} column={column} />;
    });
  }
}
