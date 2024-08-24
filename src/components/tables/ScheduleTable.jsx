import React, { useEffect, useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Typography,
} from "@mui/material";
import useFetchData from "../../hooks/useFetchData";

const BookingTable = () => {
	const {
		data,
		loading,
		error,
	} = useFetchData("/api/admin/schedulesDetails", []);

	if (loading) {
		return <Typography variant="h6">Loading...</Typography>;
	}
	if (error) {
		return <Typography variant="h6">Error fetching data</Typography>;
	}

	return (
		<>
			{data.schedulesDetails && (
				<TableContainer component={Paper}>
					<Table aria-label="schedules table">
						<TableHead>
							<TableRow>
								<TableCell>Schedule ID</TableCell>
								<TableCell>Schedule Name</TableCell>
								<TableCell>Train Name</TableCell>
								<TableCell>Monday</TableCell>
								<TableCell>Tuesday</TableCell>
								<TableCell>Wednesday</TableCell>
								<TableCell>Thursday</TableCell>
								<TableCell>Friday</TableCell>
								<TableCell>Saturday</TableCell>
								<TableCell>Sunday</TableCell>
								<TableCell>scheduleType</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data.schedulesDetails.map((Schedule) => (
								<TableRow key={Schedule._id}>
									<TableCell>{Schedule._id}</TableCell>
									<TableCell>{Schedule.name}</TableCell>
									<TableCell>
										{Schedule.trainRef.name}
									</TableCell>
									<TableCell>{Schedule.monday}</TableCell>
									<TableCell>{Schedule.tuesday}</TableCell>
									<TableCell>{Schedule.wednesday}</TableCell>
									<TableCell>{Schedule.thursday}</TableCell>
									<TableCell>{Schedule.friday}</TableCell>
									<TableCell>{Schedule.saturday}</TableCell>
									<TableCell>{Schedule.sunday}</TableCell>
									<TableCell>
										{Schedule.scheduleType}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</>
	);
};

export default BookingTable;
