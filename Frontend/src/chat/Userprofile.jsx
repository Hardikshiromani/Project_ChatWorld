import React from "react";
import pic1 from "../assets/pic1.png";
import { FaArrowLeft } from "react-icons/fa";
const UserProfile = ({ selectedChat,onClose }) => {
  
  // if (!selectedChat) return null;
  console.log("UserProfile selectedChat:", selectedChat);
  return (
    <div style={styles.container}>
      <div style={styles.profileCard}>
        <FaArrowLeft onClick={onClose} />
        <div style={styles.profileHeader}>
          <img src={selectedChat.profilePic} alt="Profile" style={styles.profileImage} />
          <h2 style={styles.profileName}>{selectedChat.name}</h2>
          <p style={styles.profileStatus}>Online</p>
        </div>

        <div >
          <div style={styles.sectionHeader}>
          <h3>Bio</h3>
            </div>  
            <div style={styles.bio}>
              <p>The new Bio is here Loading...</p>
            </div>
         
        </div>

        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h3>
              Media <span>30</span>
            </h3>
            <p style={styles.viewAll}>View All</p>
          </div>
          <div style={styles.mediaGallery}>
            <div style={styles.mediaItem}></div>
            <div style={styles.mediaItem}></div>
            <div style={styles.mediaItem}></div>
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h3>
              Link <span>14</span>
            </h3>
            <p style={styles.viewAll}>View All</p>
          </div>
          <div style={styles.linkContainer}>
            <a href="https://behance.net/cephasobaji" style={styles.linkItem}>
              https://behance.net/cephasobaji
            </a>
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h3>
              Files <span>10</span>
            </h3>
            <p style={styles.viewAll}>View All</p>
          </div>
          <div style={styles.fileList}>
            <div style={styles.fileItem}>
              <p>schedule VCT ApAC.pdf</p>
              <span>490 KB</span>
            </div>
            <div style={styles.fileItem}>
              <p>IMG_102.jpg</p>
              <span>2.4 MB</span>
            </div>
            <div style={styles.fileItem}>
              <p>IMG_113.jpg</p>
              <span>3.5 MB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // minHeight: "40vh",
      height: "100vh",
      backgroundColor: "#f3f4f6",
    },
    profileCard: {
      width: "320px",
      background: "white",
      // borderRadius: "none",
      // boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      padding: "20px",
      height: "100vh",
    },
    profileHeader: {
      textAlign: "center",
    },
    profileImage: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      marginBottom: "10px",
    },
    profileName: {
      fontSize: "20px",
      fontWeight: "bold",
    },
    profileStatus: {
      color: "green",
    },
    section: {
      marginTop: "20px",
    },
    bio: {
      textAlign: "left",
      marginTop: "10px",
      backgroundColor: "#f9fafb",
      padding: "10px",
      borderRadius: "8px",
      fontSize: "14px",
      color: "#374151",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      lineHeight: "1.4",
    },
    
    sectionHeader: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "16px",
      fontWeight: "bold",
    },
    viewAll: {
      color: "blue",
      cursor: "pointer",
    },
    mediaGallery: {
      display: "flex",
      gap: "8px",
      marginTop: "10px",
    },
    mediaItem: {
      width: "30%",
      height: "60px",
      background: "#d1d5db",
      borderRadius: "8px",
    },
    linkContainer: {
      marginTop: "10px",
      padding: "10px",
      background: "#eef2ff",
      borderRadius: "8px",
    },
    linkItem: {
      color: "blue",
      textDecoration: "none",
    },
    fileList: {
      marginTop: "10px",
    },
    fileItem: {
      display: "flex",
      justifyContent: "space-between",
      padding: "8px",
      background: "#f3f4f6",
      borderRadius: "8px",
      marginTop: "5px",
    },
  };

export default UserProfile;
