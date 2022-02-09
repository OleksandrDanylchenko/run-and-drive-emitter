import React from 'react';
import { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';

const Routing: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path={'/login'} element={<Login />} />
      <Route path={'/'} element={<Dashboard />} />
      <Route element={<Navigate to="/" />} />
    </Routes>{' '}
  </BrowserRouter>
);

export default Routing;
