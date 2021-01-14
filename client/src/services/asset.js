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

const getExpireDate = () => {
  return http.get(`assets/asset/expireDate`);
};

const getByCreated = () => {
  return http.get(`assets/asset/createdAt`);
};

const create = data => {
  console.log(data);
  return http.post('/assets', data);
};

const update = (id, data) => {
  console.log(data);
  return http.put(`/assets/${id}`, data);
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
  getExpireDate,
  getByCreated,
  create,
  update,
  remove,
  removeAll
};
