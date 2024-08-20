import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

const COLORS = ['#0088FE', '#00C49F'];

const BookingSourcePieChart = () => {
  const [timeFrame, setTimeFrame] = useState('monthly');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Replace with your API call
      const response = await fetch(`/api/admin/bookingsource/${timeFrame}`);
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, [timeFrame]);

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
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="source"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default BookingSourcePieChart;
