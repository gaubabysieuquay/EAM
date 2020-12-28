import React, { useEffect, useState } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import Page from 'src/components/Page';
import Results from './Result';
import Toolbar from './Toolbar';
import AccessoryService from 'src/services/accessory';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const AccessoryListView = props => {
  const classes = useStyles();
  const [accessory, setAccessory] = useState([]);
  const [accessorySearch, setAccessorySearch] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const getAccessoryAll = () => {
    AccessoryService.getAll()
      .then(response => {
        setAccessory(response.data);
        setAccessorySearch(response.data);
      })
      .catch(err => console.log(err));
  };

  const onChangeSearch = e => {
    const search = e.target.value;
    setSearch(search);
    AccessoryService.getAllByName(search)
      .then(response => {
        setAccessory(response.data);
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteAccessory = id => {
    AccessoryService.remove(id)
      .then(response => {
        getAccessoryAll();
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteAllAccessory = () => {
    AccessoryService.removeAll()
      .then(response => {
        getAccessoryAll();
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const addAccessory = values => {
    AccessoryService.create(values)
      .then(response => {
        getAccessoryAll();
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const updateAccessory = (id, data) => {
    AccessoryService.update(id, data)
      .then(response => {
        navigate('/app/accessories', { replace: true });
        getAccessoryAll();
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAccessoryAll();
  }, []);

  return (
    <Page className={classes.root} title="Quản lý cơ sở vật chất">
      <Container maxWidth={false}>
        <Toolbar
          search={search}
          onChangeSearch={onChangeSearch}
          onAdd={addAccessory}
        />
        <Box mt={3}>
          <Results
            accessories={accessory}
            deleteAccessory={deleteAccessory}
            deleteAllAccessory={deleteAllAccessory}
            onUpdate={updateAccessory}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default AccessoryListView;
