import React from 'react';
import PropTypes from 'prop-types';
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
} from '@material-ui/core';

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Tên'
  },
  { id: 'manufacturer', disablePadding: false, label: 'Nhà sản xuất' },
  { id: 'supplier', disablePadding: false, label: 'Nhà cung cấp' },
  { id: 'productKey', disablePadding: false, label: 'Key bản quyền' },
  { id: 'purchaseDate', disablePadding: false, label: 'Ngày mua' },
  { id: 'purchaseCost', disablePadding: false, label: 'Giá mua' },
  { id: 'expireDate', disablePadding: false, label: 'Ngày hết hạn' },
  { id: 'createAt', disablePadding: false, label: 'Ngày nhập' },
];

const EnhancedTableHead = (props) => {
  const {
    classes,
    order,
    orderBy,
    onRequestSort
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
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
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

export default EnhancedTableHead;