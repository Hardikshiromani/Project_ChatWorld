import React from 'react'
const Settings = () => {
  return (
    <div className="p-4" style={{ width: "40%", height: "100%", overflowY: "auto", background: "#fff", marginLeft: "35px" }}>
      {/* Profile Section */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <img
          src="https://via.placeholder.com/60"
          alt="Profile"
          className="rounded-circle"
          width={60}
          height={60}
        />
        <div>
          <h5 className="mb-1">John Doe</h5>
          <p className="text-muted mb-0">@johndoe</p>
        </div>
      </div>

      {/* Settings Options */}
      <div className="list-group">
        <div className="list-group-item d-flex align-items-center gap-3">
          <i className="bi bi-bell"></i>
          <span>Notifications</span>
        </div>
        <div className="list-group-item d-flex align-items-center gap-3">
          <i className="bi bi-shield-lock"></i>
          <span>Privacy & Security</span>
        </div>
        <div className="list-group-item d-flex align-items-center gap-3">
          <i className="bi bi-hdd-network"></i>
          <span>Data & Storage</span>
        </div>
        <div className="list-group-item d-flex align-items-center gap-3">
          <i className="bi bi-palette"></i>
          <span>Appearance</span>
        </div>
        <div className="list-group-item d-flex align-items-center gap-3">
          <i className="bi bi-laptop"></i>
          <span>Devices</span>
        </div>
        <div className="list-group-item d-flex align-items-center gap-3">
          <i className="bi bi-translate"></i>
          <span>Language</span>
        </div>
        <div className="list-group-item d-flex align-items-center gap-3">
          <i className="bi bi-info-circle"></i>
          <span>Help</span>
        </div>
      </div>

      {/* Logout */}
      <div className="text-danger mt-4 d-flex align-items-center gap-2" style={{ cursor: "pointer" }}>
        <i className="bi bi-box-arrow-right"></i>
        <span>Logout</span>
      </div>
    </div>
  );
};
export default Settings;
