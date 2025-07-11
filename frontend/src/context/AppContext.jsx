import { useContext, useEffect } from "react";
import { createContext } from "react";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useState } from "react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL


const AppContext = createContext()

export const AppProvider = ({ children }) => {

    const navigate = useNavigate()

    const [token, setToken] = useState(null)
    const [images, setImages] = useState([])
    const [subcribers, setSubcribers] = useState([])
    const [input, setInput] = useState("")


    const fetchImages = async () => {
        try {
            const { data } = await axios.get('/api/image/all')
            data.success ? setImages(data.images) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }
    
    useEffect(() => {
        fetchImages();
        const token = localStorage.getItem('token')
        if (token) {
            setToken(token);
            axios.defaults.headers.common['Authorization'] = `${token}`;
      }  
    },[])

    const value = {
        axios, token, setToken, navigate, input,setInput, setImages, images
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