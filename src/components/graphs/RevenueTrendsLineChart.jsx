import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import LineChartModal from './LineChartModal';
import useFetchData from '../../hooks/useFetchData';

const CancellationRatesLineChart = () => {
    const [timeFrame, setTimeFrame] = useState('monthly');
    const [scheduleId, setScheduleId] = useState('all');


    const {data, loading, error} = useFetchData(`/api/admin/totalFare/${scheduleId}/${timeFrame}`, [timeFrame, scheduleId]);
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
                    data={data.fareBreakdown}
                    XaxisLabel="Period"
                    YaxisLabel="Total Fare (RS)"
                    allowDecimals={true}
                    dataKeys={["totalFare"]}
                    onTimeFrameChange={setTimeFrame}  
                    onScheduleIdChange={setScheduleId} 
                />
            )}
        </Box>
    );
};

export default CancellationRatesLineChart;
