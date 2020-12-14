import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  Snackbar,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Alert from '@material-ui/lab/Alert';

import AuthService from 'src/services/auth';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required'),
  username: Yup.string()
    .max(255)
    .required('Username is required'),
  password: Yup.string()
    .max(255)
    .required('Password is required')
});

const RegisterView = () => {
  const classes = useStyles();
  const initialFormState = {
    id: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    country: '',
    phone: '',
    email: ''
  };

  const [message, setMessage] = useState('');
  const [successful, setSuccessful] = useState(false);
  const [open, setOpen] = useState(false);
  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialFormState
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const onSubmit = values => {
    setOpen(true);
    setMessage('');
    setSuccessful(false);

    AuthService.register(values).then(
      response => {
        setMessage(response.data.message);
        console.log(response.data.message);
        setSuccessful(true);
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      }
    );
  };

  return (
    <Page className={classes.root} title="Register">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box mb={3}>
              <Typography color="textPrimary" variant="h2">
                Tạo tài khoản mới
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Vui lòng cung cấp các thông tin sau
              </Typography>
            </Box>
            <Controller
              as={TextField}
              name="username"
              control={control}
              fullWidth
              label="Username (*)"
              margin="normal"
              type="text"
              variant="outlined"
              defaultValue=""
              error={Boolean(errors.username)}
              helperText={errors.username?.message}
            />
            <Controller
              as={TextField}
              name="email"
              control={control}
              fullWidth
              label="Email (*)"
              margin="normal"
              type="email"
              variant="outlined"
              defaultValue=""
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
            <Controller
              as={TextField}
              name="password"
              control={control}
              fullWidth
              label="Mật khẩu (*)"
              margin="normal"
              type="password"
              variant="outlined"
              defaultValue=""
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
            />
            <Controller
              as={TextField}
              name="firstName"
              control={control}
              fullWidth
              label="Tên"
              margin="normal"
              type="text"
              variant="outlined"
              defaultValue=""
              error={Boolean(errors.firstName)}
              helperText={errors.firstName?.message}
            />
            <Controller
              as={TextField}
              name="lastName"
              control={control}
              fullWidth
              label="Họ"
              margin="normal"
              type="text"
              variant="outlined"
              defaultValue=""
              error={Boolean(errors.lastName)}
              helperText={errors.lastName?.message}
            />
            <Controller
              as={TextField}
              name="address"
              control={control}
              fullWidth
              label="Địa chỉ"
              margin="normal"
              type="text"
              variant="outlined"
              defaultValue=""
              error={Boolean(errors.address)}
              helperText={errors.address?.message}
            />
            <Controller
              as={TextField}
              name="city"
              control={control}
              fullWidth
              label="Thành phố"
              margin="normal"
              type="text"
              variant="outlined"
              defaultValue=""
              error={Boolean(errors.city)}
              helperText={errors.city?.message}
            />
            <Controller
              as={TextField}
              name="state"
              control={control}
              fullWidth
              label="Tỉnh"
              margin="normal"
              type="text"
              variant="outlined"
              defaultValue=""
              error={Boolean(errors.state)}
              helperText={errors.state?.message}
            />
            <Controller
              as={TextField}
              name="country"
              control={control}
              fullWidth
              label="Quốc gia"
              margin="normal"
              type="text"
              variant="outlined"
              defaultValue=""
              error={Boolean(errors.country)}
              helperText={errors.country?.message}
            />
            <Controller
              as={TextField}
              name="phone"
              control={control}
              fullWidth
              label="SDT"
              margin="normal"
              type="text"
              variant="outlined"
              defaultValue=""
              error={Boolean(errors.phone)}
              helperText={errors.phone?.message}
            />
            <Box my={2}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Đăng ký
              </Button>
              {message && (
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity={successful ? 'success' : 'error'}
                  >
                    {message}
                  </Alert>
                </Snackbar>
              )}
            </Box>
            <Typography color="textSecondary" variant="body1">
              Đã có tài khoản?{' '}
              <Link component={RouterLink} to="/login" variant="h6">
                Đăng nhập
              </Link>
            </Typography>
          </form>
        </Container>
      </Box>
    </Page>
  );
};

export default RegisterView;
