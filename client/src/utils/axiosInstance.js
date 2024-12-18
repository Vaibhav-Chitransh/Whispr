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

export const fetchMessages = async (userId) => {
    return await api.get(`/messages/${userId}`);
}