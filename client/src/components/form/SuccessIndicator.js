import React from 'react';
import { HiCheckCircle } from "react-icons/hi";

function SuccessIndicator() {
  return (
    <div className="flex justify-center items-center mt-4">
    <div className=" w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
      <HiCheckCircle className="h-12 w-12 text-white" />
    </div>
  </div>
);
}

export default SuccessIndicator;

