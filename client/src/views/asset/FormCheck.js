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
import LocationService from 'src/services/location';
import AssetService from 'src/services/asset';

const schema = Yup.object().shape({
  status: Yup.string().required('Status is required')
});

const statusList = [
  { name: 'Sẵn sàng sử dụng', type: 1 },
  { name: 'Chờ duyệt', type: 2 },
  { name: 'Đang sửa chữa', type: 3 },
  { name: 'Thất lạc', type: 3 },
  { name: 'Hư hỏng', type: 3 },
  { name: 'Lưu trữ', type: 4 }
];

const FormCheck = ({ id, onUpdate, handleClose }) => {
  const initialFormState = {
    id: '',
    name: '',
    model: '',
    checkDate: null,
    status: '',
    note: '',
    locationId: ''
  };

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [asset, setAsset] = useState(initialFormState);
  const [location, setLocation] = useState([]);

  const { control, errors, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialFormState
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setAsset({ ...asset, [name]: value });
  };

  const handleChangeCheckDate = date => {
    setAsset({ ...asset, checkDate: date });
  };

  const handleChangeStatus = (_, value) => {
    setAsset({ ...asset, status: value.type });
  };

  const handleChangeLocation = (_, value) => {
    setAsset({ ...asset, locationId: value.id });
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
    getLocationAll();
  }, []);

  const getAsset = id => {
    AssetService.get(id)
      .then(response => {
        setAsset(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAsset(id);
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
            label="Tên tài sản"
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
            options={location}
            onChange={handleChangeLocation}
            getOptionLabel={option => option.name}
            getOptionSelected={(option, value) => option.id === value.id}
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
            getOptionSelected={(option, value) => option.type === value.type}
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
              value={asset.checkDate}
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
        <Button color="primary" onClick={() => onUpdate(id, asset)}>
          Xác nhận
        </Button>
      </DialogActions>
    </form>
  );
};

export default FormCheck;
