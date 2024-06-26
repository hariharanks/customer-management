import axios from 'axios';

const updateCustomer = async (id, data) => {
    try {
        const response = await axios.put(`/api/customers/${id}`, data);

        if (response.status === 200) {
            return response.data;
        } else {
            return null;
        }
    } catch (e) {
        console.log(e);
    }
}

const deleteCustomer = async (id) => {
    try {
        const response = await axios.delete(`/api/customers/${id}`);
        if (response.status === 200) {
            return response.data;
        } else {
            return null;
        }
    } catch (e) {
        console.log(e);
    }
}

const addCustomer = async (data) => {
    try {
        const response = await axios.post('/api/customers', data);
        if (response.status === 201) {
            return response.data;
        }

        else {
            return null;
        }
    } catch (e) {
        console.log(e);
        if (e.response.status === 409) {
            const { data } = e.response;
            let res = { status: e.response.status, message: data.error, error: true }
            return res;
        }
    }
}

export { updateCustomer, deleteCustomer, addCustomer };