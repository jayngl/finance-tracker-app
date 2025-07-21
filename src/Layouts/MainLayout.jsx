import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";

const MainLayout = () => {
  return (
    <main className="flex relative flex-col-reverse lg:flex-row w-full  min-h-screen wide:mx-auto wide:max-w-[75rem] ">
      <Header />
      <Outlet />
    </main>
  );
};

export default MainLayout;
