import { Grid, Box } from '@mui/material';
import BookingRatesLineChart from '../components/graphs/BookingRatesLineChart';

const Cancellations = () => {
    return (
        <Box sx={{ display: 'flex' }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
                <BookingRatesLineChart status="cancelled" />
                <BookingRatesLineChart status="approved" />
            </Grid>
            </Grid>
        </Box>
        </Box>
    );
}
export default Cancellations;