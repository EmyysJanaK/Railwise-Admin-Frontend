import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import axios from "axios";
import LineChartModal from './LineChartModal';

const UserRegistrationsLineChart = () => {
    const [data, setData] = useState([]);
    const [timeFrame, setTimeFrame] = useState('monthly');

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

    return (
        <Box>
            {data.length === 0 ? (
                <Typography variant="h6">No data available</Typography>
            ) : (
                <LineChartModal
                    data={data}
                    XaxisLabel="Period"
                    YaxisLabel="Total Registrations"
                    allowDecimals={false}
                    dataKeys={["registrations"]}
                    onTimeFrameChange={setTimeFrame}
                    showScheduleSelector={false}
                />
            )}
        </Box>
    );
};

export default UserRegistrationsLineChart;
