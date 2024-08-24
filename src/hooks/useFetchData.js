import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchData = (url, dependencies = []) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(url);
                setData(response.data);
            } catch (err) {
                setError(err);
            }
            setLoading(false);
        };

        fetchData();
    }, dependencies);

    return { data, loading, error };
};

export default useFetchData;
