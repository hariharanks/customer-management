import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const CustomerList = ({ query }) => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('/api/customers');
        setCustomers(response.data);
        setFilteredCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    const filterCustomers = () => {
      if (query) {
        const filtered = customers.filter(customer =>
          customer.name.toLowerCase().includes(query.toLowerCase()) || customer.phone.includes(query)
        );
        setFilteredCustomers(filtered);
      } else {
        setFilteredCustomers(customers);
      }
    };

    filterCustomers();
  }, [query, customers]);

  const redirect = (id) => {
    navigate(`/update/${id}`);
  }

  return (
    <>
      {filteredCustomers.length > 0 ?
        <div className='container grid'>
          {filteredCustomers.map(customer => (
            <div
              className='profile-card'
              key={customer._id}
              onClick={() => redirect(customer._id)}
            >
              <h3 className="user-name">{customer.name}</h3>
              <p>{customer.phone}</p>
              <p>{customer.email}</p>
            </div>
          ))
          }
        </div>
        : <div className='profile-card'>No results found</div>}
    </>
  );
};

export default CustomerList;
