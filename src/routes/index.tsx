import React from 'react';
import { Routes, Route } from 'react-router-dom';

import App from 'modules/app/';
import Home from 'modules/home';

const AppRoutes = () => (
  <Routes>
    <Route element={<App />}>
      <Route path="/" element={<Home />} />
    </Route>
  </Routes>
);

export default AppRoutes;
