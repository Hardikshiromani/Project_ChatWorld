
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";

const Profilepage = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [dob, setDob] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const navigate = useNavigate();

  // Properly defined handleFileChanges function
  const handleFileChanges = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const HandleProfile = async () => {
    if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    try {
      const user = auth.currentUser;
      const tokenId = await user.getIdToken();
      let uploadedPhotoPath = "";

      if (profilePhoto) {
        const formData = new FormData();
        formData.append("profilePhoto", profilePhoto);

        const uploadRes = await axios.post(
          "http://localhost:5000/api/user/create",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        uploadedPhotoPath = uploadRes.data.path;
      }

      const res = await axios.post("http://localhost:5000/api/user/create", {
        username: userName,
        password,
        bio,
        DOB: dob,
        profilePhoto: uploadedPhotoPath,
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

        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">
            Click to Upload Profile Photo
          </label>
          <input
            className="form-control"
            type="file"
            id="formFile"
            accept="image/*"
            onChange={handleFileChanges}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100" onClick={HandleProfile}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Profilepage;