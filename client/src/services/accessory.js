import http from 'src/http-common';

const getAll = () => {
  return http.get('/accessories');
};

const get = id => {
  return http.get(`/accessories/${id}`);
};

const getAllByName = name => {
  return http.get(`/accessories?name=${name}`);
};

const create = data => {
  console.log(data);
  return http.post('/accessories', data);
};

const update = (id, data) => {
  console.log(data);
  return http.put(`/accessories/${id}`, data);
};

const remove = id => {
  return http.delete(`/accessories/${id}`);
};

const removeAll = () => {
  return http.delete(`/accessories`);
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
