import React from "react";

const Home = () => {
  return (
    <div>
      <div className="flex w-full h-16 items-center justify-around border-x-sky-100 border-2 ">
        <div className="w-1/4 flex justify-center">Logo</div>
        <ul className="flex justify-between w-1/4 ">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Reservation</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
         
        </ul>
        <div className="w-1/4 flex justify-center">Contact</div>
      </div>
    </div>
  );
};

export default Home;
