import React, { useState } from "react";
import { connect } from "react-redux";
import { onLogin } from "../store/user.actions";
import DashboardIcon from "@mui/icons-material/Dashboard";

function _LoginSignup(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (ev) => {
    ev.preventDefault();
    if (username.trim() && password.trim()) {
      props.onLogin({ username, password });
    }
  };
  return (
    <div className="login-signup  flex column align-center">
      <div className="logo flex ">
        <DashboardIcon className="logo-icon" />
        <h1>Trellex</h1>
      </div>
      <div className="login-container flex column">
        <p>Log in to Trellex</p>
        <form className="flex column" onSubmit={onLogin}>
          <input
            type="txt"
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
            placeholder="Enter Username"
          />
          <input
            type="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            placeholder="Enter password"
          />
          <button className="login-submit" >Log in</button>
        </form>
      </div>
    </div>
  );
}
const mapDispatchToProps = {
  onLogin,
};
export const LoginSignup = connect(null, mapDispatchToProps)(_LoginSignup);
