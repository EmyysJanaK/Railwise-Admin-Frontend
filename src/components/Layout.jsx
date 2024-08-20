// src/components/Layout.jsx
import React from 'react';
import Sidebar from './Sidebar';
import { Grid, Box } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar /> 
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <main className="flex-grow">{children}</main>
      </Box>

    </Box>
  );
};

export default Layout;