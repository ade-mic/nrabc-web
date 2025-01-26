import React from "react";

import "./styles/MinistriesBanner.css";

const ministries = [
  {
    image: "/worship.jpg",
    alt: "Worship Ministry",
    title: "Worship",
    description:
      "Let the message of Christ dwell among you richly as you teach and admonish one another with all wisdom through psalms, hymns, and songs from the Spirit, singing to God with gratitude in your hearts.",
    verse: "Colossians 3:16",
  },
  {
    image: "/fellowship-2.jpg",
    alt: "Fellowship Ministry",
    title: "Fellowship",
    description:
      "And let us consider how to stir up one another to love and good works, not neglecting to meet together.",
    verse: "Hebrews 10:24-25",
  },
  {
    image: "/equipping.jpeg",
    alt: "Equipping Ministry",
    title: "Equipping",
    description:
      "All Scripture is breathed out by God and profitable for teaching, for reproof, for correction, and for training in righteousness.",
    verse: "2 Timothy 3:16",
  },
  {
    image: "/outreach.jpg",
    alt: "Outreach Ministry",
    title: "Outreach",
    description:
      "Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.",
    verse: "Matthew 28:19",
  },
  {
    image: "/children.jpg",
    alt: "Children's Ministry",
    title: "Children's",
    description:
      "Train your child in the way he should go, and when he is old he will not depart from it.",
    verse: "Proverbs 22:6",
  },
  {
    image: "/teens.jpg",
    alt: "Youth Ministry",
    title: "Youth and Teens",
    description:
      "Let no one despise you for your youth, but set the believers an example in speech, in conduct, in love, in faith, in purity.",
    verse: "1 Timothy 4:12",
  },

];

const MinistryCard = ({ image, alt, title, description, verse }) => {
  return (
    <div className="ministry-card">
      <figure className="ministry-card-image">
        <img src={image} alt={alt} />
      </figure>
      <div className="ministry-card-content">
        <h2 className="ministry-card-title">{title}</h2>
        <p>{description}</p>
        <strong>{verse}</strong>
        <button className="button">Learn more</button>
      </div>
    </div>
  );
};

const MinistriesBanner = () => {

  return (
    <div className="ministries-banner">
    <div className="ministries-banner-content">
      <h1 className="ministries-banner-title">Our Ministries</h1>
      <p className="ministries-banner-subtitle">
        We have a variety of ministries that cater to different age groups and interests.
      </p>
      <div className="ministries-banner-card-container">
        {ministries.map((ministry, index) => (
          <MinistryCard
            key={index}
            image={ministry.image}
            alt={ministry.alt}
            title={ministry.title}
            description={ministry.description}
            verse={ministry.verse}
          />
        ))}
      </div>
    </div>
  </div>
  );
}

export default MinistriesBanner;