import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import SupplierService from 'src/services/supplier'

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.orange[600],
    height: 56,
    width: 56
  }
}));

const TotalSupplier = ({ className, ...rest }) => {
  const classes = useStyles();
  const [supplier, setSupplier] = useState([]);

  const getSupplierAll = () => {
    SupplierService.getAll()
      .then(response => {
        setSupplier(response.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getSupplierAll();
  }, []);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              TỔNG NHÀ CUNG CẤP
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {supplier.length}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <PeopleIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box mt={3}>
          <LinearProgress
            value={75.5}
            variant="determinate"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

TotalSupplier.propTypes = {
  className: PropTypes.string
};

export default TotalSupplier;
