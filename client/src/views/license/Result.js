import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  Checkbox,
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
  licenses,
  deleteAllLicense,
  deleteLicense,
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
  const [open, setOpen] = useState(false);
  const [licenseId, setLicenseId] = useState();

  const handleClickOpen = id => {
    setOpen(true);
    setLicenseId(id);
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
      newSelected = licenses.map(license => license.id);
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
    rowsPerPage - Math.min(rowsPerPage, licenses.length - page * rowsPerPage);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <EnhancedTableToolbar
        numSelected={selected.length}
        deleteAllLicense={deleteAllLicense}
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
              rowCount={licenses.length}
            />
            <TableBody>
              {stableSort(licenses, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((license, index) => {
                  const isItemSelected = isSelected(license.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, license.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={license.id}
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
                        {license.name}
                      </TableCell>
                      <TableCell>{license.Manufacturer.name || ''}</TableCell>
                      <TableCell>{license.Supplier.name || ''}</TableCell>
                      <TableCell>{license.productKey}</TableCell>
                      <TableCell>
                        {moment(license.purchaseDate).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell>{license.purchaseCost}</TableCell>
                      <TableCell>
                        {moment(license.expireDate).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell>
                        {moment(license.createdAt).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="delete"
                          size="small"
                          style={{ color: colors.red[500] }}
                          onClick={() => deleteLicense(license.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          aria-label="edit"
                          size="small"
                          onClick={() => handleClickOpen(license.id)}
                        >
                          <EditIcon />
                        </IconButton>
                        <Dialog
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="form-dialog-title"
                        >
                          <DialogTitle id="form-dialog-title">
                            Chỉnh sửa linh kiện
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText>
                              Vui lòng điền các thông tin sau!
                            </DialogContentText>
                            <Form
                              id={licenseId}
                              onUpdate={onUpdate}
                              handleClose={handleClose}
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
        count={licenses.length}
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
  licenses: PropTypes.array.isRequired
};

export default Results;
