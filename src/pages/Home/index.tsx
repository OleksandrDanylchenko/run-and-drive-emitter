import Header from '@components/Header';
import HideOnScroll from '@components/HideOnScroll';
import Toolbar from '@mui/material/Toolbar';
import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

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
