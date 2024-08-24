import axios from 'axios';

const login = async (data) => {
    try {
        const response = await axios.post(`/api/auth/login`, data);
        if (response.status === 200) {
            return response.data;
        } else {
            return null;
        }
    } catch (e) {
        console.log(e);
    }
}

const logout = () => {
    localStorage.setItem('token', '');
    localStorage.setItem('loggedInUser', '');
    localStorage.setItem('isLoggedIn', false);
}
export {
    login,
    logout
}