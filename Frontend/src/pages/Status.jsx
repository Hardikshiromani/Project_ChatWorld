import React from 'react'

const Status = () => {
    const myStatus = {
      name: "My Status",
      time: "Today, 10:00 AM",
      image: "https://example.com/my-status.jpg"
    };

    const statusList = [
      {
        name: "John Doe",
        time: "Today, 9:00 AM",
        image: "https://example.com/john.jpg"
      },
      {
        name: "Jane Smith",
        time: "Today, 8:00 AM",
        image: "https://example.com/jane.jpg"
      },
      {
        name: "Bob Johnson",
        time: "Today, 7:00 AM",
        image: "https://example.com/bob.jpg"
      },
    ];


    return (
      <div className="p-3" style={{ width: "45%", height: "100%", overflowY: "auto",  marginLeft: "35px"}}>
        <div className='d-flex align-items-center mb-4'>
          <img src={myStatus.image} alt="My Status" 
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "2px solid gray",
            marginRight: "10px"
          }}
          />

          <div>
            <div style={{ fontWeight: "bold" }}>{myStatus.name}</div>
            <div style={{ color: "gray", fontSize: "0.9rem" }}>
              Tap to add status update
            </div>
          </div>
        </div>
        
          <hr />

            <h6 className="text-muted mb-3">Recent Updates</h6>
         {statusList.map((status,index)=>(
          <div key={index} className="d-flex align-items-center mb-3" style={{ cursor: "pointer" }}>
       <img
            src={status.image}
            alt={status.name}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              border: "2px solid green",
              marginRight: "10px",
            }}
          />
         <div>
            <div style={{ fontWeight: "500" }}>{status.name}</div>
            <div style={{ color: "gray", fontSize: "0.85rem" }}>{status.time}</div>
          </div>
        </div>
))}
        </div>
  
        );
};


export default Status;
