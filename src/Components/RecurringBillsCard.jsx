import React from "react";
import CardHeading from "./CardHeading";
import BillsDetails from "./BillsDetails";

const RecurringBillsCard = () => {
  return (
    <div className="bg-main-accent px-5 py-5 rounded-[.5rem]">
      <div className="mb-2">
        <CardHeading heading={"Recurring Bills"} />
      </div>
      <div className="flex justify-center items-center gap-y-3 flex-col w-full">
        <BillsDetails />
        <BillsDetails />
        <BillsDetails />
        <BillsDetails />
      </div>
    </div>
  );
};

export default RecurringBillsCard;
