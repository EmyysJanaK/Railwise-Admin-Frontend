import { Grid, Box, Typography } from "@mui/material";
import BookingRatesLineChart from "../components/graphs/BookingRatesLineChart";

const Cancellations = () => {
	return (
		<Box sx={{ padding: 2 }}>
			<Typography variant="h4" gutterBottom>
				Bookings
			</Typography>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<BookingRatesLineChart status="cancelled" />
				</Grid>
				<Grid item xs={12}>
					<BookingRatesLineChart status="approved" />
				</Grid>
			</Grid>
		</Box>
	);
};

export default Cancellations;
