//Authenticate service
import axios from 'axios';
import http from 'src/http-common';

const API_URL = 'http://localhost:5000/api/auth/';

const register = (data) => {
  return axios.post(API_URL + 'signup', data);
};

const login = (username, password) => {
  return axios
    .post(API_URL + 'signin', {
      username,
      password
    })
    .then(response => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
        console.log('Sign in!');
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const getAll = () => {
  return http.get('/users');
};

const get = id => {
  return http.get(`/users/${id}`);
};

const getAllByName = name => {
  return http.get(`/users?username=${name}`);
};

const create = data => {
  console.log(data);
  return http.post('/users', data);
};

const update = (id, data) => {
  console.log(data);
  return http.put(`/users/${id}`, data);
};

const verifyUser = (id, data) => {
  console.log(data);
  return http.put(`/users/user/${id}`, data);
};

const remove = id => {
  return http.delete(`/users/${id}`);
};

const removeAll = () => {
  return http.delete(`/users`);
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  getAll,
  get,
  getAllByName,
  create,
  update,
  verifyUser,
  remove,
  removeAll
};
