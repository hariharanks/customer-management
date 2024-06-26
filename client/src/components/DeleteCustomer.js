import React from 'react';
import axios from 'axios';

const DeleteCustomer = ({ id }) => {
    const handleDelete = () => {
        axios.delete(`/api/customers/${id}`)
            .then(response => console.log(response.data))
            .catch(error => console.error(error));
    };

    return <button onClick={handleDelete}>Delete Customer</button>;
};

export default DeleteCustomer;
