import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
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
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AssetService from 'src/services/asset';

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const Warranty = ({ className, ...rest }) => {
  const classes = useStyles();
  const [warranty, setWarranty] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const getWarranty = () => {
    AssetService.getExpireDate()
      .then(response => {
        setWarranty(response.data);
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
    getWarranty();
  }, []);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Thiết bị cần bảo trì hôm nay" />
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
              </TableRow>
            </TableHead>
            <TableBody>
              {warranty.map(warranties => (
                <TableRow hover key={warranties.id}>
                  <TableCell>{warranties.name}</TableCell>
                  <TableCell>''</TableCell>
                  <TableCell>
                    {moment(warranties.purchaseDate).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    {moment(warranties.warranty).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>{warranties.barcode}</TableCell>
                  <TableCell>{warranties.serial}</TableCell>
                  <TableCell>{warranties.model}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={warranty.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Card>
  );
};

Warranty.propTypes = {
  className: PropTypes.string
};

export default Warranty;
