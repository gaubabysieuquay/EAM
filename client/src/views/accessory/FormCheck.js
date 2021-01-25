import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { TextField, DialogActions, Button } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MomentUtils from '@date-io/moment';
import UserService from 'src/services/auth';
import AccessoryService from 'src/services/accessory';

const schema = Yup.object().shape({
  userId: Yup.string().required('User is required')
});

const FormCheck = ({ id, onUpdate, handleClose }) => {
  const initialFormState = {
    id: '',
    name: '',
    checkDate: null,
    quantity: null,
    availableQTY: null,
    note: '',
    userId: ''
  };

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [accessory, setAccessory] = useState(initialFormState);
  const [user, setUser] = useState([]);

  const { control, errors, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialFormState
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setAccessory({ ...accessory, [name]: value });
  };

  const handleChangeCheckDate = date => {
    setAccessory({ ...accessory, checkDate: date });
  };

  const handleUpdate = () => {
    accessory.availableQTY--;
    onUpdate(id, accessory);
  }

  const handleChangeUser = (_, value) => {
    setAccessory({ ...accessory, userId: value.id });
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

  const getAccessory = id => {
    AccessoryService.get(id)
      .then(response => {
        setAccessory(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAccessory(id);
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
            onChange={handleChange}
            label="Tên linh kiện"
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
        error={Boolean(errors.checkDate)}
        helperText={errors.checkDate?.message}
        name="checkDate"
        render={() => (
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              disableToolbar
              fullWidth
              name="checkDate"
              inputVariant="outlined"
              variant="inline"
              format="DD/MM/yyyy"
              margin="normal"
              id="date-picker-check"
              label="Ngày Check"
              onChange={handleChangeCheckDate}
              value={accessory.checkDate}
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
