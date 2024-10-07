import React from 'react'; 
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PlatformChange from './PlatformChange';
import { useSchedules } from '../context/ScheduleContext';
import useFetchData from '../hooks/useFetchData';
import useNotifyPassengers from '../hooks/useNotifyPassengers';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Mock custom hooks
vi.mock('../context/ScheduleContext');
vi.mock('../hooks/useFetchData');
vi.mock('../hooks/useNotifyPassengers');

describe('PlatformChange Component', () => {
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

  test('renders PlatformChange form with all fields', () => {
    render(
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <PlatformChange />
        </LocalizationProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(/Platform Change/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('MM/DD/YYYY')).toBeInTheDocument();
    expect(screen.getByLabelText(/Schedule/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /Halt/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Platform Number/i)).toBeInTheDocument();
  });

  test('displays loading spinner when halts are loading', () => {
    useFetchData.mockReturnValueOnce({
      data: null,
      loading: true,
    });

    render(
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <PlatformChange />
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
          <PlatformChange />
        </LocalizationProvider>
      </BrowserRouter>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument(); 
  });

  test('handles form submission correctly', async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = `${tomorrow.getMonth() + 1}/${tomorrow.getDate()}/${tomorrow.getFullYear()}`;
    render(
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <PlatformChange />
        </LocalizationProvider>
      </BrowserRouter>
    );

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText('MM/DD/YYYY'), { target: { value: formattedDate } });

    // Simulate selecting a schedule
    fireEvent.mouseDown(screen.getByLabelText(/Schedule/i));
    const scheduleOption = await screen.findByText('Schedule 1');
    fireEvent.click(scheduleOption);

    // Simulate selecting a halt
    fireEvent.mouseDown(screen.getByRole('combobox', { name: /Halt/i }));
    const haltOption = await screen.findByText('Station 1');
    fireEvent.click(haltOption);

    // Simulate entering platform number
    fireEvent.change(screen.getByLabelText(/Platform Number/i), {
      target: { value: '5' }
    });

    // Simulate form submission
    fireEvent.click(screen.getByText(/Notify Passengers/i));

    await waitFor(() => {
      expect(mockNotifyPassengers).toHaveBeenCalledWith(
        '1',  // haltId
        'Station 1',  // haltName
        '5',  // platform
        tomorrow.toISOString().split('T')[0]  // date
      );
    });
  });
});
