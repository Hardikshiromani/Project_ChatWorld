import React, { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import axios from "axios"; // For making backend API calls

const LoginForm = () => {
  // State variables for form fields and UI logic
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [username, setUsername] = useState(""); // Username input
  const [password, setPassword] = useState(""); // Password input
  const [errorMessage, setErrorMessage] = useState(""); // Error message display

  const navigate = useNavigate(); // For navigation after login

  // Handle form submission for login
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission (page reload)
    try {
      // Send login request to backend
      const response = await axios.post("http://localhost:5000/api/user/login", {
        username,
        password,
      });
  
      // Destructure token and user from response
      const { token, user } = response.data;

      // Store JWT token and user info in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      console.log(response.data); // Debug: log response

      // Navigate to chat page on successful login
      navigate("/chatpage");
    } catch (error) {
      // Handle login error
      console.error(error);
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "linear-gradient(to right, #56ccf2, #2f80ed)" }}
    >
      <div className="card p-4 shadow-lg login-card">
        <h3 className="text-center mb-4">Login</h3>

        {/* Login form */}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Enter Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Checkbox to toggle password visibility */}
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              onChange={() => setShowPassword(!showPassword)}
            />
            <label className="form-check-label">Show Password</label>
          </div>

          {/* Display error message if login fails */}
          {errorMessage && (
            <div className="alert alert-danger py-2">{errorMessage}</div>
          )}

          <button type="submit" className="btn btn-primary w-100">
            Sign In
          </button>
        </form>

        {/* Link to forgot password page */}
        <div className="text-center mt-3">
          <Link to="/forgot-password" className="text-decoration-none">
            Forgot Username / Password?
          </Link>
        </div>
        {/* Link to signup page */}
        <div className="text-center mt-2">
          Don't have an account?{" "}
          <Link to="/signup" className="text-decoration-none">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;