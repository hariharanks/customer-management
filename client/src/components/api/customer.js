import { axiosInstance } from './token';

const getCustomers = async () => {
  try {
    const response = await axiosInstance.get(`/api/customers`);
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
    return null;
  }
};

const getCustomer = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/customers/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
    return null;
  }
};

const updateCustomer = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/api/customers/${id}`, data);
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (e) {
    console.error("err", e.response);
    return e.response.data;
  }
};

const deleteCustomer = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/customers/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
    return null;
  }
};

const addCustomer = async (data) => {
  try {
    const response = await axiosInstance.post('/api/customers', data);
    if (response.status === 201) {
      return response.data;
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
    if (e.response && e.response.status === 409) {
      const { data } = e.response;
      return { status: e.response.status, message: data.error, error: true };
    } else {
      return null;
    }
  }
};

export { getCustomer, getCustomers, updateCustomer, deleteCustomer, addCustomer };
