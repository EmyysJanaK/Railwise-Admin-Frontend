import { Grid, Box } from '@mui/material';
import BookingClassDistributionLineChart from '../components/graphs/BookingClassDistributionLineChart';

const ClassDistribution = () => {
    return (
        <Box sx={{ display: 'flex' }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
                <BookingClassDistributionLineChart />
            </Grid>
            </Grid>
        </Box>
        </Box>
    );
}

export default ClassDistribution;