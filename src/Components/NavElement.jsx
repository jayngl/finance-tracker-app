import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaWallet } from "react-icons/fa";
import { LuArrowUpDown } from "react-icons/lu";
import { AiOutlinePieChart } from "react-icons/ai";
import { PiNewspaperClippingFill } from "react-icons/pi";
import { HiMiniHome } from "react-icons/hi2";

const NavElement = ({ title, to, isToggled = false }) => {
  const [icon, setIcon] = useState(null);

  const handleIcons = () => {
    switch (title) {
      case "Overview":
        setIcon(<HiMiniHome className="text-[1.5rem] hover:text-green" />);
        break;
      case "Transaction":
        setIcon(<LuArrowUpDown className="text-[1.5rem] hover:text-green" />);
        break;
      case "Budgets":
        setIcon(
          <AiOutlinePieChart className="text-[1.5rem] hover:text-green" />
        );
        break;
      case "Pots":
        setIcon(<FaWallet className="text-[1.5rem] hover:text-green" />);
        break;
      case "Recurring Bills":
        setIcon(
          <PiNewspaperClippingFill className="text-[1.5rem] hover:text-green" />
        );
        break;
    }
  };

  useEffect(() => {
    handleIcons();
  }, []);
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? " flex justify-start w-full items-center text-black py-3  gap-x-3 relative before:content-[''] before:absolute before:bottom-0 lg:before:left-0 lg:before:h-[3rem] lg:before:rounded-r-[.5rem]  before:rounded-t-[.5rem] lg:before:rounded-t-none  before:h-[90%] before:w-full  lg:before:w-[90%] before:opacity-[1] before:bg-white after:absolute lg:after:left-0 after:bottom-0 after:h-1 after:bg-green after:w-full lg:after:w-1 lg:after:h-full  "
          : `flex justify-start w-full  items-center text-gray-500 transition-colors duration-700 py-3 hover:text-black  gap-x-3 relative before:content-[''] before:absolute lg:before:left-0 before:bottom-0 before:h-0 hover:before:h-[90%] lg:before:h-[3rem] lg:hover:before:h-[3rem]   before:opacity-0 lg:before:w-[0%] before:w-full before:transition-all before:ease-in before:duration-700 lg:before:rounded-r-[.5rem]  before:rounded-t-[.5rem] lg:before:rounded-t-none  lg:hover:before:w-[90%] hover:before:opacity-[1] before:bg-white after:absolute lg:after:left-0 after:bottom-0 after:h-1 hover:after:bg-green after:w-full lg:after:w-1 lg:after:h-full after:transition-colors after:duration-700  `
      }
    >
      <div className="relative z-30 ml-4 flex justify-center w-full lg:justify-start items-center md:flex-col lg:flex-row mr-5 lg:mr-0">
        {icon}
        <h1
          className={`hidden md:block ${
            isToggled ? "lg:hidden" : "lg:block"
          } font-bold ml-3 text-[clamp(1.1rem,3vw,1.4)]`}
        >
          {title}
        </h1>
      </div>
    </NavLink>
  );
  {
  }
};

export default NavElement;
