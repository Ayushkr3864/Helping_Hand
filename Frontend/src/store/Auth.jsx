// import React, { createContext } from 'react'
// import { useContext } from 'react'

// export const AuthContext = createContext();
// export const AuthProvider = ({ children }) => {
//     const storeTokenInLS = (token) => {
//                  localStorage.setItem("token",token)
//   }
//   const clearTokenFromLS = () => {
//     localStorage.clear();
//   }
//     return (
//       <AuthContext.Provider value={{ storeTokenInLS, clearTokenFromLS }}>
//         {children}
//       </AuthContext.Provider>
//     );
// }
// export const useAuth = () => {
//     return useContext(AuthContext);
// }
import React, { useCallback, useEffect, useState } from "react";
import { createContext } from "react";
import { useContext } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [userData, setUserData] = useState(null);
  const [donation, setDonation] = useState(null);

  const storeTokenInLS = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken);
  };

  const removeTokenFromLS = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("image");
    setToken(null);
    setUserData(null);
    setDonation(null);
  };

  const getTokenFromLS = () => {
    return localStorage.getItem("token");
  };

  const isLoggedIn = Boolean(token);

  const userInfo = useCallback(async () => {
    try {
      const currentToken = localStorage.getItem("token");
      if (!currentToken) {
        setUserData(null);
        return null;
      }

      const res = await fetch(`https://helping-hand-2pny.onrender.com/user`, {
        method: "get",
        headers: { Authorization: `Bearer ${currentToken}` },
      });

      if (!res.ok) {
        removeTokenFromLS();
        return null;
      }

      const data = await res.json();
      setUserData(data);
      return data;
    } catch (e) {
      console.log(e.message);
      return null;
    }
  }, []);

  const DonationInfo = useCallback(async () => {
    try {
      const currentToken = localStorage.getItem("token");
      if (!currentToken) return null;

      const res = await fetch(
        `https://helping-hand-2pny.onrender.com/find/donate`,
        {
          method: "get",
          headers: { Authorization: `Bearer ${currentToken}` },
        }
      );

      if (!res.ok) {
        return null;
      }

      const data = await res.json();
      setDonation(data.summary);
      return data;
    } catch (e) {
      console.log(e.message);
      return null;
    }
  }, []);

  useEffect(() => {
    if (token) {
      userInfo();
    }
  }, [token, userInfo]);

  return (
    <AuthContext.Provider
      value={{
        storeTokenInLS,
        removeTokenFromLS,
        userInfo,
        getTokenFromLS,
        DonationInfo,
        userData,
        donation,
        isLoggedIn,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
