import React, { Component } from "react";
import { Link } from "react-router-dom";

export class AppHeader extends Component {
  render() {
    console.log(this.props);
    return (
      <header className="main-header flex full align-center">
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
}
