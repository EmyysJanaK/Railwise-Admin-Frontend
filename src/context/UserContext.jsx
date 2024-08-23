import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUserData(user);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUserData(null);
  };

  return (
    <UserContext.Provider value={{ userData, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};
