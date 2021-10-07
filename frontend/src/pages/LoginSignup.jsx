import React, { useState } from "react";
import { connect } from "react-redux";
import { onLogin, onSignup } from "../store/user.actions";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { GoogleLogin } from "react-google-login";
import { utilService } from "../services/util.service";

function _LoginSignup(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const CLIENT_ID =
    "1066940480428-m4n85h2lafgf2m7v5j7prda0tmigel93.apps.googleusercontent.com";

  const onSuccess = async (res) => {
    console.log("success");
    const fullname = res.profileObj.name;
    const username = `${res.profileObj.givenName} `;
    const password = res.profileObj.googleId;
    const imgUrl = res.profileObj.imageUrl;
    isLogin
      ? await props.onLogin({ username, password })
      : await props.onSignup({ username, password, imgUrl, fullname });
    props.history.push("/workspace/");
  };

  const onFail = (response) => {
    console.log("failed");
    console.dir(response);
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (username.trim() && password.trim()) {
      if (fullname) {
        await props.onSignup({ username, password, fullname, imgUrl: "" });
      } else {
        props.onLogin({ username, password });
      }
    }
    props.history.push("/workspace");
  };
  return (
    <div className="login-signup  flex column align-center">
      <div className="logo flex ">
        <DashboardIcon className="logo-icon" />
        <h1>Trellex</h1>
      </div>
      <div className="login-container flex column">
        {isLogin ? <p>Log in to Trellex</p> : <p>Sign up</p>}
        <form className="flex column" onSubmit={onSubmit}>
          <input
            type="txt"
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
            placeholder="Enter Username"
          />
          {!isLogin && (
            <input
              type="txt"
              value={fullname}
              onChange={(ev) => setFullname(ev.target.value)}
              placeholder="Enter Full Name"
            />
          )}
          <input
            type="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            placeholder="Enter Password"
          />
          <button className="login-submit">
            {isLogin ? "Log me in" : "Sign me up"}
          </button>
          <GoogleLogin
            clientId={CLIENT_ID}
            buttonText={isLogin ? "Login with Google ": "Sign up with Google"}
            onSuccess={onSuccess}
            onFailure={onFail}
            cookiePolicy={"single_host_origin"}
          />
        </form>

        <p onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Or sign up..." : "Back to Login"}
        </p>
      </div>
    </div>
  );
}
const mapDispatchToProps = {
  onLogin,
  onSignup,
};
export const LoginSignup = connect(null, mapDispatchToProps)(_LoginSignup);
