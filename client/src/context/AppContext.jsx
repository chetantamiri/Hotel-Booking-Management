import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { getToken } = useAuth();
  const { user } = useUser();
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const token = await getToken();
      if (!token) return;

      const { data } = await axios.get("http://localhost:3000/api/user/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setUserData(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const value = {
    userData,
    fetchUserData,
    user,
    getToken,
    backendUrl: "http://localhost:3000",
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
