import React from 'react';
import HzTable from '../HzTable';

/*
  Component specific stylesheet
  Can also use .less, .scss, or plain .css files here
*/
require('./style.scss');

const rows = [
  {
    user: "Thomas Shaddox",
    balance: "$2,943.05",
    birthday: {displayValue: "Aug. 5, 1987", intervalValue: "1987-08-05"},
  },
  {
    user: "Marcus Shaddox",
    balance: "$-3",
    birthday: {displayValue: "May 16, 1989", intervalValue: "1989-05-16"},
  },
  {
    user: "Thomas Shaddox",
    balance: "$2,943.05",
    birthday: {displayValue: "Aug. 5, 1987", intervalValue: "1987-08-05"},
  },
  {
    user: "Thomas Shaddox",
    balance: "$2,943.05",
    birthday: {displayValue: "Aug. 5, 1987", intervalValue: "1987-08-05"},
  },
];

const columns = [
  {
    key: "user",
    displayName: "Name",
  },
  {
    key: "balance",
    displayName: "Balance",
    filterable: true,
  },
  {
    key: "birthday",
    displayName: "Born",
    filterable: false,
  },
];

export default class Application extends React.Component {
  render() {
    return (
      <div id="container">
        <h1>here's the table</h1>
        <div>
          <HzTable rows={rows} columns={columns} filterable={true} />
        </div>
      </div>
    );
  }
}
