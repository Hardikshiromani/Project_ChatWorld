// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { auth } from "./firebase";
// const Profilepage = () => {

//     const [userName,setUsername]=useState("");
//     const [password,setPassword]=useState("");
//     const [rePassword, setRePassword] = useState("");
//     const [bio,setBio]=useState("");
//     const [dob,setDob]=useState("");


//     const navigate = useNavigate();
    

//     const user = auth.currentUser;
// const phoneNumber = user.phoneNumber;

//     const HandleProfile=async()=>{

//       if(password!==rePassword){
//         alert("Password and RePassword should be same");
//         return;
//       }

//       try{
//         const user=auth.currentUser;
//         const tokenId=await user.getIdToken();
//       const res= await axios.post("http://localhost:5000/api/signup",{
//        username: userName,
//         password,
//         // rePassword,
//         bio,
//        DOB: dob,
//         phoneNumber: user.phoneNumber,
//         tokenId
//        })

//        if(res.data.message==="User Created Successfully"){
//         alert("User Created Successfully");
//         navigate("/chatpage")
//        }
      
//        else {
//         alert("Error in creating user");
//        }
//       }
//       catch(err){
//         console.log(err)
//         alert("Error in  backend")
//       }
//     }
//   return (
//     <div
//       className="d-flex justify-content-center align-items-center vh-100"
//       style={{ background: "linear-gradient(to right, #56ccf2, #2f80ed)" }}
//     >
//       <div className="card  p-10 shadow-lg" style={{width:'350px', borderRadius:'20px' } }>
//       <center>  <h2 >User Profile</h2> </center>
//         <div className="mb-3">
//           <label className="form-label">UserName</label>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Enter Username "
//             onChange={(e)=>setUsername(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Enter Password</label>
//           <input
//             type="password"
//             className="form-control"
//             placeholder="Enter Password of Atleast 8 characters "
//             onChange={(e)=>setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Re Enter Password</label>
//           <input
//             type="password"
//             className="form-control"
//             placeholder="Enter Password of Atleast 8 characters "
//             onChange={(e)=>setRePassword(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Enter Date Of Birth</label>
//           <input
//             type="date"
//             className="form-control"
//             placeholder="Enter Password of Atleast 8 characters "
//             onChange={(e)=>setDob(e.target.value)}
//             required
//           />
//         </div>
//         <div class="mb-3">
//           <label for="exampleFormControlTextarea1" class="form-label">
//             Bio
//           </label>
//           <textarea
//             class="form-control"
//             id="exampleFormControlTextarea1"
//             onChange={(e)=>setBio(e.target.value)}
//             placeholder="Tell us something about you..."
//             rows="3"
//           ></textarea>
//            <button type="submit" className="btn btn-primary w-100" onChange={HandleProfile}>Sign In</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profilepage;


// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "../css/Login.css";

// const Profilepage = () => {
//   const navigate = useNavigate();

//   const HandlePage = () => {
//     navigate("/chatpage");
//   };

//   return (
//     <div
//       className="d-flex justify-content-center align-items-center vh-100"
//       style={{ background: "linear-gradient(to right, #56ccf2, #2f80ed)" }}
//     >
//       <div className="card p-4 shadow-lg" style={{ width: "350px", borderRadius: "20px" }}>
//         <h2 className="text-center mb-4">User Profile</h2>

//         <div className="mb-3">
//           <label className="form-label">UserName</label>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Enter Username"
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Enter Password</label>
//           <input
//             type="password"
//             className="form-control"
//             placeholder="Enter Password of Atleast 8 characters"
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Re Enter Password</label>
//           <input
//             type="password"
//             className="form-control"
//             placeholder="Enter Password of Atleast 8 characters"
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Enter Date Of Birth</label>
//           <input
//             type="date"
//             className="form-control"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="exampleFormControlTextarea1" className="form-label">Bio</label>
//           <textarea
//             className="form-control"
//             id="exampleFormControlTextarea1"
//             rows="3"
//             placeholder="Tell us something about you..."
//           ></textarea>
//         </div>

//         <button type="submit" className="btn btn-primary w-100" onChange={HandlePage}>
//           Sign In
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Profilepage;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";

const Profilepage = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [dob, setDob] = useState("");

  const navigate = useNavigate();

  const HandleProfile = async () => {
    if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    try {
      const user = auth.currentUser;
      const tokenId = await user.getIdToken();

      const res = await axios.post("http://localhost:5000/api/user/signup", {
        username: userName,
        password,
        bio,
        DOB: dob,
        phoneNumber: user.phoneNumber,
        tokenId,
      });

      if (res.data.message === "User Created Successfully") {
        alert("User Created Successfully");
        navigate("/chatpage");
      } else {
        alert("Error in creating user");
      }
    } catch (err) {
      console.log(err);
      alert("Error in backend");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "linear-gradient(to right, #56ccf2, #2f80ed)" }}
    >
      <div className="card p-4 shadow-lg" style={{ width: "350px", borderRadius: "20px" }}>
        <center>
          <h2>User Profile</h2>
        </center>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="At least 8 characters"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Bio</label>
          <textarea
            className="form-control"
            rows="3"
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us something about you..."
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary w-100" onClick={HandleProfile}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Profilepage;
