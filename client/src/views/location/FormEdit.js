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
import LocationService from 'src/services/location';

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
    id: '',
    name: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zip: '',
    phone: '',
    note: ''
  };

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [location, setLocation] = useState(initialFormState);
  const { control, errors, reset} = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialFormState
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setLocation({ ...location, [name]: value });
    console.log('name: ' + name, 'value: ' + value);
  };

  const updateLocation = () => {
    LocationService.update(id, location)
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getLocation = id => {
    LocationService.get(id)
      .then(response => {
        setLocation(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getLocation(id);
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
            value={location.name}
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
            value={location.address}
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
            value={location.city}
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
            value={location.state}
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
            value={location.zip}
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
        error={Boolean(errors.note)}
        helperText={errors.note?.message}
        name="note"
        render={() => (
          <TextField
            fullWidth
            name="note"
            label="Ghi chú"
            margin="normal"
            value={location.note}
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
        <Button type="submit" color="primary" onClick={() => updateLocation()}>
          Xác nhận
        </Button>
      </DialogActions>
    </form>
  );
};

export default FormEdit;
