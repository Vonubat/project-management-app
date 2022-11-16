import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import ToastBox from './ToastBox';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ToastBox />
    </>
  );
};

export default Layout;
