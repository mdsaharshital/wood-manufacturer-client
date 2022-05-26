import React from "react";
import billGates from "../../asstes/images/mrbill.jpg";
import chrisRock from "../../asstes/images/Chris_Rock.jpg";
import willSmith from "../../asstes/images/will-smith.jpg";
import SentionTitle from "../../components/SentionTitle";

const Testimony = () => {
  const testimonies = [
    {
      id: 1,
      img: billGates,
      name: "Bill Gates",
      desc: "He is a wonderful company and truly a professional in this field. I will treasure them forever. I simply cannot recommend them enough!",
    },
    {
      id: 2,
      img: willSmith,
      name: "Will Smith",
      desc: "They are the absolute BEST! I have had the pleasure of getting service from them twice and would recommend them to anyone. Thank you, thank you, thank you!",
    },
    {
      id: 3,
      img: chrisRock,
      name: "Chris Rock",
      desc: "They create magic. I would never hesitate to recommend them to anyone who wants a true professional to create a customized perfume experience",
    },
  ];
  return (
    <div className="my-5">
      <SentionTitle>Reviews</SentionTitle>
      <div className="row p-4 g-4 mx-auto card-container grid grid-cols-1 md:grid-cols-3">
        {testimonies.map((testimony) => (
          <div className="mx-auto mb-5">
            <div className="mx-auto all-cards" style={{ width: "320px" }}>
              <img
                src={testimony.img}
                className="card-img-cont mx-auto block"
                alt=""
              />
              <div className="mt-3">
                <h3 className="text-center font-bold">{testimony.name}</h3>
                <p className="text-center">
                  <small>{testimony.desc}</small>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimony;
