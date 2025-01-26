import React from 'react';
import PortraitPicture from './PortraitPicture';
import './styles/PastoralTeamBanner.css';

const PastoralTeamBanner = () => {
  const pastoralTeam = [
    { name: 'Revd Dr. Kayode Oyedemi', role: 'Church Pastor', imageUrl: '/pastors_portrait/oyedemi_portrait.jpg' },
    { name: 'Revd Seyi Olaniran', role: 'Youth and Educational Minister', imageUrl: '/pastors_portrait/olaniran_portrait.jpg' },
    { name: 'Pastor Meshach. A. Ogungbe', role: 'Music Ministerr', imageUrl: '/pastors_portrait/ogungbe_portaiit.jpg' },
    { name: 'Revd Mrs A.O. Ajayi', role: 'Ministerial Assistant (Children Ministry)', imageUrl: 'pastors_portrait/professional_women.jpg' },
  ];

  return (
    <section id="our-leaders" className="pastoral-team-banner">
      <div className="banner-content">
        <h2 className="banner-title">Our Pastoral Team</h2>
        <p className="banner-description">
          Meet the dedicated leaders who guide our church. They are committed to helping you grow in your faith and connect with God.
        </p>
        <div className="pastoral-team-grid">
          {pastoralTeam.map((pastor) => (
            <PortraitPicture key={pastor.name} name={pastor.name} role={pastor.role} image={pastor.imageUrl} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PastoralTeamBanner;
