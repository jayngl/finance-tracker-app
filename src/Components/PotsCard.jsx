import React from "react";
import CardHeading from "../Components/CardHeading";
import DetailsCard from "./DetailsCard";
import { FaWallet } from "react-icons/fa";
import useCRUD from "../CustomHooks/useCRUD";
import Spinners from "./Spinners";
import Details from "../Components/DetailsCard";

const PotsCard = () => {
  const { PotsData, isPotsLoading } = useCRUD();

  return (
    <div className="w-full bg-white px-4 rounded-[.5rem] py-5 ">
      {isPotsLoading ? (
        <Spinners />
      ) : (
        <>
          <div className="mb-2">
            <CardHeading heading={"Pots"} to={"/pots"} />
          </div>
          <div className="flex w-full gap-x-4 justify-center items-center flex-col md:flex-row gap-y-5">
            <div className="w-full bg-main-bg px-3 py-4 rounded-[.5rem] flex justify-start items-center gap-x-5">
              <FaWallet className="text-[clamp(1.5rem,3vw,3rem)] text-green" />
              <div>
                <h3 className="text-[clamp(.8rem,3vw,1.2rem)] font-semibold text-gray">
                  Total Saved
                </h3>
                <h1 className="text-[clamp(1.1rem,3vw,2rem)] font-bold">
                  $
                  {Object.values(PotsData)
                    .map((item) => {
                      return item.amountSaved;
                    })
                    .reduce((accum, cur) => accum + cur, 0)}
                </h1>
              </div>
            </div>
            <div className="grid grid-cols-2 w-full gap-3 ">
              {Object.values(PotsData)
                .slice(0, 4)
                .map((item, index) => {
                  return (
                    <DetailsCard
                      key={index}
                      title={item.potName}
                      money={item.amountSaved}
                      colorCode={item.colorCode}
                    />
                  );
                })}
              {/* <DetailsCard />
              <DetailsCard title="Gift" money="$40" colorCode="bg-blue" />
              <DetailsCard
                title="Concert Ticket"
                money="$159"
                colorCode="bg-gray"
              />
              <DetailsCard
                title="New Laptop"
                money="$10"
                colorCode="bg-cream"
              /> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PotsCard;
