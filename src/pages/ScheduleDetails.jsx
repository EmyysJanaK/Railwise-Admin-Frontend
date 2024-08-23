import { Grid, Box, Typography } from "@mui/material";
import ScheduleTable from "../components/tables/ScheduleTable";

const BookingDetails = () => {
	return (
		<Grid container>
			<Typography variant="h4" gutterBottom>
            Schedule Details
			</Typography>
			<Grid item xs={12}>
				<ScheduleTable />
			</Grid>
		</Grid>
	);
};

export default BookingDetails;
