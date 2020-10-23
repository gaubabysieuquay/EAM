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

const FormAdd = ({ onAdd }) => {
  const initialFormState = {
    id: '',
    name: '',
    barcode: '',
    model: '',
    serial: '',
    supplier: '',
    purchaseDate: null,
    purchaseCost: '',
    warranty: '',
    note: ''
  };

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const {
    control,
    handleSubmit,
    errors,
    reset,
    register,
    setValue,
    getValues
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialFormState
  });

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = value => {
    onAdd(value);
  };

  const onChange = value => {
    setValue('purchaseDate', value);
    console.log(value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
      <Controller
        control={control}
        as={TextField}
        name="name"
        fullWidth
        label="Tên tài sản"
        margin="normal"
        type="text"
        variant="outlined"
        error={Boolean(errors.name)}
        helperText={errors.name?.message}
        InputLabelProps={{
          shrink: true
        }}
      />
      <Controller
        control={control}
        as={TextField}
        error={Boolean(errors.barcode)}
        helperText={errors.barcode?.message}
        name="barcode"
        fullWidth
        label="Barcode"
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true
        }}
      />
      <Controller
        control={control}
        as={TextField}
        error={Boolean(errors.model)}
        helperText={errors.model?.message}
        name="model"
        fullWidth
        label="Model"
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true
        }}
      />
      <Controller
        control={control}
        as={TextField}
        error={Boolean(errors.serial)}
        helperText={errors.serial?.message}
        name="serial"
        fullWidth
        label="Serial"
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true
        }}
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
              id="date-picker-inline"
              label="Ngày mua"
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
              InputLabelProps={{
                shrink: true
              }}
              value={getValues('purchaseDate')}
              onChange={onChange}
            />
          </MuiPickersUtilsProvider>
        )}
      />
      <Controller
        control={control}
        as={TextField}
        error={Boolean(errors.supplier)}
        helperText={errors.supplier?.message}
        name="supplier"
        fullWidth
        label="Nhà cung cấp"
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true
        }}
      />
      <Controller
        control={control}
        as={TextField}
        error={Boolean(errors.purchaseCost)}
        helperText={errors.purchaseCost?.message}
        name="purchaseCost"
        fullWidth
        label="Giá mua"
        margin="normal"
        variant="outlined"
        InputProps={{
          endAdornment: <InputAdornment position="end">VND</InputAdornment>
        }}
        InputLabelProps={{
          shrink: true
        }}
      />
      <Controller
        control={control}
        as={TextField}
        error={Boolean(errors.warranty)}
        helperText={errors.warranty?.message}
        name="warranty"
        fullWidth
        label="Bảo hành"
        margin="normal"
        variant="outlined"
        InputProps={{
          endAdornment: <InputAdornment position="end">Month</InputAdornment>
        }}
        InputLabelProps={{
          shrink: true
        }}
      />
      <Controller
        control={control}
        as={TextField}
        error={Boolean(errors.note)}
        helperText={errors.note?.message}
        name="note"
        fullWidth
        label="Ghi chú"
        margin="normal"
        variant="outlined"
        rows={4}
        multiline
        InputLabelProps={{
          shrink: true
        }}
      />
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Hủy
        </Button>
        <Button type="submit" color="primary">
          Xác nhận
        </Button>
      </DialogActions>
    </form>
  );
};

export default FormAdd;
