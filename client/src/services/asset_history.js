import http from 'src/http-common';

const getAll = () => {
  return http.get('/assets');
};

const get = id => {
  return http.get(`/assets/${id}`);
};

const getAllByName = name => {
  return http.get(`/assets?name=${name}`);
};

const remove = id => {
  return http.delete(`/assets/${id}`);
};

const removeAll = () => {
  return http.delete(`/assets`);
};

export default {
  getAll,
  get,
  getAllByName,
  remove,
  removeAll
};
