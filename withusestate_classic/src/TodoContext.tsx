// CartContext.js
import React, { createContext } from "react";

export const FilterStatusContext = createContext({
  filterStatus: "all",
  setFilterStatus: (status: string) => {},
});
