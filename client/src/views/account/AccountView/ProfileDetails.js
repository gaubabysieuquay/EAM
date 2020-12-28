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
  const currentUser = AuthService.getCurrentUser();
  const { control, errors, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialFormState
  });

  const [user, setUser] = useState(initialFormState);

  const handleChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
    console.log('name: ' + name, 'value: ' + value);
  };

  const getUser = () => {
    AuthService.get(currentUser.id)
      .then(response => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const updateUser = (id, data) => {
    AuthService.update(id, data)
      .then(response => {
        getUser();
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <form className={clsx(classes.root, className)}>
      <Card>
        <CardHeader subheader="Thông tin có thể chỉnh sửa" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={2}>
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
                    value={user.firstName}
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
                    value={user.lastName}
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
              <Controller
                control={control}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                name="email"
                render={() => (
                  <TextField
                    fullWidth
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    label="Email"
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
                error={Boolean(errors.phone)}
                helperText={errors.phone?.message}
                name="phone"
                render={() => (
                  <TextField
                    fullWidth
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                    label="SDT"
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
                error={Boolean(errors.city)}
                helperText={errors.city?.message}
                name="city"
                render={() => (
                  <TextField
                    fullWidth
                    name="city"
                    value={user.city}
                    onChange={handleChange}
                    label="Thành phố"
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
                error={Boolean(errors.state)}
                helperText={errors.state?.message}
                name="state"
                render={() => (
                  <TextField
                    fullWidth
                    name="state"
                    value={user.state}
                    onChange={handleChange}
                    label="Tỉnh"
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
                error={Boolean(errors.address)}
                helperText={errors.address?.message}
                name="address"
                render={() => (
                  <TextField
                    fullWidth
                    name="address"
                    value={user.address}
                    onChange={handleChange}
                    label="Địa chỉ"
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
                error={Boolean(errors.city)}
                helperText={errors.city?.message}
                name="city"
                render={() => (
                  <TextField
                    fullWidth
                    name="city"
                    value={user.city}
                    onChange={handleChange}
                    label="Thành phố"
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => updateUser(currentUser.id, user)}
          >
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
