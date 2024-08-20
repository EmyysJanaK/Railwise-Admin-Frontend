import React from 'react';
import { Grid, Box } from '@mui/material';
import Sidebar from './Sidebar'; 
// import BookingSourcePieChart from './graphs/BookingSourcePieChart';
// import DailyBookingsLineChart from './graphs/DailyBookingsLineChart';
// import RevenueTrendsLineChart from './graphs/RevenueTrendsLineChart';
// import UserRegistrationTrendsLineChart from './graphs/UserRegistrationTrendsLineChart';
// import BookingClassDistributionLineChart from './graphs/BookingClassDistributionLineChart';
// import CancellationRatesLineChart from './graphs/CancellationRatesLineChart';

const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <BookingSourcePieChart scheduleId="all" />
          </Grid>
          <Grid item xs={12} md={6}>
            <DailyBookingsLineChart scheduleId="all" />
          </Grid>
          <Grid item xs={12} md={6}>
            <RevenueTrendsLineChart scheduleId="all" />
          </Grid>
          <Grid item xs={12} md={6}>
            <UserRegistrationTrendsLineChart />
          </Grid>
          <Grid item xs={12} md={6}>
            <BookingClassDistributionLineChart scheduleId="all" />
          </Grid>
          <Grid item xs={12} md={6}>
            <CancellationRatesLineChart scheduleId="all" />
          </Grid>
        </Grid> */}
      </Box>
    </Box>
  );
};

export default Dashboard;
