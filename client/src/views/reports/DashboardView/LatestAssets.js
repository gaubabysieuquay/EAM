import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/vi'
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AssetService from 'src/services/asset';

const useStyles = makeStyles({
  root: {
    height: '100%'
  },
  image: {
    height: 48,
    width: 48
  }
});

const LatestAssets = ({ className, ...rest }) => {
  const classes = useStyles();
  const [assets, setAsset] = useState([]);

  const getAssetAllByCreated = () => {
    AssetService.getByCreated()
      .then(response => {
        setAsset(response.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getAssetAllByCreated();
  }, []);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        subtitle={`${assets.length} in total`}
        title="Thiết bị mới nhất"
      />
      <Divider />
      <List>
        {assets.map((asset, i) => (
          <ListItem divider={i < assets.length - 1} key={asset.id}>
            <ListItemAvatar>
              <img alt="Asset" className={classes.image} src={assets.image} />
            </ListItemAvatar>
            <ListItemText
              primary={asset.name}
              secondary={`Thêm vào ${moment(asset.createdAt).locale('vi').fromNow()}`}
            />
            <IconButton edge="end" size="small">
              <MoreVertIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

LatestAssets.propTypes = {
  className: PropTypes.string
};

export default LatestAssets;
