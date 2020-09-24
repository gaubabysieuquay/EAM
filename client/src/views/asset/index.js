import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Result';
import Toolbar from './Toolbar';
import axios from 'axios';
import AssetService from 'src/services/asset'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  }
}));

const AssetListView = () => {
  const classes = useStyles();
  const [asset, setAsset] = useState([]);

  const getAsset = () => {
    AssetService.getAll().then((res) => setAsset(res.data));
  };

  useEffect(() => {
    getAsset();
  }, []);

  return (
    <Page
      className={classes.root}
      title="Quản lý cơ sở vật chất"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results assets={asset} />
        </Box>
      </Container>
    </Page>
  );
};

export default AssetListView;
