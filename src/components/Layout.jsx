import Sidebar from './Sidebar';
import { Grid, Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <Grid container >
      <Grid item sx={12} >
        <Header />
      </Grid>
      <Toolbar />
      
      <Grid item container>
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        
        <Grid item xs={10} >
        <Box sx={{paddingRight: 3}}>
            <Outlet />

          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Layout;
