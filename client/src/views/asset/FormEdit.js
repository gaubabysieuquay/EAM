import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  TextField,
  InputAdornment,
  DialogActions,
  Button
} from '@material-ui/core';
import AssetService from 'src/services/asset';

const FormEdit = ({ onUpdate, getAsset }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  //const [asset, setAsset] = useState([]);

  //const { id } = useParams();
  //const isAddMode = !id;

  //console.log('Id: ' + id);

  const handleClose = () => {
    setOpen(false);
  };

  //useEffect(() => {
    //getAsset();
  //});

  console.log(getAsset);

  return (
    <Formik
      initialValues={getAsset}
      enableReinitialize
      validationSchema={Yup.object().shape({
        barcode: Yup.string()
          .max(255)
          .required('Barcode is required'),
        serial: Yup.string()
          .max(255)
          .required('Serial is required'),
        model: Yup.string()
          .max(255)
          .required('Model is required'),
        supplier: Yup.string()
          .max(255)
          .required('Supplier is required'),
        purchaseCost: Yup.string()
          .max(255)
          .required('Purchase Cost is required')
      })}
      onSubmit={values => {
        //onUpdate(asset.id, asset);
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        asset,
        values
      }) => (
        <form onSubmit={handleSubmit}>
          <TextField
            error={Boolean(touched.name && errors.name)}
            fullWidth
            helperText={touched.name && errors.name}
            label="Tên tài sản"
            margin="normal"
            name="name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.name}
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            error={Boolean(touched.barcode && errors.barcode)}
            fullWidth
            helperText={touched.barcode && errors.barcode}
            label="Barcode"
            margin="normal"
            name="barcode"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.barcode}
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            error={Boolean(touched.model && errors.model)}
            fullWidth
            helperText={touched.model && errors.model}
            label="Model"
            margin="normal"
            name="model"
            onBlur={handleBlur}
            onChange={handleChange}
            variant="outlined"
            value={values.model}
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            error={Boolean(touched.serial && errors.serial)}
            fullWidth
            helperText={touched.serial && errors.serial}
            label="Serial"
            margin="normal"
            name="serial"
            onBlur={handleBlur}
            onChange={handleChange}
            variant="outlined"
            value={values.serial}
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            error={Boolean(touched.purchaseDate && errors.purchaseDate)}
            fullWidth
            helperText={touched.purchaseDate && errors.purchaseDate}
            label="Ngày mua"
            margin="normal"
            name="purchaseDate"
            onBlur={handleBlur}
            onChange={handleChange}
            variant="outlined"
            value={values.purchaseDate}
            type="date"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            error={Boolean(touched.supplier && errors.supplier)}
            fullWidth
            helperText={touched.supplier && errors.supplier}
            label="Nhà cung cấp"
            margin="normal"
            name="supplier"
            onBlur={handleBlur}
            onChange={handleChange}
            variant="outlined"
            value={values.supplier}
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            error={Boolean(touched.purchaseCost && errors.purchaseCost)}
            fullWidth
            helperText={touched.purchaseCost && errors.purchaseCost}
            label="Giá mua"
            margin="normal"
            name="purchaseCost"
            onBlur={handleBlur}
            onChange={handleChange}
            variant="outlined"
            value={values.purchaseCost}
            InputProps={{
              endAdornment: <InputAdornment position="end">VND</InputAdornment>
            }}
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            error={Boolean(touched.warranty && errors.warranty)}
            fullWidth
            helperText={touched.warranty && errors.warranty}
            label="Bảo hành"
            margin="normal"
            name="warranty"
            onBlur={handleBlur}
            onChange={handleChange}
            variant="outlined"
            value={values.warranty}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">Month</InputAdornment>
              )
            }}
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            error={Boolean(touched.note && errors.note)}
            fullWidth
            helperText={touched.note && errors.note}
            label="Ghi chú"
            margin="normal"
            name="note"
            onBlur={handleBlur}
            onChange={handleChange}
            variant="outlined"
            values={values.note}
            rows={4}
            multiline
            InputLabelProps={{
              shrink: true
            }}
          />
          <Button type="submit" disabled={isSubmitting} color="primary">
            Xác nhận
          </Button>
        </form>
      )}
    </Formik>
  );
};

FormEdit.propTypes = {
  getAsset: PropTypes.array.isRequired
};

export default FormEdit;
