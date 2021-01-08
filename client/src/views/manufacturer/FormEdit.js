import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { TextField, DialogActions, Button } from '@material-ui/core';
import ManufacturerService from 'src/services/manufacturer';

const schema = Yup.object().shape({
  name: Yup.string()
    .max(255)
    .required('Nhập tên nhà sản xuất!')
});

const FormEdit = ({ id, onUpdate, handleClose }) => {
  const initialFormState = {
    id: '',
    name: '',
    url: '',
    supportUrl: '',
    supportPhone: '',
    supportEmail: '',
    image: '',
    note: ''
  };

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [manufacturer, setManufacturer] = useState(initialFormState);
  const { control, errors, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialFormState
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setManufacturer({ ...manufacturer, [name]: value });
  };

  const getManufacturer = id => {
    ManufacturerService.get(id)
      .then(response => {
        setManufacturer(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getManufacturer(id);
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
            value={manufacturer.name}
            onChange={handleChange}
            label="Tên nhà sản xuất"
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
        error={Boolean(errors.url)}
        helperText={errors.url?.message}
        name="url"
        render={() => (
          <TextField
            fullWidth
            name="url"
            value={manufacturer.url || ''}
            onChange={handleChange}
            label="URL"
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
        error={Boolean(errors.supportUrl)}
        helperText={errors.supportUrl?.message}
        name="url"
        render={() => (
          <TextField
            fullWidth
            name="supportUrl"
            label="URL hỗ trợ"
            margin="normal"
            value={manufacturer.supportUrl || ''}
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
        error={Boolean(errors.supportPhone)}
        helperText={errors.supportPhone?.message}
        name="supportPhone"
        render={() => (
          <TextField
            fullWidth
            name="supportPhone"
            label="SDT hỗ trợ"
            margin="normal"
            value={manufacturer.supportPhone || ''}
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
        error={Boolean(errors.supportEmail)}
        helperText={errors.supportEmail?.message}
        name="supportEmail"
        render={() => (
          <TextField
            fullWidth
            name="supportEmail"
            label="Email hỗ trợ"
            margin="normal"
            value={manufacturer.supportEmail || ''}
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
            value={manufacturer.note}
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
        <Button color="primary" onClick={() => onUpdate(id, manufacturer)}>
          Xác nhận
        </Button>
      </DialogActions>
    </form>
  );
};

export default FormEdit;
