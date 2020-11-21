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
import Autocomplete from '@material-ui/lab/Autocomplete';
import MomentUtils from '@date-io/moment';
import SupplierService from 'src/services/supplier';

const schema = Yup.object().shape({
  name: Yup.string()
    .max(255)
    .required('Name is required'),
  email: Yup.string()
    .email('Must be a valid email')
    .max(255)
});

const FormEdit = ({ id }) => {
  const initialFormState = {
    name: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zip: '',
    phone: '',
    fax: '',
    email: '',
    note: ''
  };

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [supplier, setSupplier] = useState(initialFormState);
  const { control, errors, reset} = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialFormState
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setSupplier({ ...supplier, [name]: value });
    console.log('name: ' + name, 'value: ' + value);
  };

  const updateSupplier = () => {
    SupplierService.update(id, supplier)
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getSupplier = id => {
    SupplierService.get(id)
      .then(response => {
        setSupplier(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSupplier(id);
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
            value={supplier.name}
            onChange={handleChange}
            label="Tên nhà cung cấp"
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
        error={Boolean(errors.address)}
        helperText={errors.address?.message}
        name="address"
        render={() => (
          <TextField
            fullWidth
            name="address"
            value={supplier.address}
            onChange={handleChange}
            label="Địa chỉ"
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
        error={Boolean(errors.city)}
        helperText={errors.city?.message}
        name="city"
        render={() => (
          <TextField
            fullWidth
            name="city"
            label="Thành phố"
            margin="normal"
            value={supplier.city}
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
        error={Boolean(errors.state)}
        helperText={errors.state?.message}
        name="state"
        render={() => (
          <TextField
            fullWidth
            name="state"
            label="Tỉnh"
            margin="normal"
            value={supplier.state}
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
        error={Boolean(errors.zip)}
        helperText={errors.zip?.message}
        name="zip"
        render={() => (
          <TextField
            fullWidth
            name="zip"
            label="Zip"
            margin="normal"
            value={supplier.zip}
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
        error={Boolean(errors.phone)}
        helperText={errors.phone?.message}
        name="phone"
        render={() => (
          <TextField
            fullWidth
            name="phone"
            label="Giá mua"
            margin="normal"
            value={supplier.phone}
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
        error={Boolean(errors.fax)}
        helperText={errors.fax?.message}
        name="fax"
        render={() => (
          <TextField
            fullWidth
            name="fax"
            label="Fax"
            margin="normal"
            value={supplier.fax}
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
            value={supplier.note}
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
        <Button type="submit" color="primary" onClick={() => updateSupplier()}>
          Xác nhận
        </Button>
      </DialogActions>
    </form>
  );
};

export default FormEdit;
