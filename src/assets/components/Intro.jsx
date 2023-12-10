import React from "react";
import Card from "./Card.jsx";
const Intro = () => {
  return (
    <div className="w-full  flex flex-col justify-center items-center  h-[90vh] ">
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          Game On!
        </span>{" "}
      </h1>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
        Book Your Stadium Adventure Today
      </p>
    </div>
  );
};

export default Intro;
