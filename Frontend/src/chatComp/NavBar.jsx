import React from "react";

const NavBar = () => {
  return (
    <div
      className=" d-flex justify-content align-items-center w-100 p-3"
      style={{
        width: "20px",
        height: "70px",
        background: "linear-gradient(to bottom, #8198EE, #5B72D7)",
        padding: "20px 0",
        zIndex: 1000,
      }}
    >
      <div
        className="search_field"
        style={{
          backgroundColor: "white",
          width: "95%",
          height: "70px",
          display: "flex",
          clipPath: "polygon(0% 0%, 100% 0%, 95% 100%, 0% 100%)",
          // clipPath: 'polygon(100% 0, 0% 100%, 0 0)',
        }}
      >
        <input
          type="text"
          className="Search"
          placeholder="Search Contacts and Messages "
          required
          style={{
            marginTop: "20px",
            marginLeft: "40px",
            borderRadius: "20px",
            padding: "5px 10px",
            width: "50%",
            height: "30px",
          }}
        />
      </div>
      <div
        className="profile"
        style={{
          background: "linear-gradient(to bottom, #8198EE, #5B72D7)",
          width: "30%",

          height: "70px",
          textAlign: "center",
          color: "white",
        }}
      >
        <h6
          style={{
            marginTop: "20px",
            marginRight: "60px",
            marginBottom: "0px",
          }}
        >
          Profile
        </h6>
        <p style={{ marginTop: "0px", marginRight: "60px" }}>Online</p>
      </div>
    </div>
  );
};

export default NavBar;
