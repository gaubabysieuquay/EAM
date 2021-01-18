import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  makeStyles,
  useTheme
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ArchiveIcon from '@material-ui/icons/Archive';
import CancelIcon from '@material-ui/icons/Cancel';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import UpdateIcon from '@material-ui/icons/Update';
import AssetService from 'src/services/asset';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const AssetByStatus = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [asset, setAsset] = useState([]);

  const getAssetAll = () => {
    AssetService.getAll()
      .then(response => {
        setAsset(response.data);
      })
      .catch(err => console.log(err));
  };

  const count = num => {
    return asset.reduce(
      (counter, obj) => (obj.status === num ? (counter += 1) : counter),
      0
    );
  };

  useEffect(() => {
    getAssetAll();
  }, []);

  const data = {
    datasets: [
      {
        data: [count(1), count(3), count(2), count(5), count(0)],
        backgroundColor: [
          colors.lightGreen[400],
          colors.red[400],
          colors.yellow[300],
          colors.lightBlue[400],
          colors.purple[200]
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: [
      'Sẵn sàng',
      'Không sẵn sàng',
      'Chờ duyệt',
      'Lưu trữ',
      'Chưa cập nhật'
    ]
  };

  const options = {
    animation: false,
    cutoutPercentage: 60,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const status = [
    {
      title: 'Sẵn sàng',
      value: count(1),
      icon: CheckIcon,
      color: colors.lightGreen[400]
    },
    {
      title: 'Không sẵn sàng',
      value: count(3),
      icon: CancelIcon,
      color: colors.red[400]
    },
    {
      title: 'Chờ duyệt',
      value: count(2),
      icon: WatchLaterIcon,
      color: colors.yellow[600]
    },
    {
      title: 'Lưu trữ',
      value: count(4),
      icon: ArchiveIcon,
      color: colors.lightBlue[400]
    },
    {
      title: 'Chưa cập nhật',
      value: count(0),
      icon: UpdateIcon,
      color: colors.purple[200]
    }
  ];

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Tài sản theo trạng thái" />
      <Divider />
      <CardContent>
        <Box height={300} position="relative">
          <Doughnut data={data} options={options} />
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          {status.map(({ color, icon: Icon, title, value }) => (
            <Box key={title} p={1} textAlign="center">
              <Icon color="action" />
              <Typography
                color="textPrimary"
                style={{ fontSize: '0.79rem' }}
                variant="body1"
              >
                {title}
              </Typography>
              <Typography style={{ color }} variant="h2">
                {value}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

AssetByStatus.propTypes = {
  className: PropTypes.string
};

export default AssetByStatus;
