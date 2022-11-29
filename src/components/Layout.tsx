import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from 'hooks/typedHooks';
import { notificationSelector } from 'store/notificationSlice';

import Footer from './Footer';
import Header from './Header';
import Loader from './Loader';
import ToastBox from './ToastBox';

const Layout = () => {
  const { isLoading } = useAppSelector(notificationSelector);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ToastBox />
      {isLoading && <Loader />}
    </>
  );
};

export default Layout;
