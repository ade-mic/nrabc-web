import React from 'react';
import './styles/OurStoryBanner.css';

const OurStoryBanner = () => {
  return (
    <section className="our-story-banner">
      <div className="our-story-content">
        <div className="our-story-image-container">
            <img 
              src="/typewriter.jpg" 
              alt="type writer" 
              className="our-story-image" 
            />
          </div>
        <div className="our-story-text">
          <h2 className="our-story-title">Our Story</h2>
          <p className="our-story-description">
            We are a family of believers who gather together to worship God, grow in our faith, and serve one another and our community. 
            We started as a small group of believers who met in a home to worship and study the Bible together.
          </p>
          <p className="our-story-description">
            As our church grew, we moved to a larger building and expanded our ministries to meet the needs of our congregation and community. 
            Today, we continue to worship together, study the Bible, and serve others in the name of Jesus Christ.
          </p>
          <button className="our-story-button">Our Beliefs</button>
        </div>
      </div>
    </section>
  );
};

export default OurStoryBanner;
