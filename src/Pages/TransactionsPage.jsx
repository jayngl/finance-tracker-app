import React, { useEffect, useState, useMemo } from "react";
import useCRUD from "../CustomHooks/useCRUD";
import { FaBoxOpen } from "react-icons/fa6";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaCircleXmark,
  FaMagnifyingGlass,
  FaCaretLeft,
  FaCaretRight,
  FaFilter,
} from "react-icons/fa6";
import TransactionCard from "../Components/TransactionCard";
import Spinners from "../Components/Spinners";

const TransactionsPage = () => {
  const { budgetData } = useCRUD();
  const [formModalVisibiliy, setFormModalVisibility] = useState(false);
  // sorting and filtering
  const [search, setSearch] = useState("");
  const [sortBy, setsortBy] = useState("latest");
  const [category, setCategory] = useState("");

  // pagination
  const [pagesCount, setPagesCount] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [prevIsDisabled, setPrevIsDisabled] = useState(false);

  const [color, setColor] = useState("green");
  const { TransactionItem, postTransactionData, isTransactionsLoading } =
    useCRUD();

  const [transactionCategory, settransactionCategory] = useState("General");
  const [transactedEntity, settransactedEntity] = useState("");
  const [transactedAmount, settransactedAmount] = useState(0);
  const [transactionType, settransactionType] = useState("sent");

  const handleFormData = (e) => {
    e.preventDefault();
    const date = new Date();

    const newTransactionItem = {
      category: transactionCategory,
      entity: transactedEntity,
      amount:
        transactionType === "sent" ? transactedAmount * -1 : transactedAmount,
      type: transactionType,
      date: date.toLocaleDateString(),
    };

    console.log(newTransactionItem);
    postTransactionData(newTransactionItem);
  };

  const processedList = useMemo(() => {
    return Object.values(TransactionItem)
      .filter((el) => {
        const matchesSearch =
          search.trim() === "" ||
          el.entity.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
          category.trim() === "" ||
          el.category.toLowerCase().includes(category.toLowerCase());

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === "oldest") {
          return new Date(b.date) - new Date(a.date);
        } else if (sortBy === "latest") {
          return new Date(a.date) - new Date(b.date);
        } else if (sortBy === "A-Z") {
          return a.entity.localeCompare(b.entity);
        } else if (sortBy === "Z-A") {
          return b.entity.localeCompare(a.entity);
        } else if (sortBy === "lowest") {
          return a.amount - b.amount;
        } else if (sortBy === "hightest") {
          return b.amount - a.amount;
        } else {
          return null;
        }
      });
  }, [TransactionItem, search, category, sortBy]);

  useEffect(() => {
    const numPages = Math.ceil(processedList.length / 10);
    const pages = Array.from({ length: numPages }, (_, i) => i + 1);
    setPagesCount(pages);
  }, [processedList]);

  return (
    <>
      <section className="w-full min-h-screen flex justify-center items-center bg-main-bg ">
        {isTransactionsLoading ? (
          <Spinners isLoading={isTransactionsLoading} />
        ) : (
          budgetData &&
          (Object.entries(budgetData).length <= 0 ? (
            <div className="flex justify-center items-center flex-col gap-y-5">
              <FaBoxOpen className="text-[clamp(3rem,5vw,6rem)]" />
              <h1 className="text-[clamp(2rem,5vw,3rem)]">
                no budget data yet
              </h1>
              <p className="text-[clamp(1.1rem,2vw,1.4rem)]">
                {" "}
                add one to add transactions
              </p>
              <Link
                to={"/budgets"}
                className="bg-blue px-3 py-1 rounded-[.5rem] hover:brightness-95"
              >
                Add Budget
              </Link>
            </div>
          ) : TransactionItem && Object.entries(TransactionItem).length <= 0 ? (
            <button
              className="bg-main-accent-dark px-3 py-2 rounded-[.5rem] cursor-pointer hover:brightness-75 text-white text-[clamp(.9rem,2vw,1rem)]
                         "
              onClick={() => {
                setFormModalVisibility(!formModalVisibiliy);
                console.log(formModalVisibiliy);
              }}
            >
              <FaPlus className="inline-block mr-2 mb-1 " />
              Add new Transaction
            </button>
          ) : (
            <div className="flex justify-center items-center flex-col w-full h-full px-4 lg:px-7 ">
              <div className="flex justify-between items-center w-full">
                <h1 className="text-[clamp(1.3rem,2.5vw,1.5rem)] font-bold mr-auto my-5">
                  Transactions
                </h1>
                <button
                  className="bg-main-accent-dark px-3 py-2 rounded-[.5rem] cursor-pointer hover:brightness-75 text-white text-[clamp(.9rem,2vw,1rem)]
                         "
                  onClick={() => {
                    setFormModalVisibility(!formModalVisibiliy);
                    console.log(formModalVisibiliy);
                  }}
                >
                  <FaPlus className="inline-block mr-2 mb-1 " />
                  Add new Transaction
                </button>
              </div>

              <div className="bg-white w-full h-full rounded-[.5rem] flex justify-start items-center flex-col mb-10">
                <div className="w-full flex justify-center items-center  px-5 mt-5">
                  <div className="flex justify-between w-full items-center  flex-col lg:flex-row">
                    <div className="flex justify-between items-center w-full ">
                      <div className="border-1 border-gray-400 rounded-[.5rem] px-3 flex justify-center items-center mr-auto">
                        <input
                          type="text"
                          className=" w-full outline-0 h-full py-2 px-2  "
                          placeholder="Search transaction..."
                          value={search}
                          onChange={(e) => {
                            setSearch(e.target.value);
                          }}
                        />
                        <FaMagnifyingGlass className="ml-2 text-[1.1rem] text-gray-500" />
                      </div>
                      <FaFilter className="block lg:hidden" />
                    </div>
                    {/* mobile */}
                    <div className="mt-5 flex justify-center w-full items-start flex-col lg:flex-row">
                      <label
                        htmlFor="sortTransactions"
                        className="text-[.9rem] text-gray-500 mr-2 font-semibold"
                      >
                        Sort By
                      </label>
                      <select
                        name="sortTransactions"
                        id="sortTransactions"
                        className="border-1 border-gray-400 rounded-[.5rem] px-1 py-2 outline-0"
                        value={sortBy}
                        onChange={(e) => {
                          setsortBy(e.target.value);
                        }}
                      >
                        <option value="latest">Latest(Most Recent)</option>
                        <option value="oldest">Oldest</option>
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                        <option value="hightest">
                          Highest(Transaction Amount)
                        </option>
                        <option value="lowest">Lowest</option>
                      </select>

                      <label
                        htmlFor="filterCategories"
                        className="text-[.9rem] text-gray-500 ml-5 mr-2 font-semibold"
                      >
                        Categories
                      </label>

                      <select
                        name="filterCategories"
                        id="filterCategories"
                        className="border-1 border-gray-400 rounded-[.5rem] px-1 py-2 outline-0 "
                        value={category}
                        onChange={(e) => {
                          setCategory(e.target.value);
                        }}
                      >
                        {" "}
                        <option value="">All</option>
                        <option value="General">General</option>
                        <option value="Dining out">Dining out</option>
                        <option value="Groceries">Groceries</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Lifestyle">Lifestyle</option>
                        <option value="Personal Care">Personal Care</option>
                        <option value="Education">Education</option>
                        <option value="Bills">Bills</option>
                        <option value="Shopping">Shopping</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mt-8 px-5 w-full">
                  <div className="w-full  flex justify-between items-center py-4 gap-x-10">
                    <div className="flex justify-between items-center lg:w-full">
                      <h3 className="text-[clamp(.9rem,2vw,1rem)] font-bold">
                        Recipient/Sender
                      </h3>
                      <h3 className="text-[clamp(.9rem,2vw,1rem)] font-bold w-[7rem] hidden md:block">
                        Category
                      </h3>
                    </div>{" "}
                    <div className="flex justify-between items-center lg:w-full">
                      <h3 className="text-[clamp(.9rem,2vw,1rem)] font-bold hidden md:block">
                        Transaction
                      </h3>
                      <h3 className="text-[clamp(.9rem,2vw,1rem)] font-bold ">
                        Amount
                      </h3>
                    </div>
                  </div>
                  {processedList.length === 0 ? (
                    <h1 className="w-full text-center">No items found</h1>
                  ) : (
                    processedList.slice(start, end).map((el, index) => {
                      const { category, entity, amount, type, date } = el;
                      return (
                        <TransactionCard
                          key={index}
                          category={category}
                          entity={entity}
                          amount={amount}
                          type={type}
                          date={date}
                        />
                      );
                    })
                  )}
                  <div className="w-full  flex justify-between items-center py-5">
                    <div
                      className="px-5 py-1.5 border font-bold hover:bg-gray hover:text-white ease-in duration-500 text-gray-500 border-gray-300 rounded-[.5rem] text-[.9rem] cursor-pointer"
                      onClick={() => {
                        if (currentPage > 1) {
                          const prev = currentPage - 1;
                          setCurrentPage(prev);
                          setStart((prev - 1) * 10);
                          setEnd(prev * 10);
                        }
                      }}
                    >
                      <FaCaretLeft className="inline-block mb-1 mr-1" /> Prev
                    </div>
                    <div className="justify-center items-center gap-x-2 hidden lg:flex">
                      {pagesCount.map((el, index) => {
                        return (
                          <div
                            className="px-5 py-1.5 border font-bold text-gray-500 hover:bg-gray hover:text-white ease-in duration-500 border-gray-300 rounded-[.5rem] text-[.9rem] cursor-pointer"
                            key={index}
                            onClick={() => {
                              setCurrentPage(el);
                              setStart((el - 1) * 10);
                              setEnd(el * 10);
                            }}
                          >
                            {el}
                          </div>
                        );
                      })}
                    </div>
                    <div
                      className="px-5 relative py-1.5 border font-bold text-gray-500 hover:bg-gray hover:text-white ease-in duration-500 border-gray-300 rounded-[.5rem] text-[.9rem] cursor-pointer"
                      onClick={() => {
                        if (currentPage < pagesCount.length) {
                          const next = currentPage + 1;
                          setCurrentPage(next);
                          setStart((next - 1) * 10);
                          setEnd(next * 10);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      Next
                      <FaCaretRight className="inline-block mb-1 ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </section>

      {/* transaction form */}
      <div
        className={`w-screen h-screen bg-[rgba(99,94,112,0.2)] absolute z-10 top-0  justify-center items-center px-10  ${
          formModalVisibiliy ? "flex " : "hidden "
        }`}
      >
        <form
          className={`bg-white py-4 rounded-[.5rem] w-full px-4 lg:w-[50%]  justify-center items-center flex-col flex fixed top-5 left-[60%] right-[30%]  transform-[translateX(-50%)] `}
          onSubmit={handleFormData}
        >
          <div className="w-full flex justify-between items-center mb-4">
            <h1 className="font-bold text-[clamp(1.2rem,3vw,1.5rem)]">
              Transaction Form
            </h1>
            <FaCircleXmark
              onClick={() => {
                setFormModalVisibility(!formModalVisibiliy);
              }}
              className="text-xl"
            />
          </div>

          <label
            htmlFor="transactionCategory"
            className="w-full mb-4 font-bold text-gray"
          >
            Transaction Category
          </label>
          <select
            name="transactionCategory"
            id="transactionCategory"
            className="w-full mb-4 border-1 border-gray-400 py-2.5 px-2 rounded-[.5rem] outline-0"
            value={transactionCategory}
            onChange={(e) => {
              settransactionCategory(e.target.value);
            }}
            required
          >
            <option value="General">General</option>
            <option value="Dining out">Dining out</option>
            <option value="Groceries">Groceries</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Transportation">Transportation</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Personal Care">Personal Care</option>
            <option value="Education">Education</option>
            <option value="Bills">Bills</option>
            <option value="Shopping">Shopping</option>
          </select>
          <label
            htmlFor="transactedEntity"
            className="w-full mb-4 font-bold text-gray"
          >
            Recipient/Sender
          </label>
          <input
            type="text"
            placeholder="eg. Amazon"
            id="transactedEntity"
            name="transactedEntity"
            className="w-full mb-4 border-1 border-gray-400 py-2.5 px-2 rounded-[.5rem] outline-0"
            value={transactedEntity}
            onChange={(e) => {
              settransactedEntity(e.target.value);
            }}
            required
          />

          {/* new */}
          <label
            htmlFor="transactedAmount"
            className="w-full mb-4 font-bold text-gray"
          >
            Amount
          </label>
          <input
            type="text"
            placeholder="eg. $50"
            id="transactedAmount"
            name="transactedAmount"
            className="w-full mb-4 border-1 border-gray-400 py-2.5 px-2 rounded-[.5rem] outline-0"
            value={transactedAmount}
            onChange={(e) => {
              settransactedAmount(e.target.value);
            }}
            required
          />

          <label
            htmlFor="transactionType"
            className="w-full mb-4 font-bold text-gray"
          >
            Transaction Type
          </label>

          <select
            name="transactionType"
            id="transactionType"
            className="w-full  outline-0 mb-4 border-1 border-gray-400 py-2.5 px-2 rounded-[.5rem]"
            value={transactionType}
            onChange={(e) => {
              settransactionType(e.target.value);
            }}
            required
          >
            <option value="sent">Sent</option>
            <option value="recieved">Recieved</option>
          </select>

          <button className="bg-main-accent-dark px-3 py-2 rounded-[.5rem] w-full cursor-pointer hover:brightness-75 text-white ">
            <FaPlus className="inline-block mr-2 mb-1 " />
            Add transaction
          </button>
        </form>
      </div>
    </>
  );
};

export default TransactionsPage;
