import { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");


  const loginUser = async ({ username, password }) => {
    try {
      const response = await axios.post("/api/admin/login", {
        username,
        password,
      }, { withCredentials: true });

      if (response.status === 200) {
        login(response.data);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setError("Invalid username or password");
    }
  };

  return {
    loginUser,
    error,
  };
};

export default useAuth;
