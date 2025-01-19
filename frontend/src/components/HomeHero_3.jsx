import React from "react";
import "./styles/HomeHero_3.css";

const HomeHero_3 = () => {
  return (
    <div className="hero-container-3">
      <div className="hero-content-3">
        <h1 className="hero-title-3">Grow in Grace</h1>
        <div className="hero-card-container-3">
          <div className="hero-card-3">
            <figure className="hero-card-image-3">
              <img src="/bible.jpg" alt="Bible study" />
            </figure>
            <div className="hero-card-content-3">
              <h2 className="hero-card-title-3">Bible Study</h2>
              <p>
                All Scripture is breathed out by God and profitable for teaching, for reproof, for correction, and for training in righteousness.
              </p>
              <strong>2 Timothy 3:16</strong>
              <button className="button-3">Learn more</button>
            </div>
          </div>
          <div className="hero-card-3">
            <figure className="hero-card-image-3">
              <img src="/discipleship_steps.jpg" alt="Discipleship steps" style={{height: "146px"}} />
            </figure>
            <div className="hero-card-content-3">
              <h2 className="hero-card-title-3">Discipleship</h2>
              <p>
                If anyone would come after me, let him deny himself and take up his cross daily and follow me.
              </p>
              <strong>Matthew 16:24-27</strong>
              <button className="button-3">Learn more</button>
            </div>
          </div>
          <div className="hero-card-3">
            <figure className="hero-card-image-3">
              <img src="/prayer.jpg" alt="Prayer" />
            </figure>
            <div className="hero-card-content-3">
              <h2 className="hero-card-title-3">Prayer</h2>
              <p>
                And whatever you ask in prayer, you will receive, if you have faith.
              </p>
              <strong>Matthew 21:22</strong>
              <button className="button-3">Learn more</button>
            </div>
          </div>
          <div className="hero-card-3">
            <figure className="hero-card-image-3">
              <img src="/fellowship-1.jpg" alt="Fellowship" />
            </figure>
            <div className="hero-card-content-3">
              <h2 className="hero-card-title-3">Fellowship</h2>
              <p>
                And let us consider how to stir up one another to love and good works, not neglecting to meet together.
              </p>
              <strong>Hebrews 10:24-25</strong>
              <button className="button-3">Learn more</button>
            </div>
          </div>
          <div className="hero-card-3">
            <figure className="hero-card-image-3">
              <img src="/evangelism.jpg" alt="Evangelism" />
            </figure>
            <div className="hero-card-content-3">
              <h2 className="hero-card-title-3">Evangelism</h2>
              <p>
                Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.
              </p>
              <strong>Matthew 28:19</strong>
              <button className="button-3">Learn more</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHero_3;
