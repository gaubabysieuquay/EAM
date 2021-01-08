import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  DialogActions,
  InputAdornment,
  Button
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MomentUtils from '@date-io/moment';
import SupplierService from 'src/services/supplier';
import ManufacturerService from 'src/services/manufacturer';

const schema = Yup.object().shape({
  name: Yup.string()
    .max(255)
    .required('Nhập tên linh kiện!'),
  manufacturerId: Yup.string()
    .max(255)
    .required('Nhập nhà sản xuất!')
});

const FormAdd = ({ onAdd, handleClose }) => {
  const initialFormState = {
    id: '',
    name: '',
    productKey: '',
    purchaseDate: null,
    purchaseCost: '',
    expireDate: '',
    note: '',
    supplierId: '',
    manufacturerId: ''
  };

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [supplier, setSupplier] = useState([]);
  const [manufacturer, setManufacturer] = useState([]);

  const { control, handleSubmit, errors, reset, getValues, setValue } = useForm(
    {
      resolver: yupResolver(schema),
      defaultValues: initialFormState
    }
  );

  const onSubmit = value => {
    onAdd(value);
  };

  const handleChangeExpireDate = value => {
    setValue('expireDate', value);
  };

  const handleChangeDate = value => {
    setValue('purchaseDate', value);
  };

  const handleChangeSupplier = (_, value) => {
    setValue('supplierId', value.id);
  };

  const handleChangeManufacturer = (_, value) => {
    setValue('manufacturerId', value.id);
  };

  const getSupplierAll = () => {
    SupplierService.getAll()
      .then(response => {
        setSupplier(response.data);
      })
      .catch(err => console.log(err));
  };

  const getManufacturerAll = () => {
    ManufacturerService.getAll()
      .then(response => {
        setManufacturer(response.data);
        console.log(response.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getSupplierAll();
    getManufacturerAll();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
      <Controller
        control={control}
        as={TextField}
        name="name"
        fullWidth
        label="Tên phần mềm"
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
        error={Boolean(errors.productKey)}
        helperText={errors.productKey?.message}
        name="productKey"
        fullWidth
        label="Key bản quyền"
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true
        }}
      />
      <Controller
        control={control}
        name="manufacturerId"
        error={Boolean(errors.manufacturer)}
        helperText={errors.manufacturer?.message}
        render={() => (
          <Autocomplete
            options={manufacturer}
            onChange={handleChangeManufacturer}
            getOptionLabel={option => option.name}
            renderInput={params => (
              <TextField
                {...params}
                label="Nhà sản xuất"
                InputLabelProps={{
                  shrink: true
                }}
                variant="outlined"
                margin="normal"
                name="manufacturerId"
                fullWidth
              />
            )}
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
              id="date-picker-inline"
              label="Ngày mua"
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
              InputLabelProps={{
                shrink: true
              }}
              value={getValues('purchaseDate')}
              onChange={handleChangeDate}
            />
          </MuiPickersUtilsProvider>
        )}
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
        render={() => (
          <Autocomplete
            options={supplier}
            onChange={handleChangeSupplier}
            getOptionLabel={option => option.name}
            renderInput={params => (
              <TextField
                {...params}
                label="Nhà cung cấp"
                InputLabelProps={{
                  shrink: true
                }}
                variant="outlined"
                margin="normal"
                name="supplierId"
                fullWidth
              />
            )}
          />
        )}
        name="supplierId"
        control={control}
      />
      <Controller
        control={control}
        error={Boolean(errors.expireDate)}
        helperText={errors.expireDate?.message}
        name="expireDate"
        render={() => (
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              disableToolbar
              fullWidth
              name="expireDate"
              inputVariant="outlined"
              variant="inline"
              format="DD/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Ngày bảo hành"
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
              InputLabelProps={{
                shrink: true
              }}
              value={getValues('expireDate')}
              onChange={handleChangeExpireDate}
            />
          </MuiPickersUtilsProvider>
        )}
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
