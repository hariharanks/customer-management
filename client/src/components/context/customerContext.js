import React, { createContext, useState, useContext } from 'react';

// Create the CustomerContext
const CustomerContext = createContext();

// Create a provider component
export const CustomerProvider = ({ children }) => {
  const [customerId, setCustomerId] = useState('');

  const handleCustomer = (id) => {    
    setCustomerId(id);
  }

  return (
    <CustomerContext.Provider value={{ handleCustomer, customerId, setCustomerId }}>
      {children}
    </CustomerContext.Provider>
  );
};

// Custom hook to use the CustomerContext
export const useCustomers = () => {
  return useContext(CustomerContext);
};
