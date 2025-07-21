import React from "react";

const BalancesCard = ({
  heading,
  balance,
  bgColor = "bg-main-accent",
  textColor = "text-black",
}) => {
  return (
    <div
      className={`${bgColor} ${textColor} flex justify-center items-start flex-col rounded-[.5rem] px-4 py-5 gap-y-3 w-full`}
    >
      <h2 className="font-semibold text-gray">{heading}</h2>
      <h1 className="text-[clamp(1.4rem,3vw,2rem)] font-bold">{balance}</h1>
    </div>
  );
};

export default BalancesCard;
