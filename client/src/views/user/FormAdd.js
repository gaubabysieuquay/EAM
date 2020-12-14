import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { TextField, DialogActions, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MomentUtils from '@date-io/moment';
import RoleService from 'src/services/role';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required'),
  username: Yup.string()
    .max(255)
    .required('Username is required'),
  password: Yup.string()
    .max(255)
    .required('Password is required')
});

const FormAdd = ({ onAdd }) => {
  const initialFormState = {
    id: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    country: '',
    phone: '',
    email: '',
    roles: []
  };

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [role, setRole] = useState([]);

  const { control, handleSubmit, errors, reset, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialFormState
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeRole = (_, value) => {
    setValue('roles', value.name);
  };

  const getRoleAll = () => {
    RoleService.getAll()
      .then(response => {
        setRole(response.data);
      })
      .catch(err => console.log(err));
  };

  const onSubmit = value => {
    onAdd(value);
  };

  useEffect(() => {
    getRoleAll();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
      <Controller
        as={TextField}
        name="username"
        control={control}
        fullWidth
        label="Username (*)"
        margin="normal"
        type="text"
        variant="outlined"
        defaultValue=""
        error={Boolean(errors.username)}
        helperText={errors.username?.message}
        InputLabelProps={{
          shrink: true
        }}
      />
      <Controller
        as={TextField}
        name="email"
        control={control}
        fullWidth
        label="Email (*)"
        margin="normal"
        type="email"
        variant="outlined"
        defaultValue=""
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
        InputLabelProps={{
          shrink: true
        }}
      />
      <Controller
        as={TextField}
        name="password"
        control={control}
        fullWidth
        label="Mật khẩu (*)"
        margin="normal"
        type="password"
        variant="outlined"
        defaultValue=""
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
        InputLabelProps={{
          shrink: true
        }}
      />
      <Controller
        as={TextField}
        name="firstName"
        control={control}
        fullWidth
        label="Tên"
        margin="normal"
        type="text"
        variant="outlined"
        defaultValue=""
        error={Boolean(errors.firstName)}
        helperText={errors.firstName?.message}
        InputLabelProps={{
          shrink: true
        }}
      />
      <Controller
        as={TextField}
        name="lastName"
        control={control}
        fullWidth
        label="Họ"
        margin="normal"
        type="text"
        variant="outlined"
        defaultValue=""
        error={Boolean(errors.lastName)}
        helperText={errors.lastName?.message}
        InputLabelProps={{
          shrink: true
        }}
      />
      <Controller
        as={TextField}
        name="address"
        control={control}
        fullWidth
        label="Địa chỉ"
        margin="normal"
        type="text"
        variant="outlined"
        defaultValue=""
        error={Boolean(errors.address)}
        helperText={errors.address?.message}
        InputLabelProps={{
          shrink: true
        }}
      />
      <Controller
        as={TextField}
        name="city"
        control={control}
        fullWidth
        label="Thành phố"
        margin="normal"
        type="text"
        variant="outlined"
        defaultValue=""
        error={Boolean(errors.city)}
        helperText={errors.city?.message}
        InputLabelProps={{
          shrink: true
        }}
      />
      <Controller
        as={TextField}
        name="state"
        control={control}
        fullWidth
        label="Tỉnh"
        margin="normal"
        type="text"
        variant="outlined"
        defaultValue=""
        error={Boolean(errors.state)}
        helperText={errors.state?.message}
        InputLabelProps={{
          shrink: true
        }}
      />
      <Controller
        as={TextField}
        name="country"
        control={control}
        fullWidth
        label="Quốc gia"
        margin="normal"
        type="text"
        variant="outlined"
        defaultValue=""
        error={Boolean(errors.country)}
        helperText={errors.country?.message}
        InputLabelProps={{
          shrink: true
        }}
      />
      <Controller
        as={TextField}
        name="phone"
        control={control}
        fullWidth
        label="SDT"
        margin="normal"
        type="text"
        variant="outlined"
        defaultValue=""
        error={Boolean(errors.phone)}
        helperText={errors.phone?.message}
        InputLabelProps={{
          shrink: true
        }}
      />
      <Controller
        render={() => (
          <Autocomplete
            options={role}
            onChange={handleChangeRole}
            getOptionLabel={option => option.name}
            renderInput={params => (
              <TextField
                {...params}
                label="Phân quyền"
                InputLabelProps={{
                  shrink: true
                }}
                variant="outlined"
                margin="normal"
                name="roles"
                fullWidth
              />
            )}
          />
        )}
        name="roles"
        control={control}
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
