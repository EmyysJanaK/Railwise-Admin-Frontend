import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, MenuItem, FormControl, InputLabel, Select, TablePagination } from '@mui/material';
import axios from 'axios';

const BookingTable = () => {
  const [bookingsDetails, setBookingsDetails] = useState([]);
  const [status, setStatus] = useState('approved');
  const [scheduleId, setScheduleId] = useState('all');
  const [schedules, setSchedules] = useState([]);
  const [page, setPage] = useState(0); // For pagination
  const [rowsPerPage, setRowsPerPage] = useState(50); 
  const [totalBookings, setTotalBookings] = useState(0);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`/api/admin/bookingsdetails/${status}/${scheduleId}/?startIndex=${page * rowsPerPage}`);
        setBookingsDetails(response.data.bookingsDetails);
        setTotalBookings(response.data.totalBookingsCount || 0);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();

  }, [status, scheduleId, page, rowsPerPage]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get("/api/admin/schedules");
        setSchedules(response.data.schedules);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };
    fetchSchedules();
  }, []);

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
          {schedules.map(schedule => (
            <MenuItem key={schedule._id} value={schedule._id}>{schedule.name}</MenuItem>
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
          rowsPerPageOptions={[50]} // Fixed rows per page to 50
        />
      </TableContainer>
    </>
  );
};

export default BookingTable;
