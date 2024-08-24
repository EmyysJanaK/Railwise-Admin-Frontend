import { Box, Typography, Button } from '@mui/material';
import { useSchedules } from '../context/ScheduleContext';

const RefreshScheduleContextButton = () => {
    const {loading, error, refreshSchedules } = useSchedules();

    if (loading) {
        return <Typography variant="h6">Loading...</Typography>;
    }

    if (error) {
        return <Typography variant="h6">Error fetching schedules: {error.message}</Typography>;
    }

    return (
        <Box>
            <Button onClick={refreshSchedules} variant="contained" color="primary">
                Refresh Schedules
            </Button>
        </Box>
    );
};

export default RefreshScheduleContextButton;