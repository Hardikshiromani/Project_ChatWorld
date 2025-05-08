// 
// // Signup.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "./firebase";

// const Signup = () => {
//   const [mobile, setMobile] = useState("");
//   const [otp, setOtp] = useState("");
//   const [confirmationResult, setConfirmationResult] = useState(null);
//   const [isVerified, setIsVerified] = useState(false);
//   const navigate = useNavigate();

//   // Only initialize reCAPTCHA once
//   const setupRecaptcha = () => {

//       window.recaptchaVerifier = new RecaptchaVerifier(
//         'recaptcha-container',
//         {
//           size: 'invisible',
//           callback: (response) => {
//             console.log('reCAPTCHA verified');
//           },
//           'expired-callback': () => {
//             console.log('reCAPTCHA expired');
//           },
//         },
//         auth
//       );
    
//   };

//   const handleGetOtp = async () => {
//     if (!mobile) return alert("Please enter a mobile number");

//     setupRecaptcha();
//     const appVerifier = window.recaptchaVerifier;

//     try {
//       const result = await signInWithPhoneNumber(auth, `+91${mobile}`, appVerifier);
//       setConfirmationResult(result);
//       alert("OTP sent successfully!");
//     } catch (error) {
//       console.error("Error during OTP send", error);
//       alert("Failed to send OTP");
//     }
//   };

//   const handleVerifyOtp = async () => {
//     if (!otp || !confirmationResult) return;

//     try {
//       await confirmationResult.confirm(otp);
//       alert("OTP Verified!");
//       setIsVerified(true);
//       navigate("/Profilepage");
//     } catch (error) {
//       console.error("OTP verification failed", error);
//       alert("Invalid OTP");
//     }
//   };

//   return (
//     <div
//       className="container d-flex justify-content-center align-items-center vh-100"
//       style={{
//         background: "linear-gradient(to left, rgb(251, 197, 0), rgb(255, 94, 0))",
//       }}
//     >
//       <div
//         className="card p-4 shadow-lg"
//         style={{ width: "350px", borderRadius: "10px" }}
//       >
//         <div className="card-title text-center">
//           <h2>User Signup</h2>
//         </div>
//         <div className="card-body">
//           <div className="mb-3">
//             <label className="form-label">Enter mobile no.</label>
//             <div className="input-group">
//               <input
//                 type="tel"
//                 className="form-control"
//                 placeholder="Enter Mobile no."
//                 value={mobile}
//                 onChange={(e) => setMobile(e.target.value)}
//                 disabled={isVerified}
//               />
//               <button className="btn btn-warning" onClick={handleGetOtp}>
//                 Get OTP
//               </button>
//             </div>
//           </div>
//           <div className="mb-3">
//             <div className="input-group">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Enter OTP"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//               />
//               <button className="btn btn-primary" onClick={handleVerifyOtp}>
//                 Verify OTP
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Required for RecaptchaVerifier */}
//       <div id="recaptcha-container"></div>
//     </div>
//   );
// };

// export default Signup;


  // const handleVerifyOtp = async () => {
  //   if (!otp || !confirmationResult) return;

  //   try {
  //     await confirmationResult.confirm(otp);
  //     alert("OTP Verified!");
  //     setIsVerified(true);
  //     navigate("/Profilepage");

  //  const user =auth.currentUser;
      
  //  const idToken = await user.getIdToken();

  //  const response= await axios.post("http://localhost:5000/api/user/verifyotp", {idToken});

  //  if (response.data.message === "OTP verified and user stored") {
  //   navigate("/Profilepage");
  // } else {
  //   alert("Something went wrong. Please try again.");
  // }

  //   } catch (error) {
  //     console.error("OTP verification failed", error);
  //     alert("Invalid OTP");
  //   }
  // };

//   import React, { useState } from "react";
//   import { useNavigate } from "react-router-dom";
//   import { auth, RecaptchaVerifier, signInWithPhoneNumber, verifyOtpAndGetIdToken} from "./firebase";
//   import axios from "axios";
//   const Signup = () => {
//     const [mobile, setMobile] = useState("");
//     const [otp, setOtp] = useState("");
//     const [confirmationResult, setConfirmationResult] = useState(null);
//     const [isVerified, setIsVerified] = useState(false);
//     const navigate = useNavigate();
  
//     // Only initialize reCAPTCHA once
//     const setupRecaptcha = () => {
//       if (!window.recaptchaVerifier) {
//         window.recaptchaVerifier = new RecaptchaVerifier(
//           auth,
//           'recaptcha-container',
//           {
//             size: 'invisible',
//             callback: (response) => {
//               console.log('reCAPTCHA verified',response);
//             },
//             'expired-callback': () => {
//               console.log('reCAPTCHA expired');
//               alert("reCAPTCHA expired. Please try again.");
//             },
//           },
//         );
//       }
//     };
  
//     const handleGetOtp = async () => {
//       if (!mobile) return alert("Please enter a mobile number");
  
//       setupRecaptcha();
//       const appVerifier = window.recaptchaVerifier;
  
//       try {
//         const result = await signInWithPhoneNumber(auth, `+91${mobile}`, appVerifier);
//         setConfirmationResult(result);
//         alert("OTP sent successfully!");
//       } catch (error) {
//         console.error("Error during OTP send", error);
//         alert("Failed to send OTP");
//       }
//     };
  

//   const handleVerifyOtp = async () => {
//     if (!otp || !confirmationResult) return;
  
//     try {
//       const token = await user.getIdToken(); // make sure `user` is authenticated
// console.log("Sending token:", token);
//       // ✅ 1. Confirm OTP with Firebase
//       // const result = await confirmationResult.confirm(otp);
//       // const user = result.user;
  
//       // // ✅ 2. Get ID Token from Firebase user
//       // const idToken = await user.getIdToken();
//       // console.log("✅ Firebase ID Token:", idToken);
//       // // ✅ 3. Send ID Token to backend for verification + user creation
//       // const response = await axios.post("http://localhost:5000/api/user/verifyotp",{}, {
//       //   idToken,
       
//       // });
//       fetch("http://localhost:3000/api/verify-otp", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           tokenId: token
//         })
//       })
//         .then(response => response.json())
//         .then(data => {
//           console.log("Server response:", data);
//         })
//         ;
      
//       if (response.data.message === "OTP verified and user stored") {
//         // ✅ 4. Navigate after success
//         alert("OTP Verified!");
//         setIsVerified(true);
//         navigate("/Profilepage");
//       } else {
//         alert("Something went wrong. Please try again.");
//       }
  
//     } catch (error) {
//       console.error("OTP verification failed", error);
//       alert("Invalid OTP");
//     }
//   };
  
//   return (
//     <div
//       className="container d-flex justify-content-center align-items-center vh-100"
//       style={{
//         background: "linear-gradient(to left, rgb(251, 197, 0), rgb(255, 94, 0))",
//       }}
//     >
//       <div
//         className="card p-4 shadow-lg"
//         style={{ width: "350px", borderRadius: "10px" }}
//       >
//         <div className="card-title text-center">
//           <h2>User Signup</h2>
//         </div>
//         <div className="card-body">
//           <div className="mb-3">
//             <label className="form-label">Enter mobile no.</label>
//             <div className="input-group">
//               <input
//                 type="tel"
//                 className="form-control"
//                 placeholder="Enter Mobile no."
//                 value={mobile}
//                 onChange={(e) => setMobile(e.target.value)}
//                 disabled={isVerified}
//               />
//               <button className="btn btn-warning" onClick={handleGetOtp}>
//                 Get OTP
//               </button>
//             </div>
//           </div>
//           <div className="mb-3">
//             <div className="input-group">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Enter OTP"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//               />
//               <button className="btn btn-primary" onClick={handleVerifyOtp}>
//                 Verify OTP
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Required for RecaptchaVerifier */}
//       <div id="recaptcha-container"></div>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "./firebase";
import axios from "axios";

const Signup = () => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log("reCAPTCHA verified", response);
          },
          "expired-callback": () => {
            console.log("reCAPTCHA expired");
            alert("reCAPTCHA expired. Please try again.");
          },
        }
      );
    }
  };

  const handleGetOtp = async () => {
    if (!mobile) return alert("Please enter a mobile number");

    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;

    try {
      const result = await signInWithPhoneNumber(
        auth,
        `+91${mobile}`,
        appVerifier
      );
      setConfirmationResult(result);
      alert("OTP sent successfully!");
    } catch (error) {
      console.error("Error during OTP send", error);
      alert("Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || !confirmationResult) return;

    try {
      // ✅ Confirm OTP with Firebase
      const result = await confirmationResult.confirm(otp);
      const user = result.user;

      // ✅ Get Firebase ID Token
      const token = await user.getIdToken();
      console.log("✅ Firebase ID Token:", token);

      // ✅ Send token to backend
      const response = await axios.post("http://localhost:5000/api/user/verifyOTP", {
        tokenId: token,
      });

      if (response.data.message === "OTP verified and user stored") {
        alert("OTP Verified!");
        setIsVerified(true);
        navigate("/Profilepage");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("OTP verification failed", error);
      alert("Invalid OTP or confirmation failed.");
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(to left, rgb(251, 197, 0), rgb(255, 94, 0))",
      }}
    >
      <div
        className="card p-4 shadow-lg"
        style={{ width: "350px", borderRadius: "10px" }}
      >
        <div className="card-title text-center">
          <h2>User Signup</h2>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Enter mobile no.</label>
            <div className="input-group">
              <input
                type="tel"
                className="form-control"
                placeholder="Enter Mobile no."
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                disabled={isVerified}
              />
              <button className="btn btn-warning" onClick={handleGetOtp}>
                Get OTP
              </button>
            </div>
          </div>
          <div className="mb-3">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleVerifyOtp}>
                Verify OTP
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Required for RecaptchaVerifier */}
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default Signup;
