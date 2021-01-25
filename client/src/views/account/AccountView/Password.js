import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles
} from '@material-ui/core';
import AuthService from 'src/services/auth';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';

const useStyles = makeStyles({
  root: {}
});

const schema = Yup.object().shape({
  password: Yup.string()
    .max(255)
    .required('Nhập password mới!'),
  confirm: Yup.string()
    .max(255)
    .required('Xác nhận password!')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const Password = ({ className, ...rest }) => {
  const initialFormState = {
    password: '',
    confirm: ''
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

  const updateUser = () => {
    AuthService.update(currentUser.id, user)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    AuthService.get(currentUser.id)
      .then(response => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <form className={clsx(classes.root, className)} {...rest}>
      <Card>
        <CardHeader subheader="Cập nhật password" title="Password" />
        <Divider />
        <CardContent>
          <Controller
            control={control}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            name="password"
            render={() => (
              <TextField
                fullWidth
                name="password"
                onChange={handleChange}
                label="Mật khẩu mới"
                margin="normal"
                variant="outlined"
                type="password"
                InputLabelProps={{
                  shrink: true
                }}
              />
            )}
          />
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => updateUser(currentUser.id, user)}
          >
            Cập nhật
          </Button>
        </Box>
      </Card>
    </form>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

export default Password;
