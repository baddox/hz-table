import React from 'react';
//import HzTableCell from '../HzTableCell';

export default class HzTableCell extends React.Component {
  render() {
    return this.props.column.renderer(this.props.cell.cellData, this.props.cell.parsedCellData);
  }
}

HzTableCell.propTypes = {
  cell: React.PropTypes.object.isRequired,
  column: React.PropTypes.object.isRequired,
};

