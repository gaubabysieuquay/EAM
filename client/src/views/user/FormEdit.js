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
import UserService from 'src/services/auth';

const schema = Yup.object().shape({
  name: Yup.string()
    .max(255)
    .required('Name is required'),
  email: Yup.string()
    .email('Must be a valid email')
    .max(255)
});

const FormEdit = ({ id, onUpdate }) => {
  const initialFormState = {
    username: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    country: '',
    phone: '',
    email: '',
  };

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(initialFormState);
  const { control, errors, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialFormState
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
    console.log('name: ' + name, 'value: ' + value);
  };

  const getUser = id => {
    UserService.get(id)
      .then(response => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUser(id);
  }, [id]);

  return (
    <form onReset={reset}>
      <Controller
        control={control}
        error={Boolean(errors.username)}
        helperText={errors.username?.message}
        name="username"
        render={() => (
          <TextField
            fullWidth
            name="username"
            value={user.username}
            onChange={handleChange}
            label="Tên tài khoản"
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
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
        name="email"
        render={() => (
          <TextField
            fullWidth
            name="email"
            label="Email"
            margin="normal"
            value={user.email}
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
        error={Boolean(errors.firstName)}
        helperText={errors.firstName?.message}
        name="firstName"
        render={() => (
          <TextField
            fullWidth
            name="Tên"
            value={user.firstName}
            onChange={handleChange}
            label="Tên"
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
        error={Boolean(errors.lastName)}
        helperText={errors.lastName?.message}
        name="lastName"
        render={() => (
          <TextField
            fullWidth
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            label="Họ"
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
            value={user.address}
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
            value={user.city}
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
            value={user.state}
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
            label="SDT"
            margin="normal"
            value={user.phone}
            onChange={handleChange}
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
          />
        )}
      />
      <DialogActions>
        <Button color="primary" onClick={() => onUpdate(id, user)}>
          Xác nhận
        </Button>
      </DialogActions>
    </form>
  );
};

export default FormEdit;
