import React from "react";

// Settings component to manage user preferences
const Settings = () => {
  return (
    <div
      className="p-4"
      style={{
        width: "40%",
        height: "100%",
        overflowY: "auto",
        background: "#fff",
        marginLeft: "35px",
      }}
    >
      {/* Profile Section - Displays user information */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <img
          src="https://via.placeholder.com/60" // Placeholder profile image
          alt="Profile"
          className="rounded-circle"
          width={60}
          height={60}
        />
        <div>
          <h5 className="mb-1">John Doe</h5> {/* User's name */}
          <p className="text-muted mb-0">@johndoe</p> {/* Username/handle */}
        </div>
      </div>

      {/* Settings Options - List of configurable settings */}
      <div className="list-group">
        {/* Notifications Setting */}
        <div className="list-group-item d-flex align-items-center gap-3">
          <i className="bi bi-bell"></i>
          <span>Notifications</span>
        </div>

        {/* Privacy & Security Setting */}
        <div className="list-group-item d-flex align-items-center gap-3">
          <i className="bi bi-shield-lock"></i>
          <span>Privacy & Security</span>
        </div>

        {/* Data & Storage Setting */}
        <div className="list-group-item d-flex align-items-center gap-3">
          <i className="bi bi-hdd-network"></i>
          <span>Data & Storage</span>
        </div>

        {/* Appearance Setting */}
        <div className="list-group-item d-flex align-items-center gap-3">
          <i className="bi bi-palette"></i>
          <span>Appearance</span>
        </div>

        {/* Devices Setting */}
        <div className="list-group-item d-flex align-items-center gap-3">
          <i className="bi bi-laptop"></i>
          <span>Devices</span>
        </div>

        {/* Language Setting */}
        <div className="list-group-item d-flex align-items-center gap-3">
          <i className="bi bi-translate"></i>
          <span>Language</span>
        </div>

        {/* Help Section */}
        <div className="list-group-item d-flex align-items-center gap-3">
          <i className="bi bi-info-circle"></i>
          <span>Help</span>
        </div>
      </div>

      {/* Logout Option */}
      <div className="text-danger mt-4 d-flex align-items-center gap-2" style={{ cursor: "pointer" }}>
        <i className="bi bi-box-arrow-right"></i>
        <span>Logout</span>
      </div>
    </div>
  );
};

export default Settings;