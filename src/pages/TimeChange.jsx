import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    CircularProgress,
    Box
  } from "@mui/material";
  import { TimePicker } from "@mui/x-date-pickers/TimePicker";
  import { useState } from "react";
  import { useSchedules } from "../context/ScheduleContext";
  import { DatePicker } from "@mui/x-date-pickers/DatePicker";
  import useFetchData from "../hooks/useFetchData";
  import useNotifyPassengers from "../hooks/useNotifyPassengersTime";
import { set } from "date-fns";
  
  const TimeChange = () => {
    const [date, setDate] = useState("");
    const [scheduleId, setScheduleId] = useState("");
    const [haltId, setHaltId] = useState("");
    const [haltOrder, setHaltOrder] = useState("");
    const [time, setTime] = useState("");
    const [notifyAll, setNotifyAll] = useState(false);
    const { schedules } = useSchedules();
    const { data: haltsData, loading: haltsLoading } = useFetchData(
      `/api/admin/getHalts/${scheduleId}`,
      [scheduleId]
    );
    console.log("date: ", date)
  
    const { notifyPassengers, loading: notifyLoading } = useNotifyPassengers();
  
    const handleScheduleIdChange = (event) => {
      const newScheduleId = event.target.value;
      setScheduleId(newScheduleId);
    };
  
    const handleHaltIdChange = (event) => {
      const newHaltId = event.target.value;
      setHaltId(newHaltId);
      setHaltOrder(haltsData.halts.find((halt) => halt._id === newHaltId).haltOrder);
    };
  
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            TimeChange
          </Typography>
        </Grid>
        {haltsLoading || notifyLoading ? (
				<Box sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh"
        }}>
					<CircularProgress />
				</Box>
			) : (
         <>
  
        <Grid item xs={12}>
          <DatePicker
            label="Date"
            onChange={(date) => setDate(date)}
            value={date}
            sx={{ marginBottom: 2 }}
          />
        </Grid>
  
        {schedules.length > 0 && (
          <Grid item xs={12}>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel id="schedule-select-label">Schedule</InputLabel>
              <Select
                labelId="schedule-select-label"
                value={scheduleId}
                label="Schedule"
                onChange={handleScheduleIdChange}
              >
                {schedules.map((schedule) => (
                  <MenuItem key={schedule._id} value={schedule._id}>
                    {schedule.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}
  
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel id="halt-select-label">Halt</InputLabel>
            <Select
              labelId="halt-select-label"
              value={haltId}
              label="Halt"
              onChange={handleHaltIdChange}
            >
              {!haltsLoading &&
                haltsData &&
                haltsData.halts &&
                haltsData.halts.map((halt) => (
                  <MenuItem key={halt._id} value={halt._id}>
                    {halt.stationRef.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
  
        <Grid item xs={12}>
          <TextField
            id="Time-Offset"
            label="Time Offset"
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            sx={{ marginBottom: 2 }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FormControlLabel
              control={<Checkbox checked={notifyAll} onChange={(e) => setNotifyAll(e.target.checked)} />}
              label="This delay will impact all subsequent halts following this one."
            />
          </FormControl>
        </Grid>
            
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={() => notifyPassengers(scheduleId, haltOrder, haltId, date, time, notifyAll)}
            disabled={notifyLoading}
          >
            {notifyLoading ? "Notifying..." : "Notify Passengers"}
          </Button>
        </Grid>
        </>
        )}
      </Grid>
    );
  };
  
  export default TimeChange;
  