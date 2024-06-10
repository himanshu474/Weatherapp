import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = ({ theme, setTheme }) => {
  return (
    <>
      <Header theme={theme} setTheme={setTheme}/>
      <Outlet />
    </>
  );
};

export { Layout };
