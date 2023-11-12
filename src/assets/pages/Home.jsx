import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";

import Card from "../components/Card";
import Intro from "../components/Intro";
import Recomendations from "../components/Recomendations";
import Events from "./Events";
import Footer from "../components/Footer";
import { AvatarComp } from "../components/AvatarComp";
import IMAGES from "../../Images/Images";
import { authActions } from "../../app/AuthSlice";
import { authentication, db } from "../email_signin/config";
import CardsLoader from "../components/CardsLoader"; // Ensure you have this component

const useFetchUsersWithRole2 = () => {
  return useQuery({
    queryKey: "usersWithRole2",
    queryFn: async () => {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("userRole", "==", 2));
      const querySnapshot = await getDocs(q);
      const usersData = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const userImagesRef = collection(db, "users", doc.id, "images");
          const imagesSnapshot = await getDocs(userImagesRef);
          const images = imagesSnapshot.docs.map((imgDoc) => imgDoc.data().url);
          return {
            uid: doc.id,
            fullName: doc.data().fullName,
            images: images.length > 0 ? images : [IMAGES.Image2], // Fallback to default image
          };
        })
      );
      return usersData;
    },
  });
};

const Home = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const { data: usersWithRole2, isLoading } = useFetchUsersWithRole2();

  const handleLogout = () => {
    dispatch(authActions.logout());
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
      width: `${rect.width}px`,
      left: `${rect.left + window.scrollX}px`,
      top: `${rect.top + window.scrollY - 10}px`,
    };
    setLineStyle(style);
  };

  let nav = [
    { name: "Home", link: "/" },
    { name: "Reservation", link: "#" },
    { name: "Map", link: "/map" },
  ];

  return (
    <div className="bg-cover text-white bg-center object-cover bg-[url('/public/pexels-raditya-narendrasuta-11221497.jpg')] h-[155vh] m-8 rounded-3xl">
      <div className="flex w-full items-center justify-around h-[10vh]">
        <div className="w-1/4 flex justify-center">AHARS</div>
        <ul className="flex justify-between w-1/4">
          {nav.map((link, index) => (
            <li key={index} onClick={() => handleLinkClick(link.name)}>
              <Link to={link.link} ref={refs[link.name]}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="w-1/4 flex justify-center">
          {user ? (
            <div className="flex rounded-full text-black pr-2 bg-gray-500 hover:bg-gray-200">
              <AvatarComp name={user.fullName} />
              <button className="p-2" onClick={handleLogout}>
                LogOut
              </button>
            </div>
          ) : (
            <button className="text-white">
              <Link to="/login">Login</Link>
            </button>
          )}
        </div>
      </div>
      <Intro />
      <div className="flex justify-around items-start h-[50vh] w-full relative">
        {isLoading ? (
          <CardsLoader count={6} />
        ) : (
          usersWithRole2.slice(4, 8).map(
            (
              user,
              index // Only take the first 4 users
            ) => (
              <Card
                key={user.uid}
                name={user.fullName}
                description="Fixed Description Here"
                image={user.images[0]} // The first image from the user's images
                Id={user.uid}
              />
            )
          )
        )}
      </div>
      <div className="flex justify-center">
        <Link
          className="bg-blue-500 w-40 text-white font-bold py-2 flex justify-center  px-4 rounded-md overflow-hidden relative shadow-lg transition duration-300 ease-out transform hover:-translate-y-1 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          to="/vendors"
        >
          <span className="relative z-10">See More</span>
          <div className="absolute top-0 left-0 w-full h-full bg-blue-600 scale-0 group-hover:scale-150 transition-transform origin-bottom-right"></div>
        </Link>
      </div>

      {user && <Recomendations />}
      <Events />
      <Footer />
    </div>
  );
};

export default Home;
