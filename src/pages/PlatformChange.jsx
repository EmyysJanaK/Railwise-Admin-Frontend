import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
  } from "@mui/material";
  import { useState } from "react";
  import { useSchedules } from "../context/ScheduleContext";
  import { DatePicker } from "@mui/x-date-pickers/DatePicker";
  import useFetchData from "../hooks/useFetchData";
  import useNotifyPassengers from "../hooks/useNotifyPassengers";
  
  const PlatformChange = () => {
    const [date, setDate] = useState("");
    const [scheduleId, setScheduleId] = useState("");
    const [haltId, setHaltId] = useState("");
    const [platform, setPlatform] = useState("");
    const [haltName, setHaltName] = useState("");
  
    const { schedules } = useSchedules();
    const { data: haltsData, loading: haltsLoading } = useFetchData(
      `/api/admin/getHalts/${scheduleId}`,
      [scheduleId]
    );
  
    const { notifyPassengers, loading: notifyLoading } = useNotifyPassengers(); 
  
    const handleScheduleIdChange = (event) => {
      const newScheduleId = event.target.value;
      setScheduleId(newScheduleId);
    };
  
    const handleHaltIdChange = (event) => {
      const newHaltId = event.target.value;
      setHaltId(newHaltId);
      setHaltName(haltsData.halts.find((halt) => halt._id === newHaltId).stationRef.name);
    };
  
    return (
      <Grid container>
        <Typography variant="h4" gutterBottom>
          PlatformChange
        </Typography>
        <Grid item xs={12}>
          <DatePicker
            label="Date"
            onChange={(date) => setDate(date)}
            value={date}
            sx={{ marginBottom: 2 }}
          />
  
          {schedules.length > 0 && (
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
          )}
  
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
  
          <TextField
            id="Platform-number"
            label="Platform Number"
            type="number"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
        </Grid>
        <Button
          variant="contained"
          onClick={() => notifyPassengers(haltId,haltName, platform, date)}
          disabled={notifyLoading}
        >
            {console.log(date)}
          {notifyLoading ? "Notifying..." : "Notify Passengers"}
        </Button>
      </Grid>
    );
  };
  
  export default PlatformChange;
  