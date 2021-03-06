import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  Box,
  colors,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableContainer,
  TablePagination,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  makeStyles
} from '@material-ui/core';
import AssetService from 'src/services/asset';

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const BrokenAsset = ({ className, ...rest }) => {
  const classes = useStyles();
  const [brokenAsset, setBrokenAsset] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const statusInfo = value => {
    switch (value) {
      case 1:
        return <Chip style={{backgroundColor: colors.lightGreen[400]}} label='Sẵn sàng'/>;
      case 2:
        return <Chip style={{backgroundColor: colors.yellow[300]}} label='Chờ duyệt'/>;
      case 3:
        return <Chip style={{backgroundColor: colors.red[400]}} label='Không sẵn sàng'/>;
      case 4:
        return <Chip style={{backgroundColor: colors.lightBlue[400]}} label='Lưu trữ'/>;
      default:
        return <Chip style={{backgroundColor: colors.purple[200]}} label='Chưa cập nhật'/>;
    }
  };

  const updateAsset = (id, data) => {
    AssetService.update(id, data)
      .then(response => {
        getBrokenAsset();
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getBrokenAsset = () => {
    AssetService.getAllBrokenAsset()
      .then(response => {
        setBrokenAsset(response.data);
      })
      .catch(err => console.log(err));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    getBrokenAsset();
  }, []);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Thiết bị hư hỏng trong hệ thống" />
      <Divider />
      <TableContainer>
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tên</TableCell>
                <TableCell>Hình minh họa</TableCell>
                <TableCell sortDirection="desc">
                  <Tooltip enterDelay={300} title="Sort">
                    <TableSortLabel active direction="desc">
                      Ngày mua
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>Ngày bảo hành</TableCell>
                <TableCell>Barcode</TableCell>
                <TableCell>Serial</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Tình trạng</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {brokenAsset.map(brokenAssets => (
                <TableRow hover key={brokenAssets.id}>
                  <TableCell>{brokenAssets.name}</TableCell>
                  <TableCell>''</TableCell>
                  <TableCell>
                    {moment(brokenAssets.purchaseDate).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    {moment(brokenAssets.expireDate).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>{brokenAssets.barcode}</TableCell>
                  <TableCell>{brokenAssets.serial}</TableCell>
                  <TableCell>{brokenAssets.model}</TableCell>
                  <TableCell>{statusInfo(brokenAssets.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={brokenAsset.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Card>
  );
};

BrokenAsset.propTypes = {
  className: PropTypes.string
};

export default BrokenAsset;
