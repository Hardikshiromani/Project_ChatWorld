// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../css/Login.css";

// import { Link } from "react-router-dom";
// const LoginForm = () => {
//   const [showPassword, setShowPassword] = useState(false);

//   const navigate = useNavigate();
//   const HandlePage=()=>{
//     navigate("/Profilepage")
//   }
//   return (
    
//     <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: "linear-gradient(to right, #56ccf2, #2f80ed)" }}>
//       <div className="card p-4 shadow-lg" style={{ width: "350px", borderRadius: "10px" }}>
//         <h3 className="text-center mb-4">Login</h3>
        
//         <form>
//           <div className="mb-3">
//             <label className="form-label">UserName</label>
//             <input type="email" className="form-control" placeholder="Enter Username " required />
//           </div>

//           <div className="mb-3">
//              <label className="form-label">Password</label>
//             <input
//              type={showPassword ? "text" : "password"}
//               className="form-control"
//               placeholder="Enter password"
//               required
//             />
//           </div>

//           <div className="mb-3 form-check">
//            <input
//              type="checkbox"
//                className="form-check-input"
//               onChange={() => setShowPassword(!showPassword)}
//          />
//             <label className="form-check-label">Show Password</label>
//           </div>
//           <button type="submit" className="btn btn-primary w-100" onClick={HandlePage}>Sign In</button>
//        </form>

//          <div className="text-center mt-3">
//            <a href="#" className="text-decoration-none">Forgot Username / Password?</a>
//          </div>
//          <div className="text-center mt-2">
//            Don't have an account? <Link to ="/signup" className="text-decoration-none">Sign up</Link>
//          </div>
//        </div>
//      </div>
//   );
//  }; 

// export default LoginForm;
import React, { useState } from "react";
import {Link, useNavigate } from "react-router-dom";

 import axios from "axios"; // important for backend call

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState(""); // for username input
  const [password, setPassword] = useState(""); // for password input
  const [errorMessage, setErrorMessage] = useState(""); // to show error

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // prevent page reload
    try {
      const response = await axios.post("http://localhost:5000/api/user/login", {
        username,
        password,
      });
  
const { token, user } = response.data;

localStorage.setItem('token', token); // Store the JWT token
localStorage.setItem('user', JSON.stringify(user));

      console.log(response.data); // for checking

      // if login successful
      navigate("/chatpage");
    } catch (error) {
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

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              onChange={() => setShowPassword(!showPassword)}
            />
            <label className="form-check-label">Show Password</label>
          </div>

          {/* show error if login fails */}
          {errorMessage && (
            <div className="alert alert-danger py-2">{errorMessage}</div>
          )}

          <button type="submit" className="btn btn-primary w-100">
            Sign In
          </button>
        </form>

        <div className="text-center mt-3">
          <Link to="/forgot-password" className="text-decoration-none">
            Forgot Username / Password?
          </Link>
        </div>
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