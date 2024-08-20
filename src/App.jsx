import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Dashboard from './components/Dashboard';
import Bookings from './pages/Bookings';
import Revenue from './pages/Revenue';
import UserRegistrations from './pages/UserRegistrations';
import ClassDistribution from './pages/ClassDistribution';
import BookingDetails from './pages/BookingDetails';
import ScheduleDetails from './pages/ScheduleDetails';
import Layout from './components/Layout';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Router>
        <Layout>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/revenue" element={<Revenue />} />
          <Route path="/user-registrations" element={<UserRegistrations />} />
          <Route path="/class-distribution" element={<ClassDistribution />} />
          <Route path="/booking-details" element={<BookingDetails />} />
          <Route path="/schedule-details" element={<ScheduleDetails />} />
        </Routes>
        </Layout>
      </Router>
    </LocalizationProvider>
  );
}

export default App;
