import http from 'src/http-common';

const getAll = () => {
  return http.get('/licenses');
};

const get = id => {
  return http.get(`/licenses/${id}`);
};

const getAllByName = name => {
  return http.get(`/licenses?name=${name}`);
};

const create = data => {
  console.log(data);
  return http.post('/licenses', data);
};

const update = (id, data) => {
  console.log(data);
  return http.put(`/licenses/${id}`, data);
};

const remove = id => {
  return http.delete(`/licenses/${id}`);
};

const removeAll = () => {
  return http.delete(`/licenses`);
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
