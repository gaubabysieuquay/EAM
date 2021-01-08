import http from 'src/http-common';

const getAll = () => {
  return http.get('/manufacturers');
};

const get = id => {
  return http.get(`/manufacturers/${id}`);
};

const getAllByName = name => {
  return http.get(`/manufacturers?name=${name}`);
};

const create = data => {
  console.log(data);
  return http.post('/manufacturers', data);
};

const update = (id, data) => {
  console.log(data);
  return http.put(`/manufacturers/${id}`, data);
};

const remove = id => {
  return http.delete(`/manufacturers/${id}`);
};

const removeAll = () => {
  return http.delete(`/manufacturers`);
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
