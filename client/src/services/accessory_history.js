import http from 'src/http-common';

const getAll = () => {
  return http.get('/accessory_histories');
};

const get = accessoryId => {
  return http.get(`/accessory_histories/${accessoryId}`);
};

const getAllByName = name => {
  return http.get(`/accessory_histories?name=${name}`);
};

const remove = id => {
  return http.delete(`/accessory_histories/${id}`);
};

const removeAll = () => {
  return http.delete(`/accessory_histories`);
};

export default {
  getAll,
  get,
  getAllByName,
  remove,
  removeAll
};
