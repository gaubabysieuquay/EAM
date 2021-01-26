import React, { useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Button,
  ListItem,
  Collapse,
  List,
  makeStyles
} from '@material-ui/core';
import { ExpandMore, ExpandLess } from '@material-ui/icons';
const useStyles = makeStyles(theme => ({
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: 'flex-start',
    letterSpacing: 0,
    padding: '10px 8px',
    textTransform: 'none',
    width: '100%'
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  title: {
    marginRight: 'auto'
  },
  active: {
    color: theme.palette.primary.main,
    '& $title': {
      fontWeight: theme.typography.fontWeightMedium
    },
    '& $icon': {
      color: theme.palette.primary.main
    }
  }
}));

const NavItem = ({
  className,
  href,
  icon: Icon,
  title,
  expand,
  reportItems,
  ...rest
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <ListItem
        className={clsx(classes.item, className)}
        disableGutters
        onClick={handleClick}
        {...rest}
      >
        <Button
          activeClassName={classes.active}
          className={classes.button}
          component={RouterLink}
          to={href}
        >
          {Icon && <Icon className={classes.icon} size="20" />}
          <span className={classes.title}>{title}</span>
        </Button>
        {expand === true && (open ? <ExpandLess /> : <ExpandMore />)}
      </ListItem>
      {expand === true && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {reportItems.map((items, i) => (
              <ListItem className={clsx(classes.item, className)} key={i}>
                <Button
                  activeClassName={classes.active}
                  className={classes.button}
                  component={RouterLink}
                  to={items.href}
                >
                  <span className={classes.title}>{items.title}</span>
                </Button>
              </ListItem>
            ))}
          </List>
        </Collapse>
      )}
    </div>
  );
};

NavItem.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string
};

export default NavItem;
