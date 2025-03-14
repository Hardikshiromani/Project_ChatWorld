import React from "react";
import { useNavigate } from "react-router-dom";
const Profilepage = () => {

  const navigate = useNavigate();
    const HandlePage=()=>{
      navigate("/chatpage")
    }  
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "linear-gradient(to right, #56ccf2, #2f80ed)" }}
    >
      <div className="card  p-10 shadow-lg" style={{width:'350px', borderRadius:'20px' } }>
      <center>  <h2 >User Profile</h2> </center>
        <div className="mb-3">
          <label className="form-label">UserName</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Username "
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Enter Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter Password of Atleast 8 characters "
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Re Enter Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter Password of Atleast 8 characters "
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Enter Date Of Birth</label>
          <input
            type="date"
            className="form-control"
            placeholder="Enter Password of Atleast 8 characters "
            required
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label">
            Bio
          </label>
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
           <button type="submit" className="btn btn-primary w-100" onClick={HandlePage}>Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default Profilepage;
