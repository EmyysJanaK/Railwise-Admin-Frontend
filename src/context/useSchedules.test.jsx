import { renderHook } from '@testing-library/react-hooks';
import { useSchedules, ScheduleProvider } from '../../context/ScheduleContext';
import axios from 'axios';

jest.mock('axios');

describe('useSchedules Hook', () => {

    test('fetches schedules and returns them correctly', async () => {
        const mockSchedules = [
            { _id: '1', name: 'Test Schedule 1' },
            { _id: '2', name: 'Test Schedule 2' },
        ];

        // Mocking axios to return the mock schedules
        axios.get.mockResolvedValue({ data: { schedules: mockSchedules } });

        const { result, waitForNextUpdate } = renderHook(() => useSchedules(), {
            wrapper: ScheduleProvider,
        });

        // Wait for the hook to update with the fetched data
        await waitForNextUpdate();

        // Check that schedules are returned correctly
        expect(result.current.schedules).toEqual(mockSchedules);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(null);
    });

    test('handles empty schedule data', async () => {
        axios.get.mockResolvedValue({ data: { schedules: [] } });

        const { result, waitForNextUpdate } = renderHook(() => useSchedules(), {
            wrapper: ScheduleProvider,
        });

        await waitForNextUpdate();

        // Expect schedules to be an empty array
        expect(result.current.schedules).toEqual([]);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(null);
    });

    test('handles API error correctly', async () => {
        axios.get.mockRejectedValue(new Error('Network error'));

        const { result, waitForNextUpdate } = renderHook(() => useSchedules(), {
            wrapper: ScheduleProvider,
        });

        await waitForNextUpdate();

        // Expect error state to be set
        expect(result.current.schedules).toEqual([]);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toEqual(expect.any(Error));
    });

    test('ensures schedule objects have required properties', async () => {
        const mockSchedules = [
            { _id: '1', name: 'Test Schedule 1' },
            { _id: '2', name: 'Test Schedule 2' },
        ];

        axios.get.mockResolvedValue({ data: { schedules: mockSchedules } });

        const { result, waitForNextUpdate } = renderHook(() => useSchedules(), {
            wrapper: ScheduleProvider,
        });

        await waitForNextUpdate();

        result.current.schedules.forEach(schedule => {
            expect(schedule).toHaveProperty('_id');
            expect(schedule).toHaveProperty('name');
        });
    });
});
