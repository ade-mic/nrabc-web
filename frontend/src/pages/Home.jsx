import React from "react";
import HomeHero_1 from "../components/HomeHero_1";
import HomeHero_2 from "../components/HomeHero_2";
import HomeHero_3 from "../components/HomeHero_3";
import MinistriesBanner from "../components/MinistriesBanner";
import ServiceBanner from "../components/ServiceBanner";

const Home = () => {
  return (
    <div>
      <HomeHero_1 />
      <ServiceBanner />
      <HomeHero_2 />
      <HomeHero_3 />
      <MinistriesBanner />
    </div>
  )
}

export default Home;