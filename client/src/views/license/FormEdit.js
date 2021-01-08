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
import SupplierService from 'src/services/supplier';
import ManufacturerService from 'src/services/manufacturer';
import LicenseService from 'src/services/license';

const schema = Yup.object().shape({
  name: Yup.string()
    .max(255)
    .required('Nhập tên linh kiện!'),
  manufacturerId: Yup.string()
    .max(255)
    .required('Nhập nhà sản xuất!')
});

const defaultData = [
  { id: 1, name: 'TestSup00' },
  { id: 1, name: 'TestMan00' }
];

const FormEdit = ({ id, onUpdate, handleClose }) => {
  const initialFormState = {
    id: '',
    name: '',
    productKey: '',
    purchaseDate: null,
    purchaseCost: '',
    expireDate: '',
    note: '',
    supplierId: '',
    manufacturerId: ''
  };

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [license, setLicense] = useState(initialFormState);
  const [supplier, setSupplier] = useState([]);
  const [manufacturer, setManufacturer] = useState([]);
  const { control, errors, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialFormState
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setLicense({ ...license, [name]: value });
  };

  const handleChangeDate = date => {
    setLicense({ ...license, purchaseDate: date });
  };

  const handleChangeExpireDate = date => {
    setLicense({ ...license, expireDate: date });
  };

  const handleChangeSupplier = (_, value) => {
    setLicense({ ...license, supplierId: value.id });
  };

  const handleChangeManufacturer = (_, value) => {
    setLicense({ ...license, manufacturerId: value.id });
  };

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

  const getSupplierAll = () => {
    SupplierService.getAll()
      .then(response => {
        setSupplier(response.data);
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
            value={license.name}
            onChange={handleChange}
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
        control={control}
        error={Boolean(errors.productKey)}
        helperText={errors.productKey?.message}
        name="productKey"
        render={() => (
          <TextField
            fullWidth
            name="productKey"
            label="Key bản quyền"
            margin="normal"
            value={license.productKey}
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
              value={license.purchaseDate}
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
            value={license.Supplier || supplier[0] || defaultData[0]}
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
            value={license.Manufacturer || manufacturer[0] || defaultData[1]}
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
            value={license.purchaseCost}
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
              id="date-picker-warranty"
              label="Ngày bảo hành"
              onChange={handleChangeExpireDate}
              value={license.expireDate}
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
            value={license.note}
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
        <Button color="primary" onClick={() => onUpdate(id, license)}>
          Xác nhận
        </Button>
      </DialogActions>
    </form>
  );
};

export default FormEdit;
