import React from "react";
import { ClipLoader } from "react-spinners";

const Spinners = ({ isLoading }) => {
  return <ClipLoader loading={isLoading} size={150} />;
};

export default Spinners;
