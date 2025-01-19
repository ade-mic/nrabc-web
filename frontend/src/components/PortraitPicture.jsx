import React from "react";
import "./styles/PortraitPicture.css";


const PortraitPicture = ({ name, role, image }) => {
  return (
    <div className="portrait-card">
      <img src={image} alt={name} className="portrait-image" />
      <div className="portrait-details">
        <h3 className="portrait-name">{name}</h3>
        <p className="portrait-role">{role}</p>
      </div>
    </div>
  );
};

export default PortraitPicture;
