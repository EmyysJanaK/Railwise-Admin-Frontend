import { Grid, Box, Typography } from "@mui/material";
import BookingClassDistributionLineChart from "../components/graphs/BookingClassDistributionLineChart";

const ClassDistribution = () => {
	return (
		<Grid container>
			<Typography variant="h4" gutterBottom>
				Class Distribution
			</Typography>
			<Grid item xs={12}>
				<BookingClassDistributionLineChart />
			</Grid>
		</Grid>
	);
};

export default ClassDistribution;
