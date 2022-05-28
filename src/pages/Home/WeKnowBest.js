import React from "react";
import heroJoss from "../../asstes/images/weknoswww.jpg";

const WeKnowBest = () => {
  return (
    <div>
      <div
        className="h-[80vh] flex flex-col justify-center items-center gap-9 "
        style={{
          background: `url(${heroJoss})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-secondary text-4xl">
          “Land and timber are what we know best!”
        </h1>
        <p className="text-secondary">Jeremy Daniels</p>
      </div>
    </div>
  );
};

export default WeKnowBest;
