import React from "react";
import Footer from "../../components/Footer";
import Hero from "./Hero";
import Products from "./Products";
import Services from "./Services";

const Home = () => {
  return (
    <div>
      <Hero />
      <Services />
      <Products />
      <Footer />
    </div>
  );
};

export default Home;
