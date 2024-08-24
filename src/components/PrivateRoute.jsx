import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PrivateRoute = ({ children }) => {
  const { userData, loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return userData ? children : <Navigate to="/login" />;

};

export default PrivateRoute;
