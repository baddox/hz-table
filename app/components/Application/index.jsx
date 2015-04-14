require("babel/register");

import React from 'react';
import HzTable from '../HzTable';

/*
  Component specific stylesheet
  Can also use .less, .scss, or plain .css files here
*/
require('./style.scss');

const rows = [
  {
    user: "Imangry Akbar",
    balance: "$-3",
  },
  {
    user: "Judas Gomilaraptor",
    balance: "$2,943.05",
  },
  {
    user: "Mox Geotagger",
    balance: "$2,943.05",
  },
  {
    user: "Mick R. Bach",
    balance: "$2,943.05",
  },
  {
    user: "JSON Zing",
    balance: "$2,943.05",
  },
  {
    user: "Dane Roads",
    balance: "$2,943.05",
  },
  {
    user: "Dalvik Memphisnashville",
    balance: "$2,943.05",
  },
  {
    user: "Army Joy",
    balance: "$2,943.05",
  },
  {
    user: "Davis Stump",
    balance: "$2,943.05",
  },
  {
    user: "Maude Linjoina",
    balance: "$2,943.05",
  },
  {
    user: "Gerald Zon",
    balance: "$2,943.05",
  },
  {
    user: "Mike A5 Cote",
    balance: "$2,943.05",
  },
  {
    user: "Chris Chinreeves",
    balance: "$2,943.05",
  },
];

rows.forEach(row => {
  const year = Math.floor((Math.random() * 13) + 1980);
  const month = Math.floor((Math.random() * 11) + 1);
  const day = Math.floor((Math.random() * 28) + 1);
  const date = new Date(year, month, day);
  row.birthday = {displayValue: date.toUTCString().slice(0, 16), internalValue: date.toISOString()};
});

const columns = [
  {
    key: "user",
    displayName: "Name",
    defaultSort: "desc",
  },
  {
    key: "balance",
    displayName: "Balance",
    filterable: true,
    sortable: true,
    defaultSort: "asc",
  },
  {
    key: "birthday",
    displayName: "Born",
    filterable: true,
    sortable: false,
  },
];

export default class Application extends React.Component {
  render() {
    return (
      <div id="container">
        <h1>HZ Table</h1>
        <p>Basically all that works is really simple case-sensitive substring filtering, but the base is probably solid enough to quickly fill out all the features.</p>
        <div>
          <HzTable
          rows={rows}
          columns={columns}
          />
        </div>
      </div>
    );
  }
}
