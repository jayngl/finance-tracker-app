import React, { useState } from "react";
import CardHeading from "./CardHeading";
import SingleTransaction from "./SingleTransaction";
import useCRUD from "../CustomHooks/useCRUD";
import Spinners from "./Spinners";

const TransactionsCard = () => {
  // const [transactions,setTransactions]=useState()
  const { TransactionItem, isTransactionsLoading } = useCRUD();
  return (
    <div className="px-5 py-5 bg-main-accent rounded-[.5rem] w-full">
      <div className="mb-2">
        <CardHeading heading={"Transactions"} to={"/transactions"} />
      </div>
      {isTransactionsLoading ? (
        <Spinners isLoading={isTransactionsLoading} />
      ) : (
        TransactionItem &&
        Object.values(TransactionItem)
          .slice(0, 5)
          .map((el, index) => {
            return (
              <SingleTransaction
                key={index}
                Name={el.entity}
                value={`$${el.amount}`}
                date={el.date}
                isLast={Object.entries(TransactionItem).length - 1 === index}
                category={el.category}
              />
            );
          })
      )}
    </div>
  );
};

export default TransactionsCard;
