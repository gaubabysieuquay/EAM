import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';
import SettingsView from 'src/views/settings/SettingsView';
import UserView from 'src/views/user';
import AssetView from 'src/views/asset';
import AccessoryView from 'src/views/accessory';
import Login from 'src/views/auth/Login';
import Register from 'src/views/auth/Register';
import SupplierView from 'src/views/supplier';
import LocationView from 'src/views/location';
import ManufacturerView from 'src/views/manufacturer';
import LicenseView from 'src/views/license';
import ReportLicenseView from 'src/views/activity/license';
import ReportAssetView from 'src/views/activity/asset';
import ReportAccessoryView from 'src/views/activity/accessory';

const routes = isLoggedIn => [
  {
    path: 'app',
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'customers', element: <CustomerListView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'products', element: <ProductListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: 'users', element: <UserView /> },
      { path: 'assets', element: <AssetView /> },
      { path: 'accessories', element: <AccessoryView /> },
      { path: 'suppliers', element: <SupplierView /> },
      { path: 'locations', element: <LocationView /> },
      { path: 'manufacturers', element: <ManufacturerView /> },
      { path: 'licenses', element: <LicenseView /> },
      { path: 'reports/licenses', element: <ReportLicenseView /> },
      { path: 'reports/assets', element: <ReportAssetView /> },
      { path: 'reports/accessories', element: <ReportAccessoryView /> },
      { path: '*', element: <Navigate to="/404" /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> }
    ]
  },
  {
    path: '/',
    element: !isLoggedIn ? <MainLayout /> : <Navigate to="/app/dashboard" />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/login" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
