import React, { useEffect, useState } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Result';
import Toolbar from './Toolbar';
import LocationService from 'src/services/location';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LocationListView = props => {
  const classes = useStyles();
  const [location, setLocation] = useState([]);
  const [locationSearch, setLocationSearch] = useState([]);
  const [search, setSearch] = useState('');

  const getLocationAll = () => {
    LocationService.getAll()
      .then(response => {
        setLocation(response.data);
        setLocationSearch(response.data);
      })
      .catch(err => console.log(err));
  };

  const onChangeSearch = e => {
    const search = e.target.value;
    setSearch(search);
    LocationService.getAllByName(search)
      .then(response => {
        setLocation(response.data);
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteLocation = id => {
    LocationService.remove(id)
      .then(response => {
        getLocationAll();
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteAllLocation = () => {
    LocationService.removeAll()
      .then(response => {
        getLocationAll();
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const addLocation = values => {
    LocationService.create(values)
      .then(response => {
        getLocationAll();
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const updateLocation = (id, data) => {
    LocationService.update(id, data)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getLocationAll();
  }, []);

  return (
    <Page className={classes.root} title="Nhà cung cấp">
      <Container maxWidth={false}>
        <Toolbar
          search={search}
          onChangeSearch={onChangeSearch}
          onAdd={addLocation}
        />
        <Box mt={3}>
          <Results
            locations={location}
            deleteLocation={deleteLocation}
            deleteAllLocation={deleteAllLocation}
            onUpdate={updateLocation}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default LocationListView;
