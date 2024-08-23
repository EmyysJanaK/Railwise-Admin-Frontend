import React from "react";
import { Grid, Box, Typography, Toolbar } from "@mui/material";
import RevenueTrendsLineChart from "../components/graphs/RevenueTrendsLineChart";

const Revenue = () => {
	return (
		<Grid container>
			<Typography variant="h4" gutterBottom>
				Revenue
			</Typography>
			<Grid item xs={12}>
				<RevenueTrendsLineChart scheduleId="all" />
			</Grid>
		</Grid>
	);
};
export default Revenue;
