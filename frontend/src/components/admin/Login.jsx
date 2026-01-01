import React, { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  ShieldCheck, 
  Eye, 
  EyeOff 
} from "lucide-react";

const Login = () => {
  const { axios, setToken } = useAppContext();
  
  // Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // UI State
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/admin/login", {
        email,
        password,
      });

      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = data.token;
        toast.success("Welcome back, Admin!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      axios.defaults.headers.common["Authorization"] = storedToken;
    }
  }, [setToken, axios]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden font-sans">
      
      {/* --- BACKGROUND DECORATION --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/50 blur-3xl animate-pulse" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-100/50 blur-3xl" />
      </div>

      {/* --- LOGIN CARD --- */}
      <div className="relative w-full max-w-md p-8 mx-4 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 backdrop-blur-sm z-10 transition-all">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 mb-4 shadow-sm">
            <ShieldCheck size={28} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Admin Portal</h1>
          <p className="text-sm text-gray-500 mt-2">
            Secure access for university administrators.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-600 ml-1 uppercase tracking-wider">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                <Mail size={18} />
              </div>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                required
                placeholder="admin@college.edu"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 hover:bg-white"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center ml-1">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Password</label>
              <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                Forgot Password?
              </a>
            </div>
            <div className="relative group">
              {/* Left Icon (Lock) */}
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                <Lock size={18} />
              </div>

              {/* Input Field */}
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type={showPassword ? "text" : "password"} // Dynamic Type
                required
                placeholder="••••••••"
                className="w-full pl-11 pr-11 py-3 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 hover:bg-white"
              />

              {/* Right Icon (Eye Toggle) */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98]"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Login to Dashboard <ArrowRight size={18} />
              </>
            )}
          </button>

        </form>

        {/* Footer Link */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">
            Trouble logging in? <a href="#" className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">Contact IT Support</a>
          </p>
        </div>
      </div>

    </div>
  );
};

export default Login;