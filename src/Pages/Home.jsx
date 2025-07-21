import React from "react";
import BalancesCard from "../Components/BalancesCard";
import PotsCard from "../Components/PotsCard";
import TransactionsCard from "../Components/TransactionsCard";
import BudgetsCard from "../Components/BudgetsCard";
import RecurringBillsCard from "../Components/RecurringBillsCard";

const Home = () => {
  return (
    <div className="min-h-screen w-full bg-main-bg md:px-5">
      <h1 className="font-bold text-[clamp(1.5rem,5vw,2rem)] ml-3">Overview</h1>
      {/* balances */}
      <section className="flex justify-between items-center w-full flex-col md:flex-row gap-y-4 px-3 py-2 gap-x-4">
        <BalancesCard
          heading="Current Balance"
          balance="$4,836.00"
          bgColor="bg-main-accent-dark"
          textColor="text-white"
        />
        <BalancesCard heading="Income" balance="$3,836.00" />
        <BalancesCard heading="Expences" balance="$3,836.00" />
      </section>
      <div className="flex justify-center items-start w-full flex-col lg:flex-row">
        <div className="flex justify-center items-center flex-col  w-full">
          {/* pots */}
          <section className="px-3 py-2 w-full">
            <PotsCard />
          </section>
          {/* transacitions */}
          <section className="px-3 py-2 w-full ">
            <TransactionsCard />
          </section>
        </div>

        <div className="flex justify-center items-center flex-col  w-full">
          <section className="px-3 py-2 w-full">
            <BudgetsCard />
          </section>
          <section className="px-3 py-2 w-full">
            <RecurringBillsCard />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
