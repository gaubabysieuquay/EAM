import http from 'src/http-common';

const getAll = () => {
  return http.get('/license_histories');
};

const get = licenseId => {
  return http.get(`/license_histories/${licenseId}`);
};

const getAllByName = name => {
  return http.get(`/license_histories?name=${name}`);
};

const remove = id => {
  return http.delete(`/license_histories/${id}`);
};

const removeAll = () => {
  return http.delete(`/license_histories`);
};

export default {
  getAll,
  get,
  getAllByName,
  remove,
  removeAll
};
