import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import axios from "axios";
import LineChartModal from './LineChartModal';
import useFetchData from '../../hooks/useFetchData';

const UserRegistrationsLineChart = () => {
    const [timeFrame, setTimeFrame] = useState('monthly');

    const {data, loading, error} = useFetchData(`/api/admin/userRegistrations/${timeFrame}`, [timeFrame]);
    if (loading) {
        return <Typography variant="h6">Loading...</Typography>;
    }
    if(error) {
        return <Typography variant="h6">Error fetching data: {error.message}</Typography>;

    }

    return (
        <Box>
            {data.length === 0 ? (
                <Typography variant="h6">No data available</Typography>
            ) : (
                <LineChartModal
                    data={data.registrationBreakdown}
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
