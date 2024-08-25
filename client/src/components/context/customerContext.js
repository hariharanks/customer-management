import React, { createContext, useContext, useState } from 'react';

const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [customerId, setCustomerId] = useState(null);

  const handleCustomer = (id) => {
    setCustomerId(id);
  };

  return (
    <CustomerContext.Provider value={{ customerId, handleCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomers = () => useContext(CustomerContext);
