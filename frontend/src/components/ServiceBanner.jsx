import React from "react";
import "./styles/ServiceBanner.css";

const ServiceBanner = () => {
  const services = [
    { title: "Morning Service", time: "Sundays at 7:30am" },
    { title: "Second Service", time: "Sundays at 9:00am" },
    { title: "Bible Study", time: "Thursdays at 6:00pm" },
    { title: "Prayer Service", time: "Wednesdays at 6:00pm" },
  ];

  return (
    <div id="weekly-services" className="service-banner">
      <h1 className="service-banner-title">Our Worship Services</h1>
      <p className="service-banner-description">
        Join us for our weekly worship services. Everyone is welcome!
      </p>
      <div className="service-banner-card-container">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <h2 className="service-card-title">{service.title}</h2>
            <p className="service-card-time">{service.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceBanner;
