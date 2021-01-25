import React from 'react';
import PropTypes from 'prop-types';
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Checkbox
} from '@material-ui/core';

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Tên'
  },
  { id: 'address', disablePadding: false, label: 'Địa chỉ' },
  { id: 'assets', disablePadding: false, label: 'Tài sản' },
  { id: 'city', disablePadding: false, label: 'Thành phố' },
  { id: 'state', disablePadding: false, label: 'Tỉnh' },
  { id: 'user', disablePadding: false, label: 'Người quản lý' },
  { id: 'createAt', disablePadding: false, label: 'Ngày nhập' },
  { id: '', disablePadding: false, label: 'Actions' }
];

const EnhancedTableHead = props => {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all assets' }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

export default EnhancedTableHead;
