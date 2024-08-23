import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import axios from "axios";
import LineChartModal from './LineChartModal';  // Assume the modal is correctly imported

const CancellationRatesLineChart = () => {
    const [timeFrame, setTimeFrame] = useState('monthly');
    const [scheduleId, setScheduleId] = useState('all');
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/admin/bookingClassDistribution/${scheduleId}/${timeFrame}`);
                const result = response.data.classDistribution;
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [timeFrame, scheduleId]);

    return (
        <Box>
            {data.length === 0 ? (
                <Typography variant="h6">No data available</Typography>
            ) : (
                <LineChartModal
                    data={data}
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
