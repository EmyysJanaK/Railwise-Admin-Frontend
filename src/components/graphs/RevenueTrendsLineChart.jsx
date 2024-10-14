import { useState } from 'react';
import { Box, Typography,CircularProgress } from '@mui/material';
import LineChartModal from './LineChartModal';
import useFetchData from '../../hooks/useFetchData';

const RevenueTrendsLineChart = () => {
    const [timeFrame, setTimeFrame] = useState('monthly');
    const [scheduleId, setScheduleId] = useState('all');


    const {data, loading, error} = useFetchData(`${import.meta.env.VITE_BACKEND_URL}/api/admin/totalFare/${scheduleId}/${timeFrame}`, [timeFrame, scheduleId]);
    if(error) {
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
                    data={data.fareBreakdown}
                    XaxisLabel="Period"
                    YaxisLabel="Total Fare (RS)"
                    allowDecimals={true}
                    dataKeys={["totalFare"]}
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

export default RevenueTrendsLineChart;
