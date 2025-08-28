import { IoMdPersonAdd } from "react-icons/io"; // Importing 'Add Contact' icon
import { FaPowerOff } from "react-icons/fa6"; // Importing 'Logout' icon
import { LuMessageSquareMore } from "react-icons/lu"; // Importing 'Messages' icon
import { IoSettingsOutline } from "react-icons/io5"; // Importing 'Settings' icon
import { HiOutlineStatusOnline } from "react-icons/hi"; // Importing 'Status' icon
import { GiHamburgerMenu } from "react-icons/gi"; // Importing 'Menu' icon
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap styles
import "../css/SideBar.css"; // Importing custom styles for sidebar

// Sidebar component for navigation
const Sidebar = ({ setSelectedTab, isSidebarVisible, setIsSidebarVisible }) => {

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div
      className={`d-flex flex-column justify-content-between align-items-${isSidebarVisible ? "start" : "center"} vh-100 position-fixed top-0 start-0`}
      style={{
        width: isSidebarVisible ? "180px" : "44px", // Adjust width based on visibility
        background: "linear-gradient(to right, #56ccf2, #2f80ed)", // Gradient background color
        zIndex: 1050, // Ensure sidebar is always on top
        padding: isSidebarVisible ? "20px 10px" : "0px",
        overflow: "hidden",
        transition: "width 0.3s ease", // Smooth transition effect on toggle
      }}
    >

      {/* TOP SECTION: Hamburger Icon + Navigation Options */}
      <div className="d-flex flex-column align-items-start gap-4 w-100">

        {/* Hamburger Menu - Toggles Sidebar */}
        <div onClick={toggleSidebar} className="d-flex align-items-center gap-2 w-100" style={{ cursor: "pointer" }}>
          <GiHamburgerMenu size={28} color="white" />
          {isSidebarVisible && <span className="text-white fs-6">Menu</span>}
        </div>

        {/* Messages Tab */}
        <div onClick={() => setSelectedTab("messages")} className="d-flex align-items-center gap-2 w-100" style={{ cursor: "pointer" }}>
          <LuMessageSquareMore size={26} color="white" />
          {isSidebarVisible && <span className="text-white fs-6">Messages</span>}
        </div>

        {/* Contacts Tab */}
        <div onClick={() => setSelectedTab("contacts")} className="d-flex align-items-center gap-2 w-100" style={{ cursor: "pointer" }}>
          <IoMdPersonAdd size={26} color="white" />
          {isSidebarVisible && <span className="text-white fs-6">Contacts</span>}
        </div>

        {/* Status Tab */}
        <div onClick={() => setSelectedTab("status")} className="d-flex align-items-center gap-2 w-100" style={{ cursor: "pointer" }}>
          <HiOutlineStatusOnline size={26} color="white" />
          {isSidebarVisible && <span className="text-white fs-6">Status</span>}
        </div>

        {/* Settings Tab */}
        <div onClick={() => setSelectedTab("settings")} className="d-flex align-items-center gap-2 w-100" style={{ cursor: "pointer" }}>
          <IoSettingsOutline size={26} color="white" />
          {isSidebarVisible && <span className="text-white fs-6">Settings</span>}
        </div>

      </div>

      {/* BOTTOM SECTION: Logout Option */}
      <div onClick={() => setSelectedTab("Login")} className="d-flex align-items-center gap-2 w-100" style={{ cursor: "pointer" }}>
        <FaPowerOff size={26} color="white" />
        {isSidebarVisible && <span className="text-white fs-6">Logout</span>}
      </div>

    </div>
  );
};

export default Sidebar;