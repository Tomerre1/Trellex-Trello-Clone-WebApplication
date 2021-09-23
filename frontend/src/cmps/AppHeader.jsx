import React from "react";
import { Link ,withRouter } from "react-router-dom";
import { connect } from "react-redux";

 function _AppHeader (props) {
    return (
      <header className={`main-header flex align-center ${props.location.pathname.includes('board') ? 'on-board' : ''}`}>
        <div className="header-btn-container flex">
          <Link to="/" className="header-btn">
            home
          </Link>
          <Link to="/workspace" className="header-btn">
            boards
          </Link>
        </div>
        <div>Trellex Logo</div>
        <div className="header-btn-container flex">
          <button className="header-btn">add</button>
          <button className="header-btn">notifications</button>
          <div className="user-profile">
            <p>BS</p>
          </div>
        </div>
      </header>
    );
}
function mapStateToProps(state) {
  return {
    user: state.userModule.loggedInUser,
  };
}
export const AppHeader = withRouter(connect(mapStateToProps)(_AppHeader));
