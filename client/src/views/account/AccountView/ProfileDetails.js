import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import AuthService from 'src/services/auth';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Email không hợp lệ')
    .max(255)
    .required('Xin hãy điền email!'),
  firstName: Yup.string()
    .max(255)
    .required('Xin hãy điền họ của bạn!'),
  lastName: Yup.string()
    .max(255)
    .required('Xin hãy điền tên của bạn!'),
  address: Yup.string()
    .max(255)
    .required('Xin hãy điền địa chỉ của bạn!'),
  city: Yup.string()
    .max(255)
    .required('Xin hãy điền thành phố của bạn!'),
  country: Yup.string()
    .max(255)
    .required('Xin hãy điền quốc gia!'),
  phone: Yup.string()
    .max(255)
    .required('Xin hãy điền SDT!')
});

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, ...rest }) => {
  const initialFormState = {
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    country: '',
    phone: '',
    image: ''
  };
  const classes = useStyles();
  const [currentUser, setCurrentUser] = useState({});
  const { control, errors, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialFormState
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
    console.log('name: ' + name, 'value: ' + value);
  };

  const getCurrentUser = () => {
    AuthService.getCurrentUser()
      .then(response => {
        setCurrentUser(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <form
      className={clsx(classes.root, className)}
    >
      <Card>
        <CardHeader subheader="Thông tin có thể chỉnh sửa" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <Controller
                control={control}
                error={Boolean(errors.firstName)}
                helperText={errors.firstName?.message}
                name="firstName"
                render={() => (
                  <TextField
                    fullWidth
                    name="firstName"
                    value={currentUser.firstName}
                    onChange={handleChange}
                    label="Họ"
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item md={6} xs={12}>
            <Controller
                control={control}
                error={Boolean(errors.lastName)}
                helperText={errors.lastName?.message}
                name="lastName"
                render={() => (
                  <TextField
                    fullWidth
                    name="lastName"
                    value={currentUser.lastName}
                    onChange={handleChange}
                    label="Tên"
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Địa chỉ Email"
                name="email"
                onChange={handleChange}
                required
                value={currentUser.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Số điện thoại"
                name="phone"
                onChange={handleChange}
                value={currentUser.phone}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Quốc gia"
                name="country"
                onChange={handleChange}
                required
                value={currentUser.country}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Tỉnh"
                name="state"
                onChange={handleChange}
                required
                value={currentUser.state}
                variant="outlined"
              ></TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained">
            Lưu thông tin
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
