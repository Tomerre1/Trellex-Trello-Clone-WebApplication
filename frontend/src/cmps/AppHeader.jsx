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
import {
  setPosition,
  togglePopover,
  setPopoverMenu,
} from "../store/app.actions";

function _AppHeader(props) {
  const [isCreateShown, setCreateShown] = useState(false);
  const onAddBoard = async (title, bgClr, bgImg) => {
    const board = await props.addBoard(title, bgClr, bgImg);
    setCreateShown(false);
    props.history.push(`/board/${board._id}`);
  };

  // const getNotifyCount = () => {
  //   if (!props.userNotifications) return 0
  //   const notifyCount = props.userNotifications.reduce((acc, notify) => {
  //     if (notify.isNotRead) acc++
  //     return acc;
  //   }, 0)
  //   return notifyCount
  // };
  const isOnBoard = props.location.pathname.includes("board");
  return (
    <>
      <header
        className={`main-header flex align-center ${isOnBoard ? "on-board" : ""
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
          <div className="header-btn-container flex">
            <button
              className="header-btn"
              onClick={() => setCreateShown(!isCreateShown)}
            >
              <AddIcon className="icon" />
            </button>

            <button
              className="header-btn notify-btn"
              style={{
                opacity: isOnBoard ? 1 : 0.4,
                pointerEvents: isOnBoard ? 'auto' : 'none',
              }}
              onClick={(event) => {
                if (!isOnBoard) return
                props.setPosition({

                  pos: { pageX: event.pageX, pageY: event.pageY },
                  type: "NOTIFICATION",
                });
                props.setPopoverMenu(true);
                props.togglePopover();
              }}
            >
              <NotificationsNoneIcon className="icon" />
              {/* {props.userNotifications && props.userNotifications.length > 0 &&
                <div className="notify-count">{props.userNotifications ? getNotifyCount() : 0}</div>
              } */}

            </button>
            <MemberList members={[props.user]} isInHeader={true} />
          </div>
        ) : (
          <div className="header-btn-container flex login">
            <Link className="clean-link" to="/login">
              <button className="header-btn boards">Login</button>
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
    userNotifications: state.userModule.userNotifications,
  };
}
const mapDispatchToProps = {
  addBoard,
  setPosition,
  togglePopover,
  setPopoverMenu,
};

export const AppHeader = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(_AppHeader)
);
