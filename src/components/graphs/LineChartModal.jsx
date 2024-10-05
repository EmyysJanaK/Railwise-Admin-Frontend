import React, { useState, useEffect } from "react";
import {
	Box,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Typography,
	CircularProgress,
} from "@mui/material";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	Label,
} from "recharts";
import axios from "axios";
import { useSchedules } from "../../context/ScheduleContext";

const LineChartModal = ({
	data,
	loading,
	error,
	XaxisLabel,
	YaxisLabel,
	title,
	allowDecimals,
	dataKeys,
	showScheduleSelector = true,
	onTimeFrameChange,
	onScheduleIdChange,
}) => {
	const [timeFrame, setTimeFrame] = useState("monthly");
	const [scheduleId, setScheduleId] = useState("all");
	const colors = ["#8884d8", "#82ca9d", "#ffc658"];

    const { schedules } = useSchedules();

	const handleTimeFrameChange = (event) => {
		const newTimeFrame = event.target.value;
		setTimeFrame(newTimeFrame);
		onTimeFrameChange(newTimeFrame);
	};

	const handleScheduleIdChange = (event) => {
		const newScheduleId = event.target.value;
		setScheduleId(newScheduleId);
		onScheduleIdChange(newScheduleId);
	};

	return (
		<Box>
			{title && (
				<Typography variant="h5" gutterBottom>
					{title}
				</Typography>
			)}

			<FormControl fullWidth sx={{ marginBottom: 2 }}>
				<InputLabel id="timeframe-select-label">Timeframe</InputLabel>
				<Select
					labelId="timeframe-select-label"
					value={timeFrame}
					label="Timeframe"
					onChange={handleTimeFrameChange}
				>
					<MenuItem value="weekly">Weekly</MenuItem>
					<MenuItem value="monthly">Monthly</MenuItem>
					<MenuItem value="yearly">Yearly</MenuItem>
				</Select>
			</FormControl>

			{showScheduleSelector && schedules.length > 0 && (
				<FormControl fullWidth sx={{ marginBottom: 2 }}>
					<InputLabel id="schedule-select-label">Schedule</InputLabel>
					<Select
						labelId="schedule-select-label"
						value={scheduleId}
						label="Schedule"
						onChange={handleScheduleIdChange}
					>
						<MenuItem value="all">All</MenuItem>
						{schedules.map((schedule) => (
							<MenuItem key={schedule._id} value={schedule._id}>
								{schedule.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			)}

			{loading ? (
				<Box display="flex" justifyContent="center" alignItems="center" height={300}>
					<CircularProgress />
				</Box>
			) : (
				<ResponsiveContainer width="100%" height={300}>
					<LineChart
						data={data}
						margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="period">
							<Label
								value={XaxisLabel}
								position="insideBottom"
								dy={10}
							/>
						</XAxis>
						<YAxis allowDecimals={allowDecimals}>
							<Label value={YaxisLabel} angle={-90} dx={-20} />
						</YAxis>
						<Tooltip />
						<Legend />
						{dataKeys.map((key, index) => (
							<Line
								key={index}
								type="monotone"
								dataKey={key}
								stroke={colors[index]}
							/>
						))}
					</LineChart>
				</ResponsiveContainer>
			)}
		</Box>
	);
};

export default LineChartModal;