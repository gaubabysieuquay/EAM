import React, { useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { TextField, DialogActions, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MomentUtils from '@date-io/moment';

const schema = Yup.object().shape({
  name: Yup.string()
    .max(255)
    .required('Name is required'),
  email: Yup.string()
    .email('Must be a valid email')
    .max(255)
});

const FormAdd = ({ onAdd, handleClose }) => {
  const initialFormState = {
    id: '',
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

  const { control, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialFormState
  });

  const onSubmit = value => {
    onAdd(value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
      <Controller
        control={control}
        as={TextField}
        name="name"
        fullWidth
        label="Tên nhà cung cấp"
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
        error={Boolean(errors.address)}
        helperText={errors.address?.message}
        name="address"
        fullWidth
        label="Địa chỉ"
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true
        }}
      />
      <Controller
        control={control}
        as={TextField}
        error={Boolean(errors.city)}
        helperText={errors.city?.message}
        name="city"
        fullWidth
        label="Thành phố"
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true
        }}
      />
      <Controller
        control={control}
        as={TextField}
        error={Boolean(errors.state)}
        helperText={errors.state?.message}
        name="state"
        fullWidth
        label="Tỉnh"
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true
        }}
      />
      {/** <Controller
        render={() => (
          <Autocomplete
            options={country}
            onChange={handleChangeStatus}
            getOptionLabel={option => option.name}
            renderInput={params => (
              <TextField
                {...params}
                label="Quốc gia"
                InputLabelProps={{
                  shrink: true
                }}
                variant="outlined"
                margin="normal"
                name="country"
                fullWidth
              />
            )}
          />
        )}
        name="country"
        control={control}
      />*/}

      <Controller
        control={control}
        as={TextField}
        error={Boolean(errors.zip)}
        helperText={errors.zip?.message}
        name="zip"
        fullWidth
        label="Zip code"
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true
        }}
      />
      <Controller
        control={control}
        as={TextField}
        error={Boolean(errors.phone)}
        helperText={errors.phone?.message}
        name="phone"
        fullWidth
        label="Số điện thoại"
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true
        }}
      />
      <Controller
        control={control}
        as={TextField}
        error={Boolean(errors.fax)}
        helperText={errors.fax?.message}
        name="fax"
        fullWidth
        label="Fax"
        margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true
        }}
      />
      <Controller
        control={control}
        as={TextField}
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
        name="email"
        fullWidth
        label="Email"
        margin="normal"
        variant="outlined"
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
