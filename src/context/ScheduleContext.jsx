import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ScheduleContext = createContext();

export const ScheduleProvider = ({ children }) => {
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSchedules = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/schedules`);
            setSchedules(response.data.schedules);
        } catch (error) {
            setError(error);
            console.error("Error fetching schedules:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchSchedules();
    }, []);

    return (
        <ScheduleContext.Provider value={{ schedules, loading, error, refreshSchedules: fetchSchedules }}>
            {children}
        </ScheduleContext.Provider>
    );
};

export const useSchedules = () => useContext(ScheduleContext);
