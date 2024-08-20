import { Grid, Box } from '@mui/material';
import UserRegistrationTrendsLineChart from '../components/graphs/UserRegistrationTrendsLineChart';

const UserRegistrations = () => {
    return (
        <Box sx={{ display: 'flex' }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
                <UserRegistrationTrendsLineChart />
            </Grid>
            </Grid>
        </Box>
        </Box>
    );
}
export default UserRegistrations;