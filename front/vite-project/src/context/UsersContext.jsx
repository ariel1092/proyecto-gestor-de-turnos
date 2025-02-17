import axios from "axios";
import { createContext, useMemo, useState } from "react";

export const UserContext = createContext({
  user: "",
  userAppoinments: [],
  loginUser: async () => {},
  registerUser: async () => {},
  logOutUser: ()=> {},
  getUserAppoinments: async()=> {},
  cancelAppoinments: async() => {},
  createdAppoinment: async()  => {}
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("userId") || "");
  const [userAppoinments, setUserAppoinments] = useState([]);

  const loginUser = async (userData) => {
    const respuesta =  await axios.post("https://proyecto-gestor-de-turnos.onrender.com/users/login", userData);
    localStorage.setItem("userId", respuesta.data.user.id)
    setUser(respuesta.data.user.id)
  };

  const registerUser = async(userData) => {
    await axios.post("https://proyecto-gestor-de-turnos.onrender.com/users/register", userData)
  }

  const logOutUser = () => {
    localStorage.clear()
    setUser("")
    setUserAppoinments([])
  }

  const getUserAppoinments = async (userId) => {
    try {
      const response = await axios.get(`https://proyecto-gestor-de-turnos.onrender.com/users/${userId}`);
      setUserAppoinments(response.data.serviceResponse.appoinments || []); 
    } catch (error) {
      console.error("Error al obtener los turnos del usuario:", error);
    }
  };

  const cancelAppoinments = async (appoinmentId) => {
    await axios.put(`https://proyecto-gestor-de-turnos.onrender.com/appoinments/cancel/${appoinmentId}`)
    const userAppoinmentUpdate = userAppoinments.map(appoinment => {
      if(appoinment.id === appoinmentId) {
        const appoinmentUpdate = {...appoinment, status:"cancelled"};
        return appoinmentUpdate;
      } else {
        return appoinment;
      }
    })
    setUserAppoinments(userAppoinmentUpdate)
  }

  const createdAppoinment = async (values) => {
    const appoinmentValues = {
      ...values,
      userId: user
    }
    await axios.post(`https://proyecto-gestor-de-turnos.onrender.com/appoinments/schedule`, appoinmentValues);
    await getUserAppoinments(user);
  }

  const value = useMemo(() => ({
    user,
    userAppoinments,
    loginUser,
    registerUser,
    logOutUser,
    getUserAppoinments,
    cancelAppoinments,
    createdAppoinment
  }), [user, userAppoinments]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
