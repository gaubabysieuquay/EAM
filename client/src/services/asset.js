import axios from 'axios';

export const add = newAsset => {
  return axios
    .post('assets/add', {
      barcode: newAsset.barcode,
      name: newAsset.name,
      serial: newAsset.serial,
      model: newAsset.model,
      unit: newAsset.unit,
      supplier: newAsset.supplier,
      purchaseCost: newAsset.purchaseCost,
      warranty: newAsset.warranty,
      note: newAsset.note,
      image: newAsset.image
    })
    .then(res => {
      console.log('Added');
    });
};

export const update = asset => {
  return axios
    .put('assets/update', {
      barcode: asset.barcode,
      name: asset.name,
      serial: asset.serial,
      model: asset.model,
      unit: asset.unit,
      supplier: asset.supplier,
      purchaseCost: asset.purchaseCost,
      warranty: asset.warranty,
      note: asset.note,
      image: asset.image
    })
    .then(res => {
      console.log('Updated');
    })
    .catch(err => {
      console.log(err);
    });
};
