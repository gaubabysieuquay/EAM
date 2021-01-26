import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  Keyboard,
  Room,
  Person,
  People,
  Settings,
  WebAsset,
  AssignmentReturned,
  BarChart,
  LocalMall,
  Business,
  Save,
  Assignment,
} from '@material-ui/icons';
import NavItem from './NavItem';
import AuthService from 'src/services/auth';

const users = {
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'Junior Developer'
};

const items = [
  {
    href: '/app/dashboard',
    icon: BarChart,
    title: 'Dashboard',
    role: ''
  },
  {
    href: '/app/account',
    icon: Person,
    title: 'Account',
    role: ''
  },
  {
    href: '/app/users',
    icon: People,
    title: 'Người dùng',
    role: 'moderator'
  },
  {
    href: '/app/assets',
    icon: WebAsset,
    title: 'Quản lý thiết bị',
    role: ''
  },
  {
    href: '/app/accessories',
    icon: Keyboard,
    title: 'Quản lý linh kiện',
    role: ''
  },
  {
    href: '/app/licenses',
    icon: Save,
    title: 'Quản lý bản quyền phần mềm',
    role: ''
  },
  {
    href: '/app/manufacturers',
    icon: Business,
    title: 'Nhà sản xuất',
    role: 'moderator'
  },
  {
    href: '/app/suppliers',
    icon: AssignmentReturned,
    title: 'Nhà cung cấp',
    role: 'moderator'
  },
  {
    href: '/app/locations',
    icon: Room,
    title: 'Địa điểm',
    role: 'moderator'
  },
  {
    href: '/app/reports',
    icon: Assignment,
    title: 'Báo cáo',
    role: 'moderator',
    expand: true
  }
];

const reportItems = [
  {
    href: '/app/reports/assets',
    title: 'Lưu trữ thiết bị',
  },
  {
    href: '/app/reports/accessories',
    title: 'Lưu trữ linh kiện',
  },
  {
    href: '/app/reports/licenses',
    title: 'Lưu trữ bản quyền',
  },
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes('ROLE_MODERATOR'));
      setShowAdminBoard(user.roles.includes('ROLE_ADMIN'));
    }
  }, []);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={users.avatar}
          to="/app/account"
        />
        {currentUser && (
          <Typography className={classes.name} color="textPrimary" variant="h5">
            {currentUser.username}
          </Typography>
        )}
        <Typography color="textSecondary" variant="body2">
          {users.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items
            .filter(item => item.role !== 'moderator')
            .map(item => (
              <NavItem
                href={item.href}
                key={item.title}
                title={item.title}
                icon={item.icon}
                expand={item.expand}
              />
            ))}
          {showModeratorBoard &&
            items
              .filter(item => item.role === 'moderator')
              .map(item => (
                <NavItem
                  href={item.href}
                  key={item.title}
                  title={item.title}
                  icon={item.icon}
                  expand={item.expand}
                  reportItems={reportItems}
                />
              ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
