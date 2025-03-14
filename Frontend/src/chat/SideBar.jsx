import React from 'react'
import { IoMdPersonAdd } from "react-icons/io";
import { FaPowerOff } from "react-icons/fa6";
import { LuMessageSquareMore } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { GiHamburgerMenu } from "react-icons/gi";
import 'bootstrap/dist/css/bootstrap.min.css';
const SideBar = () => {
  return (
    <div className="d-flex flex-column justify-content align-items-center vh-100 position-fixed top-0 start-0"  style={{width:"50px",height:"100", background: "linear-gradient(to left,rgb(251, 197, 0),rgb(255, 94, 0))", padding: "20px 0", zIndex: 1050, }} >
    <FaPowerOff size={30} color='white' />
    <LuMessageSquareMore size={30} color='white' style={{marginTop :"40px"}} />
    <IoMdPersonAdd size={30} color='white' style={{marginTop:"40px"}} />
    <HiOutlineStatusOnline size={30} color='white' style={{marginTop:"40px"}}/>
    <IoSettingsOutline size={30} color='white'  style={{marginTop :"40px"}} />
    <GiHamburgerMenu size={30} color='white'  style={{marginTop :"40px"}}/>
    </div>
  )
}

export default SideBar
