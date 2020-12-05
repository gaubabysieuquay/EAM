import http from 'src/http-common';

const getAll = () => {
  return http.get('/locations');
};

const get = id => {
  return http.get(`/locations/${id}`);
};

const getAllByName = name => {
  return http.get(`/locations?name=${name}`);
};

const create = data => {
  console.log(data);
  return http.post('/locations', data);
};

const update = (id, data) => {
  console.log(data);
  return http.put(`/locations/${id}`, data);
};

const remove = id => {
  return http.delete(`/locations/${id}`);
};

const removeAll = () => {
  return http.delete(`/locations`);
};

export default {
  getAll,
  get,
  getAllByName,
  create,
  update,
  remove,
  removeAll
};
