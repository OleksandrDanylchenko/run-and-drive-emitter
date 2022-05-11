import { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { ProtectedRoute } from 'run-and-drive-lib/router';

import Dashboard from '@pages/Dashboard';
import Home from '@pages/Home';
import Register from '@pages/Register';
import Settings from '@pages/Settings';
import { useAppSelector } from '@redux/hooks';
import { selectAuthData } from '@redux/selectors/authentication_selectors';

const Routing: FC = () => {
  const authData = useAppSelector(selectAuthData);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute isAllowed={!authData} redirectPath="/" />}>
          <Route path="/register" element={<Register />} />
        </Route>
        <Route
          element={<ProtectedRoute isAllowed={!!authData} redirectPath="/register" />}>
          <Route path="/" element={<Home />}>
            <Route index element={<Dashboard />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
        <Route element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
