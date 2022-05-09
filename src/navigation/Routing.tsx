import Dashboard from '@pages/Dashboard';
import Home from '@pages/Home';
import Register from '@pages/Register';
import Settings from '@pages/Settings';
import { createBrowserHistory } from 'history';
import { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const Routing: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />}>
        <Route index element={<Dashboard />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>
);

export const history = createBrowserHistory();

export default Routing;
