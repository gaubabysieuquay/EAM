import http from 'src/http-common';

const getAll = () => {
  return http.get('/asset_histories');
};

const get = assetId => {
  return http.get(`/asset_histories/${assetId}`);
};

const getAllByName = name => {
  return http.get(`/asset_histories?name=${name}`);
};

const remove = id => {
  return http.delete(`/asset_histories/${id}`);
};

const removeAll = () => {
  return http.delete(`/asset_histories`);
};

export default {
  getAll,
  get,
  getAllByName,
  remove,
  removeAll
};
