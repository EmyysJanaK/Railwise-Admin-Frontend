import React, { useEffect, useState } from 'react';
import { Box,Grid, Paper, Typography, CircularProgress } from '@mui/material';
import { PieChart, Pie, ResponsiveContainer, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid, Sector } from 'recharts';
import axios from 'axios';

const DashboardHome = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [revenueOverview, setRevenueOverview] = useState([]);
  const [classDistribution, setClassDistribution] = useState([]);

  useEffect(() => {
    // Fetch summary metrics from the API
    const fetchData = async () => {
      try {
        const revenueResponse = await axios.get('/api/admin/totalFare/all/yearly');
        const registrationsResponse = await axios.get('/api/admin/userRegistrations/yearly');
        const schedulesResponse = await axios.get('/api/admin/schedules');
        const revenueOverviewResponse = await axios.get('/api/admin/totalFare/all/monthly');
        const classDistributionResponse = await axios.get('/api/admin/bookingClassDistribution/all/yearly');

        setMetrics({
          totalRevenue: revenueResponse.data.fareBreakdown.reduce((acc, curr) => acc + curr.totalFare, 0),
          userRegistrations: registrationsResponse.data.registrationBreakdown.reduce((acc, curr) => acc + curr.registrations, 0),
          activeSchedules: schedulesResponse.data.schedules.length,
        });

        setRevenueOverview(revenueOverviewResponse.data.fareBreakdown.map(item => ({ period: item.period, totalFare: item.totalFare })));
        setClassDistribution([
          { name: 'First Class', value: classDistributionResponse.data.classDistribution.reduce((acc, curr) => acc + curr.first, 0), fill: '#8884d8' },
          { name: 'Second Class', value: classDistributionResponse.data.classDistribution.reduce((acc, curr) => acc + curr.second, 0), fill: '#82ca9d' },
          { name: 'Third Class', value: classDistributionResponse.data.classDistribution.reduce((acc, curr) => acc + curr.third, 0), fill: '#ffc658' },
        ]);
      } catch (error) {
        console.error('Error fetching metrics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Box display="flex" justifyContent="center" alignItems="center" height={300}>
    <CircularProgress />
      </Box>;
  }

  return (
    <Grid container spacing={3}>
      {/* Metrics Cards */}
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} style={{ padding: '16px' }}>
          <Typography variant="h6">Total Revenue</Typography>
          <Typography variant="h4">${metrics.totalRevenue}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} style={{ padding: '16px' }}>
          <Typography variant="h6">User Registrations</Typography>
          <Typography variant="h4">{metrics.userRegistrations}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} style={{ padding: '16px' }}>
          <Typography variant="h6">Active Schedules</Typography>
          <Typography variant="h4">{metrics.activeSchedules}</Typography>
        </Paper>
      </Grid>

      {/* Revenue Overview Chart */}
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: '16px' }}>
          <Typography variant="h6">Revenue Overview</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={revenueOverview}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="totalFare" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      {/* Class Distribution Chart */}
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: '16px' }}>
          <Typography variant="h6">Class Distribution</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={classDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
                nameKey="name"
                label
              >
                {classDistribution.map((entry, index) => (
                  <Sector key={`sector-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default DashboardHome;