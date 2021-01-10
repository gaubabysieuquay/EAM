import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes, { number } from 'prop-types';
import { Bar } from 'react-chartjs-2';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  makeStyles,
  colors
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AssetService from 'src/services/asset';
import moment from 'moment';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Assets = ({ className, ...rest }) => {
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

  const countThisYear = num => {
    return asset.reduce(
      (counter, obj) =>
        moment(obj.purchaseDate).month() === num &&
        moment(obj.purchaseDate).year() === moment().year()
          ? (counter += 1)
          : counter,
      0
    );
  };

  const countLastYear = num => {
    return asset.reduce(
      (counter, obj) =>
        moment(obj.purchaseDate).month() === num &&
        moment(obj.purchaseDate).year() ===
          moment()
            .subtract(1, 'years')
            .year()
          ? (counter += 1)
          : counter,
      0
    );
  };

  useEffect(() => {
    getAssetAll();
  }, []);

  const datasetKeyProvider = () => {
    return btoa(Math.random()).substring(0, 12);
  };

  const data = {
    datasets: [
      {
        backgroundColor: colors.indigo[500],
        data: [
          countThisYear(0),
          countThisYear(1),
          countThisYear(2),
          countThisYear(3),
          countThisYear(4),
          countThisYear(5),
          countThisYear(6),
          countThisYear(7),
          countThisYear(8),
          countThisYear(9),
          countThisYear(10),
          countThisYear(11)
        ],
        label: 'Năm nay'
      },
      {
        backgroundColor: colors.grey[200],
        data: [
          countLastYear(0),
          countLastYear(1),
          countLastYear(2),
          countLastYear(3),
          countLastYear(4),
          countLastYear(5),
          countLastYear(6),
          countLastYear(7),
          countLastYear(8),
          countLastYear(9),
          countLastYear(10),
          countLastYear(11)
        ],
        label: 'Năm ngoái'
      },
      {
        barThickness: 12,
        maxBarThickness: 10,
        barPercentage: 0.5,
        categoryPercentage: 0.5
      }
    ],
    labels: [
      'Tháng 1',
      'Tháng 2',
      'Tháng 3',
      'Tháng 4',
      'Tháng 5',
      'Tháng 6',
      'Tháng 7',
      'Tháng 8',
      'Tháng 9',
      'Tháng 10',
      'Tháng 11',
      'Tháng 12'
    ]
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
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

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        action={
          <Button endIcon={<ArrowDropDownIcon />} size="small" variant="text">
            Last 7 days
          </Button>
        }
        title="Chênh lệch thiết bị"
      />
      <Divider />
      <CardContent>
        <Box height={400} position="relative">
          <Bar
            datasetKeyProvider={datasetKeyProvider}
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider />
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          Overview
        </Button>
      </Box>
    </Card>
  );
};

Assets.propTypes = {
  className: PropTypes.string
};

export default Assets;
