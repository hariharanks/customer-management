import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateCustomer, deleteCustomer } from './api';
import { useNavigate } from "react-router-dom";


const UpdateCustomer = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState({ name: '', email: '', phone: '', address: '' });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/customers/${id}`)
      .then(response => {
        const { name, email, phone, address } = response.data;
        setCustomer({ name: name, email: email, phone: phone, address: address });
      })
      .catch(error => console.error(error));
  }, [id]);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateCustomer(id, customer);
    if (result) {
      toast.success('Customer successfully updated');
    } else {
      toast.error('Failed to update');
    }
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    const result = await deleteCustomer(id);
    if (result) {
      toast.success('Customer delete successfully');
      setTimeout(() => {
        navigate('/')
      }, 5000)
    } else {
      toast.error('Failed to delete');
    }
  }

  return (
    <div className=''>
      <form onSubmit={handleSubmit}>
        <div className='update-container'>
          <div className='profile-card-update'>
            <div className='profile-head'>
              <a href='/' className='arrow-div'>
                <img src={require('../assests/leftArrow.png')} className='arrow-icon' />
              </a>
              <h3 className='heading'>Update Customer</h3>
            </div>
            <div className='col-md-1'>
              <input type="text" className='text-box' name="name" value={customer.name} onChange={handleChange} placeholder="Name" />
            </div>
            <div className='col-md-1'>
              <input type="email" className='text-box' name="email" value={customer.email} onChange={handleChange} placeholder="Email" />
            </div>
            <div className='col-md-1'>
              <input type="text" className='text-box' name="phone" value={customer.phone} onChange={handleChange} placeholder="Phone" />
            </div>
            <div className='col-md-1'>
              <input type="text" className='text-box' name="address" value={customer.address} onChange={handleChange} placeholder="Address" />
            </div>
            <div className='col-md-1'>
              <button className="button success" type="submit">Update</button>
              <button className="button delete" onClick={(e) => handleDelete(e)} type="delete">Delete</button>
            </div>
          </div>
          <ToastContainer />
        </div>
      </form>
    </div>
  );
};

export default UpdateCustomer;
