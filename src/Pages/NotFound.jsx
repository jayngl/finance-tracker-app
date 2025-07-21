import React from "react";
import { FaSadTear } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-full flex justify-center items-center min-h-screen flex-col gap-y-4">
      <FaSadTear className="text-[clamp(2.5rem,10vw,5rem)] text-blue" />
      <h1 className="text-[clamp(1.2rem,3vw,3rem)] font-bold">
        dang it! your lost
      </h1>{" "}
      <h2>The page you are looking for doesn't exist</h2>
      <Link
        to={"/"}
        className="bg-blue px-4 py-2 text-[clamp(1rem,3vw,1.4rem)] font-bold text-main-accent rounded-[.5rem]"
      >
        Back
      </Link>
    </div>
  );
};

export default NotFound;
