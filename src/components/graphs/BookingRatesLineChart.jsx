import { useState } from 'react';
import { Box, Typography ,CircularProgress} from '@mui/material';
import LineChartModal from './LineChartModal';
import useFetchData from '../../hooks/useFetchData';

const BookingRatesLineChart = ({ status }) => {
    const [timeFrame, setTimeFrame] = useState('monthly');
    const [scheduleId, setScheduleId] = useState('all');

    const {data, loading, error} = useFetchData(`${import.meta.env.VITE_BACKEND_URL}/api/admin/bookingsCount/${status}/${scheduleId}/${timeFrame}`, [timeFrame, scheduleId, status]);

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
                    data={data.bookingsBreakdown}
                    XaxisLabel="Period"
                    YaxisLabel="Total Bookings"
                    title={`${status.charAt(0).toUpperCase() + status.slice(1)} Bookings`}
                    allowDecimals={false}
                    dataKeys={["count"]}
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

export default BookingRatesLineChart;
