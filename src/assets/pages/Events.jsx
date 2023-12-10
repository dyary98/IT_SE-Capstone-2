import React from "react";
import Slider from "../components/Slider";

const Events = () => {
  return (
    <div className="flex flex-col h-[80vh] bg-white  m-8 rounded-3xl items-center text-primaryColor">
      <h1 className="p-4 text-4xl ">Check Suli's Newest Events</h1>
      <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-tight text-primaryColor md:text-5xl lg:text-6xl ">
        Happening <span className="text-blue-600 dark:text-blue-500">Now!</span>
      </h1>
      <Slider />
    </div>
  );
};

export default Events;
