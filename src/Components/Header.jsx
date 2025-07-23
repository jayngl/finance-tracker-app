import React, { useState } from "react";
import NavElement from "./NavElement";
import {
  TbArrowBigLeftLinesFilled,
  TbArrowBigRightLinesFilled,
} from "react-icons/tb";

const Header = () => {
  const [sidebarIsToggled, setSidebarIsToggled] = useState(true);
  return (
    <nav
      className={`relative bg-main-accent-dark text-white lg:min-h-screen  min-h-[5rem]  ${
        sidebarIsToggled ? "lg:w-[5%]" : "lg:w-[20%]"
      }  lg:rounded-tr-[1rem] lg:rounded-br-[1rem] pt-5`}
    >
      <h1 className="mb-10 mt-3 ml-5 text-[clamp(1.4rem,5vw,2rem)] hidden lg:inline font-bold ">
        F
        <span className={`${sidebarIsToggled ? "hidden" : "inline"}`}>
          inanc3
        </span>
      </h1>
      <div className="flex lg:flex-col gap-y-5 justify-center items-center lg:items-start md:gap-x-4 gap-x-2  md:px-4 lg:px-0 mt-5">
        <NavElement title={"Overview"} to={"/"} isToggled={sidebarIsToggled} />
        <NavElement
          title={"Transaction"}
          to={"/transactions"}
          isToggled={sidebarIsToggled}
        />
        <NavElement
          title={"Budgets"}
          to={"/budgets"}
          isToggled={sidebarIsToggled}
        />
        <NavElement title={"Pots"} to={"/pots"} isToggled={sidebarIsToggled} />
        <NavElement
          title={"Recurring Bills"}
          to={"/recurring-bills"}
          isToggled={sidebarIsToggled}
        />
      </div>

      <div
        className="w-full h-[3rem] absolute bottom-20  justify-center items-center gap-x-2 text-[1.1rem] cursor-pointer text-gray-300 hidden lg:flex"
        onClick={() => {
          setSidebarIsToggled(!sidebarIsToggled);
        }}
      >
        {sidebarIsToggled ? (
          <TbArrowBigRightLinesFilled className="inline-block" />
        ) : (
          <TbArrowBigLeftLinesFilled className="inline-block" />
        )}
        <p className={`${sidebarIsToggled ? "hidden" : "block"}`}>
          Minimise Menu
        </p>
      </div>
    </nav>
  );
};

export default Header;
