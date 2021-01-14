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
import LocationService from 'src/services/location';

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

const FormAdd = ({ onAdd, handleClose }) => {
  const initialFormState = {
    id: '',
    name: '',
    barcode: '',
    model: '',
    serial: '',
    purchaseDate: null,
    purchaseCost: '',
    status: '',
    expireDate: '',
    note: '',
    supplierId: '',
    locationId: ''
  };

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [supplier, setSupplier] = useState([]);
  const [location, setLocation] = useState([]);

  const { control, handleSubmit, errors, reset, getValues, setValue } = useForm(
    {
      resolver: yupResolver(schema),
      defaultValues: initialFormState
    }
  );

  const onSubmit = value => {
    onAdd(value);
  };

  const handleChangeDate = value => {
    setValue('purchaseDate', value);
  };

  const handleChangeExpireDate = value => {
    setValue('expireDate', value);
  };

  const handleChangeStatus = (_, value) => {
    if (value) setValue('status', value.type);
    else setValue('status', null);
  };

  const handleChangeSupplier = (_, value) => {
    if (value) setValue('supplierId', value.id);
    else setValue('supplierId', null);
  };

  const handleChangeLocation = (_, value) => {
    if (value) setValue('locationId', value.id);
    else setValue('locationId', null);
  };

  const getSupplierAll = () => {
    SupplierService.getAll()
      .then(response => {
        setSupplier(response.data);
      })
      .catch(err => console.log(err));
  };

  const getLocationAll = () => {
    LocationService.getAll()
      .then(response => {
        setLocation(response.data);
        console.log(response.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getSupplierAll();
    getLocationAll();
  }, []);

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
        render={() => (
          <Autocomplete
            options={location}
            onChange={handleChangeLocation}
            getOptionLabel={option => option.name}
            renderInput={params => (
              <TextField
                {...params}
                label="Địa điểm"
                InputLabelProps={{
                  shrink: true
                }}
                variant="outlined"
                margin="normal"
                name="locationId"
                fullWidth
              />
            )}
          />
        )}
        name="locationId"
        control={control}
      />
      <Controller
        render={() => (
          <Autocomplete
            options={statusList}
            onChange={handleChangeStatus}
            getOptionLabel={option => option.name}
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
