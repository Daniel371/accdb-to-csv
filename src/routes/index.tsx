import React from 'react';
import { Routes, Route } from 'react-router-dom';

import App from 'modules/app/';
import Home from 'modules/home';
import DatabasePreview from 'modules/db-overview';
import TablePreview from 'modules/table-preview';

const AppRoutes = () => (
  <Routes>
    <Route element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/database" element={<DatabasePreview />} />
      <Route path="/database/table-preview" element={<TablePreview />} />
    </Route>
  </Routes>
);

export default AppRoutes;
