import { useEffect, useCallback } from "react";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // Assuming you use React Router

const AutoLogout = ({ timeoutMs = 900000 }) => { // Default: 15 minutes
  const { token, setToken, axios } = useAppContext();
  // const navigate = useNavigate(); // Uncomment if you need to force redirect

  const logout = useCallback(() => {
    // 1. Clear State
    setToken(null);
    
    // 2. Clear Local Storage
    localStorage.removeItem("token");
    
    // 3. Clear Axios Header
    delete axios.defaults.headers.common["Authorization"];
    
    // 4. Notify User
    toast.error("Session expired due to inactivity.");
    
    // 5. Redirect (Optional, depending on your routing setup)
    // navigate("/login"); 
    
    // 6. Force reload to clear any sensitive memory (Optional but recommended)
    window.location.href = "/";
  }, [setToken, axios]);

  useEffect(() => {
    // If no user is logged in, do nothing
    if (!token) return;

    let timeoutId;

    // Function to reset the timer
    const resetTimer = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(logout, timeoutMs);
    };

    // Events to track activity
    const events = [
      "mousemove",
      "keydown",
      "click",
      "scroll",
      "touchstart"
    ];

    // Set up initial timer
    resetTimer();

    // Add event listeners
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    // Cleanup function
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [token, logout, timeoutMs]);

  return null; // This component renders nothing, it just runs logic
};

export default AutoLogout;