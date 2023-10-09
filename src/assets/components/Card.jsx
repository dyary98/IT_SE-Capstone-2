import React from "react";
import img from "/pexels-raditya-narendrasuta-11221497.jpg";
import img2 from "/pexels-unknown-user-1657328.jpg";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div className="flex justify-center items-start shadow-xl shadow-black = mt-[-200px] hover:scale-110 duration-75  ">
      <div className="max-w-sm    rounded-lg shadow  ">
        <a href="#">
          <img
            className="rounded-t-lg h-[250px] w-full hover:rounded-2xl hover:blur-sm"
            src={props.image}
            alt=""
          />
        </a>
        <div className="p-5 h-[280px] flex flex-col justify-center">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {props.name}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 h-[]">
            {props.description}
          </p>
          <Link
            to={`${props.Id}`}
            className="inline-flex items-center px-3 py-2 w-28  justify-center text-sm font-medium text-center text-black bg-white rounded-lg hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300  dark:focus:ring-blue-800"
          >
            Reserve
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
