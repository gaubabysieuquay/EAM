import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  makeStyles
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import Form from './FormAdd';
import AuthService from 'src/services/auth';

const useStyles = makeStyles(theme => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ className, search, onChangeSearch, onAdd, ...rest }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes('ROLE_MODERATOR'));
    }
  }, []);

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex" justifyContent="flex-end">
        {!showModeratorBoard && (
          <Button color="primary" variant="contained" onClick={handleClickOpen}>
            Thêm
          </Button>
        )}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Thêm linh kiện</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Vui lòng điền các thông tin sau!
            </DialogContentText>
            <Form onAdd={onAdd} handleClose={handleClose} />
          </DialogContent>
        </Dialog>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search accessory"
                variant="outlined"
                type="search"
                value={search}
                onChange={onChangeSearch}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
