import React from 'react'

export  const MemberPopup = ({member,togglePopOpen}) => {
    return (
    <div className="popup-container">
    <div className="pop-overlay" style={{position:'fixed',top:0,right:0,inset:0,height:'100vh',width:'100%',backgroundColor:'transparent',zIndex:10}} onClick={()=>togglePopOpen(false)}></div>
      <div className="member-popup">
        {member?.imgUrl ? (
          <img src={member.imgUrl} className="member-img" alt={"member-img"} />
        ) : (
          <div
            className="member-img"
            style={{ background: "rgb(223, 225, 230)", color: "inherit" }}
          >
            <p className={`member-letter preview`}>
              {member?.fullname?.[0].toUpperCase() || ""}
            </p>
          </div>
        )}
      </div>
    </div>
    );
  };