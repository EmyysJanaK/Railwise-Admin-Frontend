import { useState } from "react";
import axios from "axios";

const useNotifyPassengers = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const notifyPassengers = async (haltId,haltName, platform, date) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post("/api/admin/PlatformChange", {
        haltId,
        haltName,
        platform,
        date
      });
      if (response.status === 200) {
        setSuccess(true);
        alert("Passengers have been notified successfully.");
      } else {
        throw new Error("Failed to notify passengers.");
      }
    } catch (err) {
      setError(err);
      alert("An error occurred while notifying passengers.");
    } finally {
      setLoading(false);
    }
  };

  return { notifyPassengers, loading, error, success };
};

export default useNotifyPassengers;