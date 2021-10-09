import React, { Component } from "react";
import { Link } from "react-router-dom";
import heroImg from "../assets/img/hero.png";
import { HomeProfile } from "../cmps/Home/HomeProfile";

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
            <img src={heroImg} className="hero-img" />
          </div>
        </div>
        <section className="profiles main-layout">
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
        </section>
      </section>
    );
  }
}
