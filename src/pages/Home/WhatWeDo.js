import React from "react";
import log from "../../asstes/images/logging.jpg";
import harvesting from "../../asstes/images/harvesting.jpg";
import manufacturing from "../../asstes/images/manufacturing.jpg";
import SentionTitle from "./../../components/SentionTitle";

const WhatWeDo = () => {
  const whatWedo = [
    {
      name: "Logging",
      img: log,
      desc: "We do Logging service model designed to be built into your digital infrastructure with the primary function of collecting and centralizing log files from any source or origin.",
    },
    {
      name: "Harvesting",
      img: harvesting,
      desc: "Harvesting services to public clients, that it and its employees or subcontractors have all necessary licenses and permits to perform the Services in the State of California, and that is familiar with the plans of District.",
    },
    {
      name: "Manufacturing",
      img: manufacturing,
      desc: "We maufacture tree products  from a tree to uasble products and do also provide it to customer and wholesaler. from tree to ready wood product we do everuthing that is possible in eco friendly way and also do our best with maintaing quality of all.",
    },
  ];
  return (
    <div className="my-10">
      <SentionTitle>What we do</SentionTitle>
      <div className="row p-4 g-4 mx-auto my-5 card-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {whatWedo.map((service, index) => (
          <div key={index} className="w-80">
            <img src={service.img} alt="" />
            <h1 className="text-xl text-center my-3 font-bold text-primary">
              {service.name}
            </h1>
            <p className="text-center">
              <small>{service.desc}</small>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatWeDo;
