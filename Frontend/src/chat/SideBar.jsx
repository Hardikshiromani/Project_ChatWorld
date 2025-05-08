
// import { IoMdPersonAdd } from "react-icons/io";
// import { FaPowerOff } from "react-icons/fa6";
// import { LuMessageSquareMore } from "react-icons/lu";
// import { IoSettingsOutline } from "react-icons/io5";
// import { HiOutlineStatusOnline } from "react-icons/hi";
// import { GiHamburgerMenu } from "react-icons/gi";
// import 'bootstrap/dist/css/bootstrap.min.css';
// // import { useState } from "react";
// import "../css/SideBar.css"; // Import your CSS file


// const SideBar = ({handleInternalTabClick, isSidebarVisible, setIsSidebarVisible}) => {

//   // const [isSidebarVisible, setIsSidebarVisible] = useState(true);

//   const toggleSidebar = () => {
//     setIsSidebarVisible(!isSidebarVisible);
//   };


//   return (
//     <div className={`d-flex flex-column justify-content align-items-center vh-100 position-fixed top-0 start-0  ${isSidebarVisible ? "sidebar-visible" : "sidebar-hidden"}`}
//      style={{width:"50px",
//       height:"100%",
//        background: "linear-gradient(to right, #56ccf2, #2f80ed)",
//         zIndex: 1050,
//       paddingTop:"20px", }}
//   >
//     <GiHamburgerMenu size={30} color='white'  style={{marginTop :"40px"}} onClick={toggleSidebar}/>
//     <LuMessageSquareMore size={30} color='white' style={{marginTop :"40px"}}  onClick={() => handleInternalTabClick("messages")} />
//     <IoMdPersonAdd size={30} color='white' style={{marginTop:"40px"}} onClick={() => handleInternalTabClick("contacts")} />
//     <HiOutlineStatusOnline size={30} color='white' style={{marginTop:"40px"}}  onClick={() => handleInternalTabClick("status")}/>
//     <IoSettingsOutline size={30} color='white'  style={{marginTop :"40px"}}   onClick={() => handleInternalTabClick("settings")}/>
//     <FaPowerOff size={30} color='white'  onClick={()=> handleInternalTabClick("Login")}/>

//     </div>
//   );
// };

// export default SideBar


// import React, { useState, useEffect } from "react";
// import { IoMdPersonAdd } from "react-icons/io";
// import { FaPowerOff } from "react-icons/fa6";
// import { LuMessageSquareMore } from "react-icons/lu";
// import { IoSettingsOutline } from "react-icons/io5";
// import { HiOutlineStatusOnline } from "react-icons/hi";
// import { GiHamburgerMenu } from "react-icons/gi";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../css/SideBar.css";

// const SideBar = ({ handleInternalTabClick }) => {
//   const [isSidebarVisible, setIsSidebarVisible] = useState(true);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

//   // Check screen resize to detect mobile
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const toggleSidebar = () => {
//     setIsSidebarVisible(!isSidebarVisible);
//   };

//   return (
//     <div
//       className={`position-fixed top-0 start-0 vh-100 d-flex flex-column align-items-center 
//         ${isMobile && !isSidebarVisible ? "sidebar-hidden" : "sidebar-visible"}`}
//       style={{
//         width: isMobile ? (isSidebarVisible ? "200px" : "50px") : "50px",
//         background: "linear-gradient(to right, #56ccf2, #2f80ed)",
//         zIndex: 1050,
//         paddingTop: "20px",
//       }}
//     >
//       {/* Hamburger icon for mobile */}
//       {isMobile && (
//         <GiHamburgerMenu
//           size={30}
//           color="white"
//           style={{ marginBottom: "20px" }}
//           onClick={toggleSidebar}
//         />
//       )}

//       {/* Sidebar Icons */}
//       {isSidebarVisible && (
//         <>
//           <FaPowerOff size={30} color="white" onClick={() => handleInternalTabClick("Login")} />
//           <LuMessageSquareMore size={30} color="white" style={{ marginTop: "40px" }} onClick={() => handleInternalTabClick("messages")} />
//           <IoMdPersonAdd size={30} color="white" style={{ marginTop: "40px" }} onClick={() => handleInternalTabClick("contacts")} />
//           <HiOutlineStatusOnline size={30} color="white" style={{ marginTop: "40px" }} onClick={() => handleInternalTabClick("status")} />
//           <IoSettingsOutline size={30} color="white" style={{ marginTop: "40px" }} onClick={() => handleInternalTabClick("settings")} />
//         </>
//       )}
//     </div>
//   );
// };

// export default SideBar;


// import React, { useState, useEffect } from "react";
// import { IoMdPersonAdd } from "react-icons/io";
// import { FaPowerOff } from "react-icons/fa6";
// import { LuMessageSquareMore } from "react-icons/lu";
// import { IoSettingsOutline } from "react-icons/io5";
// import { HiOutlineStatusOnline } from "react-icons/hi";
// import { GiHamburgerMenu } from "react-icons/gi";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../css/SideBar.css";

// const SideBar = ({ handleInternalTabClick }) => {
//   const [isSidebarVisible, setIsSidebarVisible] = useState(true);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const toggleSidebar = () => {
//     setIsSidebarVisible(!isSidebarVisible);
//   };

//   return (
//     <div
//       className={`position-fixed top-0 start-0 vh-100 d-flex flex-column align-items-center 
//         ${isMobile && !isSidebarVisible ? "sidebar-hidden" : "sidebar-visible"}`}
//       style={{
//         width: isMobile ? (isSidebarVisible ? "200px" : "50px") : "150px",
//         background: "linear-gradient(to right, #56ccf2, #2f80ed)",
//         zIndex: 1050,
//         paddingTop: "20px",
//       }}
//     >
//       {/* Hamburger icon */}
//       <div className="sidebar-item" onClick={toggleSidebar}>
//         <GiHamburgerMenu size={30} color="white" />
//         {isSidebarVisible && <span className="sidebar-label">Menu</span>}
//       </div>

//       {/* Sidebar Icons with Labels */}
//       {isSidebarVisible && (
//         <>
//           <div className="sidebar-item" onClick={() => handleInternalTabClick("Login")}>
//             <FaPowerOff size={30} color="white" />
//             <span className="sidebar-label">Logout</span>
//           </div>
//           <div className="sidebar-item" onClick={() => handleInternalTabClick("messages")}>
//             <LuMessageSquareMore size={30} color="white" />
//             <span className="sidebar-label">Messages</span>
//           </div>
//           <div className="sidebar-item" onClick={() => handleInternalTabClick("contacts")}>
//             <IoMdPersonAdd size={30} color="white" />
//             <span className="sidebar-label">Contacts</span>
//           </div>
//           <div className="sidebar-item" onClick={() => handleInternalTabClick("status")}>
//             <HiOutlineStatusOnline size={30} color="white" />
//             <span className="sidebar-label">Status</span>
//           </div>
//           <div className="sidebar-item" onClick={() => handleInternalTabClick("settings")}>
//             <IoSettingsOutline size={30} color="white" />
//             <span className="sidebar-label">Settings</span>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default SideBar;


// import { IoMdPersonAdd } from "react-icons/io";
// import { FaPowerOff } from "react-icons/fa6";
// import { LuMessageSquareMore } from "react-icons/lu";
// import { IoSettingsOutline } from "react-icons/io5";
// import { HiOutlineStatusOnline } from "react-icons/hi";
// import { GiHamburgerMenu } from "react-icons/gi";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "../css/SideBar.css"; // Import your CSS file

// const SideBar = ({ handleInternalTabClick, isSidebarVisible, setIsSidebarVisible }) => {

//   const toggleSidebar = () => {
//     setIsSidebarVisible(!isSidebarVisible);
//   };

//   return (
//     <div 
//       className={`d-flex flex-column justify-content-between align-items-center vh-100 position-fixed top-0 start-0 ${isSidebarVisible ? "sidebar-visible" : "sidebar-hidden"}`}
//       style={{
//         width: "60px",
//         // background: "linear-gradient(to right, #56ccf2, #2f80ed)",
//         background:"rgb(24, 15, 180)",
//         zIndex: 1050,
//         padding: "20px 0",
//       }}
//     >
//       {/* Top icon (Hamburger) */}
//       <div className="d-flex flex-column align-items-center gap-4">
//       <div onClick={toggleSidebar}>
//         <GiHamburgerMenu size={28} color="white" />
//       </div>

//       {/* Middle icons */}
//         <LuMessageSquareMore size={28} color="white" onClick={() => handleInternalTabClick("messages")} />
//         <IoMdPersonAdd size={28} color="white" onClick={() => handleInternalTabClick("contacts")} />
//         <HiOutlineStatusOnline size={28} color="white" onClick={() => handleInternalTabClick("status")} />
//         <IoSettingsOutline size={28} color="white" onClick={() => handleInternalTabClick("settings")} />
//       </div>

//       {/* Bottom icon (Logout) */}
//       <div onClick={() => handleInternalTabClick("Login")}>
//         <FaPowerOff size={28} color="white" />
//       </div>
//     </div>
//   );
// };

// export default SideBar;

// import { useState, useEffect } from "react";
// import { IoMdPersonAdd } from "react-icons/io";
// import { FaPowerOff } from "react-icons/fa6";
// import { LuMessageSquareMore } from "react-icons/lu";
// import { IoSettingsOutline } from "react-icons/io5";
// import { HiOutlineStatusOnline } from "react-icons/hi";
// import { GiHamburgerMenu } from "react-icons/gi";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "../css/SideBar.css";

// const SideBar = ({ handleInternalTabClick, isSidebarVisible, setIsSidebarVisible }) => {
//   const [isMobile, setIsMobile] = useState(false);

//  // Detect screen size
//  useEffect(() => {
//   const handleResize = () => {
//     setIsMobile(window.innerWidth <= 768); // mobile width
//   };

//   handleResize(); // initial check
//   window.addEventListener("resize", handleResize);
  
//   return () => window.removeEventListener("resize", handleResize);
// }, []);

//   const toggleSidebar = () => {
//     setIsSidebarVisible(!isSidebarVisible);
//   };


//   const handleInternalTabClick = (tabName) => {
//     handleInternalTabClick(tabName);

//     // If on mobile, auto-close sidebar after tab click
//     if (isMobile) {
//       setIsSidebarVisible(false);
//     }
//   };
//   return (
//     <div
//       className={`d-flex flex-column justify-content-between align-items-${isSidebarVisible ? "start" : "center"} vh-100 position-fixed top-0 start-0`}
//       style={{
//         width: isSidebarVisible ? "200px" : "60px",
//         background: "linear-gradient(to right, #56ccf2, #2f80ed)",
//         zIndex: 1050,
//         padding: "20px 10px",
//         transition: "width 0.3s ease",
//       }}
//     >
//       {/* TOP: Hamburger + Menu Options */}
//       <div className="d-flex flex-column align-items-start gap-4 w-100">
//         <div onClick={toggleSidebar} className="d-flex align-items-center gap-2 w-100" style={{ cursor: "pointer" }}>
//           <GiHamburgerMenu size={28} color="white" />
//           {isSidebarVisible && <span className="text-white fs-6">Menu</span>}
//         </div>

//         <div onClick={() => handleInternalTabClick("messages")} className="d-flex align-items-center gap-2 w-100" style={{ cursor: "pointer" }}>
//           <LuMessageSquareMore size={26} color="white" />
//           {isSidebarVisible && <span className="text-white fs-6">Messages</span>}
//         </div>

//         <div onClick={() => handleInternalTabClick("contacts")} className="d-flex align-items-center gap-2 w-100" style={{ cursor: "pointer" }}>
//           <IoMdPersonAdd size={26} color="white" />
//           {isSidebarVisible && <span className="text-white fs-6">Contacts</span>}
//         </div>

//         <div onClick={() => handleInternalTabClick("status")} className="d-flex align-items-center gap-2 w-100" style={{ cursor: "pointer" }}>
//           <HiOutlineStatusOnline size={26} color="white" />
//           {isSidebarVisible && <span className="text-white fs-6">Status</span>}
//         </div>

//         <div onClick={() => handleInternalTabClick("settings")} className="d-flex align-items-center gap-2 w-100" style={{ cursor: "pointer" }}>
//           <IoSettingsOutline size={26} color="white" />
//           {isSidebarVisible && <span className="text-white fs-6">Settings</span>}
//         </div>
//       </div>

//       {/* BOTTOM: Logout */}
//       <div onClick={() => handleInternalTabClick("Login")} className="d-flex align-items-center gap-2 w-100" style={{ cursor: "pointer" }}>
//         <FaPowerOff size={26} color="white" />
//         {isSidebarVisible && <span className="text-white fs-6">Logout</span>}
//       </div>
//     </div>
//   );
// };

// export default SideBar;

// import { useState, useEffect } from "react";
// import { IoMdPersonAdd } from "react-icons/io";
// import { FaPowerOff } from "react-icons/fa6";
// import { LuMessageSquareMore } from "react-icons/lu";
// import { IoSettingsOutline } from "react-icons/io5";
// import { HiOutlineStatusOnline } from "react-icons/hi";
// import { GiHamburgerMenu } from "react-icons/gi";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "../css/SideBar.css";

// const SideBar = ({ handleTabClick, isSidebarVisible, setIsSidebarVisible }) => {
//   const [isMobile, setIsMobile] = useState(false);

//   // Detect screen size
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const toggleSidebar = () => {
//     setIsSidebarVisible(!isSidebarVisible);
//   };

//   // ✅ Create a *new* internal click handler
//   const handleInternalTabClick = (tabName) => {
//     handleTabClick(tabName); // call the real one passed from parent
//     if (isMobile) {
//       setIsSidebarVisible(false); // hide sidebar after clicking tab (in mobile only)
//     }
//   };

  
//   return (
//     <div
//       className={`d-flex flex-column justify-content-between align-items-${isSidebarVisible ? "start" : "center"} vh-100 position-fixed top-0 start-0`}
//       style={{
//         width: isSidebarVisible ? "200px" : "60px",
//         background: "linear-gradient(to right, #56ccf2, #2f80ed)",
//         zIndex: 1050,
//         padding: "20px 10px",
//         transition: "width 0.3s ease",
//       }}
//     >
//       {/* TOP: Hamburger + Menu Options */}
//       <div className="d-flex flex-column align-items-start gap-4 w-100">
//         <div onClick={toggleSidebar} className="d-flex align-items-center gap-2 w-100" style={{ cursor: "pointer" }}>
//           <GiHamburgerMenu size={28} color="white" />
//           {isSidebarVisible && <span className="text-white fs-6">Menu</span>}
//         </div>

//         <div onClick={() => handleInternalTabClick("messages")} className="d-flex align-items-center gap-2 w-100" style={{ cursor: "pointer" }}>
//           <LuMessageSquareMore size={26} color="white" />
//           {isSidebarVisible && <span className="text-white fs-6">Messages</span>}
//         </div>

//         <div onClick={() => handleInternalTabClick("contacts")} className="d-flex align-items-center gap-2 w-100" style={{ cursor: "pointer" }}>
//           <IoMdPersonAdd size={26} color="white" />
//           {isSidebarVisible && <span className="text-white fs-6">Contacts</span>}
//         </div>

//         <div onClick={() => handleInternalTabClick("status")} className="d-flex align-items-center gap-2 w-100" style={{ cursor: "pointer" }}>
//           <HiOutlineStatusOnline size={26} color="white" />
//           {isSidebarVisible && <span className="text-white fs-6">Status</span>}
//         </div>

//         <div onClick={() => handleInternalTabClick("settings")} className="d-flex align-items-center gap-2 w-100" style={{ cursor: "pointer" }}>
//           <IoSettingsOutline size={26} color="white" />
//           {isSidebarVisible && <span className="text-white fs-6">Settings</span>}
//         </div>
//       </div>

//       {/* BOTTOM: Logout */}
//       <div onClick={() => handleInternalTabClick("Login")} className="d-flex align-items-center gap-2 w-100" style={{ cursor: "pointer" }}>
//         <FaPowerOff size={26} color="white" />
//         {isSidebarVisible && <span className="text-white fs-6">Logout</span>}
//       </div>
//     </div>
//   );
// };

// export default SideBar;


import { IoMdPersonAdd } from "react-icons/io";
import { FaPowerOff } from "react-icons/fa6";
import { LuMessageSquareMore } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { GiHamburgerMenu } from "react-icons/gi";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/SideBar.css";

const SideBar = ({ setSelectedTab, isSidebarVisible, setIsSidebarVisible}) => {

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div
      className={`d-flex flex-column justify-content-between align-items-${isSidebarVisible ? "start" : "center"} vh-100 position-fixed top-0 start-0`}
      style={{
        // width: isSidebarVisible ? "200px" : "60px",
        width: isSidebarVisible ? "180px" : "44px" ,
        background: "linear-gradient(to right, #56ccf2, #2f80ed)",
        zIndex: 1050,
        padding: isSidebarVisible ? "20px 10px" : "0px",
        overflow: "hidden",
        transition: "width 0.3s ease",
      }}
    >
      {/* TOP: Hamburger + Menu Options */}
      <div className="d-flex flex-column align-items-start gap-4 w-100">
        <div onClick={toggleSidebar} className="d-flex align-items-center gap-2 w-100" style={{ cursor: "pointer" }}>
          <GiHamburgerMenu size={28} color="white" />
          {isSidebarVisible && <span className="text-white fs-6">Menu</span>}
        </div>

        <div onClick={() => setSelectedTab("messages")} className="d-flex align-items-center gap-2 w-100" style={{ cursor: "pointer" }}>
          <LuMessageSquareMore size={26} color="white" />
          {isSidebarVisible && <span className="text-white fs-6">Messages</span>}
        </div>

        <div onClick={() => setSelectedTab("contacts")} className="d-flex align-items-center gap-2 w-100" style={{ cursor: "pointer" }}>
          <IoMdPersonAdd size={26} color="white" />
          {isSidebarVisible && <span className="text-white fs-6">Contacts</span>}
        </div>

        <div onClick={() => setSelectedTab("status")} className="d-flex align-items-center gap-2 w-100" style={{ cursor: "pointer" }}>
          <HiOutlineStatusOnline size={26} color="white" />
          {isSidebarVisible && <span className="text-white fs-6">Status</span>}
        </div>

        <div onClick={() => setSelectedTab("settings")} className="d-flex align-items-center gap-2 w-100" style={{ cursor: "pointer" }}>
          <IoSettingsOutline size={26} color="white" />
          {isSidebarVisible && <span className="text-white fs-6">Settings</span>}
        </div>
      </div>

      {/* BOTTOM: Logout */}
      <div onClick={() => setSelectedTab("Login")} className="d-flex align-items-center gap-2 w-100" style={{ cursor: "pointer" }}>
        <FaPowerOff size={26} color="white" />
        {isSidebarVisible && <span className="text-white fs-6">Logout</span>}
      </div>
    </div>
  );
};

export default SideBar;
