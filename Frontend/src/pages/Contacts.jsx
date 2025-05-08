
const Contacts = ({ onSelectContact }) => {
  const contacts = [ { name: "Freedom Cyber Cafe", phone: "+919893099930" },
    { name: "Guddu K Sakhwal", phone: "+919993687772" },
    { name: "Gungun", phone: "+919098482444" },
    { name: "hArDiK", phone: "+917566707050" },
    { name: "Hardik", phone: "+917648985553" },
    { name: "HARDIK", phone: "+919407169138" },
    { name: "Harshit ITI", phone: "+917898289040" },
    { name: "Home", phone: "+919827264978" },
    { name: "IGNOU rc", phone: "+917552578455" },
    { name: "Karan Mehta", phone: "+918745123697" },
    { name: "Anjali Sharma", phone: "+919898456321" },
    { name: "Ravi Yadav", phone: "+918123456789" },
    { name: "Pooja Chauhan", phone: "+917895632147" },
    { name: "Nikhil Joshi", phone: "+919854123789" },
    { name: "Rajveer Singh", phone: "+917896541230" },
    { name: "Neha Verma", phone: "+918789654321" },
    { name: "Saurabh Raj", phone: "+917896547832" },
    { name: "Priya Malhotra", phone: "+918745698745" },
    { name: "Amit Dubey", phone: "+919856471236" },
    { name: "Ritika Sen", phone: "+917845963214" },];

  return (
    <div style={{ display: "flex", height: "100%" }}>
      {/* Left Sidebar */}
      <div style={{ width: "530px", background: "white", overflowY: "auto"  ,marginLeft:"52px"}}>
        {contacts.map((contact, idx) => (
          <div
            key={idx}
            onClick={() => onSelectContact(contact)}
            style={{
              padding: "15px",
              borderBottom: "1px solid #ddd",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#eaeaea"}
onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
          >
            <div className="d-flex align-items-center gap-2">
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
              <div>
                <div>{contact.name}</div>
                <div style={{ fontSize: "0.9rem", color: "gray" }}>
                  {contact.phone}
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* <div className="text-center p-3">
          <button className="btn btn-sm btn-primary">Invite to Chat</button>
        </div> */}
      </div>

      {/* Right Side */}
      <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center">
        {/* <img src="/empty-message.svg" width="150" alt="No Chat" /> */}
        <h5 className="mt-3">You're starting a new conversation</h5>
        <p>Type your first message below.</p>
      </div>
    </div>
  );
};
export default Contacts