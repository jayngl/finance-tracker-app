import React from "react";

const DetailsCard = ({
  title = "saving",
  money = "$159",
  colorCode = "bg-green",
}) => {
  return (
    <div className={` flex  w-full `}>
      <div
        className={` block w-[.3rem] h-full rounded-[1rem]`}
        style={{ backgroundColor: colorCode }}
      ></div>
      <div className="ml-3 w-full">
        <h1 className="text-gray text-[.9rem] mb-1 ">{title}</h1>
        <h3 className="font-bold text-[1.1rem]">{money}</h3>
      </div>
    </div>
  );
};

export default DetailsCard;
