import Dashboard from '@pages/Dashboard';
import Home from '@pages/Home';
import Login from '@pages/Login';
import Settings from '@pages/Settings';
import React, { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const Routing: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />}>
        <Route index element={<Dashboard />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>
);

export default Routing;
