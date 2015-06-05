import React from 'react';
import HzTableUtils from './HzTableUtils';

const UP_OFF = '△';
const UP_ON = '▲';
const DOWN_OFF = '▽';
const DOWN_ON = '▼';

const ORDERS = [
  "asc",
  "desc",
  undefined,
];

export default class HzTableSorter extends React.Component {
  render() {
    let symbols;

    if (this.props.sortOrder === "asc") {
      symbols = UP_ON + DOWN_OFF;
    } else if (this.props.sortOrder === "desc") {
      symbols = UP_OFF + DOWN_ON;
    } else {
      symbols = UP_OFF + DOWN_OFF;
    }
    
    const styles = {
      color: "black",
      textDecoration: "none",
      fontSize: "11px",
      marginLeft: "1em",
      position: "relative",
      top: "-2px",
      padding: "1px 3px",
    };

    return (
      <a href="#" onClick={this.handleChange.bind(this)} style={styles}>{symbols}</a>
    );
  }

  handleChange(event) {
    event.preventDefault();
    
    const i = ORDERS.indexOf(this.props.sortOrder);
    const newOrder = ORDERS[(i + 1) % ORDERS.length];

    this.props.onOrderChanged(newOrder);
  }
}

HzTableSorter.propTypes = {
  sortOrder: React.PropTypes.oneOf(ORDERS),
  onOrderChanged: React.PropTypes.func.isRequired,
};

// △▽▲▼
