import http from 'src/http-common';

const getAll = () => {
  return http.get('/roles');
};

const get = id => {
  return http.get(`/roles/${id}`);
};

const getAllByName = name => {
  return http.get(`/roles?name=${name}`);
};

const update = (id, data) => {
  console.log(data);
  return http.put(`/roles/${id}`, data);
};

const remove = id => {
  return http.delete(`/roles/${id}`);
};

const removeAll = () => {
  return http.delete(`/roles`);
};

export default {
  getAll,
  get,
  getAllByName,
  update,
  remove,
  removeAll
};
