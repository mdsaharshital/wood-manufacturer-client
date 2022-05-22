import React from "react";
import ccIMG from "../asstes/images/captionIMG.png";

const SentionTitle = ({ children }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img src={ccIMG} className="w-32" alt="" />
      <h1 className="text-center text-3xl font-bold text-accent">{children}</h1>
    </div>
  );
};

export default SentionTitle;
