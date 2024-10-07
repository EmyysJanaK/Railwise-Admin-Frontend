import React from 'react'; 
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TimeChange from './TimeChange';
import { useSchedules } from '../context/ScheduleContext';
import useFetchData from '../hooks/useFetchData';
import useNotifyPassengers from '../hooks/useNotifyPassengersTime';
import { vi } from 'vitest';
import { toast } from 'react-toastify';
import '@testing-library/jest-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'; 

// Mock custom hooks
vi.mock('../context/ScheduleContext');
vi.mock('../hooks/useFetchData');
vi.mock('../hooks/useNotifyPassengersTime');
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  }
}));

describe('TimeChange Component', () => {
  const mockNotifyPassengers = vi.fn();
  const mockSchedules = [
    { _id: '1', name: 'Schedule 1' },
    { _id: '2', name: 'Schedule 2' },
  ];
  const mockHaltsData = {
    halts: [
      { _id: '1', stationRef: { name: 'Station 1' }, haltOrder: 1 },
      { _id: '2', stationRef: { name: 'Station 2' }, haltOrder: 2 },
    ],
  };

  beforeEach(() => {
    vi.resetAllMocks();

    // Mock useSchedules hook
    useSchedules.mockReturnValue({
      schedules: mockSchedules,
    });

    // Mock useFetchData hook
    useFetchData.mockReturnValue({
      data: mockHaltsData,
      loading: false,
    });

    // Mock useNotifyPassengers hook
    useNotifyPassengers.mockReturnValue({
      notifyPassengers: mockNotifyPassengers,
      loading: false,
    });
  });

  test('renders TimeChange form with all fields', () => {
    render(
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimeChange />
        </LocalizationProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(/Time Change/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('MM/DD/YYYY')).toBeInTheDocument();
    expect(screen.getByLabelText(/Schedule/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /Halt/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Time Offset/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/This delay will impact all subsequent halts following this one./i)
    ).toBeInTheDocument();
  });

  test('displays loading spinner when halts are loading', () => {
    useFetchData.mockReturnValueOnce({
      data: null,
      loading: true,
    });

    render(
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimeChange />
        </LocalizationProvider>
      </BrowserRouter>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('displays loading spinner when notifyLoading is true', () => {
    useNotifyPassengers.mockReturnValueOnce({
      notifyPassengers: mockNotifyPassengers,
      loading: true, 
    });

    render(
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimeChange />
        </LocalizationProvider>
      </BrowserRouter>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument(); 
  });

  test('handles form submission correctly', async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
  
    // Format the date (optional, depends on your DatePicker's expected format)
    const formattedDate = `${tomorrow.getMonth() + 1}/${tomorrow.getDate()}/${tomorrow.getFullYear()}`;
  
    render(
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimeChange />
        </LocalizationProvider>
      </BrowserRouter>
    );

    // Simulate user input
    const dateInput = screen.getByPlaceholderText('MM/DD/YYYY');
    fireEvent.change(dateInput, { target: { value: formattedDate  } });

    // Simulate selecting a schedule
    fireEvent.mouseDown(screen.getByLabelText(/Schedule/i));
    const scheduleOption = await screen.findByText('Schedule 1');
    fireEvent.click(scheduleOption);

    // Simulate selecting a halt
    fireEvent.mouseDown(screen.getByRole('combobox', { name: /Halt/i }));
    const haltOption = await screen.findByText('Station 1');
    fireEvent.click(haltOption);

    fireEvent.change(screen.getByLabelText(/Time Offset/i), {
      target: { value: '10' }
    });

    fireEvent.click(screen.getByLabelText(/This delay will impact all subsequent halts following this one./i));

    // Simulate form submission
    fireEvent.click(screen.getByText(/Notify Passengers/i));

    await waitFor(() => {
      expect(mockNotifyPassengers).toHaveBeenCalledWith(
        '1', 
        1, 
        '1', 
        tomorrow.toISOString().split('T')[0], 
        '10', 
        true 
      );
    });
  });
});
