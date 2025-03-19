import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const createUser = (data) => axios.post(API_URL, data);
export const getUser = (id) => axios.get(`${API_URL}${id}`);
export const searchUsers = (name) => axios.get(`${API_URL}search?name=${encodeURIComponent(name.trim())}`);
export const updateUser = (id, data) => axios.put(`${API_URL}${id}`, data);
export const deleteUser = (id) => axios.delete(`${API_URL}${id}`);
