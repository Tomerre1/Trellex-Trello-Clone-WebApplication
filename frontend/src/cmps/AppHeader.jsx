import React  from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AddIcon from "@mui/icons-material/Add";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { MemberList} from '../cmps/MemberList'


function _AppHeader(props) {
  return (
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
          <DashboardIcon className="icon"/>
          Boards
        </Link>
      </div>
      <div>Trellex Logo</div>
      <div className="header-btn-container flex">
        <button className="header-btn">
          <AddIcon />
        </button>
        <button className="header-btn">
          <NotificationsNoneIcon />
        </button>
        <MemberList members={[props.user]}/>
        {/* <div className="user-profile">
          <p>BS</p>
        </div> */}
      </div>
    </header>
  );
}

function mapStateToProps(state) {
  return {
    user: state.userModule.loggedinUser,
  };
}
export const AppHeader = withRouter(connect(mapStateToProps)(_AppHeader));
