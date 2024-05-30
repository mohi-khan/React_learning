// CartContext.js
import  { createContext } from "react";

export const FilterStatusContext = createContext({
  filterStatus: "all",
  setFilterStatus: (status: string) => {},
});

/*Step for Creating UsingCOntex:
1. Create a a context object with createContext wrapper class.
2. provide necessary default values of the context; the value will be used if 
you consume the context without context provider.
3. Create Contextprovider with the values to transfer to child component (See app context)
4. Create consume  component to consume the context value with usecontext function
5. Wrap the Component with contextprovider;if you didn't it will take default values*/