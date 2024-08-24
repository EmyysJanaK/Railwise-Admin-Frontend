import { Grid, Box, Typography } from "@mui/material";
import BookingTable from "../components/tables/BookingTable";

const BookingDetails = () => {
	return (
		<Grid container>
			<Typography variant="h4" gutterBottom>
				Booking Details
			</Typography>
			<Grid item xs={12}>
				<BookingTable />
			</Grid>
		</Grid>
	);
};

export default BookingDetails;
