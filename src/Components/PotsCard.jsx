import React from "react";
import CardHeading from "../Components/CardHeading";
import DetailsCard from "./DetailsCard";
import { FaWallet } from "react-icons/fa";

const PotsCard = () => {
  return (
    <div className="w-full bg-white px-4 rounded-[.5rem] py-5 ">
      <div className="mb-2">
        <CardHeading heading={"Pots"} />
      </div>
      <div className="flex w-full gap-x-4 justify-center items-center flex-col md:flex-row gap-y-5">
        <div className="w-full bg-main-bg px-3 py-4 rounded-[.5rem] flex justify-start items-center gap-x-5">
          <FaWallet className="text-[clamp(1.5rem,3vw,3rem)] text-green" />
          <div>
            <h3 className="text-[clamp(.8rem,3vw,1.2rem)] font-semibold text-gray">
              Total Saved
            </h3>
            <h1 className="text-[clamp(1.1rem,3vw,2rem)] font-bold">$850</h1>
          </div>
        </div>
        <div className="grid grid-cols-2 w-full gap-3 ">
          <DetailsCard />
          <DetailsCard title="Gift" money="$40" colorCode="bg-blue" />
          <DetailsCard
            title="Concert Ticket"
            money="$159"
            colorCode="bg-gray"
          />
          <DetailsCard title="New Laptop" money="$10" colorCode="bg-cream" />
        </div>
      </div>
    </div>
  );
};

export default PotsCard;
