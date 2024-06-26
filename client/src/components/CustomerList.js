import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('/api/customers')
      .then(response => setCustomers(response.data))
      .catch(error => console.error(error));
  }, []);

  const redirect = (id) => {
    navigate(`/update/${id}`);
  }
  
  return (
    <div className='container grid'>
      {customers.map(customer => (
        <div className='profile-card' key={customer._id} onClick={() => redirect(customer._id)}><h3 className="user-name">{customer.name}</h3><p>{customer.phone}</p> - <p>{customer.email}</p></div>
      ))}
    </div>
  );
};

export default CustomerList;
