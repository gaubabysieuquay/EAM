import React, { useEffect, useState } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Result';
import Toolbar from './Toolbar';
import LicenseService from 'src/services/license_history';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LicenseListView = props => {
  const classes = useStyles();
  const [license, setLicense] = useState([]);
  const [licenseSearch, setLicenseSearch] = useState([]);
  const [search, setSearch] = useState('');

  const getLicenseAll = () => {
    LicenseService.getAll()
      .then(response => {
        setLicense(response.data);
        setLicenseSearch(response.data);
      })
      .catch(err => console.log(err));
  };

  const onChangeSearch = e => {
    const search = e.target.value;
    setSearch(search);
    LicenseService.getAllByName(search)
      .then(response => {
        setLicense(response.data);
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getLicenseAll();
  }, []);

  return (
    <Page className={classes.root} title="Lưu trữ bản quyền phần mềm">
      <Container maxWidth={false}>
        <Toolbar
          search={search}
          onChangeSearch={onChangeSearch}
          data={license}
        />
        <Box mt={3}>
          <Results licenses={license} />
        </Box>
      </Container>
    </Page>
  );
};

export default LicenseListView;
