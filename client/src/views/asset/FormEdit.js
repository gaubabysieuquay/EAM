import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  InputAdornment,
  DialogActions,
  Button
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MomentUtils from '@date-io/moment';
import AssetService from 'src/services/asset';

const schema = Yup.object().shape({
  barcode: Yup.string()
    .max(255)
    .required('Barcode is required'),
  serial: Yup.string()
    .max(255)
    .required('Serial is required'),
  model: Yup.string()
    .max(255)
    .required('Model is required'),
  supplier: Yup.string()
    .max(255)
    .required('Supplier is required'),
  purchaseCost: Yup.string()
    .max(255)
    .required('Purchase Cost is required')
});

const statusList = [
  { name: 'Sẵn sàng sử dụng', type: 1 },
  { name: 'Chờ duyệt', type: 2 },
  { name: 'Đang sửa chữa', type: 3 },
  { name: 'Thất lạc', type: 3 },
  { name: 'Không thể sửa chữa', type: 3 },
  { name: 'Lưu trữ', type: 4 }
];

const FormEdit = ({ id }) => {
  const initialFormState = {
    name: '',
    barcode: '',
    model: '',
    serial: '',
    supplier: '',
    purchaseDate: null,
    purchaseCost: '',
    status: 0,
    warranty: '',
    note: ''
  };

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [asset, setAsset] = useState(initialFormState);
  const { control, errors, reset} = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialFormState
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setAsset({ ...asset, [name]: value });
    console.log('name: ' + name, 'value: ' + value);
  };

  const handleChangeDate = date => {
    setAsset({ ...asset, purchaseDate: date });
  };

  const handleChangeStatus = (_, value) => {
    setAsset({ ...asset, status: value.type });
  };

  const updateAsset = () => {
    AssetService.update(id, asset)
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const objIndex =
    statusList[statusList.findIndex(value => value.type === asset.status)];

  const getAsset = id => {
    AssetService.get(id)
      .then(response => {
        setAsset(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAsset(id);
  }, [id]);

  return (
    <form onReset={reset}>
      <Controller
        control={control}
        error={Boolean(errors.name)}
        helperText={errors.name?.message}
        name="name"
        render={() => (
          <TextField
            fullWidth
            name="name"
            value={asset.name}
            onChange={handleChange}
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
            name="barcode"
            value={asset.barcode}
            onChange={handleChange}
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
            name="model"
            label="Model"
            margin="normal"
            value={asset.model}
            onChange={handleChange}
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
            name="serial"
            label="Serial"
            margin="normal"
            value={asset.serial}
            onChange={handleChange}
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
          />
        )}
      />
      <Controller
        control={control}
        error={Boolean(errors.purchaseDate)}
        helperText={errors.purchaseDate?.message}
        name="purchaseDate"
        render={() => (
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              disableToolbar
              fullWidth
              name="purchaseDate"
              inputVariant="outlined"
              variant="inline"
              format="DD/MM/yyyy"
              margin="normal"
              id="date-picker"
              label="Ngày mua"
              onChange={handleChangeDate}
              value={asset.purchaseDate}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
              InputLabelProps={{
                shrink: true
              }}
            />
          </MuiPickersUtilsProvider>
        )}
      />
      {/**
        <Controller
        control={control}
        error={Boolean(errors.supplier)}
        helperText={errors.supplier?.message}
        name="supplier"
        render={() => (
          <TextField
            fullWidth
            name="supplier"
            label="Nhà cung cấp"
            margin="normal"
            value={asset.supplier}
            onChange={handleChange}
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
          />
        )}
      />
       */}
      <Controller
        control={control}
        error={Boolean(errors.purchaseCost)}
        helperText={errors.purchaseCost?.message}
        name="purchaseCost"
        render={() => (
          <TextField
            fullWidth
            name="purchaseCost"
            label="Giá mua"
            margin="normal"
            value={asset.purchaseCost}
            onChange={handleChange}
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
        render={({ value }) => (
          <Autocomplete
            options={statusList}
            onChange={handleChangeStatus}
            value={objIndex || statusList[1]}
            getOptionLabel={option => option.name}
            getOptionSelected={(option, value) => option.type === value.type}
            renderInput={params => (
              <TextField
                {...params}
                label="Tình trạng"
                InputLabelProps={{
                  shrink: true
                }}
                variant="outlined"
                margin="normal"
                name="status"
                fullWidth
              />
            )}
          />
        )}
        name="status"
        control={control}
      />
      <Controller
        control={control}
        error={Boolean(errors.warranty)}
        helperText={errors.warranty?.message}
        name="warranty"
        render={() => (
          <TextField
            fullWidth
            name="warranty"
            label="Bảo hành"
            margin="normal"
            value={asset.warranty}
            onChange={handleChange}
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
            name="note"
            label="Ghi chú"
            margin="normal"
            value={asset.note}
            onChange={handleChange}
            variant="outlined"
            rows={4}
            multiline
            InputLabelProps={{
              shrink: true
            }}
          />
        )}
      />
      <DialogActions>
        <Button type="submit" color="primary" onClick={() => updateAsset()}>
          Xác nhận
        </Button>
      </DialogActions>
    </form>
  );
};

export default FormEdit;
