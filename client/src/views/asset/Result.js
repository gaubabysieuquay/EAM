import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Tooltip,
  Toolbar,
  lighten,
  makeStyles
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FilterListIcon from '@material-ui/icons/FilterList';

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
const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  title: {
    flex: '1 1 100%'
  }
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          Đã chọn {numSelected} tài sản
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Danh sách tài sản
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};
const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, assets, ...rest }) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('barcode');
  const [selected, setSelected] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    let newSelected;

    if (event.target.checked) {
      newSelected = assets.map(asset => asset.id);
    } else {
      newSelected = [];
    }

    setSelected(newSelected);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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

  const handleLimitChange = event => {
    setLimit(event.target.value);
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const deleteIcon = (
    <IconButton aria-label="delete">
      <DeleteIcon />
    </IconButton>
  );

  const editIcon = (
    <IconButton aria-label="edit">
      <EditIcon />
    </IconButton>
  );

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <EnhancedTableToolbar numSelected={selected.length} />
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selected.length === assets.length}
                    color="primary"
                    indeterminate={
                      selected.length > 0 && selected.length < assets.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Tên tài sản</TableCell>
                <TableCell>Hình minh họa</TableCell>
                <TableCell>Tag tài sản</TableCell>
                <TableCell>Serial</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Danh mục</TableCell>
                <TableCell>Người sở hữu</TableCell>
                <TableCell>Địa điểm</TableCell>
                <TableCell>Ngày mua</TableCell>
                <TableCell>Giá mua</TableCell>
                <TableCell>Xuất/Nhập</TableCell>
                <TableCell>Ngày nhập</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assets.slice(page * limit, page * limit + limit).map(asset => (
                <TableRow
                  hover
                  key={asset.id}
                  selected={selected.indexOf(asset.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selected.indexOf(asset.id) !== -1}
                      onChange={event => handleSelectOne(event, asset.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box alignItems="center" display="flex">
                      {/*<Avatar
                        className={classes.avatar}
                        src={asset.avatarUrl}
                      >
                        {getInitials(asset.name)}
                    </Avatar>*/}
                      <Typography color="textPrimary" variant="body1">
                        {asset.name}
                      </Typography>
                    </Box>
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
                  <TableCell>Xuất/Nhập</TableCell>
                  <TableCell>
                    {moment(asset.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    {deleteIcon}
                    {editIcon}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={assets.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  assets: PropTypes.array.isRequired
};

export default Results;
