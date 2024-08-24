import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import axios from "axios";
import LineChartModal from './LineChartModal'; 
import useFetchData from '../../hooks/useFetchData';

const CancellationRatesLineChart = () => {
    const [timeFrame, setTimeFrame] = useState('monthly');
    const [scheduleId, setScheduleId] = useState('all');

    const {data, loading, error} = useFetchData(`/api/admin/bookingClassDistribution/${scheduleId}/${timeFrame}`, [timeFrame, scheduleId]);
    if (loading) {
        return <Typography variant="h6">Loading...</Typography>;
    }

    if (error) {
        return <Typography variant="h6">Error fetching data: {error.message}</Typography>;
    }

    return (
        <Box>
            {data.length === 0 ? (
                <Typography variant="h6">No data available</Typography>
            ) : (
                <LineChartModal
                    data={data.classDistribution}
                    XaxisLabel="Period"
                    YaxisLabel="Number of Bookings"
                    title="Booking Class Distribution"
                    allowDecimals={false}
                    dataKeys={["first", "second", "third"]}
                    showScheduleSelector={true}  
                    onTimeFrameChange={setTimeFrame}  
                    onScheduleIdChange={setScheduleId}  
                />
            )}
        </Box>
    );
};

export default CancellationRatesLineChart;
