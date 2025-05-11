// /context/InventoryContext.js
import React, { createContext, useState } from 'react';

export const InventoryContext = createContext();

export function InventoryProvider({ children }) {
  // start with an empty “current” inventory
  const [inventory, setInventory] = useState([]);

  return (
    <InventoryContext.Provider value={{ inventory, setInventory }}>
      {children}
    </InventoryContext.Provider>
  );
}
