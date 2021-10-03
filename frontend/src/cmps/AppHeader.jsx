import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { MemberList } from "../cmps/MemberList";
import { BoardPreviewAdd } from "./Workspace/BoardPreviewAdd";
import { addBoard } from "../store/board.actions";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AddIcon from "@mui/icons-material/Add";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";



function _AppHeader(props) {
  const [isCreateShown, setCreateShown] = useState(false);
  const onAddBoard = async (title, bgClr, bgImg) => {
    const board = await props.addBoard(title, bgClr, bgImg);
    setCreateShown(false);
    props.history.push(`/board/${board._id}`);
  };
  return (
    <>
      <header
        className={`main-header flex align-center ${
          props.location.pathname.includes("board") ? "on-board" : ""
        }`}
      >
        <div className="header-btn-container flex">
          <Link to="/" className="header-btn">
            <HomeOutlinedIcon />
          </Link>
          <Link to="/workspace" className="header-btn boards">
            <DashboardIcon className="icon" />
            Boards
          </Link>
        </div>
        <Link to="/" className="clean-link">
          <div className="logo">
            <DashboardIcon className="logo-icon" />
            <h1>Trellex</h1>
          </div>
        </Link>
        {props.user ? (
          <div className="header-btn-container flex end">
            <button
              className="header-btn"
              onClick={() => setCreateShown(!isCreateShown)}
            >
              <AddIcon className="icon" />
            </button>

            <button className="header-btn">
              <NotificationsNoneIcon className="icon" />
            </button>
            <MemberList members={[props.user]} isInHeader={true}/>
          </div>
        ) : (
          <div className="header-btn-container flex end">
            <Link className="clean-link"to="/login"><button
              className="header-btn boards"
            >
              Login
            </button>
            </Link>
          </div>
        )}
        <div
          className={`overlay ${isCreateShown ? "show" : ""}`}
          onClick={() => setCreateShown(false)}
        ></div>
      </header>
      {isCreateShown && (
        <BoardPreviewAdd
          boardMode="true"
          setCreateShown={setCreateShown}
          onAdd={onAddBoard}
        />
      )}
    </>
  );
}

function mapStateToProps(state) {
  return {
    user: state.userModule.loggedinUser,
    boards: state.boardModule.boards,
  };
}
const mapDispatchToProps = {
  addBoard,
};

export const AppHeader = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(_AppHeader)
);
