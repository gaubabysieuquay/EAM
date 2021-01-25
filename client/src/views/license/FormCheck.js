import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { TextField, DialogActions, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import UserService from 'src/services/auth';
import LicenseService from 'src/services/license';

const schema = Yup.object().shape({
  userId: Yup.string().required('User is required')
});

const FormCheck = ({ id, onUpdate, handleClose }) => {
  const initialFormState = {
    id: '',
    name: '',
    availableSeat: null,
    note: '',
    userId: ''
  };

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [license, setLicense] = useState(initialFormState);
  const [user, setUser] = useState([]);

  const { control, errors, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialFormState
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setLicense({ ...license, [name]: value });
  };

  const handleUpdate = () => {
    license.availableSeat--;
    onUpdate(id, license);
  }

  const handleChangeUser = (_, value) => {
    setLicense({ ...license, userId: value.id });
  };

  const getUserAll = () => {
    UserService.getAll()
      .then(response => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getUserAll();
  }, []);

  const getLicense = id => {
    LicenseService.get(id)
      .then(response => {
        setLicense(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getLicense(id);
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
            value={license.name}
            label="Tên bản quyền"
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
          />
        )}
      />
      <Controller
        render={() => (
          <Autocomplete
            options={user}
            onChange={handleChangeUser}
            getOptionLabel={option => option.username}
            getOptionSelected={(option, value) => option.id === value.id}
            renderInput={params => (
              <TextField
                {...params}
                label="Người dùng"
                InputLabelProps={{
                  shrink: true
                }}
                variant="outlined"
                margin="normal"
                name="userId"
                fullWidth
              />
            )}
          />
        )}
        name="userId"
        control={control}
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
        <Button onClick={handleClose} color="primary">
          Hủy
        </Button>
        <Button color="primary" onClick={() => handleUpdate()}>
          Xác nhận
        </Button>
      </DialogActions>
    </form>
  );
};

export default FormCheck;
