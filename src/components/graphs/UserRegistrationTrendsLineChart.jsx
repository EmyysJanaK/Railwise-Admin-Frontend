import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import axios from "axios";

const CancellationRatesLineChart = () => {
  const [timeFrame, setTimeFrame] = useState('monthly');
  const [schedules, setSchedules] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/admin/userRegistrations/${timeFrame}`);
        const result = response.data.registrationBreakdown;
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [timeFrame]);


  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get("/api/admin/schedules");
        setSchedules(response.data.schedules);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };
    fetchSchedules();
  }, []);

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
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
          <MenuItem value="yearly">Yearly</MenuItem>
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
          <Line type="monotone" dataKey="registrations" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default CancellationRatesLineChart;
