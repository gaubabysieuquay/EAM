import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import LicenseService from 'src/services/license';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.indigo[600],
    height: 56,
    width: 56
  }
}));

const TotalLicense = ({ className, ...rest }) => {
  const classes = useStyles();
  const [license, setLicense] = useState([]);

  const getLicenseAll = () => {
    LicenseService.getAll()
      .then(response => {
        setLicense(response.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getLicenseAll();
  }, []);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              TỔNG BẢN QUYỀN
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {license.length}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <SaveIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalLicense.propTypes = {
  className: PropTypes.string
};

export default TotalLicense;
