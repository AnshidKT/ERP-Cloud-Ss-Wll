// SalesOrderContext.js

import React, { createContext, useContext, useState } from 'react';

const SalesOrderContext = createContext();

export const SalesOrderProvider = ({ children }) => {
  const [selectedSalesOrder, setSelectedSalesOrder] = useState(null);
  const [salesOrderOptions, setSalesOrderOptions] = useState([]);
  const [selectedServiceName, setSelectedServiceName] = useState(""); // New state

  const setSalesOrder = (salesOrder) => {
    setSelectedSalesOrder(salesOrder);
  };

  const setOptions = (options) => {
    setSalesOrderOptions(options);
  };

  const setServiceName = (name) => {
    setSelectedServiceName(name);
  };

  return (
    <SalesOrderContext.Provider value={{ selectedSalesOrder, setSalesOrder, salesOrderOptions, setOptions, selectedServiceName, setServiceName }}>
      {children}
    </SalesOrderContext.Provider>
  );
};

export const useSalesOrderContext = () => {
  return useContext(SalesOrderContext);
};
