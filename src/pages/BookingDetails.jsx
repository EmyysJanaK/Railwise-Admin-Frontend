import { Grid, Box } from '@mui/material';
import BookingTable from '../components/tables/BookingTable';

const BookingDetails = () => {
    return (
        <Box sx={{ display: 'flex' }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <BookingTable />
        </Box>
        </Box>
    );
}

export default BookingDetails;