import { Grid, Box } from '@mui/material';
import ScheduleTable from '../components/tables/ScheduleTable';

const BookingDetails = () => {
    return (
        <Box sx={{ display: 'flex' }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <ScheduleTable />
        </Box>
        </Box>
    );
}

export default BookingDetails;