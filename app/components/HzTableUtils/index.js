import React from 'react';

const FILTER_OPERATORS = [">", "<"];

export default class HzTableUtils {

  static filterRows(rows, parsedColumnsByKey, filters) {
    return rows.filter(row => {
      for (let key of Object.keys(filters)) {
        const filter = filters[key];
        const parsedColumn = parsedColumnsByKey[key];
        const cell = row[key];

        if (!parsedColumn.filterer(filter, cell.cellData, cell.parsedCellData)) {
          return false;
        }
      }

      return true;
    });
  }

  static sortRows(rows, parsedColumnsByKey, sorts) {
    // Right now just supporting one column and func to sort by.
    const key = Object.keys(sorts)[0];

    if (!key) {
      return rows;
    }
    
    const order = sorts[key];
    const sorter = parsedColumnsByKey[key].sorter;

    // slice() makes a shallow copy. Needed because JavaScript sort() is destructive.
    const sortedRows = rows.slice().sort((rowA, rowB) => {
      const a = rowA[key];
      const b = rowB[key];
      return sorter(a.cellData, b.cellData, a.parsedCellData, b.parsedCellData);
    });

    if (order === "desc") {
      return sortedRows.reverse();
    } else {
      return sortedRows;
    }
  }

  static generateFilter(string) {
    const str = string.trim();
    
    if (str.length === 0) {
      return undefined;
    } else {
      const filter = {};
      const operator = FILTER_OPERATORS.find(op => str.indexOf(op) === 0);
      
      if (operator) {
        filter.operator = operator;
        filter.query = str.substring(operator.length);
      } else {
        filter.query = str;
      }
      
      return filter;
    }
  }
}
