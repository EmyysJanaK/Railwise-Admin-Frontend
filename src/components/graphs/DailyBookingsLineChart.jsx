import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

const DailyBookingsLineChart = ({ scheduleId }) => {
  const [timeFrame, setTimeFrame] = useState('monthly');
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data based on selected timeframe and scheduleId
    const fetchData = async () => {
      // Replace with your API call
      const response = await fetch(`/api/admin/bookingsCount/approved/${scheduleId}/${timeFrame}`);
      const result = await response.json();
      setData(result.bookingsBreakdown);
    };

    fetchData();
  }, [timeFrame, scheduleId]);

  const handleTimeFrameChange = (event) => {
    setTimeFrame(event.target.value);
  };

  return (
    <Box>
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel id="timeframe-select-label">Timeframe</InputLabel>
        <Select
          labelId="timeframe-select-label"
          value={timeFrame}
          label="Timeframe"
          onChange={handleTimeFrameChange}
        >
          <MenuItem value="yearly">Yearly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
          <MenuItem value="weekly">Weekly</MenuItem>
        </Select>
      </FormControl>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="period" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default DailyBookingsLineChart;
