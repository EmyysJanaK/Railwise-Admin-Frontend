import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import axios from "axios";
import LineChartModal from './LineChartModal';

const CancellationRatesLineChart = ({ status }) => {
    const [data, setData] = useState([]);
    const [timeFrame, setTimeFrame] = useState('monthly');
    const [scheduleId, setScheduleId] = useState('all');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/admin/bookingsCount/${status}/${scheduleId}/${timeFrame}`);
                const result = response.data.bookingsBreakdown;
                console.log(result);
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [timeFrame, scheduleId, status]);  // Fetch data when timeFrame, scheduleId, or status changes

    return (
        <Box>
            {data.length === 0 ? (
                <Typography variant="h6">No data available</Typography>
            ) : (
                <LineChartModal
                    data={data}
                    XaxisLabel="Period"
                    YaxisLabel="Total Bookings"
                    title={`${status.charAt(0).toUpperCase() + status.slice(1)} Bookings`}
                    allowDecimals={false}
                    dataKeys={["count"]}
                    onTimeFrameChange={setTimeFrame}  
                    onScheduleIdChange={setScheduleId} 
                />
            )}
        </Box>
    );
};

export default CancellationRatesLineChart;
