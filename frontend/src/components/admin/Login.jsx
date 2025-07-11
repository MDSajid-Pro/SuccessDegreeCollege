import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

const Login = () => {
  const { axios, setToken } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/admin/login", {
        email,
        password,
      });

      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = data.token;
        toast.success("Welcome to Admin dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      axios.defaults.headers.common["Authorization"] =
        localStorage.getItem("token");
    }
  }, [setToken, axios]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-sm p-6 max-md:m-6 border border-blue-300 shadow-xl shadow-blue-100 rounded-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full py-2 text-center">
            <h1 className="text-3xl font-bold">
              <span className="text-blue-500">Admin</span>{" "}
              Login
            </h1>
            <p className="font-light">
              Enter your credentials to access the admin panel
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="mt-6 w-full sm:max-w-md text-gray-600"
          >
            <div className="flex flex-col">
              <label> Email </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                required
                placeholder="Your email id"
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
              />
            </div>
            <div className="flex flex-col">
              <label> Password </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                required
                placeholder="Your password"
                className="border-b-2 border-gray-300 p-2 outline-none mb-3"
              />
            </div>
            <div className="mt-2 mb-3 cursor-pointer text-blue-600 hover:underline ">
              Forget password ?
            </div>
            <button
              className="w-full py-3 font-medium bg-blue-600 text-white rounded cursor-pointer hover:rounded-3xl hover:bg-blue-700 transition-all"
              type="submit"
            >
              Log in
            </button>

            <div className="mt-4 text-center text-gray-500">
              Don't have an account?
              <span
                className="text-blue-500 cursor-pointer font-medium hover:underline"
              >
                Sign up
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
