import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import trainImage from "../assets/trainImage.png"; 
import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";
import useFormInput from "../hooks/useFormInput";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const location = useLocation();
  const { loginUser, error } = useAuth();
  const [prevLocation, setPrevLocation] = useState("HomePage");
  const username = useFormInput("");
  const password = useFormInput("");

  useEffect(() => {
    if (location.state && location.state.data) {
      setPrevLocation(location.state.data);
    }
  }, [location]);

  const handleLogin = async (e) => {
    e.preventDefault();
    await loginUser({
      emailOrUsername: username.value,
      password: password.value,
    });
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="absolute inset-0 bg-purple-900 opacity-75"></div>
      <div className="relative z-10 w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-center mb-8">
          <img
            src={trainImage}
            alt="Railwise Logo"
            className="w-20 h-20"
          />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Railwise Login
        </h2>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <form onSubmit={handleLogin}>
          
          <TextInput label="Username" {...username} />
          <PasswordInput label="Password" {...password} />


          <div className="mb-6 text-right">
            <Link to="/ForgotPassword" className="text-blue-500">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-full hover:bg-gray-800 transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <span className="text-gray-600">Don't you have an account?</span>
          <Link to="/SignUp" className="text-blue-500 ml-2">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
