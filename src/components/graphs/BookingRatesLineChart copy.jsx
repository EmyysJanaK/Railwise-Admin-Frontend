import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { format, parseISO } from 'date-fns';
import groupBy from 'lodash/groupBy';
import axios from "axios";

const CancellationRatesLineChart = ({status}) => {
  const [timeFrame, setTimeFrame] = useState('monthly');
  const [scheduleId, setScheduleId] = useState('all');
  const [schedules, setSchedules] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/admin/bookings/${status}/${scheduleId}`);
        const result = response.data.approvedBookings;
        // const cancellations = result.approvedBookings.filter(booking => booking.status === 'cancelled');
        // const formattedData = transformData(cancellations, timeFrame);
        const formattedData = transformData(result, timeFrame);
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [timeFrame, scheduleId, status]);


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

  const transformData = (cancellations, timeFrame) => {
    let groupedData = [];

    if (timeFrame === 'daily') {
      groupedData = groupBy(cancellations, booking => format(parseISO(booking.date), 'yyyy-MM-dd'));
    } else if (timeFrame === 'monthly') {
      groupedData = groupBy(cancellations, booking => format(parseISO(booking.date), 'yyyy-MM')); 
    } else if (timeFrame === 'yearly') {
      groupedData = groupBy(cancellations, booking => format(parseISO(booking.date), 'yyyy'));
    }

    return Object.keys(groupedData).map(period => ({
      period,
      count: groupedData[period].length,
    }));
  };

  const handleTimeFrameChange = (event) => {
    setTimeFrame(event.target.value);
  };

  const handleScheduleIdChange = (event) => {
    setScheduleId(event.target.value);
  };

  return (
    <Box>
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel id="schedule-select-label">Schedule</InputLabel>
        <Select
          labelId="schedule-select-label"
          value={scheduleId}
          label="Schedule"
          onChange={handleScheduleIdChange}
        >
          {/* Render your schedule options here */}
          <MenuItem value="all">All</MenuItem>
          {schedules.map(schedule => (
            <MenuItem key={schedule._id} value={schedule._id}>{schedule.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel id="timeframe-select-label">Timeframe</InputLabel>
        <Select
          labelId="timeframe-select-label"
          value={timeFrame}
          label="Timeframe"
          onChange={handleTimeFrameChange}
        >
          <MenuItem value="daily">Daily</MenuItem>
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
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default CancellationRatesLineChart;
