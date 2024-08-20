import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const DateRangeSelector = ({ onDateRangeChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (endDate) {
      onDateRangeChange([date, endDate]);
    }
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    if (startDate) {
      onDateRangeChange([startDate, date]);
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
      <DatePicker
        label="Start Date"
        value={startDate}
        onChange={handleStartDateChange}
        renderInput={(params) => <TextField {...params} />}
      />
      <DatePicker
        label="End Date"
        value={endDate}
        onChange={handleEndDateChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </Box>
  );
};

export default DateRangeSelector;
