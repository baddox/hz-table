import React from "react";

export const DEFAULT_SORT_FUNC = (a, b) => {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else {
    return 0;
  }
};

// TODO: a function that takes the real data under a column and generates a widget based on
// what it is, e.g. by parsing numbers. Perhaps I could just do this with simple regexes
// on the data in the first row, or figure out how Tablesorter (jQuery) does it.
const DEFAULT_WIDGET = {
  parser: cellData => cellData,
  renderer: cellData => React.createElement("td", null, cellData),
  filterer: (filter, cellData) => cellData.toString().toLowerCase().indexOf(filter.query.toLowerCase()) >= 0,
  sorter: DEFAULT_SORT_FUNC,
};


export default class HzTableParser {
  
  static parseColumns(columns, widgets) {
    return columns.map(column => {
      const widget = widgets[column.widget] || DEFAULT_WIDGET;
      return HzTableParser.parseColumn(column, widget);
    });
  }
  
  static parseColumn(column, widget) {
    var sorter;

    if (widget.sorter) {
      sorter = widget.sorter;
    } else if (widget.sortBy) {
      sorter = (cellDataA, cellDataB, parsedCellDataA, parsedCellDataB) => {
        // TODO: cache the results of sortBy somewhere, to make things a lot faster.
        const a = widget.sortBy(cellDataA, parsedCellDataA);
        const b = widget.sortBy(cellDataB, parsedCellDataB);

        return DEFAULT_SORT_FUNC(a, b);
      };
    } else {
      sorter = DEFAULT_WIDGET.sorter;
    }
    
    // TODO: could shim Object.assign here to merge the objects.
    return {
      column: column,
      parser: widget.parser || DEFAULT_WIDGET.parser,
      renderer: widget.renderer || DEFAULT_WIDGET.renderer,
      filterer: widget.filterer || DEFAULT_WIDGET.filterer,
      sorter,
    };
  }

  static addSortOrdersToParsedColumns(parsedColumns, sortOrders) {
    parsedColumns.forEach(column => {
      column.sortOrder = sortOrders[column.column.key];
    });
  }

  static groupByKey(parsedColumns) {
    const obj = {};
    parsedColumns.forEach(parsedColumn => obj[parsedColumn.column.key] = parsedColumn);
    return obj;
  }

  
  static parseRows(rows, parsedColumns) {
    return rows.map(row => HzTableParser.parseRow(row, parsedColumns));
  }

  static parseRow(row, parsedColumns) {
    const parsedRow = {};

    parsedColumns.forEach(parsedColumn => {
      const {column, parser} = parsedColumn;
      const cellData = row[column.key];
      const parsedCellData = parser(cellData);
      parsedRow[column.key] = {cellData, parsedCellData};
    });

    return parsedRow;
  }
}
