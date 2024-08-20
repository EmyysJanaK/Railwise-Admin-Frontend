import React, { useEffect, useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from "@mui/material";
import axios from "axios";

const BookingTable = () => {
	const [schedulesDetails, setSchedulesDetails] = useState([]);

	useEffect(() => {
		const fetchBookings = async () => {
			try {
				const response = await axios.get(`/api/admin/schedulesDetails`);
				setSchedulesDetails(response.data.schedulesDetails);
			} catch (error) {
				console.error("Error fetching bookings:", error);
			}
		};

		fetchBookings();
	}, []);

	return (
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
					{schedulesDetails.map((Schedule) => (
						<TableRow key={Schedule._id}>
							<TableCell>{Schedule._id}</TableCell>
							<TableCell>{Schedule.name}</TableCell>
							<TableCell>{Schedule.trainRef.name}</TableCell>
							<TableCell>{Schedule.monday}</TableCell>
							<TableCell>{Schedule.tuesday}</TableCell>
							<TableCell>{Schedule.wednesday}</TableCell>
							<TableCell>{Schedule.thursday}</TableCell>
							<TableCell>{Schedule.friday}</TableCell>
							<TableCell>{Schedule.saturday}</TableCell>
							<TableCell>{Schedule.sunday}</TableCell>
							<TableCell>{Schedule.scheduleType}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default BookingTable;
