import React, { Component } from "react";
import {Link} from "react-router-dom";
import heroImg from '../assets/img/hero.png';

export class Homepage extends Component {
  render() {
    return (
      <section className="homepage">
        <div className="hero flex home-layout">
          <div className="hero-content flex column">
            <h1>Trellex helps teams move work forward.</h1>
            <p>
              Collaborate, manage projects, and reach new productivity peaks.
              From high rises to the home office, the way your team works is
              unique—accomplish it all with Trellex.
            </p>
            <Link to="/workspace"><button>Get Started!</button></Link>
          </div>
          <div >
              <img src={heroImg} className="hero-img"/>
          </div>
        </div>
      </section>
    );
  }
}
