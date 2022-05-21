import React from "react";

const Services = () => {
  const services = [
    {
      img: "",
      title: "HARDWOOD",
      desc: "It has a more complex structure than softwood and is a slower growing type.",
    },
    {
      img: "",
      title: "LUMBER",
      desc: "Woodthat is processed into beams and planks, a process of wood production.",
    },
    {
      img: "",
      title: "SPECIES",
      desc: "The widest and richest range of exotic wood species from countries of origin.",
    },
    {
      img: "",
      title: "LOGISTICS",
      desc: "We take care of all types of transportation and delivery to your door.",
    },
  ];
  return (
    <div className=" bg-primary">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-center py-9">
        {services.map(({ title, desc }, index) => (
          <div key={index} className="">
            <h1 className="text-2xl cursor-pointer font-bold text-secondary mt-4 hover:text-amber-700">
              {title}
            </h1>
            <div className="w-14 h-1 bg-secondary m-0 p-0 mx-auto mb-4"></div>
            <p className=" text-secondary my-3">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
