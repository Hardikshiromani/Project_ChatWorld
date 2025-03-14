
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const HandlePage=()=>{
    navigate("/Profilepage")
  }
  return (
    
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: "linear-gradient(to right, #56ccf2, #2f80ed)" }}>
      <div className="card p-4 shadow-lg" style={{ width: "350px", borderRadius: "10px" }}>
        <h3 className="text-center mb-4">Login</h3>
        
        <form>
          <div className="mb-3">
            <label className="form-label">UserName</label>
            <input type="email" className="form-control" placeholder="Enter Username " required />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Enter password"
              required
            />
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              onChange={() => setShowPassword(!showPassword)}
            />
            <label className="form-check-label">Show Password</label>
          </div>

          <button type="submit" className="btn btn-primary w-100" onClick={HandlePage}>Sign In</button>
        </form>

        <div className="text-center mt-3">
          <a href="#" className="text-decoration-none">Forgot Username / Password?</a>
        </div>
        <div className="text-center mt-2">
          Don't have an account? <Link to ="/signup" className="text-decoration-none">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
