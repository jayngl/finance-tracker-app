import React, { useState, useRef } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import ProgressBar from "@ramonak/react-progress-bar";
import { FaPlus, FaMinus } from "react-icons/fa";

const SinglePot = ({
  title = "Savings",
  totalSaved = "$100.00",
  target = "2,000",
  id,
  colorCode,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  //   const optionsModal = useRef(null)
  //   find a what percent of the target is the total

  return (
    <div className="bg-main-accent p-5 rounded-[.5rem] relative">
      <div className="flex justify-between items-center w-full my-4">
        <div className="flex justify-center items-center">
          <div
            className="w-4 h-4  rounded-full mr-3"
            style={{ backgroundColor: colorCode }}
          ></div>{" "}
          <h1 className="text-[clamp(.9rem,3vw,1.3rem)] font-bold">{title}</h1>
        </div>
        <FiMoreHorizontal
          className="text-[clamp(.9rem,3vw,1.3rem)] cursor-pointer text-gray-400 "
          onClick={() => {
            setShowOptions(!showOptions);
          }}
        />
      </div>

      <div
        className={`px-4 py-2 rounded-[.5rem] absolute right-10 font-bold top-15 bg-white  drop-shadow-2xl   ${
          showOptions === false ? "hidden" : "block"
        }`}
      >
        <button className="w-full h-full border-b-1 border-gray-400 mb-2 pb-2  cursor-pointer">
          Edit
        </button>
        <button className="w-full h-full text-red-500">Delete</button>
      </div>

      <div className="flex justify-between items-center w-full my-4  cursor-pointer">
        <p className="text-gray-400">Total Saved</p>
        <h2 className="text-[clamp(1rem,3vw,1.6rem)] font-bold">
          {totalSaved}
        </h2>
      </div>

      <div className="my-4">
        <ProgressBar
          completed={(Number(totalSaved) / Number(target)) * 100}
          bgColor={colorCode}
          height=".7rem"
          animateOnRender={true}
          labelColor={colorCode}
        />
      </div>

      <div className="flex justify-between items-center w-full">
        <p className="font-semibold text-gray">
          {(Number(totalSaved) / Number(target)) * 100}%
        </p>
        <h2 className="text-[clamp(.8rem,3vw,.9rem)]">Target of ${target}</h2>
      </div>

      <div className="w-full flex justify-center items-center gap-x-3 my-3">
        {" "}
        <button className="w-full bg-main-bg py-2 font-bold cursor-pointer rounded-[.5rem] hover:bg-gray-300 hover:text-black">
          <FaPlus className="inline-block text-gray-500 text-[.8rem] mr-2 mb-1" />{" "}
          Add Money
        </button>{" "}
        <button className="w-full bg-main-bg py-2 font-bold  cursor-pointer rounded-[.5rem] hover:bg-gray-300 hover:text-black">
          <FaMinus className="inline-block text-gray-500 text-[.8rem] mr-2 mb-1" />
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default SinglePot;
