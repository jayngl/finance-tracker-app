import React, { useEffect, useRef, useState } from "react";
import useCRUD from "../CustomHooks/useCRUD";
import { FaPlus, FaCircleXmark } from "react-icons/fa6";
import DetailsCard from "../Components/DetailsCard";
import BudgetSummary from "../Components/BudgetSummary";
import SingleBudget from "../Components/SingleBudget";

import Highcharts from "highcharts/highstock";
import PieChart from "highcharts-react-official";

import Spinners from "../Components/Spinners";

const BudgetsPage = () => {
  const [color, setColor] = useState("green");
  const [formModalVisibiliy, setFormModalVisibility] = useState(false);
  const {
    budgetData,
    setbudgetItem,
    postBudgetData,
    budgetItem,
    isBudgetsLoading,
  } = useCRUD();

  const [budgetCategory, setbudgetCategory] = useState("General");
  const [maxSpend, setmaxSpend] = useState("");
  const chartData = Object.values(budgetData).map((el) => {
    const { budgetCategory, maxSpend, colorCode } = el;
    return { name: budgetCategory, y: Number(maxSpend), color: colorCode };
  });

  const handleFormData = (e) => {
    e.preventDefault();

    const newBudgetItem = {
      budgetCategory: budgetCategory,
      maxSpend: maxSpend,
      colorCode: color,
    };

    console.log(newBudgetItem);
    postBudgetData(newBudgetItem);
  };

  const options = {
    chart: {
      type: "pie",
      width: null,
      height: null,
      backgroundColor: null,
    },

    title: {
      text: null,
    },

    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "{point.percentage:.1f}%",
          style: {
            fontWeight: "bold",
            color: "black",
          },
        },
      },
    },
    series: [
      {
        name: "Budget",
        data: [...chartData],
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return (
    <section
      className={`relative min-h-screen w-full flex justify-center items-center `}
    >
      <div className="h-full w-full flex justify-center items-center bg-main-bg lg:px-5 px-3 pb-5">
        {isBudgetsLoading ? (
          <Spinners isLoading={isBudgetsLoading} />
        ) : (
          budgetData &&
          (Object.entries(budgetData) <= 0 ? (
            <div className="flex justify-center items-center flex-col gap-y-2">
              <h1 className="text-[clamp(2rem,5vw,3rem)]">
                no budget data yet
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
                Add new budget
              </button>
            </div>
          ) : (
            <div className="w-full">
              <div className="flex justify-between items-center lg:px-4">
                <h1 className="text-[clamp(1.3rem,3vw,1.7rem)] font-bold my-5">
                  Budgets
                </h1>
                <button
                  className="bg-main-accent-dark px-3 py-2 rounded-[.5rem] cursor-pointer hover:brightness-75 text-white
                  text-[clamp(.9rem,2vw,1rem)]
               "
                  onClick={() => {
                    setFormModalVisibility(!formModalVisibiliy);
                    console.log(formModalVisibiliy);
                  }}
                >
                  <FaPlus className="inline-block mr-2 mb-1 " />
                  Add new budget
                </button>
              </div>
              <section className="flex justify-center items-center lg:items-start lg:flex-row flex-col gap-x-4 gap-y-4">
                <div className="flex justify-center flex-col  items-center  bg-white py-3 rounded-[.5rem] px-5 w-full lg:max-w-[40%] ">
                  <div className=" w-full flex justify-center items-center  max-h-[14rem] ">
                    {" "}
                    <PieChart highcharts={Highcharts} options={options} />
                  </div>
                  <div className="w-full  ">
                    <h1 className="text-[clamp(1rem,2vw,1.2rem)] font-bold py-2">
                      Spending Summary
                    </h1>
                    <div className="w-full ">
                      {Object.values(budgetData)?.map((el, index) => {
                        return (
                          <BudgetSummary
                            key={index}
                            title={el.budgetCategory}
                            totalAmount={el.maxSpend}
                            colorCode={el.colorCode}
                            isLast={
                              Object.values(budgetData).length - 1 === index &&
                              true
                            }
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="w-full h-full  flex justify-center items-center flex-col gap-y-5">
                  {Object.values(budgetData)?.map((el, index) => {
                    return (
                      <SingleBudget
                        key={index}
                        title={el.budgetCategory}
                        maxSpend={el.maxSpend}
                        colorCode={el.colorCode}
                        isLast={
                          Object.values(budgetData).length - 1 === index && true
                        }
                      />
                    );
                  })}
                </div>
              </section>
            </div>
          ))
        )}
      </div>

      <div
        className={`w-full h-full bg-[rgba(99,94,112,0.08)] absolute z-10 top-0  justify-center items-center px-10  ${
          formModalVisibiliy ? "flex " : "hidden "
        }`}
      >
        <form
          className={`bg-white py-5 rounded-[.5rem] w-full px-4 lg:w-[50%]  justify-center items-center flex-col flex fixed top-20`}
          onSubmit={handleFormData}
        >
          <div className="w-full flex justify-between items-center mb-4">
            <h1 className="font-bold text-[clamp(1.2rem,3vw,1.5rem)]">
              Budget Form
            </h1>
            <FaCircleXmark
              onClick={() => {
                setFormModalVisibility(!formModalVisibiliy);
              }}
              className="text-xl"
            />
          </div>

          <label
            htmlFor="budgetCategory"
            className="w-full mb-2 font-bold text-gray"
          >
            Budget Category
          </label>
          <select
            name="budgetCategory"
            id="budgetCategory"
            className="w-full mb-4 border-1 border-gray-400 py-2.5 px-2 rounded-[.5rem] outline-0"
            value={budgetCategory}
            onChange={(e) => {
              setbudgetCategory(e.target.value);
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
          <label htmlFor="maxSpend" className="w-full mb-2 font-bold text-gray">
            Maximum Spend
          </label>
          <input
            type="text"
            placeholder="eg. $50"
            id="maxSpend"
            name="maxSpend"
            className="w-full mb-4 border-1 border-gray-400 py-2.5 px-2 rounded-[.5rem] outline-0"
            value={maxSpend}
            onChange={(e) => {
              setmaxSpend(e.target.value);
            }}
            required
          />
          <label
            htmlFor="colorCode"
            className="w-full mb-2 font-bold text-gray"
          >
            Color Code
          </label>
          <div className="w-full mb-4 border-1 border-gray-400 py-2.5 px-2 rounded-[.5rem] flex justify-center items-center">
            <div className={`w-3 h-3 bg-${color} rounded-full mr-2`}></div>

            <select
              name="colorCode"
              id="colorCode"
              className="w-full  outline-0"
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
              }}
              required
            >
              <option value="green">Green</option>
              <option value="blue">Blue</option>
              <option value="yellow">Cream</option>
              <option value="gray">Gray</option>
            </select>
          </div>
          <button className="bg-main-accent-dark px-3 py-2 rounded-[.5rem] w-full cursor-pointer hover:brightness-75 text-white ">
            <FaPlus className="inline-block mr-2 mb-1 " />
            add budget
          </button>
        </form>
      </div>
    </section>
  );
};

export default BudgetsPage;
