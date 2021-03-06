import React, { useEffect, useState } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import Page from 'src/components/Page';
import Results from './Result';
import Toolbar from './Toolbar';
import AssetService from 'src/services/asset';
import AuthService from 'src/services/auth';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const AssetListView = props => {
  const classes = useStyles();
  const [asset, setAsset] = useState([]);
  const [assetSearch, setAssetSearch] = useState([]);
  const [search, setSearch] = useState('');
  const [array, setArray] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [moderator, setModerator] = useState(false);
  const navigate = useNavigate();

  const getAssetAll = () => {
    AssetService.getAll()
      .then(response => {
        setAsset(response.data);
        setAssetSearch(response.data);
        setArray(response.data);
      })
      .catch(err => console.log(err));
  };

  const showAssetByRole = array.filter(item => item.Location.userId === currentUser.id);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setModerator(user.roles.includes('ROLE_MODERATOR'));
    }
  }, []);

  const onChangeSearch = e => {
    const search = e.target.value;
    setSearch(search);
    AssetService.getAllByName(search)
      .then(response => {
        setAsset(response.data);
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteAsset = id => {
    AssetService.remove(id)
      .then(response => {
        getAssetAll();
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteAllAsset = () => {
    AssetService.removeAll()
      .then(response => {
        getAssetAll();
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const addAsset = values => {
    AssetService.create(values)
      .then(response => {
        getAssetAll();
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const updateAsset = (id, data) => {
    AssetService.update(id, data)
      .then(response => {
        navigate('/app/assets', { replace: true });
        getAssetAll();
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
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
          onAdd={addAsset}
        />
        <Box mt={3}>
          <Results
            assets={moderator ? asset : showAssetByRole}
            deleteAsset={deleteAsset}
            deleteAllAsset={deleteAllAsset}
            onUpdate={updateAsset}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default AssetListView;
