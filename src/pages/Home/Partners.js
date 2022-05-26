import React from "react";
import SentionTitle from "../../components/SentionTitle";
import partner1 from "../../asstes/images/partner1.webp";
import partner2 from "../../asstes/images/partner2.webp";
import partner3 from "../../asstes/images/partner3.webp";
import partner4 from "../../asstes/images/partner4.webp";
import partner5 from "../../asstes/images/partner5.webp";
import partner6 from "../../asstes/images/partner6.webp";

const Partners = () => {
  const partners = [
    {
      image: partner1,
    },
    {
      image: partner2,
    },
    {
      image: partner3,
    },
    {
      image: partner4,
    },
    {
      image: partner5,
    },
    {
      image: partner6,
    },
  ];
  return (
    <div className="my-10">
      <SentionTitle>Our Partners</SentionTitle>
      <div className="row p-4 g-4 mx-auto card-container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 my-10">
        {partners.map((testimony) => (
          <div className="mx-auto mb-5">
            <div className="mx-auto all-cards" style={{ width: "90px" }}>
              <img
                src={testimony.image}
                className="card-img-cont mx-auto block"
                alt=""
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;
