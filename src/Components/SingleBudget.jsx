import React, { useEffect, useState, useContext, createContext } from "react";
import useCRUD from "../CustomHooks/useCRUD";
import SingleTransaction from "./SingleTransaction";
import Spinners from "./Spinners";
import { FaCaretRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import BudgetSummary from "./BudgetSummary";

const SpendingContext = createContext();

const SingleBudget = ({ colorCode, title, maxSpend }) => {
  const { TransactionItem, isTransactionsLoading } = useCRUD();

  const [transactions, setTransactions] = useState([]);
  const [newMaxSpend, setNewMaxSpend] = useState(0);

  const handleFilteringTransactions = () => {
    return (
      TransactionItem &&
      Object.values(TransactionItem).filter((item) => {
        return item.category === title;
      })
    );
  };

  const AmountCalc = (type) => {
    return transactions
      .map((el) => {
        return el.type === type && Math.abs(el.amount);
      })
      .reduce((accum, curr) => accum + curr, 0);
  };

  useEffect(() => {
    setTransactions(handleFilteringTransactions);
    const amount = () => Number(maxSpend) + AmountCalc("recieved");
    setNewMaxSpend(amount);
  }, [TransactionItem, maxSpend]);

  return (
    <div className="flex justify-center items-start flex-col p-5  bg-white w-full min-h-[5rem] rounded-[.5rem]  gap-y-4">
      <div className="flex justify-center items-center">
        <div
          className={`w-3.5 h-3.5 rounded-full  mr-4`}
          style={{ backgroundColor: `${colorCode}` }}
        ></div>
        <h1 className="text-[clamp(1.1rem,2vw,1.3rem)] font-bold">{title}</h1>
      </div>
      <p className="text-[clamp(.8rem,2vw,.9rem)] font-semibold text-gray-500">
        Maximum of {newMaxSpend}
      </p>
      <div
        className="w-full h-6 rounded-[.5rem]"
        style={{ backgroundColor: `${colorCode}` }}
      ></div>
      <div className="w-full flex justify-center items-center flex-col">
        <div className="flex justify-start items-center  my-3.5 w-full">
          <div className="flex justify-start items-center w-full">
            <div
              className={`h-10 rounded-full w-1 bg-${colorCode}-500 mr-2`}
              style={{ backgroundColor: `${colorCode}` }}
            ></div>
            <div className="flex justify-center items-center flex-col rounded-full">
              <h3>Spent</h3>
              <p>${AmountCalc("sent")}</p>
            </div>
          </div>

          <div className="flex justify-center items-center w-full">
            <div className={`h-10 w-1 bg-main-bg rounded- mr-2`}></div>
            <div className="flex justify-center items-center flex-col">
              <h3>Remaining</h3>
              <p>${newMaxSpend - AmountCalc("sent")}</p>
            </div>
          </div>
        </div>

        <div className="bg-main-bg w-full  min-h-[3rem] p-3 rounded-[.5rem]">
          <div className="w-full flex justify-between items-center ">
            <h1 className="py-2 text-[clamp(.8rem,2vw,1rem)] font-bold">
              Latest Transaction
            </h1>
            <Link to="/transactions">
              View all <FaCaretRight className="inline-block" />
            </Link>
          </div>
          {isTransactionsLoading ? (
            <Spinners isLoading={isTransactionsLoading} />
          ) : transactions && transactions.length === 0 ? (
            <div>nothing yet...</div>
          ) : (
            transactions.map((el, index) => {
              return (
                <SingleTransaction
                  key={index}
                  Name={el.entity}
                  value={`$${el.amount}`}
                  date={el.date}
                  isLast={transactions.length - 1 === index}
                  category={el.category}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleBudget;
