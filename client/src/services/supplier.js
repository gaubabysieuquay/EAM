import http from 'src/http-common';

const getAll = () => {
  return http.get('/suppliers');
};

const get = id => {
  return http.get(`/suppliers/${id}`);
};

const getAllByName = name => {
  return http.get(`/suppliers?name=${name}`);
};

const create = data => {
  console.log(data);
  return http.post('/suppliers', data);
};

const update = (id, data) => {
  console.log(data);
  return http.put(`/suppliers/${id}`, data);
};

const remove = id => {
  return http.delete(`/suppliers/${id}`);
};

const removeAll = () => {
  return http.delete(`/suppliers`);
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
