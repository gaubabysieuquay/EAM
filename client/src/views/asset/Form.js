import React, { useState } from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { TextField, InputAdornment } from '@material-ui/core';

const Form = () => {
  const [open, setOpen] = useState(false);
  return (
    <Formik
      initialValues={{
        email: '',
        username: '',
        password: ''
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Must be a valid email')
          .max(255)
          .required('Email is required'),
        username: Yup.string()
          .max(255)
          .required('Username is required'),
        password: Yup.string()
          .max(255)
          .required('password is required')
      })}
      onSubmit={() => {
        setOpen(true);
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
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
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            error={Boolean(touched.purchaseDate && errors.purchaseDate)}
            fullWidth
            helperText={touched.purchaseDate && errors.purchaseDate}
            label="Purchase Date"
            margin="normal"
            name="purchaseDate"
            onBlur={handleBlur}
            onChange={handleChange}
            variant="outlined"
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
            error={Boolean(touched.supplier && errors.supplier)}
            fullWidth
            helperText={touched.supplier && errors.supplier}
            label="Supplier"
            margin="normal"
            name="supplier"
            onBlur={handleBlur}
            onChange={handleChange}
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            error={Boolean(touched.purchaseCost && errors.purchaseCost)}
            fullWidth
            helperText={touched.purchaseCost && errors.purchaseCost}
            label="Purchase Cost"
            margin="normal"
            name="purchaseCost"
            onBlur={handleBlur}
            onChange={handleChange}
            variant="outlined"
            InputProps={{
              endAdornment: <InputAdornment position="end">VND</InputAdornment>
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
            InputLabelProps={{
              shrink: true
            }}
          />
        </form>
      )}
    </Formik>
  );
};

export default Form;
