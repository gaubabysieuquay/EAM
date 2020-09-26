import React, { useEffect, useState } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Result';
import Toolbar from './Toolbar';
import AssetService from 'src/services/asset';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const AssetListView = () => {
  const classes = useStyles();
  const [asset, setAsset] = useState([]);
  const [search, setSearch] = useState('');

  const getAssetAll = () => {
    AssetService.getAll().then(res => setAsset(res.data));
  };

  const handleKeypress = e => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      AssetService.getAllByName(search)
        .then(response => {
          setAsset(response.data);
          console.log(response.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const onChangeSearch = e => {
    const search = e.target.value;
    setSearch(search);
  };

  useEffect(() => {
    getAssetAll();
  }, []);

  return (
    <Page className={classes.root} title="Quản lý cơ sở vật chất">
      <Container maxWidth={false}>
        <Toolbar
          search={search}
          onChangeSearch={onChangeSearch}
          handleKeypress={handleKeypress}
        />
        <Box mt={3}>
          <Results assets={asset} />
        </Box>
      </Container>
    </Page>
  );
};

export default AssetListView;
