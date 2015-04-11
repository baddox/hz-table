export default class HzTableParser {
  static parseRows(rows) {
    return rows.map(HzTableParser.parseRow);
  }

  static parseRow(row) {
    const parsedRow = {};

    Object.keys(row).map((key) => {
      const value = row[key];
      parsedRow[key] = HzTableParser.parseCell(value);
    });

    return parsedRow;
  }

  static parseCell(value) {
    if (typeof value === "object") {
      return value;
    } else {
      const str = value.toString();
      return {
        displayValue: str,
        value: str,
      };
    }
  }
    
}
