import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { onLogout } from "../store/user.actions";
import { saveBoard } from "../store/board.actions";

const _MemberPopup = ({
  member,
  togglePopOpen,
  isInHeader,
  isInBoardList,
  onLogout,
  user,
  board,
  saveBoard,
  history,
}) => {
  const removeUserFromBoard = async () => {
    // if (member._id === user?._id) {
    const newBoard = JSON.parse(JSON.stringify(board));
    const userIdx = newBoard.members.findIndex(
      (mmbr) => mmbr._id === member._id
    );
    newBoard.members.splice(userIdx, 1);
    try {
      await saveBoard(newBoard);
      togglePopOpen(false);
    } catch (err) {
      console.log("error when deleting user from board", err);
      // }
    }
  };

  return (
    <div className={`popup-container flex column`}>
      <div
        className="pop-overlay"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
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
          {isInHeader && (
            <p
              className="logout"
              onClick={() => {
                onLogout();
                history.push("/workspace/");
              }}
            >
              Logout
            </p>
          )}
          {isInBoardList && (
            <p className="logout" onClick={removeUserFromBoard}>
              Remove from board
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  onLogout,
  saveBoard,
};
const mapStateToProps = ({ userModule, boardModule }) => {
  return {
    user: userModule.loggedinUser,
    board: boardModule.board,
  };
};
export const MemberPopup = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(_MemberPopup)
);
