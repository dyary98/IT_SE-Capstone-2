import React from "react";
import Card from "../components/Card";
import { useState, useRef } from "react";
import Intro from "../components/Intro";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/userSlice";
import { signOut } from "firebase/auth";
import { authentication } from "../email_signin/config";
import { AvatarComp } from "../components/AvatarComp";
import IMAGES from "../../Images/Images";
import Recomendations from "../components/Recomendations";
import Events from "./Events";

const images = [IMAGES.Image1, IMAGES.Image2, IMAGES.Image3];
const Home = () => {
  const user = useSelector((state) => state.data.user.user);
  const dispatch = useDispatch();
  const handelLogout = () => {
    dispatch(logoutUser());
    signOut(authentication);
  };

  const [activeLink, setActiveLink] = useState("");
  const [lineStyle, setLineStyle] = useState({});
  const refs = {
    Home: useRef(),
    Reservation: useRef(),
    About: useRef(),
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    const rect = refs[link].current.getBoundingClientRect();
    const style = {
      width: rect.width,
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY - 10, // Adjust this value to position the line
    };
    setLineStyle(style);
  };

  return (
    <div className="bg-cover  text-white bg-center	object-cover bg-[linear-gradient(to_right_bottom,rgba(0,0,0,0.8),rgba(20,33,61,0.8)),url('/public/pexels-raditya-narendrasuta-11221497.jpg')] h-[155vh] m-8 rounded-3xl">
      <div
        className={`bg-yellow-400 h-1 rounded-full absolute transition-all ease-in-out duration-300 ${
          activeLink ? "visible" : "invisible"
        }`}
        style={lineStyle}
      ></div>
      <div className="flex w-full  items-center justify-around h-[10vh]  ">
        <div className="w-1/4 flex justify-center">Logo</div>
        <ul className="flex justify-between w-1/4 ">
          {["Home", "Reservation", "Map"].map((link) => (
            <li key={link} onClick={() => handleLinkClick(link)}>
              <a href="#" ref={refs[link]}>
                {link}
              </a>
            </li>
          ))}
        </ul>
        <div className="w-1/4 flex justify-center">
          {user && (
            <div className="flex  rounded-full text-black pr-2 bg-gray-500 hover:bg-gray-200 ">
              <AvatarComp name={user.fullName} />
              <button className="p-2  " onClick={handelLogout}>
                LogOut
              </button>
            </div>
          )}
          {!user && (
            <button className="text-white">
              <Link to="/login">Login</Link>
            </button>
          )}
        </div>
      </div>
      <Intro />
      <div className="flex justify-around items-start h-[50vh] w-full  relative ">
        <Card
          name="Twimalik Stadium"
          description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae officiis fugit perspiciatis ad nisi culpa cupiditate assumenda harum saepe totam!"
          image={IMAGES.Image1}
          Id="1"
        />
        <Card
          name="Hawkary Stadium"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto reiciendis maiores aliquid, magni accusantium nobis?"
          image={IMAGES.Image2}
          Id="2"
        />
        <Card
          name="Azadi Mili Stadium"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto reiciendis maiores aliquid, magni accusantium nobis?"
          image={IMAGES.Image3}
          Id="3"
        />
      </div>
      {user && <Recomendations />}
      <Events />
    </div>
  );
};

export default Home;
