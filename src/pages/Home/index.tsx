import Header from '@components/Header';
import Toolbar from '@mui/material/Toolbar';
import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { HideOnScroll } from 'run-and-drive-lib';

const Home: FC = () => {
  return (
    <>
      <HideOnScroll scrollTriggerProps={{ threshold: 50 }}>
        <Header />
      </HideOnScroll>
      <Toolbar id="back-to-top-anchor" />
      <Outlet />
    </>
  );
};

export default Home;
