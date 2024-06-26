import React, { useState } from 'react';
import axios from 'axios';

const AddCustomer = () => {
    console.log("xxxxxxxxxxxxx")
    const [customer, setCustomer] = useState({ name: '', email: '', phone: '', address: '' });

    const handleChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/customers', customer)
            .then(response => console.log(response.data))
            .catch(error => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Customer</h2>
            <input type="text" name="name" value={customer.name} onChange={handleChange} placeholder="Name" />
            <input type="email" name="email" value={customer.email} onChange={handleChange} placeholder="Email" />
            <input type="text" name="phone" value={customer.phone} onChange={handleChange} placeholder="Phone" />
            <input type="text" name="address" value={customer.address} onChange={handleChange} placeholder="Address" />
            <button type="submit">Add Customer</button>
        </form>
    );
};

export default AddCustomer;
