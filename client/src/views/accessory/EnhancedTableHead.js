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
  { id: 'image', disablePadding: false, label: 'Hình minh họa' },
  { id: 'manufacturer', disablePadding: false, label: 'Nhà sản xuất' },
  { id: 'model', disablePadding: false, label: 'Model' },
  { id: 'supplier', disablePadding: false, label: 'Nhà cung cấp' },
  { id: 'location', disablePadding: false, label: 'Địa điểm' },
  { id: 'purchaseDate', disablePadding: false, label: 'Ngày mua' },
  { id: 'purchaseCost', disablePadding: false, label: 'Giá mua' },
  { id: 'quantity', disablePadding: false, label: ' Tổng số lượng' },
  { id: 'availableQTY', disablePadding: false, label: 'Số lượng còn lại' },
  { id: 'createAt', disablePadding: false, label: 'Ngày nhập' },
  { id: 'check', disablePadding: false, label: 'Check' },
  { id: '', disablePadding: false, label: 'Actions' }
];

const EnhancedTableHead = (props) => {
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
            inputProps={{ 'aria-label': 'select all accessories' }}
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
}

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