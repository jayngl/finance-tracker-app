import React from "react";
import { FaCaretRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const CardHeading = ({ heading, to }) => {
  return (
    <div className="w-full flex justify-between items-center gap-x-5 ">
      <h1 className="font-bold mb-1 text-[clamp(1.1rem,3vw,1.3rem)]">
        {heading}
      </h1>
      <Link
        to={to}
        className="text-[clamp(.5rem,3vwm,1rem)] text-gray font-semibold hover:text-gray-400"
      >
        View All
        <FaCaretRight className="inline-block text-[1.2rem] mb-1 ml-2" />
      </Link>
    </div>
  );
};

export default CardHeading;
