import React, { useEffect, useState } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import Page from 'src/components/Page';
import Results from './Result';
import Toolbar from './Toolbar';
import SupplierService from 'src/services/supplier';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const SupplierListView = props => {
  const classes = useStyles();
  const [supplier, setSupplier] = useState([]);
  const [supplierSearch, setSupplierSearch] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const getSupplierAll = () => {
    SupplierService.getAll()
      .then(response => {
        setSupplier(response.data);
        setSupplierSearch(response.data);
      })
      .catch(err => console.log(err));
  };

  const onChangeSearch = e => {
    const search = e.target.value;
    setSearch(search);
    SupplierService.getAllByName(search)
      .then(response => {
        setSupplier(response.data);
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteSupplier = id => {
    SupplierService.remove(id)
      .then(response => {
        getSupplierAll();
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteAllSupplier = () => {
    SupplierService.removeAll()
      .then(response => {
        getSupplierAll();
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const addSupplier = values => {
    SupplierService.create(values)
      .then(response => {
        getSupplierAll();
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const updateSupplier = (id, data) => {
    SupplierService.update(id, data)
      .then(response => {
        navigate('/app/suppliers', { replace: true });
        getSupplierAll();
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSupplierAll();
  }, []);

  return (
    <Page className={classes.root} title="Nhà cung cấp">
      <Container maxWidth={false}>
        <Toolbar
          search={search}
          onChangeSearch={onChangeSearch}
          onAdd={addSupplier}
        />
        <Box mt={3}>
          <Results
            suppliers={supplier}
            deleteSupplier={deleteSupplier}
            deleteAllSupplier={deleteAllSupplier}
            onUpdate={updateSupplier}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default SupplierListView;
