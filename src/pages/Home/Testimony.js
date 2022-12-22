import React, { useEffect, useState } from "react";
import SentionTitle from "../../components/SentionTitle";

const Testimony = () => {
  const [testimonies, setTestimonies] = useState([]);
  useEffect(() => {
    fetch("https://wood-manufacturer-server.onrender.com/getreviews")
      .then((res) => res.json())
      .then((data) => setTestimonies(data));
  }, []);
  return (
    <div className="my-5">
      <SentionTitle>Reviews</SentionTitle>
      <div className="row p-4 g-4 mx-auto my-5 card-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {testimonies.map((testimony, index) => (
          <div key={index} className="mx-auto mb-5 full-form w-64">
            <div className="mx-auto all-cards">
              <div className="mt-3">
                <h3 className="text-center font-bold">
                  {testimony.displayName}
                </h3>
                <p className="text-center">
                  <small>
                    Ratings:{" "}
                    <span className="font-bold">
                      {testimony.review_ratings}
                    </span>{" "}
                    out of 5
                  </small>
                </p>
                <p className="text-center">
                  <small>{testimony.review_description}</small>
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
