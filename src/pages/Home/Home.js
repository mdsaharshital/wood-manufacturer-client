import React from "react";
import Footer from "../../components/Footer";
import Hero from "./Hero";
import Products from "./Products";
import Services from "./Services";
import BusinessSummary from "./BusinessSummary";
import Testimony from "./Testimony";

const Home = () => {
  return (
    <div>
      <Hero />
      <Services />
      <Products />
      <BusinessSummary />
      <Testimony />
      <Footer />
    </div>
  );
};

export default Home;
