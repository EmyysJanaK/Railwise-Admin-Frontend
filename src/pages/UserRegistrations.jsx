import { Grid, Box, Typography } from "@mui/material";
import UserRegistrationTrendsLineChart from "../components/graphs/UserRegistrationTrendsLineChart";

const UserRegistrations = () => {
	return (
		<Grid container>
			<Typography variant="h4" gutterBottom>
            User Registrations
			</Typography>
			<Grid item xs={12}>
				<UserRegistrationTrendsLineChart />
			</Grid>
		</Grid>
	);
};
export default UserRegistrations;
