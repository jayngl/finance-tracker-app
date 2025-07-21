import React, { useState, useEffect } from "react";
import { FaGlobe, FaCarSide, FaLeaf } from "react-icons/fa";
import { MdOutlineDining } from "react-icons/md";
import { LuShoppingBag } from "react-icons/lu";
import { FaClapperboard, FaMoneyBills, FaCartShopping } from "react-icons/fa6";
import { BsPersonVcard } from "react-icons/bs";
import { GoMortarBoard } from "react-icons/go";

const SingleTransaction = ({
  Name = "Emma Richardson",
  value = "+$75.50",
  date = "19 Aug 2024",
  isLast,
  category,
}) => {
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
      className={`flex justify-between items-center py-4 ${
        isLast ? "" : "border-b-1"
      } border-gray-400`}
    >
      <div className="flex justify-center items-center gap-x-3">
        <div className="w-[2rem] h-[2rem] rounded-full">{iconType}</div>
        <h3 className="text-[clamp(.8rem,3vw,.9rem)] font-bold">{Name}</h3>
      </div>
      <div className="flex justify-center items-end flex-col">
        <h4 className="font-bold text-[clamp(.7rem,3vw,.8rem)]">{value}</h4>
        <h4 className="text-[clamp(.7rem,3vw,.8rem)] text-gray font-semibold">
          {date}
        </h4>
      </div>
    </div>
  );
};

export default SingleTransaction;
