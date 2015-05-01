import React from 'react';

//import HzTableUtils from '../HzTableUtils';

export default class HzTableUtils {

  static filterRows(rows, filterFuncs) {
    // Values of filterFuncs take a cell. We need funcs that take a row.
    const rowFuncs = [];
    
    Object.keys(filterFuncs).forEach(function (columnKey) {
      const func = row => {
        console.log("row", columnKey, row);
        return filterFuncs[columnKey](row[columnKey]);
      };
      rowFuncs.push(func);
    });

    return rows.filter((row) => {
      // If any func returns false, reject the row, otherwise accept the row.
      
      for (let func of rowFuncs) {
        if (!func(row)) {
          console.log("FAILED FILTER", row, func);
          return false;
        }
      }

      return true;
    });
  }

  static sortRows(rows, sortFuncs) {
    // Right now just supporting one column and func to sort by.
    const columnKey = Object.keys(sortFuncs)[0];
    const sortFunc = sortFuncs[columnKey];

    if (typeof sortFunc === "function") {
      // slice() makes a shallow copy. Needed because JavaScript sort() is destructive.
      return rows.slice().sort((rowA, rowB) => {
        const cellA = rowA[columnKey];
        const cellB = rowB[columnKey];
        return sortFunc(cellA, cellB);
      });
    } else {
      return rows;
    }
  }

  static generateFilterFunc(filterText) {
    const trimmed = filterText.trim().toLowerCase();

    console.log("trimmed", '"', trimmed, '"');
    
    if (trimmed === "") {
      return null;
    } else {
      return cell => {
        return cell.internalValue.toLowerCase().indexOf(trimmed) >= 0 || cell.displayValue.toLowerCase().indexOf(trimmed) >= 0;
      };
    }
  }

  static generateSortFunc(order) {
    const makeSortFunc = multiplier => {
      return (cellA, cellB) => {
        const valA = cellA.internalValue;
        const valB = cellB.internalValue;
        if (valA > valB) {
          return 1 * multiplier;
        } else if (valA < valB) {
          return -1 * multiplier;
        } else {
          return 0;
        }
      };
    };
    
    switch (order) {
    case "asc":
      return makeSortFunc(1);
    case "desc":
      return makeSortFunc(-1);
    case null:
      return null;
    }
  }
}
