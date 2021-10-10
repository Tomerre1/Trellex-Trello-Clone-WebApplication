import React, { Component } from "react";
import heroImg from "../assets/img/hero.png";
import { HomeProfile } from "../cmps/Home/HomeProfile";
import reactImg from "../assets/img/reactRedux.jpg"
import nodeImg from "../assets/img/nodejs.png";
import mongoImg from "../assets/img/mongo.png";
import socketImg from "../assets/img/socket.jpg";
import expressImg from "../assets/img/express.png";
import rbdndImg from "../assets/img/rbdnd.png";

export class Homepage extends Component {
  render() {
    return (
      <section className="homepage">
        <div className="hero flex main-layout">
          <div className="hero-content flex column">
            <h1>
              <span>Trellex</span> helps teams move work forward.
            </h1>
            <p>
              Collaborate, manage projects, and reach new productivity peaks.
              From high rises to the home office, the way your team works is
              unique—accomplish it all with Trellex.
            </p>
            <button onClick={() => this.props.history.push("/workspace")}>
              To Demo
            </button>
          </div>
          <div>
            <img src={heroImg} className="hero-img" alt="" />
          </div>
        </div>
        {/* <section className="about main-layout">
          <h1>Made with</h1>
          <div className="tech flex align-center">
            <img src={reactImg} alt="logo" className="tech-logo" />
            <img src={nodeImg} alt="logo" className="tech-logo" />
            <img src={expressImg} alt="logo" className="tech-logo" />
            <img src={socketImg} alt="logo" className="tech-logo" />
            <img src={mongoImg} alt="logo" className="tech-logo" />
            <img src={rbdndImg} alt="logo" className="tech-logo" />
          </div>
          <h1>Created by</h1>
          <div className=" profiles-wrapper flex">
            <HomeProfile
              imgUrl="https://media-exp1.licdn.com/dms/image/C5603AQG9slGN5Fgxug/profile-displayphoto-shrink_800_800/0/1516840011642?e=1639008000&v=beta&t=xThiLyo5L33mzpMZwW4bejYp6AOxWmN5mkVMSYDzg1w"
              ghUrl="https://github.com/bcd82"
              liUrl="https://www.linkedin.com/in/barak-sidi-4632003a/"
              name="Barak Sidi"
            />
            <HomeProfile
              imgUrl="https://media-exp1.licdn.com/dms/image/C4E03AQFlupY8tXNbnA/profile-displayphoto-shrink_800_800/0/1622442415599?e=1639008000&v=beta&t=7jgIHBeZftuCwkVx-HtY1tbwtcJnPRLebgx4LLUtZU0"
              ghUrl="https://github.com/Tomerre1"
              liUrl="https://www.linkedin.com/in/tomer-revah-software-engineering/"
              name="Tomer Revah"
            />
            <HomeProfile
              imgUrl="https://media-exp1.licdn.com/dms/image/C4D03AQEEFClr3HeA9w/profile-displayphoto-shrink_800_800/0/1575055172966?e=1639008000&v=beta&t=n8WEpc1GPYeK78vRTmU6_Q4p2hvWL-AGQLpDxW5DVKk"
              ghUrl="https://github.com/matan3857"
              liUrl="https://www.linkedin.com/in/matan-levi-561115199/"
              name="Matan Levi"
            />
          </div>
        </section> */}
      </section>
    );
  }
}
