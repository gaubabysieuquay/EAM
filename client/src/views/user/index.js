import React, { useEffect, useState } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import Page from 'src/components/Page';
import Results from './Result';
import Toolbar from './Toolbar';
import UserService from 'src/services/auth';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const UserListView = props => {
  const classes = useStyles();
  const [user, setUser] = useState([]);
  const [userSearch, setUserSearch] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const getUserAll = () => {
    UserService.getAll()
      .then(response => {
        setUser(response.data);
        setUserSearch(response.data);
      })
      .catch(err => console.log(err));
  };

  const onChangeSearch = e => {
    const search = e.target.value;
    setSearch(search);
    UserService.getAllByName(search)
      .then(response => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteUser = id => {
    UserService.remove(id)
      .then(response => {
        getUserAll();
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteAllUser = () => {
    UserService.removeAll()
      .then(response => {
        getUserAll();
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const addUser = values => {
    UserService.create(values)
      .then(response => {
        getUserAll();
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const updateUser = (id, data) => {
    UserService.update(id, data)
      .then(response => {
        navigate('/app/users', { replace: true });
        getUserAll();
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserAll();
  }, []);

  return (
    <Page className={classes.root} title="Người dùng">
      <Container maxWidth={false}>
        <Toolbar
          search={search}
          onChangeSearch={onChangeSearch}
          onAdd={addUser}
        />
        <Box mt={3}>
          <Results
            users={user}
            deleteUser={deleteUser}
            deleteAllUser={deleteAllUser}
            onUpdate={updateUser}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default UserListView;
