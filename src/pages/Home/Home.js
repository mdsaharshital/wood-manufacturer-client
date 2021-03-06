import React from "react";
import Footer from "../../components/Footer";
import Hero from "./Hero";
import Products from "./Products";
import Services from "./Services";
import BusinessSummary from "./BusinessSummary";
import Testimony from "./Testimony";
import Partners from "./Partners";
import WhatWeDo from "./WhatWeDo";
import WeKnowBest from "./WeKnowBest";

const Home = () => {
  return (
    <div>
      <Hero />
      <Services />
      <Products />
      <WeKnowBest />
      <BusinessSummary />
      <WhatWeDo />
      <Testimony />
      <Partners />
      <Footer />
    </div>
  );
};

export default Home;
