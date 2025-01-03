import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:2300/api',
    withCredentials: true
})

export const signup = async (credentials) => {
    return await api.post('/auth/signup', credentials);
}

export const login = async (credentials) => {
    return await api.post('/auth/login', credentials);
}

export const getMessages = async (userId) => {
    return await api.get(`/message/${userId}`);
}

export const getUsers = async () => {
    return await api.get('/users');
}

export const updateProfile = async (data) => {
    return await api.put('/auth/update-profile', data);
}

export const createGroup = async (data) => {
    return await api.post('/groups', data);
}

export default api;