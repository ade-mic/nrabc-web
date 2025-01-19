import React from "react";
import "./styles/HomeHero_1.css";
import {HashLink as Link} from "react-router-hash-link";

const HomeHero_1 = () => {
  return (
    <div className="home-hero-1">
      <div className="background-image"></div>
      <div className="overlay"></div>
      <div className="hero-content">
        <h1>BECOME PART OF OUR CHURCH COMMUNITY</h1>
        <p>
          not giving up meeting together, as some are in the habit of doing,
          but encouraging one another—and all the more as you see the Day approaching. 
          <i> Hebrews 10:25 (NIV)</i>
        </p>
          <Link smooth to="#weekly-services" className="btn">
          WORSHIP WITH US
          </Link>
      </div>
    </div>
  );
};

export default HomeHero_1;
