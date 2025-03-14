
import React, { useState } from "react";

const UserProfile = ({ onClose }) => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    bio: "Web Developer | Tech Enthusiast",
    profilePic: "https://via.placeholder.com/100",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="profile-container">
      <button className="close-btn" onClick={onClose}>✖</button>
      <img src={profile.profilePic} alt="Profile" className="profile-pic" />
      <input type="text" name="name" value={profile.name} onChange={handleChange} />
      <textarea name="bio" value={profile.bio} onChange={handleChange}></textarea>
    </div>
  );
};

export default UserProfile;
