import React from "react";

export default {
  parser: function(cellData) {
    return parseFloat(cellData.replace(/[^\d\.\-]/g, ""));
  },
  
  renderer: function(cellData, dollars) {
    return <td>{cellData}</td>;
  },

  sortBy: function(cellData, dollars) {
    return dollars;
  },

  filterer: function(filter, cellData, dollars) {
    const query = parseFloat(filter.query);
    
    if (filter.operator === ">") {
      return dollars > query;
    } else if (filter.operator === "<") {
      return dollars < query;
    } else {
      return dollars === query;
    }
  },
};
