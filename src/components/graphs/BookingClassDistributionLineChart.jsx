import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import axios from "axios";
import LineChartModal from './LineChartModal'; 
import useFetchData from '../../hooks/useFetchData';

const BookingClassDistributionLineChart = () => {
    const [timeFrame, setTimeFrame] = useState('monthly');
    const [scheduleId, setScheduleId] = useState('all');

    const {data, loading, error} = useFetchData(`/api/admin/bookingClassDistribution/${scheduleId}/${timeFrame}`, [timeFrame, scheduleId]);


    if (error) {
        return <Typography variant="h6">Error fetching data: {error.message}</Typography>;
    }

    return (
        <Box>
            {loading ? (
				<Box display="flex" justifyContent="center" alignItems="center" height={300}>
					<CircularProgress />
				</Box>
			) : (
            <>
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
                    setTimeFrame={setTimeFrame}  
                    timeFrame = {timeFrame}
                    setScheduleId={setScheduleId} 
                    scheduleId={scheduleId}
                />
            )}
            </>
            )}
        </Box>
    );
};

export default BookingClassDistributionLineChart;
