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
import React, { useCallback, useEffect, useState } from 'react'
import { createContext } from 'react'
import { useContext } from 'react'

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [userData, setuserData] = useState(null)
  const [donation,setdonation] = useState(null)
  // store token
  const storeTokenInLS = (serverToken) => {
    return localStorage.setItem("token",serverToken)
  }
  // clear token
  const removeTokenFromLS = ()=> {
    localStorage.clear();
  }
  // get token
  const getTokenFromLS = () => {
    return localStorage.getItem("token");
  }
  const userInfo = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;
      const res = await fetch(`https://helping-hand-2pny.onrender.com/user`, {
        method: "get",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setuserData(data);
      
      return data;
    } catch (e) {
      console.log(e.message);
    }
  }, []);
  const DonationInfo = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
    if (!token) return null;
    else {
      const res = await fetch(
        `https://helping-hand-2pny.onrender.com/find/donate`,
        {
          method: "get",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      setdonation(data.summary);
      return data;
    }
    } catch (e) {
      console.log(e.message);
      
   }
  },[getTokenFromLS])
 
  return (
    <AuthContext.Provider value={{storeTokenInLS,removeTokenFromLS,userInfo,getTokenFromLS,DonationInfo}}>
      {children}
    </AuthContext.Provider>
  )
}
export const useAuth = () => {
  return useContext(AuthContext)
  
}
export default AuthProvider;