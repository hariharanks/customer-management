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
        console.log("ressssssss", response);
        if (response.status === 200) {
            console.log(response.data)
            return response.data;
        } else {
            return null;
        }
    } catch (e) {
        console.log(e);
    }
}

export { updateCustomer, deleteCustomer };