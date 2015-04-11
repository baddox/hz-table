import React from 'react';
//import HzTableCell from '../HzTableCell';

export default class HzTableCell extends React.Component {
  render() {
    return (
      <td>
        {this.getCell().displayValue}
      </td>
    );
  }

  getCell() {
    if (typeof this.props.cell === "object") {
      return this.props.cell;
    } else {
      const value = this.props.cell.toString();
      return {
        displayValue: value,
        value: value,
      };
    }
  }
}
