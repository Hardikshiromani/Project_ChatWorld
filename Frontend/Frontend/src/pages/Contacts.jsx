import React from "react";

// Contacts component for displaying a list of saved contacts
const Contacts = ({ onSelectContact }) => {
  // List of predefined contacts with names and phone numbers
  const contacts = [
    { name: "Freedom Cyber Cafe", phone: "+91359893099930" },
    { name: "Hardik", phone: "+91357648985553" },
    { name: "HARDIK", phone: "+91359407169138" },
    { name: "Harshit ITI", phone: "+91357898289040" },
    { name: "IGNOU rc", phone: "+91357552578455" },
    { name: "Karan Mehta", phone: "+91358745123697" },
    { name: "Anjali Sharma", phone: "+91359898456321" },
    { name: "Ravi Yadav", phone: "+91358123456789" },
    { name: "Pooja Chauhan", phone: "+91357895632147" },
    { name: "Nikhil Joshi", phone: "+91359854123789" },
    { name: "Rajveer Singh", phone: "+91357896541230" },
    { name: "Neha Verma", phone: "+91358789654321" },
    { name: "Saurabh Raj", phone: "+91357896547832" },
    { name: "Priya Malhotra", phone: "+91358745698745" },
    { name: "Amit Dubey", phone: "+91359856471236" },
    { name: "Ritika Sen", phone: "+91357845963214" },
  ];

  return (
    <div style={{ display: "flex", height: "100%" }}>
      {/* Left Sidebar - Displays contacts list */}
      <div style={{ width: "530px", background: "white", overflowY: "auto", marginLeft: "52px" }}>
        {contacts.map((contact, idx) => (
          <div
            key={idx}
            onClick={() => onSelectContact(contact)} // Handles contact selection
            style={{
              padding: "15px",
              borderBottom: "1px solid #ddd",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#eaeaea")} // Hover effect
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <div className="d-flex align-items-center gap-2">
              {/* Circular profile placeholder with first letter of contact name */}
              <div
                style={{
                  width: "45px",
                  height: "45px",
                  borderRadius: "50%",
                  background: "#ccc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  flexShrink: 0,
                }}
              >
                {contact.name?.charAt(0)}
              </div>
              {/* Contact details */}
              <div>
                <div>{contact.name}</div>
                <div style={{ fontSize: "0.9rem", color: "gray" }}>{contact.phone}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Side - Displays a message for new conversations */}
      <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center">
        <h5 className="mt-3">You're starting a new conversation</h5>
        <p>Type your first message below.</p>
      </div>
    </div>
  );
};

export default Contacts;