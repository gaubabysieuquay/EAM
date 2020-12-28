import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import KeyBoardIcon from '@material-ui/icons/Keyboard';
import AccessoryService from 'src/services/accessory'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.green[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.green[900]
  },
  differenceValue: {
    color: colors.green[900],
    marginRight: theme.spacing(1)
  }
}));

const TotalAccessories = ({ className, ...rest }) => {
  const classes = useStyles();
  const [accessory, setAccessory] = useState([]);

  const getAccessoryAll = () => {
    AccessoryService.getAll()
      .then(response => {
        setAccessory(response.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getAccessoryAll();
  }, []);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              TỔNG LINH KIỆN
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {accessory.length}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <KeyBoardIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box mt={2} display="flex" alignItems="center">
          <ArrowUpwardIcon className={classes.differenceIcon} />
          <Typography className={classes.differenceValue} variant="body2">
            16%
          </Typography>
          <Typography color="textSecondary" variant="caption">
            Since last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

TotalAccessories.propTypes = {
  className: PropTypes.string
};

export default TotalAccessories;
