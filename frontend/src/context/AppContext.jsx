import { useContext, useEffect } from "react";
import { createContext } from "react";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useState } from "react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL


const AppContext = createContext()

export const AppProvider = ({ children }) => {

    const navigate = useNavigate()

    const [token, setToken] = useState(null)
    
    useEffect(() => {
        if (token) {
            setToken(token);
            axios.defaults.headers.common['Authorization'] = `${token}`;
      }  
    },[])

    const value = {
        axios, token, setToken, navigate
    }

    return (
        <AppContext.Provider value={value}>
            { children }
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}