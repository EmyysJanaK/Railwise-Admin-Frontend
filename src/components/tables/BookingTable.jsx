import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  TablePagination,
  Typography,
} from '@mui/material';
import useFetchData from '../../hooks/useFetchData';
import { useSchedules } from '../../context/ScheduleContext';

const BookingTable = () => {
  const [bookingsDetails, setBookingsDetails] = useState([]);
  const [status, setStatus] = useState('approved');
  const [scheduleId, setScheduleId] = useState('all');
  const [page, setPage] = useState(0); // For pagination
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [totalBookings, setTotalBookings] = useState(0);

  const { data, loading, error } = useFetchData(
    `/api/admin/bookingsdetails/${status}/${scheduleId}/?startIndex=${page * rowsPerPage}`,
    [status, scheduleId, page, rowsPerPage]
  );


  const {schedules, loading: scheduleLoading, error: scheduleError} = useSchedules();

  useEffect(() => {
    if (data) {
      setBookingsDetails(data.bookingsDetails || []);
      setTotalBookings(data.totalBookingsCount || 0);
    }
  }, [data]);


  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    setPage(0);
  };

  const handleScheduleIdChange = (event) => {
    setScheduleId(event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  if (loading || scheduleLoading) {
    return <Typography variant="h6">Loading...</Typography>;
  }
  if (error || scheduleError) {
    return <Typography variant="h6">Error fetching data</Typography>;
  }

  return (
    <>
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

      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel id="status-select-label">Status</InputLabel>
        <Select
          labelId="status-select-label"
          value={status}
          label="Status"
          onChange={handleStatusChange}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="approved">Approved</MenuItem>
          <MenuItem value="cancelled">Cancelled</MenuItem>
        </Select>
      </FormControl>

      {data && (
        <TableContainer component={Paper}>
          <Table aria-label="bookings table">
            <TableHead>
              <TableRow>
                <TableCell>Booking ID</TableCell>
                <TableCell>User Email</TableCell>
                <TableCell>Travel Date</TableCell>
                <TableCell>Start Station</TableCell>
                <TableCell>End Station</TableCell>
                <TableCell>Train Name</TableCell>
                <TableCell>Fare</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Seats</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookingsDetails.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell>{booking._id}</TableCell>
                  <TableCell>{booking.userRef.email}</TableCell>
                  <TableCell>{new Date(booking.date).toLocaleDateString()}</TableCell>
                  <TableCell>{booking.startHalt.stationRef.name}</TableCell>
                  <TableCell>{booking.endHalt.stationRef.name}</TableCell>
                  <TableCell>{booking.scheduleRef.trainRef.name}</TableCell>
                  <TableCell>{booking.totalFare}</TableCell>
                  <TableCell>{booking.status}</TableCell>
                  <TableCell>{booking.seats.map((seat) => seat.name).join(', ')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={totalBookings}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[50]}
          />
        </TableContainer>
      )}
    </>
  );
};

export default BookingTable;
