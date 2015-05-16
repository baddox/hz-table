import React from "react";
import {DEFAULT_SORT_FUNC} from "../HzTableParser";

export default {
  // no parser
  renderer: function(name) {
    return <td>{name}</td>;
  },

  sorter: function(nameA, nameB, parsedCellDataA, parsedCellDataB) {
    // TODO: can just use sortBy here, but using sorter to test it.
    return DEFAULT_SORT_FUNC(nameA, nameB);
  },

  filterer: function(filter, name) {
    console.log("user filterer");
    return name.toLowerCase().indexOf(filter.query.toLowerCase()) >= 0;
  },
};
