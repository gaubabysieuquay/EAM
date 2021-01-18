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
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MomentUtils from '@date-io/moment';
import AccessoryService from 'src/services/accessory';
import SupplierService from 'src/services/supplier';
import LocationService from 'src/services/location';
import ManufacturerService from 'src/services/manufacturer';

const schema = Yup.object().shape({
  name: Yup.string()
    .max(255)
    .required('Nhập tên linh kiện!'),
  model: Yup.string()
    .max(255)
    .required('Nhập số model!'),
  purchaseCost: Yup.number().typeError('Giá tiền phải là dạng số')
    .min(1, 'Giá tiền nhỏ nhất là 1 VND')
    .max(500000000, 'Giá tiền lớn nhất là 50000000 VND')
    .required('Purchase Cost is required'),
  quantity: Yup.string()
    .max(255)
    .required('Nhập số lượng!')
});

const defaultData = [
  { id: 1, name: 'TestSup00' },
  { id: 1, name: 'TestLo00' },
  { id: 1, name: 'TestMan00'}
];

const FormEdit = ({ id, onUpdate, handleClose }) => {
  const initialFormState = {
    id: '',
    name: '',
    model: '',
    purchaseDate: null,
    purchaseCost: '',
    quantity: '',
    note: '',
    supplierId: '',
    locationId: '',
    manufacturerId: '',
  };

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [accessory, setAccessory] = useState(initialFormState);
  const [supplier, setSupplier] = useState([]);
  const [location, setLocation] = useState([]);
  const [manufacturer, setManufacturer] = useState([]);
  const { control, errors, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialFormState
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setAccessory({ ...accessory, [name]: value });
  };

  const handleChangeDate = date => {
    setAccessory({ ...accessory, purchaseDate: date });
  };

  const handleChangeSupplier = (_, value) => {
    setAccessory({ ...accessory, supplierId: value.id });
  };

  const handleChangeLocation = (_, value) => {
    setAccessory({ ...accessory, locationId: value.id });
  };

  const handleChangeManufacturer = (_, value) => {
    setAccessory({ ...accessory, manufacturerId: value.id });
  };

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
      })
      .catch(err => console.log(err));
  };

  const getManufacturerAll = () => {
    ManufacturerService.getAll()
      .then(response => {
        setManufacturer(response.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getSupplierAll();
    getLocationAll();
    getManufacturerAll();
  }, []);

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
            value={accessory.name}
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
        control={control}
        error={Boolean(errors.model)}
        helperText={errors.model?.message}
        name="model"
        render={() => (
          <TextField
            fullWidth
            name="model"
            label="Model"
            margin="normal"
            value={accessory.model}
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
              id="date-picker"
              label="Ngày mua"
              onChange={handleChangeDate}
              value={accessory.purchaseDate}
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
        render={() => (
          <Autocomplete
            options={supplier}
            onChange={handleChangeSupplier}
            value={accessory.Supplier || supplier[0] || defaultData[0]}
            getOptionLabel={option => option.name}
            getOptionSelected={(option, value) => option.id === value.id}
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
            options={manufacturer}
            onChange={handleChangeManufacturer}
            value={accessory.manufacturer || manufacturer[0] || defaultData[2]}
            getOptionLabel={option => option.name}
            getOptionSelected={(option, value) => option.id === value.id}
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
        name="manufacturerId"
        control={control}
      />
      <Controller
        render={() => (
          <Autocomplete
            options={location}
            onChange={handleChangeLocation}
            value={accessory.Location || location[0] || defaultData[1]}
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
        control={control}
        error={Boolean(errors.purchaseCost)}
        helperText={errors.purchaseCost?.message}
        name="purchaseCost"
        render={() => (
          <TextField
            fullWidth
            name="purchaseCost"
            label="Giá mua"
            margin="normal"
            value={accessory.purchaseCost}
            onChange={handleChange}
            variant="outlined"
            InputProps={{
              endAdornment: <InputAdornment position="end">VND</InputAdornment>
            }}
            InputLabelProps={{
              shrink: true
            }}
          />
        )}
      />
      <Controller
        control={control}
        error={Boolean(errors.quantity)}
        helperText={errors.quantity?.message}
        name="quantity"
        render={() => (
          <TextField
            fullWidth
            name="quantity"
            label="Số lượng"
            margin="normal"
            value={accessory.quantity}
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
            value={accessory.note}
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
        <Button color="primary" onClick={handleClose}>
          Hủy
        </Button>
        <Button color="primary" onClick={() => onUpdate(id, accessory)}>
          Xác nhận
        </Button>
      </DialogActions>
    </form>
  );
};

export default FormEdit;
