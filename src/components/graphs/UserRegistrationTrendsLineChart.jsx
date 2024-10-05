import { useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import LineChartModal from './LineChartModal';
import useFetchData from '../../hooks/useFetchData';

const UserRegistrationsLineChart = () => {
    const [timeFrame, setTimeFrame] = useState('monthly');

    const {data, loading, error} = useFetchData(`/api/admin/userRegistrations/${timeFrame}`, [timeFrame]);

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
                    data={data.registrationBreakdown}
                    XaxisLabel="Period"
                    YaxisLabel="Total Registrations"
                    allowDecimals={false}
                    dataKeys={["registrations"]}
                    onTimeFrameChange={setTimeFrame}
                    showScheduleSelector={false}
                />
            )}
            </>
            )}
        </Box>
    );
};

export default UserRegistrationsLineChart;
