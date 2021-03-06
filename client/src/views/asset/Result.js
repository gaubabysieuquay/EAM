import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  colors,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  FormControlLabel,
  Switch,
  makeStyles
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import Form from './FormEdit';
import FormCheck from './FormCheck';
import TabDialog from 'src/components/Tab';
import HistoryListView from './asset_history/index';

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
};

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
  const [orderBy, setOrderBy] = useState('name');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openEdit, setOpenEdit] = useState(false);
  const [openCheck, setOpenCheck] = useState(false);
  const [assetId, setAssetId] = useState();

  const handleClickOpenEdit = id => {
    setOpenEdit(true);
    setAssetId(id);
  };

  const handleClickOpenCheck = id => {
    setOpenCheck(true);
    setAssetId(id);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleCloseCheck = () => {
    setOpenCheck(false);
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
        return (
          <Chip
            style={{ backgroundColor: colors.lightGreen[400] }}
            label="Sẵn sàng"
          />
        );
      case 2:
        return (
          <Chip
            style={{ backgroundColor: colors.yellow[300] }}
            label="Chờ duyệt"
          />
        );
      case 3:
        return (
          <Chip
            style={{ backgroundColor: colors.red[400] }}
            label="Không sẵn sàng"
          />
        );
      case 5:
        return (
          <Chip
            style={{ backgroundColor: colors.lightBlue[400] }}
            label="Lưu trữ"
          />
        );
      default:
        return (
          <Chip
            style={{ backgroundColor: colors.purple[200] }}
            label="Chưa cập nhật"
          />
        );
    }
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <EnhancedTableToolbar
        numSelected={selected.length}
        deleteAllAsset={deleteAllAsset}
      />
      <TableContainer>
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
                      <TableCell>{asset.barcode}</TableCell>
                      <TableCell>{asset.serial}</TableCell>
                      <TableCell>{asset.model}</TableCell>
                      <TableCell>{asset.Supplier.name || ''}</TableCell>
                      <TableCell>{asset.Location.name || ''}</TableCell>
                      <TableCell>
                        {moment(asset.purchaseDate).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell>{asset.purchaseCost}</TableCell>
                      <TableCell>{statusInfo(asset.status)}</TableCell>
                      <TableCell>
                        {moment(asset.expireDate).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          style={{ backgroundColor: colors.green[300] }}
                          onClick={() => handleClickOpenCheck(asset.id)}
                        >
                          Check
                        </Button>
                        <Dialog
                          open={openCheck}
                          onClose={handleCloseCheck}
                          aria-labelledby="form-dialog-title"
                        >
                          <DialogTitle id="form-dialog-title">
                            Check
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText>
                              Vui lòng điền các thông tin sau!
                            </DialogContentText>
                            <FormCheck
                              id={assetId}
                              onUpdate={onUpdate}
                              handleClose={handleCloseCheck}
                            />
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="delete"
                          size="small"
                          style={{ color: colors.red[500] }}
                          onClick={() => deleteAsset(asset.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          aria-label="edit"
                          size="small"
                          onClick={() => handleClickOpenEdit(asset.id)}
                        >
                          <EditIcon />
                        </IconButton>
                        <Dialog
                          open={openEdit}
                          onClose={handleCloseEdit}
                          maxWidth="md"
                          aria-labelledby="form-dialog-title"
                        >
                          <DialogTitle id="form-dialog-title">
                            Chỉnh sửa tài sản
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText>
                              Vui lòng điền các thông tin sau!
                            </DialogContentText>
                            <TabDialog
                              titleOne="Thông tin tài sản"
                              itemOne={
                                <Form
                                  id={assetId}
                                  onUpdate={onUpdate}
                                  handleClose={handleCloseEdit}
                                />
                              }
                              titleTwo="Lịch sử lưu trữ"
                              itemTwo={<HistoryListView id={assetId} />}
                            />
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
      </TableContainer>
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
