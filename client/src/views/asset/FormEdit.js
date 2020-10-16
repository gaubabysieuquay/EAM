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
  const [asset, setAsset] = useState({
    id: '',
    name: '',
    barcode: '',
    model: '',
    serial: '',
    supplier: '',
    purchaseDate: '',
    purchaseCost: '',
    warranty: '',
    note: ''
  });
  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      barcode: '',
      model: '',
      serial: '',
      supplier: '',
      purchaseDate: '',
      purchaseCost: '',
      warranty: '',
      note: ''
    }
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
    getAsset(id);
  }, [id]);

  return (
    <form onSubmit={handleSubmit()}>
      <Controller
        control={control}
        error={Boolean(errors.name)}
        helperText={errors.name?.message}
        name="name"
        render={() => (
          <TextField
            fullWidth
            value={asset.name}
            label="Tên tài sản"
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
          />
        )}
      />
      <Controller
        control={control}
        error={Boolean(errors.barcode)}
        helperText={errors.barcode?.message}
        name="barcode"
        render={() => (
          <TextField
            fullWidth
            value={asset.barcode}
            label="Barcode"
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
          />
        )}
      />
      <Controller
        control={control}
        error={Boolean(errors.model)}
        helperText={errors.model?.message}
        name="model"
        render={() => (
          <TextField
            fullWidth
            label="Model"
            margin="normal"
            value={asset.model}
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
          />
        )}
      />
      <Controller
        control={control}
        error={Boolean(errors.serial)}
        helperText={errors.serial?.message}
        name="serial"
        render={() => (
          <TextField
            fullWidth
            label="Serial"
            margin="normal"
            value={asset.serial}
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
          />
        )}
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
        type="date"
        InputLabelProps={{
          shrink: true
        }}
      />
      <Controller
        control={control}
        error={Boolean(errors.supplier)}
        helperText={errors.supplier?.message}
        name="supplier"
        render={() => (
          <TextField
            fullWidth
            label="Nhà cung cấp"
            margin="normal"
            value={asset.supplier}
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
          />
        )}
      />
      <Controller
        control={control}
        error={Boolean(errors.purchaseCost)}
        helperText={errors.purchaseCost?.message}
        name="purchaseCost"
        render={() => (
          <TextField
            fullWidth
            label="Giá mua"
            margin="normal"
            value={asset.purchaseCost}
            variant="outlined"
            InputProps={{
              endAdornment: <InputAdornment position="end">VND</InputAdornment>
            }}
            InputLabelProps={{
              shrink: true
            }}
          />
        )}
      />
      <Controller
        control={control}
        error={Boolean(errors.warranty)}
        helperText={errors.warranty?.message}
        name="warranty"
        render={() => (
          <TextField
            fullWidth
            label="Bảo hành"
            margin="normal"
            value={asset.warranty}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">Month</InputAdornment>
              )
            }}
            InputLabelProps={{
              shrink: true
            }}
          />
        )}
      />
      <Controller
        control={control}
        error={Boolean(errors.note)}
        helperText={errors.note?.message}
        name="note"
        render={() => (
          <TextField
            fullWidth
            label="Ghi chú"
            margin="normal"
            value={asset.note}
            variant="outlined"
            rows={4}
            multiline
            InputLabelProps={{
              shrink: true
            }}
          />
        )}
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
