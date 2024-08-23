import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import axios from "axios";
import LineChartModal from './LineChartModal';

const CancellationRatesLineChart = () => {
    const [data, setData] = useState([]);
    const [timeFrame, setTimeFrame] = useState('monthly');
    const [scheduleId, setScheduleId] = useState('all');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/admin/totalFare/${scheduleId}/${timeFrame}`);
                const result = response.data.fareBreakdown;
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [timeFrame, scheduleId]);  // Update data when timeFrame or scheduleId changes

    return (
        <Box>
            {data.length === 0 ? (
                <Typography variant="h6">No data available</Typography>
            ) : (
                <LineChartModal
                    data={data}
                    XaxisLabel="Period"
                    YaxisLabel="Total Fare (RS)"
                    allowDecimals={true}
                    dataKeys={["totalFare"]}
                    onTimeFrameChange={setTimeFrame}  // Pass callback to update timeFrame
                    onScheduleIdChange={setScheduleId}  // Pass callback to update scheduleId
                />
            )}
        </Box>
    );
};

export default CancellationRatesLineChart;
