import React from "react";

const BillsDetails = ({
  billName = "Paid Bills",
  value = "$190",
  colorCode = "border-green",
}) => {
  return (
    <div
      className={`border-l-4 ${colorCode} rounded-[.5rem] px-4 bg-main-bg flex justify-between items-center py-5 w-full`}
    >
      <h3 className="text-gray text-[clamp(.8rem,3vw,1.1rem)] font-semibold">
        {billName}
      </h3>
      <p className="font-bold text-[clamp(1rem,3vw,1.2rem)]">{value}</p>
    </div>
  );
};

export default BillsDetails;
