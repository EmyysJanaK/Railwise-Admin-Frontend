import React from 'react';
import { Grid, Box } from '@mui/material';
import RevenueTrendsLineChart from '../components/graphs/RevenueTrendsLineChart';

const Revenue = () => {
    return (
        <Box sx={{ display: 'flex' }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
                <RevenueTrendsLineChart scheduleId="all" />
            </Grid>
            </Grid>
        </Box>
        </Box>
    );
}
export default Revenue;