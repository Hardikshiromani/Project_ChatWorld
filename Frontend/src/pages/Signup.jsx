import React from "react";
import { useNavigate } from "react-router-dom";




const Signup = () => {
  const navigate = useNavigate();
  const Handlenew=()=>{
    navigate("/Profilepage")
  }
  return (
    <div
      class="container d-flex justify-content-center align-items-center vh-100 "
      style={{ background: "linear-gradient(to left,rgb(251, 197, 0),rgb(255, 94, 0))" }}
    >
      <div
        className="card p-4 shadow-lg"
        style={{ width: "350px", borderRadius: "10px" }}
      >
        <div className="card-title" style={{ textAlign: "center" }}>
          <h2> User Signup</h2>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label className="fo">Enter mobile no.</label>
            <div className="input-group">
              <input
                type="email"
                className="form-control"
                placeholder="Enter Mobile no. "
                required
              />
              <button class="btn btn-warning ">Get OTP</button>
            </div>
          </div>
          <div class="mb-3">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Otp "
                required
              />
              <button class="btn btn-primary " onClick={Handlenew}>Verify OTP</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
