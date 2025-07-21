import React, { useContext } from "react";
import useCRUD from "../CustomHooks/useCRUD";

const BudgetSummary = ({
  isLast = false,
  title = "Entertainment",
  colorCode = "green",
  amountSpent = "$0.00",
  totalAmount = "50.00",
}) => {
  const { TransactionItem } = useCRUD();
  return (
    <div
      className={`w-full flex justify-between items-center py-2 ${
        isLast ? "border-b-none" : "border-b-1 border-gray-300"
      } `}
    >
      <div className="flex justify-center items-center">
        <div
          className={`h-[2rem] rounded-full w-1 bg-${colorCode}-500 mr-4`}
        ></div>
        <h1 className="text-[clamp(.8rem,2vw,.9rem)] font-bold text-gray-500">
          {title}
        </h1>
      </div>

      <div className="flex justify-center items-center">
        <h1 className="text-[clamp(.8rem,2vw,.9rem)] font-bold ">
          $
          {Object.values(TransactionItem)
            .filter((el) => {
              return el.category === title && el.type === "sent";
            })
            .map((el) => {
              return Math.abs(el.amount);
            })
            .reduce((accum, curr) => accum + curr, 0)}
        </h1>
        <p className="mx-2">of</p>
        <h1 className="text-[clamp(.8rem,2vw,.9rem)] text-gray-500 font-semibold">
          ${totalAmount}
        </h1>
      </div>
    </div>
  );
};

export default BudgetSummary;
