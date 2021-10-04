import React from "react";
import { connect } from "react-redux";
import { onLogout } from "../store/user.actions";



const _MemberPopup = ({
  member,
  togglePopOpen,
  isInHeader,
  isInBoardList,
  onLogout,
  user,
  board
}) => {

  const removeUserFromBoard = () =>{
      if(member._id === user?._id) 
      console.log('wtf')
  }

  return (
    <div className={`popup-container flex column`}>
      <div
        className="pop-overlay"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          inset: 0,
          height: "100vh",
          width: "100%",
          backgroundColor: "transparent",
          zIndex: 4,
        }}
        onClick={() => togglePopOpen(false)}
      ></div>
      <div className={`wrap  ${isInHeader ? "header" : ""}`}>
        <div className="member-popup">
          {member?.imgUrl ? (
            <img src={member.imgUrl} className="member-img" alt="member-img" />
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
          <div className="member-info flex column">
            <p className="fullname">{member.fullname}</p>
            <p className="username">{member.username}</p>
          </div>
        </div>
        <div className="member-footer">
          {isInHeader && <p className="logout" onClick={onLogout}>Logout</p>}
          {isInBoardList && <p onClick={removeUserFromBoard}>Remove from board</p>}
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  onLogout,
};
const mapStateToProps = ({userModule,boardModule}) => {
  return {
    user:userModule.loggedinUser,
    board:boardModule.board
  }
}
export const MemberPopup = connect(mapStateToProps, mapDispatchToProps)(_MemberPopup);
