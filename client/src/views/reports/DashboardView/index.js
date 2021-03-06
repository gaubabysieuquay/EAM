import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import TotalAssets from './TotalAssets';
import Warranty from './Warranty';
import LatestAssets from './LatestAssets';
import Assets from './Assets';
import TotalSupplier from './TotalSupplier';
import TotalAccessories from './TotalAccessories';
import TotalLicense from './TotalLicense';
import AssetByStatus from './AssetByStatus';
import BrokenAsset from './BrokenAsset';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalAssets />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalAccessories />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalLicense />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalSupplier />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <Assets />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <AssetByStatus />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <LatestAssets />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <Warranty />
          </Grid>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <BrokenAsset />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
