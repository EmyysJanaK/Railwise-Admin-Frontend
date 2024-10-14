import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const useNotifyPassengers = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const notifyPassengers = async (scheduleId, haltOrder, haltId, date, time, notifyAll) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/TimeChange`, {
        scheduleId, haltOrder, haltId, date, time, notifyAll
      });
      if (response.status === 200) {
        setSuccess(true);
        toast.success("Passengers have been notified successfully.");
      } else {
        throw new Error("Failed to notify passengers.");
      }
    } catch (err) {
      setError(err);
      toast.error("An error occurred while notifying passengers.");
    } finally {
      setLoading(false);
    }
  };

  return { notifyPassengers, loading, error, success };
};

export default useNotifyPassengers;
