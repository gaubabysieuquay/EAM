import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
  username: Yup.string()
    .max(255)
    .required('Username is required'),
  password: Yup.string()
    .max(255)
    .required('Password is required')
});

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { control, handleSubmit, watch, errors } = useForm({
    resolver: yupResolver(schema)
  });

  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const onSubmit = values => {
    setOpen(true);
    setMessage('');

    AuthService.login(values.username, values.password).then(
      () => {
        navigate('/app/dashboard', { replace: true });
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
      }
    );
  };

  return (
    <Page className={classes.root} title="Login">
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
                Sign in
              </Typography>
            </Box>
            <Controller
              as={TextField}
              name="username"
              control={control}
              fullWidth
              label="Username"
              margin="normal"
              type="text"
              variant="outlined"
              defaultValue=""
              error={Boolean(errors.username)}
              helperText={errors.username?.message}
            />
            <Controller
              as={TextField}
              name="password"
              control={control}
              fullWidth
              label="Password"
              margin="normal"
              type="password"
              variant="outlined"
              defaultValue=""
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
            />

            <Box my={2}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign in now
              </Button>
              {message && (
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert
                    elevation={6}
                    variant="filled"
                    onClose={handleClose}
                    severity="error"
                  >
                    {message}
                  </Alert>
                </Snackbar>
              )}
            </Box>
            <Typography color="textSecondary" variant="body1">
              Don&apos;t have an account?{' '}
              <Link component={RouterLink} to="/register" variant="h6">
                Sign up
              </Link>
            </Typography>
          </form>
        </Container>
      </Box>
    </Page>
  );
};

export default Login;
