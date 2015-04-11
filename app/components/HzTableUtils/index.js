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
    // TODO
    return rows;
  }

  static generateFilterFunc(filterText) {
    const trimmed = filterText.trim().toLowerCase();

    console.log("trimmed", '"', trimmed, '"');
    
    if (trimmed === "") {
      return null;
    } else {
      return cell => {
        return cell.internalValue.toLowerCase().indexOf(trimmed) >= 0 || cell.displayValue.toLowerCase().indexOf(trimmed) >= 0;
      }
    }
  }

}
