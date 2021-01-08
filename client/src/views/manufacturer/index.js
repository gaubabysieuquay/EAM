import React, { useEffect, useState } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Result';
import Toolbar from './Toolbar';
import ManufacturerService from 'src/services/manufacturer';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const ManufacturerListView = props => {
  const classes = useStyles();
  const [manufacturer, setManufacturer] = useState([]);
  const [manufacturerSearch, setManufacturerSearch] = useState([]);
  const [search, setSearch] = useState('');

  const getManufacturerAll = () => {
    ManufacturerService.getAll()
      .then(response => {
        setManufacturer(response.data);
        setManufacturerSearch(response.data);
      })
      .catch(err => console.log(err));
  };

  const onChangeSearch = e => {
    const search = e.target.value;
    setSearch(search);
    ManufacturerService.getAllByName(search)
      .then(response => {
        setManufacturer(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteManufacturer = id => {
    ManufacturerService.remove(id)
      .then(response => {
        getManufacturerAll();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteAllManufacturer = () => {
    ManufacturerService.removeAll()
      .then(response => {
        getManufacturerAll();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const addManufacturer = values => {
    ManufacturerService.create(values)
      .then(response => {
        getManufacturerAll();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const updateManufacturer = (id, data) => {
    ManufacturerService.update(id, data)
      .then(response => {
        getManufacturerAll();
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getManufacturerAll();
  }, []);

  return (
    <Page className={classes.root} title="Quản lý nhà sản xuất">
      <Container maxWidth={false}>
        <Toolbar
          search={search}
          onChangeSearch={onChangeSearch}
          onAdd={addManufacturer}
        />
        <Box mt={3}>
          <Results
            manufacturers={manufacturer}
            deleteManufacturer={deleteManufacturer}
            deleteAllManufacturer={deleteAllManufacturer}
            onUpdate={updateManufacturer}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default ManufacturerListView;
