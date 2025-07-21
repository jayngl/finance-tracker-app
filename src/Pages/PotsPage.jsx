import React, { useState } from "react";
import { FaPlus, FaTimesCircle } from "react-icons/fa";
import useCrud from "../CustomHooks/useCRUD";
import SinglePot from "../Components/SinglePot";
import Spinners from "../Components/Spinners";
import ProgressBar from "@ramonak/react-progress-bar";

const PotsPage = () => {
  const [formModalVisibiliy, setFormModalVisibility] = useState(false);
  const [potNameCount, setPotNameCount] = useState(30);
  const [colorCode, setColorCode] = useState("green");
  const [potName, setPotName] = useState("");
  const [target, setTarget] = useState(0);

  // --------------------------------------------------
  const { postPotsData, PotsData, isPotsLoading } = useCrud();

  const handleFormData = (e) => {
    e.preventDefault();

    const newPotItem = {
      potName: potName,
      target: target,
      colorCode: colorCode,
      amountSaved: 0,
    };

    console.log(newPotItem);
    postPotsData(newPotItem);
  };

  return (
    <section
      className={`relative min-h-screen w-full flex justify-center items-start  bg-main-bg`}
    >
      <div className="h-full w-full flex justify-start items-center flex-col lg:px-5 px-3 pb-5">
        <div className="flex justify-between items-center lg:px-4 w-full">
          <h1 className="text-[clamp(1.3rem,3vw,1.7rem)] font-bold my-5">
            Pots
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

        <div className="w-full grid grid-cols-1 gap-3 lg:grid-cols-2">
          {isPotsLoading ? (
            <Spinners isLoading={isPotsLoading} />
          ) : (
            Object.values(PotsData).map((el, index) => {
              return (
                <SinglePot
                  key={index}
                  title={el.potName}
                  totalSaved={el.amountSaved}
                  target={el.target}
                  id={el.id}
                  colorCode={el.colorCode}
                />
              );
            })
          )}
        </div>
      </div>
      {/* add pots form */}
      <div
        className={`w-full h-full bg-[rgba(99,94,112,0.08)] absolute z-10 top-0  justify-center items-center px-10  ${
          formModalVisibiliy ? "flex " : "hidden "
        }`}
      >
        <form
          className={`bg-white py-5 rounded-[.5rem] w-full px-4 lg:w-[50%]  justify-center items-center flex-col flex fixed top-20`}
          onSubmit={handleFormData}
        >
          <div className="w-full flex justify-between items-center mb-2">
            <h1 className="font-bold text-[clamp(1.2rem,3vw,1.5rem)]">
              Pots Form
            </h1>
            <FaTimesCircle
              onClick={() => {
                setFormModalVisibility(!formModalVisibiliy);
              }}
              className="text-xl"
            />
          </div>

          <p className="py-3">
            Create a pot to set savings targets. These can help keep you on
            track as you save for special purchases.
          </p>

          <label htmlFor="potName" className="w-full mb-2 font-bold text-gray">
            Pot Name
          </label>
          <input
            type="text"
            name="potName"
            maxLength={30}
            className="w-full mb-2 border-1 border-gray-400 py-2.5 px-2 rounded-[.5rem] outline-0"
            placeholder="eg. Vacation"
            value={potName}
            onChange={(e) => {
              setPotNameCount(30 - Number(e.target.value.length));
              setPotName(e.target.value);
            }}
            required
          />
          <h3 className="w-full text-right text-[.9rem]">
            {potNameCount} Characters Left
          </h3>
          <label htmlFor="target" className="w-full mb-2 font-bold text-gray">
            Target
          </label>
          <input
            type="text"
            placeholder="eg. $50"
            id="target"
            name="target"
            className="w-full mb-4 border-1 border-gray-400 py-2.5 px-2 rounded-[.5rem] outline-0"
            value={target}
            onChange={(e) => {
              setTarget(e.target.value);
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
            <div
              className={`w-3 h-3  rounded-full mr-2`}
              style={{ backgroundColor: colorCode }}
            ></div>

            <select
              name="colorCode"
              id="colorCode"
              className="w-full  outline-0"
              value={colorCode}
              onChange={(e) => {
                setColorCode(e.target.value);
              }}
              required
            >
              <option value="green">Green</option>
              <option value="blue">Blue</option>
              <option value="yellow">yellow</option>
              <option value="gray">Gray</option>
            </select>
          </div>
          <button className="bg-main-accent-dark px-3 py-2 rounded-[.5rem] w-full cursor-pointer hover:brightness-75 text-white ">
            <FaPlus className="inline-block mr-2 mb-1 " />
            Add Pot
          </button>
        </form>
      </div>

      {/* add money form */}
      <div
        // ${
        //   formModalVisibiliy ? "flex " : "hidden "
        // }
        className={`w-full h-full bg-[rgba(99,94,112,0.08)] absolute z-10 top-0  justify-center items-center px-10  `}
      >
        <form
          className={`bg-white py-5 rounded-[.5rem] w-full px-4 lg:w-[40%]  justify-center items-center flex-col flex fixed top-20 `}
          onSubmit={handleFormData}
        >
          <div className="w-full flex justify-between items-center mb-2">
            <h1 className="font-bold text-[clamp(1.2rem,3vw,1.5rem)]">
              Add to ‘Savings’
            </h1>
            <FaTimesCircle
              onClick={() => {
                setFormModalVisibility(!formModalVisibiliy);
              }}
              className="text-xl"
            />
          </div>
          <p>
            Add money to your pot to keep it separate from your main balance. As
            soon as you add this money, it will be deducted from your current
            balance.
          </p>

          <div className="flex justify-center items-center flex-col w-full pb-3">
            <div className="flex justify-between items-center w-full my-4  cursor-pointer">
              <p className="text-gray-400">Total Saved</p>
              <h2 className="text-[clamp(1rem,3vw,1.6rem)] font-bold">
                totalSaved
              </h2>
            </div>

            <div className="my-4 w-full flex justify-start items-center h-[.7rem] bg-gray-100 rounded-[1rem]">
              <div className="h-[.7rem] rounded-l-full bg-black w-[10%]"></div>
              <ProgressBar
                completed={20}
                bgColor={"red"}
                height=".7rem"
                animateOnRender={true}
                labelColor={"red"}
                className="w-full"
              />
            </div>

            <div className="flex justify-between items-center w-full">
              <p className="font-semibold text-gray">20%</p>
              <h2 className="text-[clamp(.8rem,3vw,.9rem)]">Target of 2000</h2>
            </div>
          </div>
          <label htmlFor="potName" className="w-full mb-2 font-bold text-gray">
            Pot Name
          </label>
          <input
            type="text"
            name="potName"
            maxLength={30}
            className="w-full mb-2 border-1 border-gray-400 py-2.5 px-2 rounded-[.5rem] outline-0"
            placeholder="eg. Vacation"
            required
          />

          <button className="bg-main-accent-dark px-3 py-2 rounded-[.5rem] w-full cursor-pointer hover:brightness-75 text-white ">
            <FaPlus className="inline-block mr-2 mb-1 " />
            Add Pot
          </button>
        </form>
      </div>
    </section>
  );
};

export default PotsPage;
