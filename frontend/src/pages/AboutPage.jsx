import React from 'react';
import MissionBanner from '../components/MissionBanner';
import OurStoryBanner from '../components/OurStoryBanner';
import PastoralTeamBanner from '../components/PastoralTeamBanner';
import ServeWithUS from '../components/ServeWithUS';
import WhatToExpect from '../components/WhatTOExpect';
import {HashLink as Link} from "react-router-hash-link";

import '../styles/AboutUsPage.css';

const AboutUsPage = () => {
  return (
    <div className="about-us-page">
      <nav className="about-us-nav">
        <h1 className="about-us-nav-title">About Us</h1>
        <ul className="about-us-nav-links">
          <li>
            <Link smooth to="#what-to-expect" className="about-us-nav-link">What To Expect</Link>
          </li>
          <li>
            <Link smooth to="#our-beliefs" className="about-us-nav-link">Our Beliefs</Link>
          </li>
          <li>
            <Link smooth to="#our-leaders" className="about-us-nav-link">Our Leadership</Link>
          </li>
        </ul>
      </nav>
      <MissionBanner />
      <OurStoryBanner />
      <PastoralTeamBanner />
      <ServeWithUS />
      <WhatToExpect  />
    </div>
  );
};

export default AboutUsPage;
