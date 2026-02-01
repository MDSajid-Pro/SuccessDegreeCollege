import { useContext, useEffect, useState, createContext } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast";

// Ensure your .env has VITE_BASE_URL (e.g., http://localhost:5000)
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const AppContext = createContext()

export const AppProvider = ({ children }) => {

    const navigate = useNavigate()

    // --- Existing State ---
    const [token, setToken] = useState(null)
    const [images, setImages] = useState([])
    const [subcribers, setSubcribers] = useState([]) 
    const [input, setInput] = useState("")

    // --- NEW: Inquiry State ---
    const [inquiries, setInquiries] = useState([])

    // --- Existing: Fetch Images ---
    const fetchImages = async () => {
        try {
            const { data } = await axios.get('/api/image/all')
            data.success ? setImages(data.images) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    // =================================================
    //  NEW: INQUIRY LOGIC (Connects to your Controller)
    // =================================================

    // 1. CREATE (For InquiryModal)
    const createInquiry = async (formData) => {
        try {
            const { data } = await axios.post('/api/inquiries', formData)
            if (data.success) {
                toast.success("Inquiry sent successfully!")
                return { success: true }
            }
        } catch (error) {
            const msg = error.response?.data?.error || "Failed to send inquiry"
            toast.error(msg)
            return { success: false, error: msg }
        }
    }

    // 2. READ (For AdminDashboard)
    const fetchInquiries = async () => {
        try {
            // Only fetch if we have a token (assuming admin route is protected)
            // if (!token) return; 
            
            const { data } = await axios.get('/api/inquiries')
            if (data.success) {
                setInquiries(data.data)
            }
        } catch (error) {
            console.log("Error fetching inquiries:", error)
        }
    }

    // 3. UPDATE (Mark Contacted / Done)
    const updateInquiry = async (id, updateData) => {
        try {
            const { data } = await axios.put(`/api/inquiries/${id}`, updateData)
            if (data.success) {
                toast.success("Status Updated")
                // Update local state instantly so UI reflects change
                setInquiries(prev => prev.map(item => 
                    item._id === id ? { ...item, ...updateData } : item
                ))
            }
        } catch (error) {
            toast.error("Update failed")
        }
    }

    // 4. DELETE
    const deleteInquiry = async (id) => {
        try {
            const { data } = await axios.delete(`/api/inquiries/${id}`)
            if (data.success) {
                toast.success("Record deleted")
                setInquiries(prev => prev.filter(item => item._id !== id))
            }
        } catch (error) {
            toast.error("Delete failed")
        }
    }

    // =================================================
    //  INITIALIZATION
    // =================================================
    
    useEffect(() => {
        fetchImages();
        
        const storedToken = localStorage.getItem('token')
        if (storedToken) {
            setToken(storedToken);
            axios.defaults.headers.common['Authorization'] = storedToken;
            // Fetch inquiries if admin is logged in
            fetchInquiries();
        }  
    }, [token]) // Re-run when token changes (login/logout)

    const value = {
        axios, token, setToken, navigate, input, setInput, 
        images, setImages, 
        subcribers, setSubcribers,
        
        // Export New Inquiry Functions & State
        inquiries,
        createInquiry,
        fetchInquiries,
        updateInquiry,
        deleteInquiry
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