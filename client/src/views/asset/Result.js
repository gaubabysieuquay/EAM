import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  FormControlLabel,
  Switch,
  makeStyles
} from '@material-ui/core';
import Alert from "@material-ui/lab/Alert";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { red } from '@material-ui/core/colors';
import moment from 'moment';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import Form from './FormEdit';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  }
}));

const Results = ({
  className,
  assets,
  deleteAllAsset,
  deleteAsset,
  onUpdate,
  ...rest
}) => {
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [assetId, setAssetId] = useState();

  const handleClickOpen = id => {
    setOpen(true);
    setAssetId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    let newSelected;

    if (event.target.checked) {
      newSelected = assets.map(asset => asset.id);
    } else {
      newSelected = [];
    }

    setSelected(newSelected);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = event => {
    setDense(event.target.checked);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, assets.length - page * rowsPerPage);

  const statusInfo = value => {
    switch (value) {
      case 1:
        return <Alert severity="success">Sẵn sàng</Alert>;
      case 2:
        return <Alert severity="warning">Chờ duyệt</Alert>;
      case 3:
        return <Alert severity="error">Không sẵn sàng</Alert>;
      case 4:
        return <Alert severity="info">Lưu trữ</Alert>;
      default:
        break;
    }
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <EnhancedTableToolbar
          numSelected={selected.length}
          deleteAllAsset={deleteAllAsset}
        />
        <Box minWidth={1050}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={assets.length}
            />
            <TableBody>
              {stableSort(assets, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((asset, index) => {
                  const isItemSelected = isSelected(asset.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, asset.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={asset.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {asset.name}
                      </TableCell>
                      <TableCell>{asset.image}</TableCell>
                      <TableCell>{asset.barcode}</TableCell>
                      <TableCell>{asset.serial}</TableCell>
                      <TableCell>{asset.model}</TableCell>
                      <TableCell>Danh mục</TableCell>
                      <TableCell>{asset.supplier}</TableCell>
                      <TableCell>Địa điểm</TableCell>
                      <TableCell>
                        {moment(asset.purchaseDate).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell>{asset.purchaseCost}</TableCell>
                      <TableCell>{statusInfo(asset.status)}</TableCell>
                      <TableCell>
                        {moment(asset.createdAt).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="delete"
                          size="small"
                          style={{ color: red[500] }}
                          onClick={() => deleteAsset(asset.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          aria-label="edit"
                          size="small"
                          onClick={() => handleClickOpen(asset.id)}
                        >
                          <EditIcon />
                        </IconButton>
                        <Dialog
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="form-dialog-title"
                        >
                          <DialogTitle id="form-dialog-title">
                            Chỉnh sửa tài sản
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText>
                              Vui lòng điền các thông tin sau!
                            </DialogContentText>
                            <Form id={assetId} />
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={14} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={assets.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Card>
  );
};
Results.propTypes = {
  className: PropTypes.string,
  assets: PropTypes.array.isRequired
};

export default Results;
