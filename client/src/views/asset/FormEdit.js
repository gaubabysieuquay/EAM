import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  InputAdornment,
  DialogActions,
  Button
} from '@material-ui/core';
import AssetService from 'src/services/asset';

const schema = Yup.object().shape({
  username: Yup.string()
    .max(255)
    .required('Username is required'),
  password: Yup.string()
    .max(255)
    .required('Password is required')
});

const FormEdit = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [asset, setAsset] = useState([]);
  const { control, handleSubmit, watch, errors, register } = useForm({
    resolver: yupResolver(schema),
  });

  const handleClose = () => {
    setOpen(false);
  };

  const getAsset = id => {
    AssetService.get(id)
      .then(response => {
        setAsset(response.data);
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAsset();
  }, []);

  console.log(asset.name);

  return (
    <form onSubmit={handleSubmit(getAsset)}>
      <Controller
        as={TextField}
        control={control}
        error={Boolean(errors.name)}
        fullWidth
        helperText={errors.name?.message}
        label="Tên tài sản"
        margin="normal"
        name="name"
        variant="outlined"
        InputLabelProps={{
          shrink: true
        }}
      />
      <Controller
        as={TextField}
        control={control}
        error={Boolean(errors.barcode)}
        fullWidth
        helperText={errors.barcode?.message}
        label="Barcode"
        margin="normal"
        name="barcode"
        variant="outlined"
        defaultValue=""
        InputLabelProps={{
          shrink: true
        }}
      />
      <Controller
        as={TextField}
        control={control}
        error={Boolean(errors.model)}
        fullWidth
        helperText={errors.model?.message}
        label="Model"
        margin="normal"
        name="model"
        variant="outlined"
        defaultValue=""
        InputLabelProps={{
          shrink: true
        }}
      />
      <Controller
        as={TextField}
        control={control}
        error={Boolean(errors.serial)}
        fullWidth
        helperText={errors.serial?.message}
        label="Serial"
        margin="normal"
        name="serial"
        variant="outlined"
        defaultValue=""
        InputLabelProps={{
          shrink: true
        }}
      />
      <Controller
        as={TextField}
        control={control}
        error={Boolean(errors.purchaseDate)}
        fullWidth
        helperText={errors.purchaseDate?.message}
        label="Ngày mua"
        margin="normal"
        name="purchaseDate"
        variant="outlined"
        defaultValue=""
        type="date"
        InputLabelProps={{
          shrink: true
        }}
      />
      <Controller
        as={TextField}
        control={control}
        error={Boolean(errors.supplier)}
        fullWidth
        helperText={errors.supplier?.message}
        label="Nhà cung cấp"
        margin="normal"
        name="supplier"
        variant="outlined"
        defaultValue=""
        InputLabelProps={{
          shrink: true
        }}
      />
      <Controller
        as={TextField}
        control={control}
        error={Boolean(errors.purchaseCost)}
        fullWidth
        helperText={errors.purchaseCost?.message}
        label="Giá mua"
        margin="normal"
        name="purchaseCost"
        variant="outlined"
        defaultValue=""
        InputProps={{
          endAdornment: <InputAdornment position="end">VND</InputAdornment>
        }}
        InputLabelProps={{
          shrink: true
        }}
      />
      <Controller
        as={TextField}
        control={control}
        error={Boolean(errors.warranty)}
        fullWidth
        helperText={errors.warranty?.message}
        label="Bảo hành"
        margin="normal"
        name="warranty"
        variant="outlined"
        defaultValue=""
        InputProps={{
          endAdornment: <InputAdornment position="end">Month</InputAdornment>
        }}
        InputLabelProps={{
          shrink: true
        }}
      />
      <Controller
        as={TextField}
        control={control}
        error={Boolean(errors.note)}
        fullWidth
        helperText={errors.note?.message}
        label="Ghi chú"
        margin="normal"
        name="note"
        variant="outlined"
        defaultValue=""
        rows={4}
        multiline
        InputLabelProps={{
          shrink: true
        }}
      />
      <Button type="submit" color="primary">
        Xác nhận
      </Button>
    </form>
  );
};

/**FormEdit.propTypes = {
  getAsset: PropTypes.object.isRequired
};**/

export default FormEdit;
