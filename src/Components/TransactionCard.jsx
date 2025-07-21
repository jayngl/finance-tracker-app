import React, { useEffect, useState } from "react";
import { FaGlobe, FaCarSide, FaLeaf } from "react-icons/fa";
import { MdOutlineDining } from "react-icons/md";
import { LuShoppingBag } from "react-icons/lu";
import { FaClapperboard, FaMoneyBills, FaCartShopping } from "react-icons/fa6";
import { BsPersonVcard } from "react-icons/bs";
import { GoMortarBoard } from "react-icons/go";

const TransactionCard = ({ category, entity, amount, type, date }) => {
  const [iconType, setIconType] = useState("");

  const handleIcons = () => {
    switch (category) {
      case "General":
        setIconType(
          <FaGlobe className="w-full h-full text-main-accent-dark" />
        );

        break;

      case "Groceries":
        setIconType(
          <LuShoppingBag className="w-full h-full text-main-accent-dark" />
        );

        break;

      case "Dining out":
        setIconType(
          <MdOutlineDining className="w-full h-full text-main-accent-dark" />
        );

        break;
      case "Entertainment":
        setIconType(
          <FaClapperboard className="w-full h-full text-main-accent-dark" />
        );

        break;
      case "Transportation":
        setIconType(
          <FaCarSide className="w-full h-full text-main-accent-dark" />
        );

        break;
      case "Lifestyle":
        setIconType(<FaLeaf className="w-full h-full text-main-accent-dark" />);

        break;
      case "Personal Care":
        setIconType(
          <BsPersonVcard className="w-full h-full text-main-accent-dark" />
        );

        break;
      case "Education":
        setIconType(
          <GoMortarBoard className="w-full h-full text-main-accent-dark" />
        );

        break;
      case "Bills":
        setIconType(
          <FaMoneyBills className="w-full h-full text-main-accent-dark" />
        );

        break;
      case "Shopping":
        setIconType(
          <FaCartShopping className="w-full h-full text-main-accent-dark" />
        );

        break;
    }
  };

  useEffect(() => {
    handleIcons();
  }, []);
  return (
    <div
      className={`flex justify-between items-center w-full border-t-1 border-t-gray-300 py-5 gap-x-10`}
    >
      <div className="flex justify-start flex-row w-[50%] ">
        <div className="flex justify-center items-center gap-x-4 mr-5">
          <div className="w-8 h-8 rounded-full ">{iconType}</div>
        </div>
        <div className="flex justify-center items-start lg:items-center flex-col lg:flex-row w-full lg:justify-between">
          <h1 className="text-[clamp(.9rem,2vw,1rem)] font-bold">{entity}</h1>

          <p className="text-[clamp(.7rem,2vw,.8rem)] font-semibold text-gray-500 lg:text-left  w-[7rem]">
            {category}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-end lg:items-center   flex-col-reverse lg:flex-row w-[50%] ">
        <div className="flex justify-between items-center  ">
          <p className="text-[clamp(.7rem,2vw,.8rem)] font-semibold text-gray-500">
            {date}
          </p>
        </div>
        <p
          className={`font-bold text-[clamp(.7rem,2vw,.8rem)] ${
            type === "sent" ? "text-red-700" : "text-green"
          }`}
        >
          {type === "sent" ? "-$" + amount : "+$" + amount}
        </p>
      </div>
    </div>
  );
};

export default TransactionCard;
