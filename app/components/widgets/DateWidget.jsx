import React from "react";

export default {
  // (no parser, defaults to parsedCellData being the same as cellData)
  
  renderer: function(cellData, parsedCellData) {
    return <td><span title={parsedCellData.longDate}>{parsedCellData.shortDate}</span></td>;
  },

  sortBy: function(cellData, parsedCellData) {
    return parsedCellData.longDate;
  },

  // (no filterer, defaults to using lower case string indexOf)
};
