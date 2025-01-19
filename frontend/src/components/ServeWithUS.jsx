import React from "react";
import './styles/ServeWithUs.css';
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const UnitCard = ({ name, role, image }) => {
  return (
    <div className="unit-card">
      <img className="unit-image" src={image} alt={name} />
      <div className="unit-details">
        <h3 className="unit-name">{name}</h3>
        <p className="unit-role">{role}</p>
      </div>
    </div>
  );
};

const ServeWithUS = () => {
  const units = [
    { name: 'Choir', role: 'Leading the congregation in worship through music', image: '/units/choir.jpg' },
    { name: 'Evangelism', role: 'Spreading the gospel to the community', image: '/evangelism.jpg' },
    { name: 'Beautification', role: 'Decorating the church and keeping it clean', image: '/units/beautification.jpg' },
    { name: 'Information & Communication Technology (ICT)', role: 'Supporting the church with technical services', image: '/units/ict.jpg' },
    { name: 'Visitation and Social Ministry', role: 'Attending to the needs and social wellbeing of the church members', image: 'https://imageplaceholder.net/600x400' },
    { name: 'Ushering', role: 'Welcoming members and visitors to the church', image: 'https://imageplaceholder.net/600x400' },
    { name: 'Children Ministry', role: 'Teaching and mentoring children', image: 'https://imageplaceholder.net/600x400' },
    { name: 'Security/Traffic Control Team', role: 'Ensuring the safety of the church premises', image: 'https://imageplaceholder.net/600x400' },
    { name: 'Intercessors', role: 'Interceding for the church and the community', image: 'https://imageplaceholder.net/600x400' },
    { name: 'Event Management', role: 'Planning and organizing church events', image: 'https://imageplaceholder.net/600x400' },
    { name: 'Drama Ministry', role: 'Ministering through drama and acting', image: 'https://imageplaceholder.net/600x400' },
    { name: 'Sanctuary Keepers', role: 'Maintaining the church sanctuary', image: 'https://imageplaceholder.net/600x400' },
    { name: 'Medicals', role: 'Providing medical assistance during church services', image: 'https://imageplaceholder.net/600x400' },
  ];

  return (
    <section className="serve-with-us">
      <div className="serve-content">
        <h2 className="serve-title">Serve With Us</h2>
        <p className="serve-description">
          You can minister to others and serve God by joining any of our units. We have a variety of opportunities for you to get involved and make a difference in the lives of others.
        </p>
        <div className="serve-grid">
          {units.map((unit) => (
            <UnitCard key={unit.name} name={unit.name} role={unit.role} image={unit.image} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServeWithUS;
