import React, { useEffect, useState } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import Page from 'src/components/Page';
import Results from './Result';
import Toolbar from './Toolbar';
import AccessoryService from 'src/services/accessory_history';

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

  useEffect(() => {
    getAccessoryAll();
  }, []);

  return (
    <Page className={classes.root} title="Lưu trữ thiết bị">
      <Container maxWidth={false}>
        <Toolbar search={search} onChangeSearch={onChangeSearch} />
        <Box mt={3}>
          <Results accessories={accessory} />
        </Box>
      </Container>
    </Page>
  );
};

export default AccessoryListView;
