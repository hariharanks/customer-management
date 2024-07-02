import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateCustomer, deleteCustomer, addCustomer } from './api';
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const UpdateCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [customer, setCustomer] = useState({ name: '', email: '', phone: '', address: '' });

  useEffect(() => {
    clear();
    if (id) {
      axios.get(`/api/customers/${id}`)
        .then(response => {
          const { name, email, phone, address } = response.data;
          setCustomer({ name, email, phone, address });
          reset({ name, email, phone, address });
        })
        .catch(error => console.error(error));
    }
  }, [id, reset]);

  const onSubmit = async (data) => {
    if (id) {
      const result = await updateCustomer(id, data);
      console.log("result====", result);
      if (result.error) {
        toast.error(result.message);
        return;
      }
      if (result) {
        toast.success('Customer successfully updated');
      } else {
        toast.error('Failed to update');
      }
    } else {
      const result = await addCustomer(data);
      if (result.error) {
        toast.error(result.message);
        return;
      }
      if (result) {
        toast.success('Customer successfully added');
        clear();
      } else {
        toast.error('Failed to add');
      }
    }
  };

  const handleDelete = async () => {
    confirmAlert({
      title: 'Are you sure ?',
      buttons: [
        {
          className: 'btn-yes',
          label: 'Yes',
          onClick: () => deleteUser()
        },
        {
          className: 'btn-no',
          label: 'No',
        }
      ]
    });
  };

  const deleteUser = async () => {
    const result = await deleteCustomer(id);
    if (result) {
      toast.success('Customer deleted successfully');
      clear();
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      toast.error('Failed to delete');
    }
  }

  const clear = () => {
    setCustomer({ name: '', email: '', phone: '', address: '' });
    reset({ name: '', email: '', phone: '', address: '' });
  };

  const errorDisplay = (id, msg) => {
    toast.error(msg, {
      toastId: id,
    });
  }

  return (
    <div className='main'>
      <div className='container'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='update-container'>
            <div className='profile-card-update'>
              <div className='profile-head'>
                <a href='/' className='arrow-div'>
                  <img src={require('../assests/leftArrow.png')} className='arrow-icon' alt="Back" />
                </a>
                <h3 className='heading'>{id ? `Update Customer` : `Create Customer`}</h3>
              </div>
              <div className='col-md-1'>
                <input
                  id='1'
                  type="text"
                  className='text-box w-80p'
                  name="name"
                  placeholder="Name"
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && <span className='error'>{errorDisplay(1, errors.name.message)}</span>}
              </div>
              <div className='col-md-1'>
                <input
                  id='2'
                  type="email"
                  className='text-box w-80p'
                  name="email"
                  placeholder="Email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Invalid email address'
                    }
                  })}
                  disabled={id ? true : false}
                />
                {errors.email && <span className='error'>{errorDisplay(2, errors.email.message)}</span>}
              </div>
              <div className='col-md-1'>
                <input
                  id='3'
                  type="text"
                  className='text-box w-80p'
                  name="phone"
                  placeholder="Phone"
                  {...register('phone', {
                    required: 'Phone is required',
                    pattern: {
                      value: /^\d{10}$/,
                      message: 'Invalid phone number'
                    }
                  })}
                />
                {errors.phone && <span className='error'>{errorDisplay(3, errors.phone.message)}</span>}
              </div>
              <div className='col-md-1'>
                <input
                  id='4'
                  type="text"
                  className='text-box w-80p'
                  name="address"
                  placeholder="Address"
                  {...register('address', { required: 'Address is required' })}
                />
                {errors.address && <span className='error'>{errorDisplay(4, errors.address.message)}</span>}
              </div>
              <div className='col-md-1'>
                <button className="button success" type="submit">{id ? 'Update' : 'Add'}</button>
                {id && <button className="button delete" onClick={handleDelete} type="button">Delete</button>}
              </div>
            </div>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>

  );
};

export default UpdateCustomer;
