import React from "react";
import logo from "../../asstes/images/logoImg.png";
import hero1 from "../../asstes/images/banner-1.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className="h-screen flex flex-col justify-center items-center gap-9 "
      style={{
        background: `url(${hero1})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <img src={logo} alt="" />
      <div className="">
        <h1 className="font-bold text-secondary mt-10">QULITY WOOD FROM</h1>
        <div className="w-10 h-1 bg-secondary m-0 p-0 mx-auto"></div>
      </div>
      <h1 className=" text-5xl text-secondary md:text-6xl font-bold">
        GREAT TRESS!
      </h1>
      <button className="btn btn-primary rounded-none text-white px-6">
        <Link to="/">Shop Now</Link>
      </button>
    </div>
  );
};

export default Hero;
