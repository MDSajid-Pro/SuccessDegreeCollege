import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { assets } from "../../assets/assets";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Login successful");
      navigate("/admin/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex rounded-full bg-gray-50">
      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-tr from-blue-700 to-blue-500 text-white items-center justify-center p-12">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome Back, Admin</h1>
          <p className="text-lg mb-6">
            Secure access to your college management dashboard
          </p>
          <img
            src={assets.admin}
            alt="Login Illustration"
            className="max-w-sm mx-auto"
          />
        </div>
      </div>

      {/* Right Side (Form) */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6 py-2">
        <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Admin Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute top-2.5 left-3 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@college.edu"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute top-2.5 left-3 text-gray-400" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition duration-300"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-500">
            Access restricted to authorized college admins.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
