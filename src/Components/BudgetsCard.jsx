import React from "react";
import CardHeading from "./CardHeading";
import DetailsCard from "./DetailsCard";
import Highcharts from "highcharts/highstock";
import PieChart from "highcharts-react-official";
import useCRUD from "../CustomHooks/useCRUD";

const BudgetsCard = () => {
  const { budgetData } = useCRUD();

  const chartData = Object.values(budgetData).map((el) => {
    const { budgetCategory, maxSpend, colorCode } = el;
    return { name: budgetCategory, y: Number(maxSpend), color: colorCode };
  });
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
    <div className="bg-main-accent rounded-[.5rem] px-3 py-5 flex justify-center items-center flex-col ">
      <CardHeading heading={"Budgets"} to={"/budgets"} />
      <div className="flex justify-center items-center gap-x-5 md:flex-row flex-col">
        <div className=" w-full flex justify-center items-center  max-w-[20rem] ">
          {" "}
          <PieChart highcharts={Highcharts} options={options} />
        </div>
        <div className="grid grid-cols-2 w-full gap-3 md:grid-cols-1">
          {Object.values(budgetData).map((el, index) => {
            return (
              <DetailsCard
                key={index}
                title={el.budgetCategory}
                money={el.maxSpend}
                colorCode={`${el.colorCode}`}
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
          <DetailsCard title="New Laptop" money="$10" colorCode="bg-cream" /> */}
        </div>
      </div>
    </div>
  );
};

export default BudgetsCard;
