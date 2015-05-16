require("babel/register");

import React from 'react';
import HzTable from '../HzTable';
import UserWidget from '../widgets/UserWidget';
import MoneyWidget from '../widgets/MoneyWidget';
import DateWidget from '../widgets/DateWidget';

/*
  Component specific stylesheet
  Can also use .less, .scss, or plain .css files here
*/
require('./style.scss');

const rows = [
  {
    user: "Imangry Akbar",
  },
  {
    user: "Judas Gomilaraptor",
  },
  {
    user: "Mox Geotagger",
  },
  {
    user: "Mick R. Bach",
  },
  {
    user: "JSON Zing",
  },
  {
    user: "Dane Roads",
  },
  {
    user: "Dalvik Memphisnashville",
  },
  {
    user: "Army Joy",
  },
  {
    user: "Davis Stump",
  },
  {
    user: "Maude Linjoina",
  },
  {
    user: "Gerald Zon",
  },
  {
    user: "Mike A5 Cote",
  },
  {
    user: "Chris Chinreeves",
  },
];

rows.forEach(row => {
  const year = Math.floor((Math.random() * 13) + 1980);
  const month = Math.floor((Math.random() * 11) + 1);
  const day = Math.floor((Math.random() * 28) + 1);
  const date = new Date(year, month, day);
  row.birthday = {shortDate: date.toUTCString().slice(0, 16), longDate: date.toISOString()};

  const thousands = Math.floor((Math.random() * 125) + 1);
  const ones = Math.floor((Math.random() * 899) + 100);
  const cents = Math.floor((Math.random() * 89) + 10);
  row.balance = `$${thousands},${ones}.${cents}`; // eslint-disable-line comma-spacing
});

const columns = [
  {
    key: "user",
    displayName: "Name",
    defaultSort: "asc",
    widget: "user",
  },
  {
    key: "balance",
    displayName: "Balance",
    filterable: true,
    sortable: true,
    defaultFilter: ">40000",
    widget: "money",
  },
  {
    key: "birthday",
    displayName: "Born",
    filterable: false,
    sortable: true,
    widget: "date",
  },
];

const widgets = {
  user: UserWidget,
  money: MoneyWidget,
  date: DateWidget,
};

export default class Application extends React.Component {
  render() {
    return (
      <div id="container">
        <h1>HzTable</h1>
        <p style={{position: "relative", top: "-1.5em"}}><em><small>a neat table component built with <a href="https://facebook.github.io/react/" target="_blank">React</a></small></em></p>
        <p>Custom column widgets are working now! That means custom cell rendering, filtering, and sorting.</p>
        <p>Source code: <a href="https://github.com/baddox/hz-table" target="_blank">https://github.com/baddox/hz-table</a></p>
        <div>
          <HzTable
          rows={rows}
          columns={columns}
          widgets={widgets}
          />
        </div>
      </div>
    );
  }
}
